"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
class AppError extends Error {
    code;
    debug;
    children;
    constructor({ code, message = 'noMessage', debug = {}, name, error }) {
        super(message);
        this.code = code;
        this.debug = debug;
        this.name = name || 'AppError';
        this.children = [];
        if (error) {
            this.processError(error);
        }
    }
    // added node v10.12.0
    [util_1.default.inspect.custom]() {
        return this.getLogs();
    }
    getLogs(options) {
        const { level = 'short' } = options || {};
        const processError = (error, out = []) => {
            const e = { code: error.code, name: error.name };
            if (level === 'full') {
                if (error.message !== 'noMessage')
                    e.message = error.message;
                if (Object.keys(error.debug).length > 0)
                    e.debug = error.debug;
                if (!error.children.length)
                    e.stack = error.stack;
                out.push(e);
                error.children.forEach(error => processError(error, out));
            }
            else if (level === 'short') {
                const child = error.children[0] || {};
                if (error.name !== 'AppError' || !child || child.name !== 'AppError') {
                    if (error.message !== 'noMessage')
                        e.message = error.message;
                    if (Object.keys(error.debug).length > 0)
                        e.debug = error.debug;
                    out.push(e);
                }
                error.children.forEach(error => processError(error, out));
            }
            else {
                throw new Error('unknownAppErrorLogsLevel');
            }
            return out;
        };
        return processError(this);
    }
    processError(error) {
        if (error instanceof AppError) {
            this.children.push(error);
        }
        else if (error instanceof Error) {
            const options = {
                code: 'caughtError',
                name: error && error.name,
                message: error && error.message,
                stack: error && error.stack
            };
            this.children.push(new AppError(options));
        }
        else {
            const options = {
                code: 'caughtUnknownConstructorError'
            };
            if (error && typeof error === 'object') {
                const { message, name } = error;
                options.message = message;
                options.name = name;
            }
            else if (typeof error === 'string') {
                options.message = error;
            }
            this.children.push(new AppError(options));
        }
    }
}
exports.default = AppError;

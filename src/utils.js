"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = exports.isFilePath = exports.createCopy = void 0;
function createCopy(data) {
    return JSON.parse(JSON.stringify(data));
}
exports.createCopy = createCopy;
function isUrl(value) {
    let url;
    try {
        url = new URL(value);
    }
    catch (e) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}
exports.isUrl = isUrl;
function isFilePath(value) {
    // TODO
    return value.includes('.');
}
exports.isFilePath = isFilePath;

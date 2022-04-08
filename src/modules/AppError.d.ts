/// <reference types="node" />
import util from 'util';
declare type DebugObject = Record<string, unknown>;
declare type AppErrorConstructor = {
    code: string;
    message?: string;
    error?: unknown;
    debug?: DebugObject;
    name?: string;
};
declare type LogEntry = {
    code: string;
    name: string;
    message?: string;
    debug?: DebugObject;
    stack?: string;
};
declare type GetLogsOptions = {
    level: 'full' | 'short';
};
declare class AppError extends Error {
    code: string;
    debug: DebugObject;
    children: AppError[];
    constructor({ code, message, debug, name, error }: AppErrorConstructor);
    [util.inspect.custom](): LogEntry[];
    getLogs(options?: GetLogsOptions): LogEntry[];
    private processError;
}
export default AppError;

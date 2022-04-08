declare type LogColor = 'cyan' | 'red';
declare function log(...args: unknown[]): void;
declare function error(...args: unknown[]): void;
declare function logOnOff(state: boolean): void;
declare function getLogColor(color: LogColor): string;
declare const _default: {
    log: typeof log;
    error: typeof error;
    logOnOff: typeof logOnOff;
    getLogColor: typeof getLogColor;
};
export default _default;

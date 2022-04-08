"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultIcons = void 0;
const Logger_1 = __importDefault(require("./modules/Logger"));
const AppError_1 = __importDefault(require("./modules/AppError"));
const helpers_1 = require("./helpers");
const defaults_1 = require("./defaults");
Object.defineProperty(exports, "getDefaultIcons", { enumerable: true, get: function () { return defaults_1.getDefaultIcons; } });
if (process.argv[2] === 'start') {
    const foregroundImage = 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cc_large.png';
    main(foregroundImage);
}
/**
 * You only need **5 icons** to meet most needs! Explained [here](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
  ```javascript
    import pwaIconsGenerator from 'pwa-icons-generator'

    const foregroundImage = `https://upload.wikimedia.org/wikipedia/commons/9/94/Cc_large.png`
    const output: Output = await pwaIconsGenerator(foregroundImage)
  ```
*/
async function main(pathOrPrimaryConfig, secondaryConfig) {
    try {
        const defaultConfig = (0, defaults_1.getDefaultConfig)();
        const defaultIcons = (0, defaults_1.getDefaultIcons)();
        const { configs, path } = (0, helpers_1.processAndCopyMainParams)(pathOrPrimaryConfig, secondaryConfig);
        const targetConfig = (0, helpers_1.createTargetConfig)(defaultConfig, configs.primary, configs.secondary, path);
        Logger_1.default.logOnOff(targetConfig.preventLogs);
        const primaryConfigIcons = configs.primary && configs.primary.icons;
        const targetIcons = await (0, helpers_1.createTargetIcons)(targetConfig, defaultIcons, primaryConfigIcons);
        await (0, helpers_1.processTargetIcons)(targetIcons);
        return (0, helpers_1.createOutput)(targetIcons);
    }
    catch (error) {
        handleError(error);
    }
}
// MISC
function handleError(error) {
    const defaultConfig = (0, defaults_1.getDefaultConfig)();
    if (error instanceof AppError_1.default) {
        const log = error.getLogs({ level: 'short' });
        Logger_1.default.error(log);
    }
    else {
        Logger_1.default.error(error);
    }
    throw new Error(`${defaultConfig.projectNameCamel}Error`);
}
exports.default = main;

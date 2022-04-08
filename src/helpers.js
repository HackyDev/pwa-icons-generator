"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutput = exports.processTargetIcons = exports.getImageSourceType = exports.createTargetIcons = exports.createTargetConfig = exports.processAndCopyMainParams = void 0;
const path_1 = __importDefault(require("path"));
const request_1 = __importDefault(require("request"));
const utils_1 = require("./utils");
const AppError_1 = __importDefault(require("./modules/AppError"));
const ImageResource_1 = require("./modules/ImageResource");
const SvgResource_1 = require("./modules/SvgResource");
// CONFIGS PROCESSING
function processAndCopyMainParams(pathOrPrimaryConfig, secondaryConfig = {}) {
    const path = typeof pathOrPrimaryConfig === 'string' ? pathOrPrimaryConfig : undefined;
    const primaryConfig = typeof pathOrPrimaryConfig === 'string' ? undefined : pathOrPrimaryConfig;
    return (0, utils_1.createCopy)({ configs: { primary: primaryConfig, secondary: secondaryConfig }, path });
}
exports.processAndCopyMainParams = processAndCopyMainParams;
function createTargetConfig(defaultConfig, primaryConfig, secondaryConfig, path) {
    try {
        if (!path && !primaryConfig) {
            throw new AppError_1.default({ code: 'primaryConfigNotFound', message: 'Please provide primary config or icon path' });
        }
        primaryConfig = primaryConfig || { fg: defaultConfig.fg };
        secondaryConfig = secondaryConfig || {};
        const targetConfig = {
            fg: path || primaryConfig.fg || defaultConfig.fg,
            bg: primaryConfig.bg || secondaryConfig.bg || defaultConfig.bg,
            ext: primaryConfig.ext || secondaryConfig.ext || defaultConfig.ext,
            padding: primaryConfig.padding || secondaryConfig.padding || defaultConfig.padding,
            outDirectory: primaryConfig.outDirectory || secondaryConfig.outDirectory || defaultConfig.outDirectory,
            pathPrefix: primaryConfig.pathPrefix || secondaryConfig.pathPrefix || defaultConfig.pathPrefix,
            linkTags: primaryConfig.linkTags || secondaryConfig.linkTags || defaultConfig.linkTags,
            preventEmit: primaryConfig.preventEmit || secondaryConfig.preventEmit || defaultConfig.preventEmit,
            preventLogs: primaryConfig.preventLogs || secondaryConfig.preventLogs || defaultConfig.preventLogs
        };
        return targetConfig;
    }
    catch (error) {
        throw new AppError_1.default({ code: 'createTargetConfigFail', error });
    }
}
exports.createTargetConfig = createTargetConfig;
// ICONS PROCESSING
function createTargetIcons(targetConfig, defaultIcons, primaryConfigIcons) {
    try {
        if (primaryConfigIcons) {
            const targetIcons = primaryConfigIcons.map(icon => {
                const linkTagAttributes = (icon.linkTag && icon.linkTag.attributes) || {};
                return {
                    name: icon.name,
                    width: icon.width,
                    height: icon.height,
                    manifest: !!icon.manifest,
                    fg: icon.fg || targetConfig.fg,
                    bg: icon.bg || targetConfig.bg,
                    ext: icon.ext || targetConfig.ext,
                    padding: icon.padding || targetConfig.padding,
                    outDirectory: icon.outDirectory || targetConfig.outDirectory,
                    pathPrefix: icon.pathPrefix || targetConfig.pathPrefix,
                    linkTags: { attributes: Object.assign({}, targetConfig.linkTags.attributes, linkTagAttributes) },
                    preventEmit: typeof icon.preventEmit === 'boolean' ? icon.preventEmit : targetConfig.preventEmit
                };
            });
            return targetIcons;
        }
        else {
            const targetIcons = defaultIcons.map(icon => {
                const linkTagAttributes = (icon.linkTag && icon.linkTag.attributes) || {};
                return {
                    name: icon.name,
                    width: icon.width,
                    height: icon.height,
                    manifest: !!icon.manifest,
                    fg: targetConfig.fg,
                    bg: targetConfig.bg,
                    ext: icon.ext || targetConfig.ext,
                    padding: targetConfig.padding,
                    outDirectory: targetConfig.outDirectory,
                    pathPrefix: targetConfig.pathPrefix,
                    linkTags: { attributes: Object.assign({}, targetConfig.linkTags.attributes, linkTagAttributes) },
                    preventEmit: targetConfig.preventEmit
                };
            });
            return targetIcons;
        }
    }
    catch (error) {
        throw new AppError_1.default({ code: 'createTargetIconsError', error });
    }
}
exports.createTargetIcons = createTargetIcons;
async function processTargetIcons(icons) {
    let icon;
    try {
        for (icon of icons) {
            if (icon.ext === 'svg') {
                const { outDirectory, name, width, height, padding } = icon;
                const bgResource = await createSvgResource('bg', icon);
                const fgResource = await createSvgResource('fg', icon);
                const composited = await bgResource.addForeground({ image: fgResource, padding, width, height });
                await composited.saveAs({ outDirectory, name });
            }
            else {
                const { ext, width, height, padding, outDirectory, name } = icon;
                const bgResource = await createImageResource('bg', icon);
                const fgResource = await createImageResource('fg', icon);
                const composited = await bgResource.addForeground({ image: fgResource, width, height, padding });
                composited.saveAs({ outDirectory, name, ext });
            }
        }
    }
    catch (error) {
        throw new AppError_1.default({ code: 'processTargetIconsError', error, debug: { icon } });
    }
}
exports.processTargetIcons = processTargetIcons;
/**
 * Creates ImageResource from target icon
 *
 * ImageResouce differs from SvgResource in that it can not save 'SVG' files
 */
async function createImageResource(type, icon) {
    try {
        const { width, height } = icon;
        const imageSource = icon[type];
        const imageSourceType = getImageSourceType(imageSource);
        let resource;
        if (imageSourceType === 'path') {
            const fileExtension = (0, ImageResource_1.extractExtensionFromPath)(imageSource);
            if (SvgResource_1.SvgResource.isFormatSupported(fileExtension)) {
                resource = await (0, ImageResource_1.createImageResourceFromFile)(imageSource);
            }
            else {
                const message = `It is currently not possible to create an icon from a file with "${fileExtension}" extension`;
                throw new AppError_1.default({ code: 'createImageResourceError', message, debug: { icon } });
            }
        }
        else if (imageSourceType === 'color') {
            resource = await (0, ImageResource_1.createImageResourceFromColor)(imageSource, width, height);
        }
        else if (imageSourceType === 'url') {
            const { buffer, imageFormat = '' } = await getFileFromUrl(imageSource);
            if (SvgResource_1.SvgResource.isFormatSupported(imageFormat)) {
                resource = await (0, ImageResource_1.createImageResourceFromBuffer)(buffer);
            }
            else {
                throw new AppError_1.default({ code: 'createImageResourceError', message: 'Unsupported image format from URL', debug: { icon } });
            }
        }
        else {
            throw new AppError_1.default({ code: 'createImageResourceError', message: 'Unknown image source type', debug: { icon } });
        }
        return resource;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        else {
            throw new AppError_1.default({ code: 'createImageResourceFail', error, debug: { icon } });
        }
    }
}
/**
 * Creates SvgResource from target icon
 *
 * ImageResouce differs from SvgResource in that it can save 'SVG' files
 */
async function createSvgResource(type, icon) {
    try {
        const { width, height } = icon;
        const imageSource = icon[type];
        const imageSourceType = getImageSourceType(icon[type]);
        let resource;
        if (imageSourceType === 'path') {
            const fileExtension = (0, ImageResource_1.extractExtensionFromPath)(imageSource);
            if (SvgResource_1.SvgResource.isFormatSupported(fileExtension)) {
                resource = await (0, SvgResource_1.createSvgResourceFromFile)(imageSource);
            }
            else {
                const message = `It is currently not possible to create a "SVG" icon from a file with "${fileExtension}" extension`;
                throw new AppError_1.default({ code: 'createSvgResourceError', message, debug: { icon } });
            }
        }
        else if (imageSourceType === 'color') {
            resource = (0, SvgResource_1.createSvgResourceFromColor)(imageSource, width, height);
        }
        else if (imageSourceType === 'url') {
            const { buffer, imageFormat = '' } = await getFileFromUrl(imageSource);
            if (SvgResource_1.SvgResource.isFormatSupported(imageFormat)) {
                resource = await (0, SvgResource_1.createSvgResourceFromBuffer)(buffer);
            }
            else {
                throw new AppError_1.default({ code: 'createSvgResourceError', message: 'Unsupported image format from URL', debug: { icon } });
            }
        }
        else {
            throw new AppError_1.default({ code: 'createSvgResourceError', message: 'Unknown image source type', debug: { icon } });
        }
        return resource;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        else {
            throw new AppError_1.default({ code: 'createSvgResourceFail', error, debug: { icon } });
        }
    }
}
/* OUTPUT */
async function createOutput(icons) {
    const output = {
        items: [],
        linkTags: '',
        manifest: { icons: [] }
    };
    for (const icon of icons) {
        const path = createOutputLinkPath(icon);
        const linkTag = createOutputLinkTag(icon, path);
        output.items.push(createManifestItem(icon, path, linkTag));
        if (icon.manifest) {
            output.manifest.icons.push(createOutputManifestIcon(icon, path));
        }
        else {
            output.linkTags += linkTag;
        }
    }
    return output;
}
exports.createOutput = createOutput;
function createManifestItem(icon, path, linkTag) {
    return {
        name: icon.name,
        outDirectory: icon.outDirectory,
        ext: icon.ext,
        preventEmit: icon.preventEmit,
        padding: icon.padding,
        width: icon.width,
        height: icon.height,
        path: path,
        linkTag: linkTag
    };
}
function createOutputManifestIcon(icon, path) {
    return {
        src: path,
        type: `image/${icon.ext}`,
        sizes: `${icon.width}x${icon.height}`
    };
}
function createOutputLinkPath(item) {
    return path_1.default.join(item.pathPrefix, `${item.name}.${item.ext}`);
}
function createOutputLinkTag(icon, href) {
    const attributes = [];
    const data = {};
    if (icon.ext === 'svg') {
        data.type = 'image/svg+xml';
    }
    Object.assign(data, { href }, icon.linkTags.attributes);
    for (const key in data) {
        attributes.push(`${key}="${data[key]}"`);
    }
    return `<link ${attributes.join(' ')}>`;
}
// MISC
function getImageSourceType(value) {
    if ((0, utils_1.isUrl)(value)) {
        return 'url';
    }
    else if ((0, utils_1.isFilePath)(value)) {
        return 'path';
    }
    else {
        return 'color';
    }
}
exports.getImageSourceType = getImageSourceType;
const getFileFromUrl = (() => {
    const cacheMap = new Map();
    return async function (url) {
        const getBody = (url) => new Promise((resolve, reject) => {
            if (cacheMap.has(url)) {
                return resolve(cacheMap.get(url));
            }
            (0, request_1.default)({ url, encoding: null }, (e, res, buffer) => {
                if (e) {
                    return reject(e);
                }
                else if (res.statusCode >= 200 && res.statusCode < 300) {
                    const contentType = res.headers['content-type'];
                    let imageFormat = contentType && contentType.split('/')[1];
                    imageFormat = imageFormat && imageFormat.includes('svg') ? 'svg' : imageFormat;
                    const out = { buffer, imageFormat };
                    cacheMap.set(url, out);
                    return resolve({ buffer, imageFormat });
                }
                else {
                    return reject(new Error(`Failed to fetch file ${res.statusCode}`));
                }
            });
        });
        return await getBody(url);
    };
})();

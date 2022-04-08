"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageResource = exports.createSharpInstance = exports.createImageResourceFromBuffer = exports.createImageResourceFromFile = exports.createImageResourceFromColor = exports.extractExtensionFromPath = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const png_to_ico_1 = __importDefault(require("png-to-ico"));
class ImageResource {
    static inputImageFormats = ['png', 'jpeg', 'svg'];
    static outputImageFormats = ['jpeg', 'png', 'ico'];
    sharpInstance;
    constructor(options) {
        this.sharpInstance = options.sharpInstance;
    }
    async addForeground(options) {
        const { image, padding, width, height } = options;
        const topImageSize = await image.getSize();
        const bottomImageExtracted = await this.extractProportionalArea({ width, height, resize: true });
        const bottomImageSizeInnerPadded = this.applyInnerPaddingToSize({ width, height }, padding);
        const topImageSizeFit = this.adjustSizeToFit(bottomImageSizeInnerPadded, topImageSize);
        const offsetToCenter = this.getOffsetToCenter({ width, height }, topImageSizeFit);
        const topImageResizedBuffer = await image.sharpInstance.clone().resize(topImageSizeFit).toBuffer();
        const composited = bottomImageExtracted.sharpInstance.composite([{
                input: topImageResizedBuffer,
                left: offsetToCenter.x,
                top: offsetToCenter.y
            }]);
        const sharpInstance = (0, sharp_1.default)(await composited.toBuffer());
        return new ImageResource({ sharpInstance });
    }
    async extractProportionalArea(child) {
        const parent = await this.getSize();
        const extracted = this.adjustSizeToFit(parent, child);
        const offset = this.getOffsetToCenter(parent, extracted);
        const buffer = await this.sharpInstance
            .extract({
            left: offset.x,
            top: offset.y,
            width: extracted.width,
            height: extracted.height
        })
            .toBuffer();
        let sharpInstance = (0, sharp_1.default)(buffer);
        if (child.resize) {
            sharpInstance = sharpInstance.resize(child.width, child.height);
        }
        return new ImageResource({ sharpInstance });
    }
    async getSize() {
        const { width, height } = await this.sharpInstance.metadata();
        if (width === undefined || height === undefined) {
            throw new Error('getSizeUndefined');
        }
        return { width, height };
    }
    async saveAs(options) {
        const { outDirectory, name, ext } = options;
        const imageSrc = this.createFilename(outDirectory, name, ext);
        this.createDirectory(outDirectory);
        if (ext === 'ico') {
            const instanceBuf = await this.getBuffer();
            const buf = await (0, png_to_ico_1.default)([instanceBuf]);
            this.writeFileSync(imageSrc, buf);
            return { imageSrc };
        }
        else {
            const clone = this.sharpInstance.clone()[ext]();
            await clone.toFile(imageSrc);
            return { imageSrc };
        }
    }
    async getHrefBase64(newSize) {
        const format = await this.getFormat();
        let buffer;
        if (newSize) {
            buffer = await this.cloneResizeBuffer(newSize);
        }
        else {
            buffer = await this.sharpInstance.toBuffer();
        }
        const base64 = buffer.toString('base64');
        return `data:image/${format};base64,${base64}`;
    }
    async getFormat() {
        return (await this.sharpInstance.metadata()).format;
    }
    async cloneResizeBuffer({ width, height }) {
        return this.sharpInstance.clone().resize(width, height).toBuffer();
    }
    createDirectory(directory) {
        fs_1.default.mkdirSync(directory, { recursive: true });
    }
    createFilename(directory, name, extension = 'png') {
        return path_1.default.join(directory, `${name}.${extension}`);
    }
    writeFileSync(path, value) {
        fs_1.default.writeFileSync(path, value);
    }
    getBuffer() {
        return this.sharpInstance.toBuffer();
    }
    applyInnerPaddingToSize(size, padding) {
        if (!padding)
            return size;
        const { width, height } = size;
        const out = { width: 0, height: 0 };
        if (padding.endsWith('%')) {
            const percent = Number(padding.slice(0, -1)) / 100;
            out.width = width - width * percent;
            out.height = height - height * percent;
        }
        else if (padding.endsWith('px')) {
            const paddingNum = Number(padding.slice(0, -2));
            out.width = width - paddingNum;
            out.height = height - paddingNum;
        }
        else {
            throw new Error(`Padding format is invalid (use "10px" or "10%"), you provided: ${padding}`);
        }
        out.width = Math.round(out.width);
        out.height = Math.round(out.height);
        return out;
    }
    adjustSizeToFit(parent, child) {
        const out = {
            width: parent.width,
            height: parent.height
        };
        if (child.width / child.height >= parent.width / parent.height) {
            out.height = (child.height * parent.width) / child.width;
        }
        else {
            out.width = (child.width * parent.height) / child.height;
        }
        out.width = Math.round(out.width);
        out.height = Math.round(out.height);
        return out;
    }
    getOffsetToCenter(parent, child) {
        return {
            x: Math.round((parent.width - child.width) / 2),
            y: Math.round((parent.height - child.height) / 2)
        };
    }
    static isFormatSupported(value) {
        return ImageResource.inputImageFormats.includes(value);
    }
}
exports.ImageResource = ImageResource;
/* HELPERS */
function createSharpInstance(input, options) {
    return (0, sharp_1.default)(input, options);
}
exports.createSharpInstance = createSharpInstance;
function extractExtensionFromPath(value) {
    return value.split('.').pop() || '';
}
exports.extractExtensionFromPath = extractExtensionFromPath;
async function createImageResourceFromFile(filepath) {
    const extension = extractExtensionFromPath(filepath);
    if (ImageResource.inputImageFormats.includes(extension)) {
        const sharpInstance = (0, sharp_1.default)(filepath);
        return new ImageResource({ sharpInstance });
    }
    else {
        throw new Error('imageFormatNotSupported');
    }
}
exports.createImageResourceFromFile = createImageResourceFromFile;
async function createImageResourceFromColor(color, width, height) {
    const buffer = await (0, sharp_1.default)({ create: { width, height, channels: 4, background: color } })
        .png()
        .toBuffer();
    return createImageResourceFromBuffer(buffer);
}
exports.createImageResourceFromColor = createImageResourceFromColor;
async function createImageResourceFromBuffer(buffer) {
    const sharpInstance = createSharpInstance(buffer);
    return new ImageResource({ sharpInstance });
}
exports.createImageResourceFromBuffer = createImageResourceFromBuffer;

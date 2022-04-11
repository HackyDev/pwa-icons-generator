"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSvgResourceFromFile = exports.createSvgResourceFromBuffer = exports.createSvgResourceFromColor = exports.SvgResource = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const svgson_1 = require("svgson");
class SvgResource {
    buffer;
    imageSourceType;
    imageSource;
    bufferImageType;
    static inputImageFormats = ['png', 'jpeg', 'svg'];
    static outputImageFormat = ['svg'];
    constructor(options) {
        this.buffer = options.buffer;
        this.imageSourceType = options.imageSourceType;
        this.imageSource = options.imageSource;
        this.bufferImageType = options.bufferImageType;
    }
    async saveAs(options) {
        const { outDirectory, name } = options;
        const imageSrc = this.createFilename(outDirectory, name, 'svg');
        this.createDirectory(outDirectory);
        this.writeFileSync(imageSrc, this.buffer);
        return { imageSrc };
    }
    async addForeground(options) {
        const { image, padding, width, height } = options;
        let outStr = '';
        if (this.bufferImageType === 'svg' && image.bufferImageType === 'svg') {
            // combines resources by embedding them as SVG inside a new SVG
            const bottom = await (0, svgson_1.parse)(this.buffer.toString());
            const top = await (0, svgson_1.parse)(image.buffer.toString());
            const root = SvgResource.createSvgRoot({ width, height });
            const paddingParsed = this.parsePadding(padding);
            const topHolder = this.createFitSvgGroup(root, top, paddingParsed);
            const bottomHolder = this.createContainSvgGroup(root, bottom);
            root.children = [bottomHolder, topHolder];
            outStr = (0, svgson_1.stringify)(root);
        }
        else {
            // combines resources by by embedding them as <image href='[base64]'> tags in a new SVG
            const topImageSize = await image.getSize();
            const topImageSizeFit = this.adjustSizeToFit({ width, height }, topImageSize);
            const topImageSizePadded = this.applyInnerPaddingToSize(topImageSizeFit, padding);
            const topImageHref = await image.getHrefBase64(topImageSizeFit);
            const topImage = { href: topImageHref, ...topImageSizePadded };
            const bottomImageSize = await this.getSize();
            const bottomImageSizeContain = this.adjustSizeToContain({ width, height }, bottomImageSize);
            const bottomImageHref = await this.getHrefBase64(bottomImageSizeContain);
            const bottomImage = { href: bottomImageHref, ...bottomImageSizeContain };
            const svgFromImages = this.createSvgFromImages({ topImage, bottomImage, width, height });
            outStr = (0, svgson_1.stringify)(svgFromImages);
        }
        const buffer = Buffer.from(outStr);
        return new SvgResource({
            buffer: buffer,
            imageSource: buffer,
            imageSourceType: 'buffer',
            bufferImageType: 'svg'
        });
    }
    createFitSvgGroup(parentNode, childNode, padding) {
        let scale = 1;
        let x = 0;
        let y = 0;
        let paddingOffset = 1;
        const parent = {
            width: parseInt(parentNode.attributes.width),
            height: parseInt(parentNode.attributes.height)
        };
        const child = {
            width: parseInt(childNode.attributes.width),
            height: parseInt(childNode.attributes.height)
        };
        parentNode.attributes.width = String(parent.width);
        parentNode.attributes.height = String(parent.height);
        childNode.attributes.width = String(child.width);
        childNode.attributes.height = String(child.height);
        if (padding.unit === '%') {
            paddingOffset = 1 - padding.value / 100;
        }
        else if (padding.unit === 'px') {
            paddingOffset = (parent.width - padding.value) / parent.width;
            if (parent.width > parent.height) {
                paddingOffset = (parent.height - padding.value) / parent.height;
            }
        }
        if (child.width / child.height > parent.width / parent.height) {
            scale = parent.width * paddingOffset / child.width;
        }
        else {
            scale = parent.height * paddingOffset / child.height;
        }
        y = (parent.height - child.height * scale) / 2;
        x = (parent.width - child.width * scale) / 2;
        return {
            name: 'g',
            type: 'element',
            value: '',
            attributes: { transform: `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})` },
            children: [childNode]
        };
    }
    createContainSvgGroup(parentNode, childNode) {
        let x = 0;
        let y = 0;
        let scale = 1;
        const parent = {
            width: parseInt(parentNode.attributes.width),
            height: parseInt(parentNode.attributes.height)
        };
        const child = {
            width: parseInt(childNode.attributes.width),
            height: parseInt(childNode.attributes.height)
        };
        parentNode.attributes.width = String(parent.width);
        parentNode.attributes.height = String(parent.height);
        childNode.attributes.width = String(child.width);
        childNode.attributes.height = String(child.height);
        if (child.width / child.height > parent.width / parent.height) {
            scale = parent.height / child.height;
        }
        else {
            scale = parent.width / child.width;
        }
        y = (parent.height - child.height * scale) / 2;
        x = (parent.width - child.width * scale) / 2;
        return {
            name: 'g',
            type: 'element',
            value: '',
            attributes: { transform: `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})` },
            children: [childNode]
        };
    }
    createSvgImage(options) {
        const { x, y, width, height, href } = options;
        return {
            name: 'image',
            type: 'element',
            value: '',
            attributes: {
                x: String(x),
                y: String(y),
                width: String(width),
                height: String(height),
                'xlink:href': href
            },
            children: []
        };
    }
    applyInnerPaddingToSize(size, padding) {
        if (!padding)
            return size;
        const { width, height } = size;
        const out = { width: 0, height: 0 };
        const paddingParsed = this.parsePadding(padding);
        if (paddingParsed.unit === '%') {
            const percent = paddingParsed.value / 100;
            out.width = width - width * percent;
            out.height = height - height * percent;
        }
        else if (padding.endsWith('px')) {
            out.width = width - paddingParsed.value;
            out.height = height - paddingParsed.value;
        }
        out.width = Math.round(out.width);
        out.height = Math.round(out.height);
        return out;
    }
    parsePadding(padding) {
        const unit = padding.endsWith('%') ? '%' : padding.endsWith('px') ? 'px' : '';
        if (!unit) {
            throw new Error(`Padding format is invalid (use "10px" or "10%"), you provided: ${padding}`);
        }
        const value = parseInt(padding);
        return { unit, value };
    }
    adjustSizeToFit(parent, child) {
        const out = {
            width: parent.width,
            height: parent.height
        };
        if (child.width / child.height > parent.width / parent.height) {
            out.height = (child.height * parent.width) / child.width;
        }
        else if (child.width / child.height < parent.width / parent.height) {
            out.width = (child.width * parent.height) / child.height;
        }
        out.width = Math.round(out.width);
        out.height = Math.round(out.height);
        return out;
    }
    adjustSizeToContain(parent, child) {
        const out = {
            width: child.width,
            height: child.height
        };
        let scale = 1;
        if (child.width / child.height > parent.width / parent.height) {
            scale = parent.height / child.height;
        }
        else {
            scale = parent.width / child.width;
        }
        out.width = Math.round(out.width * scale);
        out.height = Math.round(out.height * scale);
        return out;
    }
    async getHrefBase64(newSize) {
        let buffer = this.buffer;
        if (newSize) {
            const { width, height } = newSize;
            if (this.bufferImageType === 'jpeg' || this.bufferImageType === 'png') {
                buffer = await (0, sharp_1.default)(this.buffer).clone().resize(width, height)[this.bufferImageType]().toBuffer();
            }
        }
        const mimeType = this.bufferImageType === 'svg' ? 'svg+xml' : this.bufferImageType;
        const base64 = buffer.toString('base64');
        return `data:image/${mimeType};base64,${base64}`;
    }
    async getSize() {
        const { width, height } = (await (0, sharp_1.default)(this.buffer).metadata());
        if (!width || !height)
            throw new Error('getSizeUndefined');
        return { width, height };
    }
    createFilename(directory, name, extension = 'png') {
        return path_1.default.join(directory, `${name}.${extension}`);
    }
    createDirectory(directory) {
        fs_1.default.mkdirSync(directory, { recursive: true });
    }
    writeFileSync(path, value) {
        fs_1.default.writeFileSync(path, value);
    }
    createSvgFromImages(options) {
        const { topImage, bottomImage, width, height } = options;
        const topX = (width - topImage.width) / 2;
        const topY = (height - topImage.height) / 2;
        const bottomX = (width - bottomImage.width) / 2;
        const bottomY = (height - bottomImage.height) / 2;
        const root = SvgResource.createSvgRoot({ width, height });
        const bottom = this.createSvgImage({
            x: bottomX,
            y: bottomY,
            width: bottomImage.width,
            height: bottomImage.height,
            href: bottomImage.href
        });
        const top = this.createSvgImage({
            x: topX,
            y: topY,
            width: topImage.width,
            height: topImage.height,
            href: topImage.href
        });
        root.children.push(bottom, top);
        return root;
    }
    static createSvgRoot(options) {
        const { width, height } = options;
        return {
            name: 'svg',
            type: 'element',
            value: '',
            attributes: {
                version: '1.1',
                xmlns: 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                width: String(width),
                height: String(height)
            },
            children: []
        };
    }
    static isFormatSupported(value) {
        return SvgResource.inputImageFormats.includes(value);
    }
}
exports.SvgResource = SvgResource;
function getFiletypeFromBuffer(buffer) {
    const formatData = [{
            type: 'png',
            sliceEnd: 8,
            match: '89504e470d0a1a0a'
        }, {
            type: 'jpeg',
            sliceEnd: 3,
            match: 'ffd8ff'
        }];
    for (const formatDataItem of formatData) {
        const { type, sliceEnd, match } = formatDataItem;
        if (buffer.slice(0, sliceEnd).toString('hex') === match) {
            return type;
        }
    }
    if (buffer.toString().includes('<svg')) {
        return 'svg';
    }
}
function createSvgResourceFromColor(color, width, height) {
    const root = SvgResource.createSvgRoot({ width, height });
    const rect = {
        name: 'rect',
        type: 'element',
        value: '',
        attributes: {
            width: '100%',
            height: '100%',
            fill: color
        },
        children: []
    };
    root.children.push(rect);
    const svgStr = (0, svgson_1.stringify)(root);
    const buffer = Buffer.from(svgStr, 'utf-8');
    return new SvgResource({
        buffer,
        imageSourceType: 'color',
        imageSource: color,
        bufferImageType: 'svg'
    });
}
exports.createSvgResourceFromColor = createSvgResourceFromColor;
async function createSvgResourceFromBuffer(buffer) {
    const bufferImageType = getFiletypeFromBuffer(buffer);
    if (!bufferImageType) {
        throw new Error('createSvgResourceFromBufferFail');
    }
    return new SvgResource({
        buffer,
        imageSourceType: 'buffer',
        imageSource: buffer,
        bufferImageType
    });
}
exports.createSvgResourceFromBuffer = createSvgResourceFromBuffer;
async function createSvgResourceFromFile(filepath) {
    const buffer = fs_1.default.readFileSync(filepath);
    const bufferImageType = getFiletypeFromBuffer(buffer);
    if (!bufferImageType) {
        throw new Error('createSvgResourceFromBufferFail');
    }
    return new SvgResource({
        buffer,
        imageSourceType: 'path',
        imageSource: filepath,
        bufferImageType
    });
}
exports.createSvgResourceFromFile = createSvgResourceFromFile;

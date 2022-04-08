/// <reference types="node" />
import sharp, { Sharp } from 'sharp';
declare type ImageSize = {
    width: number;
    height: number;
};
declare type ImageSourceType = 'color' | 'url' | 'path';
declare type InputImageFormat = 'jpeg' | 'png' | 'svg';
declare type OutputImageFormat = 'jpeg' | 'png' | 'ico';
declare type ResourceOptions = {
    sharpInstance: Sharp;
};
declare type ImageResourceSaveAsOptions = {
    outDirectory: string;
    name: string;
    ext: 'jpeg' | 'png' | 'ico';
};
declare class ImageResource {
    static inputImageFormats: InputImageFormat[];
    static outputImageFormats: OutputImageFormat[];
    protected readonly sharpInstance: Sharp;
    constructor(options: ResourceOptions);
    addForeground(options: (ImageSize & {
        image: ImageResource;
        padding: string;
    })): Promise<ImageResource>;
    extractProportionalArea(child: ImageSize & {
        resize?: boolean;
    }): Promise<ImageResource>;
    getSize(): Promise<{
        width: number;
        height: number;
    }>;
    saveAs(options: ImageResourceSaveAsOptions): Promise<{
        imageSrc: string;
    }>;
    getHrefBase64(newSize?: ImageSize): Promise<string>;
    getFormat(): Promise<keyof sharp.FormatEnum | undefined>;
    cloneResizeBuffer({ width, height }: ImageSize): Promise<Buffer>;
    protected createDirectory(directory: string): void;
    protected createFilename(directory: string, name: string, extension?: string): string;
    protected writeFileSync(path: string, value: string | NodeJS.ArrayBufferView): void;
    getBuffer(): Promise<Buffer>;
    private applyInnerPaddingToSize;
    private adjustSizeToFit;
    private getOffsetToCenter;
    static isFormatSupported(value: string): boolean;
}
declare function createSharpInstance(input?: Parameters<typeof sharp>[0], options?: Parameters<typeof sharp>[1]): sharp.Sharp;
declare function extractExtensionFromPath(value: string): string;
declare function createImageResourceFromFile(filepath: string): Promise<ImageResource>;
declare function createImageResourceFromColor(color: string, width: number, height: number): Promise<ImageResource>;
declare function createImageResourceFromBuffer(buffer: Buffer): Promise<ImageResource>;
export { extractExtensionFromPath, createImageResourceFromColor, createImageResourceFromFile, createImageResourceFromBuffer, createSharpInstance, ImageResource, ImageSourceType, ImageSize, ImageResourceSaveAsOptions };

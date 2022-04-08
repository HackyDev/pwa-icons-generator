/// <reference types="node" />
import { INode } from 'svgson';
declare type ImageSourceType = 'url' | 'color' | 'path' | 'buffer';
declare type InputImageFormat = 'jpeg' | 'png' | 'svg';
declare type OutputImageFormat = 'svg';
declare type ImageSize = {
    width: number;
    height: number;
};
declare type SvgResourceOptions = {
    buffer: Buffer;
    imageSourceType: ImageSourceType;
    imageSource: string | Buffer;
    bufferImageType: InputImageFormat;
};
declare type SvgResourceSaveAsOptions = {
    outDirectory: string;
    name: string;
};
declare type CreateSvgRootOptions = {
    width: number | string;
    height: number | string;
};
declare class SvgResource {
    buffer: Buffer;
    imageSourceType: ImageSourceType;
    imageSource: string | Buffer;
    bufferImageType: InputImageFormat;
    static inputImageFormats: InputImageFormat[];
    static outputImageFormat: OutputImageFormat[];
    constructor(options: SvgResourceOptions);
    saveAs(options: SvgResourceSaveAsOptions): Promise<{
        imageSrc: string;
    }>;
    addForeground(options: (ImageSize & {
        image: SvgResource;
        padding: string;
    })): Promise<SvgResource>;
    private createFitSvgGroup;
    private createContainSvgGroup;
    private createSvgImage;
    private applyInnerPaddingToSize;
    private parsePadding;
    private adjustSizeToFit;
    private adjustSizeToContain;
    getHrefBase64(newSize?: ImageSize): Promise<string>;
    private getSize;
    private createFilename;
    private createDirectory;
    private writeFileSync;
    private createSvgFromImages;
    static createSvgRoot(options: CreateSvgRootOptions): INode;
    static isFormatSupported(value: string): boolean;
}
declare function createSvgResourceFromColor(color: string, width: number, height: number): SvgResource;
declare function createSvgResourceFromBuffer(buffer: Buffer): Promise<SvgResource>;
declare function createSvgResourceFromFile(filepath: string): Promise<SvgResource>;
export { SvgResource, createSvgResourceFromColor, createSvgResourceFromBuffer, createSvgResourceFromFile };

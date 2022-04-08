import { DefaultConfig, DefaultIcon } from './defaults';
declare type Output = {
    items: {
        name: string;
        path: string;
        outDirectory: string;
        ext: 'jpeg' | 'png' | 'ico' | 'svg';
        preventEmit?: boolean;
        padding?: string;
        width?: number;
        height?: number;
        linkTag?: string;
        manifestIcon?: {
            src: string;
            type: string;
            sizes: string;
        };
    }[];
    linkTags: string;
    manifest: {
        icons: {
            src: string;
            type: string;
            sizes: string;
        }[];
    };
};
declare type PrimaryConfigIcon = {
    name: string;
    width: number;
    height: number;
    padding?: string;
    bg?: string;
    fg?: string;
    ext?: 'jpeg' | 'png' | 'ico' | 'svg';
    outDirectory?: string;
    preventEmit?: boolean;
    linkTag?: {
        attributes: Record<string, string | number>;
    };
    pathPrefix?: string;
    manifest?: boolean;
};
declare type PrimaryConfigBase = {
    bg?: string;
    ext?: 'jpeg' | 'png';
    padding?: string;
    outDirectory?: string;
    pathPrefix?: string;
    linkTags?: {
        attributes: Record<string, string | number>;
    };
    preventEmit?: boolean;
    preventLogs?: boolean;
};
declare type PrimaryConfigWithFg = PrimaryConfigBase & {
    fg: string;
    icons?: PrimaryConfigIcon[];
};
declare type PrimaryConfigWithIcons = PrimaryConfigBase & {
    fg?: string;
    icons: PrimaryConfigIcon[];
};
declare type PrimaryConfig = PrimaryConfigWithFg | PrimaryConfigWithIcons;
declare type SecondaryConfig = {
    bg?: string;
    ext?: 'jpeg' | 'png';
    padding?: string;
    outDirectory?: string;
    pathPrefix?: string;
    linkTags?: {
        attributes: Record<string, string | number>;
    };
    preventEmit?: boolean;
    preventLogs?: boolean;
};
declare type TargetConfig = {
    fg: string;
    bg: string;
    ext: 'jpeg' | 'png';
    padding: string;
    outDirectory: string;
    pathPrefix: string;
    linkTags: {
        attributes: Record<string, string | number>;
    };
    preventEmit: boolean;
    preventLogs: boolean;
};
declare type TargetIcon = {
    name: string;
    width: number;
    height: number;
    manifest: boolean;
    fg: string;
    bg: string;
    ext: 'jpeg' | 'png' | 'ico' | 'svg';
    padding: string;
    outDirectory: string;
    pathPrefix: string;
    linkTags: {
        attributes: Record<string, string | number>;
    };
    preventEmit: boolean;
};
declare function processAndCopyMainParams(pathOrPrimaryConfig: string | PrimaryConfig, secondaryConfig?: SecondaryConfig): {
    configs: {
        primary: PrimaryConfig | undefined;
        secondary: SecondaryConfig;
    };
    path: string | undefined;
};
declare function createTargetConfig(defaultConfig: DefaultConfig, primaryConfig?: PrimaryConfig, secondaryConfig?: SecondaryConfig, path?: string): TargetConfig;
declare function createTargetIcons(targetConfig: TargetConfig, defaultIcons: DefaultIcon[], primaryConfigIcons?: PrimaryConfigIcon[]): TargetIcon[];
declare function processTargetIcons(icons: TargetIcon[]): Promise<void>;
declare function createOutput(icons: TargetIcon[]): Promise<Output>;
declare function getImageSourceType(value: string): "color" | "path" | "url";
export { processAndCopyMainParams, createTargetConfig, createTargetIcons, getImageSourceType, processTargetIcons, createOutput };
export type { PrimaryConfig, SecondaryConfig, Output };

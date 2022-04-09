import { PrimaryConfigIcon } from './helpers';
declare type DefaultConfig = {
    projectNameCamel: string;
    fg: string;
    bg: string;
    ext: 'jpeg' | 'png';
    padding: string;
    outDirectory: string;
    pathPrefix: string;
    linkTags: {
        attributes: Record<string, string | number>;
    };
    fgMinSize: number;
    preventEmit: boolean;
    preventLogs: boolean;
};
declare type DefaultIcon = {
    name: string;
    width: number;
    height: number;
    manifest?: boolean;
    ext?: 'jpeg' | 'png' | 'ico' | 'svg';
    linkTag?: {
        attributes: Record<string, string | number>;
    };
};
declare function getDefaultIcons(): PrimaryConfigIcon[];
declare function getDefaultConfig(): DefaultConfig;
export { getDefaultConfig, getDefaultIcons };
export type { DefaultConfig, DefaultIcon };

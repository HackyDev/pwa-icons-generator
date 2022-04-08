"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultIcons = exports.getDefaultConfig = void 0;
function getDefaultIcons() {
    const icons = [{
            name: 'favicon',
            width: 32,
            height: 32,
            ext: 'ico',
            linkTag: {
                attributes: { rel: 'icon', sizes: 'any' }
            }
        }, {
            name: 'apple-touch-icon',
            width: 180,
            height: 180,
            linkTag: {
                attributes: { rel: 'apple-touch-icon' }
            }
        }, {
            name: 'icon-192',
            width: 192,
            height: 192,
            manifest: true
        }, {
            name: 'icon-512',
            width: 512,
            height: 512,
            manifest: true
        }, {
            name: 'icon',
            width: 32,
            height: 32,
            ext: 'svg',
            linkTag: {
                attributes: { rel: 'icon' }
            }
        }];
    return icons;
}
exports.getDefaultIcons = getDefaultIcons;
function getDefaultConfig() {
    const config = {
        projectNameCamel: 'pwaIconsGenerator',
        fgMinSize: 512,
        bg: '#ffffff00',
        fg: 'black',
        outDirectory: 'dist',
        padding: '0px',
        ext: 'png',
        pathPrefix: '',
        preventEmit: false,
        preventLogs: true,
        linkTags: { attributes: {} }
    };
    return config;
}
exports.getDefaultConfig = getDefaultConfig;

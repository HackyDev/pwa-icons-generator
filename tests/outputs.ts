import { Output } from '../src/helpers'

function getOutput (key: string) {
  const outputs: Record<string, Output> = {
    example1: {
      items: [
        {
          name: 'favicon',
          outDirectory: 'dist',
          ext: 'ico',
          preventEmit: false,
          padding: '0px',
          width: 32,
          height: 32,
          path: 'favicon.ico',
          linkTag: '<link href="favicon.ico" rel="icon" sizes="any">'
        },
        {
          name: 'apple-touch-icon',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '0px',
          width: 180,
          height: 180,
          path: 'apple-touch-icon.png',
          linkTag: '<link href="apple-touch-icon.png" rel="apple-touch-icon">'
        },
        {
          name: 'icon-192',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '0px',
          width: 192,
          height: 192,
          path: 'icon-192.png',
          linkTag: '<link href="icon-192.png">'
        },
        {
          name: 'icon-512',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '0px',
          width: 512,
          height: 512,
          path: 'icon-512.png',
          linkTag: '<link href="icon-512.png">'
        },
        {
          name: 'icon',
          outDirectory: 'dist',
          ext: 'svg',
          preventEmit: false,
          padding: '0px',
          width: 32,
          height: 32,
          path: 'icon.svg',
          linkTag: '<link type="image/svg+xml" href="icon.svg" rel="icon">'
        }
      ],
      linkTags: '<link href="favicon.ico" rel="icon" sizes="any"><link href="apple-touch-icon.png" rel="apple-touch-icon"><link type="image/svg+xml" href="icon.svg" rel="icon">',
      manifest: {
        icons: [
          { src: 'icon-192.png', type: 'image/png', sizes: '192x192' },
          { src: 'icon-512.png', type: 'image/png', sizes: '512x512' }
        ]
      }
    },
    example2: {
      items: [
        {
          name: 'favicon',
          outDirectory: 'dist/icons',
          ext: 'ico',
          preventEmit: false,
          padding: '10%',
          width: 32,
          height: 32,
          path: 'favicon.ico',
          linkTag: '<link href="favicon.ico" rel="icon" sizes="any">'
        },
        {
          name: 'apple-touch-icon',
          outDirectory: 'dist/icons',
          ext: 'jpeg',
          preventEmit: false,
          padding: '10%',
          width: 180,
          height: 180,
          path: 'apple-touch-icon.jpeg',
          linkTag: '<link href="apple-touch-icon.jpeg" rel="apple-touch-icon">'
        },
        {
          name: 'icon-192',
          outDirectory: 'dist/icons',
          ext: 'jpeg',
          preventEmit: false,
          padding: '10%',
          width: 192,
          height: 192,
          path: 'icon-192.jpeg',
          linkTag: '<link href="icon-192.jpeg">'
        },
        {
          name: 'icon-512',
          outDirectory: 'dist/icons',
          ext: 'jpeg',
          preventEmit: false,
          padding: '10%',
          width: 512,
          height: 512,
          path: 'icon-512.jpeg',
          linkTag: '<link href="icon-512.jpeg">'
        },
        {
          name: 'icon',
          outDirectory: 'dist/icons',
          ext: 'svg',
          preventEmit: false,
          padding: '10%',
          width: 32,
          height: 32,
          path: 'icon.svg',
          linkTag: '<link type="image/svg+xml" href="icon.svg" rel="icon">'
        }
      ],
      linkTags: '<link href="favicon.ico" rel="icon" sizes="any"><link href="apple-touch-icon.jpeg" rel="apple-touch-icon"><link type="image/svg+xml" href="icon.svg" rel="icon">',
      manifest: {
        icons: [
          {
            src: 'icon-192.jpeg',
            type: 'image/jpeg',
            sizes: '192x192'
          },
          {
            src: 'icon-512.jpeg',
            type: 'image/jpeg',
            sizes: '512x512'
          }
        ]
      }
    },
    example3: {
      items: [
        {
          name: 'my-icon',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '10px',
          width: 1280,
          height: 720,
          path: 'my-icon.png',
          linkTag: '<link href="my-icon.png">'
        }
      ],
      linkTags: '<link href="my-icon.png">',
      manifest: { icons: [] }
    },
    example5: {
      items: [
        {
          name: 'favicon',
          outDirectory: 'dist',
          ext: 'ico',
          preventEmit: false,
          padding: '10px',
          width: 32,
          height: 32,
          path: 'favicon.ico',
          linkTag: '<link href="favicon.ico" rel="icon" sizes="any">'
        },
        {
          name: 'apple-touch-icon',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '10px',
          width: 180,
          height: 180,
          path: 'apple-touch-icon.png',
          linkTag: '<link href="apple-touch-icon.png" rel="apple-touch-icon">'
        },
        {
          name: 'icon-192',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '10px',
          width: 192,
          height: 192,
          path: 'icon-192.png',
          linkTag: '<link href="icon-192.png">'
        },
        {
          name: 'icon-512',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '10px',
          width: 512,
          height: 512,
          path: 'icon-512.png',
          linkTag: '<link href="icon-512.png">'
        },
        {
          name: 'icon',
          outDirectory: 'dist',
          ext: 'svg',
          preventEmit: false,
          padding: '10px',
          width: 32,
          height: 32,
          path: 'icon.svg',
          linkTag: '<link type="image/svg+xml" href="icon.svg" rel="icon">'
        },
        {
          name: 'my-icon',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '10px',
          width: 1280,
          height: 720,
          path: 'my-icon.png',
          linkTag: '<link href="my-icon.png">'
        }
      ],
      linkTags: '<link href="favicon.ico" rel="icon" sizes="any"><link href="apple-touch-icon.png" rel="apple-touch-icon"><link type="image/svg+xml" href="icon.svg" rel="icon"><link href="my-icon.png">',
      manifest: {
        icons: [
          { src: 'icon-192.png', type: 'image/png', sizes: '192x192' },
          { src: 'icon-512.png', type: 'image/png', sizes: '512x512' }
        ]
      }
    },
    example6: {
      items: [
        {
          name: 'my-icon',
          outDirectory: 'dist',
          ext: 'png',
          preventEmit: false,
          padding: '0px',
          width: 1280,
          height: 720,
          path: 'my-icon.png',
          linkTag: '<link href="my-icon.png" my-attribute="my-value">'
        },
        {
          name: 'my-manifest-icon',
          outDirectory: 'dist/manifest-icons',
          ext: 'png',
          preventEmit: false,
          padding: '0px',
          width: 1000,
          height: 1000,
          path: '/manifest-icons/my-manifest-icon.png',
          linkTag: '<link href="/manifest-icons/my-manifest-icon.png">'
        }
      ],
      linkTags: '<link href="my-icon.png" my-attribute="my-value">',
      manifest: {
        icons: [
          {
            src: '/manifest-icons/my-manifest-icon.png',
            type: 'image/png',
            sizes: '1000x1000'
          }
        ]
      }
    }
  }
  return outputs[key]
}

export { getOutput }

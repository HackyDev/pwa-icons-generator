## pwa-icons-generator

You only need **5 icons** to meet most needs! Don't believe me? Check out this awesome [article](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) written
by the author of PostCSS and Autoprefixer.

This tool generates these **5 icons** and much more!


### Features
- Generates icons in a directory of your choosing
 - input  formats: `png`, `jpeg`, `svg` *(use `svg` for better results)*
 - output formats: `png`, `jpeg`, `svg`, `ico`
 - input sizes: any *(for default icons use a resolution of at least 512x512 or `SVG`)*
 - output sizes: any
- Typescript support

### Caveats

- `pwa-icons-generator` does **not** generate `manifest.json` and does **not** inject link tags into `index.html`. Instead, it generates output object contaning all information your PWA app may need.

- When `pwa-icons-generator` generates SVG icons it does **not** vectorize input images. Instead, it includes them into an output file as `<image xlink:href="${base64}">` tags. So, if your app has strict CSP it may cause some issues.

### Installation

```
npm i -D pwa-icons-generator
```

### Importing everything you may need
```js
import pwaIconsGenerator, { getDefaultIcons } from 'pwa-icons-generator'
import type { PrimaryConfig, SecondaryConfig, Output } from 'pwa-icons-generator'
```

### Usage simple

##### Example 1
Generates **5 icons** and saves them to `dist` folder

```js
const foregroundImage = `files/fg-square.svg` // local file or URL
const output: Output = await pwaIconsGenerator(foregroundImage)
```
##### Example 2
Generates **5 icons** (as in the previous example) and applies some options.

```js
  const config: SecondaryConfig = {
    bg: 'black', // color or image to use as background
    padding: '10%',
    outDirectory: 'dist/icons',
    ext: 'jpeg'
    // other options are available
  }

  const output = await pwaIconsGenerator('files/fg-square.svg', config)
```

### Usage advanced

##### Example 3
If you want to generate **custom icons**, here's how you do it.
```js
  const myIcons: PrimaryConfig['icons'] = [{
    name: 'my-icon',
    width: 1280,
    height: 720
  }]

  const config: PrimaryConfig = {
    fg: 'files/fg.svg', // foreground image
    bg: '#ffffff00',
    padding: '10px',
    outDirectory: 'dist',
    ext: 'png' as const,
    icons: [...myIcons]
  }

  const output: Output = await pwaIconsGenerator(config)
```
##### Example 4 (same result  as 3)
```js
  const myIcons: PrimaryConfig['icons'] = [{
    name: 'my-icon',
    width: 1280,
    height: 720,
    fg: 'files/fg-square.svg',
    bg: '#ffffff00',
    padding: '10px',
    outDirectory: 'dist',
    ext: 'png' as const
  }]

  const config: PrimaryConfig = {
    icons: [...myIcons]
  }

  const output: Output = await pwaIconsGenerator(config)
```
##### Example 5

If you want to use default icons as well as custom icons, here's how you do it.

Generates **5 default icons** and **1 additional**
```js
  const defaultIcons = getDefaultIcons()

  const myIcons: PrimaryConfig['icons'] = [{
    name: 'my-icon',
    width: 1280,
    height: 720
  }]

  const config: PrimaryConfig = {
    fg: 'files/fg-square.svg',
    bg: '#ffffff00',
    padding: '10px',
    outDirectory: 'dist',
    ext: 'png' as const,
    icons: [...defaultIcons, ...myIcons]
  }

  const output: Output = await pwaIconsGenerator(config)
```

#### Output, manifest and link tags

##### Example 6
This is an example of how you can separate icons to be used in `manifest.json` and `index.html`

```js
  const myIcons: PrimaryConfig['icons']  = [{
    name: 'my-icon',
    width: 1280,
    height: 720,
    linkTag: {
      attributes: { 'my-attribute': 'my-value' }
    }
  }, {
    name: 'my-manifest-icon',
    width: 1000,
    height: 1000,
    outDirectory: 'dist/manifest-icons',
    pathPrefix: '/manifest-icons',
    manifest: true
  }]

  const config: PrimaryConfig = {
    fg: 'files/fg-square.svg',
    icons: [...myIcons]
  }

  const output: Output = await pwaIconsGenerator(config)

/* OUTPUT (some properties omitted)
  {
    linkTags: '<link href="my-icon.png" my-attribute="my-value">',
    manifest: {
      icons: [{
        src: '/manifest-icons/my-manifest-icon.png',
        type: 'image/png',
        sizes: '1000x1000'
      }]
    }
  }
*/
```



### Tips
- Use SVG for better results
- Options in icons **override** options in config. 
In the example below `my-icon` icon will use `files/fg-square.svg` as a foreground image while `my-icon-2` will use `files/fg-rect-vert.svg`

```js
  const config: PrimaryConfig = {
    fg: 'files/fg-square.svg',
    icons: [{
      name: 'my-icon',
      width: 1280,
      height: 720
    }, {
      name: 'my-icon-2',
      width: 1000,
      height: 1000,
      fg: 'files/fg-rect-vert.svg'
    }]
  }
```

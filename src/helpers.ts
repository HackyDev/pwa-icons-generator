import path from 'path'
import request from 'request'
import { createCopy, isUrl, isFilePath } from './utils'
import { DefaultConfig, DefaultIcon } from './defaults'
import AppError from './modules/AppError'
import {
  ImageResource,
  createImageResourceFromColor,
  createImageResourceFromFile,
  createImageResourceFromBuffer,
  extractExtensionFromPath
} from './modules/ImageResource'

import {
  SvgResource,
  createSvgResourceFromColor,
  createSvgResourceFromBuffer,
  createSvgResourceFromFile
} from './modules/SvgResource'
import { type } from 'os'

type Output = {
  items: {
    name: string
    path: string
    outDirectory: string
    ext: 'jpeg' | 'png' | 'ico' | 'svg'
    preventEmit?: boolean
    padding?: string
    width?: number
    height?: number
    linkTag?: string
    manifestIcon?: {
      src: string
      type: string
      sizes: string
    }
  }[]
  linkTags: string
  manifest: {
    icons: {
      src: string
      type: string
      sizes: string
    }[]
  }
}

type PrimaryConfigIcon = {
  name: string
  // eg. "10px" or "10%" (value of 'padding' in item overrides 'padding' value in user config)
  width: number
  height: number
  padding?: string
  // eg. "black" or "#ffffff" or "rgba(255, 255, 255, 0)" or "/files/bg.png" (value in item overrides value in user config)
  bg?: string
  // eg. "/files/bg.png"
  fg?: string
  ext?: 'jpeg' | 'png' | 'ico' | 'svg'
  // directory where generated files will be emitted to
  outDirectory?: string
  // prevents emitting files to 'outDirectory'
  preventEmit?: boolean
  // options to create a link tag to be inserted into html
  linkTag?: {
    attributes: Record<string, string | number>
  }
  // value to be prepended to href in link tag or src in manifest icon
  pathPrefix?: string
  // whether this icon is used in manifest
  manifest?: boolean
}

type PrimaryConfigBase = {
  // path to an image file
  bg?: string
  ext?: 'jpeg' | 'png'
  padding?: string
  outDirectory?: string

  pathPrefix?: string
  // copies provided svg to 'outDirectory' and adds link tag to output
  linkTags?: {
    attributes: Record<string, string | number>
  }
  preventEmit?: boolean
  preventLogs?: boolean
}
type PrimaryConfigWithFg = PrimaryConfigBase & {
  fg: string
  icons?: PrimaryConfigIcon[]
}
type PrimaryConfigWithIcons = PrimaryConfigBase & {
  fg?: string
  icons: PrimaryConfigIcon[]
}

type PrimaryConfig = PrimaryConfigWithFg | PrimaryConfigWithIcons

type SecondaryConfig = {
  bg?: string
  ext?: 'jpeg' | 'png'
  padding?: string
  outDirectory?: string
  pathPrefix?: string
  linkTags?: {
    attributes: Record<string, string | number>
  }
  preventEmit?: boolean
  preventLogs?: boolean
}

type TargetConfig = {
  // color or url or path
  fg: string
  // color or url or path
  bg: string
  // out icon extension
  ext: 'jpeg' | 'png'
  // '10px' or '10%'
  padding: string
  outDirectory: string
  pathPrefix: string
  linkTags: {
    attributes: Record<string, string | number>
  }
  preventEmit: boolean
  preventLogs: boolean
}

type TargetIcon = {
  name: string
  width: number
  height: number
  manifest: boolean
  fg: string
  bg: string
  ext: 'jpeg' | 'png' | 'ico' | 'svg'
  padding: string
  outDirectory: string
  pathPrefix: string
  linkTags: {
    attributes: Record<string, string | number>
  }
  preventEmit: boolean
}

type FileFromUrl = {
  buffer: Buffer
  imageFormat?: string
}

// CONFIGS PROCESSING

function processAndCopyMainParams (pathOrPrimaryConfig: string | PrimaryConfig, secondaryConfig: SecondaryConfig = {}) {
  const path = typeof pathOrPrimaryConfig === 'string' ? pathOrPrimaryConfig : undefined
  const primaryConfig = typeof pathOrPrimaryConfig === 'string' ? undefined : pathOrPrimaryConfig
  return createCopy({ configs: { primary: primaryConfig, secondary: secondaryConfig }, path })
}

function createTargetConfig (defaultConfig: DefaultConfig, primaryConfig?: PrimaryConfig, secondaryConfig?: SecondaryConfig, path?: string) {
  try {
    if (!path && !primaryConfig) {
      throw new AppError({ code: 'primaryConfigNotFound', message: 'Please provide primary config or icon path' })
    }
    primaryConfig = primaryConfig || { fg: defaultConfig.fg }
    secondaryConfig = secondaryConfig || {}
    const targetConfig: TargetConfig = {
      fg: path || primaryConfig.fg || defaultConfig.fg,
      bg: primaryConfig.bg || secondaryConfig.bg || defaultConfig.bg,
      ext: primaryConfig.ext || secondaryConfig.ext || defaultConfig.ext,
      padding: primaryConfig.padding || secondaryConfig.padding || defaultConfig.padding,
      outDirectory: primaryConfig.outDirectory || secondaryConfig.outDirectory || defaultConfig.outDirectory,
      pathPrefix: primaryConfig.pathPrefix || secondaryConfig.pathPrefix || defaultConfig.pathPrefix,
      linkTags: primaryConfig.linkTags || secondaryConfig.linkTags || defaultConfig.linkTags,
      preventEmit: primaryConfig.preventEmit || secondaryConfig.preventEmit || defaultConfig.preventEmit,
      preventLogs: primaryConfig.preventLogs || secondaryConfig.preventLogs || defaultConfig.preventLogs
    }
    return targetConfig
  } catch (error: unknown) {
    throw new AppError({ code: 'createTargetConfigFail', error })
  }
}

// ICONS PROCESSING

function createTargetIcons (targetConfig: TargetConfig, defaultIcons: DefaultIcon[], primaryConfigIcons?: PrimaryConfigIcon[]) {
  try {
    if (primaryConfigIcons) {
      const targetIcons: TargetIcon[] = primaryConfigIcons.map(icon => {
        const linkTagAttributes = (icon.linkTag && icon.linkTag.attributes) || {}
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
        }
      })
      return targetIcons
    } else {
      const targetIcons: TargetIcon[] = defaultIcons.map(icon => {
        const linkTagAttributes = (icon.linkTag && icon.linkTag.attributes) || {}
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
        }
      })
      return targetIcons
    }
  } catch (error: unknown) {
    throw new AppError({ code: 'createTargetIconsError', error })
  }
}

async function processTargetIcons (icons: TargetIcon[]) {
  let icon: TargetIcon | undefined
  try {
    for (icon of icons) {
      if (icon.ext === 'svg') {
        const { outDirectory, name, width, height, padding } = icon
        const bgResource = await createSvgResource('bg', icon)
        const fgResource = await createSvgResource('fg', icon)
        const composited = await bgResource.addForeground({ image: fgResource, padding, width, height })
        await composited.saveAs({ outDirectory, name })
      } else {
        const { ext, width, height, padding, outDirectory, name } = icon
        const bgResource = await createImageResource('bg', icon)
        const fgResource = await createImageResource('fg', icon)
        const composited = await bgResource.addForeground({ image: fgResource, width, height, padding })
        composited.saveAs({ outDirectory, name, ext })
      }
    }
  } catch (error) {
    throw new AppError({ code: 'processTargetIconsError', error, debug: { icon } })
  }
}

/**
 * Creates ImageResource from target icon
 *
 * ImageResouce differs from SvgResource in that it can not save 'SVG' files
 */
async function createImageResource (type: 'fg' | 'bg', icon: TargetIcon) {
  try {
    const { width, height } = icon
    const imageSource = icon[type]
    const imageSourceType = getImageSourceType(imageSource)
    let resource: ImageResource

    if (imageSourceType === 'path') {
      const fileExtension = extractExtensionFromPath(imageSource)
      if (SvgResource.isFormatSupported(fileExtension)) {
        resource = await createImageResourceFromFile(imageSource)
      } else {
        const message = `It is currently not possible to create an icon from a file with "${fileExtension}" extension`
        throw new AppError({ code: 'createImageResourceError', message, debug: { icon } })
      }
    } else if (imageSourceType === 'color') {
      resource = await createImageResourceFromColor(imageSource, width, height)
    } else if (imageSourceType === 'url') {
      const { buffer, imageFormat = '' } = await getFileFromUrl(imageSource)
      if (SvgResource.isFormatSupported(imageFormat)) {
        resource = await createImageResourceFromBuffer(buffer)
      } else {
        throw new AppError({ code: 'createImageResourceError', message: 'Unsupported image format from URL', debug: { icon } })
      }
    } else {
      throw new AppError({ code: 'createImageResourceError', message: 'Unknown image source type', debug: { icon } })
    }
    return resource
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    } else {
      throw new AppError({ code: 'createImageResourceFail', error, debug: { icon } })
    }
  }
}

/**
 * Creates SvgResource from target icon
 *
 * ImageResouce differs from SvgResource in that it can save 'SVG' files
 */
async function createSvgResource (type: 'fg' | 'bg', icon: TargetIcon) {
  try {
    const { width, height } = icon
    const imageSource = icon[type]
    const imageSourceType = getImageSourceType(icon[type])
    let resource: SvgResource

    if (imageSourceType === 'path') {
      const fileExtension = extractExtensionFromPath(imageSource)
      if (SvgResource.isFormatSupported(fileExtension)) {
        resource = await createSvgResourceFromFile(imageSource)
      } else {
        const message = `It is currently not possible to create a "SVG" icon from a file with "${fileExtension}" extension`
        throw new AppError({ code: 'createSvgResourceError', message, debug: { icon } })
      }
    } else if (imageSourceType === 'color') {
      resource = createSvgResourceFromColor(imageSource, width, height)
    } else if (imageSourceType === 'url') {
      const { buffer, imageFormat = '' } = await getFileFromUrl(imageSource)
      if (SvgResource.isFormatSupported(imageFormat)) {
        resource = await createSvgResourceFromBuffer(buffer)
      } else {
        throw new AppError({ code: 'createSvgResourceError', message: 'Unsupported image format from URL', debug: { icon } })
      }
    } else {
      throw new AppError({ code: 'createSvgResourceError', message: 'Unknown image source type', debug: { icon } })
    }
    return resource
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    } else {
      throw new AppError({ code: 'createSvgResourceFail', error, debug: { icon } })
    }
  }
}

/* OUTPUT */

async function createOutput (icons: TargetIcon[]) {
  const output: Output = {
    items: [],
    linkTags: '',
    manifest: { icons: [] }
  }
  for (const icon of icons) {
    const path = createOutputLinkPath(icon)
    const linkTag = createOutputLinkTag(icon, path)
    output.items.push(createManifestItem(icon, path, linkTag))
    if (icon.manifest) {
      output.manifest.icons.push(createOutputManifestIcon(icon, path))
    } else {
      output.linkTags += linkTag
    }
  }
  return output
}

function createManifestItem (icon: TargetIcon, path: string, linkTag: string) {
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
  }
}

function createOutputManifestIcon (icon: TargetIcon, path: string) {
  return {
    src: path,
    type: `image/${icon.ext}`,
    sizes: `${icon.width}x${icon.height}`
  }
}

function createOutputLinkPath (item: TargetIcon) {
  return path.join(item.pathPrefix, `${item.name}.${item.ext}`)
}

function createOutputLinkTag (icon: TargetIcon, href: string) {
  const attributes: string[] = []
  const data: Record<string, string | number> = {}
  if (icon.ext === 'svg') {
    data.type = 'image/svg+xml'
  }
  Object.assign(data, { href }, icon.linkTags.attributes)
  for (const key in data) {
    attributes.push(`${key}="${data[key]}"`)
  }
  return `<link ${attributes.join(' ')}>`
}

// MISC

function getImageSourceType (value: string) {
  if (isUrl(value)) {
    return 'url'
  } else if (isFilePath(value)) {
    return 'path'
  } else {
    return 'color'
  }
}

const getFileFromUrl = (() => {
  const cacheMap = new Map<string, FileFromUrl>()
  return async function (url: string) {
    const getBody = (url: string): Promise<FileFromUrl> => new Promise<FileFromUrl>((resolve, reject) => {
      if (cacheMap.has(url)) {
        return resolve(cacheMap.get(url) as FileFromUrl)
      }
      request({ url, encoding: null }, (e, res, buffer) => {
        if (e) {
          return reject(e)
        } else if (res.statusCode >= 200 && res.statusCode < 300) {
          const contentType = res.headers['content-type']
          let imageFormat = contentType && contentType.split('/')[1]
          imageFormat = imageFormat && imageFormat.includes('svg') ? 'svg' : imageFormat
          const out = { buffer, imageFormat }
          cacheMap.set(url, out)
          return resolve({ buffer, imageFormat })
        } else {
          return reject(new Error(`Failed to fetch file ${res.statusCode}`))
        }
      })
    })
    return await getBody(url)
  }
})()

export { processAndCopyMainParams, createTargetConfig, createTargetIcons, getImageSourceType, processTargetIcons, createOutput }
export type { PrimaryConfig, SecondaryConfig, Output }

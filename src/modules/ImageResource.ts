import path from 'path'
import sharp, { Sharp } from 'sharp'
import fs from 'fs'
import pngToIco from 'png-to-ico'

type ImageSize = {
  width: number
  height: number
}
type ImageSourceType = 'color' | 'url' | 'path'
type InputImageFormat = 'jpeg' | 'png' | 'svg'
type OutputImageFormat = 'jpeg' | 'png' | 'ico'
type ResourceOptions = { sharpInstance: Sharp; }
type ImageResourceSaveAsOptions = {
  outDirectory: string
  name: string
  ext: 'jpeg' | 'png' | 'ico'
}

class ImageResource {
  static inputImageFormats: InputImageFormat[] = ['png', 'jpeg', 'svg']
  static outputImageFormats: OutputImageFormat[] = ['jpeg', 'png', 'ico']
  protected readonly sharpInstance: Sharp

  constructor (options: ResourceOptions) {
    this.sharpInstance = options.sharpInstance
  }

  public async addForeground (options: (ImageSize & { image: ImageResource; padding: string; })) {
    const { image, padding, width, height } = options
    const topImageSize = await image.getSize()
    const bottomImageExtracted = await this.extractProportionalArea({ width, height, resize: true })

    const bottomImageSizeInnerPadded = this.applyInnerPaddingToSize({ width, height }, padding)
    const topImageSizeFit = this.adjustSizeToFit(bottomImageSizeInnerPadded, topImageSize)
    const offsetToCenter = this.getOffsetToCenter({ width, height }, topImageSizeFit)

    const topImageResizedBuffer = await image.sharpInstance.clone().resize(topImageSizeFit).toBuffer()

    const composited = bottomImageExtracted.sharpInstance.composite([{
      input: topImageResizedBuffer,
      left: offsetToCenter.x,
      top: offsetToCenter.y
    }])
    const sharpInstance = sharp(await composited.toBuffer())
    return new ImageResource({ sharpInstance })
  }

  public async extractProportionalArea (child: ImageSize & { resize?: boolean; }) {
    const parent = await this.getSize()
    const extracted = this.adjustSizeToFit(parent, child)
    const offset = this.getOffsetToCenter(parent, extracted)
    const buffer = await this.sharpInstance
      .extract({
        left: offset.x,
        top: offset.y,
        width: extracted.width,
        height: extracted.height
      })
      .toBuffer()
    let sharpInstance = sharp(buffer)
    if (child.resize) {
      sharpInstance = sharpInstance.resize(child.width, child.height)
    }
    return new ImageResource({ sharpInstance })
  }

  public async getSize () {
    const { width, height } = await this.sharpInstance.metadata()
    if (width === undefined || height === undefined) {
      throw new Error('getSizeUndefined')
    }
    return { width, height }
  }

  public async saveAs (options: ImageResourceSaveAsOptions) {
    const { outDirectory, name, ext } = options
    const imageSrc = this.createFilename(outDirectory, name, ext)
    this.createDirectory(outDirectory)
    if (ext === 'ico') {
      const instanceBuf = await this.getBuffer()
      const buf = await pngToIco([instanceBuf])
      this.writeFileSync(imageSrc, buf)
      return { imageSrc }
    } else {
      const clone = this.sharpInstance.clone()[ext]()
      await clone.toFile(imageSrc)
      return { imageSrc }
    }
  }

  public async getHrefBase64 (newSize?: ImageSize) {
    const format = await this.getFormat()
    let buffer: Buffer
    if (newSize) {
      buffer = await this.cloneResizeBuffer(newSize)
    } else {
      buffer = await this.sharpInstance.toBuffer()
    }
    const base64 = buffer.toString('base64')
    return `data:image/${format};base64,${base64}`
  }

  public async getFormat () {
    return (await this.sharpInstance.metadata()).format
  }

  public async cloneResizeBuffer ({ width, height }: ImageSize) {
    return this.sharpInstance.clone().resize(width, height).toBuffer()
  }

  protected createDirectory (directory: string) {
    fs.mkdirSync(directory, { recursive: true })
  }

  protected createFilename (directory: string, name: string, extension = 'png') {
    return path.join(directory, `${name}.${extension}`)
  }

  protected writeFileSync (path: string, value: string | NodeJS.ArrayBufferView) {
    fs.writeFileSync(path, value)
  }

  public getBuffer () {
    return this.sharpInstance.toBuffer()
  }

  private applyInnerPaddingToSize (size: ImageSize, padding: string) {
    if (!padding) return size
    const { width, height } = size
    const out = { width: 0, height: 0 }
    if (padding.endsWith('%')) {
      const percent = Number(padding.slice(0, -1)) / 100
      out.width = width - width * percent
      out.height = height - height * percent
    } else if (padding.endsWith('px')) {
      const paddingNum = Number(padding.slice(0, -2))
      out.width = width - paddingNum
      out.height = height - paddingNum
    } else {
      throw new Error(`Padding format is invalid (use "10px" or "10%"), you provided: ${padding}`)
    }
    out.width = Math.round(out.width)
    out.height = Math.round(out.height)
    return out
  }

  private adjustSizeToFit (parent: ImageSize, child: ImageSize) {
    const out = {
      width: parent.width,
      height: parent.height
    }
    if (child.width / child.height >= parent.width / parent.height) {
      out.height = (child.height * parent.width) / child.width
    } else {
      out.width = (child.width * parent.height) / child.height
    }
    out.width = Math.round(out.width)
    out.height = Math.round(out.height)
    return out
  }

  private getOffsetToCenter (parent: ImageSize, child: ImageSize) {
    return {
      x: Math.round((parent.width - child.width) / 2),
      y: Math.round((parent.height - child.height) / 2)
    }
  }

  static isFormatSupported (value: string) {
    return ImageResource.inputImageFormats.includes(value as InputImageFormat)
  }
}

/* HELPERS */

function createSharpInstance (input?: Parameters<typeof sharp>[0], options?: Parameters<typeof sharp>[1]) {
  return sharp(input, options)
}

function extractExtensionFromPath (value: string) {
  return value.split('.').pop() || ''
}

async function createImageResourceFromFile (filepath: string) {
  const extension = extractExtensionFromPath(filepath) as InputImageFormat
  if (ImageResource.inputImageFormats.includes(extension)) {
    const sharpInstance = sharp(filepath)
    return new ImageResource({ sharpInstance })
  } else {
    throw new Error('imageFormatNotSupported')
  }
}

async function createImageResourceFromColor (color: string, width: number, height: number) {
  const buffer = await sharp({ create: { width, height, channels: 4, background: color } })
    .png()
    .toBuffer()
  return createImageResourceFromBuffer(buffer)
}

async function createImageResourceFromBuffer (buffer: Buffer) {
  const sharpInstance = createSharpInstance(buffer)
  return new ImageResource({ sharpInstance })
}

export {
  extractExtensionFromPath,
  createImageResourceFromColor,
  createImageResourceFromFile,
  createImageResourceFromBuffer,
  createSharpInstance,
  ImageResource,
  ImageSourceType,
  ImageSize,
  ImageResourceSaveAsOptions
}

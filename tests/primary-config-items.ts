import { PrimaryConfig } from '../src/helpers'

type CreateIconsOptions = {
  types: string[]
  formats: string[]
  sizes: number[]
  outDirectory: string
}

function createIcons (options: CreateIconsOptions) {
  const { types, formats, sizes, outDirectory } = options
  const out: PrimaryConfig['icons'] = []

  const formatCombinations: [string, string][] = []
  const typesCombinations: [string, string][] = []
  const sizesCombinations: [number, number][] = []

  formats.forEach(format1 => {
    formats.forEach(format2 => {
      formatCombinations.push([format1, format2])
    })
  })

  types.forEach(type1 => {
    types.forEach(type2 => {
      typesCombinations.push([type1, type2])
    })
  })

  sizes.forEach(size1 => {
    sizes.forEach(size2 => {
      sizesCombinations.push([size1, size2])
    })
  })

  typesCombinations.forEach(types => {
    sizesCombinations.forEach(sizes => {
      formatCombinations.forEach(formats => {
        out.push({
          name: `${sizes[0]}x${sizes[1]}-fg-${types[0]}-${formats[0]}-bg-${types[1]}-${formats[1]}`,
          fg: `files/fg-${types[0]}.${formats[0]}`,
          bg: `files/bg-${types[1]}.${formats[1]}`,
          width: sizes[0],
          height: sizes[1],
          outDirectory
        })
        out.push({
          name: `${sizes[0]}x${sizes[1]}-fg-${types[0]}-${formats[0]}-bg-${types[1]}-${formats[1]}`,
          fg: `files/fg-${types[0]}.${formats[0]}`,
          bg: `files/bg-${types[1]}.${formats[1]}`,
          width: sizes[0],
          height: sizes[1],
          ext: 'svg',
          outDirectory
        })
      })
    })
  })

  return out
}

function getPrimaryConfigIcons (outDirectory: string) {
  const types = ['square', 'rect-vert', 'rect-hor']
  const formats = ['svg', 'png']
  const sizes = [100, 200, 600]
  return createIcons({ types, formats, sizes, outDirectory })
}

export { getPrimaryConfigIcons }

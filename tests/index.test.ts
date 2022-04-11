import pwaIconsGenerator, { getDefaultIcons } from '../src'
import { getExampleOutput } from './example-outputs'
import { getBuildHashes } from './build-hashes'
import { getPrimaryConfigIcons } from './primary-config-items'
import fs from 'fs'
import { simpleHash } from './utils'
jest.setTimeout(120000)

describe('Tests outputs for examples from Readme.md', () => {
  test('Example 1', async () => {
    const output = await pwaIconsGenerator('files/fg-square.svg')
    const expected = getExampleOutput('example1')
    expect(output).toEqual(expected)
  })

  test('Example 2', async () => {
    const config = {
      bg: 'black',
      padding: '10%',
      outDirectory: 'dist/icons',
      ext: 'jpeg' as const
    }
    const output = await pwaIconsGenerator('files/fg-square.svg', config)
    const expected = getExampleOutput('example2')
    expect(output).toEqual(expected)
  })

  test('Example 3', async () => {
    const myIcons = [{
      name: 'my-icon',
      width: 1280,
      height: 720
    }]
    const config = {
      fg: 'files/fg-square.svg', // foreground image
      bg: '#ffffff00',
      padding: '10px',
      outDirectory: 'dist',
      ext: 'png' as const,
      icons: [...myIcons]
    }
    const output = await pwaIconsGenerator(config)
    const expected = getExampleOutput('example3')
    expect(output).toEqual(expected)
  })

  test('Example 4', async () => {
    const myIcons = [{
      name: 'my-icon',
      width: 1280,
      height: 720,
      fg: 'files/fg-square.svg',
      bg: '#ffffff00',
      padding: '10px',
      outDirectory: 'dist',
      ext: 'png' as const
    }]
    const config = {
      icons: [...myIcons]
    }
    const output = await pwaIconsGenerator(config)
    const expected = getExampleOutput('example3')
    expect(output).toEqual(expected)
  })

  test('Example 5', async () => {
    const defaultIcons = getDefaultIcons()
    const myIcons = [{
      name: 'my-icon',
      width: 1280,
      height: 720
    }]
    const config = {
      fg: 'files/fg-square.svg',
      bg: '#ffffff00',
      padding: '10px',
      outDirectory: 'dist',
      ext: 'png' as const,
      icons: [...defaultIcons, ...myIcons]
    }
    const output = await pwaIconsGenerator(config)
    const expected = getExampleOutput('example5')
    expect(output).toEqual(expected)
  })

  test('Example 6', async () => {
    const myIcons = [{
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
    const config = {
      fg: 'files/fg-square.svg',
      icons: [...myIcons]
    }
    const output = await pwaIconsGenerator(config)
    const expected = getExampleOutput('example6')
    expect(output).toEqual(expected)
  })
})

describe('Builds variations and compares hashes', () => {
  test('Config 1 output1', async () => {
    const outputKey = 'output1'
    const outputDirectory = `dist/${outputKey}`
    const config = {
      bg: 'green',
      padding: '20%',
      icons: getPrimaryConfigIcons(outputDirectory)
    }
    const output: Record<string, string> = {}
    const { items } = await pwaIconsGenerator(config)
    for (const item of items) {
      const file = fs.readFileSync(`${item.outDirectory}/${item.path}`)
      const hash = simpleHash(file)
      output[item.name] = hash
    }
    const expected = getBuildHashes(outputKey)
    expect(output).toEqual(expected)
  })
})

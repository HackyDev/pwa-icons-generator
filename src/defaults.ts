type DefaultConfig = {
  projectNameCamel: string
  fg: string
  bg: string
  ext: 'jpeg' | 'png'
  padding: string
  outDirectory: string
  pathPrefix: string
  linkTags: {
    attributes: Record<string, string | number>
  }
  fgMinSize: number
  preventEmit: boolean
  preventLogs: boolean
}

  type DefaultIcon = {
    name: string
    width: number
    height: number
    manifest?: boolean
    ext?: 'jpeg' | 'png' | 'ico' | 'svg'
    linkTag?: {
      attributes: Record<string, string | number>
    }
  }

function getDefaultIcons () {
  const icons: DefaultIcon[] = [{
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
  }]
  return icons
}

function getDefaultConfig () {
  const config: DefaultConfig = {
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
  }
  return config
}

export { getDefaultConfig, getDefaultIcons }
export type { DefaultConfig, DefaultIcon }

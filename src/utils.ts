function createCopy<T> (data: T): T {
  return JSON.parse(JSON.stringify(data))
}

function isUrl (value: string) {
  let url
  try {
    url = new URL(value)
  } catch (e) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

function isFilePath (value: string) {
  // TODO
  return value.includes('.')
}

export { createCopy, isFilePath, isUrl }

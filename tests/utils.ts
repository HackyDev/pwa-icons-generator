export function simpleHash (value: unknown) {
  const str = JSON.stringify(value)
  let hash = 0
  let chr
  if (str.length === 0) return String(hash)
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return String(Math.abs(hash))
}
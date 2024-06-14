export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export function uniqBy<T, K>(array: T[], key: (item: T) => K): T[] {
  const seen = new Set<K>()
  return array.filter((item) => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

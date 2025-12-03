const TOKEN_REGEX = /\{([\w.$]+)\}/g

function getPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return acc[key]
    return undefined
  }, obj)
}

export function resolve(value: any, data: any): any {
  if (typeof value === 'string') {
    return value.replace(TOKEN_REGEX, (_, path) => {
      const v = getPath(data, path)
      return v !== undefined && v !== null ? String(v) : ''
    })
  }

  // If array → recurse
  if (Array.isArray(value)) {
    return value.map((item) => resolve(item, data))
  }

  // If object → recurse on each key
  if (value && typeof value === 'object') {
    const result: Record<string, any> = {}
    for (const key in value) {
      result[key] = resolve(value[key], data)
    }
    return result
  }

  // Primitive
  return value
}

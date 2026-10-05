// Đọc tham số trên URL (?page=2&status=blocked) một cách an toàn

export function parsePage(value: unknown): number | undefined {
  const n = Number(value)
  return Number.isInteger(n) && n > 1 ? n : undefined
}

export function parseEnum<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined
}

export function parseText(value: unknown): string | undefined {
  if (typeof value !== 'string' && typeof value !== 'number') return undefined
  const text = String(value).trim()
  return text || undefined
}

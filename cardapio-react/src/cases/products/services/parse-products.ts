import type { Product } from '../dtos/product'

function parseNumber(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value.trim() !== '') return Number(value)
  return NaN
}

export function parseProducts(data: unknown): Product[] {
  const invalidData = () => new Error('A API retornou uma lista de produtos inválida.')
  if (!Array.isArray(data)) throw invalidData()

  const ids = new Set<number>()
  return data.map((value: unknown) => {
    if (typeof value !== 'object' || value === null) throw invalidData()
    const product = value as Record<string, unknown>
    const id = parseNumber(product.id)
    const price = parseNumber(product.price)

    if (!Number.isSafeInteger(id) || ids.has(id)
      || !Number.isFinite(price) || price < 0
      || typeof product.name !== 'string' || !product.name.trim()
      || typeof product.description !== 'string'
      || typeof product.image !== 'string' || !product.image.trim()
      || typeof product.category !== 'string' || !product.category.trim()) {
      throw invalidData()
    }

    ids.add(id)
    return {
      id,
      price,
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
    }
  })
}

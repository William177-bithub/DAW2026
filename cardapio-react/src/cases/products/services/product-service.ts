import { categories } from '../../../data/categories'
import { api } from '../../../lib/axios'
import type { Product } from '../dtos/product'
import { parseProducts } from './parse-products'

export function getCategoryLabel(alias: string) {
  return categories.find((category) => category.alias === alias)?.label ?? alias
}

export const ProductService = {
  async listAll(signal?: AbortSignal): Promise<Product[]> {
    const { data } = await api.get<unknown>('/products', {
      params: { key: 'f38b3c00' },
      signal,
    })
    return parseProducts(data)
  },
}

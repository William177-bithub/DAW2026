import type { Product } from '../dtos/product'
import { ProductCard } from './product-card'

type ProductCardsProps = {
  products: Product[]
  onAdd: (product: Product) => void
}

export function ProductCards({ products, onAdd }: ProductCardsProps) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </>
  )
}

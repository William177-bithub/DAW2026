import type { Product } from '../dtos/product'
import { getCategoryLabel } from '../services/product-service'
import { formatPrice } from '../../../utils/price'

type ProductCardProps = {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const { id, category, image, name, description, price } = product

  return (
    <article>
      <figure>
        <img src={image} alt={name} loading="lazy" />
        <figcaption>{getCategoryLabel(category)}</figcaption>
      </figure>
      <p>ID: {id}</p>
      <h3>{name}</h3>
      <p>{description}</p>
      <p><strong>{formatPrice(price)}</strong></p>
      <button type="button" aria-label={`Adicionar ${name} ao pedido`} onClick={() => onAdd(product)}>
        Adicionar
      </button>
    </article>
  )
}

import { useEffect, useState } from 'react'
import type { Product } from '../dtos/product'
import { ProductService } from '../services/product-service'

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    ProductService.listAll(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setProducts(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError('Não foi possível carregar os produtos. Tente novamente.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [loadAttempt]);

  function retryLoad() {
    setLoading(true);
    setError(null);
    setLoadAttempt((current) => current + 1);
  }

  return { products, loading, error, retryLoad };
}

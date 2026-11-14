import assert from 'node:assert/strict'
import test from 'node:test'
import { parseProducts } from '../src/cases/products/services/parse-products.ts'

const product = {
  id: '1', price: '22.50', name: 'Burguer', description: 'Hambúrguer',
  image: './assets/img/burguer.png', category: 'lanches',
}

test('converte os campos numéricos retornados como texto pela API', () => {
  assert.deepEqual(parseProducts([product]), [{ ...product, id: 1, price: 22.5 }])
})

test('aceita números e listas vazias', () => {
  assert.deepEqual(parseProducts([]), [])
  const numeric = { ...product, id: 1, price: 0 }
  assert.deepEqual(parseProducts([numeric]), [numeric])
})

test('rejeita dados inválidos sem convertê-los silenciosamente em zero', () => {
  for (const value of [null, {}, [null], [{ ...product, id: '' }],
    [{ ...product, price: '' }], [{ ...product, price: null }],
    [{ ...product, price: -1 }], [{ ...product, price: Infinity }],
    [{ ...product, id: '1.5' }], [{ ...product, name: ' ' }]]) {
    assert.throws(() => parseProducts(value), /lista de produtos inválida/)
  }
})

test('rejeita IDs duplicados após a conversão', () => {
  assert.throws(() => parseProducts([product, { ...product, id: 1 }]), /lista de produtos inválida/)
})

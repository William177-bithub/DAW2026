import { Header } from './components/layout/header'
import { NavBar } from './components/layout/nav-bar'
import { Footer } from './components/layout/footer'
import { categories } from './data/categories'
import { ProductCards } from './cases/products/components/product-cards'
import { ProductCart } from './cases/products/components/product-cart'
import { ProductConfirmation } from './cases/products/components/product-confirmation'
import { useProductCart } from './cases/products/hooks/use-product-cart'

function App() {
  const {
    loading,
    error,
    retryLoad,
    activeCategory,
    setActiveCategory,
    selectedCategoryLabel,
    visibleProducts,
    cartItems,
    itemCount,
    total,
    changeQuantity,
    removeProduct,
    clearCart,
    confirmationRef,
    pendingProduct,
    requestAdd,
    confirmAdd,
    cancelAdd,
    resetPendingProduct,
  } = useProductCart();

  return (
    <>
      <Header itemCount={itemCount} />

      <NavBar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main>
        <section aria-busy={loading}>
          <header>
            <h2>Produtos</h2>
            <p>Categoria <span id="selected-category">{selectedCategoryLabel}</span>: {visibleProducts.length} itens</p>
          </header>

          {loading && <p role="status">Carregando produtos...</p>}
          {error && (
            <div role="alert">
              <p>{error}</p>
              <button type="button" onClick={retryLoad}>Tentar novamente</button>
            </div>
          )}
          {!loading && !error && visibleProducts.length === 0 && (
            <p>Nenhum produto encontrado nesta categoria.</p>
          )}
          {!loading && !error && <ProductCards products={visibleProducts} onAdd={requestAdd} />}
        </section>

        <ProductCart
          cartItems={cartItems}
          itemCount={itemCount}
          total={total}
          changeQuantity={changeQuantity}
          requestAdd={requestAdd}
          removeProduct={removeProduct}
          clearCart={clearCart}
        />
      </main>

      <ProductConfirmation
        confirmationRef={confirmationRef}
        pendingProduct={pendingProduct}
        resetPendingProduct={resetPendingProduct}
        cancelAdd={cancelAdd}
        confirmAdd={confirmAdd}
      />

      <Footer />
    </>
  )
}

export default App

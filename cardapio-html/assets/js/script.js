const categoryLinks = document.querySelectorAll('nav a');
const selectedCategory = document.getElementById('selected-category');
const productCount = document.getElementById('product-count');
const products = [...document.querySelectorAll('main section article')];
const cart = new Map();
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const cartItems = document.getElementById('cart-items');
const cartStatus = document.getElementById('cart-status');

categoryLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = link.textContent.trim();
        selectedCategory.textContent = category;
        let visibleCount = 0;
        products.forEach((product) => {
            product.hidden = category !== 'Todos' && product.querySelector('figcaption').textContent.trim() !== category;
            if (!product.hidden) visibleCount++;
        });
        productCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'item' : 'itens'}`;
        categoryLinks.forEach((item) => {
            item.classList.toggle('active', item === link);
            if (item === link) item.setAttribute('aria-current', 'true');
            else item.removeAttribute('aria-current');
        });
    });
});

function renderCart() {
    cartItems.replaceChildren();
    let quantity = 0;
    let total = 0;
    cart.forEach((item, id) => {
        quantity += item.quantity;
        total += item.price * item.quantity;
        const row = document.createElement('li');
        const description = document.createElement('p');
        description.textContent = `${item.name} — ${currency.format(item.price * item.quantity / 100)}`;
        const controls = document.createElement('div');
        controls.className = 'cart-controls';
        const count = document.createElement('span');
        count.textContent = item.quantity;
        const decrease = document.createElement('button');
        decrease.type = 'button';
        decrease.textContent = '−';
        decrease.setAttribute('aria-label', `Remover uma unidade de ${item.name}`);
        decrease.addEventListener('click', () => changeQuantity(id, -1));
        const increase = document.createElement('button');
        increase.type = 'button';
        increase.textContent = '+';
        increase.setAttribute('aria-label', `Adicionar uma unidade de ${item.name}`);
        increase.addEventListener('click', () => changeQuantity(id, 1));
        controls.append(decrease, count, increase);
        row.append(description, controls);
        cartItems.append(row);
    });
    document.querySelector('.cart-empty').hidden = quantity > 0;
    cartItems.hidden = quantity === 0;
    document.querySelector('.cart-total').hidden = quantity === 0;
    document.getElementById('cart-count').textContent = quantity;
    document.getElementById('cart-total').textContent = currency.format(total / 100);
}

function changeQuantity(id, amount) {
    const item = cart.get(id);
    item.quantity += amount;
    const message = `${item.name}: ${item.quantity} ${item.quantity === 1 ? 'unidade' : 'unidades'} no pedido.`;
    if (item.quantity === 0) cart.delete(id);
    renderCart();
    const buttons = cartItems.querySelectorAll('button');
    const nextRow = [...cartItems.children].find((row) => row.firstChild.textContent.startsWith(`${item.name} —`));
    if (nextRow) nextRow.querySelectorAll('button')[amount > 0 ? 1 : 0].focus();
    else if (buttons.length) buttons[0].focus();
    else document.querySelector('.cart-button').focus();
    cartStatus.textContent = message;
}

products.forEach((product, id) => {
    const name = product.querySelector('h3').textContent.trim();
    const price = Math.round(Number(product.querySelector('p:last-of-type').textContent.replace(/[^\d,]/g, '').replace(',', '.')) * 100);
    const button = product.querySelector('button');
    button.setAttribute('aria-label', `Adicionar ${name} ao pedido`);
    button.addEventListener('click', () => {
        if (!cart.has(id)) cart.set(id, { name, price, quantity: 0 });
        cart.get(id).quantity++;
        renderCart();
        cartStatus.textContent = `${name} adicionado ao pedido. Quantidade: ${cart.get(id).quantity}.`;
    });
});

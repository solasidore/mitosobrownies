const products = {
  blondies: { name: 'blondies', image: 'assets/blondies.jpg', price: 15 },
  brownies: { name: 'brownies', image: 'assets/brownies.jpg', price: 15 },
  galletas: { name: 'galletas', image: 'assets/galletas.jpg', price: 15 }
};

let cart = [
  { product: 'brownies', qty: 1 },
  { product: 'galletas', qty: 1 }
];

const panel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const cartToggle = document.getElementById('cartToggle');

function renderCart() {
  cartItems.innerHTML = '';

  cart.forEach((line, index) => {
    const p = products[line.product];
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <div>
        <div class="cart-item-title">${p.name}</div>
        <div class="cart-item-meta">${line.qty} x ${p.price} soles</div>
      </div>
      <button class="remove-item" type="button" aria-label="Eliminar ${p.name}" data-index="${index}">⌫</button>
    `;
    cartItems.appendChild(row);
  });

  const qty = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + products[item.product].price * item.qty, 0);
  cartCount.textContent = qty;
  cartTotal.textContent = `${total} soles`;

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      cart.splice(Number(button.dataset.index), 1);
      renderCart();
    });
  });
}

function openCart() {
  panel.classList.remove('closed');
  cartToggle?.setAttribute('aria-expanded', 'true');
}

function closeCart() {
  panel.classList.add('closed');
  cartToggle?.setAttribute('aria-expanded', 'false');
}

cartToggle?.addEventListener('click', () => panel.classList.contains('closed') ? openCart() : closeCart());
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('footerCart')?.addEventListener('click', () => {
  openCart();
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.add-product').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.product;
    const existing = cart.find(item => item.product === key);
    if (existing) existing.qty += 1;
    else cart.push({ product: key, qty: 1 });
    renderCart();
    openCart();
  });
});

const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { threshold: .35 });

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
renderCart();

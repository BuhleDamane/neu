/* ==========================================================
   NÉU — Shared site behaviour
   Cart persisted to localStorage so it survives page navigation.
   ========================================================== */

const CART_KEY = 'neu_cart_v1';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, sizeLabel, qty) {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === productId && i.size === sizeLabel);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, size: sizeLabel, qty });
  }
  saveCart(cart);
}

function removeFromCart(productId, sizeLabel) {
  const cart = getCart().filter((i) => !(i.productId === productId && i.size === sizeLabel));
  saveCart(cart);
}

function updateCartQty(productId, sizeLabel, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId && i.size === sizeLabel);
  if (item) {
    item.qty = qty;
    if (item.qty <= 0) {
      return removeFromCart(productId, sizeLabel);
    }
  }
  saveCart(cart);
}

function cartTotalCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartLineItems() {
  return getCart().map((item) => {
    const product = getProductById(item.productId);
    if (!product) return null;
    const sizeObj = product.sizes.find((s) => s.label === item.size) || { priceDelta: 0 };
    const unitPrice = product.price + sizeObj.priceDelta;
    return {
      ...item,
      product,
      unitPrice,
      lineTotal: unitPrice * item.qty,
    };
  }).filter(Boolean);
}

function cartSubtotal() {
  return cartLineItems().reduce((sum, i) => sum + i.lineTotal, 0);
}

function updateCartCount() {
  const el = document.querySelector('[data-cart-count]');
  if (el) {
    const count = cartTotalCount();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
}

/* ============ NAV ============ */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const icon = toggle.querySelector('[data-icon]');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      if (icon) icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      if (window.lucide) lucide.createIcons();
    });
  }
  updateCartCount();
}

/* ============ TOAST ============ */
let toastTimer = null;
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ============ REVEAL ON SCROLL ============ */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => obs.observe(el));
}

/* ============ PRODUCT CARD RENDERING ============ */
function productCardHTML(p) {
  const onSale = typeof p.salePrice === 'number' && p.salePrice < p.price;
  const tagHTML = onSale ? `<span class="badge" style="background:#b3261e;">Sale</span>` : (p.tag ? `<span class="badge">${p.tag}</span>` : '');
  const priceHTML = onSale
    ? `<span class="strike">${formatZAR(p.price)}</span>${formatZAR(p.salePrice)}`
    : formatZAR(p.price);
  return `
    <div class="product-card reveal" data-product-id="${p.id}" onclick="location.href='product.html?id=${p.id}'">
      <div class="thumb">
        ${tagHTML}
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
        <button class="quick-add" onclick="event.stopPropagation(); location.href='product.html?id=${p.id}'">View & Select Size</button>
      </div>
      <div class="info">
        <span class="p-cat">${p.category}</span>
        <span class="p-name">${p.name}</span>
        <span class="p-price">${priceHTML}</span>
      </div>
    </div>
  `;
}

function renderProductGrid(container, products) {
  if (!products.length) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p class="text-muted">No products match these filters.</p></div>`;
    return;
  }
  container.innerHTML = products.map(productCardHTML).join('');
  initReveal();
}

/* ============ ACCORDION ============ */
function initAccordions() {
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const head = item.querySelector('.accordion-head');
    const body = item.querySelector('.accordion-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ============ INIT COMMON ============ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initAccordions();
  if (window.lucide) lucide.createIcons();
});

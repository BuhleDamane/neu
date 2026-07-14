/* ==========================================================
   NÉU — Shared header (top ticker + nav)
   Injected into <div id="site-header" data-active="..."></div>
   ========================================================== */

function renderHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  const active = mount.getAttribute('data-active') || '';

  const tickerItems = [
    'Free delivery on orders over R1500, South Africa wide',
    'New here? Get 10% off your first order with code NEU10',
    'Free 30 day returns on every order',
  ];
  const tickerHTML = tickerItems.map((t) => `<span>${t}</span>`).join('');

  mount.innerHTML = `
    <div class="top-banner">
      <div class="ticker-track">${tickerHTML}${tickerHTML}</div>
    </div>
    <header class="site-header-inner">
      <div class="container nav-row">
        <div class="logo" onclick="location.href='index.html'">Néu</div>

        <nav class="nav-links" data-nav-links>
          <a href="index.html" class="${active === 'home' ? 'active' : ''}">Home</a>

          <div class="nav-item-dropdown" data-dropdown>
            <span class="dd-trigger" data-dd-trigger>
              Products
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div class="dd-panel">
              <a href="shop.html">Shop All</a>
              <a href="shop.html?category=Jackets">Jackets</a>
              <a href="shop.html?category=T-Shirts">T-Shirts</a>
              <a href="shop.html?category=Trousers">Trousers</a>
              <a href="shop.html?category=Shoes">Shoes</a>
              <a href="shop.html?category=Accessories">Accessories</a>
            </div>
          </div>

          <a href="shop.html?sale=true" class="sale-link ${active === 'sale' ? 'active' : ''}">Sale</a>
          <a href="about.html" class="${active === 'about' ? 'active' : ''}">About</a>
          <a href="returns.html" class="${active === 'returns' ? 'active' : ''}">Returns</a>
        </nav>

        <div class="nav-actions">
          <button class="icon-btn" aria-label="Search" data-search-open>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button class="icon-btn" aria-label="Account" onclick="location.href='account.html'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
          <button class="icon-btn" aria-label="Cart" onclick="location.href='cart.html'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span class="cart-count" data-cart-count style="display:none;">0</span>
          </button>
          <button class="nav-toggle" data-nav-toggle aria-label="Menu" aria-expanded="false">
            <svg data-icon width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>

    <div class="search-overlay" data-search-overlay>
      <div class="search-box">
        <form data-search-form>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search for jackets, shoes, watches…" data-search-input autocomplete="off" />
          <button class="icon-btn" type="button" aria-label="Close search" data-search-close>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </form>
        <div class="search-suggest">Popular searches</div>
        <div class="search-suggest-links">
          <a href="shop.html?category=Jackets">Jackets</a>
          <a href="shop.html?category=Shoes">Sneakers</a>
          <a href="shop.html?category=Accessories">Watches</a>
          <a href="shop.html?sale=true">Sale</a>
        </div>
      </div>
    </div>
  `;

  /* mobile dropdown toggle (tap to expand within mobile menu) */
  const dropdown = mount.querySelector('[data-dropdown]');
  const ddTrigger = mount.querySelector('[data-dd-trigger]');
  ddTrigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      dropdown.classList.toggle('mobile-open');
    }
  });

  /* search overlay */
  const searchOverlay = mount.querySelector('[data-search-overlay]');
  const searchInput = mount.querySelector('[data-search-input]');
  mount.querySelectorAll('[data-search-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      searchOverlay.classList.add('show');
      setTimeout(() => searchInput.focus(), 200);
    });
  });
  mount.querySelector('[data-search-close]').addEventListener('click', () => searchOverlay.classList.remove('show'));
  searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) searchOverlay.classList.remove('show'); });
  mount.querySelector('[data-search-form]').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) location.href = 'shop.html?search=' + encodeURIComponent(q);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('show');
  });

  if (window.initNav) window.initNav();
  if (window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderHeader);

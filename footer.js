document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-logo-col">
          <div class="footer-logo">Néu</div>
          <p class="footer-tagline">Unisex fashion built on clean lines, honest materials and pieces designed to outlast the trend cycle.</p>
          <div class="social-row" style="margin-top:var(--space-5);">
            <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a>
            <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Shop</h5>
          <ul>
            <li><a href="shop.html?category=Jackets">Jackets</a></li>
            <li><a href="shop.html?category=T-Shirts">T-Shirts</a></li>
            <li><a href="shop.html?category=Trousers">Trousers</a></li>
            <li><a href="shop.html?category=Shoes">Shoes</a></li>
            <li><a href="shop.html?category=Accessories">Accessories</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Help</h5>
          <ul>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Track My Order</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>About</h5>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Studio Sales</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Stay Updated</h5>
          <p style="font-size:.85rem;color:#b8b8b4;">New drops, restocks and studio sales — straight to your inbox.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); showToast('Thanks — check your inbox for your code.');">
            <input type="email" required placeholder="Email address" />
            <button type="submit" class="btn btn-primary btn-sm">Join</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Néu. All rights reserved. Johannesburg, South Africa.</span>
        <div class="payment-icons">
          <span class="pay-badge-logo"><img src="assets/payments/visa.png" alt="Visa" /></span>
          <span class="pay-badge-logo"><img src="assets/payments/mastercard.png" alt="Mastercard" /></span>
          <span class="pay-badge-logo"><img src="assets/payments/ozow.png" alt="Ozow" /></span>
          <span class="pay-badge">EFT</span>
        </div>
      </div>
    </div>
  `;
});

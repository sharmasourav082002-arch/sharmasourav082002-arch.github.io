// ==============================
// script.js (FULL - copy paste to replace existing script.js)
// ==============================

// 1) Stripe publishable key (tumhara diya hua)
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// 2) Backend API root (tumhara Render URL) — FORCE trailing slash न लगाओ
const API_ROOT = "https://sharmasourav082002-arch-github-io-1.onrender.com";

// 3) Render products into #products (expects window.PRODUCTS_FRONTEND loaded before this file)
function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;
  const products = window.PRODUCTS_FRONTEND || [];
  if (!products.length) {
    container.innerHTML = '<p style="padding:20px">No products found.</p>';
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card" id="prod-${p.id}">
      <div class="media">
        ${p.video ? `<video controls class="product-video"><source src="${p.video}" type="video/mp4"></video>` :
                    `<img src="${p.image}" alt="${escapeHtml(p.title)}" class="product-img" />`}
      </div>
      <div class="product-info">
        <h3 class="product-title">${escapeHtml(p.title)}</h3>
        <p class="product-price">${escapeHtml(p.price_display)}</p>
        <div class="product-actions">
          <button class="buy-now primary" data-id="${p.id}">Buy Now</button>
          <a class="view-btn" href="product.html?id=${p.id}">View</a>
        </div>
      </div>
    </div>
  `).join('');
}

// utility escape
function escapeHtml(str){ return String(str||'').replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s]); }

// 4) Attach Buy Now handlers (delegated)
function attachBuyNowHandlers() {
  document.querySelectorAll(".buy-now").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const productId = btn.getAttribute("data-id");
      if (!productId) return alert("Product error");

      // create checkout session on backend
      try {
        // show small loading state
        btn.disabled = true;
        btn.textContent = "Please wait...";

        const res = await fetch(`${API_ROOT}/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ id: productId, qty: 1 }],
            currency: "inr",
            // optional: customer_email: "customer@example.com"
          })
        });

        const data = await res.json();
        if (data && data.url) {
          // redirect user to stripe checkout
          window.location.href = data.url;
        } else {
          console.error("create-checkout-session failed:", data);
          alert("Payment Error: " + (data && data.error ? data.error : "unknown"));
        }
      } catch (err) {
        console.error(err);
        alert("Payment request failed");
      } finally {
        btn.disabled = false;
        btn.textContent = "Buy Now";
      }
    });
  });
}

// 5) On page load
document.addEventListener("DOMContentLoaded", () => {
  // render and attach handlers
  renderProducts();
  attachBuyNowHandlers();
});

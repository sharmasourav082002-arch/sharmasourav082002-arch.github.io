// script.js  (copy-paste this whole file)
/////////////////////////////
// Stripe publishable key
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// Backend root (change if your render server has different URL)
const API_ROOT = "https://sharmasourav082002-arch-github-io-1.onrender.com"; // update if needed

// Render products grid into #products
function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;
  const products = window.PRODUCTS_FRONTEND || [];
  if (products.length === 0) {
    container.innerHTML = '<p style="padding:20px">No products found.</p>';
    return;
  }

  const html = products.map(p => {
    const media = p.video
      ? `<video controls class="product-video" style="max-width:100%;height:auto;"><source src="${p.video}" type="video/mp4">Your browser does not support video.</video>`
      : `<img src="${p.image}" alt="${escapeHtml(p.title)}" class="product-img" style="width:100%;height:auto;object-fit:cover;">`;

    return `
      <div class="product-card" id="prod-${p.id}" style="width:220px;margin:10px;border-radius:8px;border:1px solid #eee;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.06);">
        <div class="media" style="height:140px;overflow:hidden;background:#fafafa;">${media}</div>
        <div class="product-info" style="padding:10px;">
          <h3 style="font-size:15px;margin:0 0 6px 0;">${escapeHtml(p.title)}</h3>
          <p style="margin:0 0 8px 0;color:#c0392b;font-weight:700;">${p.price_display}</p>
          <div style="display:flex;gap:8px;">
            <button class="buy-now" data-id="${p.id}" style="flex:1;padding:8px;background:#1a73e8;color:#fff;border:none;border-radius:6px;cursor:pointer;">Buy Now</button>
            <button class="view-btn" data-id="${p.id}" style="padding:8px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;">View</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // basic flex grid wrapper
  container.innerHTML = `<div style="display:flex;flex-wrap:wrap;justify-content:flex-start;">${html}</div>`;
}

// utility escape
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; }); }

// attach handlers (call after render)
function attachHandlers() {
  document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const pid = btn.getAttribute('data-id');
      const product = (window.PRODUCTS_FRONTEND||[]).find(x => x.id === pid);
      if (!product) { alert('Product not found'); return; }

      // Demo check: if you have backend, create checkout session
      try {
        // if no backend available, show demo message
        if (!API_ROOT || API_ROOT.includes('PLACEHOLDER')) {
          alert('Demo: backend not configured. Configure API_ROOT for real payments.');
          return;
        }
        const res = await fetch(`${API_ROOT}/create-checkout-session`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            items: [{ id: pid, qty: 1 }],
            currency: product.currency || 'inr'
          })
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert('Payment error: ' + (data.error || 'no session url'));
        }
      } catch (err) {
        console.error(err);
        alert('Payment request failed. See console.');
      }
    });
  });

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-id');
      // simple product detail redirect (if product.html exists)
      // pass id as query param (you can implement product page to read it)
      window.location.href = `product.html?id=${pid}`;
    });
  });
}

// Initial run
function init() {
  renderProducts();
  attachHandlers();
}

// Wait small tick to ensure products.js loaded
document.addEventListener('DOMContentLoaded', () => {
  // If products array already exists render immediately
  if (window.PRODUCTS_FRONTEND && window.PRODUCTS_FRONTEND.length) {
    init();
    return;
  }
  // fallback wait a bit then init
  setTimeout(init, 300);
});

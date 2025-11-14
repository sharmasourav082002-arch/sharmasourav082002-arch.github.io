// FULL debug-friendly script.js — copy-paste to replace existing file

// stripe publishable key (tumhara)
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// backend root — tumne diya wala Render URL
const API_ROOT = "https://sharmasourav082002-arch-github-io-1.onrender.com";

function log(...args){ try{ console.log("[messo]", ...args); }catch(e){} }

// quick runtime checks
log("script.js loaded. API_ROOT=", API_ROOT);
if(!window.PRODUCTS_FRONTEND) log("Warning: window.PRODUCTS_FRONTEND is not defined yet. Make sure assets/js/products.js is loaded BEFORE this script.");

// escape helper
function esc(s){ return String(s||"").replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// render products
function renderProducts(){
  const container = document.getElementById('products');
  if(!container){ log("No #products container found in DOM"); return; }
  const products = window.PRODUCTS_FRONTEND || [];
  if(!products.length){
    container.innerHTML = '<p style="padding:20px">No products found (PRODUCTS_FRONTEND empty).</p>';
    log("PRODUCTS_FRONTEND empty or missing");
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card" id="prod-${p.id}">
      <div class="media">
        ${p.video ? `<video controls class="product-video"><source src="${esc(p.video)}" type="video/mp4"></video>` :
                    `<img src="${esc(p.image)}" alt="${esc(p.title)}" class="product-img" />`}
      </div>
      <div class="product-info">
        <h3 class="product-title">${esc(p.title)}</h3>
        <p class="product-price">${esc(p.price_display)}</p>
        <div class="product-actions">
          <button class="buy-now" data-id="${esc(p.id)}">Buy Now</button>
          <a class="view-btn" href="product.html?id=${esc(p.id)}">View</a>
        </div>
      </div>
    </div>
  `).join('');
  log("Rendered", products.length, "products");
}

// attach handlers
function attachBuyNowHandlers(){
  document.querySelectorAll(".buy-now").forEach(btn=>{
    btn.addEventListener("click", async (e)=>{
      const id = btn.getAttribute("data-id");
      log("Buy clicked:", id);
      if(!id){ alert("Product id missing"); return; }

      // Disable button
      btn.disabled = true;
      const prev = btn.textContent;
      btn.textContent = "Processing...";

      try {
        // POST to backend
        const payload = { items:[{ id, qty:1 }], currency: "inr" };
        log("Calling backend:", API_ROOT + "/create-checkout-session", payload);
        const res = await fetch(`${API_ROOT}/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        log("Backend response status:", res.status);
        const data = await res.json().catch(()=>null);
        log("Backend response json:", data);

        if(res.status === 200 && data && data.url){
          log("Redirecting to checkout:", data.url);
          window.location.href = data.url;
          return;
        }

        // If here, error
        const msg = (data && data.error) ? data.error : ("Backend error, status " + res.status);
        alert("Payment Error: " + msg);
      } catch(err){
        console.error(err);
        alert("Network or server error. Check console and backend URL.");
      } finally {
        btn.disabled = false;
        btn.textContent = prev;
      }
    });
  });
}

// run on DOM ready
document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts();
  attachBuyNowHandlers();
  log("DOM ready: render+handlers attached");
});

// ======= config =======
// Stripe publishable key (you gave this)
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// Backend root (Render) - change if your backend URL is different
const API_ROOT = "https://sharmasourav082002-arch-github-io-1.onrender.com";

// Success / Cancel pages (GitHub Pages)
const SUCCESS_URL = "https://sharmasourav082002-arch.github.io/success.html";
const CANCEL_URL  = "https://sharmasourav082002-arch.github.io/cancel.html";

// ======= helpers =======
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

// Simple toast (replace with nicer UI if needed)
function toast(msg){ alert(msg); }

// ======= INDEX: render products grid (if #products exists) =======
function renderProductsGrid(){
  const container = document.getElementById("products");
  if (!container || !window.PRODUCTS_FRONTEND) return;

  container.innerHTML = window.PRODUCTS_FRONTEND.map(p => {
    // show video if available, else image
    const media = p.video && p.video.length
      ? `<video class="product-video" controls><source src="${p.video}" type="video/mp4">Your browser does not support video.</video>`
      : `<img class="product-img" src="${p.image}" alt="${escapeHtml(p.title)}">`;

    return `
      <article class="product-card" id="prod-${p.id}">
        <a class="product-link" href="product.html?id=${encodeURIComponent(p.id)}" title="${escapeHtml(p.title)}">
          ${media}
        </a>
        <div class="product-info">
          <h3 class="product-title">${escapeHtml(p.title)}</h3>
          <p class="product-price">${escapeHtml(p.price_display)}</p>
          <div class="product-actions">
            <button class="buy-now" data-id="${p.id}">Buy Now</button>
            <a class="view-btn" href="product.html?id=${encodeURIComponent(p.id)}">View</a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // attach handlers
  container.querySelectorAll(".buy-now").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      createCheckoutFromFrontend(id, 1);
    });
  });
}

// ======= PRODUCT PAGE: populate product.html (if elements exist) =======
function populateProductPage(){
  const id = (new URLSearchParams(location.search)).get("id");
  if(!id || !window.PRODUCTS_FRONTEND) return;

  const product = window.PRODUCTS_FRONTEND.find(p => p.id === id || p.id === ("p" + id) );
  if(!product){
    console.error("Product not found:", id);
    return;
  }

  const imgEl = qs("#product-image");
  const nameEl = qs("#product-name");
  const descEl = qs("#product-description");
  const priceEl = qs("#product-price");
  const buyBtn = qs("#buyButton");

  if(imgEl){
    if(product.video && product.video.length){
      // replace img with video element
      const vid = document.createElement("video");
      vid.controls = true;
      vid.src = product.video;
      vid.className = "product-video-large";
      imgEl.replaceWith(vid);
    } else {
      imgEl.src = product.image;
      imgEl.alt = product.title;
    }
  }
  if(nameEl) nameEl.textContent = product.title;
  if(descEl) descEl.textContent = product.description || "";
  if(priceEl) priceEl.textContent = product.price_display || "";

  if(buyBtn){
    buyBtn.addEventListener("click", () => createCheckoutFromFrontend(product.id, 1));
  }
}

// ======= Create checkout session via backend =======
async function createCheckoutFromFrontend(productId, qty=1){
  if(!window.PRODUCTS_FRONTEND) { toast("Products not loaded"); return; }
  const product = window.PRODUCTS_FRONTEND.find(p => p.id === productId);
  if(!product){ toast("Product not found: "+productId); return; }

  try {
    // Request backend to create a checkout session
    const resp = await fetch(`${API_ROOT}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        items: [{ id: productId, qty }],
        currency: product.currency || "inr",
        // optional: add customer_email if you have it
      })
    });

    if(!resp.ok){
      const txt = await resp.text();
      console.error("Backend error:", resp.status, txt);
      toast("Server error creating checkout.");
      return;
    }

    const data = await resp.json();
    if(data && data.url){
      // redirect the browser to Stripe Checkout hosted page
      window.location.href = data.url;
    } else if(data && data.sessionId){
      // older style: redirect via stripe.redirectToCheckout
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.error("Unexpected create-checkout response:", data);
      toast("Payment initialization failed.");
    }
  } catch(err){
    console.error("createCheckout error", err);
    toast("Payment request failed.");
  }
}

// ======= Utility: escapeHtml for safety in inserted markup =======
function escapeHtml(str){
  if(!str && str !== 0) return "";
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[s]);
}

// ======= Auto-run on page load =======
document.addEventListener("DOMContentLoaded", function(){
  // if index page has #products container -> render grid
  if(document.getElementById("products")){
    renderProductsGrid();
    return;
  }

  // if product detail page -> populate detail
  if(document.getElementById("product-name") || document.getElementById("buyButton")){
    populateProductPage();
    return;
  }

  // else nothing to do
});

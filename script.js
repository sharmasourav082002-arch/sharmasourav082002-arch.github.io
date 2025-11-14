
// script.js  — REPLACE ENTIRE FILE WITH THIS CONTENT

// ---------------------------
// CONFIG (paste your Stripe publishable key here)
const STRIPE_PUBLISHABLE_KEY = "pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd";

// If you have a backend server to create checkout sessions set API_ROOT to its base URL (no trailing slash).
// Example: "https://my-backend.onrender.com"
const API_ROOT = ""; // <<< if empty => demo mode (no real payment) 

// ---------------------------
// Init Stripe (only used if you do redirect via backend or client)
let stripe = null;
if (window.Stripe && STRIPE_PUBLISHABLE_KEY) {
  try { stripe = Stripe(STRIPE_PUBLISHABLE_KEY); } catch(e){ console.warn("Stripe init failed", e); }
}

// Utility: safe escape for text
function esc(s){ return String(s||"").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// RENDER PRODUCTS
function renderProductsList(products) {
  const container = document.getElementById('products');
  if(!container) return console.error("No #products container found in index.html");
  if(!Array.isArray(products) || products.length===0){
    container.innerHTML = '<div style="padding:18px">No products found.</div>';
    return;
  }

  // build html
  const html = products.map(p=>{
    const media = p.video ? 
      `<video controls class="product-video" style="max-width:100%;height:auto"><source src="${esc(p.video)}" type="video/mp4">Your browser does not support video.</video>` :
      `<img src="${esc(p.image)}" alt="${esc(p.title)}" class="product-img" style="width:100%;height:160px;object-fit:cover;border-radius:8px" />`;

    return `
      <div class="product-card" data-id="${esc(p.id)}" style="width:220px;margin:10px;padding:12px;border-radius:10px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,0.06);">
        <div class="media" style="height:160px;overflow:hidden;border-radius:8px">${media}</div>
        <h3 style="font-size:15px;margin:10px 0 6px;min-height:38px">${esc(p.title)}</h3>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div style="font-weight:700">${esc(p.price_display || ('₹'+( (p.price_smallest||0)/100 )))}</div>
          <div style="display:flex;gap:8px">
            <button class="view-btn" data-id="${esc(p.id)}" style="padding:6px 8px;border:1px solid #eee;border-radius:6px;background:#fff;cursor:pointer">View</button>
            <button class="buy-now" data-id="${esc(p.id)}" style="padding:6px 12px;border-radius:6px;background:#d35400;color:#fff;border:none;cursor:pointer">Buy</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // wrapper layout
  container.innerHTML = `<div id="products-wrap" style="display:flex;flex-wrap:wrap;gap:10px">${html}</div>`;
}

// FILTER & SEARCH helpers
function applyFilters(products){
  const q = (document.getElementById('searchInput')?.value || "").trim().toLowerCase();
  const cat = (document.getElementById('categorySelect')?.value || "").trim();
  let out = products.slice();
  if(cat && cat!=="all"){
    out = out.filter(p => (p.title||"").toLowerCase().includes(cat.toLowerCase()));
  }
  if(q){
    out = out.filter(p => (p.title||"").toLowerCase().includes(q));
  }
  return out;
}

// Attach handlers after render
function attachHandlers(products){
  // Buy Now
  document.querySelectorAll('.buy-now').forEach(btn=>{
    btn.onclick = async (e)=>{
      const pid = btn.getAttribute('data-id');
      const item = (products||[]).find(x=>x.id===pid);
      if(!item){ alert("Product not found"); return; }

      // If backend present -> create session
      if(API_ROOT){
        try{
          btn.disabled = true;
          btn.innerText = "Processing...";
          const res = await fetch(`${API_ROOT}/create-checkout-session`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ items:[{ id: item.id, qty:1 }], currency:item.currency || "inr" })
          });
          const data = await res.json();
          if(data.url){
            window.location.href = data.url;
            return;
          } else {
            console.error("Checkout error", data);
            alert("Payment error: " + (data.error || "No session URL returned"));
          }
        } catch(err){
          console.error(err);
          alert("Payment request failed. See console.");
        } finally {
          btn.disabled = false;
          btn.innerText = "Buy";
        }
        return;
      }

      // DEMO mode if no backend
      alert("Demo purchase: " + item.title + " — This site currently runs in demo mode (no backend). To enable real payments, deploy the backend and set API_ROOT.");
    };
  });

  // View button -> go to product page if available (product.html?id=...)
  document.querySelectorAll('.view-btn').forEach(b=>{
    b.onclick = ()=> {
      const id = b.getAttribute('data-id');
      window.location.href = `product.html?id=${encodeURIComponent(id)}`;
    };
  });

  // search and category change
  const search = document.getElementById('searchInput');
  const select = document.getElementById('categorySelect');
  if(search) search.oninput = ()=> { const out=applyFilters(window.PRODUCTS_FRONTEND||[]); renderProductsList(out); attachHandlers(out); };
  if(select) select.onchange = ()=> { const out=applyFilters(window.PRODUCTS_FRONTEND||[]); renderProductsList(out); attachHandlers(out); };
}

// MAIN boot
function boot(){
  // Wait for products file to load
  const products = window.PRODUCTS_FRONTEND || [];
  // build category dropdown if not present
  if(document.getElementById('categorySelect')===null){
    const topBar = document.createElement('div');
    topBar.style.display = "flex";
    topBar.style.justifyContent = "flex-start";
    topBar.style.gap = "10px";
    topBar.style.alignItems = "center";
    topBar.style.padding = "10px 0";

    const input = document.createElement('input');
    input.id = "searchInput";
    input.placeholder = "Search products...";
    input.style.padding = "8px 10px";
    input.style.width = "320px";
    input.style.borderRadius = "6px";
    input.style.border = "1px solid #ddd";

    const select = document.createElement('select');
    select.id = "categorySelect";
    select.style.padding = "8px";
    select.style.border = "1px solid #ddd";
    select.style.borderRadius = "6px";
    const allOpt = document.createElement('option'); allOpt.value="all"; allOpt.text="All categories"; select.appendChild(allOpt);

    // auto populate categories from product titles by naive keyword
    const catSet = new Set();
    products.forEach(p=>{
      const parts = (p.title||"").split(" ");
      // try to take a significant word as category (2nd or 1st)
      if(parts[1]) catSet.add(parts[1]);
    });
    Array.from(catSet).slice(0,20).forEach(c=>{
      const o = document.createElement('option'); o.value = c; o.text = c; select.appendChild(o);
    });

    // insert topBar before #shop or at top of container
    const shop = document.getElementById('shop');
    if(shop) shop.parentNode.insertBefore(topBar, shop);
    topBar.appendChild(input);
    topBar.appendChild(select);
  }

  // initial render (apply filters)
  const out = applyFilters(products);
  renderProductsList(out);
  attachHandlers(out);
}

// DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

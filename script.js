// script.js (copy entire file and replace existing script.js)
// Stripe publishable key (your provided pk)
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// Backend root:
// If you have a backend (Render) that exposes /create-checkout-session, set it here.
// Example: const API_ROOT = "https://your-backend.onrender.com";
const API_ROOT = ""; // <-- keep empty for now if you don't have backend

// Render products into #products
function renderProducts(){
  const container = document.getElementById('products');
  if(!container) return;
  const products = window.PRODUCTS_FRONTEND || [];
  if(!products.length){
    container.innerHTML = '<p>No products found.</p>'; return;
  }

  const html = products.map(p => `
    <div class="product-card" id="prod-${p.id}">
      <div class="media">
        ${p.video ? `<video controls class="product-video"><source src="${p.video}" type="video/mp4"></video>` :
                    `<img src="${p.image}" alt="${p.title}" class="product-img" />`}
      </div>
      <h3 class="product-title">${p.title}</h3>
      <p class="product-price">${p.price_display}</p>
      <div style="margin-top:auto">
        <button class="primary buy-now" data-id="${p.id}">Buy Now</button>
        <a class="secondary" href="product.html?id=${p.id}">View</a>
      </div>
    </div>
  `).join('');
  container.innerHTML = html;
}

// Attach search + category
function buildFilters(){
  const products = window.PRODUCTS_FRONTEND || [];
  const catSet = new Set(products.map(p => p.title.split(' ')[1] || 'General'));
  const select = document.getElementById('categorySelect');
  if(select){
    for(const c of Array.from(catSet)){
      const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
      select.appendChild(opt);
    }
    select.onchange = applyFilters;
  }
  const search = document.getElementById('searchInput');
  if(search) search.oninput = applyFilters;
}

function applyFilters(){
  const q = (document.getElementById('searchInput')||{value:''}).value.toLowerCase();
  const cat = (document.getElementById('categorySelect')||{value:'all'}).value;
  const container = document.getElementById('products');
  const products = window.PRODUCTS_FRONTEND || [];
  const filtered = products.filter(p=>{
    const inSearch = p.title.toLowerCase().includes(q);
    const inCat = (cat === 'all') || (p.title.split(' ')[1] === cat);
    return inSearch && inCat;
  });
  if(!filtered.length){ container.innerHTML = '<p>No products match.</p>'; return; }
  container.innerHTML = filtered.map(p => `
    <div class="product-card" id="prod-${p.id}">
      <div class="media">
        ${p.video ? `<video controls class="product-video"><source src="${p.video}" type="video/mp4"></video>` :
                    `<img src="${p.image}" alt="${p.title}" class="product-img" />`}
      </div>
      <h3 class="product-title">${p.title}</h3>
      <p class="product-price">${p.price_display}</p>
      <div style="margin-top:auto">
        <button class="primary buy-now" data-id="${p.id}">Buy Now</button>
        <a class="secondary" href="product.html?id=${p.id}">View</a>
      </div>
    </div>
  `).join('');
  attachBuyNowHandlers(); // reattach
}

// Attach Buy Now handlers
function attachBuyNowHandlers(){
  document.querySelectorAll('.buy-now').forEach(btn=>{
    btn.onclick = async function(){
      const pid = btn.getAttribute('data-id');
      const itemDef = (window.PRODUCTS_FRONTEND || []).find(x=>x.id===pid);
      if(!itemDef){ alert('Product error'); return; }

      // If you have backend: call /create-checkout-session
      if(API_ROOT && API_ROOT.length){
        try{
          const res = await fetch(`${API_ROOT.replace(/\/$/,'')}/create-checkout-session`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ items:[{ id: pid, qty: 1 }], currency: itemDef.currency })
          });
          const data = await res.json();
          if(data.url){ window.location.href = data.url; return; }
          alert('Payment Error: ' + (data.error || 'no session url'));
        }catch(err){ console.error(err); alert('Payment request failed. Check console.'); }
        return;
      }

      // No backend: fallback — redirect to checkout.html (demo)
      alert('Demo checkout: no backend configured. You will be redirected to demo checkout page.');
      window.location.href = 'checkout.html';
    };
  });
}

// Init
(function init(){
  renderProducts();
  buildFilters();
  attachBuyNowHandlers();

  // listen for product page buy events
  window.addEventListener('messoBuy', async (e)=>{
    const pid = e.detail && e.detail.id;
    if(!pid) return;
    // same handler logic as above
    const itemDef = (window.PRODUCTS_FRONTEND||[]).find(x=>x.id===pid);
    if(!itemDef) { alert('Product not found'); return; }
    if(API_ROOT && API_ROOT.length){
      try{
        const res = await fetch(`${API_ROOT.replace(/\/$/,'')}/create-checkout-session`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ items:[{ id: pid, qty:1 }], currency: itemDef.currency })
        });
        const data = await res.json();
        if(data.url) { window.location.href = data.url; return; }
        alert('Payment Error');
      }catch(err){ console.error(err); alert('Payment error'); }
      return;
    }
    alert('Demo checkout: no backend configured.');
    window.location.href = 'checkout.html';
  });

})();

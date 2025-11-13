// Script.js — FULL frontend logic
// 1) When server is deployed, set API_ROOT to your server URL (e.g. https://messo-server.onrender.com)
// 2) Do NOT put secret keys here. Backend handles Stripe secret.
// 3) Formspree endpoint used for contact (already set below)

const API_ROOT = ''; // <-- AFTER backend deploy, replace with 'https://your-render-domain'
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeovoozn"; // your formspree endpoint

// ---------- PRODUCTS (public placeholders: images + sample videos) ----------
const PRODUCTS = [
  {
    id: "p1",
    title: "Premium Wireless Headphones",
    price_inr: 199,
    price_gbp: 2,
    img: "https://picsum.photos/seed/headphones/1200/800",
    video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    category: "electronics"
  },
  {
    id: "p2",
    title: "Comfort Cotton Shirt",
    price_inr: 180,
    price_gbp: 1.8,
    img: "https://picsum.photos/seed/shirt/1200/800",
    video: "",
    category: "fashion"
  },
  {
    id: "p3",
    title: "Stylish Tote Bag",
    price_inr: 210,
    price_gbp: 2.1,
    img: "https://picsum.photos/seed/handbag/1200/800",
    video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    category: "fashion"
  },
  {
    id: "p4",
    title: "Compact Bluetooth Speaker",
    price_inr: 220,
    price_gbp: 2.2,
    img: "https://picsum.photos/seed/speaker/1200/800",
    video: "",
    category: "electronics"
  }
];
// -------------------------------------------------------------------------

// Simple in-memory cart (also saved in localStorage)
let cart = [];

// helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const el = id => document.getElementById(id);

// UI renderers
function renderHome(){
  const grid = el('homeGrid');
  if(!grid) return;
  grid.innerHTML = PRODUCTS.map(p=>`
    <div class="tile" data-id="${p.id}">
      <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.title}"></a>
      <h4>${p.title}</h4>
      <div class="price">₹${p.price_inr}</div>
      <div class="actions">
        <button class="add-cart" data-id="${p.id}">Add</button>
        <button class="buy-now" data-id="${p.id}">Buy</button>
      </div>
    </div>
  `).join('');
}

function renderProductDetail(){
  const wrap = el('productDetail');
  if(!wrap) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'p1';
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p){ wrap.innerHTML = '<p>Product not found</p>'; return; }
  wrap.innerHTML = `
    <div>
      <img src="${p.img}" alt="${p.title}">
      ${p.video ? `<video controls style="width:100%;margin-top:8px"><source src="${p.video}" type="video/mp4"></video>` : ''}
    </div>
    <div class="product-meta">
      <h2>${p.title}</h2>
      <div class="price">₹${p.price_inr}</div>
      <p>High-quality product. Price around ₹${p.price_inr}.</p>
      <div class="actions">
        <button class="add-cart" data-id="${p.id}">Add to cart</button>
        <button class="buy-now" data-id="${p.id}">Buy now</button>
      </div>
    </div>
  `;
}

function saveCart(){
  localStorage.setItem('messo_cart', JSON.stringify(cart));
}
function loadCart(){
  const s = localStorage.getItem('messo_cart');
  cart = s ? JSON.parse(s) : [];
}

function updateCartUI(){
  const topCount = el('cartCountTop');
  if(topCount) topCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  const checkoutList = el('checkoutList');
  if(checkoutList){
    if(cart.length === 0) checkoutList.innerHTML = '<p>No items in cart</p>';
    else checkoutList.innerHTML = cart.map(i=>`<div>${i.title} × ${i.qty} — ₹${i.price_inr * i.qty}</div>`).join('');
  }
}

// cart ops
function addToCart(id, qty=1){
  const prod = PRODUCTS.find(p=>p.id===id);
  if(!prod) return;
  const ex = cart.find(i=>i.id===id);
  if(ex) ex.qty += qty; else cart.push({...prod, qty});
  saveCart();
  updateCartUI();
}
function clearCart(){
  cart = [];
  saveCart();
  updateCartUI();
}

// Events delegation
document.addEventListener('click', (e)=>{
  const add = e.target.closest('.add-cart');
  const buy = e.target.closest('.buy-now');

  if(add){ addToCart(add.dataset.id); alert('Added to cart'); return; }
  if(buy){ addToCart(buy.dataset.id); localStorage.setItem('messo_cart', JSON.stringify(cart)); window.location = 'checkout.html'; return; }

  if(e.target && e.target.id === 'openPopupBtn') {
    const b = el('modalBackdrop'); if(b) b.style.display = 'flex';
  }
  if(e.target && e.target.id === 'closePopupBtn') {
    const b = el('modalBackdrop'); if(b) b.style.display = 'none';
  }
  if(e.target && e.target.id === 'contactCheckout') {
    const b = el('modalBackdrop'); if(b) b.style.display = 'none';
    window.location = 'checkout.html';
  }
});

// Contact (Formspree)
document.addEventListener('submit', async (e)=>{
  if(e.target && e.target.id === 'contactForm'){
    e.preventDefault();
    const status = el('contactStatus');
    status.textContent = 'Sending...';
    const fd = new FormData(e.target);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method:'POST', body: fd, headers:{ 'Accept':'application/json' }});
      if(res.ok){ status.textContent = 'Sent — we will contact you'; e.target.reset(); } else { status.textContent = 'Error sending'; }
    } catch(err) { status.textContent = 'Network error'; }
  }
});

// Checkout: call backend to create Stripe Checkout Session and redirect
async function createCheckoutSession(customerEmail = '', currency = 'inr'){
  if(!API_ROOT) {
    alert('Payment server not configured. Set API_ROOT in Script.js after deploying backend.');
    return;
  }
  if(cart.length === 0){ alert('Cart is empty'); return; }

  const items = cart.map(i => ({ id: i.id, qty: i.qty }));
  try {
    const res = await fetch(API_ROOT + '/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, customer_email: customerEmail, currency })
    });
    const json = await res.json();
    if(json.url) {
      window.location = json.url; // redirect to Stripe Checkout
    } else {
      console.error(json);
      alert('Unable to create checkout session.');
    }
  } catch(err) {
    console.error(err);
    alert('Network error. Try again.');
  }
}

// DOMContent loaded
document.addEventListener('DOMContentLoaded', ()=>{
  loadCart();
  updateCartUI();
  renderHome();
  renderProductDetail();

  const startBtn = el('startCheckout');
  if(startBtn){
    startBtn.addEventListener('click', async ()=>{
      // optional: prompt for email to prefill
      const email = prompt('Enter email to receive order confirmation (optional)', '') || '';
      await createCheckoutSession(email, 'inr');
    });
  }

  // contact modal actions
  const contactSend = el('contactSend');
  if(contactSend) { /* already handled by submit listener */ }

  // make sure quick cart count updates
  updateCartUI();
});

// Utility — expose some functions (optional debugging)
window.MESSO = { addToCart, cart, createCheckoutSession, clearCart };

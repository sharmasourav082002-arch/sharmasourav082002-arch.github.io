// script.js (copy entire file and replace existing script.js)
// Stripe publishable key (your provided pk)
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// Backend root - REPLACE this with your Render backend URL (no trailing slash)
// Example: "https://messo-backend.onrender.com"
const API_ROOT = "REPLACE_WITH_YOUR_RENDER_BACKEND_URL";

// Render products into #products
function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;
  const products = window.PRODUCTS_FRONTEND || [];
  if (!products.length) {
    container.innerHTML = '<p>No products found

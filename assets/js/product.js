// assets/js/products.js
// This file auto-generates 200 products into window.PRODUCTS_FRONTEND.
// Each product has: id, title, price_display, currency, price_smallest, image, video (empty)

(function() {
  const picsumBase = 'https://picsum.photos/seed/';
  const categories = ["T-shirt","Kurti","Phone Case","Backpack","Lamp","Watch","Sunglasses","Shoes","Handbag","Cap","Bracelet","Lipstick","Perfume","Jacket","Pants","Toy","Bottle","Headphones","Charger","Wallet"];
  const adjectives = ["Trendy","Classic","Stylish","Premium","Elegant","Casual","Sporty","Modern","Vintage","Comfort","Smart","Lightweight","Durable","Eco","Colorful","Soft","Compact","Luxury","Pocket","Daily"];
  const currency = "inr";

  const products = [];
  for (let i = 1; i <= 200; i++) {
    const cat = categories[i % categories.length];
    const adj = adjectives[i % adjectives.length];
    const id = "p" + String(i).padStart(3, '0'); // p001 ... p200
    const priceVal = 120 + (i * 3) % 400; // spread prices around 120..520 roughly
    const price_smallest = priceVal * 100; // paise
    const title = `${adj} ${cat} #${i}`;
    const image = `${picsumBase}${id}/600/400`; // picsum seeded images
    const video = ""; // keep empty by default
    const price_display = "₹" + priceVal;

    products.push({
      id,
      title,
      price_display,
      currency,
      price_smallest,
      image,
      video
    });
  }

  window.PRODUCTS_FRONTEND = products;
})();

// assets/js/products.js
// Defines window.PRODUCTS_FRONTEND (200 sample items)
// Copy-paste this file exactly into: assets/js/products.js

(function() {
  const picsumBase = 'https://picsum.photos/seed/';
  const categories = [
    "T-shirt","Kurti","Phone Case","Backpack","Lamp","Watch","Sunglasses","Shoes",
    "Handbag","Cap","Bracelet","Lipstick","Perfume","Jacket","Pants","Toy","Bottle",
    "Headphones","Charger","Wallet","Socks"
  ];
  const adjectives = [
    "Trendy","Classic","Stylish","Premium","Elegant","Casual","Sporty","Modern",
    "Vintage","Comfort","Smart","Lightweight","Durable","Eco","Colorful","Soft",
    "Compact","Luxury","Pocket","Daily","Handy","Mini","Bold","Bright"
  ];

  const products = [];
  for (let i = 1; i <= 200; i++) {
    const cat = categories[(i-1) % categories.length];
    const adj = adjectives[(i-1) % adjectives.length];
    const id = "p" + String(i).padStart(3, '0'); // p001 ... p200
    // generate price around 120..520 (so approx ₹200 average possible)
    const base = 120;
    const priceVal = base + ((i * 7) % 401); // 120..520
    const price_smallest = priceVal * 100; // for INR paise
    const title = `${adj} ${cat} #${i}`;
    // Picsum seeded image — stable per id
    const image = `${picsumBase}${id}/800/600`;
    const video = ""; // keep empty (if you later upload video, put URL here)
    const price_display = "₹" + priceVal;

    products.push({
      id,
      title,
      price_display,
      currency: "inr",
      price_smallest,
      image,
      video
    });
  }

  // expose
  window.PRODUCTS_FRONTEND = products;
})();

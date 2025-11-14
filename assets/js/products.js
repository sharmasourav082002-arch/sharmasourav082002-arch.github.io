// assets/js/products.js
// Defines window.PRODUCTS_FRONTEND array (200 items).
// Use this exact file path: assets/js/products.js
(function(){
  const picsumBase = 'https://picsum.photos/seed/';
  const categories = [
    "T-shirt","Kurti","Phone","Backpack","Lamp","Watch","Sunglasses","Shoes","Handbag","Cap",
    "Bracelet","Lipstick","Perfume","Jacket","Pants","Toy","Bottle","Headphones","Charger","Wallet",
    "Socks","Gloves","Belt","Mirror","Comb","Brush","Notepad","Pen","Pillow","Mat",
    "Mug","Blanket","Frame","Keychain","Case","Stand","Cover","Light","Fan","Earbuds",
    "PowerBank","Cable","Stroller","Bag","Spoon","Fork","Bottle2","Bottle3","Organizer","Bottle4"
  ];

  const adjectives = [
    "Trendy","Classic","Stylish","Premium","Elegant","Casual","Sporty","Modern","Vintage","Comfort",
    "Smart","Lightweight","Durable","Eco","Colorful","Soft","Compact","Luxury","Pocket","Daily",
    "Handy","Mini","Bold","Bright","Fresh","Cozy","Slim","Matte","Glossy","Sparkle"
  ];

  const products = [];
  for (let i=1;i<=200;i++){
    const cat = categories[(i-1) % categories.length];
    const adj = adjectives[(i-1) % adjectives.length];
    const id = "p" + String(i).padStart(3,"0"); // p001 ... p200
    const base = 120; // base price roughly
    const priceVal = base + ((i * 7) % 401); // varies between 120..520
    const price_smallest = priceVal * 100; // paise
    const title = `${adj} ${cat} #${i}`;
    const image = `${picsumBase}${id}/800/600`;
    const video = ""; // blank
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

  window.PRODUCTS_FRONTEND = products;
})();

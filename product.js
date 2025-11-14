// assets/js/products.js
// This file auto-generates 200 products into window.PRODUCTS_FRONTEND.
// Each product has: id, title, price_display, currency, price_smallest, image, video (empty)
// You can later replace image URLs individually.

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
  { id: "p1", title: "Stylish T-shirt", description: "Soft cotton, comfortable fit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p1/600/400", video: "" },
  { id: "p2", title: "Elegant Handbag", description: "Compact & trendy handbag.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p2/600/400", video: "" },
  { id: "p3", title: "Running Shoes", description: "Lightweight running shoes.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p3/600/400", video: "" },
  { id: "p4", title: "Classic Cap", description: "Adjustable baseball cap.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p4/600/400", video: "" },
  { id: "p5", title: "Phone Case", description: "Shockproof smartphone case.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p5/600/400", video: "" },
  { id: "p6", title: "Kids Cotton Kurti", description: "Soft kurti for kids.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p6/600/400", video: "" },
  { id: "p7", title: "Minimal Wallet", description: "Slim card holder wallet.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p7/600/400", video: "" },
  { id: "p8", title: "Fashion Sunglasses", description: "UV protected sunglasses.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p8/600/400", video: "" },
  { id: "p9", title: "Printed Scarf", description: "Lightweight printed scarf.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p9/600/400", video: "" },
  { id: "p10", title: "Travel Bottle", description: "Leakproof water bottle.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p10/600/400", video: "" },

  { id: "p11", title: "Trendy Earrings", description: "Lightweight fashion earrings.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p11/600/400", video: "" },
  { id: "p12", title: "Everyday Socks (Pack)", description: "Comfort fit socks pack.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p12/600/400", video: "" },
  { id: "p13", title: "Cute Hair Clips", description: "Assorted hair clips set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p13/600/400", video: "" },
  { id: "p14", title: "Makeup Sponge", description: "Blend cosmetics perfectly.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p14/600/400", video: "" },
  { id: "p15", title: "LED Keychain", description: "Mini LED keychain light.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p15/600/400", video: "" },
  { id: "p16", title: "Phone PopGrip", description: "Better grip for phone.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p16/600/400", video: "" },
  { id: "p17", title: "Shoe Laces Set", description: "Colorful laces for shoes.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p17/600/400", video: "" },
  { id: "p18", title: "Minimal Necklace", description: "Everyday necklace piece.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p18/600/400", video: "" },
  { id: "p19", title: "Phone Stand", description: "Foldable phone stand.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p19/600/400", video: "" },
  { id: "p20", title: "Stylish Bracelet", description: "Beaded bracelet design.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p20/600/400", video: "" },

  { id: "p21", title: "Fashion Ring", description: "Trendy ring for daily use.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p21/600/400", video: "" },
  { id: "p22", title: "Casual Belt", description: "Leather-effect casual belt.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p22/600/400", video: "" },
  { id: "p23", title: "Pocket Notebook", description: "Small pocket notebook.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p23/600/400", video: "" },
  { id: "p24", title: "Pen Set", description: "Smooth ink pen set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p24/600/400", video: "" },
  { id: "p25", title: "Kids Water Bottle", description: "Colorful kid bottle.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p25/600/400", video: "" },
  { id: "p26", title: "Phone Camera Lens", description: "Clip-on camera lens.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p26/600/400", video: "" },
  { id: "p27", title: "Mini Umbrella", description: "Compact travel umbrella.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p27/600/400", video: "" },
  { id: "p28", title: "Sunglass Case", description: "Protective sunglass case.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p28/600/400", video: "" },
  { id: "p29", title: "Classic Hairband", description: "Comfort hairband set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p29/600/400", video: "" },
  { id: "p30", title: "Travel Pouch", description: "Organize small items.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p30/600/400", video: "" },

  { id: "p31", title: "Phone Charger Cable", description: "Fast charging cable.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p31/600/400", video: "" },
  { id: "p32", title: "Car Air Freshener", description: "Long lasting fragrance.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p32/600/400", video: "" },
  { id: "p33", title: "Eco Tote Bag", description: "Reusable shopping tote.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p33/600/400", video: "" },
  { id: "p34", title: "Silicone Spatula", description: "Kitchen spatula set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p34/600/400", video: "" },
  { id: "p35", title: "Reusable Straw", description: "Stainless steel straw set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p35/600/400", video: "" },
  { id: "p36", title: "Desk Organizer", description: "Keep desk tidy.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p36/600/400", video: "" },
  { id: "p37", title: "Car Phone Holder", description: "Magnetic car mount.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p37/600/400", video: "" },
  { id: "p38", title: "Mini Bluetooth Speaker", description: "Portable sound.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p38/600/400", video: "" },
  { id: "p39", title: "Earbud Case", description: "Protective case for earbuds.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p39/600/400", video: "" },
  { id: "p40", title: "Shoe Deodorizer", description: "Keep shoes fresh.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p40/600/400", video: "" },

  { id: "p41", title: "Handmade Soap", description: "Gentle natural soap.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p41/600/400", video: "" },
  { id: "p42", title: "Phone Camera Cover", description: "Privacy camera cover.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p42/600/400", video: "" },
  { id: "p43", title: "Travel Adapter", description: "Universal adapter plug.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p43/600/400", video: "" },
  { id: "p44", title: "Silicone Phone Sleeve", description: "Soft protective sleeve.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p44/600/400", video: "" },
  { id: "p45", title: "Nail Clippers Set", description: "Grooming essentials.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p45/600/400", video: "" },
  { id: "p46", title: "Compact Mirror", description: "Handy pocket mirror.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p46/600/400", video: "" },
  { id: "p47", title: "Phone Selfie Ring", description: "Adjustable selfie light.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p47/600/400", video: "" },
  { id: "p48", title: "Luggage Tag", description: "Personalized luggage tag.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p48/600/400", video: "" },
  { id: "p49", title: "Aromatic Candle", description: "Soothing fragrance candle.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p49/600/400", video: "" },
  { id: "p50", title: "Decorative Sticker Pack", description: "Assorted stickers.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p50/600/400", video: "" },

  { id: "p51", title: "Kids Hair Clips", description: "Cute hair accessory set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p51/600/400", video: "" },
  { id: "p52", title: "Mini Tool Kit", description: "Basic home tool kit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p52/600/400", video: "" },
  { id: "p53", title: "Silk Sleep Mask", description: "Comfortable sleep eye mask.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p53/600/400", video: "" },
  { id: "p54", title: "Phone Cleaning Kit", description: "Clean screens & gadgets.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p54/600/400", video: "" },
  { id: "p55", title: "Children's Story Book", description: "Short stories for kids.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p55/600/400", video: "" },
  { id: "p56", title: "Mini First-Aid Kit", description: "Portable first-aid pack.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p56/600/400", video: "" },
  { id: "p57", title: "Magnetic Bookmark", description: "Cute magnetic bookmark.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p57/600/400", video: "" },
  { id: "p58", title: "Silicone Phone Wallet", description: "Stick-on card holder.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p58/600/400", video: "" },
  { id: "p59", title: "Mini Fan", description: "USB powered mini fan.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p59/600/400", video: "" },
  { id: "p60", title: "Compact Hair Brush", description: "Pocket-size hair brush.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p60/600/400", video: "" },

  { id: "p61", title: "Travel Sewing Kit", description: "Small sewing essentials.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p61/600/400", video: "" },
  { id: "p62", title: "Car Charger Adapter", description: "Dual USB car charger.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p62/600/400", video: "" },
  { id: "p63", title: "Silicone Baking Mat", description: "Non-stick baking sheet.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p63/600/400", video: "" },
  { id: "p64", title: "Mini Plant Pot", description: "Cute desktop planter.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p64/600/400", video: "" },
  { id: "p65", title: "Key Organizer", description: "Keep keys neat & silent.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p65/600/400", video: "" },
  { id: "p66", title: "Cable Organizer", description: "Tidy up charging cables.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p66/600/400", video: "" },
  { id: "p67", title: "Mini Photo Frame", description: "Small tabletop frame.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p67/600/400", video: "" },
  { id: "p68", title: "Portable Toothbrush", description: "Travel toothbrush holder.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p68/600/400", video: "" },
  { id: "p69", title: "Stain Remover Pen", description: "Portable stain cleaner.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p69/600/400", video: "" },
  { id: "p70", title: "Microfiber Cloth", description: "Screen & glass cleaner.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p70/600/400", video: "" },

  { id: "p71", title: "Travel Luggage Strap", description: "Secure your luggage.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p71/600/400", video: "" },
  { id: "p72", title: "Pocket Umbrella Cover", description: "Waterproof umbrella case.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p72/600/400", video: "" },
  { id: "p73", title: "Toy Car", description: "Kids small toy car.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p73/600/400", video: "" },
  { id: "p74", title: "Mini Puzzles", description: "Brain teaser puzzles.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p74/600/400", video: "" },
  { id: "p75", title: "Scented Sachets", description: "Drawer fragrance sachets.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p75/600/400", video: "" },
  { id: "p76", title: "Portable Cutlery Set", description: "Fork, spoon & knife kit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p76/600/400", video: "" },
  { id: "p77", title: "Mini Notebook Planner", description: "Daily planner notebook.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p77/600/400", video: "" },
  { id: "p78", title: "Reflective Armband", description: "Safety armband for runners.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p78/600/400", video: "" },
  { id: "p79", title: "Silicone Key Cap", description: "Colorful key identifier caps.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p79/600/400", video: "" },
  { id: "p80", title: "Mini Screwdriver Set", description: "Tiny precision screwdrivers.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p80/600/400", video: "" },

  { id: "p81", title: "Phone Grip Strap", description: "Secure hand strap for phone.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p81/600/400", video: "" },
  { id: "p82", title: "Mini Whiteboard", description: "Small message whiteboard.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p82/600/400", video: "" },
  { id: "p83", title: "Reusable Food Cover", description: "Stretchable food covers.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p83/600/400", video: "" },
  { id: "p84", title: "Cute Magnets", description: "Fridge magnet set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p84/600/400", video: "" },
  { id: "p85", title: "Mini Measuring Cup", description: "Kitchen measuring cup.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p85/600/400", video: "" },
  { id: "p86", title: "Silicone Cup Lid", description: "Prevent spills on the go.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p86/600/400", video: "" },
  { id: "p87", title: "Mini Flashlight", description: "Pocket LED flashlight.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p87/600/400", video: "" },
  { id: "p88", title: "Cable Ties Pack", description: "Reusable cable ties set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p88/600/400", video: "" },
  { id: "p89", title: "Mini Bottle Opener", description: "Keychain bottle opener.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p89/600/400", video: "" },
  { id: "p90", title: "Phone Dust Plug", description: "Protect charging port.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p90/600/400", video: "" },

  { id: "p91", title: "Mini Stress Ball", description: "Squeeze stress reliever.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p91/600/400", video: "" },
  { id: "p92", title: "Magnetic Notepad", description: "Fridge to-do notepad.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p92/600/400", video: "" },
  { id: "p93", title: "Foot File", description: "Smooth feet tool.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p93/600/400", video: "" },
  { id: "p94", title: "Shoe Polish Kit", description: "Quick shoe care kit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p94/600/400", video: "" },
  { id: "p95", title: "Mini Measuring Spoon", description: "Tiny measuring spoon.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p95/600/400", video: "" },
  { id: "p96", title: "Luggage Lock", description: "Small travel lock.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p96/600/400", video: "" },
  { id: "p97", title: "Pocket Torch", description: "Mini torch with clip.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p97/600/400", video: "" },
  { id: "p98", title: "Cable Protector", description: "Extend life of cables.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p98/600/400", video: "" },
  { id: "p99", title: "Mini Herb Planter", description: "Grow kitchen herbs.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p99/600/400", video: "" },
  { id: "p100", title: "Phone Camera Protector", description: "Protect camera lens.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p100/600/400", video: "" },

  { id: "p101", title: "Stylish Keychain", description: "Cute metal keychain.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p101/600/400", video: "" },
  { id: "p102", title: "Fabric Freshener", description: "Spray for clothes.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p102/600/400", video: "" },
  { id: "p103", title: "Phone Camera Cover Slide", description: "Privacy cover slider.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p103/600/400", video: "" },
  { id: "p104", title: "Eco Dish Brush", description: "Biodegradable dish brush.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p104/600/400", video: "" },
  { id: "p105", title: "Silicone Bowl Lid", description: "Stretch food covers.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p105/600/400", video: "" },
  { id: "p106", title: "Mini Measuring Tape", description: "Pocket measuring tape.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p106/600/400", video: "" },
  { id: "p107", title: "Kids Slap Band", description: "Fun wrist slap band.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p107/600/400", video: "" },
  { id: "p108", title: "Mini Sticky Notes", description: "Handy sticky notes.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p108/600/400", video: "" },
  { id: "p109", title: "Portable Spoon Fork Set", description: "Travel cutlery set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p109/600/400", video: "" },
  { id: "p110", title: "Mini Bluetooth Receiver", description: "Make wired devices Bluetooth.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p110/600/400", video: "" },

  { id: "p111", title: "Key Finder Sticker", description: "Find keys with sound.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p111/600/400", video: "" },
  { id: "p112", title: "Silicone Oven Mitt", description: "Heat resistant mitt.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p112/600/400", video: "" },
  { id: "p113", title: "Mini Screwdriver Precision", description: "For tiny electronics.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p113/600/400", video: "" },
  { id: "p114", title: "Mini Desk Lamp", description: "USB powered desk lamp.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p114/600/400", video: "" },
  { id: "p115", title: "Phone Anti-slip Pad", description: "Keeps phone steady.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p115/600/400", video: "" },
  { id: "p116", title: "Silicone Bottle Stopper", description: "Keep drinks fresh.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p116/600/400", video: "" },
  { id: "p117", title: "Mini Plant Seeds Pack", description: "Grow easy herbs.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p117/600/400", video: "" },
  { id: "p118", title: "Mini Phone Tripod", description: "Stable phone tripod.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p118/600/400", video: "" },
  { id: "p119", title: "Cable Clip Set", description: "Hold cables in place.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p119/600/400", video: "" },
  { id: "p120", title: "Mini Candle Holder", description: "Decorative holder.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p120/600/400", video: "" },

  { id: "p121", title: "Phone Lens Protector", description: "Protect camera edges.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p121/600/400", video: "" },
  { id: "p122", title: "Mini Puzzle Cube", description: "Handheld puzzle cube.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p122/600/400", video: "" },
  { id: "p123", title: "Pack of Buttons", description: "Sewing kit buttons set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p123/600/400", video: "" },
  { id: "p124", title: "Drink Coasters", description: "Protect surfaces.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p124/600/400", video: "" },
  { id: "p125", title: "Mini Lip Balm", description: "Hydrating lip balm.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p125/600/400", video: "" },
  { id: "p126", title: "Phone Stylus Pen", description: "Smooth screen stylus.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p126/600/400", video: "" },
  { id: "p127", title: "Mini Flash Drive", description: "Tiny USB storage drive.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p127/600/400", video: "" },
  { id: "p128", title: "Mini Mirror Keychain", description: "Handy mirror on keychain.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p128/600/400", video: "" },
  { id: "p129", title: "Car Vent Clip", description: "Car perfume vent clip.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p129/600/400", video: "" },
  { id: "p130", title: "Kids Drawing Kit", description: "Colors & small sketchbook.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p130/600/400", video: "" },

  { id: "p131", title: "Mini Gardening Tool", description: "Handy small trowel.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p131/600/400", video: "" },
  { id: "p132", title: "Earphone Organizer", description: "Keep earphones tidy.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p132/600/400", video: "" },
  { id: "p133", title: "Mini Chalkboard", description: "Message board for fridge.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p133/600/400", video: "" },
  { id: "p134", title: "Portable Sewing Needle", description: "Small needle kit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p134/600/400", video: "" },
  { id: "p135", title: "Mini Plant Watering Can", description: "Tiny indoor watering can.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p135/600/400", video: "" },
  { id: "p136", title: "Mini Ice Tray", description: "Fun ice cube shapes.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p136/600/400", video: "" },
  { id: "p137", title: "Decorative Ribbon", description: "Gift wrapping ribbon.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p137/600/400", video: "" },
  { id: "p138", title: "Mini Magnifying Glass", description: "Portable magnifier.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p138/600/400", video: "" },
  { id: "p139", title: "Silicone Soap Holder", description: "Drain soap bar easily.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p139/600/400", video: "" },
  { id: "p140", title: "Mini Travel Towel", description: "Quick dry small towel.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p140/600/400", video: "" },

  { id: "p141", title: "Mini Spice Shaker", description: "Sprinkle spices easily.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p141/600/400", video: "" },
  { id: "p142", title: "Mini Chalk Set", description: "Colorful chalks for kids.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p142/600/400", video: "" },
  { id: "p143", title: "Compact Food Container", description: "Snack box for travel.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p143/600/400", video: "" },
  { id: "p144", title: "Carabiner Clip", description: "Multi-use carabiner clip.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p144/600/400", video: "" },
  { id: "p145", title: "Mini Screwdriver Pocket", description: "Compact multi-bit set.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p145/600/400", video: "" },
  { id: "p146", title: "Mini Measuring Jar", description: "Small measuring jar.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p146/600/400", video: "" },
  { id: "p147", title: "Phone Dust Cleaner", description: "Remove dust & lint.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p147/600/400", video: "" },
  { id: "p148", title: "Silicone Spoon", description: "Heat resistant spoon.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p148/600/400", video: "" },
  { id: "p149", title: "Mini Desk Calendar", description: "Small date planner.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p149/600/400", video: "" },
  { id: "p150", title: "Tiny Photo Album", description: "Mini pocket album.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p150/600/400", video: "" },

  { id: "p151", title: "Portable Ticket Holder", description: "Keep travel tickets safe.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p151/600/400", video: "" },
  { id: "p152", title: "Mini Dish Rack", description: "Dry small utensils.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p152/600/400", video: "" },
  { id: "p153", title: "Mini Ice Cream Scoop", description: "Perfect small scoop.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p153/600/400", video: "" },
  { id: "p154", title: "Mini Travel Blanket", description: "Small comfy blanket.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p154/600/400", video: "" },
  { id: "p155", title: "Phone Ring Holder", description: "Improved grip and stand.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p155/600/400", video: "" },
  { id: "p156", title: "Mini Whisk", description: "Mix small amounts easily.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p156/600/400", video: "" },
  { id: "p157", title: "Mini Ice Scraper", description: "Car windscreen scraper.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p157/600/400", video: "" },
  { id: "p158", title: "Mini Ear Cleaner", description: "Safe ear cleaning tool.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p158/600/400", video: "" },
  { id: "p159", title: "Mini Paint Set", description: "Colors for kids projects.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p159/600/400", video: "" },
  { id: "p160", title: "Mini Plant Hanger", description: "Hang small pots decoratively.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p160/600/400", video: "" },

  { id: "p161", title: "Mini Soap Saver", description: "Soap saver pouch.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p161/600/400", video: "" },
  { id: "p162", title: "Mini Food Box", description: "Snack container small.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p162/600/400", video: "" },
  { id: "p163", title: "Mini Bottle Brush", description: "Clean narrow bottles.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p163/600/400", video: "" },
  { id: "p164", title: "Mini Door Hook", description: "Hang towels & items.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p164/600/400", video: "" },
  { id: "p165", title: "Mini Travel Soap", description: "Tiny soap bar pack.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p165/600/400", video: "" },
  { id: "p166", title: "Mini Toothpaste Tube", description: "Travel size toothpaste.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p166/600/400", video: "" },
  { id: "p167", title: "Mini Sewing Kit", description: "Portable sewing essentials.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p167/600/400", video: "" },
  { id: "p168", title: "Mini Pocket Knife", description: "Small multi-tool knife.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p168/600/400", video: "" },
  { id: "p169", title: "Mini LED Clip Light", description: "Clip-on reading light.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p169/600/400", video: "" },
  { id: "p170", title: "Mini Safety Pins", description: "Useful small pins pack.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p170/600/400", video: "" },

  { id: "p171", title: "Mini Pegs Pack", description: "Small clothespins.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p171/600/400", video: "" },
  { id: "p172", title: "Mini Ice Cube Tray", description: "Fun shapes for drinks.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p172/600/400", video: "" },
  { id: "p173", title: "Mini Bottle Cutter", description: "Craft tool for bottles.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p173/600/400", video: "" },
  { id: "p174", title: "Mini Shoe Horn", description: "Compact shoe horn.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p174/600/400", video: "" },
  { id: "p175", title: "Mini Travel Mirror", description: "Pocket travel mirror.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p175/600/400", video: "" },
  { id: "p176", title: "Mini Sticky Hooks", description: "Adhesive wall hooks.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p176/600/400", video: "" },
  { id: "p177", title: "Mini Travel Soap Box", description: "Carry soap safely.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p177/600/400", video: "" },
  { id: "p178", title: "Mini Pocket Screwdriver", description: "Handy small screwdriver.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p178/600/400", video: "" },
  { id: "p179", title: "Mini Earphone Case", description: "Protect earbuds on the go.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p179/600/400", video: "" },
  { id: "p180", title: "Mini Shoe Bag", description: "Keep shoes protected.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p180/600/400", video: "" },

  { id: "p181", title: "Mini Travel Soap Case", description: "Carry soap bars easily.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p181/600/400", video: "" },
  { id: "p182", title: "Mini Travel Spoon", description: "Compact folding spoon.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p182/600/400", video: "" },
  { id: "p183", title: "Mini Food Clips", description: "Seal snack packets.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p183/600/400", video: "" },
  { id: "p184", title: "Mini Safety Cutter", description: "Open boxes safely.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p184/600/400", video: "" },
  { id: "p185", title: "Mini Shoe Polish", description: "Quick shoe shine kit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p185/600/400", video: "" },
  { id: "p186", title: "Mini Travel Soap Net", description: "Lather & scrub easily.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p186/600/400", video: "" },
  { id: "p187", title: "Mini Travel Toothbrush Cover", description: "Protect bristles while travel.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p187/600/400", video: "" },
  { id: "p188", title: "Mini Shoe Lace Lock", description: "Lock shoelaces firmly.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p188/600/400", video: "" },
  { id: "p189", title: "Mini Travel Bottle", description: "Carry liquids safely.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p189/600/400", video: "" },
  { id: "p190", title: "Mini Sticky Tape", description: "Handy small tape roll.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p190/600/400", video: "" },

  { id: "p191", title: "Mini Multipurpose Cloth", description: "Clean & polish surfaces.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p191/600/400", video: "" },
  { id: "p192", title: "Mini Travel Nail File", description: "Keep nails neat.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p192/600/400", video: "" },
  { id: "p193", title: "Mini Curtain Hook", description: "Small curtain accessories.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p193/600/400", video: "" },
  { id: "p194", title: "Mini Dustpan Brush", description: "Sweep small areas easily.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p194/600/400", video: "" },
  { id: "p195", title: "Mini Soap Cup", description: "Small soap holder cup.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p195/600/400", video: "" },
  { id: "p196", title: "Mini Key Pouch", description: "Carry keys safely.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p196/600/400", video: "" },
  { id: "p197", title: "Mini Travel Sewing Needle Set", description: "Emergency stitching kit.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p197/600/400", video: "" },
  { id: "p198", title: "Mini Travel Spice Jar", description: "Carry spices on the go.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p198/600/400", video: "" },
  { id: "p199", title: "Mini Travel Soap Sheet", description: "Thin disposable soap sheets.", price_display: "₹199", price_smallest: 19900, currency: "inr", image: "https://picsum.photos/seed/p199/600/400", video: ""

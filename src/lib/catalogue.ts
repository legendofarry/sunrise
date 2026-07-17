export type Category = {
  id: string;
  name: string;
  blurb: string;
  accent: string; // tailwind gradient stops
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { id: "wine", name: "Wine", blurb: "Reds, whites, rosé & sparkling", accent: "from-[oklch(0.34_0.13_15)] to-[oklch(0.42_0.15_25)]", emoji: "🍷" },
  { id: "whisky", name: "Whisky", blurb: "Scotch, bourbon, Irish & blends", accent: "from-[oklch(0.45_0.11_60)] to-[oklch(0.55_0.13_70)]", emoji: "🥃" },
  { id: "vodka", name: "Vodka", blurb: "Clean, crisp & premium pours", accent: "from-[oklch(0.55_0.05_240)] to-[oklch(0.65_0.06_230)]", emoji: "🍸" },
  { id: "gin", name: "Gin", blurb: "London dry, botanicals & pink", accent: "from-[oklch(0.55_0.09_150)] to-[oklch(0.65_0.11_140)]", emoji: "🌿" },
  { id: "rum", name: "Rum", blurb: "White, dark & spiced", accent: "from-[oklch(0.4_0.11_45)] to-[oklch(0.5_0.13_55)]", emoji: "🏴‍☠️" },
  { id: "tequila", name: "Tequila", blurb: "Blanco, reposado & añejo", accent: "from-[oklch(0.7_0.14_95)] to-[oklch(0.78_0.13_82)]", emoji: "🌵" },
  { id: "beer", name: "Beer & Cider", blurb: "Lagers, ales & craft cans", accent: "from-[oklch(0.62_0.14_80)] to-[oklch(0.72_0.15_90)]", emoji: "🍺" },
  { id: "mixers", name: "Mixers & More", blurb: "Tonics, sodas & bar snacks", accent: "from-[oklch(0.45_0.09_195)] to-[oklch(0.55_0.11_200)]", emoji: "🥤" },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  origin: string;
  size: string;
  notes: string;
  price: number; // KES
  featured?: boolean;
  promo?: { was: number; label: string };
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Nederburg Cabernet Sauvignon", category: "wine", origin: "South Africa", size: "750 ml", notes: "Blackcurrant, cedar, soft tannins", price: 1650, featured: true },
  { id: "p2", name: "Four Cousins Sweet Rosé", category: "wine", origin: "South Africa", size: "750 ml", notes: "Strawberry, easy sipping", price: 1450 },
  { id: "p3", name: "Robertson Chardonnay", category: "wine", origin: "South Africa", size: "750 ml", notes: "Citrus, buttery finish", price: 1550 },
  { id: "p4", name: "Moët & Chandon Impérial", category: "wine", origin: "France", size: "750 ml", notes: "Bright apple, brioche", price: 9800, featured: true, promo: { was: 10500, label: "Save KES 700" } },
  { id: "p5", name: "Johnnie Walker Black Label 12yo", category: "whisky", origin: "Scotland", size: "750 ml", notes: "Smoke, vanilla, dried fruit", price: 4200, featured: true },
  { id: "p6", name: "Jameson Irish Whiskey", category: "whisky", origin: "Ireland", size: "750 ml", notes: "Smooth, honey, toasted wood", price: 2800, promo: { was: 3100, label: "This week only" } },
  { id: "p7", name: "Glenfiddich 12 Year", category: "whisky", origin: "Scotland", size: "700 ml", notes: "Pear, oak, gentle malt", price: 5600 },
  { id: "p8", name: "Chivas Regal 12", category: "whisky", origin: "Scotland", size: "750 ml", notes: "Honey, hazelnut, spice", price: 3900 },
  { id: "p9", name: "Smirnoff Red Label", category: "vodka", origin: "Russia", size: "750 ml", notes: "Triple-distilled, mixable", price: 1350 },
  { id: "p10", name: "Absolut Blue", category: "vodka", origin: "Sweden", size: "750 ml", notes: "Crisp wheat, clean finish", price: 2450, featured: true },
  { id: "p11", name: "Bombay Sapphire", category: "gin", origin: "England", size: "750 ml", notes: "10 botanicals, juniper-led", price: 3100 },
  { id: "p12", name: "Hendrick's Gin", category: "gin", origin: "Scotland", size: "700 ml", notes: "Rose, cucumber, elegant", price: 4800, featured: true },
  { id: "p13", name: "Captain Morgan Spiced", category: "rum", origin: "Jamaica", size: "750 ml", notes: "Vanilla, warm spice", price: 2200 },
  { id: "p14", name: "Bacardi Superior", category: "rum", origin: "Puerto Rico", size: "750 ml", notes: "Light, clean, versatile", price: 1900 },
  { id: "p15", name: "Jose Cuervo Especial Silver", category: "tequila", origin: "Mexico", size: "750 ml", notes: "Agave, pepper, citrus", price: 2900, promo: { was: 3200, label: "Fiesta week" } },
  { id: "p16", name: "Tusker Lager (6-pack)", category: "beer", origin: "Kenya", size: "6 × 500 ml", notes: "Crisp, malty, local pride", price: 1450 },
  { id: "p17", name: "Heineken (6-pack)", category: "beer", origin: "Netherlands", size: "6 × 330 ml", notes: "Refreshing pilsner", price: 1650 },
  { id: "p18", name: "Savanna Dry Cider", category: "beer", origin: "South Africa", size: "330 ml", notes: "Dry apple, sparkling", price: 320 },
  { id: "p19", name: "Fever-Tree Tonic (4-pack)", category: "mixers", origin: "UK", size: "4 × 200 ml", notes: "Perfect with any gin", price: 950 },
  { id: "p20", name: "Red Bull (4-pack)", category: "mixers", origin: "Austria", size: "4 × 250 ml", notes: "Vodka's best friend", price: 900 },
];

export const REVIEWS = [
  { name: "Wanjiru M.", rating: 5, text: "My go-to shop in Ngumba. Fair prices, and Peter always recommends the perfect bottle for guests.", date: "2 weeks ago" },
  { name: "Brian K.", rating: 5, text: "Ordered on WhatsApp before a match — ready in 10 minutes. Cannot beat that convenience.", date: "1 month ago" },
  { name: "Amina O.", rating: 4, text: "Great wine selection for the neighborhood. Would love a few more sweet whites in stock.", date: "1 month ago" },
  { name: "David N.", rating: 5, text: "Weekly promos are real value. Grabbed Jameson at a fantastic price last Friday.", date: "3 weeks ago" },
  { name: "Cynthia R.", rating: 5, text: "Clean, well-lit shop and genuine bottles — no funny business. Highly recommended.", date: "2 months ago" },
  { name: "Mwangi J.", rating: 5, text: "Best neighborhood liquor store around the estate. Friendly staff, quick service.", date: "5 days ago" },
];

export const FAQS = [
  { q: "Do you deliver in Ngumba and nearby estates?", a: "Yes. We offer quick boda-boda drop-offs within Ngumba, Kasarani, Roysambu and Thome. Send us a WhatsApp with your location for a delivery quote." },
  { q: "Can I pre-order on WhatsApp and pick up?", a: "Absolutely. Message us with what you need and pickup time — we'll have it packed and waiting at the counter." },
  { q: "Do you accept M-Pesa?", a: "Yes, M-Pesa, card and cash are all welcome." },
  { q: "Are your bottles guaranteed genuine?", a: "Every bottle in our store is sourced directly from licensed distributors. We stand behind every pour." },
  { q: "Do you sell to anyone under 18?", a: "No. Kenyan law prohibits sale of alcohol to persons under 18. ID may be requested at the counter." },
  { q: "Do you cater for parties or events?", a: "Yes — talk to us about bulk pricing for weddings, house parties and corporate events. We'll help plan the bar." },
];

export const PROMOS = [
  { title: "Weekend Whisky Wind-down", detail: "Jameson & Chivas 12 — special prices Friday to Sunday.", tag: "Fri–Sun" },
  { title: "Wine Wednesday", detail: "Buy any two wines and save 10% at the counter.", tag: "Every Wed" },
  { title: "Six-pack Saturday", detail: "Tusker & Heineken six-packs at a special neighbour rate.", tag: "Sat" },
];

// Delightful cocktail suggestions for the Shake feature
export const MYSTERY_POURS = [
  { name: "The Ngumba Sundowner", spec: "2 oz gin · tonic · cucumber · lime", vibe: "Golden hour on the balcony" },
  { name: "Estate Old Fashioned", spec: "2 oz bourbon · sugar cube · Angostura · orange peel", vibe: "Slow evening, jazz on low" },
  { name: "Rosé Spritz", spec: "3 oz rosé · soda · fresh strawberry", vibe: "Sunday brunch reset" },
  { name: "Kenyan Mule", spec: "2 oz vodka · ginger beer · fresh lime · dawa honey", vibe: "Match-day fuel" },
  { name: "Midnight Espresso", spec: "1 oz vodka · 1 oz coffee liqueur · fresh espresso", vibe: "Late-night, no regrets" },
  { name: "Tropical Storm", spec: "2 oz dark rum · pineapple · lime · Angostura", vibe: "Rainy-day escape" },
  { name: "Tequila Paloma", spec: "2 oz tequila · grapefruit soda · lime · salt rim", vibe: "Weekend afternoon" },
  { name: "The Neighbour", spec: "House pour of the day, chosen by Peter", vibe: "Trust the barman" },
];
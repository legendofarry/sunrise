import { WHISKY_PRODUCTS } from "./whisky";
import { SPIRIT_PRODUCTS } from "./spirits";
import { WINE_PRODUCTS } from "./wine";
import { BEER_PRODUCTS } from "./beer";
import { NONALCOHOLIC_PRODUCTS } from "./nonalcoholic";

export type { Product } from "./whisky";

// Master catalogue combining all products
export const ALL_PRODUCTS = [
  ...WHISKY_PRODUCTS,
  ...SPIRIT_PRODUCTS,
  ...WINE_PRODUCTS,
  ...BEER_PRODUCTS,
  ...NONALCOHOLIC_PRODUCTS,
];

// Total product count
export const PRODUCT_COUNT = ALL_PRODUCTS.length;

// Get featured products
export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter((p) => p.featured);

// Get popular products
export const POPULAR_PRODUCTS = ALL_PRODUCTS.filter((p) => p.popular);

// Get new arrivals
export const NEW_ARRIVALS = ALL_PRODUCTS.filter((p) => p.newArrival);

// Get unique categories
export const PRODUCT_CATEGORIES = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.category))
).sort();

// Get products by category
export const getProductsByCategory = (category: string) => {
  return ALL_PRODUCTS.filter((p) => p.category === category);
};

// Search products
export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q)
  );
};

// Get in-stock products
export const getInStockProducts = () => {
  return ALL_PRODUCTS.filter((p) => p.availability !== "Out of Stock");
};

// Filter by price range
export const filterByPriceRange = (min: number, max: number) => {
  return ALL_PRODUCTS.filter((p) => p.price >= min && p.price <= max);
};

// Get by ABV range (for alcoholic drinks)
export const filterByABV = (minAbv: number, maxAbv: number) => {
  return ALL_PRODUCTS.filter((p) => p.abv >= minAbv && p.abv <= maxAbv);
};

// Get by country
export const getByCountry = (country: string) => {
  return ALL_PRODUCTS.filter((p) => p.country === country);
};

// Get unique countries
export const PRODUCT_COUNTRIES = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.country))
).sort();

// Get by brand
export const getByBrand = (brand: string) => {
  return ALL_PRODUCTS.filter((p) => p.brand === brand);
};

// Get unique brands
export const PRODUCT_BRANDS = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.brand))
).sort();

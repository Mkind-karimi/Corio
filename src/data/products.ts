import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "کیف دستی کلاسیک",
    slug: "classic-bag",
    sku: "CR-001",

    price: 4800000,

    image: "/images/123456.webp",

    images: [
      "/images/123456.webp",
      "/images/123456.webp",
      "/images/123456.webp",
      "/images/123456.webp",
      "/images/123456.webp",
    ],

    stock: "in-stock",

    label: "موجود در انبار",

    category: "women",

    subcategory: "handbags",

    customizable: true,
  },

  {
    id: 2,
    name: "جاسوییچی چرمی",
    slug: "keychain",
    sku: "CR-002",

    price: 1400000,

    image: "/images/123456.webp",

    images: [
      "/images/123456.webp",
    ],

    stock: "in-stock",

    label: "پرفروش",

    category: "accessories",

    subcategory: "keychains",

    customizable: true,
  },

  {
    id: 3,
    name: "کیف دوشی کوچک",
    slug: "small-shoulder-bag",
    sku: "CR-003",

    price: 2700000,

    image: "/images/123456.webp",

    images: [
      "/images/123456.webp",
    ],

    stock: "in-stock",

    label: "موجود",

    category: "women",

    subcategory: "shoulder-bags",

    customizable: true,
  },

  {
    id: 4,
    name: "جاکارتی چرمی",
    slug: "leather-cardholder",
    sku: "CR-004",

    price: 1800000,

    image: "/images/123456.webp",

    images: [
      "/images/123456.webp",
    ],

    stock: "in-stock",

    label: "موجود",

    category: "accessories",

    subcategory: "cardholders",

    customizable: true,
  },

  {
    id: 5,
    name: "کیف پول زنانه",
    slug: "womens-wallet",
    sku: "CR-005",

    price: 2900000,

    image: "/images/123456.webp",

    images: [
      "/images/123456.webp",
    ],

    stock: "in-stock",

    label: "موجود",

    category: "women",

    subcategory: "wallets",

    customizable: true,
  },
];
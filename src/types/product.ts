export type Product = {
  id: number;

  name: string;

  slug: string;

  sku: string;

  price: number;

  image: string;

  images: string[];

  stock: "in-stock" | "out-of-stock";

  label?: string;

  category: "men" | "women" | "accessories";

  subcategory?: string;

  customizable: boolean;

  originalPrice?: number;

  discountPercentage?: number;
};
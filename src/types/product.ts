export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDimension = {
  label: string;
  value: string;
};

export type ProductCareInstruction = {
  title: string;
  description: string;
};

export type ProductDetailsData = {
  specifications: ProductSpecification[];

  dimensions?: ProductDimension[];

  capacity?: string;

  careInstructions?: ProductCareInstruction[];

  productionTime?: string;

  shipping?: string;

  warranty?: string;
};

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

  details: ProductDetailsData;
};
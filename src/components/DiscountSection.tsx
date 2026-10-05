import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

const discountedProducts: Product[] = [
  {
    id: 1,
    name: "جاکارتی کلاسیک",
    slug: "cardholder-classic",
    image: "/images/123456.webp",
    price: 1520000,
    originalPrice: 1900000,
    discountPercentage: 20,
    label: "موجود",
  },

  {
    id: 2,
    name: "کیف پول مردانه",
    slug: "mens-wallet",
    image: "/images/product-sale-02.jpg",
    price: 3825000,
    originalPrice: 4500000,
    discountPercentage: 15,
    label: "موجود",
  },

  {
    id: 3,
    name: "کیف دوشی زنانه",
    slug: "womens-bag",
    image: "/images/product-sale-03.jpg",
    price: 4680000,
    originalPrice: 5200000,
    discountPercentage: 10,
    label: "موجود",
  },

  {
    id: 4,
    name: "بوک مارک چرمی",
    slug: "leather-bookmark",
    image: "/images/product-sale-04.jpg",
    price: 765000,
    originalPrice: 850000,
    discountPercentage: 10,
    label: "موجود",
  },
];

export default function DiscountSection() {
  return (
    <section
      id="discounts"
      dir="rtl"
      className="mx-auto  px-6 pb-20 lg:px-10 text-[#1A1A1C] bg-[#E9D8C4]"
    >
      {/* Section Header */}
      <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-[#4A2E19]">
            OFFERS
          </p>

          <h2 className="text-2xl font-bold lg:text-3xl">
            تخفیف‌های فعلی
          </h2>
        </div>

        <Link
          href="/sale"
          className="text-sm text-[#4A2E19] transition hover:opacity-70"
        >
          مشاهده همه ←
        </Link>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">

        {discountedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </section>
  );
}
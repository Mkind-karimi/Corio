import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const discountedProducts = products.filter(
  (product) =>
    product.originalPrice !== undefined &&
    product.discountPercentage !== undefined
);

export default function DiscountSection() {
  return (
    <section
      id="discounts"
      dir="rtl"
      className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10 text-[#1A1A1C] "
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
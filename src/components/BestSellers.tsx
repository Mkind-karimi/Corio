import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const bestSellerSlugs = [
  "leather-wallet",
  "simple-cardholder",
  "womens-handbag",
  "keychain",
];

const bestSellingProducts = bestSellerSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product) => product !== undefined);

export default function BestSellers() {
  return (
    <section
      id="bestsellers"
      dir="rtl"
      className="mx-auto max-w-[1440px]  px-6 pb-20 lg:px-10 "
    >
      {/* Section Header */}
      <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5">

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-[#4A2E19]">
            BEST SELLERS
          </p>

          <h2 className="text-2xl font-bold lg:text-3xl">
            پرفروش‌ها
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-sm text-[#4A2E19] transition hover:opacity-70"
        >
          مشاهده همه ←
        </Link>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">

        {bestSellingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </section>
  );
}
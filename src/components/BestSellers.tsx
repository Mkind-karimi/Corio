import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

const bestSellingProducts: Product[] = [
  {
    id: 1,
    name: "کیف پول چرمی",
    slug: "leather-wallet",
    image: "/images/bestseller-01.jpg",
    price: 4200000,
    label: "موجود",
  },

  {
    id: 2,
    name: "جاکارتی ساده",
    slug: "simple-cardholder",
    image: "/images/bestseller-02.jpg",
    price: 1800000,
    label: "موجود",
  },

  {
    id: 3,
    name: "کیف دستی زنانه",
    slug: "womens-handbag",
    image: "/images/bestseller-03.jpg",
    price: 4800000,
    label: "موجود",
  },

  {
    id: 4,
    name: "جاسوییچی چرمی",
    slug: "keychain",
    image: "/images/bestseller-04.jpg",
    price: 1400000,
    label: "موجود",
  },
];

export default function BestSellers() {
  return (
    <section
      id="bestsellers"
      dir="rtl"
      className="mx-auto  px-6 pb-20 lg:px-10  text-[#1A1A1C] bg-[#E9D8C4]"
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
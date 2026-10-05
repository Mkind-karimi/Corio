import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.originalPrice !== undefined &&
    product.discountPercentage !== undefined;

  const finalPrice = hasDiscount
    ? Math.round(
        product.originalPrice! * (1 - product.discountPercentage! / 100)
      )
    : product.price;

  const formattedPrice = finalPrice.toLocaleString("fa-IR");
  const formattedOriginalPrice = product.originalPrice?.toLocaleString("fa-IR");

  return (
    <article className="group">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-[#DCC5AA]">

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute right-3 top-3 z-10 bg-[#4A2E19] px-3 py-1.5 text-[11px] font-medium text-white">
            {product.discountPercentage}٪ تخفیف
          </div>
        )}

        <Link
          href={`/product/${product.slug}`}
          className="block"
        >
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* Product Information */}
      <div className="pt-4">

        <h3 className="text-sm font-bold">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">

          {hasDiscount && formattedOriginalPrice && (
            <span className="text-xs text-black/40 line-through">
              {formattedOriginalPrice} تومان
            </span>
          )}

          <span className="text-sm font-semibold text-[#4A2E19]">
            {formattedPrice} تومان
          </span>

        </div>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xs text-black/50">
            {product.label}
          </span>

          <Link
            href={`/product/${product.slug}`}
            aria-label={`مشاهده ${product.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 transition duration-300 hover:bg-[#4A2E19] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7.5 9V7a4.5 4.5 0 0 1 9 0v2" />
              <path d="M4.5 9h15l-1.1 9.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4.5 9Z" />
              <path d="M8.5 13h7" />
            </svg>
          </Link>

        </div>
      </div>
    </article>
  );
}
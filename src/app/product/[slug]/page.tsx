import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";

import { products } from "@/data/products";

const product = products[0];

const galleryImages = [
  "/images/123456.webp",
  "/images/123456.webp",
  "/images/123456.webp",
  "/images/123456.webp",
  "/images/123456.webp",
];

const relatedProducts = products.filter(
  (item) => item.slug !== product.slug
);

const reviews = [
  {
    id: 1,
    text: "واقعاً ارزش خرید داره. چرمش طبیعی و جزئیات کار عالیه.",
  },
  {
    id: 2,
    text: "طراحی ساده و شیک داره، فضای داخلی خوبی داره و کیفیت دوختش قابل توجهه.",
  },
  {
    id: 3,
    text: "کیفیت چرم و دوخت عالیه. دقیقاً همون چیزی بود که انتظار داشتم.",
  },
];

export default function ProductPage() {
  return (
    <>
      <Header />

      <main className="bg-[#E9D8C4] text-[#1A1A1C]">

        {/* =====================================================
            PRODUCT TOP SECTION
        ====================================================== */}
        <section className="mx-auto max-w-[1440px] px-6 pb-8 pt-5 lg:px-10">

          {/* Breadcrumb */}
          <div
            dir="rtl"
            className="mb-6 flex items-center justify-end gap-2 text-xs text-black/55"
          >
            <Link href="/" className="transition hover:text-[#4A2E19]">
              خانه
            </Link>

            <span>/</span>

            <Link
              href="/category/women"
              className="transition hover:text-[#4A2E19]"
            >
              زنانه
            </Link>

            <span>/</span>

            <Link
              href="/category/women/handbags"
              className="transition hover:text-[#4A2E19]"
            >
              کیف دستی
            </Link>

            <span>/</span>

            <span className="text-black/80">
              کیف دستی کلاسیک
            </span>
          </div>


          {/* Product Area */}
          <div
            dir="ltr"
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14"
          >

            {/* =================================================
                GALLERY
            ================================================== */}
            <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-4">

              {/* Thumbnails */}
              <div className="flex flex-col items-center gap-3">

                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`تصویر ${index + 1} محصول`}
                    className="relative h-14 w-14 overflow-hidden bg-[#DCC5AA] transition hover:opacity-75 lg:h-[58px] lg:w-[58px]"
                  >
                    <Image
                      src={image}
                      alt={`تصویر ${index + 1} کیف دستی کلاسیک`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}

                {/* Down Arrow */}
                <button
                  type="button"
                  aria-label="تصاویر بیشتر"
                  className="mt-1 flex h-8 w-8 items-center justify-center text-[#4A2E19]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

              </div>


              {/* Main Image */}
              <div className="relative aspect-[1.15/1] overflow-hidden bg-[#DCC5AA]">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />


                {/* Previous */}
                <button
                  type="button"
                  aria-label="تصویر قبلی"
                  className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/10 text-white backdrop-blur-sm transition hover:bg-black/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>


                {/* Next */}
                <button
                  type="button"
                  aria-label="تصویر بعدی"
                  className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/10 text-white backdrop-blur-sm transition hover:bg-black/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>


                {/* Fullscreen Icon */}
                <button
                  type="button"
                  aria-label="نمایش تمام صفحه"
                  className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="8 3 3 3 3 8" />
                    <polyline points="16 3 21 3 21 8" />
                    <polyline points="8 21 3 21 3 16" />
                    <polyline points="21 16 21 21 16 21" />
                  </svg>
                </button>

              </div>

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================== */}
            <div dir="rtl" className="flex flex-col justify-center">

              <h1 className="text-3xl font-medium leading-[1.7] sm:text-4xl lg:text-[38px]">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-medium text-[#1A1A1C]">
                {product.price}
              </p>


              {/* Stock */}
              <div className="mt-6 flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="text-sm">
                  {product.stock}
                </span>

              </div>


              {/* SKU */}
              <p
                dir="ltr"
                className="mt-6 text-left text-xs text-black/65 lg:text-right"
              >
                SKU: {product.sku}
              </p>


              {/* Add to cart */}
              <Link
                href="/cart"
                className="mt-7 flex h-11 items-center justify-center gap-4 bg-[#4A2E19] text-sm font-medium text-white transition hover:bg-[#382214]"
              >
                <span>
                  افزودن به سبد خرید
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.5 9V7a4.5 4.5 0 0 1 9 0v2" />
                  <path d="M4.5 9h15l-1.1 9.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4.5 9Z" />
                  <path d="M8.5 13h7" />
                </svg>
              </Link>


              {/* Custom */}
              <Link
                href="/custom/simple?product=CR-001"
                className="mt-4 flex h-11 items-center justify-center gap-4 border border-[#1A1A1C] text-sm font-medium transition hover:bg-black/5"
              >
                <span>
                  می‌خواهم کاستوم کنم
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.5 4.5l4 4" />
                  <path d="M14 6l4 4" />
                  <path d="M5 19l3.5-.7L18.8 8a1.7 1.7 0 0 0 0-2.4l-.4-.4a1.7 1.7 0 0 0-2.4 0L5.7 16.8 5 19Z" />
                </svg>
              </Link>

            </div>

          </div>
        </section>


         <ProductDetails />
         

        {/* =====================================================
            REVIEWS
        ====================================================== */}
        <section className="mx-auto max-w-[1440px] border-t border-black/10 px-6 py-7 lg:px-10">

          <div
            dir="ltr"
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14"
          >

            {/* Review Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {reviews.map((review) => (
                <article
                  key={review.id}
                  dir="rtl"
                  className="min-h-[170px] border border-black/10 p-5"
                >

                  {/* Stars */}
                  <div
                    dir="ltr"
                    className="flex justify-end gap-0.5 text-[#4A2E19]"
                  >
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <p className="mt-6 text-xs leading-8 text-black/70">
                    {review.text}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xs text-black/50">
                      - مشتری
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="8" r="3" />
                        <path d="M5.5 20c.7-3.7 2.8-5.5 6.5-5.5s5.8 1.8 6.5 5.5" />
                      </svg>

                    </div>

                  </div>

                </article>
              ))}

            </div>


            {/* Review Summary */}
            <div dir="rtl" className="flex flex-col items-end justify-center">

              <h2 className="text-2xl font-bold">
                نظرات مشتریان
              </h2>

              <span className="mt-4 block h-px w-10 bg-[#4A2E19]/40" />

              <div
                dir="ltr"
                className="mt-5 flex gap-1 text-2xl text-[#4A2E19]"
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span className="mt-4 block h-px w-10 bg-[#4A2E19]/40" />

              <p className="mt-5 text-sm text-black/60">
                این محصول هنوز نظری ندارد.
              </p>

              <button
                type="button"
                className="mt-7 flex h-11 w-full items-center justify-center bg-[#4A2E19] text-sm font-medium text-white transition hover:bg-[#382214]"
              >
                ثبت نظر
              </button>

            </div>

          </div>

        </section>


        {/* =====================================================
            RELATED PRODUCTS
        ====================================================== */}
        {/* =====================================================
    RELATED PRODUCTS
====================================================== */}
<section
  id="related-products"
  className="mx-auto max-w-[1440px] border-t border-black/10 px-6 py-10 lg:px-10"
>

  {/* Section Header */}
  <div
    dir="rtl"
    className="mb-8 flex items-end justify-between border-b border-black/10 pb-5"
  >

    <div>
      <h2 className="text-2xl font-bold lg:text-3xl">
        محصولات مشابه
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
  <div
    dir="rtl"
    className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5"
  >

    {relatedProducts.map((relatedProduct) => (
      <ProductCard
        key={relatedProduct.id}
        product={relatedProduct}
      />
    ))}

  </div>

</section>

      </main>

      <Footer />
    </>
  );
}
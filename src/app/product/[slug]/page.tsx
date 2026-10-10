import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";


import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";


import { products } from "@/data/products";


const categoryLabels: Record<Product["category"], string> = {
  men: "مردانه",
  women: "زنانه",
  accessories: "اکسسوری",
};

const subcategoryLabels: Record<string, string> = {
  handbags: "کیف دستی",
  keychains: "جاسوییچی",
  "shoulder-bags": "کیف دوشی",
  cardholders: "جاکارتی",
  wallets: "کیف پول",
};

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

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

 const relatedProducts = products
  .filter((item) => item.slug !== product.slug)
  .sort((a, b) => {
    const getRelevanceScore = (item: typeof product) => {
      let score = 0;

      // اولویت بالاتر برای محصولات هم‌زیر‌دسته
      if (
        product.subcategory &&
        item.subcategory === product.subcategory
      ) {
        score += 2;
      }

      // اولویت بیشتر برای محصولات هم‌دسته
      if (item.category === product.category) {
        score += 1;
      }

      return score;
    };

    return getRelevanceScore(b) - getRelevanceScore(a);
  })
  .slice(0, 4);

  const categoryPath = `/category/${product.category}`;

  const subcategoryPath = product.subcategory
    ? `${categoryPath}/${product.subcategory}`
    : categoryPath;

  const categoryLabel = categoryLabels[product.category];

  const subcategoryLabel = product.subcategory
    ? subcategoryLabels[product.subcategory] ?? product.subcategory
    : null;

  const hasDiscount =
    product.originalPrice !== undefined &&
    product.discountPercentage !== undefined;

  const finalPrice = hasDiscount
    ? Math.round(
        product.originalPrice! *
          (1 - product.discountPercentage! / 100)
      )
    : product.price;

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
                  href={categoryPath}
                  className="transition hover:text-[#4A2E19]"
                >
                  {categoryLabel}
                </Link>

                {product.subcategory && (
                  <>
                  <span>/</span>                
                    <Link
                      href={subcategoryPath}
                      className="transition hover:text-[#4A2E19]"
                    >
                      {subcategoryLabel}
                    </Link>
                  </>
                )}
                <span>/</span>

                <span className="text-black/80">{product.name}</span>
          </div>


          {/* Product Area */}
          <div
            dir="ltr"
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14"
          >

             {/* GALLERY */}
  <ProductGallery
    key={product.slug}
    productName={product.name}
    image={product.image}
    images={product.images}
  />



            {/* =================================================
                PRODUCT INFORMATION
            ================================================== */}
            <div dir="rtl" className="flex flex-col justify-center">

              <h1 className="text-3xl font-medium leading-[1.7] sm:text-4xl lg:text-[38px]">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-medium text-[#1A1A1C]">
                  {finalPrice.toLocaleString("fa-IR")} تومان
              </p>


              {/* Stock */}
              <div className="mt-6 flex items-center gap-2">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    product.stock === "in-stock"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                <span className="text-sm">
                  {product.stock === "in-stock"
                    ? "موجود در انبار"
                    : "ناموجود"}
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
                <AddToCartButton
                  productSlug={product.slug}
                  stock={product.stock}
                />


              {/* Custom */}
              <Link
                href={`/custom/simple?product=${encodeURIComponent(product.sku)}`}
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


         <ProductDetails product={product} />
         

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
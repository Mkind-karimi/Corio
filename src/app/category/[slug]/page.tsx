
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const categoryConfig = {
  men: {
    title: "محصولات مردانه",
    description:
      "محصولات چرمی مردانه Corio؛ طراحی کلاسیک، چرم طبیعی و ساخت دستدوز.",
  },
  women: {
    title: "محصولات زنانه",
    description:
      "مجموعه محصولات چرمی زنانه Corio؛ همراه شما در انتخاب طرحی متناسب با سلیقه‌تان.",
  },
  accessories: {
    title: "اکسسوری چرمی",
    description:
      "اکسسوری‌های چرمی Corio؛ جزئیات کوچک با هویت و کیفیت ماندگار.",
  },
} as const;

type CategorySlug = keyof typeof categoryConfig;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

function isCategorySlug(slug: string): slug is CategorySlug {
  return Object.prototype.hasOwnProperty.call(categoryConfig, slug);
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isCategorySlug(slug)) {
    return {
      title: "دسته‌بندی پیدا نشد | Corio",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const category = categoryConfig[slug];

  return {
    title: `${category.title} | Corio`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  if (!isCategorySlug(slug)) {
    notFound();
  }

  const category = categoryConfig[slug];

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <>
      <Header />

      <main
        dir="rtl"
        className="min-h-screen bg-[#E9D8C4] text-[#1A1A1C]"
      >
        <section className="mx-auto max-w-[1440px] px-6 py-8 sm:py-10 lg:px-10 lg:py-14">
          {/* Breadcrumb */}
          <nav
            aria-label="مسیر صفحه"
            className="mb-7 flex items-center gap-2 text-xs text-black/55"
          >
            <Link
              href="/"
              className="transition hover:text-[#4A2E19]"
            >
              خانه
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-black/80">
              {category.title}
            </span>
          </nav>

          {/* Category Header */}
          <header className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-[#4A2E19]">
                CORIO / COLLECTION
              </p>

              <h1 className="text-2xl font-bold leading-relaxed sm:text-3xl lg:text-4xl">
                {category.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-[15px]">
                {category.description}
              </p>
            </div>

            <p
              className="shrink-0 text-sm text-black/55"
              aria-live="polite"
            >
              {categoryProducts.length.toLocaleString("fa-IR")} محصول
            </p>
          </header>

          {/* Product Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center border border-black/10 px-6 py-12 text-center">
              <h2 className="text-lg font-bold">
                هنوز محصولی در این دسته‌بندی وجود ندارد
              </h2>

              <p className="mt-3 text-sm leading-7 text-black/60">
                محصولات این بخش پس از اضافه‌شدن در این صفحه نمایش داده می‌شوند.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center border border-[#4A2E19] px-6 py-3 text-sm text-[#4A2E19] transition hover:bg-[#4A2E19] hover:text-white"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

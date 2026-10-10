
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "فروشگاه محصولات چرمی | Corio",
  description:
    "مشاهده محصولات چرمی دستدوز Corio؛ شامل کیف، کیف پول، جاکارتی و اکسسوری‌های چرمی.",
};

type ShopSearchParams = {
  category?: string | string[];
  subcategory?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
  stock?: string | string[];
  sort?: string | string[];
  discounted?: string | string[];
};

type ShopPageProps = {
  searchParams: Promise<ShopSearchParams>;
};

const categoryOptions = [
  { value: "men", label: "مردانه" },
  { value: "women", label: "زنانه" },
  { value: "accessories", label: "اکسسوری" },
] as const;

const subcategoryLabels: Record<string, string> = {
  handbags: "کیف دستی",
  keychains: "جاسوییچی",
  "shoulder-bags": "کیف دوشی",
  cardholders: "جاکارتی",
  wallets: "کیف پول",
  bookmarks: "بوکمارک",
};

const sortOptions = [
  { value: "default", label: "ترتیب پیش‌فرض" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "discount-desc", label: "بیشترین تخفیف" },
  { value: "name-asc", label: "نام محصول (الف تا ی)" },
] as const;

const controlClass =
  "mt-2 h-11 w-full min-w-0 border border-black/15 bg-transparent px-3 text-sm text-[#1A1A1C] outline-none transition focus:border-[#4A2E19]";

const labelClass = "block text-xs font-medium text-black/70";

function getQueryValue(
  value: string | string[] | undefined
): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function parsePrice(value: string): number | undefined {
  const normalized = value.trim();

  if (!/^\d+$/.test(normalized)) {
    return undefined;
  }

  const amount = Number(normalized);

  return Number.isSafeInteger(amount) && amount >= 0
    ? amount
    : undefined;
}

// دقیقاً هماهنگ با روش محاسبه قیمت در ProductCard
function getFinalPrice(product: (typeof products)[number]): number {
  if (
    product.originalPrice !== undefined &&
    product.discountPercentage !== undefined
  ) {
    return Math.round(
      product.originalPrice *
        (1 - product.discountPercentage / 100)
    );
  }

  return product.price;
}

function getDiscountPercentage(
  product: (typeof products)[number]
): number {
  if (
    product.originalPrice !== undefined &&
    product.discountPercentage !== undefined
  ) {
    return product.discountPercentage;
  }

  return 0;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const query = await searchParams;

  // خواندن فیلترهای URL
  const categoryParam = getQueryValue(query.category);
  const subcategoryParam = getQueryValue(query.subcategory);
  const minPriceText = getQueryValue(query.minPrice);
  const maxPriceText = getQueryValue(query.maxPrice);
  const stockParam = getQueryValue(query.stock);
  const sortParam = getQueryValue(query.sort);

  // اعتبارسنجی دسته‌بندی
  const selectedCategory = categoryOptions.some(
    (category) => category.value === categoryParam
  )
    ? categoryParam
    : "";

  // زیر‌دسته‌های مرتبط با دسته انتخاب‌شده
  const productsForSubcategories = selectedCategory
    ? products.filter(
        (product) => product.category === selectedCategory
      )
    : products;

  const availableSubcategories = Array.from(
    new Set(
      productsForSubcategories
        .map((product) => product.subcategory)
        .filter(
          (subcategory): subcategory is string =>
            Boolean(subcategory)
        )
    )
  ).map((value) => ({
    value,
    label: subcategoryLabels[value] ?? value,
  }));

  const selectedSubcategory = availableSubcategories.some(
    (subcategory) => subcategory.value === subcategoryParam
  )
    ? subcategoryParam
    : "";

  // اعتبارسنجی قیمت
  const minPrice = parsePrice(minPriceText);
  const maxPrice = parsePrice(maxPriceText);

  const invalidPriceRange =
    minPrice !== undefined &&
    maxPrice !== undefined &&
    minPrice > maxPrice;

  // وضعیت موجودی
  const selectedStock =
    stockParam === "in-stock" || stockParam === "out-of-stock"
      ? stockParam
      : "";

  // اعتبارسنجی مرتب‌سازی
  const selectedSort = sortOptions.some(
    (option) => option.value === sortParam
  )
    ? sortParam
    : "default";

  const discountedOnly = getQueryValue(query.discounted) === "1";

  // فیلتر محصولات
  const filteredProducts = (
    invalidPriceRange
      ? []
      : products.filter((product) => {
          if (
            selectedCategory &&
            product.category !== selectedCategory
          ) {
            return false;
          }

          if (
            selectedSubcategory &&
            product.subcategory !== selectedSubcategory
          ) {
            return false;
          }

          const finalPrice = getFinalPrice(product);

          if (minPrice !== undefined && finalPrice < minPrice) {
            return false;
          }

          if (maxPrice !== undefined && finalPrice > maxPrice) {
            return false;
          }

          if (selectedStock && product.stock !== selectedStock) {
            return false;
          }

          const hasDiscount =
            product.originalPrice !== undefined &&
            product.discountPercentage !== undefined;

          if (discountedOnly && !hasDiscount) {
            return false;
          }

          return true;
        })
  ).sort((a, b) => {
    switch (selectedSort) {
      case "price-asc":
        return getFinalPrice(a) - getFinalPrice(b);

      case "price-desc":
        return getFinalPrice(b) - getFinalPrice(a);

      case "discount-desc":
        return getDiscountPercentage(b) - getDiscountPercentage(a);

      case "name-asc":
        return a.name.localeCompare(b.name, "fa");

      default:
        return 0;
    }
  });

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

            <span className="text-black/80">فروشگاه</span>
          </nav>

          {/* Page Header */}
          <header className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-[#4A2E19]">
                CORIO / SHOP
              </p>

              <h1 className="text-2xl font-bold leading-relaxed sm:text-3xl lg:text-4xl">
                فروشگاه محصولات چرمی
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-[15px]">
                محصولات چرمی Corio را بر اساس دسته‌بندی،
                قیمت و سلیقه خود بررسی کنید.
              </p>
            </div>

            <p className="shrink-0 text-sm text-black/55">
              {filteredProducts.length.toLocaleString("fa-IR")} محصول
              از {products.length.toLocaleString("fa-IR")}
            </p>
          </header>

          {/* Filters */}
          <section
            aria-labelledby="shop-filters-title"
            className="mb-8 border border-black/10 p-4 sm:p-5 lg:p-6"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="shop-filters-title"
                className="text-base font-bold"
              >
                فیلتر و مرتب‌سازی
              </h2>

              <Link
                href="/shop"
                className="text-xs text-[#4A2E19] transition hover:opacity-70"
              >
                پاک کردن فیلترها
              </Link>
            </div>

            <form action="/shop" method="get">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className={labelClass}>
                    دسته‌بندی
                  </label>

                  <select
                    id="category"
                    name="category"
                    defaultValue={selectedCategory}
                    className={controlClass}
                  >
                    <option value="">همه دسته‌ها</option>

                    {categoryOptions.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                <div>
                  <label htmlFor="subcategory" className={labelClass}>
                    زیر‌دسته
                  </label>

                  <select
                    id="subcategory"
                    name="subcategory"
                    defaultValue={selectedSubcategory}
                    className={controlClass}
                  >
                    <option value="">همه زیر‌دسته‌ها</option>

                    {availableSubcategories.map((subcategory) => (
                      <option
                        key={subcategory.value}
                        value={subcategory.value}
                      >
                        {subcategory.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum price */}
                <div>
                  <label htmlFor="minPrice" className={labelClass}>
                    حداقل قیمت (تومان)
                  </label>

                  <input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    defaultValue={minPriceText}
                    placeholder="مثلاً 500000"
                    className={controlClass}
                  />
                </div>

                {/* Maximum price */}
                <div>
                  <label htmlFor="maxPrice" className={labelClass}>
                    حداکثر قیمت (تومان)
                  </label>

                  <input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    defaultValue={maxPriceText}
                    placeholder="مثلاً 5000000"
                    className={controlClass}
                  />
                </div>

                {/* Stock */}
                <div>
                  <label htmlFor="stock" className={labelClass}>
                    وضعیت موجودی
                  </label>

                  <select
                    id="stock"
                    name="stock"
                    defaultValue={selectedStock}
                    className={controlClass}
                  >
                    <option value="">همه وضعیت‌ها</option>
                    <option value="in-stock">موجود در انبار</option>
                    <option value="out-of-stock">ناموجود</option>
                  </select>
                </div>

                {/* Sorting */}
                <div>
                  <label htmlFor="sort" className={labelClass}>
                    مرتب‌سازی
                  </label>

                  <select
                    id="sort"
                    name="sort"
                    defaultValue={selectedSort}
                    className={controlClass}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Discount checkbox */}
              <div className="mt-5 border-t border-black/10 pt-5">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="discounted"
                    value="1"
                    defaultChecked={discountedOnly}
                    className="h-4 w-4 accent-[#4A2E19]"
                  />

                  فقط محصولات تخفیف‌دار
                </label>

                <p className="mt-2 text-xs leading-6 text-black/50">
                  قیمت‌ها برحسب تومان هستند. برای اعمال انتخاب‌ها
                  روی دکمه زیر کلیک کنید.
                </p>

                <button
                  type="submit"
                  className="mt-4 inline-flex min-h-11 items-center justify-center bg-[#4A2E19] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#382214]"
                >
                  اعمال فیلترها
                </button>
              </div>
            </form>
          </section>

          {/* Results */}
          <section aria-label="نتایج محصولات">
            {invalidPriceRange ? (
              <div
                role="alert"
                className="border border-black/10 p-6 text-sm leading-7"
              >
                حداقل قیمت نمی‌تواند بیشتر از حداکثر قیمت باشد.
                لطفاً محدوده قیمت را اصلاح کنید.
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center border border-black/10 px-6 py-12 text-center">
                <h2 className="text-lg font-bold">
                  محصولی با این شرایط پیدا نشد
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-black/60">
                  فیلترهای انتخاب‌شده را تغییر دهید یا همه
                  فیلترها را پاک کنید تا محصولات بیشتری ببینید.
                </p>

                <Link
                  href="/shop"
                  className="mt-6 inline-flex min-h-11 items-center justify-center border border-[#4A2E19] px-6 py-3 text-sm text-[#4A2E19] transition hover:bg-[#4A2E19] hover:text-white"
                >
                  نمایش همه محصولات
                </Link>
              </div>
            )}
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}

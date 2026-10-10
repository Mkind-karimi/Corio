
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "جستجوی محصولات | Corio",
  description:
    "جستجو در محصولات چرمی دستدوز Corio بر اساس نام، دسته‌بندی یا کد محصول.",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

const categoryLabels: Record<string, string> = {
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
  bookmarks: "بوکمارک",
};

const quickLinks = [
  { label: "همه محصولات", href: "/shop" },
  { label: "مردانه", href: "/category/men" },
  { label: "زنانه", href: "/category/women" },
  { label: "اکسسوری", href: "/category/accessories" },
];

function getQueryValue(
  value: string | string[] | undefined
): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

// یکسان‌سازی حروف فارسی و فاصله‌ها برای جستجوی دقیق‌تر
function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[\u200c\u200e\u200f]/g, " ")
    .replace(/[-_./]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function matchesProduct(
  product: (typeof products)[number],
  queryTerms: string[]
): boolean {
  const categoryLabel =
    categoryLabels[product.category] ?? product.category;

  const subcategoryLabel = product.subcategory
    ? subcategoryLabels[product.subcategory] ??
      product.subcategory
    : "";

  const searchableText = normalizeSearchText(
    [
      product.name,
      product.slug,
      product.sku,
      product.category,
      categoryLabel,
      product.subcategory ?? "",
      subcategoryLabel,
    ].join(" ")
  );

  // تمام واژه‌های جستجو باید در اطلاعات محصول پیدا شوند
  return queryTerms.every((term) =>
    searchableText.includes(term)
  );
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  // محدودکردن طول ورودی جستجو
  const query = getQueryValue(params.q).trim().slice(0, 100);

  const normalizedQuery = normalizeSearchText(query);

  const queryTerms = normalizedQuery
    ? normalizedQuery.split(" ").filter(Boolean)
    : [];

  const results =
    queryTerms.length > 0
      ? products.filter((product) =>
          matchesProduct(product, queryTerms)
        )
      : [];

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

            <span className="text-black/80">جستجو</span>
          </nav>

          {/* Page Header */}
          <header className="mb-8 border-b border-black/10 pb-6">
            <p className="mb-3 text-xs uppercase tracking-[0.15em] text-[#4A2E19]">
              CORIO / SEARCH
            </p>

            <h1 className="text-2xl font-bold leading-relaxed sm:text-3xl lg:text-4xl">
              جستجوی محصولات
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-[15px]">
              نام محصول، دسته‌بندی یا کد محصول موردنظرت را وارد کن.
            </p>
          </header>

          {/* Search Form */}
          <form
            action="/search"
            method="get"
            role="search"
            className="mb-8"
          >
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-medium"
            >
              چه محصولی دنبالش هستی؟
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="product-search"
                type="search"
                name="q"
                defaultValue={query}
                maxLength={100}
                autoComplete="off"
                placeholder="مثلاً جاکارتی، کیف پول یا CR-004"
                className="h-12 min-w-0 flex-1 border border-black/15 bg-transparent px-4 text-sm outline-none transition placeholder:text-black/40 focus:border-[#4A2E19]"
              />

              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 bg-[#4A2E19] px-7 text-sm font-medium text-white transition hover:bg-[#382214]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>

                جستجو
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <nav
            aria-label="دسته‌بندی‌های پیشنهادی"
            className="mb-10 flex flex-wrap items-center gap-2"
          >
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-black/15 px-4 py-2.5 text-xs text-[#1A1A1C] transition hover:border-[#4A2E19] hover:text-[#4A2E19]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Results */}
          <section aria-label="نتایج جستجو">
            {!normalizedQuery ? (
              <div className="border border-black/10 px-5 py-10 text-center sm:py-14">
                <h2 className="text-lg font-bold">
                  محصول موردنظرت را پیدا کن
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-black/60">
                  برای شروع، نام محصول یا کد آن را در کادر بالا
                  بنویس. همچنین می‌توانی مستقیماً وارد یکی از
                  دسته‌بندی‌ها شوی.
                </p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <h2 className="text-lg font-bold">
                    نتایج جستجو
                  </h2>

                  <p
                    aria-live="polite"
                    className="text-sm text-black/55"
                  >
                    {results.length.toLocaleString("fa-IR")} محصول
                    پیدا شد
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                  {results.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="border border-black/10 px-5 py-10 text-center sm:py-14">
                <h2 className="text-lg font-bold">
                  محصولی پیدا نشد
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-black/60">
                  عبارت جستجو را کوتاه‌تر کن یا نام محصول،
                  دسته‌بندی یا کد آن را بررسی کن.
                </p>

                <Link
                  href="/search"
                  className="mt-6 inline-flex min-h-11 items-center justify-center border border-[#4A2E19] px-6 py-3 text-sm text-[#4A2E19] transition hover:bg-[#4A2E19] hover:text-white"
                >
                  پاک‌کردن جستجو
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

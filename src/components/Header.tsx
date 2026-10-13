
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";

const navigation = [
  {
    label: "کالکشن",
    href: "/#bestsellers",
    items: [{ label: "گیمینگ", href: "/shop?collection=gaming" }],
  },
  {
    label: "مردانه",
    href: "/category/men",
    items: [
      { label: "کیف پول مردانه", href: "/category/men?subcategory=wallet" },
      { label: "کیف دستی مردانه", href: "/category/men?subcategory=handbag" },
      { label: "کیف دوشی مردانه", href: "/category/men?subcategory=shoulder-bag" },
    ],
  },
  {
    label: "زنانه",
    href: "/category/women",
    items: [
      { label: "کیف پول زنانه", href: "/category/women?subcategory=wallet" },
      { label: "کیف دستی زنانه", href: "/category/women?subcategory=handbag" },
      { label: "کیف دوشی زنانه", href: "/category/women?subcategory=shoulder-bag" },
    ],
  },
  {
    label: "اکسسوری",
    href: "/category/accessories",
    items: [
      { label: "بوک‌مارک", href: "/category/accessories?subcategory=bookmark" },
      { label: "جاکلیدی", href: "/category/accessories?subcategory=keychain" },
    ],
  },
];

export default function Header() {
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-[#D8C8B5] bg-[#E9D8C4]/95 backdrop-blur-md"
    >
      <div className="relative mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-7"
          aria-label="منوی اصلی"
        >
          {navigation.map((item) => (
            <div key={item.label} className="group relative h-full">
              <Link
                href={item.href}
                className="flex h-[68px] items-center gap-1.5 border-b-2 border-transparent px-1 text-sm font-medium text-[#1D1B1C] transition-colors hover:border-[#4A2E19] hover:text-[#4A2E19] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#4A2E19] sm:h-[72px]"
                aria-haspopup="true"
              >
                {item.label}
                <svg
                  viewBox="0 0 20 20"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                >
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </Link>

              <div className="invisible absolute right-0 top-full z-[70] w-60 translate-y-2 rounded-b-md border border-[#D8C8B5] bg-[#FFF9F1] p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded px-3 text-sm font-semibold text-[#4A2E19] transition-colors hover:bg-[#E9D8C4]/60 focus-visible:outline-2 focus-visible:outline-[#4A2E19]"
                >
                  مشاهده همه محصولات  {item.label}
                </Link>

                <div className="my-1 border-t border-[#D8C8B5]" />

                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="flex min-h-11 items-center rounded px-3 text-sm text-[#59483A] transition-colors hover:bg-[#E9D8C4]/60 hover:text-[#4A2E19] focus-visible:outline-2 focus-visible:outline-[#4A2E19]"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile navigation */}
        <MobileMenu />

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E19]"
          aria-label="Corio - صفحه اصلی"
        >
          <Image
            src="/Images/corio123456.png"
            alt="Corio"
            width={160}
            height={60}
            priority
            sizes="(max-width: 639px) 104px, 120px"
            className="h-auto w-[104px] object-contain sm:w-[112px] lg:w-[120px]"
          />
        </Link>

        {/* Search / Account / Cart */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            aria-label="جستجو"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#4A2E19] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E19]"
          >
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </Link>

          <Link
            href="/account"
            aria-label="حساب کاربری"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-[#4A2E19] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E19] sm:flex"
          >
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 20c.7-3.7 2.8-5.5 6.5-5.5s5.8 1.8 6.5 5.5" />
            </svg>
          </Link>

          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#4A2E19] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E19]"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.5 9V7a4.5 4.5 0 0 1 9 0v2" />
              <path d="M4.5 9h15l-1.1 9.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4.5 9Z" />
              <path d="M8.5 13h7" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#4A2E19] text-[9px] text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

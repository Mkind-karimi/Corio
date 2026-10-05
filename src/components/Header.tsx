import Link from "next/link";

export default function Header() {
  return (
    <header dir="rtl" className="sticky top-0 z-50 border-b border-black/5 bg-[#E9D8C4]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 lg:px-10">

        {/* منوی سمت راست */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="منوی اصلی"
        >
          <Link
            href="#collections"
            className="text-sm font-medium text-[#1A1A1C] transition duration-300 hover:text-[#4A2E19]"
          >
            کالکشن
          </Link>

          <Link
            href="#men"
            className="text-sm font-medium text-[#1A1A1C] transition duration-300 hover:text-[#4A2E19]"
          >
            مردانه
          </Link>

          <Link
            href="#women"
            className="text-sm font-medium text-[#1A1A1C] transition duration-300 hover:text-[#4A2E19]"
          >
            زنانه
          </Link>

          <Link
            href="#accessories"
            className="text-sm font-medium text-[#1A1A1C] transition duration-300 hover:text-[#4A2E19]"
          >
            اکسسوری
          </Link>
        </nav>

        {/* منوی موبایل */}
        <button
          type="button"
          aria-label="باز کردن منو"
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>

        {/* لوگوی موقت */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Corio"
        >
          <span className="font-serif text-2xl font-bold tracking-[0.18em] bg-[#E9D8C4]">
            CORIO
          </span>
        </Link>

        {/* جستجو / حساب / سبد */}
        <div className="flex items-center gap-2">

          {/* Search */}
          <Link
            href="/search"
            aria-label="جستجو"
            className="flex h-10 w-10 items-center justify-center rounded-full transition duration-300 hover:bg-black/5 text-[#4A2E19]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </Link>

          {/* Account */}
          <Link
            href="/account"
            aria-label="حساب کاربری"
            className="flex h-10 w-10 items-center justify-center rounded-full transition duration-300 hover:bg-black/5 text-[#4A2E19]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 20c.7-3.7 2.8-5.5 6.5-5.5s5.8 1.8 6.5 5.5" />
            </svg>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition duration-300 hover:bg-black/5 text-[#4A2E19]"
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

            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#4A2E19] text-[9px] text-white">
              0
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}
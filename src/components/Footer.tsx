import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-[#E9D8C4] text-[#1A1A1C]">

      {/* =========================
          FOOTER MAIN
      ========================== */}
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">

        {/* =========================
            ABOUT
        ========================== */}
        <div>
          <h3 className="text-lg font-bold">
            درباره Corio
          </h3>

          <p className="mt-5 text-sm leading-8 text-black/60">
            Corio برند محصولات چرمی دستدوز است؛
            با تمرکز بر چرم طبیعی، کیفیت ساخت و
            طراحی ماندگار.
          </p>

          <div className="mt-6">
            <Image
              src="/Images/corio123456.png"
              alt="Corio"
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>


        {/* =========================
            SUPPORT
        ========================== */}
        <div>
          <h3 className="text-lg font-bold">
            پشتیبانی و سفارش
          </h3>

          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/tracking"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                پیگیری سفارش
              </Link>
            </li>

            <li>
              <Link
                href="/rules"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                قوانین و مقررات
              </Link>
            </li>

            <li>
              <Link
                href="/faq"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                سوالات متداول
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>


        {/* =========================
            PRODUCT CATEGORIES
        ========================== */}
        <div>
          <h3 className="text-lg font-bold">
            دسته‌بندی محصولات
          </h3>

          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/category/men"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                مردانه
              </Link>
            </li>

            <li>
              <Link
                href="/category/women"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                زنانه
              </Link>
            </li>

            <li>
              <Link
                href="/category/accessories"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                اکسسوری
              </Link>
            </li>

            <li>
              <Link
                href="/collections"
                className="text-sm text-black/60 transition hover:text-[#4A2E19]"
              >
                کالکشن
              </Link>
            </li>
          </ul>
        </div>


        {/* =========================
            NEWSLETTER
        ========================== */}
        <div>
          <h3 className="text-lg font-bold">
            عضویت در خبرنامه
          </h3>

          <p className="mt-5 text-sm leading-7 text-black/60">
            برای دریافت اخبار، محصولات جدید و
            پیشنهادهای ویژه عضو شوید.
          </p>

          {/* Newsletter Form */}
          <form
            action="#"
            method="POST"
            className="mt-6"
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              ایمیل
            </label>

            <div className="flex border border-black/10 bg-white/20">
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="ایمیل شما"
                required
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-black/35"
              />

              <button
                type="submit"
                className="bg-[#4A2E19] px-5 text-xs font-medium text-white transition hover:bg-[#382214]"
              >
                عضویت
              </button>
            </div>
          </form>


          {/* Socials */}
          <div className="mt-7 flex items-center gap-3">

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center border border-black/10 transition hover:bg-[#4A2E19] hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.7"
                  fill="currentColor"
                />
              </svg>
            </a>


            {/* Telegram */}
            <a
              href="#"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center border border-black/10 transition hover:bg-[#4A2E19] hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 3L10 14" />
                <path d="M21 3l-7 18-4-7 18-7z" />
              </svg>
            </a>


            {/* X */}
            <a
              href="#"
              aria-label="X"
              className="flex h-9 w-9 items-center justify-center border border-black/10 text-sm font-semibold transition hover:bg-[#4A2E19] hover:text-white"
            >
              X
            </a>

          </div>
        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================== */}
      <div className="border-t border-black/10">

        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row lg:px-10">

          {/* Copyright */}
          <p className="text-xs text-black/45">
            © 2026 Corio. تمامی حقوق محفوظ است.
          </p>

          {/* Tagline */}
          <div className="flex items-center gap-4">

            <span className="hidden h-px w-12 bg-[#4A2E19]/40 sm:block" />

            <p
              className="font-serif text-sm text-[#4A2E19]"
              dir="ltr"
            >
              Leather. Together. To Perfection.
            </p>

          </div>

        </div>
      </div>

    </footer>
  );
}
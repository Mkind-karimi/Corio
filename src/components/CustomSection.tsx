import Image from "next/image";
import Link from "next/link";

export default function CustomSection() {
  return (
    <section
      id="custom"
      dir="rtl"
      className="mx-auto  px-6 pb-20 lg:px-10 text-[#1A1A1C] bg-[#E9D8C4] "
    >
      <div className="grid overflow-hidden bg-[#E4D0B8] lg:grid-cols-2 ">

        {/* =========================
            CUSTOM IMAGE
        ========================== */}
        <div className="relative min-h-[400px]">

          <Image
            src="/images/custom.jpg"
            alt="فرآیند دستدوزی و شخصی‌سازی محصولات Corio"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-8 right-8 max-w-md text-white">

            <p className="mb-3 text-xs tracking-[0.12em]">
              CUSTOM CORIO
            </p>

            <h2 className="text-2xl font-bold leading-10 lg:text-3xl">
              محصولات آماده را
              <br />
              به سلیقه خودتان کاستوم کنید
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/80">
              رنگ، نخ و یراق را از میان گزینه‌های موجود انتخاب کنید
              و محصولی نزدیک‌تر به سلیقه خودتان بسازید.
            </p>

          </div>
        </div>


        {/* =========================
            CUSTOM OPTIONS
        ========================== */}
        <div className="grid grid-cols-1 divide-y divide-black/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">

          {/* =========================
              SIMPLE CUSTOM
          ========================== */}
          <div className="flex flex-col justify-center p-8 lg:p-12">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#4A2E19]/30 text-[#4A2E19]">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.1v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H7.4v-2.1h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.5-1.5.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5.5h2.1v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2.1h-.2a1.7 1.7 0 0 0-1.6 1z"
                />
              </svg>

            </div>

            <h3 className="text-xl font-bold">
              کاستوم ساده
            </h3>

            <p className="mt-4 text-sm leading-8 text-black/60">
              انتخاب رنگ چرم، رنگ نخ و یراق از میان
              گزینه‌های موجود.
            </p>

            <Link
              href="/custom/simple"
              className="mt-7 inline-flex w-fit items-center gap-3 border border-[#4A2E19] px-6 py-3 text-sm font-medium text-[#4A2E19] transition duration-300 hover:bg-[#4A2E19] hover:text-white"
            >
              مشاهده گزینه‌ها
              ←
            </Link>

          </div>


          {/* =========================
              SPECIAL CUSTOM
          ========================== */}
          <div className="flex flex-col justify-center p-8 lg:p-12">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#4A2E19]/30 text-[#4A2E19]">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5A8.38 8.38 0 0 1 3 11.5 8.38 8.38 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>

            </div>

            <h3 className="text-xl font-bold">
              کاستوم خاص
            </h3>

            <p className="mt-4 text-sm leading-8 text-black/60">
              طراحی اختصاصی و مشاوره با پشتیبانی
              Corio در تلگرام.
            </p>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit items-center gap-3 border border-[#4A2E19] px-6 py-3 text-sm font-medium text-[#4A2E19] transition duration-300 hover:bg-[#4A2E19] hover:text-white"
            >
              تماس با پشتیبانی
              ←
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
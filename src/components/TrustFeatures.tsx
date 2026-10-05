export default function TrustFeatures() {
  return (
    <section dir="rtl" className="border-y border-black/10 bg-[#E9D8C4] text-[#1A1A1C]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

        {/* Trust 01 - Warranty */}
        <div className="flex flex-col items-center justify-center border-l border-black/10 px-6 py-10 text-center last:border-l-0">
          <div className="mb-4 text-[#4A2E19]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 3l7 3v5c0 4.9-3 8.7-7 10-4-1.3-7-5.1-7-10V6l7-3z" />
            </svg>
          </div>

          <h3 className="text-sm font-bold">
            گارانتی ۱۸ ماهه
          </h3>

          <p className="mt-2 text-xs leading-6 text-black/50">
            بر اساس قوانین سایت
          </p>
        </div>

        {/* Trust 02 - Natural Leather */}
        <div className="flex flex-col items-center justify-center border-l border-black/10 px-6 py-10 text-center">
          <div className="mb-4 text-[#4A2E19]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M3 7h18" />
              <path d="M6 12h12" />
              <path d="M9 17h6" />
            </svg>
          </div>

          <h3 className="text-sm font-bold">
            چرم طبیعی ۱۰۰٪
          </h3>

          <p className="mt-2 text-xs leading-6 text-black/50">
            انتخاب متریال طبیعی
          </p>
        </div>

        {/* Trust 03 - Handmade */}
        <div className="flex flex-col items-center justify-center border-l border-black/10 px-6 py-10 text-center">
          <div className="mb-4 text-[#4A2E19]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 3v18" />
              <path d="M5 9l7-6 7 6" />
              <path d="M5 15l7 6 7-6" />
            </svg>
          </div>

          <h3 className="text-sm font-bold">
            کاملاً دستدوز
          </h3>

          <p className="mt-2 text-xs leading-6 text-black/50">
            با دقت و ظرافت
          </p>
        </div>

        {/* Trust 04 - Customization */}
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 text-[#4A2E19]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 2l3 7 7 .5-5.3 4.7L18.3 21 12 17l-6.3 4 1.6-6.8L2 9.5 9 9l3-7z" />
            </svg>
          </div>

          <h3 className="text-sm font-bold">
            امکان شخصی‌سازی
          </h3>

          <p className="mt-2 text-xs leading-6 text-black/50">
            ساده یا اختصاصی
          </p>
        </div>

      </div>
    </section>
  );
}
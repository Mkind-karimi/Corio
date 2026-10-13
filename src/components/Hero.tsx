
import Image from "next/image";

export default function Hero() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-[#E9D8C4]">
      <div className="relative grid min-h-[calc(100dvh-82px)] grid-cols-1 lg:grid-cols-2">

        {/* محل تصویر Hero */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/Images/heroimage.jpg"
            alt="محصول چرمی دستدوز Corio"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* متن Hero */}
        <div className="relative z-10 flex items-center justify-end px-7 py-16 lg:px-20 xl:px-28">
          <div className="max-w-xl">

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[#4A2E19]">
              CORIO
            </p>

            <h1 className="text-4xl font-bold leading-[1.6] text-[#1A1A1C] sm:text-5xl lg:text-[52px]">
              هنر دست،
              <br />
              در خدمت چرم طبیعی
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-8 text-black/65 sm:text-base">
              محصولات چرمی دستدوز Corio از چرم طبیعی باکیفیت
              ساخته می‌شوند؛ با الهام از اصالت ایتالیایی.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/shop"
                className="inline-flex items-center justify-center gap-3 bg-[#4A2E19] px-8 py-4 text-sm font-medium text-white transition duration-300 hover:bg-[#382214]"
              >
                مشاهده محصولات
                <span>←</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

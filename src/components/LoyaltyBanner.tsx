import Image from "next/image";
import Link from "next/link";

export default function LoyaltyBanner() {
  return (
    <section
      id="collections"
      dir="rtl"
      className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-10 "
    >
      <div className="overflow-hidden bg-[#4A2E19] text-white">

        <div className="grid items-stretch lg:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-[250px]">

            <Image
              src="/Images/comm.jpg"
              alt="جزئیات چرم Corio"
              fill
              className="object-cover"
            />

          </div>

          {/* Text */}
          <div className="flex items-center px-8 py-12 lg:px-14">

            <div>

              <p className="mb-3 text-xs tracking-[0.15em] text-white/60">
                CORIO COMMUNITY
              </p>

              <h2 className="text-2xl font-bold leading-10 lg:text-3xl">
                همراه شما در مسیر تکامل
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-white/75">
                برای مشتریان وفادار Corio پیشنهادهای ویژه،
                تخفیف‌ها و دسترسی زودتر به بعضی محصولات جدید
                در نظر گرفته می‌شود.
              </p>

              <Link
                href="/account"
                className="mt-7 inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-white/70"
              >
                بیشتر بدانید
                ←
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
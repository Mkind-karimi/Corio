import Image from "next/image";
import Link from "next/link";

export default function CategorySection() {
  return (
    <section
      id="categories"
      dir="rtl"
      className="bg-[#E9D8C4] mx-auto px-6 py-16 lg:px-10 lg:py-20"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

        {/* کالکشن */}
        <Link
          href="/#bestsellers"
          id="collection"
          className="group relative aspect-[1.15/1] overflow-hidden"
        >
          <Image
            src="/Images/123456.webp"
            alt="منتخبی از محصولات چرمی Corio"
            fill
            sizes="(max-width: 767px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

          <div className="absolute bottom-6 right-6 text-white">
            <h2 className="text-2xl font-bold">
              کالکشن
            </h2>

            <span className="mt-2 inline-flex items-center gap-2 text-sm">
              مشاهده ←
            </span>
          </div>
        </Link>

        {/* مردانه */}
        <Link
          href="/category/men"
          id="men"
          className="group relative aspect-[1.15/1] overflow-hidden"
        >
          <Image
            src="/Images/5.sm.webp"
            alt="محصولات چرمی مردانه"
            fill
            sizes="(max-width: 767px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

          <div className="absolute bottom-6 right-6 text-white">
            <h2 className="text-2xl font-bold">
              مردانه
            </h2>

            <span className="mt-2 inline-flex items-center gap-2 text-sm">
              مشاهده ←
            </span>
          </div>
        </Link>

        {/* زنانه */}
        <Link
          href="/category/women"
          id="women"
          className="group relative aspect-[1.15/1] overflow-hidden"
        >
          <Image
            src="/Images/2.sm.webp"
            alt="محصولات چرمی زنانه"
            fill
            sizes="(max-width: 767px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

          <div className="absolute bottom-6 right-6 text-white">
            <h2 className="text-2xl font-bold">
              زنانه
            </h2>

            <span className="mt-2 inline-flex items-center gap-2 text-sm">
              مشاهده ←
            </span>
          </div>
        </Link>

        {/* اکسسوری */}
        <Link
          href="/category/accessories"
          id="accessories"
          className="group relative aspect-[1.15/1] overflow-hidden"
        >
          <Image
            src="/Images/4.sm.webp"
            alt="اکسسوری‌های چرمی Corio"
            fill
            sizes="(max-width: 767px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

          <div className="absolute bottom-6 right-6 text-white">
            <h2 className="text-2xl font-bold">
              اکسسوری
            </h2>

            <span className="mt-2 inline-flex items-center gap-2 text-sm">
              مشاهده ←
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  Product,
  ProductCareInstruction,
} from "@/types/product";

const tabs = [
  {
    id: "specs",
    label: "مشخصات",
  },
  {
    id: "dimensions",
    label: "ابعاد و ظرفیت",
  },
  {
    id: "care",
    label: "مراقبت و نگهداری",
  },
  {
    id: "shipping",
    label: "ارسال و گارانتی",
  },
];

const defaultCareInstructions: ProductCareInstruction[] = [
  {
    title: "نگهداری",
    description:
      "محصول چرمی را در محیط خشک و دور از رطوبت زیاد، حرارت مستقیم و نور شدید خورشید نگهداری کنید.",
  },
  {
    title: "تمیز کردن",
    description:
      "برای تمیز کردن سطح چرم از پارچه نرم استفاده کنید و از مواد شوینده قوی استفاده نکنید.",
  },
  {
    title: "نکته مهم",
    description:
      "تماس طولانی‌مدت با آب و رطوبت می‌تواند روی ظاهر و کیفیت چرم طبیعی تأثیر بگذارد.",
  },
];

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState("specs");

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const details = product.details;

  const dimensions = details.dimensions ?? [];

  const careInstructions =
    details.careInstructions ?? defaultCareInstructions;

  const productionTime =
    details.productionTime ??
    "زمان آماده‌سازی این محصول پس از بررسی و تأیید سفارش اعلام می‌شود.";

  const shipping =
    details.shipping ??
    "پس از آماده شدن سفارش، محصول بسته‌بندی شده و برای ارسال تحویل شرکت حمل‌ونقل می‌شود.";

  const warranty =
    details.warranty ??
    "گارانتی ۱۸ ماهه، مطابق شرایط و ضوابط منتشرشده در سایت.";

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowLeft") {
      nextIndex = index === tabs.length - 1 ? 0 : index + 1;
    }

    if (event.key === "ArrowRight") {
      nextIndex = index === 0 ? tabs.length - 1 : index - 1;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();

      setActiveTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] border-t border-black/10 px-6 py-10 sm:py-12 lg:px-10 lg:py-16">
      <div dir="rtl">
        {/* TABS */}

        <div
          role="tablist"
          aria-label="اطلاعات محصول"
          className="grid grid-cols-2 border-b border-black/10 sm:grid-cols-4"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`
                  relative flex min-h-[58px]
                  items-center justify-center
                  px-3 py-3 text-center
                  text-xs transition-colors duration-300
                  sm:min-h-[64px]
                  sm:px-4 sm:text-sm
                  lg:min-h-[72px]
                  lg:text-[15px]
                  ${
                    isActive
                      ? "font-bold text-[#1A1A1C]"
                      : "font-medium text-black/50 hover:text-[#4A2E19]"
                  }
                `}
              >
                {tab.label}

                <span
                  className={`
                    absolute bottom-0 right-0 left-0
                    h-[2px] bg-[#4A2E19]
                    transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}

        <div className="pt-8 sm:pt-10 lg:pt-12">
          {/* SPECIFICATIONS */}

          {activeTab === "specs" && (
            <div
              id="panel-specs"
              role="tabpanel"
              aria-labelledby="tab-specs"
              tabIndex={0}
              className="min-h-[320px] outline-none sm:min-h-[360px]"
            >
              {details.specifications.length > 0 ? (
                <div className="divide-y divide-black/5 border-y border-black/5">
                  {details.specifications.map((item) => (
                    <div
                      key={item.label}
                      className="
                        grid grid-cols-1
                        gap-2 px-1 py-5
                        sm:grid-cols-[200px_minmax(0,1fr)]
                        sm:items-center
                        sm:gap-8
                        sm:py-6
                        lg:grid-cols-[240px_minmax(0,1fr)]
                        lg:py-7
                      "
                    >
                      <div className="text-sm font-medium text-[#1A1A1C] sm:text-[15px]">
                        {item.label}
                      </div>

                      <div className="text-sm leading-7 text-black/60 sm:text-[15px]">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-y border-black/5 py-8 text-sm leading-7 text-black/60">
                  مشخصات این محصول هنوز ثبت نشده است.
                </div>
              )}
            </div>
          )}

          {/* DIMENSIONS AND CAPACITY */}

          {activeTab === "dimensions" && (
            <div
              id="panel-dimensions"
              role="tabpanel"
              aria-labelledby="tab-dimensions"
              tabIndex={0}
              className="min-h-[320px] outline-none sm:min-h-[360px]"
            >
              {dimensions.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {dimensions.map((dimension) => (
                    <div
                      key={dimension.label}
                      className="border border-black/10 p-5 sm:p-6"
                    >
                      <p className="text-xs text-black/50">
                        {dimension.label}
                      </p>

                      <p className="mt-3 text-lg font-medium sm:text-xl">
                        {dimension.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-black/10 p-5 sm:p-6">
                  <p className="text-xs text-black/50">
                    ابعاد محصول
                  </p>

                  <p className="mt-3 text-sm leading-7 text-black/60">
                    ابعاد دقیق این محصول هنوز ثبت نشده است.
                  </p>
                </div>
              )}

              <div className="mt-6 border border-black/10 p-5 sm:p-6">
                <h3 className="text-base font-bold sm:text-lg">
                  ظرفیت محصول
                </h3>

                <p className="mt-3 text-sm leading-8 text-black/60 sm:text-[15px]">
                  {details.capacity ??
                    "اطلاعات ظرفیت این محصول هنوز ثبت نشده است."}
                </p>
              </div>
            </div>
          )}

          {/* CARE */}

          {activeTab === "care" && (
            <div
              id="panel-care"
              role="tabpanel"
              aria-labelledby="tab-care"
              tabIndex={0}
              className="min-h-[320px] outline-none sm:min-h-[360px]"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {careInstructions.map((instruction, index) => (
                  <div
                    key={instruction.title}
                    className={`
                      border border-black/10 p-5 sm:p-6
                      ${
                        index === careInstructions.length - 1 &&
                        careInstructions.length > 2
                          ? "sm:col-span-2"
                          : ""
                      }
                    `}
                  >
                    <h3 className="text-base font-bold sm:text-lg">
                      {instruction.title}
                    </h3>

                    <p className="mt-3 text-sm leading-8 text-black/60 sm:text-[15px]">
                      {instruction.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHIPPING AND WARRANTY */}

          {activeTab === "shipping" && (
            <div
              id="panel-shipping"
              role="tabpanel"
              aria-labelledby="tab-shipping"
              tabIndex={0}
              className="min-h-[320px] outline-none sm:min-h-[360px]"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border border-black/10 p-5 sm:p-6">
                  <h3 className="text-base font-bold sm:text-lg">
                    زمان تولید
                  </h3>

                  <p className="mt-3 text-sm leading-8 text-black/60 sm:text-[15px]">
                    {productionTime}
                  </p>
                </div>

                <div className="border border-black/10 p-5 sm:p-6">
                  <h3 className="text-base font-bold sm:text-lg">
                    ارسال
                  </h3>

                  <p className="mt-3 text-sm leading-8 text-black/60 sm:text-[15px]">
                    {shipping}
                  </p>
                </div>

                <div className="border border-black/10 p-5 sm:p-6 sm:col-span-2">
                  <h3 className="text-base font-bold sm:text-lg">
                    گارانتی
                  </h3>

                  <p className="mt-3 text-sm leading-8 text-black/60 sm:text-[15px]">
                    {warranty}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
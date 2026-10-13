
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const mobileLinks = [
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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setExpandedMenu(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    setExpandedMenu(null);
  }

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
        aria-controls="corio-mobile-navigation"
        onClick={() => {
          setIsOpen((current) => !current);
          setExpandedMenu(null);
        }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#4A2E19] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E19] lg:hidden"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <nav
          id="corio-mobile-navigation"
          aria-label="منوی موبایل"
          className="fixed inset-x-0 top-[69px] z-[60] max-h-[calc(100dvh-69px)] overflow-y-auto border-b border-[#D8C8B5] bg-[#E9D8C4] px-5 py-3 shadow-lg sm:top-[73px] sm:max-h-[calc(100dvh-73px)] lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {mobileLinks.map((item) => {
              const isExpanded = expandedMenu === item.label;
              const submenuId = `mobile-submenu-${item.label}`;

              return (
                <div key={item.label} className="border-b border-[#D8C8B5]/70 last:border-b-0">
                  <div className="flex min-h-12 items-center gap-2">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="flex min-h-12 flex-1 items-center px-2 text-sm font-medium text-[#1D1B1C] transition-colors hover:text-[#4A2E19] focus-visible:outline-2 focus-visible:outline-[#4A2E19]"
                    >
                      {item.label}
                    </Link>

                    <button
                      type="button"
                      aria-label={`${isExpanded ? "بستن" : "باز کردن"} زیرمنوی ${item.label}`}
                      aria-expanded={isExpanded}
                      aria-controls={submenuId}
                      onClick={() =>
                        setExpandedMenu((current) =>
                          current === item.label ? null : item.label
                        )
                      }
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#4A2E19] transition hover:bg-[#FFF9F1]/70 focus-visible:outline-2 focus-visible:outline-[#4A2E19]"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="m5 7.5 5 5 5-5" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded && (
                    <div id={submenuId} className="mb-3 mr-3 border-r-2 border-[#4A2E19]/25 pr-3">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex min-h-10 items-center text-xs font-semibold text-[#4A2E19] hover:underline"
                      >
                        مشاهده همهٔ {item.label}
                      </Link>

                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={closeMenu}
                          className="flex min-h-10 items-center text-sm text-[#59483A] transition-colors hover:text-[#4A2E19] focus-visible:outline-2 focus-visible:outline-[#4A2E19]"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/shop"
              onClick={closeMenu}
              className="flex min-h-12 items-center border-b border-[#D8C8B5]/70 px-2 text-sm font-medium text-[#1D1B1C] hover:text-[#4A2E19]"
            >
              همه محصولات
            </Link>

            <Link
              href="/account"
              onClick={closeMenu}
              className="flex min-h-12 items-center px-2 text-sm font-medium text-[#1D1B1C] hover:text-[#4A2E19]"
            >
              حساب کاربری
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

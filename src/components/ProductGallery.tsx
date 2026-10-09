"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ProductGalleryProps = {
  productName: string;
  image: string;
  images: string[];
};

export default function ProductGallery({
  productName,
  image,
  images,
}: ProductGalleryProps) {
  const sourceImages = images.length > 0 ? images : [image];

  // حذف مسیرهای تکراری برای جلوگیری از نمایش بندانگشتی‌های تکراری
  const galleryImages = Array.from(new Set(sourceImages.filter(Boolean)));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const imageCount = galleryImages.length;
  const hasMultipleImages = imageCount > 1;

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % imageCount);
  }, [imageCount]);

  // مدیریت صفحه‌کلید و اسکرول هنگام نمایش تمام‌صفحه
  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
        return;
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        event.preventDefault();
        showNext();
        return;
      }

      // نگه داشتن تمرکز صفحه‌کلید داخل پنجره تمام‌صفحه
      if (event.key === "Tab") {
        const buttons =
          fullscreenRef.current?.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
          );

        if (!buttons || buttons.length === 0) {
          return;
        }

        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === firstButton
        ) {
          event.preventDefault();
          lastButton.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastButton
        ) {
          event.preventDefault();
          firstButton.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      mainImageRef.current?.focus();
    };
  }, [isFullscreen, hasMultipleImages, showNext, showPrevious]);

  const scrollThumbnails = () => {
    thumbnailContainerRef.current?.scrollBy({
      top: 180,
      behavior: "smooth",
    });
  };

  const activeImage = galleryImages[activeIndex] ?? image;

  return (
    <>
      <div
        dir="ltr"
        className="grid grid-cols-[64px_minmax(0,1fr)] gap-4"
      >
        {/* Thumbnails */}
        <div className="flex flex-col items-center gap-3">
          <div
            ref={thumbnailContainerRef}
            className="flex max-h-[min(70vh,360px)] flex-col items-center gap-3 overflow-y-auto"
            aria-label="تصاویر محصول"
          >
            {galleryImages.map((imageSrc, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={imageSrc}
                  type="button"
                  aria-label={`نمایش تصویر ${index + 1} ${productName}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    relative h-14 w-14 shrink-0 overflow-hidden
                    bg-[#DCC5AA] transition
                    lg:h-[58px] lg:w-[58px]
                    ${
                      isActive
                        ? "ring-2 ring-[#4A2E19] ring-offset-2 ring-offset-[#E9D8C4]"
                        : "hover:opacity-75"
                    }
                  `}
                >
                  <Image
                    src={imageSrc}
                    alt={`${productName}، تصویر ${index + 1}`}
                    fill
                    sizes="58px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Scroll thumbnails when there are more images */}
          {imageCount > 5 && (
            <button
              type="button"
              aria-label="نمایش تصاویر بیشتر"
              onClick={scrollThumbnails}
              className="mt-1 flex h-8 w-8 items-center justify-center text-[#4A2E19]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>

        {/* Main Image */}
        <div className="relative aspect-[1.15/1] overflow-hidden bg-[#DCC5AA]">
          <button
            ref={mainImageRef}
            type="button"
            aria-label={`نمایش تمام‌صفحه ${productName}`}
            onClick={() => setIsFullscreen(true)}
            className="absolute inset-0 block w-full cursor-zoom-in"
          >
            <Image
              src={activeImage}
              alt={`${productName}، تصویر ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 85vw, 60vw"
              preload={activeIndex === 0}
              className="object-cover"
            />
          </button>

          {/* Previous */}
          {hasMultipleImages && (
            <button
              type="button"
              aria-label="تصویر قبلی"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/10 text-white backdrop-blur-sm transition hover:bg-black/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {hasMultipleImages && (
            <button
              type="button"
              aria-label="تصویر بعدی"
              onClick={showNext}
              className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/10 text-white backdrop-blur-sm transition hover:bg-black/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Fullscreen */}
          <button
            type="button"
            aria-label="نمایش تمام‌صفحه"
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="8 3 3 3 3 8" />
              <polyline points="16 3 21 3 21 8" />
              <polyline points="8 21 3 21 3 16" />
              <polyline points="21 16 21 21 16 21" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fullscreen Gallery */}
      {isFullscreen && (
        <div
          ref={fullscreenRef}
          role="dialog"
          aria-modal="true"
          aria-label={`نمایش تصاویر ${productName}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsFullscreen(false);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
        >
          {/* Close */}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="بستن نمایش تمام‌صفحه"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 6-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <div className="relative flex w-full max-w-7xl items-center justify-center">
            {/* Previous */}
            {hasMultipleImages && (
              <button
                type="button"
                aria-label="تصویر قبلی"
                onClick={showPrevious}
                className="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white/10 sm:left-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Large Image */}
            <div className="relative h-[75vh] w-full">
              <Image
                src={activeImage}
                alt={`${productName}، تصویر ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Next */}
            {hasMultipleImages && (
              <button
                type="button"
                aria-label="تصویر بعدی"
                onClick={showNext}
                className="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white transition hover:bg-white/10 sm:right-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          <p
            dir="rtl"
            aria-live="polite"
            className="absolute bottom-4 text-sm text-white/80"
          >
            تصویر {activeIndex + 1} از {imageCount}
          </p>
        </div>
      )}
    </>
  );
}
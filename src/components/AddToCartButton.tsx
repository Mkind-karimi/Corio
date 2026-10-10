
"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
  productSlug: string;
  stock: Product["stock"];
};

export default function AddToCartButton({
  productSlug,
  stock,
}: AddToCartButtonProps) {
  const { addItem, isHydrated } = useCart();
  const [message, setMessage] = useState("");

  const isAvailable = stock === "in-stock";
  const isDisabled = !isHydrated || !isAvailable;

  function handleAddToCart() {
    const success = addItem(productSlug);

    setMessage(
      success
        ? "محصول به سبد خرید اضافه شد."
        : "افزودن محصول امکان‌پذیر نیست. لطفاً دوباره تلاش کنید."
    );
  }

  return (
    <div>
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleAddToCart}
        aria-describedby="add-to-cart-status"
        className="mt-7 flex h-11 w-full items-center justify-center gap-4 bg-[#4A2E19] text-sm font-medium text-white transition hover:bg-[#382214] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>
          {isAvailable ? "افزودن به سبد خرید" : "ناموجود"}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7.5 9V7a4.5 4.5 0 0 1 9 0v2" />
          <path d="M4.5 9h15l-1.1 9.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4.5 9Z" />
          <path d="M8.5 13h7" />
        </svg>
      </button>

      <p
        id="add-to-cart-status"
        role="status"
        aria-live="polite"
        className="mt-3 min-h-5 text-sm text-[#4A2E19]"
      >
        {message}
      </p>
    </div>
  );
}

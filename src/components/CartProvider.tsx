
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { products } from "@/data/products";
import type { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "corio-cart-v1";

type CartContextValue = {
  items: CartItem[];
  isHydrated: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (slug: string, quantity?: number) => boolean;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

function isValidCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.slug === "string" &&
    typeof item.quantity === "number" &&
    Number.isSafeInteger(item.quantity) &&
    item.quantity > 0
  );
}

function normalizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const quantities = new Map<string, number>();

  for (const entry of value) {
    if (!isValidCartItem(entry)) {
      continue;
    }

    const product = products.find(
      (item) => item.slug === entry.slug
    );

    // حذف محصولات ناشناخته یا ناموجود از داده بازیابی‌شده
    if (!product || product.stock !== "in-stock") {
      continue;
    }

    const previousQuantity = quantities.get(entry.slug) ?? 0;
    const combinedQuantity = previousQuantity + entry.quantity;

    if (!Number.isSafeInteger(combinedQuantity)) {
      continue;
    }

    quantities.set(entry.slug, combinedQuantity);
  }

  return Array.from(quantities, ([slug, quantity]) => ({
    slug,
    quantity,
  }));
}

function getFinalPrice(
  product: (typeof products)[number]
): number {
  if (
    product.originalPrice !== undefined &&
    product.discountPercentage !== undefined
  ) {
    return Math.round(
      product.originalPrice *
        (1 - product.discountPercentage / 100)
    );
  }

  return product.price;
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // بازیابی سبد خرید پس از بارگذاری در مرورگر
  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart);
        setItems(normalizeCart(parsedCart));
      }
    } catch {
      // اگر داده ذخیره‌شده قابل خواندن نباشد،
      // سبد خالی می‌ماند و برنامه متوقف نمی‌شود.
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // جلوگیری از بازنویسی localStorage پیش از بازیابی اولیه
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch {
      // در صورت غیرفعال بودن یا پر بودن فضای ذخیره‌سازی،
      // سبد در حافظه همچنان قابل استفاده است.
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (slug: string, quantity = 1): boolean => {
      const product = products.find(
        (item) => item.slug === slug
      );

      const safeQuantity = Math.floor(quantity);

      if (
        !isHydrated ||
        !product ||
        product.stock !== "in-stock" ||
        !Number.isSafeInteger(safeQuantity) ||
        safeQuantity < 1
      ) {
        return false;
      }

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.slug === slug
        );

        if (!existingItem) {
          return [
            ...currentItems,
            { slug, quantity: safeQuantity },
          ];
        }

        const nextQuantity =
          existingItem.quantity + safeQuantity;

        if (!Number.isSafeInteger(nextQuantity)) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item.slug === slug
            ? { ...item, quantity: nextQuantity }
            : item
        );
      });

      return true;
    },
    [isHydrated]
  );

  const updateQuantity = useCallback(
    (slug: string, quantity: number) => {
      if (!Number.isSafeInteger(quantity)) {
        return;
      }

      if (quantity <= 0) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.slug !== slug)
        );
        return;
      }

      const product = products.find(
        (item) => item.slug === slug
      );

      if (!product || product.stock !== "in-stock") {
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.slug === slug ? { ...item, quantity } : item
        )
      );
    },
    []
  );

  const removeItem = useCallback((slug: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.slug !== slug)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () =>
      items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => {
        const product = products.find(
          (candidate) => candidate.slug === item.slug
        );

        if (!product) {
          return total;
        }

        return total + getFinalPrice(product) * item.quantity;
      }, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isHydrated,
      totalItems,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isHydrated,
      totalItems,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}


import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";

import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Corio | محصولات چرمی دستدوز",
  description:
    "فروشگاه محصولات چرمی Corio؛ طراحی خاص، چرم طبیعی و ساخت دستدوز.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      className={`${vazirmatn.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

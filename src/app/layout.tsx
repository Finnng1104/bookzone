"use client"; // Vẫn cần vì có `usePathname`

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const authRoutes = ["/login", "/register", "/forgot-password"];

  if (authRoutes.includes(pathname)) {
    return (
      <html lang="vi">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
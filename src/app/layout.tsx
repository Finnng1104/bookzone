"use client";

import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = [
    "/login",
    "/register",
    "/reset-password"
  ].some((path) => pathname?.startsWith(path));

  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {!isAuthPage && <Header />}
        <main className="flex-grow">{children}</main>
        {!isAuthPage && <Footer />}
        {!isAuthPage && <BackToTop />}
      </body>
    </html>
  );
}
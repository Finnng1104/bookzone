"use client"; // Vẫn cần vì có `usePathname`
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { useState } from 'react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
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
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="flex-grow mt-24">{children}</main>
        <Footer />
        <BackToTop />
        </QueryClientProvider>
      </body>
    </html>
  );
}
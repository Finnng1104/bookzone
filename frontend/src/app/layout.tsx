"use client";

import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = ["/login", "/register", "/reset-password", "/doc-sach"].some((path) =>
    pathname?.startsWith(path)
  );

  return (
    <html lang="vi">
      <QueryClientProvider client={queryClient}>
        <body className="min-h-screen flex flex-col bg-white text-gray-900">
          {!isAuthPage && <Header />}
          <main className="flex-grow">{children}</main>
          {!isAuthPage && <Footer />}
          {!isAuthPage && <BackToTop />}

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
                padding: "12px 16px",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#22c55e",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#22c55e",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#ef4444",
                },
              },
            }}
          />
        </body>
      </QueryClientProvider>
    </html>
  );
}

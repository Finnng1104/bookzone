import Header from "@/components/layout/header";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "Bookzone",
  description: "Your favorite bookstore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTop /> {/* Thêm nút Back to Top */}
      </body>
    </html>
  );
}
"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/banner/Banner";
import BookList from "@/components/book/BookList";
import FeatureList from "@/components/ui/FeatureList";
import HeroBanner from "@/components/banner/HeroBanner";
import NewsSection from "@/components/ui/NewsSection";

interface Book {
  slug: string;
  title: string;
  coverImage: string;
  series: string;
  rating: number;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/books"); // 🔥 API lấy danh sách sách
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Banner />
      <FeatureList />

      {/* 📚 Truyền cùng 1 mảng `books` vào cả hai danh sách */}
      <BookList
        title="Top eBook tải nhiều"
        description="Tổng hợp những eBook tải về nhiều nhất trong tháng."
        buttonText="Xem thêm EBOOK MỚI"
        buttonLink="/thu-vien-sach"
        books={books} // ✅ Truyền mảng sách đã fetch vào đây
      />
      <BookList
        title="Các ebook mới nhất"
        description="Dưới đây là một số eBook mới tổng hợp, mời bạn đọc thưởng sách:"
        buttonText="Xem thêm EBOOK MỚI"
        buttonLink="/thu-vien-sach"
        books={books} // ✅ Truyền mảng sách đã fetch vào đây
      />

      <HeroBanner />
      <NewsSection />
      <FeatureList />
    </>
  );
};

export default Home;
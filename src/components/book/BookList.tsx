"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BookCard from "@/components/ui/BookCard";
import Link from "next/link";

interface Book {
  slug: string; // 🔥 Thay vì `_id`, sử dụng `slug`
  title: string;
  coverImage: string;
  series: string;
  rating: number;
}

interface BookListProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  books: Book[]; // 🔥 Nhận danh sách sách từ props
}

const BookList: React.FC<BookListProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  books,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      {/* Tiêu đề danh sách sách */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>

      {/* Hiển thị trạng thái nếu không có sách */}
      {books.length === 0 ? (
        <p className="text-center text-red-500">Không tìm thấy sách nào.</p>
      ) : (
        <>
          {/* 📌 Mobile: Hiển thị Swiper (carousel) */}
          {isMobile ? (
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={16}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
              }}
              className="pb-6"
            >
              {books.map((book) => (
                <SwiperSlide key={book.slug}>
                  {" "}
                  {/* 🔹 Thay vì `_id`, dùng `slug` */}
                  <BookCard
                    key={book.slug} // ✅ Key chỉ để React nhận diện, không ảnh hưởng đến điều hướng
                    image={book.coverImage || "/default-book.jpg"}
                    title={book.title}
                    slug={book.slug} // ✅ Truyền slug vào để tạo link đúng
                    category={book.series || "Chưa phân loại"}
                    highlight={book.rating >= 4}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // 📌 Desktop: Hiển thị dạng lưới
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 justify-items-center">
              {books.map((book) => (
                <BookCard
                  key={book.slug}
                  image={book.coverImage || "/default-book.jpg"}
                  title={book.title}
                  slug={book.slug}
                  category={book.series || "Chưa phân loại"}
                  highlight={book.rating >= 4}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* 🔥 Nút XEM THÊM (nếu có props) */}
      {buttonText && buttonLink && (
        <div className="flex justify-center mt-8">
          <Link
            href={buttonLink}
            className="bg-pink-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-pink-700 transition flex items-center space-x-2"
          >
            <span>📖 {buttonText}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookList;

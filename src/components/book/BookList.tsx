"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BookCard from "@/components/ui/BookCard";
import Link from "next/link";

interface BookListProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const API_URL =
  `https://www.googleapis.com/books/v1/volumes?q=s%C3%A1ch+m%E1%BB%9Bi+nh%E1%BA%A5t+vi%E1%BB%87t+nam&download=epub&langRestrict=vi&key=${API_KEY}`;

const BookList: React.FC<BookListProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📡 Gọi API Google Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Define interface for book item
        if (data.items) {
          const formattedBooks = data.items.map((item: {
            volumeInfo: {
              imageLinks?: {
                thumbnail?: string;
              };
              title?: string;
            };
          }) => ({
            image:
              item.volumeInfo.imageLinks?.thumbnail ||
              "/default-book.jpg",
            title: item.volumeInfo.title || "Không có tiêu đề",
            category: item.volumeInfo.categories?.[0] || "Chưa phân loại",
            highlight: item.volumeInfo.averageRating >= 4,
          }));
          setBooks(formattedBooks);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API Google Books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      {/* Tiêu đề danh sách sách */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>

      {/* Hiển thị trạng thái loading */}
      {loading ? (
        <p className="text-center text-gray-500">Đang tải sách...</p>
      ) : books.length === 0 ? (
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
              {books.map((book, index) => (
                <SwiperSlide key={index}>
                  <BookCard
                    image={book.image}
                    title={book.title}
                    category={book.category}
                    highlight={book.highlight}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // 📌 Desktop: Hiển thị dạng lưới
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 justify-items-center">
              {books.map((book, index) => (
                <BookCard
                  key={index}
                  image={book.image}
                  title={book.title}
                  category={book.category}
                  highlight={book.highlight}
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
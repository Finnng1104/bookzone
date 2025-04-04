"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BookCard from "@/components/ui/BookCard";
import Link from "next/link";

interface Book {
  slug: string;
  title: string;
  coverImage: string;
  series: string;
  rating: number;
  favorites?: number;
  views?: number;
}

interface BookListProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  books,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-12 space-y-4">
          <div className="text-5xl">📚</div>
          <h3 className="text-xl font-semibold text-gray-700">
            Không tìm thấy kết quả nào
          </h3>
          <p className="text-sm">
            Có thể bạn đang tìm kiếm sai chính tả, hoặc sách chưa có trong hệ
            thống.
          </p>
          <Link
            href="/thu-vien-sach"
            className="mt-2 inline-block px-5 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition"
          >
            🔄 Xem tất cả sách
          </Link>
        </div>
      ) : (
        <>
          {isMobile ? (
            <>
              <Swiper
                modules={[Pagination]}
                slidesPerView={2}
                spaceBetween={16}
                pagination={{
                  clickable: true,
                  el: paginationRef.current,
                }}
                onSwiper={(swiper) => {
                  if (swiper.params.pagination && typeof swiper.params.pagination !== "boolean") {
                    swiper.params.pagination.el = paginationRef.current;
                    swiper.pagination.init();
                    swiper.pagination.update();
                  }
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                }}
                className="pb-4"
              >
                {books.map((book) => (
                  <SwiperSlide key={book.slug}>
                    <BookCard
                      key={book.slug}
                      image={book.coverImage || "/default-book.jpg"}
                      title={book.title}
                      slug={book.slug}
                      category={book.series || "Chưa phân loại"}
                      highlight={book.rating >= 4}
                      favorites={book.favorites}
                      views={book.views}
                      rating={book.rating}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div ref={paginationRef} className="flex justify-center mt-4"></div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 justify-items-center">
              {books.map((book) => (
                <BookCard
                  key={book.slug}
                  image={book.coverImage || "/default-book.jpg"}
                  title={book.title}
                  slug={book.slug}
                  category={book.series || "Chưa phân loại"}
                  highlight={book.rating >= 4}
                  favorites={book.favorites}
                  views={book.views}
                  rating={book.rating}
                />
              ))}
            </div>
          )}
        </>
      )}

      {buttonText && buttonLink && (
        <div className="flex justify-center mt-8">
          <Link
            href={buttonLink}
            className="bg-secondary text-white font-semibold px-6 py-3 rounded-full transition flex items-center space-x-2 hover:bg-[#D13D35]"
          >
            <span>📖 {buttonText}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookList;
"use client";

import React, { useState } from "react";
import BookCard from "@/components/ui/BookCard";

const books = [
  {
    image: "/book/image_121637.jpg",
    title: "Cẩm Nang Của Người Chiến Binh Ánh Sáng",
    category: "VĂN HOÁ - XÃ HỘI",
    views: "4.4K",
    likes: "3.4K",
  },
  {
    image: "/book/image_121638.jpg",
    title: "Bao Người Chờ Đợi",
    category: "TIỂU THUYẾT",
    views: "5.9K",
    likes: "4.5K",
  },
  {
    image: "/book/image_121639.jpg",
    title: "Bóng Ma Trong Nhà Hát",
    category: "TIỂU THUYẾT",
    views: "6.8K",
    likes: "5.2K",
  },
  {
    image: "/book/image_121640.jpg",
    title: "Bóng Ma Trên Phố Ginza",
    category: "HOT",
    views: "6.5K",
    likes: "5.0K",
  },
  {
    image: "/book/image_121641.jpg",
    title: "Vợ Mới Của Chồng Tôi",
    category: "HOT",
    views: "6.5K",
    likes: "5.0K",
  },
  {
    image: "/book/image_121642.jpg",
    title: "Người Phá Vỡ Chung Cư Ngoại Phạm",
    category: "HIỆN ĐẠI",
    views: "4.4K",
    likes: "3.4K",
  },
  {
    image: "/book/image_121643.jpg",
    title: "Trò Chơi Thừa Kế",
    category: "TIỂU THUYẾT",
    views: "5.9K",
    likes: "4.5K",
  },
  {
    image: "/book/image_121644.jpg",
    title: "Trả Giá",
    category: "KỸ NĂNG SỐNG",
    views: "6.8K",
    likes: "5.2K",
  },
  {
    image: "/book/image_121645.jpg",
    title: "Sai Gả Tân Nhân",
    category: "HOT",
    views: "6.5K",
    likes: "5.0K",
  },
  {
    image: "/book/image_121646.jpg",
    title: "Gái Tân Nhân",
    category: "HOT",
    views: "6.5K",
    likes: "5.0K",
  },
  // Thêm dữ liệu để đạt 90 cuốn (3 trang, mỗi trang 30 cuốn)
  ...Array(80).fill({
    image: "/book/image_121646.jpg",
    title: "Sách Mẫu",
    category: "Tổng Hợp",
    views: "5.0K",
    likes: "3.8K",
  }),
];

// Số sách hiển thị mỗi trang
const BOOKS_PER_PAGE = 30;

const BookLibrary = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán sách cần hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const selectedBooks = books.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  // Tính tổng số trang
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Thư viện sách</h2>
        <p className="text-gray-600 text-sm mt-2">
          Tổng hợp những đầu sách hay và được yêu thích nhất.
        </p>
      </div>

      {/* Danh sách sách */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {selectedBooks.map((book, index) => (
          <BookCard
            key={index}
            image={book.image}
            title={book.title}
            category={book.category}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Tiếp →
        </button>
      </div>
    </div>
  );
};

export default BookLibrary;
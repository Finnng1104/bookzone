"use client";

import React, { useState, useEffect } from "react";
import BookCard from "@/components/ui/BookCard";

const BOOKS_PER_PAGE = 30;

const BookLibrary = () => {
  const [books, setBooks] = useState<any[]>([]); // ✅ Đảm bảo `books` luôn có giá trị mảng
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 📡 Gọi API lấy danh sách sách theo trang
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/books`);
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setBooks(data); // ✅ API trả về mảng sách
          setTotalPages(Math.ceil(data.length / BOOKS_PER_PAGE)); // ✅ Tính tổng số trang
        } else {
          console.error("Lỗi khi tải danh sách sách:", data.message);
          setBooks([]);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Tính toán danh sách sách hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const selectedBooks = books.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Thư viện sách</h2>
        <p className="text-gray-600 text-sm mt-2">
          Tổng hợp những đầu sách hay và được yêu thích nhất.
        </p>
      </div>

      {/* Hiển thị trạng thái loading */}
      {loading ? (
        <p className="text-center text-gray-500">Đang tải sách...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-red-500">Không tìm thấy sách.</p>
      ) : (
        <>
          {/* Danh sách sách */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {selectedBooks.map((book) => (
              <BookCard
                key={book._id}
                image={book.coverImage || "/default-book.jpg"}
                title={book.title}
                category={book.category?.join(", ") || "Chưa phân loại"}
                views={book.views}
                favorites={book.favorites}
                rating={book.rating}
                slug={book.slug}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
            >
              Tiếp →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookLibrary;
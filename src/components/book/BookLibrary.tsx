"use client";

import React, { useState, useEffect } from "react";
import BookCard from "@/components/ui/BookCard";
import IBook from "@/types/book.interface";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const BOOKS_PER_PAGE = 30;

const BookLibrary = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
       
        const searchType = searchParams.get("type");
        const searchQuery = searchParams.get("q");

        let url = "http://localhost:8080/api/books";

        if (searchQuery?.trim()) {
          const query = encodeURIComponent(searchQuery.trim());

          if (searchType === "title") {
            url = `http://localhost:8080/api/books/search/title/${query}`;
          } else if (searchType === "author") {
            url = `http://localhost:8080/api/books/search/author/${query}`;
          }
        }

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok && data.success && Array.isArray(data.data)) {
          setBooks(data.data);
          setTotalPages(Math.ceil(data.data.length / BOOKS_PER_PAGE));
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
  }, [searchParams]);

  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const selectedBooks = books.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Thư viện sách</h2>
        <p className="text-gray-600 text-sm mt-2">
          Tổng hợp những đầu sách hay và được yêu thích nhất.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải sách...</p>
      ) : books.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 justify-items-center">
      {selectedBooks.map((book) => (
        <BookCard
          key={book._id}
          image={book.coverImage || "/default-book.jpg"}
          title={book.title}
          slug={book.slug}
          category={Array.isArray(book.category) ? book.category.join(", ") : "Chưa phân loại"}
          highlight={book.rating >= 4}
          favorites={book.favorites}
          views={book.views}
          rating={book.rating}
        />
      ))}
    </div>

    {/* Pagination giữ nguyên */}
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

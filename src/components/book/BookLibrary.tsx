"use client";

import React, { useState, useEffect } from "react";
import BookCard from "@/components/ui/BookCard";
import IBook from "@/types/book.interface";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterBar from "../ui/Filter";
import { useRouter, usePathname } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const BookLibrary = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [totalResults, setTotalResults] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q");
    const type = searchParams.get("type");

    if (type === "category" && query) {
      setFilter(query);
    }

    const fetchBooks = async () => {
      setLoading(true);

      try {
        let url = `https://bookzone-server.onrender.com/api/books?page=${currentPage}`;

        if (query?.trim()) {
          const encodedQuery = encodeURIComponent(query.trim());

          if (type === "title") {
            url = `https://bookzone-server.onrender.com/api/books/search/title/${encodedQuery}?page=${currentPage}`;
          } else if (type === "author") {
            url = `https://bookzone-server.onrender.com/api/books/search/author/${encodedQuery}?page=${currentPage}`;
          } else if (type === "category") {
            url = `https://bookzone-server.onrender.com/api/books/category/${encodedQuery}?page=${currentPage}`;
          }
        } else if (filter !== "all") {
          const category = encodeURIComponent(filter);
          url = `https://bookzone-server.onrender.com/api/books/category/${category}?page=${currentPage}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok && data.success && Array.isArray(data.data)) {
          setBooks(data.data);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalResults(data.pagination?.total || 0);
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
  }, [searchParams, filter, currentPage]);

  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (value: string) => {
    if (value === filter) return;
    setFilter(value);
    setCurrentPage(1);

    if (value === "all") {
      router.replace(pathname);
    } else {
      const query = `?type=category&q=${encodeURIComponent(value)}`;
      router.push(`${pathname}${query}`);
    }
  };

  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      <FilterBar selectedFilter={filter} onChange={handleFilterChange} />
      {!loading && totalResults > 0 && (
        <div className="text-left text-gray-600 mb-6 text-sm">
          Có tổng cộng <strong>{totalResults}</strong> kết quả
        </div>
      )}
      {loading ? (
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
                <p className="text-lg">Đang tải sách theo danh mục...</p>
              </div>
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
            {books.map((book) => (
              <BookCard
                key={book._id}
                bookId={book._id || ""}
                userId={book.userId || ""}
                image={book.coverImage || "/default-book.jpg"}
                title={book.title}
                slug={book.slug}
                category={book.category}
                views={book.views}
                rating={book.rating}
              />
            ))}
          </div>

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
                className={`px-4 py-2 rounded-md transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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

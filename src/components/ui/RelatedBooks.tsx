"use client";

import { useEffect, useState } from "react";
import { IBook } from "@/types/book.interface";
import BookCard from "@/components/ui/BookCard";

interface RelatedBooksProps {
  category: string;
}

const RelatedBooks: React.FC<RelatedBooksProps> = ({ category }) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      try {
        const encodedCategory = encodeURIComponent(category);
        const res = await fetch(`http://localhost:8080/api/books/category/${encodedCategory}?limit=6`);
        const data = await res.json();

        if (res.ok && data.success && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          console.error("Không tìm thấy sách liên quan:", data.message);
          setBooks([]);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API sách liên quan:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchRelatedBooks();
    }
  }, [category]);

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải sách liên quan...</p>;
  }

  if (books.length === 0) {
    return <p className="text-center text-gray-500">Không tìm thấy sách liên quan.</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">📚 Sách liên quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 justify-items-center">
        {books.map((book) => (
          <BookCard
            key={book._id}
            image={book.coverImage || "/default-book.jpg"}
            title={book.title}
            slug={book.slug}
            category={book.category}

            views={book.views}
            rating={book.rating}
            bookId={book._id || ""}
            userId={book.userId || ""}

          />
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBookOpen } from "react-icons/fa";

const BookDetail = () => {
  const { slug } = useParams();
  const [book, setBook] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDownload = () => {
    if (book?.formats?.pdf) {
      window.open(book.formats.pdf, "_blank"); 
    } else {
      alert("Không tìm thấy file PDF để tải!");
    }
  };


  useEffect(() => {
    if (!slug) return; 

    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/books/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setBook(data);
        } else {
          console.error("Không tìm thấy sách");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Lưu vào danh sách yêu thích
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10">
        Đang tải dữ liệu sách...
      </p>
    );
  }

  if (!book) {
    return (
      <p className="text-center text-red-500 py-10">Không tìm thấy sách!</p>
    );
  }

  return (
    <div className="w-full lg:container mx-auto px-4 py-8">
      {/* Phần trên: Ảnh & thông tin sách */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ảnh bìa sách */}
        <div className="col-span-1 flex justify-center">
          <Image
            src={book.coverImage || "/images/default-book-cover.jpg"}
            width={300}
            height={450}
            alt={book.title}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Thông tin sách & Nút hành động */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {book.views} lượt xem • {book.favorites} yêu thích • ⭐{" "}
            {book.rating}
          </p>

          <p className="mt-4">
            Sách của tác giả{" "}
            <Link href="#" className="text-pink-600 font-semibold">
              {book.author}
            </Link>
            . Mời bạn đọc ngay.
          </p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Thể loại:</strong> {book.category}
            </p>
            <p>
              <strong>Bộ sách:</strong> {book.series}
            </p>
            <p>
              <strong>Nguồn:</strong> {book.source}
            </p>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/doc-sach/${slug}`}
              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 flex items-center gap-2"
            >
              <FaBookOpen /> Đọc Sách Online
            </Link>

            <button
              onClick={handleDownload}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 flex items-center gap-2"
            >
              ⬇️ Tải Xuống Ngay
            </button>
            <button
              onClick={toggleFavorite}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white ${
                isFavorite
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-500 hover:bg-gray-600"
              } transition`}
            >
              <FaHeart />
              {isFavorite ? "Đã Yêu Thích" : "Thêm vào Yêu Thích"}
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 flex items-center gap-2">
              <FaBookOpen />
              Xem Danh Sách Yêu Thích
            </button>
          </div>
        </div>
      </div>

      {/* Mô tả */}
      <div className="mt-12 bg-gray-100 rounded-lg p-6">
        <h3 className="font-semibold text-lg bg-gray-200 px-4 py-2 rounded-t-lg">
          Mô tả
        </h3>
        <div className="p-4">
          <p className="text-gray-700">{book.description}</p>
        </div>
      </div>

      {/* Giới thiệu tác giả */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">✍️ Giới thiệu tác giả</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">{book.author}</span> là một nhà văn
          nổi tiếng với nhiều tác phẩm được yêu thích.
        </p>
      </div>
    </div>
  );
};

export default BookDetail;

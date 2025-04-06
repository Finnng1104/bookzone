"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBookOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { usePostWishlist } from "@/hooks/useWishlist";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;
import { IBook } from "@/types/book.interface";
import RelatedBooks from "@/components/ui/RelatedBooks";
import toast from "react-hot-toast";
const BookDetail = () => {
  const router = useRouter();
  const { mutateAsync: postwishlist } = usePostWishlist();
  const { slug } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasShownError, setHasShownError] = useState(false);
  useEffect(() => {
    setHasShownError(false);
  }, [isFavorite]);
  useEffect(() => {
    if (!slug) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/books/slug/${slug}`);
        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setBook(data.data);
        } else {
          console.error("Không tìm thấy sách hoặc lỗi dữ liệu");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  const handleDownload = () => {
    if (book?.formats?.pdf) {
      window.open(book.formats.pdf, "_blank");
    } else {
      alert("Không tìm thấy file PDF để tải!");
    }
  };

  // const toggleFavorite = () => {
  //   setIsFavorite(!isFavorite);
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
        <p className="ml-3 text-gray-500">Đang tải dữ liệu sách...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <p className="text-center text-red-500 py-10">Không tìm thấy sách!</p>
    );
  }
  const handleAddToWishlist = async () => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      toast.error("Bạn cần đăng nhập để thêm vào danh sách yêu thích.");
      router.push("/login");
      return;
    }
  
    const user = JSON.parse(userCookie);
  
    if (!user.id || !book?._id) {
      alert("Không đủ thông tin người dùng hoặc sách.");
      return;
    }
  
    if (isFavorite) {
      if (!hasShownError) {
        toast.error("Sách đã có trong danh sách yêu thích.");
        setHasShownError(true); // Đánh dấu đã hiển thị thông báo lỗi
        return;
      }
      return;
    }
  
    try {
      const response = await postwishlist({
        userId: user.id,
        bookId: book._id,
      });
  
      if (response?.status === "Success") {
        toast.success("Đã thêm vào danh sách yêu thích!");
        setIsFavorite(true);  // Đánh dấu là yêu thích
        setHasShownError(false);  // Reset trạng thái lỗi khi thêm thành công
        router.push("/wishlist");
      } else {
        alert("Thêm vào yêu thích thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm yêu thích:", error);
      toast.error("Sách đã có trong danh sách yêu thích");
      setHasShownError(true);  // Đánh dấu đã hiển thị thông báo lỗi
    }
  };
  
  
  const handlenavigatewishlish = () => {
    router.push("/wishlist"); 
  }

  return (
    <div className="w-full lg:container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 flex justify-center">
          <Image
            src={book.coverImage || "/images/default-book-cover.jpg"}
            width={300}
            height={450}
            alt={book.title}
            priority
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-lg shadow-md object-cover"
          />
        </div>

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

          <div className="mt-6 space-y-2 text-gray-700">
            <p>
              <strong>Thể loại:</strong>{" "}
              {book.category?.join(", ") || "Chưa phân loại"}
            </p>
            {book.series && (
              <p>
                <strong>Bộ sách:</strong> {book.series}
              </p>
            )}
            {book.source && (
              <p>
                <strong>Nguồn:</strong> {book.source}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={book.formats?.pdf ? `/doc-sach/${slug}` : "#"}
              className={`px-6 py-3 rounded-full flex items-center gap-2 text-white transition ${
                book.formats?.pdf
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
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
              disabled={hasShownError}
              onClick={handleAddToWishlist}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition ${
                isFavorite || hasShownError
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              <FaHeart />
              {isFavorite ? "Đã Yêu Thích" : "Thêm vào Yêu Thích"}
            </button>


            <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 flex items-center gap-2" onClick={handlenavigatewishlish}>
              <FaBookOpen /> Xem Danh Sách Yêu Thích
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 rounded-lg p-6">
        <h3 className="font-semibold text-lg bg-gray-200 px-4 py-2 rounded-t-lg">
          Mô tả
        </h3>
        <div className="p-4 text-gray-700">
          <p>{book.description || "Chưa có mô tả cho sách này."}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">✍️ Giới thiệu tác giả</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">{book.author}</span> là một nhà văn
          nổi tiếng với nhiều tác phẩm được yêu thích.
        </p>
      </div>
      {book.category && book.category.length > 0 && (
        <RelatedBooks category={book.category[0]} />
      )}
    </div>
  );
};

export default BookDetail;

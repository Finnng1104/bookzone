"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBookOpen, FaStar, FaEye, FaDownload, FaRegHeart } from "react-icons/fa";
import { usePostWishlist } from "@/hooks/useWishlist";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;
import { IBook } from "@/types/book.interface";
import RelatedBooks from "@/components/ui/RelatedBooks";
import ReviewSection from "@/components/ui/ReviewSection";
import toast from "react-hot-toast";

const BookDetail = () => {
  const router = useRouter();
  const { mutateAsync: postwishlist } = usePostWishlist();
  const { slug } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [hasShownError, setHasShownError] = useState(false);

  useEffect(() => {
    setHasShownError(false);
  }, [isFavorite]);

  useEffect(() => {
    if (!slug) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://bookzone-server.onrender.com/api/books/slug/${slug}`);
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
        setHasShownError(true);
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
        setIsFavorite(true);
        setHasShownError(false);
        router.push("/wishlist");
      } else {
        alert("Thêm vào yêu thích thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm yêu thích:", error);
      toast.error("Sách đã có trong danh sách yêu thích");
      setHasShownError(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy sách!</h2>
          <p className="text-gray-600">Sách bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link href="/" className="mt-4 inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-teal-600 to-teal-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Book Cover */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={book.coverImage || "/images/default-book-cover.jpg"}
                  alt={book.title}
                  priority
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{book.title}</h1>
              <p className="text-white mb-4">bởi <span className="font-semibold">{book.author}</span></p>

              <div className="flex items-center gap-6 text-teal-100 mb-6">
                <div className="flex items-center gap-2">
                  <FaEye className="text-white" />
                  <span>{book.views} lượt xem</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeart className="text-white" />
                  <span>{book.favorites} yêu thích</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>{book.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-teal-100">
                <p><strong className="text-white">Thể loại:</strong> {book.category?.join(" • ") || "Chưa phân loại"}</p>
                {book.series && <p><strong className="text-white">Bộ sách:</strong> {book.series}</p>}
                {book.source && <p><strong className="text-white">Nguồn:</strong> {book.source}</p>}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={book.formats?.pdf ? `/doc-sach/${book.slug}` : "#"}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                    book.formats?.pdf
                      ? "bg-white text-teal-700 hover:bg-teal-100"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  <FaBookOpen /> Đọc Sách Online
                </Link>

                <button
                  onClick={handleDownload}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaDownload /> Tải Xuống PDF
                </button>

                <button
                  disabled={hasShownError}
                  onClick={handleAddToWishlist}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isFavorite || hasShownError
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white text-teal-700 hover:bg-teal-100"
                  }`}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  {isFavorite ? "Đã Yêu Thích" : "Thêm vào Yêu Thích"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex border-b">
            {["description", "author", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === tab
                    ? "text-black border-b-2 border-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab === "description" && "Mô tả sách"}
                {tab === "author" && "Về tác giả"}
                {tab === "reviews" && "Đánh giá"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none text-gray-700">
                <p>{book.description || "Chưa có mô tả cho sách này."}</p>
              </div>
            )}

            {activeTab === "author" && (
              <div className="text-gray-700">
                <h2 className="text-xl font-bold mb-2">Giới thiệu tác giả</h2>
                <p>
                  <span className="font-semibold">{book.author}</span> là một nhà văn nổi tiếng với nhiều tác phẩm được yêu thích.
                </p>
              </div>
            )}

            {activeTab === "reviews" && <ReviewSection />}
          </div>
        </div>

        {/* Notice Box */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
          <h3 className="text-teal-800 font-semibold mb-4">Lưu ý quan trọng</h3>
          <div className="space-y-3">
            {[
              "Nếu bạn có điều kiện, hãy mua sách giấy để ủng hộ tác giả.",
              "Sách ebook được sưu tầm từ Internet. Bản quyền thuộc về Tác giả & Nhà xuất bản.",
              "Website có gắn quảng cáo để duy trì hoạt động. Mong bạn đọc thông cảm.",
            ].map((note, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-teal-700">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Books */}
        {book.category && book.category.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sách liên quan</h2>
            <RelatedBooks category={book.category[0]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
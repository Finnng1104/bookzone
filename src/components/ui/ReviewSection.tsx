"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
const LIMIT = 5;

interface Review {
    _id: string;
    userId: {
      _id: string;
      fullname: string;
      avatar?: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }

const ReviewSection = () => {
  const { slug } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const userCookie = Cookies.get("user");
const currentUserId = userCookie ? JSON.parse(userCookie).id : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const fetchReviews = async (currentPage = 1, selectedRating = filterRating) => {
    if (!slug) return;
    setLoadingList(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews`, {
        params: { slug, page: currentPage, limit: LIMIT, rating: selectedRating || undefined },
      });

      const { reviews: newReviews, totalPages, total } = response.data;

      setReviews(newReviews);
      setTotalPages(totalPages);
      setPage(currentPage);
      setTotal(total);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Không thể tải đánh giá!");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, [slug, filterRating]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Vui lòng nhập bình luận!");
      return;
    }

    setLoading(true);
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        toast.error("Bạn cần đăng nhập để đánh giá!");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userCookie);

      if (editingReviewId) {
        // Update review
        await axios.put(`http://localhost:8080/api/reviews/${editingReviewId}`, {
          rating,
          comment,
        });
        toast.success("Cập nhật đánh giá thành công!");
        setEditingReviewId(null);
      } else {
        // Create new review
        await axios.post(
          `http://localhost:8080/api/reviews`,
          {
            userId: user.id,
            slug,
            rating,
            comment,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
          }
        );
        toast.success("Đã gửi đánh giá!");
      }

      setComment("");
      setRating(5);
      fetchReviews(1);
    }catch (error: unknown) {
        console.error("Error submitting review:", error);
      
        let errorMessage = "Có lỗi xảy ra khi gửi đánh giá!";
      
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
        }
      
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`);
      toast.success("Đã xoá đánh giá!");
      fetchReviews(page);
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Không thể xoá đánh giá!");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReviewId(review._id);
    setComment(review.comment);
    setRating(review.rating);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== page) {
      fetchReviews(pageNumber);
    }
  };

  const handleFilterRating = (selectedRating: number | null) => {
    setFilterRating(selectedRating);
    setPage(1);
  };

  return (
    <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
      <h3 className="font-semibold text-lg mb-4">Đánh giá sách 📖</h3>

      {/* Form */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-3 text-sm focus:outline-pink-500"
          rows={3}
          placeholder="Viết cảm nhận của bạn về cuốn sách này..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-3 px-6 py-2 rounded-lg text-white transition w-full sm:w-auto ${
            loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Đang gửi..." : editingReviewId ? "Cập nhật đánh giá" : "Gửi đánh giá"}
        </button>

        {editingReviewId && (
          <button
            onClick={() => {
              setEditingReviewId(null);
              setComment("");
              setRating(5);
            }}
            className="mt-2 text-sm text-gray-500 underline"
          >
            Huỷ chỉnh sửa
          </button>
        )}
      </div>

      {/* Filter Rating */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { label: "Tất cả", value: null },
          { label: "5 Sao", value: 5 },
          { label: "4 Sao", value: 4 },
          { label: "3 Sao", value: 3 },
          { label: "2 Sao", value: 2 },
          { label: "1 Sao", value: 1 },
        ].map((filter) => (
          <button
            key={filter.label}
            onClick={() => handleFilterRating(filter.value)}
            className={`px-3 py-1 rounded-lg border ${
              filterRating === filter.value
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Total results */}
      {!loadingList && (
        <p className="text-sm text-gray-600 mb-4">
          Tổng cộng <strong>{total}</strong> đánh giá
        </p>
      )}

      {/* List */}
      <div>
        <h4 className="font-medium mb-3">Danh sách đánh giá 📝</h4>

        {loadingList ? (
          <p className="text-gray-500 text-sm">Đang tải đánh giá...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
  <div
    key={review._id}
    className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm"
  >
    <Image
      src={review.userId?.avatar || "/default-avatar.jpg"}
      alt="Avatar"
      width={48}
      height={48}
      className="rounded-full object-cover"
    />

    <div className="flex-1">
      <div className="flex items-center gap-2">
        <p className="font-semibold">
          {review.userId?.fullname || "Người dùng ẩn danh"}
        </p>
        <span className="text-gray-400 text-xs">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <div className="flex items-center mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${
              star <= review.rating ? "text-yellow-400" : "text-gray-300"
            } text-sm`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">{review.comment}</p>

      {/* ✅ Hiển thị nút sửa / xoá chỉ khi userId trùng */}
      {currentUserId === review.userId?._id && (
        <div className="flex gap-2 mt-2 text-sm">
          <button
            onClick={() => handleEdit(review)}
            className="text-blue-500 hover:underline"
          >
            Sửa
          </button>
          <button
            onClick={() => handleDelete(review._id)}
            className="text-red-500 hover:underline"
          >
            Xoá
          </button>
        </div>
      )}
    </div>
  </div>
))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded ${
                  pageNumber === page
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-pink-100"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
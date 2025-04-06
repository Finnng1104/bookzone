import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
];

const ReviewSection = () => {
  const { slug } = useParams();
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  // Format ngày đẹp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  // Lấy review list từ API
  const fetchReviews = async () => {
    if (!slug) return;
    setLoadingList(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews`, {
        params: { slug },
      });
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Không thể tải đánh giá!");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [slug]);

  // Submit review
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
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá!");
    } finally {
      setLoading(false);
    }
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
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>

      {/* List */}
      <div>
        <h4 className="font-medium mb-3">Danh sách đánh giá 📝</h4>

        {loadingList ? (
          <p className="text-gray-500 text-sm">Đang tải đánh giá...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <img
                  src={avatars[index % avatars.length]}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.userName || "Người dùng ẩn danh"}</p>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
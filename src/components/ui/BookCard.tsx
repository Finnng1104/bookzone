"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaHeart, FaStar, FaEye, FaRegHeart } from "react-icons/fa";
import { usePostWishlist, useDeleteWishlist, useGetWishlist } from "@/hooks/useWishlist";
import toast from "react-hot-toast";

interface BookCardProps {
  image: string;
  title: string;
  category: string[];
  slug: string;
  discount?: number;
  rating?: number;
  views?: number;
  isNew?: boolean;
  isHot?: boolean;
  bookId: string;
  userId: string;
}

interface WishlistItem {
  _id: string;
  bookId: string;
  userId: string;
}

const BookCard: React.FC<BookCardProps> = ({
  image,
  title,
  category,
  slug,
  discount,
  rating = 0,
  views = 0,
  isNew = false,
  isHot = false,
  bookId,
  userId,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const router = useRouter();
  const { data: wishlistData, refetch } = useGetWishlist(userId);
  const { mutateAsync: addToWishlistAsync } = usePostWishlist();
  const { mutateAsync: removeFromWishlistAsync } = useDeleteWishlist();

  const isInWishlist = wishlistData?.wishlist?.some((item: WishlistItem) => item.bookId === bookId);

  const handleWishlistClick = async () => {
    try {
    
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        toast.error("Bạn cần đăng nhập để thêm vào danh sách yêu thích.");
        router.push("/login");
        return;
      }
    
      const user = JSON.parse(userCookie);
    
      if (!user.id || !bookId) {
        toast.error("Không đủ thông tin người dùng hoặc sách.");
        return;
      }
    
      if (isInWishlist) {
        const wishlistItem = wishlistData?.wishlist?.find((item: WishlistItem) => item.bookId === bookId);
        if (wishlistItem) {
          await removeFromWishlistAsync(wishlistItem._id);
          toast.success("Đã xoá khỏi danh sách yêu thích!");
          refetch();
        }
      } else {
        const response = await addToWishlistAsync({ bookId, userId: user.id });
        if (response?.status === "Success") {
          toast.success("Đã thêm vào danh sách yêu thích!");
          refetch();
        }
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response) {
        const typedError = error as { response: { data: { message: string } } };
        toast.error(typedError.response.data.message);
      } else {
        toast.error("Có lỗi xảy ra khi xử lý yêu thích.");
      }
    }finally {
    }
  };

  const displayCategories =
    isHot || category.includes("Hot")
      ? category.filter((cat) => cat !== "Hot")
      : category;

  return (
    <div className="group w-full sm:w-[300px] 2xl:w-[220px] md:w-[240px] relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden shadow-sm">
        <Link href={`/ebook/${slug}`}>
          {!imgLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
          <Image
            src={image || "/images/default-product.jpg"}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              imgLoaded ? "group-hover:scale-110" : "scale-105"
            }`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoadingComplete={() => setImgLoaded(true)}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded shadow-md transition-all duration-300 hover:bg-teal-600">
              New
            </span>
          )}
          {(isHot || category.includes("Hot")) && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md transition-all duration-300 hover:bg-red-600">
              Hot
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md transition-all duration-300 hover:bg-red-600">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-[-50px] left-0 right-0 flex justify-end pr-2 transition-all duration-500 opacity-0 group-hover:bottom-2 group-hover:opacity-100">
          <button
            className={`bg-white p-2 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 shadow-md transform hover:scale-110 ${
              isInWishlist ? "text-red-500" : "text-gray-500"
            } `}
            onClick={handleWishlistClick}
          >
           {isInWishlist ? (
              <FaHeart size={16} />
            ) : (
              <FaRegHeart size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        <Link href={`/product/${slug}`}>
          <div className="space-y-2">
            {/* Category */}
            {displayCategories.length > 0 && (
              <p className="text-xs text-gray-500 uppercase line-clamp-2 h-[35px] tracking-wider">
                {displayCategories.map((cat, index) => (
                  <span key={index}>
                    {cat}
                    {index < displayCategories.length - 1 && " • "}
                  </span>
                ))}
              </p>
            )}

            {/* Title */}
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
              {title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={12}
                    className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({rating})</span>
            </div>

            {/* Views */}
            {views !== undefined && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FaEye size={14} className="text-gray-500" />
                <span>{views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
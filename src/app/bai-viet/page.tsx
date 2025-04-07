"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";

// Mock data hiển thị ban đầu
const mockBlogs = [
  {
    id: 1,
    title: "Khám phá sách Marketing 2025",
    slug: "marketing-2025",
    excerpt: "Giới thiệu cuốn sách marketing mới nhất giúp bạn làm chủ thị trường.",
    image: "/images/blog1.jpg",
    category: "Marketing",
  },
  {
    id: 2,
    title: "Sách kỹ năng sống đỉnh cao",
    slug: "ky-nang-song",
    excerpt: "Học cách quản lý thời gian và tăng năng suất mỗi ngày.",
    image: "/images/blog2.jpg",
    category: "Kỹ năng sống",
  },
  {
    id: 3,
    title: "Bí quyết tài chính cá nhân",
    slug: "tai-chinh-ca-nhan",
    excerpt: "Cẩm nang quản lý tài chính cho người mới bắt đầu.",
    image: "/images/blog3.jpg",
    category: "Tài chính",
  },
  {
    id: 4,
    title: "Review sách Khởi nghiệp",
    slug: "review-khoi-nghiep",
    excerpt: "Hành trình từ ý tưởng đến startup thành công.",
    image: "/images/blog4.jpg",
    category: "Khởi nghiệp",
  },
];

export default function BlogPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const category = searchParams.get("category") || "";

  const [blogs, setBlogs] = useState(mockBlogs); // Dùng mock data ban đầu
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Không loading vì có data mock

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, totalPages } = await getBlogs({ page, category });
        setBlogs(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Lỗi khi load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Blog mới nhất</h1>

      <CategoryFilter />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
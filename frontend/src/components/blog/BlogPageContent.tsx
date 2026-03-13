"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/blog/Pagination";
import { FaSpinner } from "react-icons/fa";
import { IBlog } from "@/types/blog.interface";

export default function BlogPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [displayedBlogs, setDisplayedBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      try {
        const categoryParam = searchParams.get("category") || "";

        const response = await fetch("/data/blogs.json");
        const data: IBlog[] = await response.json();

        let filteredBlogs = data;
        if (categoryParam) {
          filteredBlogs = data.filter((blog: IBlog) => blog.category === categoryParam);
        }

        const total = Math.ceil(filteredBlogs.length / perPage);
        setTotalPages(total);

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const blogsToDisplay = filteredBlogs.slice(start, end);
        setDisplayedBlogs(blogsToDisplay);

        if (currentPage > total && total > 0) {
          router.push("/bai-viet?page=1");
        }

      } catch (error) {
        console.error("Lỗi khi load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchParams, currentPage, router]);

  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
            <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
            <p className="text-lg">Đang tải danh sách bài viết...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
              {displayedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            <Pagination totalPages={totalPages} />
          </>
        )}
      </div>
    </>
  );
}
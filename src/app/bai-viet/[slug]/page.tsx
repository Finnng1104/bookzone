"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { IBlog } from "@/types/blog.interface";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();


  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/data/blogs.json");
        const data: IBlog[] = await response.json();
        const foundBlog = data.find((item) => item.slug === slug);

        if (!foundBlog) {
          router.push("/bai-viet");
          return;
        }

        setBlog(foundBlog);
      } catch (error) {
        console.error("Lỗi khi tải blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);

  if (loading) {
    return         <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
                    <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
                    <p className="text-lg">Đang tải bài viết...</p>
                </div>;
  }

  if (!blog) {
    return <p className="text-center text-red-500 py-10">Không tìm thấy bài viết.</p>;
  }

  const date = new Date(blog.date);
  const formattedDate = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
    <Breadcrumb currentTitle={blog.title} />
      <div className="container mx-auto px-4 py-10">
        <div className="w-full mx-auto bg-white p-8 rounded-xl shadow-md">
          {/* Tiêu đề */}
          <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4 leading-snug">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="text-gray-400 text-sm mb-6">
            {formattedDate} &nbsp;•&nbsp; Tác giả: {blog.author}
          </div>

          {/* Ảnh bài viết */}
          <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden shadow">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Nội dung */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

          {/* Quay lại */}
          <div className="mt-8">
            <Link
              href="/bai-viet"
              className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Quay lại danh sách bài viết
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
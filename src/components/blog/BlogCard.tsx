"use client"
import Link from "next/link";
import Image from "next/image";
import { IBlog } from "@/types/blog.interface"; 

interface BlogCardProps {
  blog: IBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const date = new Date(blog.date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("vi-VN", { month: "short" }).toUpperCase();

  return (
    <Link
      href={`/bai-viet/${blog.slug}`}
      className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group relative"
    >
      <div className="relative flex-shrink-0 w-2/5 h-40 md:h-48">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-2 left-2 bg-teal-600 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="text-sm font-bold leading-tight">{day}</div>
          <div className="text-[10px] uppercase leading-tight">{month}</div>
        </div>
      </div>

      <div className="p-4 w-3/5 flex flex-col justify-start">
        <h3 className="text-md md:text-lg font-semibold mb-1 group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[48px]">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
      </div>
    </Link>
  );
}
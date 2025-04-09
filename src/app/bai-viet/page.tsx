"use client";

import BlogPageContent from "@/components/blog/BlogPageContent";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-600">Đang tải trang blog...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}
"use client";

import { Suspense } from "react";
import BookLibrary from "@/components/book/BookLibrary";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function BookPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-600">Đang tải danh mục sách...</div>}>
      <>
        <Breadcrumb />
        <BookLibrary />
      </>
    </Suspense>
  );
}
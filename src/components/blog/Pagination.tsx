"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/blog?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => changePage(idx + 1)}
          className={`px-4 py-2 rounded-lg transition-all ${
            currentPage === idx + 1
              ? "bg-pink-600 text-white"
              : "bg-gray-200 hover:bg-pink-100 text-gray-700"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
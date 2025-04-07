"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Sách", "Marketing", "Khởi nghiệp", "Tài chính"];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 justify-center flex-wrap mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleFilter(cat)}
          className="px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-all"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Danh sách map slug không dấu -> Tiêu đề có dấu
const pathMap: Record<string, string> = {
  "thu-vien-sach": "Thư Viện Sách",
  "van-hoc": "Văn Học",
  "tieu-thuyet": "Tiểu Thuyết",
  "ky-nang-song": "Kỹ Năng Sống",
  "sach-hay": "Sách Hay",
  "sach-moi": "Sách Mới",
  "bai-viet": "Bài Viết",
  "lien-he": "Liên Hệ",
};

const Breadcrumb = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const pathArray = pathname.split("/").filter((item) => item); // Cắt đường dẫn thành mảng

  return (
    <div className="bg-bgBreadcrumb py-6">
      <div className=" w-full xl:container mx-auto px-4">
        {/* Tiêu đề chính (lấy từ path cuối cùng) */}
        <h2 className="text-white text-2xl font-bold capitalize">
          {pathMap[pathArray[pathArray.length - 1]] || pathArray[pathArray.length - 1]}
        </h2>

        {/* Breadcrumb */}
        <div className="text-white text-sm mt-2 flex space-x-2">
          <Link href="/" className="hover:underline">TRANG CHỦ</Link>
          {pathArray.map((item, index) => (
            <span key={index} className="flex items-center">
              <span className="mx-2">/</span>
              {index === pathArray.length - 1 ? (
                <span className="font-semibold uppercase">{pathMap[item] || item}</span>
              ) : (
                <Link href={`/${pathArray.slice(0, index + 1).join("/")}`} className="hover:underline">
                  {pathMap[item] || item}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
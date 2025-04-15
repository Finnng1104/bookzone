"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  currentTitle?: string;
}

// ✅ Bổ sung pathMap
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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentTitle }) => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((item) => item);

  const isDetailPage = !!currentTitle;

  return (
    <div className="bg-secondary hidden md:block py-8">
      <div className="w-full xl:container mx-auto px-4">
        <div className="text-white text-sm flex-wrap flex space-x-2">
          {/* Trang chủ */}
          <Link href="/" className="hover:underline">Trang chủ</Link>

          {/* Các cấp tiếp theo */}
          {pathArray.map((item, index) => {
            const isLast = index === pathArray.length - 1;
            const displayName = pathMap[item] || item.replace(/-/g, " ");

            // Nếu là chi tiết, và là cấp cuối, thì để currentTitle (dynamic)
            if (isLast && isDetailPage) {
              return (
                <span key={index} className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="font-semibold">{currentTitle}</span>
                </span>
              );
            }

            return (
              <span key={index} className="flex items-center">
                <span className="mx-2">/</span>
                <Link href={`/${pathArray.slice(0, index + 1).join("/")}`} className="hover:underline">
                  {displayName}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
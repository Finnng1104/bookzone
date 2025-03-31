import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  image: string;
  title: string;
  category: string;
  slug: string;
  highlight?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ image, title, category, slug, highlight = false }) => {
  return (
    <Link href={`/ebook/${slug}`} passHref>
      <div className="cursor-pointer w-full bg-white shadow-lg rounded-xl overflow-hidden max-w-xs sm:max-w-sm md:max-w-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
        {/* Ảnh bìa sách với kích thước cố định */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={image || "/images/default-book.jpg"} // ✅ Nếu ảnh lỗi, thay bằng ảnh mặc định
            alt={title}
            width={200} // ✅ Cố định kích thước ảnh
            height={300} // ✅ Đảm bảo tỷ lệ ảnh
            className="w-full h-full object-cover" // ✅ Hiển thị ảnh đầy đủ mà không bị méo
            unoptimized // ✅ Tránh lỗi Next.js không tải được ảnh từ server bên ngoài
            priority // ✅ Ưu tiên tải ảnh ngay lập tức
          />
        </div>

        {/* Nội dung sách */}
        <div className="p-4 text-center">
          <p className={`text-xs font-semibold uppercase ${highlight ? "text-green-500" : "text-gray-500"}`}>
            {category}
          </p>
          <h3 className="text-md font-bold text-gray-900 mt-1">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
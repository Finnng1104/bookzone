import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/banner/banner-gia-ke-thu-vien.jpg" // Thay bằng đường dẫn ảnh thực tế
          alt="Ebook Banner"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="brightness-50"
        />
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
          15,000+ Ebook với đa dạng chủ đề, đã được cập nhật lên hệ thống
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-200">
          Cùng với hơn <span className="font-semibold">6,500+</span> bạn đọc truy cập hàng tháng khác. !
        </p>

        {/* Nút CTA */}
        <div className="mt-4 flex space-x-4">
          <Link
            href="/library"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-md text-sm md:text-base transition flex items-center"
          >
            Vào thư viện →
          </Link>
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md text-sm md:text-base transition flex items-center"
          >
            Liên hệ ★
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
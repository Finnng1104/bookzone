import React from "react";
import Image from "next/image";

interface BookCardProps {
  image: string;
  title: string;
  category: string;
  highlight?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ image, title, category, highlight = false }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Ảnh bìa sách với hiệu ứng hover */}
      <div className="relative w-full h-80 sm:h-96 overflow-hidden group">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-110"
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
  );
};

export default BookCard;
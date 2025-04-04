import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  image: string;
  title: string;
  category: string[];
  slug: string;
  views?: number;
  favorites?: number;
  rating?: number;
  highlight?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  image,
  title,
  category,
  slug,
  views,
  rating,
  highlight = false,
}) => {
  return (
    <Link href={`/ebook/${slug}`} passHref>
      <div className=" w-[320px] sm:w-[300px] 2xl:w-[220px] md:w-[240px] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative w-full h-[300px] overflow-hidden bg-gray-100">
          <Image
            src={image || "/images/default-book.jpg"}
            alt={title}
            className="w-full h-full object-cover"
            fill
            sizes="100vw"
            unoptimized
            priority
          />
        </div>

        {category.includes("Hot") && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            HOT
          </div>
        )}

        <div className="p-4 text-center flex flex-col justify-between flex-1">
          <p
              className={`text-xs font-semibold line-clamp-2 uppercase h-8 ${
                highlight ? "text-green-500" : "text-gray-500"
              }`}
            >
              {Array.isArray(category)
                ? category.map((cat, index) => (
                    <span key={index}>
                      {cat}
                      {index < category.length - 1 && " • "}
                    </span>
                  ))
                : category}
          </p>

          <h3 className="text-md font-bold text-gray-900 mt-1 line-clamp-2 h-[48px]">
            {title}
          </h3>

          <div className="flex justify-center items-center gap-3 mt-2 text-sm text-gray-600">
            {views !== undefined && <span>👁 {views}</span>}
            {rating !== undefined && <span>⭐ {rating}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  image: string;
  title: string;
  description?: string;
  isSmall?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, description, isSmall = false }) => {
  return (
    <Link href="#" className={`block ${isSmall ? "flex items-center space-x-4 p-2" : ""}`}>
      <div className={`relative ${isSmall ? "w-24 h-16" : "w-full h-48 md:h-56"} overflow-hidden rounded-lg`}>
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="transition duration-300 hover:scale-105" />
      </div>
      <div className={`${isSmall ? "flex-1" : "mt-2"}`}>
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
        {!isSmall && description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
      </div>
    </Link>
  );
};

export default NewsCard;
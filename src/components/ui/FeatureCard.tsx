import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Icon */}
      <div className="relative w-14 h-14 flex-shrink-0">
        <Image src={icon} alt={title} layout="fill" objectFit="contain" />
      </div>

      {/* Nội dung */}
      <div>
        <h3 className="text-lg font-bold text-pink-600">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
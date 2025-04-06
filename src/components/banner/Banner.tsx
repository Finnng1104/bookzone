import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative bg-gray-100 h-[400px] md:h-[600px] lg:h-[728px] flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/banner/Untitled-1-1.png"
          alt="BookZone"
          fill 
          sizes="100vw"
          style={{ objectFit: "cover" }} 
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
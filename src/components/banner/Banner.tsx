import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full aspect-[16/6]">
      <Image
        src="/banner/Untitled-1-1.png"
        alt="BookZone"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    </div>
  );
};

export default Banner;
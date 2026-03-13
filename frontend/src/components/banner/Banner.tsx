"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const bannerImages = [
  "/banner/Untitled-1-1.png",
  "/banner/1 (1)-1.png",
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {bannerImages.map((src, index) => (
          <div key={index} className="relative w-full aspect-[16/6]">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
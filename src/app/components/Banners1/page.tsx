"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images: string[] = [
  "/images/riyansh-amrit-juice.webp",
  "/images/riyansh-amrit-juice.webp",
  "/images/riyansh-amrit-juice.webp",
];

const Banners1: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">

      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`Ayurvedic Banner ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-3">
              Natural Ayurvedic Care
            </h2>
            <p className="text-gray-200 text-sm md:text-lg max-w-xl">
              Discover the purity of herbs with Riyansh Multitrade Pvt Ltd.
            </p>

            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md">
              Shop Now →
            </button>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banners1;
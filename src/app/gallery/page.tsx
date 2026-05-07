"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Fix SSR issue with react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

// Sample data (make sure images exist in /public/images/)
const project = [
  { img: "/images/riyansh-diabo.webp", name: "Diabo Care" },
  { img: "/images/riyansh-amrit-juice.webp", name: "Amrit Rasayana" },
  { img: "/images/riyansh-diabo.webp", name: "Herbal Care" },
];

const Gallery = () => {
  const openLightbox = (index: number) => {
    console.log("Clicked image:", index);
  };

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-900 py-20 font-poppins"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Product Gallery
        </h2>
        <p className="text-center text-emerald-700 mb-10">
          Discover the essence of authentic Ayurveda
        </p>

        <Slider {...settings}>
          {project.map((item, index) => (
            <div key={index} className="px-2">
              <div
                onClick={() => openLightbox(index)}
                className="cursor-pointer"
              >
                <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div className="rounded-2xl overflow-hidden border-4 border-emerald-600 hover:border-amber-500 transition-all shadow-xl">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={300}
                      height={400}
                      className="object-cover h-80 w-full"
                    />
                  </div>
                  <h3 className="text-xl mt-4 text-emerald-800 font-bold">
                    {item.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
};

export default Gallery;
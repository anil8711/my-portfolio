"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Components

export default function Home() {
  return (
    <div>

      {/* 🌿 HERO SECTION */}
      <main className="bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
        <div className="flex items-center">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center py-16">

            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col z-10">
              <span className="w-20 h-1 bg-green-700 mb-4" />

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-green-900 leading-tight">
                Natural Healing <br />
                <span className="text-green-600">Ayurvedic Care</span>
              </h1>

              <p className="text-gray-700 mt-5 text-lg leading-relaxed">
                Discover the power of nature with{" "}
                <span className="font-semibold text-green-800">
                  Riyansh Multitrade Pvt. Ltd.
                </span>
                . Our Ayurvedic products are crafted to enhance wellness,
                boost immunity, and promote a healthy lifestyle.
              </p>

              {/* Buttons */}
              {/* <div className="flex mt-8 gap-4">
                <Link
                  href="#products"
                  className="px-6 py-3 rounded-lg bg-green-700 text-white font-semibold shadow-md hover:bg-green-800 transition"
                >
                  Explore Products
                </Link>

                <Link
                  href="#about"
                  className="px-6 py-3 rounded-lg border-2 border-green-700 text-green-700 font-semibold hover:bg-green-700 hover:text-white transition"
                >
                  Learn More
                </Link>
              </div> */}
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
              <Image
                src="/images/riyansh-amrit-juice.webp"
                alt="Ayurvedic Product"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition duration-500"
              />
            </div>

          </div>
        </div>
      </main>

      

      


    </div>
  );
}
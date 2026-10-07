"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowRight, IconMapPin } from "@tabler/icons-react";

interface Property {
  id: string;
  title: string;
  location: string;
  sqm: string;
  price: string;
  specs: string;
  image: string;
}

const properties: Property[] = [
  {
    id: "lakeside",
    title: "Lakeside Escape House",
    location: "Lake Pichola, Udaipur",
    sqm: "310 sqm",
    price: "$915,000",
    specs: "3 Beds | 3 Baths | Private Dock",
    image: "/assets/images/prop_lakeside.jpg",
  },
  {
    id: "city-view",
    title: "City View Apartment",
    location: "Worli, Mumbai",
    sqm: "95 sqm",
    price: "$670,000",
    specs: "2 Beds | 2 Baths | Balcony",
    image: "/assets/images/prop_apartment.jpg",
  },
  {
    id: "beach-villa",
    title: "Luxury Beach Villa",
    location: "Assagao, Goa",
    sqm: "240 sqm",
    price: "$2,050,000",
    specs: "5 Beds | 6 Baths | Infinity Pool",
    image: "/assets/images/prop_beach.jpg",
  },
  {
    id: "mountain-cabin",
    title: "Rustic Mountain Cabin",
    location: "Kasauli Hills, HP",
    sqm: "240 sqm",
    price: "$455,000",
    specs: "4 Beds | 4 Baths | Garden",
    image: "/assets/images/prop_mountain.jpg",
  },
  {
    id: "coastal-horizon",
    title: "Coastal Horizon Estate",
    location: "Alibaug Coast, MH",
    sqm: "380 sqm",
    price: "$2,850,000",
    specs: "4 Beds | 5 Baths | Terraces",
    image: "/assets/images/hero3.jpg",
  },
  {
    id: "forest-sanctuary",
    title: "Architectural Haven",
    location: "Golf Course Rd, Gurgaon",
    sqm: "320 sqm",
    price: "$1,780,000",
    specs: "3 Beds | 4 Baths | Atrium",
    image: "/assets/images/hero1.jpg",
  },
];

// Double list for a seamless, continuous 50% loop
const marqueeProperties = [...properties, ...properties];

const getCardOffsetClass = (index: number) => {
  const pattern = index % 3;
  if (pattern === 0) {
    // slightly up
    return "md:-translate-y-3 lg:-translate-y-3.5";
  } else if (pattern === 1) {
    // normal
    return "md:translate-y-0";
  } else {
    // down
    return "md:translate-y-3 lg:translate-y-3.5";
  }
};

export default function FeaturedProperties() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="properties"
      aria-label="Featured Properties"
      className="w-full bg-neutral-50 px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 overflow-hidden relative"
    >
      <span id="listings" className="sr-only" aria-hidden="true" />
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Section Header: Title & Subheading matching PrimeLocations */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-4 sm:mb-8 px-2 sm:px-4">
          <div className="max-w-2xl">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 leading-tight"
            >
              Featured Properties
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mt-1.5 sm:mt-2"
            >
              Discover signature architectural residences across our most sought-after enclaves, curated for design distinction and refined living.
            </motion.p>
          </div>
        </div>

        {/* Marquee Track Container (More compact height & margins) */}
        <div className="relative w-full overflow-hidden pt-4 md:pt-6 pb-6 md:pb-8">
          {/* Continuous Infinite Marquee Track (Stops on hover) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-3.5 sm:gap-4 md:gap-5 items-center w-max animate-marquee-left animate-marquee-track cursor-pointer"
            style={{
              willChange: "transform",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {marqueeProperties.map((property, index) => {
              const isFromBottom = index % 2 === 0;
              return (
                <motion.div
                  key={`${property.id}-${index}`}
                  initial={{ opacity: 0, y: isFromBottom ? 40 : -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 6) * 0.06,
                    ease: [0.25, 1, 0.5, 1] as const,
                  }}
                  className="shrink-0"
                >
                  {/* Compact Card */}
                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`w-[205px] sm:w-[225px] md:w-[245px] lg:w-[260px] xl:w-[275px] aspect-[3/3.8] rounded-xl sm:rounded-2xl overflow-hidden relative group border border-neutral-200/80 transition-all duration-500 ease-out ${getCardOffsetClass(
                      index
                    )} hover:border-[#3074FE]/40 shadow-xs hover:shadow-md`}
                  >
                    {/* Background Property Image */}
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 205px, (max-width: 768px) 225px, (max-width: 1024px) 245px, 275px"
                    />

                    {/* Inset Shadow Glow Overlay */}
                    <div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none z-30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_10px_0_rgba(255,255,255,0.25)]"
                      aria-hidden="true"
                    />

                    {/* Bottom Transparent Blurry Fade Background */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-44 sm:h-48 pointer-events-none z-10"
                      style={{
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to top, black 50%, rgba(0, 0, 0, 0.8) 75%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to top, black 50%, rgba(0, 0, 0, 0.8) 75%, transparent 100%)",
                      }}
                    />

                    {/* Bottom Content Overlay (Compact typography and padding) */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 flex flex-col justify-end z-20">
                      {/* Compact Location Pill */}
                      <div className="inline-flex place-content-start text-[8px] sm:text-[8px] text-[#3074FE] font-medium tracking-tight mb-0.5 truncate bg-white px-1 py-0.5 rounded-lg w-fit">
                        <IconMapPin className="w-2.5 h-2.5 text-[#3074FE] shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] truncate">
                        {property.title}
                      </h3>

                      {/* Badges: sqm and Price */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-full bg-white text-[9.5px] sm:text-[10px] font-medium text-black shadow-2xs">
                          {property.sqm}
                        </span>
                        <span className="text-[11px] sm:text-xs font-semibold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                          {property.price}
                        </span>
                      </div>

                      {/* Specs text */}
                      <p className="text-[9.5px] sm:text-[10px] text-neutral-200 font-normal tracking-wide pt-0.5 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                        {property.specs}
                      </p>

                      {/* Compact "View Details" Pill Button */}
                      <Link
                        href={`#${property.id}`}
                        className="w-full py-1.5 rounded-full bg-[#3074FE] hover:bg-[#2563EB] text-white text-[10.5px] sm:text-[11px] font-semibold tracking-tight transition-all duration-300 flex items-center justify-center mt-2 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_10px_0_rgba(255,255,255,0.25),_0_2px_8px_-1px_rgba(48,116,254,0.35)] active:scale-[0.98]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View All Button Below Cards in Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="w-full flex justify-center items-center pt-2 sm:pt-4"
        >
          <Link
            href="#listings"
            className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-950 bg-neutral-100/90 hover:bg-neutral-950 hover:text-neutral-50 text-neutral-900 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 active:scale-[0.98] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] "
          >
            <span>View All</span>
            <IconArrowRight
              size={15}
              stroke={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowUpRight } from "@tabler/icons-react";

interface LocationItem {
  id: string;
  name: string;
  state: string;
  propertyCount: string;
  priceStart: string;
  image: string;
  popularEnclaves: string;
  colSpanDesktop: string;
}

const locationsData: LocationItem[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    propertyCount: "340+ Listings",
    priceStart: "From ₹4.5 Cr",
    image: "/assets/images/mumbai1.jpg",
    popularEnclaves: "South Mumbai • Bandra West • Worli Sea Face",
    colSpanDesktop: "lg:col-span-7",
  },
  {
    id: "goa",
    name: "Goa",
    state: "Coastal Sanctuary",
    propertyCount: "185+ Listings",
    priceStart: "From ₹2.8 Cr",
    image: "/assets/images/goa.jpg",
    popularEnclaves: "Assagao • Anjuna • Candolim",
    colSpanDesktop: "lg:col-span-5",
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR",
    state: "National Capital Region",
    propertyCount: "260+ Listings",
    priceStart: "From ₹6.2 Cr",
    image: "/assets/images/delhi.jpg",
    popularEnclaves: "Golf Course Rd • Chanakyapuri • DLF Phase V",
    colSpanDesktop: "lg:col-span-4",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    propertyCount: "210+ Listings",
    priceStart: "From ₹3.4 Cr",
    image: "/assets/images/bengaluru.jpg",
    popularEnclaves: "Indiranagar • Sadashivanagar • Whitefield",
    colSpanDesktop: "lg:col-span-4",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    propertyCount: "95+ Listings",
    priceStart: "From ₹1.8 Cr",
    image: "/assets/images/jaipur.jpg",
    popularEnclaves: "Civil Lines • C-Scheme • Tonk Road",
    colSpanDesktop: "lg:col-span-4",
  },
];

export default function PrimeLocations() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Metros", "Coastal", "Heritage"];

  const filteredLocations = locationsData.filter((loc) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Coastal") return loc.id === "goa";
    if (activeFilter === "Heritage") return loc.id === "jaipur";
    if (activeFilter === "Metros") return ["mumbai", "delhi-ncr", "bengaluru"].includes(loc.id);
    return true;
  });

  return (
    <section
      id="locations"
      aria-label="Prime Locations"
      className="w-full bg-neutral-50 px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-14 lg:py-20 overflow-hidden relative"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6 sm:mb-10">
          <div className="max-w-2xl">
            {/* Pill Tag */}
            {/* <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/80 shadow-xs mb-2.5 sm:mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#3074FE] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-neutral-800 uppercase">
                Premier Destinations
              </span>
            </motion.div> */}

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 leading-tight"
            >
              Explore Prime Locations
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mt-1.5 sm:mt-2"
            >
              Discover signature architectural residences across India’s most prestigious pin codes, verified for distinction and enduring legacy.
            </motion.p>
          </div>

          {/* Filter Pill Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1.5 p-1 bg-neutral-200/60 rounded-full w-fit backdrop-blur-md self-start md:self-end"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Compact, Clean Bento Grid of Prime Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {filteredLocations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.25, 1, 0.5, 1] }}
              className={`w-full ${loc.colSpanDesktop} group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white transition-all duration-500 ease-out hover:border-[#3074FE]/40 h-[260px] sm:h-[280px] md:h-[295px] shadow-md shadow-black/10 ring-1 ring-black/10`}
            >
              {/* Background City Image */}
              <Image
                src={loc.image}
                alt={`${loc.name} Luxury Real Estate`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Inset Glow Overlay */}
              <div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none z-10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_10px_0_rgba(255,255,255,0.25)]"
                aria-hidden="true"
              />

              {/* Gentle gradient overlay for contrast behind white shelf */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom White Glass Shelf */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-20 flex flex-col justify-end">
                <div
                  className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 flex flex-col gap-1.5 transition-all duration-300"
                  style={{
                    boxShadow:
                      "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 10px 0 rgba(255, 255, 255, 0.5), 0 4px 16px -2px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate">
                      <div className="flex items-baseline gap-1.5">
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight leading-none">
                          {loc.name}
                        </h3>
                        <span className="text-[11px] sm:text-xs text-neutral-500 font-normal">
                          ({loc.state})
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-500 line-clamp-1 mt-1 font-normal">
                        {loc.popularEnclaves}
                      </p>
                    </div>

                    {/* Explore City Link Button - #3074FE with requested inset glow */}
                    <Link
                      href="#listings"
                      className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center text-white shrink-0 transition-all duration-300 ease-out hover:scale-105 hover:brightness-110 active:scale-95 cursor-pointer"
                      aria-label={`Explore properties in ${loc.name}`}
                      style={{
                        backgroundColor: "#3074FE",
                        boxShadow:
                          "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                      }}
                    >
                      <IconArrowUpRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>

                  {/* Divider & Pricing / Listings Guide */}
                  <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-normal text-[11px]">
                      {loc.propertyCount}
                    </span>
                    <span className="font-semibold text-neutral-900 text-xs">
                      {loc.priceStart}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

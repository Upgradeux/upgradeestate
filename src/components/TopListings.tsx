"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IconHeart,
  IconHeartFilled,
  IconMapPin,
  IconChevronDown,
  IconArrowUpRight,
} from "@tabler/icons-react";

interface TopListing {
  id: string;
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
}

const row1Properties: TopListing[] = [
  {
    id: "green-pavilion",
    title: "Green Hangout Place",
    location: "Assagao, Goa",
    price: "$4,200.00",
    description:
      "Discover a tranquil oasis nestled amidst lush coastal flora. This charming sanctuary offers the perfect blend of modern comfort and rustic quiet.",
    image: "/assets/images/hero-5.jpg",
  },
  {
    id: "glass-monolith",
    title: "Vintage Minimalist Villa",
    location: "Worli Sea Face, Mumbai",
    price: "$19,500.00",
    description:
      "A statement oceanfront duplex featuring floor-to-ceiling acoustic glass, sunset horizons, and imported stone finishes.",
    image: "/assets/images/hero-5.jpg",
  },
  {
    id: "blissful-estate",
    title: "Blissful Horizon Residence",
    location: "Golf Course Rd, Gurgaon",
    price: "$22,500.00",
    description:
      "Architecturally cantilevered sky sanctuary with panoramic fairway vistas, private elevator foyer, and bespoke concierge access.",
    image: "/assets/images/hero3.jpg",
  },
  {
    id: "azure-cove",
    title: "Azure Cove Beach Manor",
    location: "Candolim, Coastal Goa",
    price: "$14,800.00",
    description:
      "Direct beach-access Mediterranean villa bordered by private palm groves, heated infinity plunge pool, and sunset dining pergolas.",
    image: "/assets/images/prop_beach.jpg",
  },
];

const row2Properties: TopListing[] = [
  {
    id: "glass-atrium",
    title: "The Glass Atrium Manor",
    location: "Lake Pichola, Udaipur",
    price: "$32,000.00",
    description:
      "A regal sanctuary celebrating heritage stonework paired with contemporary glass pavilions, private boat dock, and serene lake sunsets.",
    image: "/assets/images/prop_lakeside.jpg",
  },
  {
    id: "skyline-loft",
    title: "Skyline Duplex Loft",
    location: "Bandra West, Mumbai",
    price: "$12,500.00",
    description:
      "Ultra-chic metropolitan aerie featuring industrial bronze accents, wrap-around sunset terraces, and automated gallery lighting.",
    image: "/assets/images/prop_apartment.jpg",
  },
  {
    id: "forest-sanctuary",
    title: "Cantilevered Forest Villa",
    location: "Kasauli Hills, HP",
    price: "$28,000.00",
    description:
      "Perched among whispering pines, this timber-and-glass retreat features radiant floor heating and 360-degree Himalayan ridges.",
    image: "/assets/images/hero1.jpg",
  },
  {
    id: "solarium-estate",
    title: "The Solarium Residence",
    location: "Indiranagar, Bengaluru",
    price: "$16,200.00",
    description:
      "Bespoke urban oasis featuring internal courtyard water bodies, vertical gardens, and climate-responsive louver facades.",
    image: "/assets/images/bengaluru.jpg",
  },
];

// Double lists (4x repeats) for perfectly seamless infinite loop on any screen width
const topMarqueeData = [
  ...row1Properties,
  ...row1Properties,
  ...row1Properties,
  ...row1Properties,
];
const bottomMarqueeData = [
  ...row2Properties,
  ...row2Properties,
  ...row2Properties,
  ...row2Properties,
];

export default function TopListings() {
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [topHovered, setTopHovered] = useState(false);
  const [bottomHovered, setBottomHovered] = useState(false);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAnyExpanded = Object.values(expandedIds).some(Boolean);
  const isTopPaused = topHovered || isAnyExpanded;
  const isBottomPaused = bottomHovered || isAnyExpanded;

  const handleTopMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setTopHovered(true);
    }
  };

  const handleBottomMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setBottomHovered(true);
    }
  };

  return (
    <section
      id="top-listings"
      aria-label="Top Listings"
      className="w-full bg-neutral-50 py-6 sm:py-8 md:py-10 overflow-hidden relative"
    >
      {/* Section Header: Preserved padding container for mobile */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex md:hidden flex-col gap-2 mb-3 px-2 sm:px-4">
          <div className="max-w-2xl">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 leading-tight"
            >
              Top Listings
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mt-1.5 sm:mt-2"
            >
              Stay ahead of the curve with our latest curated property listings. From modern condos to bespoke coastal sanctuaries, explore our newest additions.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Marquee Rows: 100% Full Width, 0 space on left and right */}
      <div className="w-full flex flex-col gap-4 sm:gap-5">
        {/* ROW 1: Full-width right-to-left marquee flowing BEHIND Top Listings card in foreground */}
        <div className="relative w-full h-[280px] sm:h-[300px] md:h-[310px] flex items-center overflow-hidden">
          {/* Top Listings Intro CTA Card - Sits flush at the left end (left-0) in foreground z-20 on desktop, hidden on mobile */}
          <div className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-[205px] sm:w-[240px] md:w-[270px] bg-neutral-50 rounded-br-2xl rounded-tr-2xl p-4 sm:p-5 border border-neutral-300/90 shadow-[6px_0_20px_-2px_rgba(0,0,0,0.08),_0_2px_8px_rgba(0,0,0,0.04)] flex-col justify-between shrink-0"> 
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <h3 className="text-xl sm:text-2xl lg:text-[23px] font-medium text-neutral-900 tracking-tight leading-tight">
                Top Listings
              </h3>

              <p className="text-[10px] sm:text-xs text-neutral-500 font-normal leading-tight">
                Stay ahead of the curve with our latest curated property listings. From modern condos to bespoke coastal sanctuaries, explore our newest additions.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="#listings"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3074FE] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] border border-neutral-300 text-neutral-50 text-xs font-medium transition-all shadow-2xs hover:shadow-xs group w-fit"
              >
                <span>Search more</span>
                <IconArrowUpRight className="w-3.5 h-3.5 text-neutral-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Marquee Track: Full width, cards scroll continuously Right to Left BEHIND the intro card */}
          <div
            className="w-full h-full overflow-hidden flex items-center z-10"
            onMouseEnter={handleTopMouseEnter}
            onMouseLeave={() => setTopHovered(false)}
            onTouchStart={() => setTopHovered(false)}
            onTouchEnd={() => setTopHovered(false)}
          >
            <div
              className="flex gap-3.5 sm:gap-4 items-center w-max animate-marquee-left touch-pan-y"
              style={{
                animationDuration: "48s",
                animationPlayState: isTopPaused ? "paused" : "running",
              }}
            >
              {topMarqueeData.map((item, idx) => (
                <PropertyCard
                  key={`top-${item.id}-${idx}`}
                  item={item}
                  isLiked={!!likedIds[item.id]}
                  isExpanded={!!expandedIds[item.id]}
                  onToggleLike={() => toggleLike(item.id)}
                  onToggleExpand={() => toggleExpand(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Bottom Cards Marquee Track scrolling Left to Right (Straight overflow-hidden edges) */}
        <div
          className="relative w-full overflow-hidden h-[280px] sm:h-[300px] md:h-[310px] flex items-center"
          onMouseEnter={handleBottomMouseEnter}
          onMouseLeave={() => setBottomHovered(false)}
          onTouchStart={() => setBottomHovered(false)}
          onTouchEnd={() => setBottomHovered(false)}
        >
          <div
            className="flex gap-3.5 sm:gap-4 items-center w-max animate-marquee-right touch-pan-y"
            style={{
              animationDuration: "48s",
              animationPlayState: isBottomPaused ? "paused" : "running",
            }}
          >
            {bottomMarqueeData.map((item, idx) => (
              <PropertyCard
                key={`bottom-${item.id}-${idx}`}
                item={item}
                isLiked={!!likedIds[item.id]}
                isExpanded={!!expandedIds[item.id]}
                onToggleLike={() => toggleLike(item.id)}
                onToggleExpand={() => toggleExpand(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Button Below Cards in Center with container padding */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="w-full flex justify-center items-center pt-4 sm:pt-6"
        >
          <Link
            href="#listings"
            className="group inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-neutral-300 hover:border-neutral-950 bg-neutral-100/90 hover:bg-neutral-950 hover:text-neutral-50 text-neutral-900 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 active:scale-[0.98] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)]"
          >
            <span>View All</span>
            <IconArrowUpRight className="w-4 h-4 text-neutral-700 group-hover:text-neutral-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function PropertyCard({
  item,
  isLiked,
  isExpanded,
  onToggleLike,
  onToggleExpand,
}: {
  item: TopListing;
  isLiked: boolean;
  isExpanded: boolean;
  onToggleLike: () => void;
  onToggleExpand: () => void;
}) {
  return (
    <div className="relative shrink-0 w-[205px] sm:w-[220px] md:w-[235px] lg:w-[245px] h-[280px] sm:h-[300px] md:h-[310px] rounded-2xl overflow-hidden group border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-end select-none">
      {/* Background Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="250px"
      />

      {/* Signature User Inset Shadow Overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)]"
        aria-hidden="true"
      />

      {/* Subtle Gradient Overlay for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top-Right Heart / Favorite Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike();
        }}
        aria-label={`Save ${item.title}`}
        className="absolute top-2.5 right-2.5 z-30 w-7 h-7 rounded-lg bg-white backdrop-blur-md border border-white/70 flex items-center justify-center text-neutral-500 hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
      >
        {isLiked ? (
          <IconHeartFilled className="w-5 h-5 text-red-500" />
        ) : (
          <IconHeart className="w-4 h-4" />
        )}
      </button>

      {/* Bottom Floating White Card-in-Card (Expands smoothly on arrow click) */}
      <motion.div
        layout
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 m-2 sm:m-2.5 p-2.5 sm:p-3 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] flex flex-col gap-0.5 transition-all"
      >
        {/* Row 1: Title & Action Chevron Button */}
        <div className="flex items-center justify-between gap-1.5">
          <h3 className="text-xs sm:text-[12.5px] font-semibold text-neutral-900 tracking-tight truncate">
            {item.title}
          </h3>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
            className="w-5.5 h-5.5 rounded-md border border-neutral-200/90 hover:border-neutral-400 bg-white/80 flex items-center justify-center text-neutral-700 shrink-0 transition-colors cursor-pointer"
          >
            <IconChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Row 2: Location */}
        <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-neutral-500 font-normal truncate">
          <IconMapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400 shrink-0" />
          <span className="truncate">{item.location}</span>
        </div>

        {/* Expandable Details Drawer (matches reference image 2) */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[10px] text-neutral-600 font-normal leading-relaxed pt-1.5 pb-1 border-t border-neutral-100/90 mt-1 line-clamp-4">
                {item.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 3: Price Tag */}
        <div className="pt-0.5 flex justify-end items-center">
          <span className="text-[11px] sm:text-xs font-bold text-neutral-900 tracking-tight">
            {item.price}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

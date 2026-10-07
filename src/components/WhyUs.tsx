"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { IconArrowUpRight } from "@tabler/icons-react";

const metrics = [
  {
    id: "properties",
    label: "PROPERTIES LISTED",
    stat: "24K+",
    image: "/assets/images/prop_apartment.jpg",
    alt: "Modern Architectural Property",
  },
  {
    id: "satisfaction",
    label: "CLIENT SATISFACTION",
    stat: "98%",
    image: "/assets/images/keys_handover.jpg",
    alt: "Keys Handover to Homeowner",
  },
  {
    id: "clients",
    label: "HAPPY CLIENTS",
    stat: "9.6K+",
    image: "/assets/images/client_consultation.jpg",
    alt: "Real Estate Client Consultation",
  },
];

const partners = [
  {
    id: "lumina",
    name: "Lumina",
    render: () => (
      <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-950">
        <svg
          className="w-3.5 h-3.5 text-neutral-900 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M12 2L2 12L12 22L22 12L12 2Z" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
        <span className="font-sans tracking-tighter font-bold text-[11px] sm:text-xs md:text-sm uppercase">
          LUMINA
        </span>
      </div>
    ),
  },
  {
    id: "vertex",
    name: "Vertex",
    render: () => (
      <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-950">
        <svg
          className="w-3.5 h-3.5 text-neutral-900 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M12 3L2 21H22L12 3Z" />
          <path d="M12 11L7 21H17L12 11Z" fill="currentColor" fillOpacity="0.2" />
        </svg>
        <span className="font-sans tracking-tight font-medium text-[11px] sm:text-xs md:text-sm uppercase">
          VERTEX
        </span>
      </div>
    ),
  },
  {
    id: "aura",
    name: "Aura",
    render: () => (
      <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-950">
        <svg
          className="w-3.5 h-3.5 text-neutral-900 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
        <span className="font-serif text-[11px] sm:text-xs md:text-sm tracking-normal uppercase">
          AURA
        </span>
      </div>
    ),
  },
  {
    id: "kroma",
    name: "Kroma",
    render: () => (
      <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-950">
        <svg
          className="w-3.5 h-3.5 text-neutral-900 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" fillOpacity="0.35" />
        </svg>
        <span className="font-sans font-extrabold text-[11px] sm:text-xs md:text-sm tracking-tight uppercase">
          KROMA
        </span>
      </div>
    ),
  },
  {
    id: "verdant",
    name: "Verdant",
    render: () => (
      <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-950">
        <svg
          className="w-3.5 h-3.5 text-neutral-900 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
        </svg>
        <span className="font-serif italic font-semibold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase">
          VERDANT
        </span>
      </div>
    ),
  },
  {
    id: "solis",
    name: "Solis",
    render: () => (
      <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-950">
        <svg
          className="w-3.5 h-3.5 text-neutral-900 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M4 15A8 8 0 0 1 20 15" />
          <line x1="12" y1="4" x2="12" y2="7" />
          <line x1="5.6" y1="7.6" x2="7.8" y2="9.8" />
          <line x1="18.4" y1="7.6" x2="16.2" y2="9.8" />
          <line x1="2" y1="18" x2="22" y2="18" />
        </svg>
        <span className="font-sans font-black text-[11px] sm:text-xs md:text-sm tracking-tight uppercase">
          SOLIS
        </span>
      </div>
    ),
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      aria-label="Why Choose Us"
      className="w-[calc(100%+1rem)] -mx-2 relative bg-neutral-50 pt-8 sm:pt-12 md:pt-14 overflow-hidden"
    >
      {/* Top Header: Serif Title + Explanatory Paragraph */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-6 sm:mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-neutral-950 tracking-tight">
              Why Choose Us
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="max-w-xl text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed"
          >
            Experience a seamless home buying journey with carefully curated properties, clear pricing, and professional guidance designed to help you find the perfect place to call home.
          </motion.p>
        </div>
      </div>

      {/* Full-Width Panoramic Architectural Image (Edge-to-Edge, NO Rounded Corners) */}
      <div className="relative w-full min-h-[480px] sm:min-h-[460px] md:min-h-0 md:h-[480px] lg:h-[500px] flex flex-col justify-end pt-12 sm:pt-16 md:pt-0">
        {/* Edge-to-edge Background Image */}
        <Image
          src="/assets/images/hero-5.jpg"
          alt="Luxury Architecture"
          fill
          sizes="100vw"
          className="object-cover object-center select-none"
          priority={false}
        />

        {/* Subtle Darkening Overlay */}
        <div
          className="absolute inset-0 bg-black/15 pointer-events-none"
          aria-hidden="true"
        />

        {/* Center Card Container touching the bottom edge */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 mt-auto">
          {/* Main White Card: Top rounded only, touches bottom flush */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-t-2xl sm:rounded-t-3xl rounded-b-none border-t border-x border-neutral-200/90 shadow-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 -15px 40px -10px rgba(0, 0, 0, 0.15), 0 -4px 12px -2px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Top Metrics Row: 3 Columns on md+, stacked & compact on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
              {metrics.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-between gap-2.5 sm:gap-3 group cursor-pointer transition-colors duration-200 hover:bg-neutral-50/50"
                >
                  {/* Metric Top Label + Diagonal Arrow */}
                  <div className="flex items-center justify-between text-neutral-700">
                    <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-neutral-500 uppercase">
                      {item.label}
                    </span>
                    <IconArrowUpRight className="w-3.5 h-3.5 text-neutral-800 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3074FE]" />
                  </div>

                  {/* Stat Number + Image Thumbnail */}
                  <div className="flex items-center justify-between gap-3 mt-0.5 sm:mt-1">
                    <span className="text-2xl sm:text-3xl lg:text-[44px] font-normal tracking-tight text-neutral-900 leading-none">
                      {item.stat}
                    </span>

                    <div className="relative w-14 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 overflow-hidden shadow-xs shrink-0 border border-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 56px, 80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtitle Line */}
            <div className="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center border-t border-neutral-100 bg-white">
              <p className="text-[10px] sm:text-xs text-neutral-500 font-normal max-w-xl mx-auto leading-relaxed">
                Join trusted organizations collaborating with us to drive impactful sustainability and compliance solutions
              </p>
            </div>

            {/* Bottom Partners Logo Bar: 3 columns on mobile/tablet, 6 columns on lg */}
            <div className="border-t border-neutral-100 grid grid-cols-3 lg:grid-cols-6 bg-white">
              {partners.map((partner) => {
                const LogoComponent = partner.render;
                return (
                  <div
                    key={partner.id}
                    className="h-11 sm:h-12 md:h-14 flex items-center justify-center p-2 sm:p-3 transition-colors duration-200 hover:bg-neutral-50 border-r border-b lg:border-b-0 border-neutral-100 [&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:last-child]:border-r-0 group cursor-pointer"
                  >
                    <LogoComponent />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { IconQuoteFilled } from "@tabler/icons-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "lester",
    name: "Lester Walsh",
    role: "Villa Purchaser • Goa",
    avatar: "/assets/images/avatar1.jpg",
    quote:
      "I am thoroughly impressed with the architectural discretion and precision. UPGRADE didn't just present extraordinary residences—they orchestrated private off-market viewings and guided us through spatial acoustics, making the entire journey effortless.",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Penthouse Collector • Worli",
    avatar: "/assets/images/avatar4.jpg",
    quote:
      "The curation here is truly singular in the luxury market. Every residence brought to our table carried authentic architectural pedigree, uncompromised material finishes, and sweeping panoramic horizons. Their advisory team saved us months of searching.",
  },
  {
    id: "marcus",
    name: "Marcus Sterling",
    role: "Private Investor • Delhi NCR",
    avatar: "/assets/images/avatar2.jpg",
    quote:
      "In ultra-prime real estate, discretionary access and absolute integrity are everything. The UPGRADE team secured a confidential estate acquisition that was entirely invisible on public listings, managing legal compliance and valuation benchmarks flawlessly.",
  },
  {
    id: "kavita-dev",
    name: "Kavita & Dev",
    role: "Estate Owners • Jaipur",
    avatar: "/assets/images/avatar3.jpg",
    quote:
      "Finding an ancestral sanctuary that harmonized historical craftsmanship with modern climate engineering felt nearly impossible until UPGRADE stepped in. Their advisors respect architectural legacy as much as we do, ensuring complete clarity at every step.",
  },
];

export default function Testimonials() {
  const [activeId, setActiveId] = useState<string>(testimonials[0].id);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Snappy auto-cycling every 2.8 seconds (resets timer on manual click, pauses only when hovering avatar controls)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveId((prevId) => {
        const currentIndex = testimonials.findIndex((t) => t.id === prevId);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeId, isPaused]);

  const activeTestimonial =
    testimonials.find((t) => t.id === activeId) ?? testimonials[0];

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden relative select-none"
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Section Heading: Centered & Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-neutral-950">
            Our customers speak
          </h2>
        </motion.div>

        {/* Centered Quotation Icon */}
        <div
          className="text-neutral-900 mb-4 sm:mb-5 select-none"
          aria-hidden="true"
        >
          <IconQuoteFilled className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-neutral-900 mx-auto" />
        </div>

        {/* Zero-Jump Quote Text Container with subtle, snappy blur/fade */}
        <div className="w-full min-h-[145px] sm:min-h-[115px] md:min-h-[95px] flex items-center justify-center px-2 sm:px-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-700 font-normal leading-relaxed text-center max-w-xl mx-auto"
            >
              {activeTestimonial.quote}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Client Selector Row: Centered single-line row, compact, never wraps or jumps */}
        <div
          className="mt-6 sm:mt-8 flex items-center justify-center w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <LayoutGroup id="testimonials-avatars-compact">
            <div className="flex items-center justify-center flex-nowrap gap-2 sm:gap-2.5 md:gap-3 py-1">
              {testimonials.map((t) => {
                const isActive = t.id === activeId;

                if (isActive) {
                  return (
                    <motion.button
                      key={t.id}
                      layout
                      onClick={() => setActiveId(t.id)}
                      className="rounded-full bg-[#3074FE] pl-1 pr-3 sm:pl-1.5 sm:pr-4 md:pl-2 md:pr-4.5 py-1 sm:py-1.5 flex items-center gap-2 sm:gap-2.5 cursor-pointer shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)] text-left focus:outline-none transition-shadow shrink-0"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        mass: 0.8,
                      }}
                    >
                      {/* Compact Active Avatar */}
                      <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-8.5 md:h-8.5 rounded-full overflow-hidden shrink-0 border border-white/40 shadow-xs">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>

                      {/* Compact Active Name & Role */}
                      <motion.div
                        initial={{ opacity: 0, x: -3 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -3 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="flex flex-col pr-0.5 text-left min-w-0"
                      >
                        <span className="font-semibold text-white text-[11px] sm:text-xs md:text-sm tracking-tight leading-tight whitespace-nowrap">
                          {t.name}
                        </span>
                        <span className="text-white/80 text-[9px] sm:text-[10px] md:text-[11px] font-normal leading-tight mt-0.5 whitespace-nowrap">
                          {t.role}
                        </span>
                      </motion.div>
                    </motion.button>
                  );
                }

                return (
                  <motion.button
                    key={t.id}
                    layout
                    onClick={() => setActiveId(t.id)}
                    className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-8.5 md:h-8.5 rounded-full overflow-hidden shrink-0 border border-neutral-300 hover:border-neutral-500 transition-all duration-200 cursor-pointer focus:outline-none opacity-65 hover:opacity-100 hover:scale-105 active:scale-95"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8,
                    }}
                    title={`View testimonial from ${t.name}`}
                    aria-label={`View testimonial from ${t.name}`}
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}



import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import PropertySearchBar from "./PropertySearchBar";

export default function Hero() {
  return (
    <section key="static-hero" id="home" className="relative w-full h-full flex-1 flex flex-col justify-between overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 min-h-0">
      {/* Hero Background Image */}
      <Image
        src="/assets/images/hero-6.jpg"
        alt="Upgrade Luxury Architectural Residences"
        fill
        priority
        sizes="100vw"
        className="object-cover select-none"
      />

      {/* Subtle, low-opacity black fade from bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-44 sm:h-72 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Integrated Navigation Bar */}
      <Navbar />

      {/* Center-Left Text Content (Elevate every horizon) */}
      <div className="relative z-20 w-full px-5 sm:px-10 md:px-12 lg:px-14 my-auto  max-w-5xl flex flex-col gap-1.5 sm:gap-2 pt-8 sm:pt-12 md:pt-14 lg:pt-16">
        {/* Row 1: Bold Sans Headline + Social Proof Stack (Desktop only for badge) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[56px] font-semibold tracking-tight text-neutral-100 leading-tight sm:leading-none drop-shadow-sm">
            Find Your Dream Home
          </h1>

          {/* Social Proof Avatar Stack Badge - Desktop/Tablet */}
          <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-100/85 backdrop-blur-md border border-neutral-100/25 shadow-sm">
            <div className="flex items-center">
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-neutral-50">
                <Image
                  src="/assets/images/avatar1.jpg"
                  alt="Private Resident"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-neutral-50 -ml-2">
                <Image
                  src="/assets/images/avatar2.jpg"
                  alt="Private Resident"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-neutral-50 -ml-2">
                <Image
                  src="/assets/images/avatar3.jpg"
                  alt="Private Resident"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-800 leading-none font-semibold">
                3,400+
              </span>
              <span className="text-[10px] text-neutral-700 font-normal leading-tight mt-0.5">
                Satisfied Clients
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Editorial Sans Accent (Wraps naturally on mobile) */}
        <div className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] tracking-tight leading-snug sm:leading-none whitespace-normal sm:whitespace-nowrap -mt-0.5 drop-shadow-sm">
          <span className="font-regular font-serif italic text-neutral-50 mr-2 sm:mr-3">
            across prime locations.
          </span>
          <span className="font-semibold text-neutral-50">
            Iconic living
          </span>
        </div>
      </div>

      {/* Bottom Area: Browse Listings / Mobile Badge & Property Search Bar */}
      <div className="relative z-20 w-full px-3 pb-3 sm:px-8 sm:pb-5 md:px-10 md:pb-5 lg:px-12 lg:pb-6 mt-auto flex flex-col gap-2.5 sm:gap-3">
        {/* Right-aligned row: Browse Listings (Desktop) / Satisfied Clients Badge (Mobile) */}
        <div className="flex justify-end w-full">
          {/* Desktop/Tablet: Browse Listings */}
          <Link
            href="#listings"
            className="hidden sm:inline-flex items-center -space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
            aria-label="Browse Listings"
          >
            {/* Left Pill */}
            <div
              className="h-10 sm:h-11 px-5 rounded-full bg-white/95 border border-white/80 text-neutral-900 font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center group-hover:text-[#3074FE] transition-colors duration-300"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 10px 0 rgba(255, 255, 255, 0.6), 0 4px 16px -2px rgba(0, 0, 0, 0.08)",
              }}
            >
              <span>Browse Listings</span>
            </div>

            {/* Right Circular Icon Badge */}
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white flex items-center justify-center transition-all duration-300 ease-out z-10 -translate-y-1 sm:-translate-y-1 -rotate-10 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 group-hover:brightness-110"
              style={{
                backgroundColor: "#3074FE",
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 12px 0 rgba(255, 255, 255, 0.3), 0 4px 16px -2px rgba(48, 116, 254, 0.4)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white transition-transform duration-300 ease-out group-hover:scale-110"
                aria-hidden="true"
              >
                <path
                  d="M11 5.5C8 4.2 4.5 4.5 3 5.5V19C4.5 18 8 17.7 11 19V5.5Z"
                  fill="currentColor"
                />
                <path
                  d="M13 5.5C16 4.2 19.5 4.5 21 5.5V19C19.5 18 16 17.7 13 19V5.5Z"
                  fill="currentColor"
                />
                <path
                  d="M5.5 9.5H8.5M5.5 13.5H8.5"
                  stroke="#3074FE"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>

          {/* Mobile only: Satisfied Clients Badge */}
          <div
            className="inline-flex sm:hidden items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80"
            style={{
              boxShadow:
                "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 8px 0 rgba(255, 255, 255, 0.5), 0 4px 12px -2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow-xs">
                <Image
                  src="/assets/images/avatar1.jpg"
                  alt="Private Resident"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow-xs -ml-2">
                <Image
                  src="/assets/images/avatar2.jpg"
                  alt="Private Resident"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow-xs -ml-2">
                <Image
                  src="/assets/images/avatar3.jpg"
                  alt="Private Resident"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-neutral-900 leading-none font-semibold">
                3,400+
              </span>
              <span className="text-[10px] text-neutral-600 font-normal leading-tight mt-0.5">
                Satisfied Clients
              </span>
            </div>
          </div>
        </div>

        {/* Compact Property Search Bar */}
        <PropertySearchBar />
      </div>
    </section>
  );
}

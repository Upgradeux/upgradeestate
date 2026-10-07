"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IconChevronDown,
  IconChevronRight,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  // Smooth scroll handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
    navKey?: string
  ) => {
    e.preventDefault();
    if (navKey) setActiveNav(navKey);
    setMobileMenuOpen(false);
    setPropertiesOpen(false);

    const targetSelector = href === "#listings" ? "#properties" : href;
    const targetElement =
      document.querySelector(targetSelector) || document.querySelector(href);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "properties",
      "locations",
      "why-us",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "properties" || id === "listings") {
              setActiveNav("properties");
            } else if (id === "why-us") {
              setActiveNav("why-us");
            } else {
              setActiveNav(id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`w-full relative z-30 flex-shrink-0 ${className}`}>
      <nav
        aria-label="Main Navigation"
        className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-3"
      >
        {/* Brand Logo: UPGRADE */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home", "home")}
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full bg-[#3074FE] flex items-center justify-center shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_10px_0_rgba(255,255,255,0.25),_0_2px_8px_-1px_rgba(48,116,254,0.35)] shrink-0"
          aria-label="UPGRADE"
        >
          <svg fill="none" height="44" viewBox="0 0 40 48" width="44" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.7788 6.1817 4.6901 17.5036v-19.24382c.3719-.08679.7478-.16322 1.1273-.22897v19.47459l5.2752-19.6871c.3801.03442.7572.07945 1.1309.13479l-5.3176 19.84571 10.5701-18.30794c.3443.15492.6835.31927 1.0172.49274l-10.6095 18.3763 15.1464-15.1465c.2731.25824.5389.52407.7971.7972l-15.1486 15.1487 18.3784-10.6108c.1734.3337.3377.6729.4926 1.0173l-18.3034 10.5675 19.8403-5.3162c.0553.3737.1003.7508.1347 1.1309l-19.6869 5.2751h19.4741c-.0658.3796-.1422.7554-.229 1.1273h-19.2481l17.507 4.691c-.1798.3443-.3693.6827-.5681 1.0149l-17.2257-4.6156 14.3874 8.3066c-.2723.2801-.5528.5522-.8411.8161l-14.1087-8.1457 10.6759 10.6758c-.3377.1973-.6817.385-1.0316.5628l-10.4426-10.4426 6.8421 11.8508c-.3746.1059-.7537.2012-1.1368.2855l-6.6825-11.5744 3.2219 12.0243c-.2872.0122-.5759.0184-.8661.0184-.0991 0-.198-.0007-.2967-.0022l-3.1483-11.7497v11.4569c-.3795-.0657-.7554-.1421-1.1273-.2289v-11.2261l-2.7759 10.36c-.3541-.1396-.7033-.289-1.0471-.4478l2.7337-10.2024-5.13175 8.8884c-.3177-.2034-.62928-.4156-.9344-.6361l5.09135-8.8186-7.1301 7.1302c-.2731-.2583-.53893-.5241-.79717-.7971l7.12787-7.1279-8.81599 5.0899c-.22059-.3051-.4328-.6167-.6363-.9344l8.89259-5.1341-10.20737 2.735c-.15888-.3438-.3083-.693-.44793-1.047l10.3599-2.776h-11.226124c-.086806-.3719-.163256-.7477-.22903-1.1273h11.452154l-11.74511583-3.1471c-.00145443-.0995-.00218417-.1991-.00218417-.2989 0-.2894.00613487-.5774.0182816-.8639l12.0258184 3.2224-11.57621-6.6836c.084291-.3832.179549-.7623.285427-1.1369l11.855683 6.8449-10.44698-10.447c.17774-.3499.36544-.6939.56273-1.0315l10.68025 10.6802-8.14896-14.1144c.26387-.2882.53605-.56863.81617-.84096l8.30809 14.38996-4.61634-17.22828c.33214-.1988.67064-.38826 1.01484-.56802z"
              fill="white"
            />
          </svg>
        </Link>

        {/* Center Pill Navigation (Desktop lg+) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          <div
            className="flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full bg-white/95 border border-white/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.04)]"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Home */}
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home", "home")}
              className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeNav === "home"
                  ? "text-white"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
              }`}
              style={
                activeNav === "home"
                  ? {
                      backgroundColor: "#3074FE",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                    }
                  : undefined
              }
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="#about"
              onClick={(e) => handleNavClick(e, "#about", "about")}
              className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeNav === "about"
                  ? "text-white"
                  : "text-neutral-600 hover:text-[#3074FE] hover:bg-[#3074FE]/10"
              }`}
              style={
                activeNav === "about"
                  ? {
                      backgroundColor: "#3074FE",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                    }
                  : undefined
              }
            >
              About Us
            </Link>

            {/* Properties - Clicking scrolls directly to Featured Properties */}
            <div
              className="relative"
              onMouseEnter={() => setPropertiesOpen(true)}
              onMouseLeave={() => setPropertiesOpen(false)}
            >
              <Link
                href="#properties"
                onClick={(e) => handleNavClick(e, "#properties", "properties")}
                className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  activeNav === "properties"
                    ? "text-white"
                    : propertiesOpen
                    ? "bg-[#3074FE]/15 text-[#3074FE]"
                    : "text-neutral-600 hover:text-[#3074FE] hover:bg-[#3074FE]/10"
                }`}
                style={
                  activeNav === "properties"
                    ? {
                        backgroundColor: "#3074FE",
                        boxShadow:
                          "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                      }
                    : undefined
                }
                aria-expanded={propertiesOpen}
              >
                <span>Properties</span>
                <IconChevronDown
                  size={14}
                  className={`transition-transform duration-200 opacity-80 ${
                    propertiesOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {/* Dropdown Menu */}
              {propertiesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                  <div
                    className="w-56 p-1.5 rounded-[20px] bg-white/95 border border-neutral-100 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12)] flex flex-col gap-1"
                    style={{
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                    }}
                  >
                    <Link
                      href="#properties"
                      onClick={(e) => handleNavClick(e, "#properties", "properties")}
                      className="group/item px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-neutral-700 hover:text-[#3074FE] hover:bg-[#3074FE]/10 flex items-center justify-between transition-all duration-200"
                    >
                      <span>Featured Properties</span>
                      <IconChevronRight
                        size={14}
                        className="opacity-60 group-hover/item:opacity-100 group-hover/item:text-[#3074FE] group-hover/item:translate-x-0.5 transition-all"
                      />
                    </Link>
                    <Link
                      href="#top-listings"
                      onClick={(e) => handleNavClick(e, "#top-listings", "properties")}
                      className="group/item px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-neutral-700 hover:text-[#3074FE] hover:bg-[#3074FE]/10 flex items-center justify-between transition-all duration-200"
                    >
                      <span>Top Listings</span>
                      <IconChevronRight
                        size={14}
                        className="opacity-60 group-hover/item:opacity-100 group-hover/item:text-[#3074FE] group-hover/item:translate-x-0.5 transition-all"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations */}
            <Link
              href="#locations"
              onClick={(e) => handleNavClick(e, "#locations", "locations")}
              className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeNav === "locations"
                  ? "text-white"
                  : "text-neutral-600 hover:text-[#3074FE] hover:bg-[#3074FE]/10"
              }`}
              style={
                activeNav === "locations"
                  ? {
                      backgroundColor: "#3074FE",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                    }
                  : undefined
              }
            >
              Locations
            </Link>

            {/* Why Us */}
            <Link
              href="#why-us"
              onClick={(e) => handleNavClick(e, "#why-us", "why-us")}
              className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeNav === "why-us"
                  ? "text-white"
                  : "text-neutral-600 hover:text-[#3074FE] hover:bg-[#3074FE]/10"
              }`}
              style={
                activeNav === "why-us"
                  ? {
                      backgroundColor: "#3074FE",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                    }
                  : undefined
              }
            >
              Why Us
            </Link>

            {/* Contact */}
            <Link
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact", "contact")}
              className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeNav === "contact"
                  ? "text-white"
                  : "text-neutral-600 hover:text-[#3074FE] hover:bg-[#3074FE]/10"
              }`}
              style={
                activeNav === "contact"
                  ? {
                      backgroundColor: "#3074FE",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                    }
                  : undefined
              }
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right Action: Inquire */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact", "contact")}
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-200 active:scale-95 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(48,116,254,0.45)] cursor-pointer"
            style={{
              backgroundColor: "#3074FE",
              boxShadow:
                "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 12px 0 rgba(255, 255, 255, 0.3), 0 4px 16px -2px rgba(48, 116, 254, 0.35)",
            }}
          >
            Inquire
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/95 border border-white/80 text-neutral-800 hover:text-neutral-900 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Floating Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Soft Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs sm:hidden"
              aria-hidden="true"
            />

            {/* Floating Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(100%+0.5rem)] inset-x-4 z-50 sm:hidden p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90"
              style={{
                boxShadow:
                  "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 12px 0 rgba(255, 255, 255, 0.4), 0 20px 45px -10px rgba(0, 0, 0, 0.18)",
              }}
            >
              <div className="flex flex-col gap-1.5">
                {/* Home */}
                <Link
                  href="#home"
                  onClick={(e) => handleNavClick(e, "#home", "home")}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    activeNav === "home"
                      ? "text-white"
                      : "text-neutral-700 hover:bg-neutral-100/80"
                  }`}
                  style={
                    activeNav === "home"
                      ? {
                          backgroundColor: "#3074FE",
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                        }
                      : undefined
                  }
                >
                  Home
                </Link>

                {/* About Us */}
                <Link
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about", "about")}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    activeNav === "about"
                      ? "text-white"
                      : "text-neutral-700 hover:bg-neutral-100/80"
                  }`}
                  style={
                    activeNav === "about"
                      ? {
                          backgroundColor: "#3074FE",
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                        }
                      : undefined
                  }
                >
                  About Us
                </Link>

                {/* Properties - Clicking scrolls to Featured Properties */}
                <Link
                  href="#properties"
                  onClick={(e) => handleNavClick(e, "#properties", "properties")}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    activeNav === "properties"
                      ? "text-white"
                      : "text-neutral-700 hover:bg-neutral-100/80"
                  }`}
                  style={
                    activeNav === "properties"
                      ? {
                          backgroundColor: "#3074FE",
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                        }
                      : undefined
                  }
                >
                  Properties
                </Link>

                {/* Locations */}
                <Link
                  href="#locations"
                  onClick={(e) => handleNavClick(e, "#locations", "locations")}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    activeNav === "locations"
                      ? "text-white"
                      : "text-neutral-700 hover:bg-neutral-100/80"
                  }`}
                  style={
                    activeNav === "locations"
                      ? {
                          backgroundColor: "#3074FE",
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                        }
                      : undefined
                  }
                >
                  Locations
                </Link>

                {/* Why Us */}
                <Link
                  href="#why-us"
                  onClick={(e) => handleNavClick(e, "#why-us", "why-us")}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    activeNav === "why-us"
                      ? "text-white"
                      : "text-neutral-700 hover:bg-neutral-100/80"
                  }`}
                  style={
                    activeNav === "why-us"
                      ? {
                          backgroundColor: "#3074FE",
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                        }
                      : undefined
                  }
                >
                  Why Us
                </Link>

                {/* Contact */}
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact", "contact")}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    activeNav === "contact"
                      ? "text-white"
                      : "text-neutral-700 hover:bg-neutral-100/80"
                  }`}
                  style={
                    activeNav === "contact"
                      ? {
                          backgroundColor: "#3074FE",
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                        }
                      : undefined
                  }
                >
                  Contact
                </Link>

                <div className="h-[1px] bg-neutral-200/80 my-1.5" />

                {/* Inquire CTA */}
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact", "contact")}
                  className="w-full text-center px-4 py-2.5 rounded-2xl text-xs font-semibold text-white active:scale-95 transition-all cursor-pointer"
                  style={{
                    backgroundColor: "#3074FE",
                    boxShadow:
                      "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
                  }}
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

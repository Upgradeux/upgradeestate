"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconArrowUp,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconCheck,
} from "@tabler/icons-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: IconBrandInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: IconBrandLinkedin,
    },
    {
      name: "X",
      href: "https://x.com",
      icon: IconBrandX,
    },
  ];

  return (
    <footer
      id="footer"
      aria-label="Site Footer"
      className="w-full bg-[#3074FE] text-white rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-8 sm:py-7 md:px-10 md:py-8 border border-blue-400/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 sm:gap-6 md:gap-7">
        {/* Main Bar: Brand on Left, Social Icons & Subscribe & Top Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 pb-4 sm:pb-5 border-b border-white/20">
          {/* Brand Emblem & Descriptor (+ Mobile Back to Top Button on right) */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group rounded-full bg-white w-9 h-9 flex items-center justify-center shrink-0 shadow-xs hover:scale-105 transition-transform"
                aria-label="UPGRADE Homepage"
              >
                <svg
                  fill="none"
                  height="38"
                  viewBox="0 0 40 48"
                  width="38"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m10.7788 6.1817 4.6901 17.5036v-19.24382c.3719-.08679.7478-.16322 1.1273-.22897v19.47459l5.2752-19.6871c.3801.03442.7572.07945 1.1309.13479l-5.3176 19.84571 10.5701-18.30794c.3443.15492.6835.31927 1.0172.49274l-10.6095 18.3763 15.1464-15.1465c.2731.25824.5389.52407.7971.7972l-15.1486 15.1487 18.3784-10.6108c.1734.3337.3377.6729.4926 1.0173l-18.3034 10.5675 19.8403-5.3162c.0553.3737.1003.7508.1347 1.1309l-19.6869 5.2751h19.4741c-.0658.3796-.1422.7554-.229 1.1273h-19.2481l17.507 4.691c-.1798.3443-.3693.6827-.5681 1.0149l-17.2257-4.6156 14.3874 8.3066c-.2723.2801-.5528.5522-.8411.8161l-14.1087-8.1457 10.6759 10.6758c-.3377.1973-.6817.385-1.0316.5628l-10.4426-10.4426 6.8421 11.8508c-.3746.1059-.7537.2012-1.1368.2855l-6.6825-11.5744 3.2219 12.0243c-.2872.0122-.5759.0184-.8661.0184-.0991 0-.198-.0007-.2967-.0022l-3.1483-11.7497v11.4569c-.3795-.0657-.7554-.1421-1.1273-.2289v-11.2261l-2.7759 10.36c-.3541-.1396-.7033-.289-1.0471-.4478l2.7337-10.2024-5.13175 8.8884c-.3177-.2034-.62928-.4156-.9344-.6361l5.09135-8.8186-7.1301 7.1302c-.2731-.2583-.53893-.5241-.79717-.7971l7.12787-7.1279-8.81599 5.0899c-.22059-.3051-.4328-.6167-.6363-.9344l8.89259-5.1341-10.20737 2.735c-.15888-.3438-.3083-.693-.44793-1.047l10.3599-2.776h-11.226124c-.086806-.3719-.163256-.7477-.22903-1.1273h11.452154l-11.74511583-3.1471c-.00145443-.0995-.00218417-.1991-.00218417-.2989 0-.2894.00613487-.5774.0182816-.8639l12.0258184 3.2224-11.57621-6.6836c.084291-.3832.179549-.7623.285427-1.1369l11.855683 6.8449-10.44698-10.447c.17774-.3499.36544-.6939.56273-1.0315l10.68025 10.6802-8.14896-14.1144c.26387-.2882.53605-.56863.81617-.84096l8.30809 14.38996-4.61634-17.22828c.33214-.1988.67064-.38826 1.01484-.56802z"
                    fill="#3074FE"
                  />
                </svg>
              </Link>
              <div>
                <span className="text-sm font-semibold tracking-tight text-white block leading-tight">
                  UPGRADE
                </span>
                <span className="text-[10px] sm:text-[11px] text-blue-100/85 font-normal block leading-tight">
                  Architectural Living & Bespoke Estates
                </span>
              </div>
            </div>

            {/* Mobile Back to Top button on top-right */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToTop}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white text-[#3074FE] transition-colors cursor-pointer shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] shrink-0"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <IconArrowUp className="w-4 h-4 stroke-2" />
            </motion.button>
          </div>

          {/* Social Icons & Subscribe Form */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto md:justify-end">
            {/* Subscribe Form (Full width on mobile) */}
            <form
              onSubmit={handleSubscribe}
              className="relative flex items-center w-full sm:w-72 md:w-80 order-1 sm:order-2"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3074FE]">
                <IconMail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe for private drops..."
                className="w-full h-10 pl-9 pr-24 rounded-lg bg-white border border-neutral-300 text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.05)] transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 px-3.5 py-1.5 rounded-md text-white bg-[#3074FE] text-xs font-semibold transition-all cursor-pointer shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] shrink-0"
              >
                {isSubscribed ? (
                  <span className="inline-flex items-center gap-1 text-white">
                    <IconCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                    Joined
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-1 order-2 sm:order-1">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white/85 hover:text-white hover:bg-white/15 transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Desktop Back to Top Button */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToTop}
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white text-[#3074FE] text-xs font-medium transition-colors cursor-pointer shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_12px_0_rgba(255,255,255,0.18)] shrink-0 order-3"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <IconArrowUp className="w-4 h-4 stroke-2" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left, Legal Links in Right Corner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left text-[10.5px] sm:text-[11px] text-blue-100/75">
          <span>© {new Date().getFullYear()} Upgrade Estates Ltd. All rights reserved.</span>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="hover:text-white cursor-pointer transition-colors">
              Discretionary Advisory
            </span>
            <span className="text-white/30">•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-white/30">•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms & Legal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

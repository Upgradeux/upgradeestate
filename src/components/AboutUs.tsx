"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMessageDots,
} from "@tabler/icons-react";

const statementText =
  "Architecture is more than physical space—it is the quiet foundation of an elevated life, designed for those who demand quiet distinction and enduring legacy.";
const statementWords = statementText.split(" ");

const statementContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

const socialContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const socialItemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

export default function AboutUs() {
  return (
    <section
      id="about"
      aria-label="About Us"
      className="w-full px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 lg:px-16 lg:py-24 overflow-hidden"
    >
      <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Column: Heading & Mission Narrative */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900">
              About Us
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-md"
          >
            We sculpt singular residential sanctuaries where honest materiality,
            deliberate proportion, and panoramic serenity meet. Built for
            generations who value understated architectural prestige.
          </motion.p>
        </div>

        {/* Right Column: Statement, Social Media & Let's Chat */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-10">
          {/* Main Statement (Word-by-word reveal on scroll) */}
          <motion.h3
            variants={statementContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-tight tracking-tight text-neutral-900"
          >
            {statementWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>

          {/* Social Icons & Bottom Right "Let's Chat" Action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4 border-t border-neutral-200/60">
            
            {/* Social Icons (come from bottom) */}
            <motion.div
              variants={socialContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <motion.a
                variants={socialItemVariants}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-300 hover:bg-neutral-100 transition-all duration-200"
              >
                <IconBrandFacebook size={18} stroke={1.6} />
              </motion.a>
              <motion.a
                variants={socialItemVariants}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-300 hover:bg-neutral-100 transition-all duration-200"
              >
                <IconBrandInstagram size={18} stroke={1.6} />
              </motion.a>
              <motion.a
                variants={socialItemVariants}
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-300 hover:bg-neutral-100 transition-all duration-200"
              >
                <IconBrandX size={18} stroke={1.6} />
              </motion.a>
              <motion.a
                variants={socialItemVariants}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-300 hover:bg-neutral-100 transition-all duration-200"
              >
                <IconBrandLinkedin size={18} stroke={1.6} />
              </motion.a>
            </motion.div>

            {/* "Let's Chat" Pill Button (comes from right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="self-start sm:self-end"
            >
              <Link
                href="#chat"
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#3074FE] bg-[#3074FE] hover:bg-[#3074FE]/90 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_10px_0_rgba(255,255,255,0.25),_0_2px_8px_-1px_rgba(48,116,254,0.35)]  transition-all duration-200 active:scale-[0.98]"
                aria-label="Let's Chat"
              >
                {/* Left Icon with NO border */}
                <IconMessageDots
                  size={20}
                  stroke={1.8}
                  className="text-neutral-50 transition-transform -rotate-10 duration-200 group-hover:scale-105"
                  aria-hidden="true"
                />

                {/* Right Text */}
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-50 select-none">
                  Let&apos;s Chat
                </span>
              </Link>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

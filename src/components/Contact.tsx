"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconArrowUpRight,
  IconArrowLeft,
  IconCheck,
  IconChevronDown,
  IconBuildingSkyscraper,
  IconPalette,
  IconCoin,
  IconUser,
  IconHome,
  IconCompass,
  IconMessageCircle,
  IconShieldCheck,
  IconClock,
} from "@tabler/icons-react";

const PROPERTY_TYPES = [
  "Villa House & Estates",
  "Sky Penthouses",
  "Flats & Luxury Apartments",
  "Duplex Sanctuaries",
  "Waterfront Mansions",
  "Townhouses",
];

const PROPERTY_STYLES = [
  "Modern Minimalist",
  "Mediterranean",
  "Contemporary Bauhaus",
  "Classical Colonial",
  "Industrial",
];

const LOCATIONS = [
  "Goa (Assagao & Candolim)",
  "Mumbai (South & Bandra)",
  "Delhi NCR (Golf Course Rd)",
  "Jaipur (Civil Lines & C-Scheme)",
  "Bengaluru (Indiranagar)",
  "Off-Market Exclusive",
];

const BUDGET_RANGES = [
  "$ 250,000 - 500,000",
  "$ 500,000 - 1,000,000",
  "$ 1,000,000 - 2,500,000",
  "$ 2,500,000 - 5,000,000",
  "$ 5,000,000+",
];

const REFERRAL_SOURCES = [
  "Social Media",
  "Friend / Referral",
  "Google Search",
  "Property Event",
  "Press & Media",
  "Existing Client",
];

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 14 : -14,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -14 : 14,
    filter: "blur(4px)",
  }),
};

export default function Contact() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "type" | "style" | "location" | "budget" | null
  >(null);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    // Step 1: Contact
    name: "",
    phone: "",
    email: "",
    note: "",
    // Step 2: Preferences
    propertyType: PROPERTY_TYPES[0],
    style: PROPERTY_STYLES[0],
    location: LOCATIONS[0],
    budget: BUDGET_RANGES[2],
    // Step 3: Discovery
    heardFrom: REFERRAL_SOURCES[0],
    preferredContactMethod: "WhatsApp",
  });

  // Close custom dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.email) return;
      setDirection(1);
      setStep(2);
    } else if (step === 2) {
      setDirection(1);
      setStep(3);
    } else if (step === 3) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setStep(1);
        setDirection(1);
        setFormData({
          name: "",
          phone: "",
          email: "",
          note: "",
          propertyType: PROPERTY_TYPES[0],
          style: PROPERTY_STYLES[0],
          location: LOCATIONS[0],
          budget: BUDGET_RANGES[2],
          heardFrom: REFERRAL_SOURCES[0],
          preferredContactMethod: "WhatsApp",
        });
      }, 5000);
    }
  };

  const handleBack = () => {
    setActiveDropdown(null);
    setDirection(-1);
    setStep((prev) => (prev - 1) as 1 | 2);
  };

  const handleJumpToStep = (targetStep: 1 | 2 | 3) => {
    if (targetStep < step) {
      setActiveDropdown(null);
      setDirection(-1);
      setStep(targetStep);
    }
  };

  // Steps definition for custom wizard bar
  const STEPS = [
    { num: 1 as const, title: "Contact", icon: IconUser },
    { num: 2 as const, title: "Preferences", icon: IconHome },
    { num: 3 as const, title: "Discovery", icon: IconCompass },
  ];

  return (
    <section
      id="contact"
      aria-label="Contact Real Estate Advisory"
      className="w-full bg-white px-6 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 xl:px-20 overflow-hidden relative scroll-mt-12"
    >
      <div
        id="inquire"
        className="absolute -top-16 left-0 pointer-events-none"
      />
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column: Simple Real Estate CTA Copy & Clean Contact Line Items */}
          <div className="w-full lg:flex-1 max-w-xl flex flex-col justify-center gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              {/* Simple, relatable, punchy real estate heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-tight max-w-md">
                Find your dream home with us.
              </h2>

              {/* Simple, clear real estate subtext */}
              <p className="text-sm text-neutral-600 font-normal leading-relaxed max-w-lg">
                Whether you are looking to buy, sell, or rent your next home,
                our team provides personalized guidance every step of the way.
              </p>
            </motion.div>

            {/* Clean, Small Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pt-5 border-t border-dashed border-neutral-200 flex flex-col gap-3 text-xs sm:text-sm text-neutral-600"
            >
              <div className="flex items-center gap-3 text-neutral-700">
                <span className="bg-[#3074FE] p-1 rounded-lg shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]">
                  <IconPhone className="w-4 h-4 text-neutral-50 shrink-0" />
                </span>
                <a
                  href="tel:+912249008800"
                  className="font-medium hover:text-[#3074FE] transition-colors"
                >
                  +91 (0) 22 4900 8800
                </a>
              </div>

              <div className="flex items-center gap-3 text-neutral-700">
                <span className="bg-[#3074FE] p-1 rounded-lg shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]">
                  <IconMail className="w-4 h-4 text-neutral-50 shrink-0" />
                </span>
                <a
                  href="mailto:advisory@upgrade-living.com"
                  className="font-medium hover:text-[#3074FE] transition-colors"
                >
                  advisory@upgrade-living.com
                </a>
              </div>

              <div className="flex items-start gap-3 text-neutral-600">
                <span className="bg-[#3074FE] p-1 rounded-lg shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]">
                  <IconMapPin className="w-4 h-4 text-neutral-50 shrink-0" />
                </span>
                <span>Worli Sea Face, Mumbai • Assagao, Goa • New Delhi</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Multi-Step Form with Refined Stepper Wizard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="w-full lg:w-[470px] xl:w-[500px] shrink-0 bg-white rounded-lg p-5 sm:p-7 border border-neutral-200/90  relative overflow-visible"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="py-12 text-center flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]">
                  <IconCheck className="w-6 h-6 stroke-[2px]" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-neutral-900">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-xs leading-relaxed">
                  Thank you,{" "}
                  <strong className="text-neutral-800">{formData.name}</strong>.
                  Our senior advisor will contact you shortly via{" "}
                  {formData.preferredContactMethod} with tailored listings.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-medium text-[#3074FE] hover:underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleNext} className="flex flex-col w-full">
                {/* Visual Multi-Step Stepper (matches reference image: dashed ring on active, smooth progress lines, crisp icons) */}
                <div className="pb-4 mb-4 border-b border-neutral-200/80">
                  <div className="flex items-center justify-between w-full max-w-[340px] mx-auto px-2">
                    {STEPS.map((s, index) => {
                      const StepIcon = s.icon;
                      const isActive = step === s.num;
                      const isCompleted = step > s.num;

                      return (
                        <div
                          key={s.num}
                          className="flex items-center flex-1 last:flex-none"
                        >
                          {/* Stepper Node */}
                          <div className="w-10 h-10 flex items-center justify-center shrink-0">
                            {isActive ? (
                              /* Active Step: Outer dashed circular ring with solid blue circle & white icon */
                              <motion.div
                                layoutId="active-stepper-ring"
                                className="w-10 h-10 rounded-full border border-dashed border-[#3074FE] p-[2.5px] flex items-center justify-center shadow-sm"
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 28,
                                }}
                              >
                                <div className="w-full h-full rounded-full bg-[#3074FE] text-white flex items-center justify-center">
                                  <StepIcon className="w-4 h-4" />
                                </div>
                              </motion.div>
                            ) : isCompleted ? (
                              /* Completed Step: Solid blue circle with checkmark (clickable to return) */
                              <button
                                type="button"
                                onClick={() => handleJumpToStep(s.num)}
                                title={`Return to ${s.title}`}
                                className="w-8 h-8 rounded-full bg-[#3074FE] text-white flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                              >
                                <IconCheck className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            ) : (
                              /* Upcoming Step: Clean neutral border circle with muted icon */
                              <div className="w-8 h-8 rounded-full bg-neutral-100/80 border border-neutral-200/90 text-neutral-400 flex items-center justify-center">
                                <StepIcon className="w-4 h-4 stroke-[1.8]" />
                              </div>
                            )}
                          </div>

                          {/* Connecting Bar to next node */}
                          {index < STEPS.length - 1 && (
                            <div className="flex-1 h-[2.5px] bg-neutral-200/80 mx-2.5 sm:mx-3 rounded-full relative overflow-hidden">
                              <motion.div
                                className="absolute inset-y-0 left-0 bg-[#3074FE] rounded-full"
                                initial={false}
                                animate={{
                                  width:
                                    step > s.num
                                      ? "100%"
                                      : step === s.num
                                        ? "50%"
                                        : "0%",
                                }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step Label Context */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    <span className="text-[11px] font-medium text-neutral-500">
                      Step {step} of 3 •{" "}
                      <span className="text-neutral-900 font-semibold">
                        {step === 1
                          ? "Contact Information"
                          : step === 2
                            ? "Property Preferences"
                            : "Discovery & Notes"}
                      </span>
                    </span>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">
                      {step === 1
                        ? "Personal"
                        : step === 2
                          ? "Curated"
                          : "Confirmation"}
                    </span>
                  </div>
                </div>

                {/* Form Step Body with Subtle Direction-Aware Blur-Fade Animation */}
                <div className="min-h-[245px] sm:min-h-[240px] flex flex-col justify-between">
                  <AnimatePresence
                    mode="wait"
                    custom={direction}
                    initial={false}
                  >
                    {/* STEP 1: Name, Phone, Email, Additional Note */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-2.5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Full Name */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                              Full Name <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-neutral-400">
                                <IconUser className="w-3.5 h-3.5" />
                              </div>
                              <input
                                type="text"
                                required
                                placeholder="Alistair Vance"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full pl-8 pr-3 py-2 bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 focus:border-[#3074FE] focus:ring-2 focus:ring-[#3074FE]/15 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 outline-none transition-all shadow-2xs"
                              />
                            </div>
                          </div>

                          {/* Phone / WhatsApp */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                              Phone <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-neutral-400">
                                <IconPhone className="w-3.5 h-3.5" />
                              </div>
                              <input
                                type="tel"
                                required
                                placeholder="+91 98200 00000"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                className="w-full pl-8 pr-3 py-2 bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 focus:border-[#3074FE] focus:ring-2 focus:ring-[#3074FE]/15 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 outline-none transition-all shadow-2xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-neutral-400">
                              <IconMail className="w-3.5 h-3.5" />
                            </div>
                            <input
                              type="email"
                              required
                              placeholder="advisory@domain.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full pl-8 pr-3 py-2 bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 focus:border-[#3074FE] focus:ring-2 focus:ring-[#3074FE]/15 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 outline-none transition-all shadow-2xs"
                            />
                          </div>
                        </div>

                        {/* Additional Note */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                            Additional Note{" "}
                            <span className="lowercase">(optional)</span>
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Desired timeline, architectural preferences, or questions..."
                            value={formData.note}
                            onChange={(e) =>
                              setFormData({ ...formData, note: e.target.value })
                            }
                            className="w-full bg-neutral-50/70 hover:bg-neutral-50 focus:bg-white border border-neutral-200/90 focus:border-[#3074FE] focus:ring-2 focus:ring-[#3074FE]/15 rounded-xl px-3 py-1.5 pb-4 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none resize-none transition-all shadow-2xs"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Custom Dropdowns Styled Exactly Like PropertySearchBar */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-3"
                        ref={dropdownContainerRef}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Dropdown 1: Property Type */}
                          <div className="relative">
                            <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase block mb-1">
                              Property Type
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === "type" ? null : "type",
                                )
                              }
                              className={`w-full h-10 px-3 rounded-lg bg-neutral-50/80 hover:bg-neutral-100/90 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                                activeDropdown === "type"
                                  ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                                  : "border-neutral-200/90"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate pr-1">
                                <IconBuildingSkyscraper className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
                                <span className="text-xs truncate font-medium text-neutral-900">
                                  {formData.propertyType}
                                </span>
                              </div>
                              <IconChevronDown
                                className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                                  activeDropdown === "type"
                                    ? "rotate-180 text-[#3074FE]"
                                    : ""
                                }`}
                              />
                            </button>

                            {/* Dropdown Menu Popup */}
                            {activeDropdown === "type" && (
                              <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl p-1.5 border border-neutral-200 shadow-xl z-50"
                              >
                                <div className="max-h-44 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                  {PROPERTY_TYPES.map((t) => {
                                    const isSelected =
                                      formData.propertyType === t;
                                    return (
                                      <button
                                        key={t}
                                        type="button"
                                        onClick={() => {
                                          setFormData({
                                            ...formData,
                                            propertyType: t,
                                          });
                                          setActiveDropdown(null);
                                        }}
                                        className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                                          isSelected
                                            ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                                        }`}
                                      >
                                        <span className="truncate">{t}</span>
                                        {isSelected && (
                                          <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Dropdown 2: Architectural Style */}
                          <div className="relative">
                            <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase block mb-1">
                              Style
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === "style" ? null : "style",
                                )
                              }
                              className={`w-full h-10 px-3 rounded-lg bg-neutral-50/80 hover:bg-neutral-100/90 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                                activeDropdown === "style"
                                  ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                                  : "border-neutral-200/90"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate pr-1">
                                <IconPalette className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
                                <span className="text-xs truncate font-medium text-neutral-900">
                                  {formData.style}
                                </span>
                              </div>
                              <IconChevronDown
                                className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                                  activeDropdown === "style"
                                    ? "rotate-180 text-[#3074FE]"
                                    : ""
                                }`}
                              />
                            </button>

                            {/* Dropdown Menu Popup */}
                            {activeDropdown === "style" && (
                              <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl p-1.5 border border-neutral-200 shadow-xl z-50"
                              >
                                <div className="max-h-44 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                  {PROPERTY_STYLES.map((s) => {
                                    const isSelected = formData.style === s;
                                    return (
                                      <button
                                        key={s}
                                        type="button"
                                        onClick={() => {
                                          setFormData({
                                            ...formData,
                                            style: s,
                                          });
                                          setActiveDropdown(null);
                                        }}
                                        className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                                          isSelected
                                            ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                                        }`}
                                      >
                                        <span className="truncate">{s}</span>
                                        {isSelected && (
                                          <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Dropdown 3: Desired Location */}
                          <div className="relative">
                            <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase block mb-1">
                              Location
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === "location"
                                    ? null
                                    : "location",
                                )
                              }
                              className={`w-full h-10 px-3 rounded-lg bg-neutral-50/80 hover:bg-neutral-100/90 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                                activeDropdown === "location"
                                  ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                                  : "border-neutral-200/90"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate pr-1">
                                <IconMapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
                                <span className="text-xs truncate font-medium text-neutral-900">
                                  {formData.location}
                                </span>
                              </div>
                              <IconChevronDown
                                className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                                  activeDropdown === "location"
                                    ? "rotate-180 text-[#3074FE]"
                                    : ""
                                }`}
                              />
                            </button>

                            {/* Dropdown Menu Popup */}
                            {activeDropdown === "location" && (
                              <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl p-1.5 border border-neutral-200 shadow-xl z-50"
                              >
                                <div className="max-h-44 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                  {LOCATIONS.map((l) => {
                                    const isSelected = formData.location === l;
                                    return (
                                      <button
                                        key={l}
                                        type="button"
                                        onClick={() => {
                                          setFormData({
                                            ...formData,
                                            location: l,
                                          });
                                          setActiveDropdown(null);
                                        }}
                                        className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                                          isSelected
                                            ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                                        }`}
                                      >
                                        <span className="truncate">{l}</span>
                                        {isSelected && (
                                          <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Dropdown 4: Budget Range */}
                          <div className="relative">
                            <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase block mb-1">
                              Budget Range
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === "budget" ? null : "budget",
                                )
                              }
                              className={`w-full h-10 px-3 rounded-lg bg-neutral-50/80 hover:bg-neutral-100/90 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                                activeDropdown === "budget"
                                  ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                                  : "border-neutral-200/90"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 truncate pr-1">
                                <IconCoin className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
                                <span className="text-xs truncate font-medium text-neutral-900">
                                  {formData.budget}
                                </span>
                              </div>
                              <IconChevronDown
                                className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                                  activeDropdown === "budget"
                                    ? "rotate-180 text-[#3074FE]"
                                    : ""
                                }`}
                              />
                            </button>

                            {/* Dropdown Menu Popup */}
                            {activeDropdown === "budget" && (
                              <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl p-1.5 border border-neutral-200 shadow-xl z-50"
                              >
                                <div className="max-h-44 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                  {BUDGET_RANGES.map((b) => {
                                    const isSelected = formData.budget === b;
                                    return (
                                      <button
                                        key={b}
                                        type="button"
                                        onClick={() => {
                                          setFormData({
                                            ...formData,
                                            budget: b,
                                          });
                                          setActiveDropdown(null);
                                        }}
                                        className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                                          isSelected
                                            ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                                        }`}
                                      >
                                        <span className="truncate">{b}</span>
                                        {isSelected && (
                                          <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Where you hear about us & Preferred method */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-3"
                      >
                        {/* Selected summary badge */}
                        <div className="bg-neutral-50 border border-neutral-200/80 rounded-lg p-2.5 flex items-center justify-between text-xs text-neutral-700 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]">
                          <div className="truncate pr-2">
                            <span className="font-semibold text-neutral-900 block truncate">
                              {formData.propertyType} • {formData.style}
                            </span>
                            <span className="text-[11px] text-neutral-500 block truncate">
                              {formData.location} ({formData.budget})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(2)}
                            className="text-[11px] font-medium text-[#3074FE] hover:underline shrink-0 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                            Where did you hear about us?
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {REFERRAL_SOURCES.map((source) => {
                              const selected = formData.heardFrom === source;
                              return (
                                <motion.button
                                  key={source}
                                  type="button"
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      heardFrom: source,
                                    })
                                  }
                                  className={`text-left text-[11px] p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                    selected
                                      ? "bg-[#3074FE]/5 border-[#3074FE] text-[#3074FE] font-medium shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]"
                                      : "bg-white/80 border-neutral-200/90 text-neutral-700 hover:bg-neutral-50"
                                  }`}
                                >
                                  <span className="truncate">{source}</span>
                                  {selected && (
                                    <IconCheck className="w-3 h-3 text-[#3074FE] shrink-0 ml-1" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 pt-0.5">
                          <label className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                            Preferred Contact Method
                          </label>
                          <div className="flex items-center gap-1.5">
                            {["WhatsApp", "Phone Call", "Email"].map(
                              (method) => {
                                const active =
                                  formData.preferredContactMethod === method;
                                return (
                                  <motion.button
                                    key={method}
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        preferredContactMethod: method,
                                      })
                                    }
                                    className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
                                      active
                                        ? "bg-[#3074FE] text-white border-[#3074FE] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]"
                                        : "bg-white text-neutral-700 border-neutral-200/90 hover:bg-neutral-50 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),_inset_0_0_10px_0_rgba(255,255,255,0.25)]"
                                    }`}
                                  >
                                    {method}
                                  </motion.button>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Compact Bottom Navigation */}
                  <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-neutral-200/90">
                    {step > 1 ? (
                      <motion.button
                        type="button"
                        whileHover={{ x: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleBack}
                        className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <IconArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#3074FE] text-white text-xs font-medium px-5 sm:px-6 py-2 rounded-full inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 hover:brightness-105 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),_inset_0_0_10px_0_rgba(255,255,255,0.25),_0_2px_8px_-1px_rgba(48,116,254,0.35)]"
                    >
                      <span>
                        {step === 1
                          ? "Next: Preferences"
                          : step === 2
                            ? "Next: Discovery"
                            : "Submit Request"}
                      </span>
                      <IconArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

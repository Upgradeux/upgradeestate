"use client";

import { useState, useRef, useEffect } from "react";
import {
  IconChevronDown,
  IconSelector,
  IconArrowUpRight,
  IconCheck,
  IconMapPin,
  IconBuildingSkyscraper,
  IconPalette,
  IconCoin,
} from "@tabler/icons-react";

interface Option {
  label: string;
  value: string;
}

const LOCATIONS: Option[] = [
  { label: "Mumbai (South & Bandra)", value: "Mumbai" },
  { label: "Navi Mumbai (Palm Beach Rd)", value: "Navi Mumbai" },
  { label: "Jaipur (Civil Lines & C-Scheme)", value: "Jaipur" },
  { label: "Delhi NCR (Golf Course Rd)", value: "Delhi NCR" },
  { label: "Goa (Assagao & Candolim)", value: "Goa" },
  { label: "Bengaluru (Indiranagar)", value: "Bengaluru" },
  { label: "Pune (Koregaon Park)", value: "Pune" },
  { label: "Hyderabad (Jubilee Hills)", value: "Hyderabad" },
];

const PROPERTY_TYPES: Option[] = [
  { label: "Flats & Luxury Apartments", value: "Flats" },
  { label: "Villa House & Estates", value: "Villa House" },
  { label: "Sky Penthouses", value: "Penthouses" },
  { label: "Duplex Sanctuaries", value: "Duplex" },
  { label: "Townhouses", value: "Townhouses" },
  { label: "Waterfront Mansions", value: "Waterfront" },
];

const PROPERTY_STYLES: Option[] = [
  { label: "Industrial", value: "Industrial" },
  { label: "Commercial / Studio", value: "Commercial" },
  { label: "Modern Minimalist", value: "Modern Minimalist" },
  { label: "Mediterranean", value: "Mediterranean" },
  { label: "Contemporary Bauhaus", value: "Contemporary" },
  { label: "Classical Colonial", value: "Classical" },
];

const PRICE_RANGES_BUY: Option[] = [
  { label: "$ 120,000 - 150,000", value: "120k-150k" },
  { label: "$ 250,000 - 500,000", value: "250k-500k" },
  { label: "$ 500,000 - 1,000,000", value: "500k-1m" },
  { label: "$ 1,000,000 - 2,500,000", value: "1m-2.5m" },
  { label: "$ 2,500,000 - 5,000,000", value: "2.5m-5m" },
  { label: "$ 5,000,000+", value: "5m-plus" },
];

const PRICE_RANGES_RENT: Option[] = [
  { label: "$ 1,500 - 3,000 / mo", value: "1.5k-3k" },
  { label: "$ 3,000 - 6,000 / mo", value: "3k-6k" },
  { label: "$ 6,000 - 12,000 / mo", value: "6k-12k" },
  { label: "$ 12,000 - 25,000 / mo", value: "12k-25k" },
  { label: "$ 25,000+ / mo", value: "25k-plus" },
];

export default function PropertySearchBar() {
  const [tab, setTab] = useState<"rent" | "buy">("rent");
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("Villa House");
  const [style, setStyle] = useState<string>("Industrial");
  const [priceRange, setPriceRange] = useState<string>("$ 120,000-150,000");

  const [activeDropdown, setActiveDropdown] = useState<
    "location" | "type" | "style" | "price" | null
  >(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Update default price range when switching tabs
  const handleTabChange = (newTab: "rent" | "buy") => {
    setTab(newTab);
    setActiveDropdown(null);
    if (newTab === "rent") {
      setPriceRange("$ 3,000 - 6,000 / mo");
    } else {
      setPriceRange("$ 120,000 - 150,000");
    }
  };

  const handleSearch = () => {
    setActiveDropdown(null);
    const listingsEl = document.getElementById("listings");
    if (listingsEl) {
      listingsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentPrices = tab === "buy" ? PRICE_RANGES_BUY : PRICE_RANGES_RENT;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto rounded-2xl p-2.5 sm:p-3.5 bg-white/95 backdrop-blur-xl border border-white/80 transition-all duration-300 relative z-30"
      style={{
        boxShadow:
          "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35), 0 16px 36px -12px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Top Row: Rent / Buy Switch (Compact, ratings removed) */}
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex items-center bg-neutral-100/90 p-0.5 rounded-xl border border-neutral-200/50">
          <button
            type="button"
            onClick={() => handleTabChange("rent")}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
              tab === "rent"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Rent
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("buy")}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
              tab === "buy"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Buy
          </button>
        </div>
      </div>

      {/* Bottom Row / Filter Fields (Compact height h-10, dropdowns open upwards, hidden scrollbar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2.5 items-end">
        {/* Field 1: Location */}
        <div className="relative lg:col-span-3">
          <label className="block text-[11px] font-medium text-neutral-500 mb-0.5 pl-0.5">
            Location
          </label>
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "location" ? null : "location")
            }
            className={`w-full h-10 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
              activeDropdown === "location"
                ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                : "border-neutral-200/80"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate pr-1">
              <IconMapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
              <span
                className={`text-xs truncate ${
                  location
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-400 font-normal"
                }`}
              >
                {location || "Select Location"}
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

          {/* Location Dropdown Menu - Opens Upwards & Scrollbar Hidden */}
          {activeDropdown === "location" && (
            <div className="absolute left-0 bottom-full mb-1.5 w-full min-w-[250px] bg-white rounded-xl p-1.5 border border-neutral-200/90 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="max-h-56 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {LOCATIONS.map((loc) => {
                  const isSelected = location === loc.value;
                  return (
                    <button
                      key={loc.value}
                      type="button"
                      onClick={() => {
                        setLocation(loc.value);
                        setActiveDropdown(null);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate">{loc.label}</span>
                      {isSelected && (
                        <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Field 2: Type */}
        <div className="relative lg:col-span-2">
          <label className="block text-[11px] font-medium text-neutral-500 mb-0.5 pl-0.5">
            Type
          </label>
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "type" ? null : "type")
            }
            className={`w-full h-10 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
              activeDropdown === "type"
                ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                : "border-neutral-200/80"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate pr-1">
              <IconBuildingSkyscraper className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
              <span className="text-xs text-neutral-900 font-medium truncate">
                {propertyType}
              </span>
            </div>
            <IconChevronDown
              className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                activeDropdown === "type" ? "rotate-180 text-[#3074FE]" : ""
              }`}
            />
          </button>

          {/* Type Dropdown Menu - Opens Upwards & Scrollbar Hidden */}
          {activeDropdown === "type" && (
            <div className="absolute left-0 bottom-full mb-1.5 w-full min-w-[210px] bg-white rounded-xl p-1.5 border border-neutral-200/90 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="max-h-56 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {PROPERTY_TYPES.map((pt) => {
                  const isSelected = propertyType === pt.value;
                  return (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => {
                        setPropertyType(pt.value);
                        setActiveDropdown(null);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate">{pt.label}</span>
                      {isSelected && (
                        <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Field 3: Style */}
        <div className="relative lg:col-span-2">
          <label className="block text-[11px] font-medium text-neutral-500 mb-0.5 pl-0.5">
            Style
          </label>
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "style" ? null : "style")
            }
            className={`w-full h-10 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
              activeDropdown === "style"
                ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                : "border-neutral-200/80"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate pr-1">
              <IconPalette className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
              <span className="text-xs text-neutral-900 font-medium truncate">
                {style}
              </span>
            </div>
            <IconChevronDown
              className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                activeDropdown === "style" ? "rotate-180 text-[#3074FE]" : ""
              }`}
            />
          </button>

          {/* Style Dropdown Menu - Opens Upwards & Scrollbar Hidden */}
          {activeDropdown === "style" && (
            <div className="absolute left-0 bottom-full mb-1.5 w-full min-w-[210px] bg-white rounded-xl p-1.5 border border-neutral-200/90 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="max-h-56 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {PROPERTY_STYLES.map((st) => {
                  const isSelected = style === st.value;
                  return (
                    <button
                      key={st.value}
                      type="button"
                      onClick={() => {
                        setStyle(st.value);
                        setActiveDropdown(null);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate">{st.label}</span>
                      {isSelected && (
                        <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Field 4: Price Range */}
        <div className="relative lg:col-span-3">
          <label className="block text-[11px] font-medium text-neutral-500 mb-0.5 pl-0.5">
            Price Range
          </label>
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "price" ? null : "price")
            }
            className={`w-full h-10 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
              activeDropdown === "price"
                ? "border-[#3074FE] ring-2 ring-[#3074FE]/20 bg-white"
                : "border-neutral-200/80"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate pr-1">
              <IconCoin className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-[#3074FE] transition-colors" />
              <span className="text-xs text-neutral-900 font-medium truncate">
                {priceRange}
              </span>
            </div>
            <IconSelector
              className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-colors ${
                activeDropdown === "price" ? "text-[#3074FE]" : ""
              }`}
            />
          </button>

          {/* Price Range Dropdown Menu - Opens Upwards & Scrollbar Hidden */}
          {activeDropdown === "price" && (
            <div className="absolute left-0 bottom-full mb-1.5 w-full min-w-[210px] bg-white rounded-xl p-1.5 border border-neutral-200/90 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="max-h-56 overflow-y-auto space-y-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {currentPrices.map((pr) => {
                  const isSelected = priceRange === pr.label;
                  return (
                    <button
                      key={pr.value}
                      type="button"
                      onClick={() => {
                        setPriceRange(pr.label);
                        setActiveDropdown(null);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#3074FE]/10 text-[#3074FE] font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate">{pr.label}</span>
                      {isSelected && (
                        <IconCheck className="w-3.5 h-3.5 text-[#3074FE] shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Button: Search */}
        <div className="lg:col-span-2">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full h-10 px-4 rounded-xl text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
            style={{
              backgroundColor: "#3074FE",
              boxShadow:
                "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 10px 0 rgba(255, 255, 255, 0.25), 0 2px 8px -1px rgba(48, 116, 254, 0.35)",
            }}
          >
            <span>Search</span>
            <IconArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

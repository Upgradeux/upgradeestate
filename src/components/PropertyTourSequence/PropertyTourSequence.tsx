"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./propertyTourSequence.css";

// Register ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PropertyTourSequenceProps {
  /** Total number of frames in the sequence (default: 300) */
  totalFrames?: number;
  /** Public URL prefix before 3-digit frame number */
  framePrefix?: string;
  /** Image extension (default: .jpg) */
  frameExt?: string;
  /**
   * ScrollTrigger pin duration in viewport heights (vh).
   * Configurable single variable to control cinematic pacing.
   * Default: 400 (corresponds to 400vh).
   */
  scrollDistanceVh?: number;
  /** Optional navigation component to display pinned at the top */
  navbar?: React.ReactNode;
  /** Optional custom overlay content to render inside .property-tour-content */
  children?: React.ReactNode;
  /** Additional wrapper class names */
  className?: string;
}

export default function PropertyTourSequence({
  totalFrames = 300,
  framePrefix = "/property-tour/ezgif-frame-",
  frameExt = ".jpg",
  scrollDistanceVh = 400,
  navbar,
  children,
  className = "",
}: PropertyTourSequenceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentOverlayRef = useRef<HTMLDivElement | null>(null);
  const bottomFadeRef = useRef<HTMLDivElement | null>(null);

  // Store preloaded Image objects in memory
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  // Keep track of current frame index without triggering React re-renders
  const currentFrameRef = useRef<number>(0);
  // requestAnimationFrame handle
  const rafIdRef = useRef<number | null>(null);
  // Track if initial frame 001 was rendered
  const initialFrameRenderedRef = useRef<boolean>(false);

  // Helper to construct public URL for a given 0-indexed frame
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNumber = String(index + 1).padStart(3, "0");
      return `${framePrefix}${frameNumber}${frameExt}`;
    },
    [framePrefix, frameExt]
  );

  // Direct canvas drawing with object-fit: cover calculation and high-DPI sharpness
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const images = imagesRef.current;
      let img = images[index];

      // If requested frame isn't loaded yet, gracefully fall back to the nearest loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = images[index - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[index + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Custom "cover" calculation:
      // scale = max(canvasWidth / imageWidth, canvasHeight / imageHeight)
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      // Centered alignment
      const drawX = (canvasWidth - drawWidth) / 2;
      const drawY = (canvasHeight - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [totalFrames]
  );

  // Render frame throttled with requestAnimationFrame for 60fps+ smoothness
  const renderFrame = useCallback(
    (index: number) => {
      const clampedIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(index))
      );
      currentFrameRef.current = clampedIndex;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(clampedIndex);
        rafIdRef.current = null;
      });
    },
    [drawFrame, totalFrames]
  );

  // Resize canvas buffer based on devicePixelRatio (capped at 2 for performance)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Allocate array for image sequence
    imagesRef.current = new Array(totalFrames).fill(null);

    // Initial setup of canvas size
    updateCanvasDimensions();

    let loadedCount = 0;
    let isCancelled = false;

    // 1. Immediately prioritize and load Frame 001 so it renders without delay
    const firstImg = new window.Image();
    firstImg.src = getFrameUrl(0);

    const onFirstImageReady = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      if (!initialFrameRenderedRef.current) {
        initialFrameRenderedRef.current = true;
        drawFrame(0);
      }
    };

    if (firstImg.complete) {
      onFirstImageReady();
    } else {
      firstImg.onload = onFirstImageReady;
    }

    // 2. Preload the remaining image sequence quietly in memory
    for (let i = 1; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isCancelled) {
          imagesRef.current[i] = img;
        }
      };
      if (img.complete && img.naturalWidth > 0) {
        imagesRef.current[i] = img;
      }
    }

    // 3. Create GSAP ScrollTrigger pinning and scrubbing instance
    let trigger: ScrollTrigger | null = null;

    if (sectionRef.current) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollDistanceVh}vh`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.floor(progress * (totalFrames - 1));
          renderFrame(frameIndex);

          // Gracefully fade out narrative content as camera tour begins (progress 0 -> 0.16)
          if (contentOverlayRef.current) {
            const fade = Math.min(1, progress * 6);
            const opacity = Math.max(0, 1 - fade);
            contentOverlayRef.current.style.opacity = String(opacity);
            contentOverlayRef.current.style.transform = `translateY(${fade * 24}px)`;
            contentOverlayRef.current.style.pointerEvents =
              opacity < 0.1 ? "none" : "auto";
          }
          if (bottomFadeRef.current) {
            const fade = Math.min(1, progress * 6);
            bottomFadeRef.current.style.opacity = String(Math.max(0, 1 - fade));
          }
        },
      });
    }

    // 4. Handle resize and orientation changes
    const handleResize = () => {
      updateCanvasDimensions();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (trigger) {
        trigger.kill();
      }
    };
  }, [
    getFrameUrl,
    drawFrame,
    renderFrame,
    scrollDistanceVh,
    totalFrames,
    updateCanvasDimensions,
  ]);

  return (
    <section
      ref={sectionRef}
      className={`property-tour-section relative w-full h-screen overflow-hidden bg-neutral-950 ${className}`}
      aria-label="Cinematic Property Tour"
    >
      {/* HTML Canvas displaying scroll-controlled frame sequence */}
      <canvas
        ref={canvasRef}
        className="property-tour-canvas absolute inset-0 w-full h-full block select-none pointer-events-none"
      />

      {/* Subtle, low-opacity black fade from bottom for readability */}
      <div
        ref={bottomFadeRef}
        className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Optional Top Navigation Bar */}
      {navbar && (
        <div className="absolute top-0 inset-x-0 z-30 pointer-events-auto">
          {navbar}
        </div>
      )}

      {/*
        .property-tour-content
        Overlay layer containing:
        - heading
        - description
        - CTA
        - small label
      */}
      <div
        ref={contentOverlayRef}
        className="property-tour-content absolute inset-0 z-20 pointer-events-none flex flex-col justify-end transition-opacity duration-300"
      >
        {children ? (
          children
        ) : (
          <div className="relative z-20 w-full px-6 pb-4 sm:px-10 sm:pb-4 md:px-12 md:pb-5 lg:px-14 lg:pb-23 pointer-events-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 w-full">
              {/* Left Column: Headlines, Avatars & Narrative */}
              <div className="flex-1 max-w-5xl flex flex-col gap-0.5 sm:gap-1">
                {/* Row 1: Bold Sans Headline + Social Proof Stack */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-semibold tracking-tight text-neutral-100 leading-none">
                    Elevate every horizon
                  </h1>

                  {/* Social Proof Avatar Stack Badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-100/80 backdrop-blur-md border border-neutral-100/20">
                    <div className="flex items-center">
                      <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-neutral-50">
                        <Image
                          src="/assets/images/avatar1.jpg"
                          alt="Private Resident"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-neutral-50 -ml-2">
                        <Image
                          src="/assets/images/avatar2.jpg"
                          alt="Private Resident"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border-2 border-neutral-50 -ml-2">
                        <Image
                          src="/assets/images/avatar3.jpg"
                          alt="Private Resident"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-800 leading-none">
                        3,400+
                      </span>
                      <span className="text-[10px] text-neutral-700 font-normal leading-tight mt-0.5">
                        Satisfied Clients
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Editorial Serif Italic Accent + Bold Modern Sans (Strictly One Line) */}
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[44px] tracking-tight leading-none whitespace-nowrap -mt-0.5">
                  <span className="font-serif italic font-normal text-neutral-200 mr-2 sm:mr-3">
                    sculpted for modern legacy.
                  </span>
                  <span className="font-semibold text-neutral-100">
                    Iconic living
                  </span>
                </div>

                {/* Row 3: Narrative Subtext */}
                {/* <p className="text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed max-w-xl pt-2">
                  Discover private architectural sanctuaries crafted with
                  deliberate proportion, honest materiality, and enduring
                  tranquility across premier coastal destinations.
                </p> */}
              </div>

              {/* Right Column: Button on Right Bottom */}
              <div className="self-end flex-shrink-0">
                <Link
                  href="#listings"
                  className="group inline-flex items-center -space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                  aria-label="Browse Listings"
                >
                  {/* Left Pill - White like Private Tour */}
                  <div
                    className="h-11 sm:h-12 px-6 rounded-full bg-white/95 border border-white/80 text-neutral-900 font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center group-hover:text-[#3074FE] transition-colors duration-300"
                    style={{
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 10px 0 rgba(255, 255, 255, 0.6), 0 4px 16px -2px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <span>Browse Listings</span>
                  </div>

                  {/* Right Circular Icon Badge - #3074FE like Inquire Button */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center transition-all duration-300 ease-out z-10 -translate-y-1 sm:-translate-y-1.5 -rotate-10 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-2 group-hover:brightness-110"
                    style={{
                      backgroundColor: "#3074FE",
                      boxShadow:
                        "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 0 12px 0 rgba(255, 255, 255, 0.3), 0 4px 16px -2px rgba(48, 116, 254, 0.4)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-white transition-transform duration-300 ease-out group-hover:scale-110"
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
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

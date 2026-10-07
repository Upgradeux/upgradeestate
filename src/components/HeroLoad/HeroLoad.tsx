"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./heroLoad.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroLoadProps {
  /** Total frames in the hero load sequence (default: 150) */
  totalFrames?: number;
  /** Frame path prefix */
  framePrefix?: string;
  /** Frame file extension */
  frameExt?: string;
  /** Desired playback frames per second (default: 30) */
  fps?: number;
  /** Optional callback fired when the hero load completes */
  onComplete?: () => void;
  /** Allow clicking "Skip" (default: true) */
  allowSkip?: boolean;
}

export default function HeroLoad({
  totalFrames = 150,
  framePrefix = "/hero-load/ezgif-frame-",
  frameExt = ".jpg",
  fps = 30,
  onComplete,
  allowSkip = true,
}: HeroLoadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  // Helper to format frame URL
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNumber = String(index + 1).padStart(3, "0");
      return `${framePrefix}${frameNumber}${frameExt}`;
    },
    [framePrefix, frameExt]
  );

  // Direct canvas drawing with aspect-ratio cover math and DPR
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const images = imagesRef.current;
      let img = images[index];

      // Graceful fallback to nearest available frame if still streaming
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

      // Cover calculation
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const drawX = (canvasWidth - drawWidth) / 2;
      const drawY = (canvasHeight - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [totalFrames]
  );

  // Resize canvas according to devicePixelRatio
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

  // Clean completion handler
  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (animFrameIdRef.current !== null) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    // Unlock document scrolling
    document.body.style.overflow = "";

    // Trigger smooth fade out
    setIsFadingOut(true);

    if (onComplete) {
      onComplete();
    }

    // Refresh ScrollTrigger once scroll unlocks
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Unmount from DOM after transition completes
    setTimeout(() => {
      setIsMounted(false);
      ScrollTrigger.refresh();
    }, 750);
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lock page scroll at top while hero intro plays
    window.scrollTo(0, 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    imagesRef.current = new Array(totalFrames).fill(null);
    updateCanvasDimensions();

    let isCancelled = false;

    // 1. Immediately prioritize and draw Frame 001
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);

    const onFirstReady = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };

    if (firstImg.complete) {
      onFirstReady();
    } else {
      firstImg.onload = onFirstReady;
    }

    // 2. Preload remaining sequence in memory
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isCancelled) {
          imagesRef.current[i] = img;
        }
      };
      img.onerror = () => {
        // Continue even if a frame fails
      };
    }

    // 3. Delta-time accurate playback loop at target fps
    const targetInterval = 1000 / fps;
    let lastTime = performance.now();
    let frameIndex = 0;

    const loop = (now: number) => {
      if (isCancelled || hasFinishedRef.current) return;

      const elapsed = now - lastTime;
      if (elapsed >= targetInterval) {
        const framesToAdvance = Math.floor(elapsed / targetInterval);
        lastTime = now - (elapsed % targetInterval);

        frameIndex = Math.min(totalFrames - 1, frameIndex + framesToAdvance);
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);

        setPlaybackProgress(
          Math.min(100, Math.round(((frameIndex + 1) / totalFrames) * 100))
        );

        if (frameIndex >= totalFrames - 1) {
          // Playback finished smoothly
          finishIntro();
          return;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    // Keyboard 'Escape' to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && allowSkip) {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleResize = () => {
      updateCanvasDimensions();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    fps,
    totalFrames,
    getFrameUrl,
    drawFrame,
    updateCanvasDimensions,
    finishIntro,
    allowSkip,
  ]);

  if (!isMounted) return null;

  return (
    <div
      className={`hero-load-overlay ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Opening Architectural Film"
      role="dialog"
      aria-modal="true"
    >
      {/* High-DPI Canvas Sequence */}
      <canvas
        ref={canvasRef}
        className="hero-load-canvas select-none pointer-events-none"
      />

      {/* Cinematic Luxury Interface */}
      <div className="hero-load-ui flex flex-col justify-between p-6 sm:p-10 md:p-12">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-serif tracking-[0.25em] text-neutral-100 uppercase select-none">
              UPGRADE
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-400 uppercase select-none mt-0.5">
              Architectural Living
            </span>
          </div>

          {allowSkip && (
            <button
              onClick={finishIntro}
              type="button"
              className="hero-load-skip-btn px-4 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-100/20 text-neutral-300 hover:text-neutral-50 hover:bg-neutral-900/80 hover:border-neutral-100/40 text-[11px] font-medium tracking-widest uppercase transition-all duration-300 active:scale-95"
              aria-label="Skip intro animation"
            >
              Skip
            </button>
          )}
        </div>

        {/* Bottom Timeline Indicator */}
        <div className="w-full flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neutral-100 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-300 font-mono">
              INITIALIZING EXPERIENCE
            </span>
          </div>

          <span className="text-[11px] font-mono tracking-wider text-neutral-400">
            {playbackProgress}%
          </span>
        </div>
      </div>

      {/* Subtle Bottom Progress Hairline */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-neutral-800/40 z-10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-neutral-400 via-neutral-100 to-white transition-all duration-75 ease-out"
          style={{ width: `${playbackProgress}%` }}
        />
      </div>
    </div>
  );
}

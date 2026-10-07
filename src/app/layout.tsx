import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif-luxury",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "UPGRADE — Architectural Living & Bespoke Estates",
  description:
    "Elevate every horizon. Discover private architectural sanctuaries crafted with deliberate proportion and enduring tranquility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased bg-neutral-900 text-neutral-100`}
    >
      <body className="min-h-full flex flex-col bg-neutral-900 text-neutral-100 selection:bg-neutral-700 selection:text-neutral-100">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

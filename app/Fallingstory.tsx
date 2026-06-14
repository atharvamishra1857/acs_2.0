"use client";

import { useRef, type ReactNode } from "react";
import FallingObject from "./FallingObject";

interface FallingStoryProps {
  images: { src: string; alt: string }[];
  children: ReactNode;
  className?: string;
}

export default function FallingStory({ images, children, className = "" }: FallingStoryProps) {
  // We use this ref to track exactly how far the user has scrolled through this specific section
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      // CRITICAL FIX: Removed overflow-hidden so sticky positioning works. 
      // Using overflow-clip to safely contain backgrounds without breaking sticky.
      className={`relative w-full bg-brand-dark overflow-clip ${className}`}
    >
      {/* Ambient Backgrounds */}
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-brand-orange/12 via-transparent to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

      {/* The Scroll Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 lg:gap-20">
        
        {/* RIGHT COLUMN (Image): Locked to the screen */}
        <div className="order-1 lg:order-2 sticky top-24 lg:top-0 h-[40vh] lg:h-screen flex items-center justify-center z-20">
          <FallingObject containerRef={containerRef} images={images} />
        </div>

        {/* LEFT COLUMN (Text): Scrolls naturally */}
        <div className="order-2 lg:order-1 flex flex-col pb-24 lg:pb-32 z-10">
          {children}
        </div>

      </div>
    </section>
  );
}
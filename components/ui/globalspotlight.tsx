"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

export default function GlobalSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on mobile/reduced motion devices to save battery and performance
    if (reducedMotion || !spotlightRef.current) return;

    // Create fast, smooth GSAP trackers
    const xTo = gsap.quickTo(spotlightRef.current, "left", { duration: 0.6, ease: "power2.out" });
    const yTo = gsap.quickTo(spotlightRef.current, "top", { duration: 0.6, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={spotlightRef}
      className="fixed pointer-events-none z-[99] rounded-full"
      style={{
        width: '600px',
        height: '600px',
        // Increased opacity from 0.06 to 0.15 for a much stronger, visible orange glow
        background: 'radial-gradient(circle, rgba(255,90,0,0.15) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        // The 'screen' blend mode ensures it brightens the UI underneath it like real light
        mixBlendMode: 'screen', 
        left: '-1000px', // Starts off-screen so it doesn't flash in the corner
        top: '-1000px'
      }}
    />
  );
}
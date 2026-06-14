"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

interface FallingObjectProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  images: { src: string; alt: string }[];
  className?: string;
}

export default function FallingObject({
  containerRef,
  images,
  className = "",
}: FallingObjectProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Track the scroll progress of the entire parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // Triggers right as sections cross the middle of the screen
  });

  // Calculate which image should be visible based on scroll depth
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalImages = images.length;
    // Map the 0-1 progress to an array index
    const index = Math.min(totalImages - 1, Math.floor(latest * totalImages));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div className={`relative w-full max-w-md lg:max-w-lg aspect-square lg:aspect-[4/3] perspective-[1000px] ${className}`}>
      
      {/* 3D Container Box */}
      <div className="relative w-full h-full overflow-hidden rounded-sm border border-brand-gray bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.45)] transform-style-3d">
        
        {/* Dynamic Image Transitions */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            // Starts shrunk, flipped, and clipped into a tiny invisible circle
            initial={{ opacity: 0, scale: 0.8, rotateY: 45, clipPath: "circle(0% at 50% 50%)" }}
            // Expands to full size, straightens out, and the circle opens up
            animate={{ opacity: 1, scale: 1, rotateY: 0, clipPath: "circle(150% at 50% 50%)" }}
            // Flips away and shrinks back into a circle on exit
            exit={{ opacity: 0, scale: 1.1, rotateY: -45, clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays & Hardware Styling */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent opacity-85 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-br from-brand-orange/10 via-transparent to-transparent z-20 pointer-events-none" />
        
        {/* Corner Brackets */}
        <div className="absolute top-4 right-4 z-30 h-10 w-10 border-t-2 border-r-2 border-brand-orange" />
        <div className="absolute bottom-4 left-4 z-30 h-10 w-10 border-b-2 border-l-2 border-brand-orange" />
      </div>
      
    </div>
  );
}
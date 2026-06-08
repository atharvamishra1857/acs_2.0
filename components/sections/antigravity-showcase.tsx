"use client";

import React, { useRef } from "react";
import { motion, Variants } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AntigravityShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  // Background GSAP Antigravity Animation
  useGSAP(() => {
    if (!shapesRef.current) return;
    
    // Select all the floating shape elements
    const shapes = gsap.utils.toArray<HTMLElement>(".antigravity-shape");
    
    shapes.forEach((shape) => {
      // Randomize initial properties for heavy industrial drift
      const randomX = gsap.utils.random(-80, 80);
      const randomY = gsap.utils.random(-80, 80);
      const randomRotation = gsap.utils.random(-45, 45);
      const randomDuration = gsap.utils.random(15, 25); // Heavy, slow duration
      const randomDelay = gsap.utils.random(0, 5);
      
      // Initial state
      gsap.set(shape, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
      });

      // Continuous heavy floating animation
      gsap.to(shape, {
        x: () => gsap.utils.random(-120, 120),
        y: () => gsap.utils.random(-120, 120),
        rotation: () => gsap.utils.random(-90, 90),
        duration: randomDuration,
        delay: randomDelay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, { scope: containerRef });

  // Framer Motion foreground variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, filter: "blur(0px)" }, // Removed blur for sharp industrial look
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: "easeOut" // Heavy, solid easing
      } 
    },
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-brand-dark overflow-hidden flex items-center justify-center py-32"
    >
      {/* GSAP Floating Background Layer */}
      <div 
        ref={shapesRef} 
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-100"
      >
        {/* Abstract metallic geometric shapes */}
        <div className="antigravity-shape absolute w-48 h-48 border-4 border-brand-orange/20 rotate-12" style={{ willChange: "transform" }} />
        <div className="antigravity-shape absolute w-64 h-64 border-2 border-brand-gray/40 rounded-sm" style={{ willChange: "transform" }} />
        <div className="antigravity-shape absolute w-32 h-32 border-t-4 border-l-4 border-brand-gray/30 rounded-tl-sm" style={{ willChange: "transform" }} />
        <div className="antigravity-shape absolute w-16 h-16 bg-brand-orange/10 rounded-sm rotate-45" style={{ willChange: "transform" }} />
      </div>

      {/* Foreground Content with Framer Motion */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.p 
            variants={itemVariants}
            className="font-script text-3xl md:text-5xl text-brand-orange mb-6"
          >
            The Perfect Cut... Always
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="font-sans text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-8"
          >
            Weightless <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-white/80">
              Precision
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-sans text-lg md:text-xl text-brand-light/80 font-medium max-w-2xl mb-12 leading-relaxed"
          >
            Engineered to perfection. Our advanced cutting systems handle the heaviest industrial loads with zero friction, combining brute force with absolute accuracy.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button className="px-10 py-5 bg-brand-orange text-white font-sans font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-white hover:text-brand-orange transition-colors duration-300">
              Explore Technology
            </button>
            <button className="px-10 py-5 border-2 border-brand-gray text-white font-sans font-bold uppercase tracking-widest text-sm rounded-sm hover:border-brand-orange hover:bg-brand-orange/10 transition-colors duration-300">
              View Specifications
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

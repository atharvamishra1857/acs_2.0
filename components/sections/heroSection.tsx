"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/motion";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Left Column Timeline ---
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-eyebrow-line", { width: 0, duration: 0.6, ease: "power4.out" });
      tl.from(".hero-eyebrow-text", { opacity: 0, x: -10, duration: 0.6, ease: "power4.out" }, "-=0.4");
      tl.from(".hero-headline-word", { y: 60, clipPath: "inset(100% 0% 0% 0%)", duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.2");
      tl.from(".hero-fade-up", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.4");

      // --- Right Column Image Animations ---
      gsap.from(".corner-bracket", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.5)", delay: 0.8 });

      // --- Local Mouse Interaction (Card Tilt & Specular Highlight only) ---
      const xTo = gsap.quickTo(imageCardRef.current, "rotationY", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(imageCardRef.current, "rotationX", { duration: 0.4, ease: "power3.out" });
      const highlightX = gsap.quickTo(".specular-highlight", "x", { duration: 0.3, ease: "power2.out" });
      const highlightY = gsap.quickTo(".specular-highlight", "y", { duration: 0.3, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (imageCardRef.current) {
          const rect = imageCardRef.current.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = ((relX - centerX) / centerX) * 5;
          const rotateX = ((relY - centerY) / centerY) * -5;

          xTo(rotateY);
          yTo(rotateX);
          highlightX(relX);
          highlightY(relY);
        }
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      window.addEventListener("mousemove", handleMouseMove);
      imageCardRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        imageCardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-brand-dark">
      <style>{`
        .bg-grid-drift {
          animation: gridDrift 20s linear infinite;
        }
        @keyframes gridDrift {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: textShimmer 4s linear infinite;
        }
        @keyframes textShimmer {
          to { background-position: 200% center; }
        }
        .scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(255,90,0,0.1), transparent);
          pointer-events: none;
          animation: scanDown 5s linear infinite;
          z-index: 10;
        }
        @keyframes scanDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400px); }
        }
      `}</style>

      {/* Grid Drift */}
      <div className="absolute -top-16 -bottom-16 -left-16 -right-16 opacity-12 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] bg-grid-drift" />
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-brand-orange/12 via-transparent to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24 pt-32 pb-24">
        
        {/* Left Column */}
        <div ref={leftColRef} className="flex w-full flex-col items-start lg:w-1/2">
          <div className="mb-6 flex items-center gap-3">
            <span className="hero-eyebrow-line h-1 w-8 bg-brand-orange inline-block" />
            <span className="hero-eyebrow-text text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-orange inline-block">
              Industrial Band Sawing Solutions
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-7xl overflow-hidden pb-2">
            <span className="hero-headline-word inline-block" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>Engineered</span>{" "}
            <span className="hero-headline-word inline-block" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>for</span> <br />
            <span className="hero-headline-word inline-block animate-shimmer bg-[linear-gradient(90deg,#FF5A00,#ff8a4c,#FF5A00)] bg-clip-text text-transparent" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
              Lower Cutting Costs.
            </span>
          </h1>

          <div className="hero-fade-up mt-6 max-w-xl space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-white/70">
              ACS delivers high-performance band saw machines designed to improve productivity, reduce blade consumption, and lower operating costs across demanding manufacturing environments.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-white/50">
              From automotive and forging industries to aerospace, defense, fabrication, and steel processing, manufacturers worldwide rely on ACS for reliable cutting performance and long-term value.
            </p>
          </div>

          {/* Value Proposition Grid */}
          <div className="hero-fade-up mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full max-w-xl">
            {[
              "Lower operating costs",
              "Faster cutting performance",
              "Reduced blade consumption",
              "Precision and repeatability",
              "Global support and service",
              "Customized cutting solutions"
            ].map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold shrink-0">✓</span>
                <span className="text-sm font-medium text-gray-300">{perk}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-fade-up mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <MagneticButton
              href="/machines"
              className="inline-flex justify-center rounded-sm border border-brand-orange bg-brand-orange px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(255,90,0,0.4)]"
            >
              Explore Solutions
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-flex justify-center rounded-sm border border-brand-gray bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-500 hover:border-brand-orange hover:bg-brand-orange/5"
            >
              Request a Quote
            </MagneticButton>
          </div>

          {/* Bottom Quick Links */}
          <div className="hero-fade-up mt-12 w-full border-t border-brand-gray/50 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Link href="/machines/double-column" className="hover:text-brand-orange transition-colors">Double Column</Link>
              <span className="hidden sm:inline text-brand-gray">/</span>
              <Link href="/machines/vertical-column" className="hover:text-brand-orange transition-colors">Vertical Band Saws</Link>
              <span className="hidden sm:inline text-brand-gray">/</span>
              <Link href="/machines/double-column" className="hover:text-brand-orange transition-colors">Miter Cutting</Link>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-[1000px] mt-10 lg:mt-0">
          <div className="relative group w-full max-w-180">
            <div className="absolute -inset-8 rounded-full bg-brand-orange/25 blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute -inset-3 rounded-2xl border border-brand-orange/20 pointer-events-none" />

            {/* 3D Tilt Card */}
            <div 
              ref={imageCardRef}
              className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-sm border border-brand-gray bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.45)] transform-style-3d will-change-transform"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-orange/12 via-transparent to-transparent z-10 pointer-events-none" />
              
              <Image
                src="/images/products/ACS machine.jpeg"
                alt="ACS High-Performance Band Saw Machine"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-[1.05]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent opacity-85 z-10 pointer-events-none" />

              {/* Specular Highlight tracking mouse */}
              <div 
                className="specular-highlight absolute w-[200px] h-[200px] bg-white/10 rounded-full blur-3xl pointer-events-none z-20"
                style={{ top: -100, left: -100 }}
              />

              <div className="scanline" />

              <div className="corner-bracket absolute top-4 right-4 z-20 h-12 w-12 border-t-2 border-r-2 border-brand-orange" style={{ transformOrigin: "top right" }} />
              <div className="corner-bracket absolute bottom-4 left-4 z-20 h-12 w-12 border-b-2 border-l-2 border-brand-orange" style={{ transformOrigin: "bottom left" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/motion";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Mouse tracking for tilt and spotlight
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Left Column Timeline ---
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Eyebrow line draws in
      tl.from(".hero-eyebrow-line", {
        width: 0,
        duration: 0.6,
        ease: "power4.out",
      });
      tl.from(".hero-eyebrow-text", {
        opacity: 0,
        x: -10,
        duration: 0.6,
        ease: "power4.out",
      }, "-=0.4");

      // 2. Headline words clip-path reveal
      tl.from(".hero-headline-word", {
        y: 60,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      }, "-=0.2");

      // 3. Body text + CTAs + Stats stagger
      tl.from(".hero-fade-up", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      }, "-=0.4");

      // --- Right Column Image Animations ---
      // Corner brackets sequentially
      gsap.from(".corner-bracket", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.5)",
        delay: 0.8,
      });

      // Floating badge (delayed loop)
      gsap.fromTo(".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", delay: 1.2 }
      );
      gsap.to(".hero-badge-inner", {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2, // Start looping after entrance
      });

      // --- Mouse Interaction setup ---
      const xTo = gsap.quickTo(imageCardRef.current, "rotationY", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(imageCardRef.current, "rotationX", { duration: 0.4, ease: "power3.out" });
      const highlightX = gsap.quickTo(".specular-highlight", "x", { duration: 0.3, ease: "power2.out" });
      const highlightY = gsap.quickTo(".specular-highlight", "y", { duration: 0.3, ease: "power2.out" });
      const spotlightX = gsap.quickTo(".hero-spotlight", "left", { duration: 0.6, ease: "power2.out" });
      const spotlightY = gsap.quickTo(".hero-spotlight", "top", { duration: 0.6, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        // Global spotlight
        spotlightX(e.clientX);
        spotlightY(e.clientY);

        // Image tilt and specular highlight
        if (imageCardRef.current) {
          const rect = imageCardRef.current.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Max rotation: 5 degrees
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
          100% { transform: translateY(4rem); } /* Matches background size */
        }
        .hero-spotlight {
          position: fixed;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,90,0,0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 0;
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

      {/* Ambient Spotlight */}
      {!reducedMotion && <div className="hero-spotlight" />}

      {/* Grid Drift */}
      <div className="absolute -top-16 -bottom-16 -left-16 -right-16 opacity-12 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] bg-grid-drift" />
      
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-brand-orange/12 via-transparent to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24 pt-32 pb-24">
        {/* Left Column */}
        <div ref={leftColRef} className="flex w-full flex-col items-start lg:w-1/2">
          <div className="mb-6 flex items-center gap-3">
            <span className="hero-eyebrow-line h-1 w-8 bg-brand-orange inline-block" />
            <span className="hero-eyebrow-text text-sm font-bold uppercase tracking-[0.25em] text-brand-orange inline-block">
              Industrial Grade Precision
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-7xl overflow-hidden pb-2">
            <span className="hero-headline-word inline-block" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>Engineered</span>{" "}
            <span className="hero-headline-word inline-block" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>for</span> <br />
            <span className="hero-headline-word inline-block animate-shimmer bg-[linear-gradient(90deg,#FF5A00,#ff8a4c,#FF5A00)] bg-clip-text text-transparent" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
              Unyielding
            </span>{" "}
            <span className="hero-headline-word inline-block" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>Performance.</span>
          </h1>

          <div className="hero-fade-up mt-6 max-w-xl">
            <p className="text-lg leading-relaxed text-white/60">
              Heavy-duty, high-efficiency bandsaw machines built to dominate the toughest manufacturing environments. Maximum precision, minimal downtime.
            </p>
          </div>

          <div className="hero-fade-up mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <MagneticButton
              href="#machines"
              className="inline-flex justify-center rounded-md border border-brand-gray bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-500 hover:border-brand-orange hover:bg-brand-orange/5"
            >
              Explore Our Machines
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-flex justify-center rounded-md border border-brand-gray bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-500 hover:border-brand-orange hover:bg-brand-orange/5"
            >
              Request a Quote
            </MagneticButton>
          </div>

          <div className="hero-fade-up mt-12 w-full border-t border-brand-gray pt-8">
            <div className="flex items-center gap-10">
              <div>
                <p className="text-4xl font-extrabold text-white">
                  20<span className="text-brand-orange">+</span>
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-gray">
                  Years Trusted
                </p>
              </div>
              <div className="h-12 w-px bg-brand-gray" />
              <div>
                <p className="text-4xl font-extrabold text-white">ISO</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-gray">
                  Certified Quality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end perspective-[1000px]">
          <div className="relative group w-full max-w-180">
            <div className="absolute -inset-8 rounded-full bg-brand-orange/25 blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute -inset-3 rounded-2xl border border-brand-orange/20 pointer-events-none" />

            {/* 3D Tilt Card */}
            <div 
              ref={imageCardRef}
              className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-xl border border-brand-gray bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.45)] transform-style-3d will-change-transform"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-orange/12 via-transparent to-transparent z-10 pointer-events-none" />
              
              <Image
                src="/images/products/ACS machine.jpeg"
                alt="ACS Heavy-Duty Bandsaw Machine"
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

              {/* Scanline */}
              <div className="scanline" />

              {/* Corner Brackets */}
              <div className="corner-bracket absolute top-4 right-4 z-20 h-12 w-12 border-t-2 border-r-2 border-brand-orange" style={{ transformOrigin: "top right" }} />
              <div className="corner-bracket absolute bottom-4 left-4 z-20 h-12 w-12 border-b-2 border-l-2 border-brand-orange" style={{ transformOrigin: "bottom left" }} />
              
              {/* Floating Badge */}
              {/* <div className="hero-badge absolute top-8 left-8 z-30">
                <div className="hero-badge-inner bg-brand-orange/10 backdrop-blur-md border border-brand-orange/30 rounded-sm px-4 py-2 flex items-center gap-2 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Smart Setup</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

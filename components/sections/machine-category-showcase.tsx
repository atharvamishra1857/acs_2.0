"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/motion";
import MachineTabs from "@/components/ui/MachineTabs";

type CategoryData = {
  title: string;
  subtitle: string;
  description: string;
  products: Array<{
    id: string;
    name: string;
    type: string;
    image: string;
    features: string[];
    standardAccessories: string[];
    optionalAccessories: string[];
  }>;
};

export default function MachineCategoryShowcase({
  categoryData,
}: {
  categoryData: CategoryData;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const headerGlow = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Header Reveal
      const tlHeader = gsap.timeline({ delay: 0.1 });
      tlHeader.from(".header-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      // Product Cards Stagger Reveal
      gsap.utils.toArray(".machine-card").forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        });
      });

      // Orange underline clip-path draws
      gsap.utils.toArray(".draw-underline").forEach((line: any) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          },
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 0.7,
          ease: "power4.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col bg-brand-light"
    >
      <section className="relative overflow-hidden border-b-4 border-brand-orange bg-brand-dark py-24 text-center">
        <motion.div
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[4rem_4rem]"
          style={reducedMotion ? undefined : { opacity: headerGlow }}
        />
        <motion.div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-brand-orange/10 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <span className="header-reveal mb-4 block text-sm font-bold uppercase tracking-widest text-brand-orange">
            {categoryData.subtitle}
          </span>
          <h1 className="header-reveal mb-6 text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
            {categoryData.title}
          </h1>
          <p className="header-reveal mx-auto max-w-3xl text-lg leading-relaxed text-white/60">
            {categoryData.description}
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl grow flex-col gap-24 px-6 py-20 lg:px-8">
        {categoryData.products.length > 0 ? (
          categoryData.products.map((machine, index) => (
            <div
              key={machine.id}
              className={`machine-card grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${index % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className="lg:col-span-5 lg:[direction:ltr]">
                <div className="group relative overflow-hidden rounded-sm border border-brand-gray/50 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5">
                  {/* <div className="relative aspect-4/3 w-full lg:aspect-auto lg:h-[420px]">
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      fill
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      priority={index === 0}
                    />
                  </div> */}
                  <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[420px] bg-gray-100">
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  {/* Wipe in orange border */}
                  <div className="absolute bottom-0 left-0 h-1.5 bg-brand-orange w-full origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-30" />
                </div>
              </div>

              <div className="lg:col-span-7 lg:[direction:ltr]">
                <div className="mb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tight text-brand-dark mb-3">
                    {machine.name}
                  </h2>
                  <div
                    className="draw-underline h-1 w-16 bg-brand-orange"
                    style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  />
                </div>

                <div className="mb-8">
                  <MachineTabs
                    features={machine.features}
                    standardAccessories={machine.standardAccessories}
                    optionalAccessories={machine.optionalAccessories}
                  />
                </div>

                <div className="item-center">
                  <MagneticButton
                    href="/contact"
                    className="inline-flex justify-center rounded-sm bg-brand-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_12px_25px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-brand-orange"
                  >
                    Request Quote
                  </MagneticButton>
                  {/* <MagneticButton
                    className="inline-flex justify-center rounded-sm border-2 border-brand-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-dark transition-colors duration-300 hover:bg-brand-dark hover:text-white"
                    onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
                  >
                    {/* <span className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Brochure
                    </span> */}
                  {/* </MagneticButton>  */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-sm border border-brand-gray/50 bg-white py-24 text-center">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-brand-dark/60">
              Specifications Upcoming
            </h3>
            <p className="mt-2 text-brand-gray">
              The engineering team is currently updating the catalog for{" "}
              {categoryData.title}.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

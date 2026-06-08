"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MagneticButton, MotionFrame, Reveal, Stagger, StaggerItem, motionEase } from "@/components/ui/motion";

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
  }>;
};

export default function MachineCategoryShowcase({ categoryData }: { categoryData: CategoryData }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const headerGlow = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-light">
      <section className="relative overflow-hidden border-b-4 border-brand-orange bg-brand-dark py-24 text-center">
        <motion.div
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[4rem_4rem]"
          style={reducedMotion ? undefined : { opacity: headerGlow }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-brand-orange/10 via-transparent to-transparent"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Reveal className="mb-4 block text-sm font-bold uppercase tracking-widest text-brand-orange">
            {categoryData.subtitle}
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mb-6 text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
              {categoryData.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/60">
              {categoryData.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl grow flex-col gap-24 px-6 py-20 lg:px-8">
        {categoryData.products.length > 0 ? (
          categoryData.products.map((machine, index) => (
            <div
              key={machine.id}
              className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${index % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
            >
              <MotionFrame className="lg:col-span-5 lg:[direction:ltr]">
                <motion.div
                  className="group relative overflow-hidden rounded-sm border border-brand-gray/50 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.45, ease: motionEase }}
                >
                  <div className="absolute left-4 top-4 z-20 rounded-sm bg-brand-dark px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                    {machine.type}
                  </div>
                  <Image
                    src={machine.image}
                    alt={machine.name}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              </MotionFrame>

              <div className="lg:col-span-7 lg:[direction:ltr]">
                <Reveal>
                  <h2 className="mb-6 text-3xl font-black uppercase tracking-tight text-brand-dark">
                    {machine.name}
                  </h2>
                </Reveal>

                <MotionFrame className="mb-8 rounded-sm border border-brand-gray/50 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 border-b border-brand-gray/20 pb-2 text-xs font-bold uppercase tracking-widest text-brand-gray">
                    Standard Features & Specifications
                  </h3>
                  <Stagger className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-6">
                    {machine.features.map((feature) => (
                      <StaggerItem key={feature} className="flex items-start gap-3 text-sm font-medium text-brand-dark">
                        <span className="mt-0.5 font-bold text-brand-orange">✓</span>
                        <span className="leading-tight">{feature}</span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </MotionFrame>

                <Reveal delay={0.05}>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <MagneticButton
                      href="/contact"
                      className="inline-flex justify-center rounded-sm bg-brand-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_12px_25px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-brand-orange"
                    >
                      Request Quote
                    </MagneticButton>
                    <MagneticButton
                      className="inline-flex justify-center rounded-sm border-2 border-brand-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-dark transition-colors duration-300 hover:bg-brand-dark hover:text-white"
                      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Brochure
                      </span>
                    </MagneticButton>
                  </div>
                </Reveal>
              </div>
            </div>
          ))
        ) : (
          <MotionFrame className="rounded-sm border border-brand-gray/50 bg-white py-24 text-center">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-white/60">Specifications Upcoming</h3>
            <p className="mt-2 text-brand-gray">The engineering team is currently updating the catalog for {categoryData.title}.</p>
          </MotionFrame>
        )}
      </section>
    </div>
  );
}

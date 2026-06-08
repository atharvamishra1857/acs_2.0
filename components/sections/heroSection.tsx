"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagneticButton, Reveal, Stagger, StaggerItem, motionEase } from "@/components/ui/motion";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 opacity-12 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-brand-orange/12 via-transparent to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24">
        <Stagger className="flex w-full flex-col items-start lg:w-1/2">
          <StaggerItem className="mb-6 flex items-center gap-3">
            <span className="h-1 w-8 bg-brand-orange" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-brand-orange">
              Industrial Grade Precision
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-7xl">
              Engineered for <br />
              <span className="bg-linear-to-r from-brand-orange to-brand-orange bg-clip-text text-transparent">
                Unyielding
              </span>{" "}
              Performance.
            </h1>
          </StaggerItem>

          <StaggerItem className="mt-6 max-w-xl">
            <p className="text-lg leading-relaxed text-white/60">
              Heavy-duty, high-efficiency bandsaw machines built to dominate the toughest manufacturing environments. Maximum precision, minimal downtime.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <MagneticButton
              href="#machines"
              className="inline-flex rounded-md border border-brand-gray bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-500 hover:border-brand-orange hover:bg-brand-orange/5"
            >
              Explore Our Machines
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-flex rounded-md border border-brand-gray bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-500 hover:border-brand-orange hover:bg-brand-orange/5"
            >
              Request a Quote
            </MagneticButton>
          </StaggerItem>

          <StaggerItem className="mt-12 w-full border-t border-brand-gray pt-8">
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
          </StaggerItem>
        </Stagger>

        <Reveal direction="right" className="w-full lg:w-1/2 lg:justify-end">
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              className="group relative w-full max-w-180"
            >
              <div className="absolute -inset-8 rounded-full bg-brand-orange/25 blur-3xl opacity-20" />
              <div className="absolute -inset-3 rounded-2xl border border-brand-orange/20" />

              <motion.div
                className="relative aspect-square overflow-hidden rounded-xl border border-brand-gray bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:aspect-4/3"
                whileHover={reducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.55, ease: motionEase }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-brand-orange/12 via-transparent to-transparent" />

                <Image
                  src="/images/products/ACS machine.jpeg"
                  alt="ACS Heavy-Duty Bandsaw Machine"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent opacity-85" />

                <div className="absolute top-4 right-4 z-20 h-12 w-12 border-t-2 border-r-2 border-brand-orange/50" />
                <div className="absolute bottom-4 left-4 z-20 h-1 w-16 bg-brand-orange" />
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

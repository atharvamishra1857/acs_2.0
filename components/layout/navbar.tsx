"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MagneticButton, motionEase } from "@/components/ui/motion";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-brand-gray/15 bg-white/88 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      initial={reducedMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: motionEase }}
    >
      <motion.div
        className="h-1 w-full origin-left bg-linear-to-r from-brand-orange via-brand-orange to-brand-orange/30"
        style={{ scaleX: progressScale }}
      />

      <nav className="mx-auto flex h-32 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="hidden flex-1 items-center justify-end gap-8 pr-10 lg:flex lg:pr-16">
          <MotionLink
            href="/"
            className="text-sm font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-orange"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.25, ease: motionEase }}
          >
            Home
          </MotionLink>

          <div className="group relative py-6">
            <MotionLink
              href="/machines"
              className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-orange"
              whileHover={reducedMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.25, ease: motionEase }}
            >
              Our Machines
              <motion.svg
                className="h-4 w-4"
                transition={{ duration: 0.3, ease: motionEase }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </MotionLink>

            <div className="pointer-events-none absolute left-0 top-full w-64 origin-top-left rounded-b-sm border-t-4 border-brand-orange bg-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] opacity-0 translate-y-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex flex-col">
                <Link
                  href="/machines/double-column"
                  className="border-b border-brand-gray/20 px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-light hover:text-brand-orange"
                >
                  Double Column Bandsaw
                </Link>
                <Link
                  href="/machines/vertical-column"
                  className="border-b border-brand-gray/20 px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-light hover:text-brand-orange"
                >
                  Vertical Column Bandsaw
                </Link>
                <Link
                  href="/machines/circular-saw"
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark transition-colors hover:bg-brand-light hover:text-brand-orange"
                >
                  Circular Saw
                </Link>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="shrink-0 text-center"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: motionEase }}
        >
          <Link href="/" className="flex cursor-pointer flex-col items-center group">
            <motion.div
              className="relative h-16 w-36"
              whileHover={reducedMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.3, ease: motionEase }}
            >
              <Image
                src="/images/ACS_LOGO.png"
                alt="ACS Logo Block"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 150px, 200px"
                priority
              />
            </motion.div>

            <span className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand-dark transition-transform duration-300 group-hover:-translate-y-0.5">
              Accurate Cutting Systems
            </span>

            <span className="mt-0.5 font-script text-2xl text-brand-dark transition-transform duration-300 group-hover:-translate-y-0.5">
              The Perfect Cut... <span className="text-brand-orange">Always</span>
            </span>
          </Link>
        </motion.div>

        <div className="hidden flex-1 items-center justify-start gap-8 pl-10 lg:flex lg:pl-16">
          <MotionLink
            href="/about"
            className="text-sm font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-orange"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.25, ease: motionEase }}
          >
            About Us
          </MotionLink>
          <MagneticButton
            href="/contact"
              className="inline-flex rounded-sm bg-brand-dark px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition-colors hover:bg-brand-orange"
          >
            Get a Quote
          </MagneticButton>
        </div>

        <div className="flex flex-1 justify-end md:hidden">
          <button className="p-2 text-brand-dark focus:outline-none" aria-label="Open navigation menu">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

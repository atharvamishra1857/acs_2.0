"use client";

import Link from "next/link";
import { Reveal, motionEase } from "@/components/ui/motion";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const reducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} className="border-t-4 border-brand-orange bg-brand-dark pb-8 pt-20 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="footer-col md:col-span-4 lg:col-span-5">
            <div className="mb-6 flex flex-col items-start">
              <span className="mb-1 text-4xl font-black leading-none tracking-tighter text-brand-orange">ACS</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                Accurate Cutting Systems
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Engineered for unyielding performance. We manufacture heavy-duty, industrial bandsaw machines built to dominate the toughest manufacturing environments.
              <br />
              <br />
              <span className="italic text-brand-orange">The Perfect Cut Always...</span>
            </p>
          </div>

          <div className="footer-col md:col-span-4 lg:col-span-3">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Equipment</h3>
            <ul className="space-y-4 text-sm text-white/60">
              {[
                ["/machines/vertical-column", "Vertical Column Bandsaws"],
                ["/machines/double-column", "Double Column Bandsaws"],
                ["/machines/circular-saw", "Circular Saw Bandsaws"],
                ["/spare-parts", "Blades & Spare Parts"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors duration-300 hover:text-brand-orange"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col md:col-span-4 lg:col-span-4">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Headquarters</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <span className="font-bold text-brand-orange">📍</span>
                <span>
                  Industrial Estate
                  <br />
                  Pune, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold text-brand-orange">📞</span>
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold text-brand-orange">✉️</span>
                <span>sales@acsmachines.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Reveal className="flex flex-col items-center justify-between gap-4 border-t border-brand-gray pt-8 text-xs font-medium text-brand-gray md:flex-row">
          <p>&copy; {new Date().getFullYear()} Accurate Cutting Systems (ACS). All rights reserved.</p>
          <div className="flex gap-6">
            {[
              ["/privacy", "Privacy Policy"],
              ["/terms", "Terms of Service"],
            ].map(([href, label]) => (
              <motion.div
                key={href}
                whileHover={reducedMotion ? undefined : { y: -1 }}
                transition={{ duration: 0.25, ease: motionEase }}
              >
                <Link href={href} className="transition-colors duration-300 hover:text-white">
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

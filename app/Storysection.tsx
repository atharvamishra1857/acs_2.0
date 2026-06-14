"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MagneticButton } from "@/components/ui/motion";

interface StorySectionCta {
  label: string;
  href: string;
}

interface StorySectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  /** Which side the copy slides in from. Purely visual on lg+. */
  align?: "left" | "right";
  cta?: StorySectionCta;
  children?: ReactNode;
  className?: string;
}

/**
 * A single beat of the scroll story, rendered inside the text column of
 * <FallingStory>. Fades in, slides up + in from one side, and un-blurs as
 * it enters the viewport - independent of the falling object's own
 * animation, which is driven separately by the overall story progress.
 */
export default function StorySection({
  eyebrow,
  title,
  description,
  align = "left",
  cta,
  children,
  className = "",
}: StorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [align === "right" ? 28 : -28, 0]
  );
  const rawBlurPx = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const blurFilter = useTransform(rawBlurPx, (v) => `blur(${v}px)`);

  const opacity = reducedMotion ? 1 : rawOpacity;
  const y = reducedMotion ? 0 : rawY;
  const x = reducedMotion ? 0 : rawX;
  const filter = reducedMotion ? "none" : blurFilter;

  return (
    <div
      ref={ref}
      className={`flex min-h-[70vh] lg:min-h-screen flex-col justify-center py-12 ${
        align === "right" ? "lg:items-end lg:text-right" : "lg:items-start"
      } ${className}`}
    >
      <motion.div
        style={{
          opacity,
          x,
          y,
          filter,
          willChange: "transform, opacity, filter",
        }}
        className="max-w-xl"
      >
        {eyebrow && (
          <div
            className={`mb-4 flex items-center gap-3 ${
              align === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            <span className="h-1 w-8 bg-brand-orange inline-block" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
              {eyebrow}
            </span>
          </div>
        )}

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-4 text-base md:text-lg leading-relaxed text-white/70">
          {description}
        </p>

        {children}

        {cta && (
          <div className="mt-8">
            <MagneticButton
              href={cta.href}
              className="inline-flex justify-center rounded-sm border border-brand-orange bg-brand-orange px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(255,90,0,0.4)]"
            >
              {cta.label}
            </MagneticButton>
          </div>
        )}
      </motion.div>
    </div>
  );
}
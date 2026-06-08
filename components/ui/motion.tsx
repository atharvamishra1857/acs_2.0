"use client";

import Link, { type LinkProps } from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { useRef } from "react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionTiming = {
  enter: { duration: 0.75, ease: motionEase },
  settle: { duration: 0.45, ease: motionEase },
  slow: { duration: 1.1, ease: motionEase },
} as const;

type RevealDirection = "up" | "left" | "right" | "none";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  amount?: number;
  direction?: RevealDirection;
  once?: boolean;
  style?: CSSProperties;
}>;

const getRevealOffset = (direction: RevealDirection) => {
  switch (direction) {
    case "left":
      return { x: -24, y: 0 };
    case "right":
      return { x: 24, y: 0 };
    case "none":
      return { x: 0, y: 0 };
    default:
      return { x: 0, y: 24 };
  }
};

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.18,
  direction = "up",
  once = true,
  style,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const offset = getRevealOffset(direction);

  return (
    <motion.div
      className={className}
      style={style}
      initial={reducedMotion ? false : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.8,
        delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  amount?: number;
  style?: CSSProperties;
}>;

export function Stagger({ children, className, delay = 0, amount = 0.18, style }: StaggerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView={reducedMotion ? "visible" : "visible"}
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  style?: CSSProperties;
}>;

export function StaggerItem({ children, className, delay = 0, style }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: {
          opacity: 0,
          y: reducedMotion ? 0 : 16,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: motionEase,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type MagneticButtonProps = PropsWithChildren<{
  className?: string;
  href?: LinkProps["href"];
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}>;

const magneticMotion = {
  rest: { x: 0, y: 0 },
  hover: { x: 0, y: -2 },
  tap: { x: 0, y: 0 },
};

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();

  const content = (
    <motion.span
      className="inline-flex items-center justify-center gap-2"
      initial="rest"
      whileHover={reducedMotion ? "rest" : "hover"}
      whileTap={reducedMotion ? "rest" : "tap"}
      variants={magneticMotion}
      transition={{ duration: 0.35, ease: motionEase }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      initial="rest"
      whileHover={reducedMotion ? "rest" : "hover"}
      whileTap={reducedMotion ? "rest" : "tap"}
      variants={magneticMotion}
      transition={{ duration: 0.35, ease: motionEase }}
    >
      {content}
    </motion.button>
  );
}

type ParallaxLayerProps = PropsWithChildren<{
  className?: string;
  speed?: number;
  style?: CSSProperties;
}>;

export function ParallaxLayer({ children, className, speed = 0.08, style }: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}

type FrameProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export function MotionFrame({ children, className, style }: FrameProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="space-y-4">
      {eyebrow ? <Reveal className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">{eyebrow}</Reveal> : null}
      <Reveal delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brand-dark uppercase">{title}</h2>
      </Reveal>
      {description ? <Reveal delay={0.1}><p className="text-brand-gray leading-relaxed">{description}</p></Reveal> : null}
    </div>
  );
}

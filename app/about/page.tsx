"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

// ─── Hook: scroll-triggered counter ───────────────────────────────────────────
const useScrollCounter = (endValue: number, duration: number = 2200) => {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * endValue));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, endValue, duration]);

  return { count, ref };
};

// ─── Hook: generic scroll-reveal ──────────────────────────────────────────────
const useReveal = <T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

// ─── StatBox ──────────────────────────────────────────────────────────────────
const StatBox = ({
  title, endValue, suffix, description, delay = 0,
}: {
  title: string; endValue: number; suffix: string; description: string; delay?: number;
}) => {
  const { count, ref } = useScrollCounter(endValue);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center text-center p-8 border-r last:border-r-0 border-white/10 relative overflow-hidden cursor-default"
      style={{
        transition: "background 0.4s ease",
        background: hovered ? "rgba(255,90,0,0.07)" : "transparent",
      }}
    >
      {/* Bottom border reveal on hover */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, height: "2px",
          background: "var(--brand-orange, #ff5a00)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <span
        className="text-5xl md:text-6xl font-black text-brand-orange mb-2"
        style={{
          textShadow: hovered ? "0 0 30px rgba(255,90,0,0.5)" : "none",
          transition: "text-shadow 0.4s ease",
        }}
      >
        {count}{suffix}
      </span>
      <h3 className="text-base font-bold uppercase tracking-widest text-white mb-2">{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{description}</p>
    </div>
  );
};

// ─── Animated list item ────────────────────────────────────────────────────────
const AnimatedLi = ({
  children, accent, delay,
}: {
  children: React.ReactNode; accent: string; delay: number;
}) => {
  const { ref, visible } = useReveal<HTMLLIElement>({ threshold: 0.3 });

  return (
    <li
      ref={ref}
      className="flex items-start gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span className={`${accent} font-bold mt-0.5 flex-shrink-0`}>✓</span>
      <span>{children}</span>
    </li>
  );
};

// ─── Section reveal wrapper ────────────────────────────────────────────────────
const Reveal = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) => {
  const { ref, visible } = useReveal();
  const from =
    direction === "up" ? "translateY(24px)"
    : direction === "left" ? "translateX(-24px)"
    : direction === "right" ? "translateX(24px)"
    : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : from,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Contact item ──────────────────────────────────────────────────────────────
const ContactItem = ({
  icon, label, children, delay,
}: {
  icon: string; label: string; children: React.ReactNode; delay: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Left border grow */}
      <div
        style={{
          position: "absolute", left: 0, top: 0,
          width: "3px",
          height: hovered ? "100%" : "0%",
          background: "var(--brand-orange, #ff5a00)",
          transition: "height 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <span
        className="text-3xl block mb-3"
        style={{
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          display: "inline-block",
        }}
      >
        {icon}
      </span>
      <h4 className="font-bold uppercase tracking-widest text-sm text-brand-orange mb-2">{label}</h4>
      {children}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  // Parallax for hero grid
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">

      <style>{`
        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes drawLine {
          from { width: 0; } to { width: 100%; }
        }
        @keyframes drawLineH {
          from { width: 0; } to { width: 6rem; }
        }

        /* ── Hero text ── */
        .h-word {
          display: inline-block;
          animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .h-w1 { animation-delay: 0.05s; }
        .h-w2 { animation-delay: 0.2s;  }
        .h-w3 { animation-delay: 0.35s; }
        .h-script { animation: fadeIn 1s ease 0.55s both; }
        .h-body    { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .h-scroll  { margin-top: 32px; }

        /* ── Scanline ── */
        .scanline {
          position: absolute; left: 0; right: 0;
          height: 100px; pointer-events: none;
          background: linear-gradient(to bottom, transparent, rgba(255,90,0,0.055), transparent);
          animation: scanline 5s ease-in-out 0.5s infinite;
        }

        /* ── Profile underline draw ── */
        .underline-draw {
          display: block;
          height: 4px;
          background: var(--brand-orange, #ff5a00);
          border-radius: 2px;
          animation: drawLineH 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }

        /* ── Quote card ── */
        .quote-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s ease;
        }
        .quote-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 64px -12px rgba(0,0,0,0.18), 4px 0 0 0 var(--brand-orange);
        }
        .quote-card .partner-btn {
          position: relative; overflow: hidden;
          transition: color 0.3s ease;
        }
        .quote-card .partner-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: var(--brand-orange, #ff5a00);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .quote-card .partner-btn:hover::after { transform: scaleX(1); }
        .quote-card .partner-btn span { position: relative; z-index: 1; }

        /* ── Vision / Mission cards ── */
        .vm-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s ease;
          position: relative; overflow: hidden;
        }
        .vm-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,90,0,0.03) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .vm-card:hover { transform: translateY(-4px); box-shadow: 0 28px 56px -8px rgba(0,0,0,0.14); }
        .vm-card:hover::before { opacity: 1; }
        .vm-icon {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .vm-card:hover .vm-icon { transform: translateY(-2px); }

        /* ── Profile paragraphs ── */
        .profile-para {
          position: relative; padding-left: 0;
          transition: padding-left 0.3s ease;
        }
        .profile-para:hover { padding-left: 10px; }
        .profile-para::before {
          content: '';
          position: absolute; left: 0; top: 4px; bottom: 4px;
          width: 2px; background: var(--brand-orange, #ff5a00);
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .profile-para:hover::before { transform: scaleY(1); }

        /* ── Team section ── */
        .team-quote-mark {
          display: inline-block;
        }

        /* ── Contact strip icons ── */
        .contact-icon-wrap {
          display: inline-flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 4px;
          background: rgba(255,90,0,0.1);
          border: 1px solid rgba(255,90,0,0.2);
          margin-bottom: 12px;
          transition: background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .contact-item-wrap:hover .contact-icon-wrap {
          background: rgba(255,90,0,0.2);
          border-color: rgba(255,90,0,0.5);
          transform: translateY(-2px);
        }
        .contact-item-wrap a {
          transition: color 0.25s;
        }
        .contact-item-wrap:hover a { color: var(--brand-orange, #ff5a00); }
      `}</style>

      {/* ══════════ 1. HERO ══════════ */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">

        {/* Parallax grid */}
        <div
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />

        {/* Side accent lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Eyebrow dot */}
          <div className="flex items-center justify-center gap-2 mb-6" style={{ animation: "fadeIn 0.6s ease 0.1s both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5a00", display: "inline-block" }} />
            <span className="text-brand-orange text-xs font-bold tracking-[0.25em] uppercase opacity-80">
              Accurate Cutting Systems
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            <span className="h-word h-w1">Who&nbsp;</span>
            <span className="h-word h-w2">We&nbsp;</span>
            <span className="h-word h-w3">Are</span>
          </h1>

          <p className="h-script text-3xl font-script text-brand-orange mt-2 mb-8">
            The Perfect Cut... Always
          </p>

          <p className="h-body text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            ACS - Accurate Cutting Systems has built a reputation for high precision and quality bandsaws that work efficiently to give excellent returns on your investment.
          </p>

          {/* Scroll hint */}
          <div className="h-scroll flex justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,90,0,0.5)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════ 2. STATS STRIP ══════════ */}
      <section className="bg-brand-dark border-b border-brand-gray shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12">
            <StatBox title="Certifications"   endValue={5}   suffix="+" description="To further reiterate our high Standards & Quality"          delay={0}   />
            <StatBox title="Project Success"  endValue={100} suffix="%" description="Ensuring timely project completion & client satisfaction"    delay={150} />
            <StatBox title="Employees"        endValue={15}  suffix="+" description="Qualified and skilled resources ensuring smooth operations"  delay={300} />
            <StatBox title="Global Clients"   endValue={100} suffix="+" description="Reaching a wider audience with excellent after-sales"        delay={450} />
          </div>
        </div>
      </section>

      {/* ══════════ 3. COMPANY PROFILE ══════════ */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">

        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
            Our Profile
          </h2>
          <span className="underline-draw w-24 mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text paragraphs */}
          <Reveal direction="left" delay={100} className="space-y-6 text-lg text-brand-dark leading-relaxed">
            <p className="profile-para">
              <strong className="text-brand-dark">ACS – Accurate Cutting Systems</strong> was founded in 2006 by a team of professionals from the field of Industrial Cutting Solutions.
            </p>
            <p className="profile-para">
              Recognizing the needs of the growing automotive industry in India, ACS has successfully delivered its promise of the perfect cut always. We now sell machines for use in all industries and applications. Besides a wide range of specifications, we also offer customized solutions to meet your specific requirements.
            </p>
            <p className="profile-para">
              Our machines are designed to give you trouble-free operation and have given excellent ROI (Returns on Investment) to our clients. We offer excellent after-sales support, a wide range of Bandsaw blades, spare parts, and Annual Maintenance Contracts.
            </p>
            <p className="profile-para">
              Starting from a base that mainly came from referrals, ACS has launched an aggressive marketing campaign to reach out all over India and abroad. We are actively looking for representation of the ACS Range for Sales and Service worldwide.
            </p>
          </Reveal>

          {/* Quote card */}
          <Reveal direction="right" delay={200}>
            <div className="quote-card bg-white p-10 md:p-14 rounded-sm shadow-xl border-l-8 border-brand-orange relative">
              <span
                className="absolute top-4 left-5 text-7xl text-gray-100 font-serif leading-none select-none"
              >
                "
              </span>
              <p className="text-2xl font-bold text-brand-dark relative z-10 italic mb-8 leading-snug">
                Look no further. ACS is the answer to all your Precision Cutting Requirements.
              </p>
              <Link href="/contact" className="partner-btn inline-block px-8 py-3 bg-brand-dark text-white text-sm font-bold uppercase tracking-widest rounded-sm">
                <span>Partner With Us</span>
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════ 4. VISION & MISSION ══════════ */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <Reveal direction="up" className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
              Vision & Mission
            </h2>
            <span className="underline-draw w-24 mx-auto" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Vision Card */}
            <Reveal direction="left" delay={100}>
              <div className="vm-card bg-white p-10 shadow-lg border-t-4 border-brand-dark">
                <div className="flex items-center gap-4 mb-8">
                  <div className="vm-icon w-12 h-12 bg-brand-dark text-brand-orange flex items-center justify-center text-2xl rounded-sm">👁️</div>
                  <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Our Vision</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-medium">
                  {[
                    "To set up world-class manufacturing facilities to better our products and services.",
                    "To engage in worldwide methodologies with \"outside the box\" thinking.",
                    "Pursuing scalable customer services through proactive participation.",
                    "Become a market leader in our segment.",
                    "To be a global contender.",
                  ].map((item, i) => (
                    <AnimatedLi key={i} accent="text-brand-orange" delay={i * 80}>
                      {item}
                    </AnimatedLi>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Mission Card */}
            <Reveal direction="right" delay={200}>
              <div className="vm-card bg-white p-10 shadow-lg border-t-4 border-brand-orange">
                <div className="flex items-center gap-4 mb-8">
                  <div className="vm-icon w-12 h-12 bg-brand-orange text-white flex items-center justify-center text-2xl rounded-sm">🎯</div>
                  <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Our Mission</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-medium">
                  {[
                    "Constantly improve the standards and quality of our work.",
                    "Engage in research and development to refine our existing working systems.",
                    "Constantly engage in educating the team to keep us in the competition.",
                    "Reach out to wider audiences to propagate our products worldwide.",
                    "To constantly innovate and introduce more efficient customized products.",
                  ].map((item, i) => (
                    <AnimatedLi key={i} accent="text-brand-dark" delay={i * 80}>
                      {item}
                    </AnimatedLi>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════ 5. TEAM ══════════ */}
      <section className="py-24 bg-white text-center relative overflow-hidden">

        {/* Background accent */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ff5a00_1px,transparent_1px),linear-gradient(to_bottom,#ff5a00_1px,transparent_1px)] bg-[size:3rem_3rem]"
        />
        {/* Team Image */}

<Reveal direction="up" delay={350}>
  <div className="relative max-w-4xl mx-auto mb-8 md:mb-12">

    {/* Orange accent block (nudged for tighter visual spacing) */}
    <div className="absolute -top-3 -left-3 w-full h-full bg-brand-orange/10 rounded-sm pointer-events-none" />

    {/* Main image */}
    <div className="relative overflow-hidden rounded-sm shadow-2xl border border-gray-200 group">
      <Image
        src="/images/acs-core-team.png"
        alt="Team ACS"
        width={1200}
        height={700}
        className="
          w-full
          h-auto
          object-cover
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
      />
    </div>

  </div>
</Reveal>

        <div className="relative max-w-4xl mx-auto px-6">
          <Reveal direction="up">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-3 block">
              Movers & Shakers
            </span>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tight mb-8">
              Team ACS: Our Strength
            </h2>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <p className="text-xl text-brand-gray mb-8 leading-relaxed font-medium">
              <span className="team-quote-mark text-brand-orange text-3xl font-serif mr-1">"</span>
              At ACS, we highly value a culture of collaboration and service.
              <span className="team-quote-mark text-brand-orange text-3xl font-serif ml-1">"</span>
            </p>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <p className="text-gray-600 leading-relaxed mb-12">
              Our collective vision is driven by an amazing team of like-minded people working progressively to bring out products that are better, efficient, and yield optimum performance. The team is highly qualified and tuned towards the latest market trends, ensuring the high-quality standards that ACS is known for.
            </p>
          </Reveal>

          {/* Decorative divider */}
          <Reveal direction="none" delay={400}>
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-16 bg-brand-orange/40" />
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
              <div className="h-px w-16 bg-brand-orange/40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 6. CONTACT STRIP ══════════ */}
      <section className="bg-brand-dark text-white py-16 border-t border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

          <ContactItem icon="📞" label="Give us a call" delay={0}>
            <p className="text-base font-medium">+91 20 26872522</p>
            <p className="text-base font-medium">+91 9422308363</p>
          </ContactItem>

          <ContactItem icon="✉️" label="Email Us" delay={150}>
            <p className="text-base font-medium">
              <a href="mailto:sales@acs.co.in" className="hover:text-brand-orange transition-colors">
                sales@acs.co.in
              </a>
            </p>
          </ContactItem>

          <ContactItem icon="📍" label="India Works" delay={300}>
            <p className="text-sm text-white/50 leading-relaxed">
              Survey No. 52/3, Lane No. 4,<br />
              Maruti Nagar, Vadgaon Sheri,<br />
              Pune 411014.
            </p>
          </ContactItem>

        </div>
      </section>

    </div>
  );
}
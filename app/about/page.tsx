"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";

// ─── StatBox with GSAP ────────────────────────────────────────────────────────
const StatBox = ({
  title,
  endValue,
  suffix,
  description,
  className,
}: {
  title: string;
  endValue: number;
  suffix: string;
  description: string;
  className?: string;
}) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      if (numberRef.current)
        numberRef.current.innerText = endValue.toString() + suffix;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(numberRef.current, {
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 85%",
        },
        innerHTML: endValue,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate: function () {
          if (numberRef.current) {
            numberRef.current.innerHTML =
              Math.round(Number(this.targets()[0].innerHTML)) + suffix;
          }
        },
      });
    }, boxRef);
    return () => ctx.revert();
  }, [endValue, suffix, reducedMotion]);

  return (
    <div
      ref={boxRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col items-center text-center p-8 border-r last:border-r-0 border-white/10 relative overflow-hidden cursor-default ${className}`}
      style={{
        transition: "background 0.4s ease",
        background: hovered ? "rgba(255,90,0,0.07)" : "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: "var(--brand-orange, #ff5a00)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <span
        ref={numberRef}
        className="text-5xl md:text-6xl font-black text-brand-orange mb-2"
        style={{
          textShadow: hovered ? "0 0 30px rgba(255,90,0,0.5)" : "none",
          transition: "text-shadow 0.4s ease",
        }}
      >
        0{suffix}
      </span>
      <h3 className="text-base font-bold uppercase tracking-widest text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed">{description}</p>
    </div>
  );
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Text Entrance
      const tlHero = gsap.timeline({ delay: 0.1 });
      tlHero.from(".h-word", {
        y: 50,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      });
      tlHero.from(
        ".h-script",
        { opacity: 0, duration: 1, ease: "power2.out" },
        "-=0.4",
      );
      tlHero.from(
        ".h-body",
        { y: 20, opacity: 0, duration: 0.8, ease: "power4.out" },
        "-=0.6",
      );

      // 2. Stats Strip
      gsap.from(".stat-box", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      // 3. Profile Section
      gsap.from(".profile-para", {
        scrollTrigger: {
          trigger: ".profile-section",
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.from(".profile-quote", {
        scrollTrigger: {
          trigger: ".profile-section",
          start: "top 60%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // 4. Vision / Mission Cards
      const vmTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vm-section",
          start: "top 75%",
        },
      });
      vmTl.from(
        ".vm-card-vision",
        { x: -50, opacity: 0, duration: 0.8, ease: "power4.out" },
        0,
      );
      vmTl.from(
        ".vm-card-mission",
        { x: 50, opacity: 0, duration: 0.8, ease: "power4.out" },
        0,
      );
      vmTl.from(
        ".vm-card-vision li",
        {
          x: -15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.4,
      );
      vmTl.from(
        ".vm-card-mission li",
        { x: 15, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        0.4,
      );

      // 5. Team Section
      gsap.from(".team-element", {
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      // 6. Contact Strip
      gsap.from(".contact-col", {
        scrollTrigger: {
          trigger: ".contact-strip",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      // Title Underlines
      gsap.utils.toArray(".underline-draw").forEach((line: any) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          },
          width: 0,
          duration: 0.7,
          ease: "power4.out",
        });
      });

      // Ambient float for team quotes
      gsap.to(".team-quote-mark", {
        y: -4,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-brand-light flex flex-col"
    >
      <style>{`
        /* ── Profile underline draw ── */
        .underline-draw {
          display: block;
          height: 4px;
          background: var(--brand-orange, #ff5a00);
          border-radius: 2px;
        }

        /* ── Quote card ── */
        .quote-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
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
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
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
        .vm-icon { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
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
        .team-quote-mark { display: inline-block; }
      `}</style>

      {/* ══════════ 1. HERO ══════════ */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#ff5a00",
                display: "inline-block",
              }}
            />
            <span className="text-brand-orange text-xs font-bold tracking-[0.25em] uppercase opacity-80">
              Accurate Cutting Systems
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-4 overflow-hidden pb-2">
            <span
              className="h-word inline-block"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              Who&nbsp;
            </span>
            <span
              className="h-word inline-block"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              We&nbsp;
            </span>
            <span
              className="h-word inline-block"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              Are
            </span>
          </h1>

          <p className="h-script text-3xl font-script text-brand-orange mt-2 mb-8">
            The Perfect Cut... Always
          </p>

          <p className="h-body text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            ACS - Accurate Cutting Systems has built a reputation for high
            precision and quality bandsaws that work efficiently to give
            excellent returns on your investment.
          </p>

          <div className="flex justify-center mt-8">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,90,0,0.5)"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m0 0l-5-5m5 5l5-5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════ 2. STATS STRIP ══════════ */}
      <section className="stats-section bg-brand-dark border-b border-brand-gray shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12">
            <StatBox
              className="stat-box"
              title="Certifications"
              endValue={5}
              suffix="+"
              description="To further reiterate our high Standards & Quality"
            />
            <StatBox
              className="stat-box"
              title="Project Success"
              endValue={100}
              suffix="%"
              description="Ensuring timely project completion & client satisfaction"
            />
            <StatBox
              className="stat-box"
              title="Employees"
              endValue={15}
              suffix="+"
              description="Qualified and skilled resources ensuring smooth operations"
            />
            <StatBox
              className="stat-box"
              title="Global Clients"
              endValue={100}
              suffix="+"
              description="Reaching a wider audience with excellent after-sales"
            />
          </div>
        </div>
      </section>

      {/* ══════════ 3. COMPANY PROFILE ══════════ */}
      <section className="profile-section py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 team-element">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
            Our Profile
          </h2>
          <span
            className="underline-draw w-24 mx-auto"
            style={{ width: "6rem" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-brand-dark leading-relaxed">
            <p className="profile-para">
              <strong className="text-brand-dark">
                ACS – Accurate Cutting Systems
              </strong>{" "}
              was founded in 2006 by a team of professionals from the field of
              Industrial Cutting Solutions.
            </p>
            <p className="profile-para">
              Recognizing the needs of the growing automotive industry in India,
              ACS has successfully delivered its promise of the perfect cut
              always. We now sell machines for use in all industries and
              applications. Besides a wide range of specifications, we also
              offer customized solutions to meet your specific requirements.
            </p>
            <p className="profile-para">
              Our machines are designed to give you trouble-free operation and
              have given excellent ROI (Returns on Investment) to our clients.
              We offer excellent after-sales support, a wide range of Bandsaw
              blades, spare parts, and Annual Maintenance Contracts.
            </p>
            <p className="profile-para">
              Starting from a base that mainly came from referrals, ACS has
              launched an aggressive marketing campaign to reach out all over
              India and abroad. We are actively looking for representation of
              the ACS Range for Sales and Service worldwide.
            </p>
          </div>

          <div className="profile-quote">
            <div className="quote-card bg-white p-10 md:p-14 rounded-sm shadow-xl border-l-8 border-brand-orange relative">
              <span className="absolute top-4 left-5 text-7xl text-gray-100 font-serif leading-none select-none">
                "
              </span>
              <p className="text-2xl font-bold text-brand-dark relative z-10 italic mb-8 leading-snug">
                Look no further. ACS is the answer to all your Precision Cutting
                Requirements.
              </p>
              <Link
                href="/contact"
                className="partner-btn inline-block px-8 py-3 bg-brand-dark text-white text-sm font-bold uppercase tracking-widest rounded-sm"
              >
                <span>Partner With Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 4. VISION & MISSION ══════════ */}
      <section className="vm-section bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 team-element">
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
              Vision & Mission
            </h2>
            <span
              className="underline-draw w-24 mx-auto"
              style={{ width: "6rem" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="vm-card vm-card-vision bg-white p-10 shadow-lg border-t-4 border-brand-dark">
              <div className="flex items-center gap-4 mb-8">
                <div className="vm-icon w-12 h-12 bg-brand-dark text-brand-orange flex items-center justify-center text-2xl rounded-sm">
                  👁️
                </div>
                <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tight">
                  Our Vision
                </h3>
              </div>
              <ul className="space-y-4 text-gray-600 font-medium">
                {[
                  "To set up world-class manufacturing facilities to better our products and services.",
                  'To engage in worldwide methodologies with "outside the box" thinking.',
                  "Pursuing scalable customer services through proactive participation.",
                  "Become a market leader in our segment.",
                  "To be a global contender.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-orange font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="vm-card vm-card-mission bg-white p-10 shadow-lg border-t-4 border-brand-orange">
              <div className="flex items-center gap-4 mb-8">
                <div className="vm-icon w-12 h-12 bg-brand-orange text-white flex items-center justify-center text-2xl rounded-sm">
                  🎯
                </div>
                <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tight">
                  Our Mission
                </h3>
              </div>
              <ul className="space-y-4 text-gray-600 font-medium">
                {[
                  "Constantly improve the standards and quality of our work.",
                  "Engage in research and development to refine our existing working systems.",
                  "Constantly engage in educating the team to keep us in the competition.",
                  "Reach out to wider audiences to propagate our products worldwide.",
                  "To constantly innovate and introduce more efficient customized products.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-dark font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 5. TEAM ══════════ */}
      <section className="team-section py-24 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ff5a00_1px,transparent_1px),linear-gradient(to_bottom,#ff5a00_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        <div className="team-element relative max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="absolute -top-3 -left-3 w-full h-full bg-brand-orange/10 rounded-sm pointer-events-none" />
          <div className="relative overflow-hidden rounded-sm shadow-2xl border border-gray-200 group">
            <Image
              src="/images/acs-core-team.png"
              alt="Team ACS"
              width={1200}
              height={700}
              className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          <span className="team-element text-brand-orange font-bold uppercase tracking-widest text-sm mb-3 block">
            Movers & Shakers
          </span>
          <h2 className="team-element text-4xl font-black text-brand-dark uppercase tracking-tight mb-8">
            Team ACS: Our Strength
          </h2>
          <p className="team-element text-xl text-brand-gray mb-8 leading-relaxed font-medium">
            <span className="team-quote-mark text-brand-orange text-3xl font-serif mr-1">
              "
            </span>
            At ACS, we highly value a culture of collaboration and service.
            <span className="team-quote-mark text-brand-orange text-3xl font-serif ml-1">
              "
            </span>
          </p>
          <p className="team-element text-gray-600 leading-relaxed mb-12">
            Our collective vision is driven by an amazing team of like-minded
            people working progressively to bring out products that are better,
            efficient, and yield optimum performance. The team is highly
            qualified and tuned towards the latest market trends, ensuring the
            high-quality standards that ACS is known for.
          </p>

          <div className="team-element flex items-center gap-4 justify-center">
            <div className="h-px w-16 bg-brand-orange/40" />
            <div className="w-2 h-2 rounded-full bg-brand-orange" />
            <div className="h-px w-16 bg-brand-orange/40" />
          </div>
        </div>
      </section>

      {/* ══════════ 6. CONTACT STRIP ══════════ */}
      {/* 6. Quick Contact Strip */}
      <section className="bg-brand-dark text-white py-16 border-t border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-gray/50">
            {/* Phone Block */}
            <div className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0">
              <span className="text-4xl block mb-5">📞</span>
              <h4 className="font-bold uppercase tracking-widest text-sm text-brand-orange mb-3">
                Give us a call
              </h4>
              <p className="text-lg font-medium text-gray-200">
                +91 20 26872522
              </p>
              <p className="text-lg font-medium text-gray-200">
                +91 9422308363
              </p>
            </div>

            {/* Email Block */}
            <div className="flex flex-col items-center text-center pt-10 md:pt-0">
              <span className="text-4xl block mb-5">✉️</span>
              <h4 className="font-bold uppercase tracking-widest text-sm text-brand-orange mb-3">
                Email Us
              </h4>
              <p className="text-lg font-medium text-gray-200 hover:text-brand-orange transition-colors">
                <a href="mailto:sales@acs.co.in">sales@acs.co.in</a>
              </p>
            </div>

            {/* Address Block */}
            <div className="flex flex-col items-center text-center pt-10 md:pt-0">
              <span className="text-4xl block mb-5">📍</span>
              <h4 className="font-bold uppercase tracking-widest text-sm text-brand-orange mb-3">
                Workshop
              </h4>
              <p className="text-base font-medium text-gray-300 max-w-[280px] leading-relaxed">
                Koregoan Bhima, Pune, Maharashtra
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".hero-eyebrow", {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
      tl.from(
        ".hero-line",
        {
          y: 60,
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.4",
      );
      tl.from(
        ".hero-sub",
        { y: 20, opacity: 0, duration: 0.8, ease: "power4.out" },
        "-=0.5",
      );

      // Contact Info Items
      gsap.from(".contact-item-anim", {
        scrollTrigger: {
          trigger: ".contact-info-section",
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      // Fieldset sections
      gsap.from("fieldset", {
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const materialTypeChecked =
      document.querySelectorAll('input[name="materialType"]:checked').length >
      0;
    const materialSizeChecked =
      document.querySelectorAll('input[name="materialSize"]:checked').length >
      0;

    if (!materialTypeChecked || !materialSizeChecked) {
      e.preventDefault();
      alert("Please select at least one material type and one material shape.");
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-brand-light flex flex-col"
    >
      <style>{`
        /* ── Field Focus ── */
        .fi {
          transition: border-color 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .fi:focus {
          outline: none;
          border-color: var(--brand-orange, #ff5a00) !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 3px rgba(255,90,0,0.14), 0 2px 8px rgba(255,90,0,0.08);
          transform: translateY(-1px);
        }
        .fi:hover:not(:focus) {
          border-color: rgba(255,90,0,0.4);
        }

        /* ── Label Lift ── */
        .field-wrap { position: relative; }
        .field-label { transition: color 0.2s ease; }
        .field-wrap:focus-within .field-label { color: #ff5a00; }

        /* ── Contact Info Items ── */
        .contact-item-anim {
          position: relative;
          padding: 16px 20px;
          border: 1px solid transparent;
          border-radius: 4px;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .contact-item-anim::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #ff5a00;
          border-radius: 4px 0 0 4px;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-item-anim:hover {
          border-color: rgba(255,90,0,0.2);
          background: rgba(255,255,255,0.7);
        }
        .contact-item-anim:hover::before {
          transform: scaleY(1);
        }

        /* ── Checkboxes & Radios (Spring Scale) ── */
        @keyframes springScale {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
        .tile-input { display: none; }
        .tile-label {
          display: inline-block;
          cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: 3px;
          padding: 7px 13px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          background: #fff;
          user-select: none;
          transition: border-color 0.35s, color 0.35s, background-color 0.35s, box-shadow 0.35s;
        }
        .tile-label:hover {
          border-color: #ff5a00;
          color: #ff5a00;
          box-shadow: 0 4px 12px rgba(255,90,0,0.12);
        }
        .tile-input:checked + .tile-label {
          background: #ff5a00;
          border-color: #ff5a00;
          color: #fff;
          box-shadow: 0 4px 14px rgba(255,90,0,0.3);
          animation: springScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        .radio-label {
          display: flex; align-items: center; gap: 9px; cursor: pointer;
          padding: 10px 18px; border: 1.5px solid rgba(0,0,0,0.15); border-radius: 3px;
          background: #fff; font-size: 14px; font-weight: 500; color: #333;
          transition: border-color 0.35s, background-color 0.35s, box-shadow 0.35s;
        }
        .radio-label:hover {
          border-color: #ff5a00; color: #ff5a00;
          box-shadow: 0 4px 12px rgba(255,90,0,0.1);
        }
        .radio-input { display: none; }
        .radio-input:checked + .radio-label {
          border-color: #ff5a00; background: rgba(255,90,0,0.06); color: #ff5a00;
          box-shadow: 0 0 0 3px rgba(255,90,0,0.1);
        }
        .radio-dot {
          width: 13px; height: 13px; border-radius: 50%; border: 2px solid currentColor;
          position: relative; flex-shrink: 0; transition: border-color 0.2s;
        }
        .radio-dot::after {
          content: ''; position: absolute; inset: 2px; border-radius: 50%;
          background: currentColor; opacity: 0;
        }
        .radio-input:checked + .radio-label .radio-dot::after {
          opacity: 1;
          animation: springScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        /* ── Submit Button ── */
        .submit-btn {
          position: relative; overflow: hidden; background: #1a1a1a; color: #fff;
          border: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .submit-btn::after {
          content: ''; position: absolute; inset: 0; background: #ff5a00;
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .submit-btn:hover {
          box-shadow: 0 8px 28px rgba(255,90,0,0.35);
        }
        .submit-btn:hover::after { transform: scaleX(1); }
        .submit-btn:active { transform: scale(0.97); }
        .submit-btn-inner { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .submit-arrow { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .submit-btn:hover .submit-arrow { transform: translateX(5px); }

        /* ── Top Shimmer Bar ── */
        .form-top-bar {
          height: 4px;
          background: linear-gradient(90deg, #ff5a00, #ff8a4c, #ff5a00);
          background-size: 200% auto;
          animation: barShimmer 3s linear infinite;
        }
        @keyframes barShimmer {
          to { background-position: 200% center; }
        }

        /* ── Custom Select ── */
        .custom-select {
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center; padding-right: 42px !important;
        }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }

        /* ── Fieldset Legend Line ── */
        .legend-line {
          flex: 1; height: 1px; background: rgba(0,0,0,0.1); position: relative; overflow: hidden;
        }
        .legend-line::after {
          content: ''; position: absolute; inset: 0; background: #ff5a00;
          transform: scaleX(0); transform-origin: left;
          animation: drawLegend 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }
        @keyframes drawLegend { to { transform: scaleX(1); } }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />

        <div
          className="absolute hidden lg:flex items-center gap-2 top-6 right-8"
          style={{
            background: "rgba(255,90,0,0.08)",
            border: "1px solid rgba(255,90,0,0.25)",
            borderRadius: "2px",
            padding: "5px 12px",
          }}
        >
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase opacity-80">
            Engineering Enquiries
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="hero-eyebrow text-brand-orange text-xs font-bold tracking-[0.25em] uppercase mb-5 opacity-80">
            Bandsaw Solutions · Pune, India
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase overflow-hidden pb-2">
            <span
              className="hero-line inline-block"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              Request a Quote
            </span>
          </h1>
          <p className="hero-sub text-2xl font-light text-brand-orange/80 mt-4 italic">
            Let's build the perfect machine for your floor...
          </p>
          <div className="mt-10 flex justify-center">
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

      {/* ══════════════ BODY ══════════════ */}
      <section className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* ── LEFT: Contact Info ── */}
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header & Intro */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
                Direct Contact
              </h2>
              <div className="w-16 h-1 bg-brand-orange mb-6"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Whether you need a custom automated bandsaw configuration, bulk
                ordering details, or technical specifications — our engineering
                team is ready to assist.
              </p>
            </div>

            {/* Contact Details Grid (Forces alignment between Icon and Text) */}
            <div className="space-y-10">
              {/* Address */}
              <div className="flex flex-row items-start gap-5 group">
                <div className="w-14 h-14 bg-white border-2 border-gray-100 rounded-sm flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors shadow-sm">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                    Headquarters
                  </h3>
                  <p className="text-brand-dark font-medium text-base md:text-lg leading-snug">
                    [Your Street Address Placeholder] <br />
                    Pune, Maharashtra, India <br />
                    [Your Pincode Placeholder]
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-row items-start gap-5 group">
                <div className="w-14 h-14 bg-white border-2 border-gray-100 rounded-sm flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors shadow-sm">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                    Sales & Support
                  </h3>
                  <p className="text-brand-dark font-medium text-base md:text-lg leading-snug">
                    [Your Phone Number Placeholder]
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-row items-start gap-5 group">
                <div className="w-14 h-14 bg-white border-2 border-gray-100 rounded-sm flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors shadow-sm">
                  <span className="text-2xl">✉️</span>
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                    Email Us
                  </h3>
                  <p className="text-brand-dark font-medium text-base md:text-lg leading-snug">
                    [Your Email Address Placeholder]
                  </p>
                </div>
              </div>
            </div>

            {/* The AI's Terminal Box (Fixed Padding and Margins) */}
            <div className="mt-14 bg-brand-dark p-6 md:p-8 rounded-sm border-l-4 border-brand-orange shadow-lg w-full">
              <ul className="space-y-4 text-sm font-mono text-gray-300">
                <li className="flex items-center">
                  <span className="text-brand-orange mr-3 text-lg">//</span>{" "}
                  Response time: &lt; 24 hours
                </li>
                <li className="flex items-center">
                  <span className="text-brand-orange mr-3 text-lg">//</span> All
                  quotes are custom-engineered
                </li>
                <li className="flex items-center">
                  <span className="text-brand-orange mr-3 text-lg">//</span>{" "}
                  Pan-India delivery available
                </li>
              </ul>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            className="form-section lg:col-span-7"
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="form-card bg-white rounded-sm shadow-xl border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="form-top-bar" />

              <div className="bg-brand-dark px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                    Machine Configuration
                  </h2>
                  <p className="text-brand-orange text-xs font-mono tracking-widest mt-1 opacity-70">
                    FILL ALL REQUIRED FIELDS
                  </p>
                </div>
                <div className="flex gap-2">
                  {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        background: c,
                        opacity: 0.55,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* ─ 01 Contact Details ─ */}
                  <fieldset className="space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[22px] h-[22px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">
                        1
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Contact Details
                      </span>
                      <span className="legend-line" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="name"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Full Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g. Rajan Mehta"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="phone"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Phone <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="email"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Business Email{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="you@company.com"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="company"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Company Name{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          placeholder="Your Company Ltd."
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* ─ 02 Machine Details ─ */}
                  <fieldset className="space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[22px] h-[22px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">
                        2
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Machine Details
                      </span>
                      <span className="legend-line" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="bandsawType"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Type of Bandsaw{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          id="bandsawType"
                          name="bandsawType"
                          required
                          className="fi custom-select w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium cursor-pointer"
                        >
                          <option value="">— Please choose —</option>
                          <option value="horizontal">Horizontal Bandsaw</option>
                          <option value="vertical">Vertical Bandsaw</option>
                          <option value="circular">Circular Bandsaw</option>
                          <option value="spm">SPM Bandsaw</option>
                        </select>
                      </div>
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="quantity"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Quantity Required{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          required
                          min={1}
                          placeholder="e.g. 2"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60">
                        Machine Type{" "}
                        <span className="text-brand-orange">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Automatic", "Semi Automatic", "Manual"].map((mt) => (
                          <label key={mt}>
                            <input
                              type="radio"
                              name="machineType"
                              value={mt.toLowerCase().replace(" ", "_")}
                              required
                              className="radio-input"
                            />
                            <span className="radio-label">
                              <span className="radio-dot" />
                              {mt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  {/* ─ 03 Material Information ─ */}
                  <fieldset className="space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[22px] h-[22px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">
                        3
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Material Information
                      </span>
                      <span className="legend-line" />
                    </legend>
                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60">
                        Size / Shape of Material to Cut
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Round Bar / Pipe",
                          "Square Bar / Pipe",
                          "Casting",
                          "Runner",
                          "Riser",
                        ].map((s) => (
                          <label key={s}>
                            <input
                              type="checkbox"
                              name="materialSize"
                              required
                              value={s}
                              className="tile-input"
                            />
                            <span className="tile-label">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="materialWidth"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Width (mm)
                        </label>
                        <input
                          type="number"
                          id="materialWidth"
                          name="materialWidth"
                          required
                          min="0"
                          placeholder="e.g. 250"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="materialHeight"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Height (mm)
                        </label>
                        <input
                          type="number"
                          id="materialHeight"
                          name="materialHeight"
                          min="0"
                          required
                          placeholder="e.g. 150"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="materialLength"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                        >
                          Length (mm)
                        </label>
                        <input
                          type="number"
                          id="materialLength"
                          name="materialLength"
                          min="0"
                          required
                          placeholder="e.g. 6000"
                          className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div className="field-wrap space-y-2">
                      <label
                        htmlFor="additionalDimensions"
                        className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                      >
                        Additional Size Information
                      </label>
                      <textarea
                        id="additionalDimensions"
                        name="additionalDimensions"
                        rows={3}
                        placeholder="Example: Ø250 mm round bar, 6 meter length, bundle cutting required."
                        className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium resize-none"
                      />
                    </div>
                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60">
                        Type of Material
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "MS",
                          "Steel",
                          "Cast Iron",
                          "Polymer",
                          "Fiber",
                          "Foam",
                          "Rubber",
                          "PVC",
                          "Wood",
                          "Ceramic",
                          "Non Ferrous",
                        ].map((m) => (
                          <label key={m}>
                            <input
                              type="checkbox"
                              name="materialType"
                              required
                              value={m}
                              className="tile-input"
                            />
                            <span className="tile-label">{m}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  {/* ─ 04 Enquiry Details ─ */}
                  <fieldset className="space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[22px] h-[22px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold">
                        4
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Enquiry Details
                      </span>
                      <span className="legend-line" />
                    </legend>
                    <div className="field-wrap space-y-2">
                      <label
                        htmlFor="enquiryPurpose"
                        className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                      >
                        Purpose of Enquiry{" "}
                        <span className="text-brand-orange">*</span>
                      </label>
                      <select
                        id="enquiryPurpose"
                        name="enquiryPurpose"
                        className="fi custom-select w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium cursor-pointer"
                      >
                        <option value="">— Select purpose —</option>
                        <option value="resale">For Resale</option>
                        <option value="use">For Use</option>
                        <option value="tender">For Tender Submission</option>
                        <option value="export">For Export</option>
                      </select>
                    </div>
                    <div className="field-wrap space-y-2">
                      <label
                        htmlFor="requirement"
                        className="field-label block text-xs font-bold uppercase tracking-widest text-brand-gray/60"
                      >
                        Machine / Project Requirements
                      </label>
                      <textarea
                        id="requirement"
                        name="requirement"
                        rows={5}
                        placeholder="Tell us about the cutting capacity, materials, or specific automated models you are looking for..."
                        className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium resize-none leading-relaxed"
                      />
                    </div>
                  </fieldset>

                  {/* ─ Submit ─ */}
                  <button
                    type="submit"
                    className="submit-btn w-full py-5 rounded-sm text-base font-bold tracking-widest uppercase mt-4"
                  >
                    <span className="submit-btn-inner">
                      Send Inquiry
                      <svg
                        className="submit-arrow w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

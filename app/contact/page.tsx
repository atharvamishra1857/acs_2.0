"use client";
import React from "react";
import Link from "next/link";

export default function ContactPage() {
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
    <div className="min-h-screen bg-brand-light flex flex-col">
      <style>{`
        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes borderDraw {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0);   }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Hero text stagger ── */
        .hero-line {
          display: inline-block;
          animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-line-1 { animation-delay: 0.05s; }
        .hero-line-2 { animation-delay: 0.2s;  }
        .hero-eyebrow { animation: fadeIn 0.7s ease 0.4s both; }
        .hero-sub     { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both; }

        /* ── Section entrance (scroll-fade emulated via delay) ── */
        .section-enter-left  { animation: slideInLeft 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .section-enter-right { animation: fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.25s both; }

        /* ── Form card ── */
        .form-card {
          transition:
    transform .45s cubic-bezier(0.22,1,0.36,1),
    box-shadow .45s cubic-bezier(0.22,1,0.36,1);
        }
        .form-card:hover {
          transform: translateY(-4px);
  box-shadow:
    0 30px 70px -10px rgba(0,0,0,0.18),
    0 0 0 1px rgba(255,90,0,0.08);
        }

        /* ── Input fields ── */
        .fi {
  transition:
    border-color .35s cubic-bezier(0.22,1,0.36,1),
    background-color .35s cubic-bezier(0.22,1,0.36,1),
    box-shadow .35s cubic-bezier(0.22,1,0.36,1),
    transform .35s cubic-bezier(0.22,1,0.36,1);
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

        /* ── Label lift ── */
        .field-wrap { position: relative; }
        .field-label {
          transition: color 0.2s ease;
        }
        .field-wrap:focus-within .field-label {
          color: #ff5a00;
        }

        /* ── Contact info items ── */
        .contact-item {
          position: relative;
          padding: 16px 20px;
          border: 1px solid transparent;
          border-radius: 4px;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .contact-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #ff5a00;
          border-radius: 4px 0 0 4px;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-item:hover {
          border-color: rgba(255,90,0,0.2);
          background: rgba(255,255,255,0.7);
        }
        .contact-item:hover::before {
          transform: scaleY(1);
        }

        /* ── Section legend line draw ── */
        .legend-line {
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        .legend-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff5a00;
          animation: borderDraw 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }

        /* ── Tile checkboxes ── */
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
          transition:
    border-color .35s cubic-bezier(0.22,1,0.36,1),
    color .35s cubic-bezier(0.22,1,0.36,1),
    background-color .35s cubic-bezier(0.22,1,0.36,1),
    transform .35s cubic-bezier(0.22,1,0.36,1),
    box-shadow .35s cubic-bezier(0.22,1,0.36,1);
        }
        .tile-label:hover {
          border-color: #ff5a00;
          color: #ff5a00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255,90,0,0.12);
        }
        .tile-input:checked + .tile-label {
          background: #ff5a00;
          border-color: #ff5a00;
          color: #fff;
          box-shadow: 0 4px 14px rgba(255,90,0,0.3);
          transform: translateY(-1px);
        }

        /* ── Radio buttons ── */
        .radio-label {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          padding: 10px 18px;
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: 3px;
          background: #fff;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          border-color .35s cubic-bezier(0.22,1,0.36,1),
    background-color .35s cubic-bezier(0.22,1,0.36,1),
    transform .35s cubic-bezier(0.22,1,0.36,1),
    box-shadow .35s cubic-bezier(0.22,1,0.36,1);
        }
        .radio-label:hover {
          border-color: #ff5a00;
          color: #ff5a00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255,90,0,0.1);
        }
        .radio-input { display: none; }
        .radio-input:checked + .radio-label {
          border-color: #ff5a00;
          background: rgba(255,90,0,0.06);
          color: #ff5a00;
          box-shadow: 0 0 0 3px rgba(255,90,0,0.1);
        }
        .radio-dot {
          width: 13px; height: 13px;
          border-radius: 50%;
          border: 2px solid currentColor;
          position: relative;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .radio-dot::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .radio-input:checked + .radio-label .radio-dot::after {
          opacity: 1;
        }

        /* ── Custom select arrow ── */
        .custom-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 42px !important;
        }

        /* ── Submit button ── */
        .submit-btn {
          position: relative;
          overflow: hidden;
          background: #1a1a1a;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,90,0,0.18) 50%, transparent 100%);
          background-size: 200% auto;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff5a00;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,90,0,0.35);
        }
        .submit-btn:hover::after { transform: scaleX(1); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .submit-arrow {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .submit-btn:hover .submit-arrow {
          transform: translateX(5px);
        }

        /* ── Fieldset number badge ── */
        .section-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #ff5a00;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          animation: countUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Spinner-dot for floating tag ── */
        .tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ff5a00;
          animation: pulseOrange 2s ease infinite;
        }

        /* ── Number input hide spinners ── */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }

        .form-top-bar {
          height: 3px;
          background: #ff5a00;
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Side accent lines */}
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
          {/* Eyebrow */}
          <p className="hero-eyebrow text-brand-orange text-xs font-bold tracking-[0.25em] uppercase mb-5 opacity-80">
            Bandsaw Solutions · Pune, India
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
            <span className="hero-line hero-line-1 block">Request a Quote</span>
          </h1>

          <p className="hero-sub text-2xl font-light text-brand-orange/80 mt-4 italic">
            Let's build the perfect machine for your floor...
          </p>

          {/* Scroll hint */}
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
          <div className="section-enter-left lg:col-span-5 flex flex-col justify-start">
            <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight mb-3">
              Direct Contact
            </h2>
            {/* Animated underline */}
            <div
              className="h-1 w-16 bg-brand-orange rounded mb-8"
              style={{
                animation:
                  "borderDraw 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both",
              }}
            />
            <p className="text-brand-gray mb-10 leading-relaxed text-base">
              Whether you need a custom automated bandsaw configuration, bulk
              ordering details, or technical specifications — our engineering
              team is ready to assist.
            </p>

            <div className="space-y-3">
              {/* Address */}
              <div className="contact-item">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
                  Headquarters
                </h3>
                <p className="text-brand-dark font-medium text-base leading-relaxed">
                  [Your Street Address Placeholder]
                  <br />
                  Pune, Maharashtra, India
                  <br />
                  [Your Pincode Placeholder]
                </p>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
                  Sales & Support
                </h3>
                <p className="text-brand-dark font-medium text-base">
                  [Your Phone Number Placeholder]
                </p>
              </div>

              {/* Email */}
              <div className="contact-item">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
                  Email Us
                </h3>
                <p className="text-brand-dark font-medium text-base">
                  [Your Email Address Placeholder]
                </p>
              </div>
            </div>

            {/* Dark info block */}
            <div
              className="mt-10 bg-brand-dark rounded-sm p-5"
              style={{
                animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both",
              }}
            >
              <p className="text-xs font-mono text-white/60 leading-7 tracking-wide">
                <span className="text-brand-orange">// </span>Response time:
                &lt; 24 hours
                <br />
                <span className="text-brand-orange">// </span>All quotes are
                custom-engineered
                <br />
                <span className="text-brand-orange">// </span>Pan-India delivery
                available
              </p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="section-enter-right lg:col-span-7">
            <div className="form-card bg-white rounded-sm shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Animated shimmer top bar */}
              <div className="form-top-bar" />

              {/* Form header */}
              <div className="bg-brand-dark px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                    Machine Configuration
                  </h2>
                  <p className="text-brand-orange text-xs font-mono tracking-widest mt-1 opacity-70">
                    FILL ALL REQUIRED FIELDS
                  </p>
                </div>
                {/* macOS dots */}
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

              {/* Form body */}
              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* ─ 01 Contact Details ─ */}
                  <fieldset className="space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="section-badge">1</span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Contact Details
                      </span>
                      <span className="legend-line" />
                    </legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="name"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                      {/* Phone */}
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="phone"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                      {/* Email */}
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="email"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                      {/* Company */}
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="company"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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
                      <span className="section-badge">2</span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Machine Details
                      </span>
                      <span className="legend-line" />
                    </legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Type of Bandsaw */}
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="bandsawType"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                      {/* Quantity */}
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="quantity"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                    {/* Machine Type — radio tiles */}
                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-xs font-bold uppercase tracking-widest text-white/60">
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
                      <span className="section-badge">3</span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Material Information
                      </span>
                      <span className="legend-line" />
                    </legend>

                    {/* Size / Shape */}
                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-xs font-bold uppercase tracking-widest text-white/60">
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

                    {/* Material Size Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="field-wrap space-y-2">
                        <label
                          htmlFor="materialWidth"
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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
                          className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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
                        className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                    {/* Type of Material */}
                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-xs font-bold uppercase tracking-widest text-white/60">
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
                      <span className="section-badge">4</span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                        Enquiry Details
                      </span>
                      <span className="legend-line" />
                    </legend>

                    {/* Purpose */}
                    <div className="field-wrap space-y-2">
                      <label
                        htmlFor="enquiryPurpose"
                        className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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

                    {/* Notes */}
                    <div className="field-wrap space-y-2">
                      <label
                        htmlFor="requirement"
                        className="field-label block text-xs font-bold uppercase tracking-widest text-white/60"
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
                    className="submit-btn w-full py-5 rounded-sm text-base font-bold tracking-widest uppercase"
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
          </div>
        </div>
      </section>
    </div>
  );
}

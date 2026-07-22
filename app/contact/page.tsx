"use client";

import React, { useEffect, useRef, useState, useActionState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useFormStatus } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitQuoteForm, type FormState } from "./actions";

/* ─────────────────────────────────────────────
   Submit button — reads pending state via hook
───────────────────────────────────────────── */
function SubmitButton({ extraPending = false }: { extraPending?: boolean }) {
  const { pending: formPending } = useFormStatus();
  const pending = formPending || extraPending;

  return (
    <button
      type="submit"
      disabled={pending}
      className="submit-btn w-full py-5 rounded-sm text-base font-bold tracking-widest uppercase mt-4"
      aria-busy={pending}
    >
      <span className="submit-btn-inner">
        {pending ? (
          <>
            <svg
              className="spinner w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeOpacity="0.25"
              />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Enquiry
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
          </>
        )}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
const initialState: FormState = { status: "idle", message: "" };

/* Required fields used to compute live completion progress.
   Checkbox/radio groups are checked via querySelectorAll since they
   share a name across multiple inputs. */
function computeProgress(form: HTMLFormElement | null): number {
  if (!form) return 0;
  const val = (name: string) =>
    (form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null)?.value ?? "";
  const checks = [
    !!val("name"),
    !!val("phone"),
    !!val("email"),
    !!val("company"),
    !!val("bandsawType"),
    !!val("quantity"),
    form.querySelectorAll('input[name="machineType"]:checked').length > 0,
    form.querySelectorAll('input[name="materialSize"]:checked').length > 0,
    !!val("materialWidth"),
    !!val("materialHeight"),
    !!val("materialLength"),
    form.querySelectorAll('input[name="materialType"]:checked').length > 0,
    !!val("enquiryPurpose"),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const submitBtnWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [formState, formAction, isPending] = useActionState(submitQuoteForm, initialState);
  const [progress, setProgress] = useState(0);
  const [groupErrors, setGroupErrors] = useState({ materialSize: false, materialType: false });
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  // What's actually shown in the toast. Mirrors formState for idle/success/error,
  // but for "ready" we intercept — the server validated + synced the CRM, and
  // handed the composed email back for the browser to deliver directly (Web3Forms
  // sits behind Cloudflare, which blocks server-to-server requests but not
  // real browser requests — see emailPayload handoff in actions.ts).
  const [displayState, setDisplayState] = useState<FormState>(initialState);
  const [emailSending, setEmailSending] = useState(false);

  const refreshProgress = () => setProgress(computeProgress(formRef.current));

  /* ── Show a persistent mobile submit bar once the user scrolls past the
     hero, and hide it again once the real submit button is on screen —
     so there's never a moment where the primary action isn't reachable. ── */
  useEffect(() => {
    const submitEl = submitBtnWrapRef.current;
    if (!submitEl) return;

    const io = new IntersectionObserver(
      ([entry]) => setStickyBarVisible(!entry.isIntersecting && window.scrollY > 500),
      { threshold: 0 }
    );
    io.observe(submitEl);

    const onScroll = () => {
      if (window.scrollY <= 500) setStickyBarVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── React to the server action's result ── */
  useEffect(() => {
    if (formState.status === "idle") return;

    if (formState.status === "error") {
      setDisplayState(formState);
      return;
    }

    if (formState.status === "ready" && formState.emailPayload) {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        console.error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — cannot send from the browser.");
        setDisplayState({ status: "error", message: "Server configuration error. Please contact us directly at sales@acs.co.in" });
        return;
      }

      setEmailSending(true);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: formState.emailPayload.subject,
          from_name: "ACS Quote Form",
          replyto: formState.emailPayload.replyto,
          // Individual fields, not a raw HTML blob — Web3Forms' free-tier template
          // doesn't render custom HTML, and a wall of literal markup tags in the
          // email body is a strong spam-filter trigger. This lets Web3Forms build
          // its own clean, properly rendered field table instead.
          ...formState.emailPayload.fields,
        }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => null);
          if (!res.ok || !data?.success) {
            console.error("Web3Forms rejected submission:", { status: res.status, data });
            setDisplayState({ status: "error", message: "Failed to send your enquiry. Please try again or contact us directly." });
            return;
          }
          setDisplayState({ status: "success", message: "Your enquiry has been sent. Our engineering team will respond within 24 hours." });
        })
        .catch((err) => {
          console.error("Web3Forms submission failed:", err);
          setDisplayState({ status: "error", message: "Failed to send your enquiry. Please try again or contact us directly." });
        })
        .finally(() => setEmailSending(false));
    }
  }, [formState]);

  /* ── On any final outcome: move attention to the result. Screen readers
     get it via role="alert" already; sighted users on a long form need the
     scroll+focus or they'll never notice a toast rendered off-screen. ── */
  useEffect(() => {
    if (displayState.status === "idle") return;

    toastRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    toastRef.current?.focus();

    if (displayState.status === "success") {
      formRef.current?.reset();
      setGroupErrors({ materialSize: false, materialType: false });
      setProgress(0);
    }
  }, [displayState]);


  /* ── GSAP orchestration ── */
  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Hero — staggered word-by-word reveal with subtle y + clip */
      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });

      heroTl
        .from(".hero-eyebrow", { opacity: 0, y: 10, duration: 0.55 })
        .from(
          ".hero-line",
          { y: 56, clipPath: "inset(100% 0% 0% 0%)", duration: 0.85 },
          "-=0.3"
        )
        .from(".hero-sub", { y: 18, opacity: 0, duration: 0.65 }, "-=0.5")
        .from(".hero-scroll-arrow", { opacity: 0, y: -8, duration: 0.5 }, "-=0.3");

      /* Left column — stagger each contact block individually */
      gsap.from(".contact-block", {
        scrollTrigger: {
          trigger: ".contact-info-section",
          start: "top 78%",
          once: true,
        },
        x: -24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      /* Left heading */
      gsap.from(".contact-heading", {
        scrollTrigger: {
          trigger: ".contact-info-section",
          start: "top 82%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });

      /* Terminal box */
      gsap.from(".terminal-box", {
        scrollTrigger: {
          trigger: ".terminal-box",
          start: "top 90%",
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      /* Fieldsets — each one triggered when it enters viewport */
      document.querySelectorAll(".form-fieldset").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          y: 32,
          opacity: 0,
          duration: 0.65,
          delay: i * 0.04, // tiny extra stagger for overlapping viewports
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ── Client-side guard (checkbox groups aren't covered by HTML required).
     Instead of blocking with alert(), we mark the offending group inline
     and scroll straight to the first one — the user shouldn't have to
     hunt for what's wrong. ── */
  const handleClientValidate = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const materialSizeChecked = form.querySelectorAll('input[name="materialSize"]:checked').length > 0;
    const materialTypeChecked = form.querySelectorAll('input[name="materialType"]:checked').length > 0;

    setGroupErrors({ materialSize: !materialSizeChecked, materialType: !materialTypeChecked });

    if (!materialSizeChecked || !materialTypeChecked) {
      e.preventDefault();
      const firstBadGroup = form.querySelector(
        `[data-group="${!materialSizeChecked ? "materialSize" : "materialType"}"]`
      );
      firstBadGroup?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-light flex flex-col">
      <style>{`
        /* ──────────── Field interactions ──────────── */
        .fi {
          transition:
            border-color 0.3s cubic-bezier(0.22,1,0.36,1),
            background-color 0.3s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .fi:focus {
          outline: none;
          border-color: #ff5a00 !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 3px rgba(255,90,0,0.12), 0 1px 6px rgba(255,90,0,0.08);
        }
        .fi:hover:not(:focus) { border-color: rgba(255,90,0,0.38); }

        .field-wrap { position: relative; }
        .field-label { transition: color 0.2s ease; }
        .field-wrap:focus-within .field-label { color: #ff5a00; }

        /* ──────────── Tile checkboxes ──────────── */
        @keyframes springPop {
          0%   { transform: scale(0.93); }
          55%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .tile-input { display: none; }
        .tile-label {
          display: inline-block;
          cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.13);
          border-radius: 3px;
          padding: 7px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          background: #fff;
          user-select: none;
          transition: border-color 0.28s, color 0.28s, background-color 0.28s, box-shadow 0.28s;
        }
        .tile-label:hover {
          border-color: #ff5a00;
          color: #ff5a00;
          box-shadow: 0 3px 10px rgba(255,90,0,0.11);
        }
        .tile-input:checked + .tile-label {
          background: #ff5a00;
          border-color: #ff5a00;
          color: #fff;
          box-shadow: 0 4px 14px rgba(255,90,0,0.28);
          animation: springPop 0.38s cubic-bezier(0.175,0.885,0.32,1.275) both;
        }

        /* ──────────── Radio pills ──────────── */
        .radio-input { display: none; }
        .radio-label {
          display: flex; align-items: center; gap: 9px; cursor: pointer;
          padding: 10px 18px; border: 1.5px solid rgba(0,0,0,0.13); border-radius: 3px;
          background: #fff; font-size: 14px; font-weight: 500; color: #333;
          transition: border-color 0.28s, background-color 0.28s, box-shadow 0.28s, color 0.28s;
        }
        .radio-label:hover { border-color: #ff5a00; color: #ff5a00; box-shadow: 0 3px 10px rgba(255,90,0,0.09); }
        .radio-input:checked + .radio-label {
          border-color: #ff5a00; background: rgba(255,90,0,0.05); color: #ff5a00;
          box-shadow: 0 0 0 3px rgba(255,90,0,0.09);
        }
        .radio-dot {
          width: 13px; height: 13px; border-radius: 50%; border: 2px solid currentColor;
          position: relative; flex-shrink: 0; transition: border-color 0.2s;
        }
        .radio-dot::after {
          content: ''; position: absolute; inset: 2px; border-radius: 50%;
          background: currentColor; opacity: 0; transition: opacity 0.2s;
        }
        .radio-input:checked + .radio-label .radio-dot::after {
          opacity: 1;
          animation: springPop 0.38s cubic-bezier(0.175,0.885,0.32,1.275) both;
        }

        /* ──────────── Submit button ──────────── */
        .submit-btn {
          position: relative; overflow: hidden;
          background: #1a1a1a; color: #fff;
          border: none; cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.15s ease;
        }
        .submit-btn::after {
          content: ''; position: absolute; inset: 0; background: #ff5a00;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
        }
        .submit-btn:hover { box-shadow: 0 8px 26px rgba(255,90,0,0.32); }
        .submit-btn:hover::after { transform: scaleX(1); }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .submit-btn:disabled::after { display: none; }
        .submit-btn-inner { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .submit-arrow { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .submit-btn:not(:disabled):hover .submit-arrow { transform: translateX(6px); }

        /* ──────────── Spinner ──────────── */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.85s linear infinite; }

        /* ──────────── Form top accent bar ──────────── */
        .form-top-bar {
          height: 3px;
          background: linear-gradient(90deg, #ff5a00 0%, #ff8a4c 50%, #ff5a00 100%);
          background-size: 200% auto;
          animation: barShimmer 2.8s linear infinite;
        }
        @keyframes barShimmer { to { background-position: 200% center; } }

        /* ──────────── Custom select ──────────── */
        .custom-select {
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center; padding-right: 42px !important;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }

        /* ──────────── Legend divider ──────────── */
        .legend-line {
          flex: 1; height: 1px; background: rgba(0,0,0,0.09); position: relative; overflow: hidden;
        }
        .legend-line::after {
          content: ''; position: absolute; inset: 0; background: #ff5a00;
          transform: scaleX(0); transform-origin: left;
          animation: drawLine 0.65s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        @keyframes drawLine { to { transform: scaleX(1); } }

        /* ──────────── Contact item hover bar ──────────── */
        .contact-block {
          position: relative;
          padding: 14px 18px;
          border: 1px solid transparent;
          border-radius: 3px;
          transition: border-color 0.28s ease, background 0.28s ease;
        }
        .contact-block::before {
          content: '';
          position: absolute; left: 0; top: 12px; bottom: 12px; width: 2.5px;
          background: #ff5a00; border-radius: 2px;
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-block:hover { border-color: rgba(255,90,0,0.18); background: rgba(255,255,255,0.65); }
        .contact-block:hover::before { transform: scaleY(1); }

        /* ──────────── Scroll arrow bounce ──────────── */
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 0.9; }
        }
        .hero-scroll-arrow { animation: arrowBounce 2s ease-in-out infinite; }

        /* ──────────── Success / error toast ──────────── */
        .form-toast {
          border-radius: 3px;
          padding: 14px 18px;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .form-toast--success { background: rgba(40,200,100,0.09); border: 1px solid rgba(40,200,100,0.35); color: #166534; }
        .form-toast--error   { background: rgba(220,38,38,0.07);  border: 1px solid rgba(220,38,38,0.3);  color: #991b1b; }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        {/* Side accent lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/25 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-orange/25 to-transparent" />

        {/* Badge */}
        <div
          className="absolute hidden lg:flex items-center gap-2 top-6 right-8"
          style={{
            background: "rgba(255,90,0,0.07)",
            border: "1px solid rgba(255,90,0,0.22)",
            borderRadius: "2px",
            padding: "5px 12px",
          }}
        >
          <span className="text-brand-orange text-[11px] font-bold tracking-widest uppercase opacity-75">
            Engineering Enquiries
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="hero-eyebrow text-brand-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-5 opacity-75">
            Accurate Cutting Systems· Pune, India
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase overflow-hidden pb-2">
            <span
              className="hero-line inline-block"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              Request a Quote
            </span>
          </h1>
          <p className="hero-sub text-xl font-light text-brand-orange/75 mt-4 italic">
            Let's build the perfect machine for your floor.
          </p>
          <div className="mt-10 flex justify-center">
            <svg
              className="hero-scroll-arrow"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,90,0,0.6)"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════ BODY ══════════════ */}
      <section className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── LEFT: Contact Info ── */}
          <div className="lg:col-span-5 flex flex-col justify-start contact-info-section">
            <div className="mb-12 contact-heading">
              <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-4">
                Direct Contact
              </h2>
              <div className="w-14 h-[3px] bg-brand-orange mb-6" />
              <p className="text-gray-600 leading-relaxed text-base">
                Whether you need a custom automated bandsaw configuration, bulk ordering
                details, or technical specifications — our engineering team is ready to assist.
              </p>
            </div>

            <div className="space-y-2">
              {/* Address */}
              <div className="contact-block flex flex-row items-start gap-5 group">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-sm flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors shadow-sm mt-0.5">
                  <svg width="20" height="20" fill="none" stroke="#ff5a00" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col pt-0.5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-orange mb-1.5">Headquarters</h3>
                  <p className="text-brand-dark font-medium text-sm md:text-base leading-snug">
                    Survey No. 639, Opp. Kalyani Forge LTD. Koregaon Bhima, Tal.<br />
                    Shirur, Pune 412216
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-block flex flex-row items-start gap-5 group">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-sm flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors shadow-sm mt-0.5">
                  <svg width="20" height="20" fill="none" stroke="#ff5a00" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.128.96.361 1.905.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.905.339 1.85.572 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div className="flex flex-col pt-0.5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-orange mb-1.5">Sales &amp; Support</h3>
                  <p className="text-brand-dark font-medium text-sm md:text-base leading-snug">+91 9422308363</p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-block flex flex-row items-start gap-5 group">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-sm flex items-center justify-center shrink-0 group-hover:border-brand-orange transition-colors shadow-sm mt-0.5">
                  <svg width="20" height="20" fill="none" stroke="#ff5a00" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline strokeLinecap="round" strokeLinejoin="round" points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="flex flex-col pt-0.5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-orange mb-1.5">Email Us</h3>
                  <p className="text-brand-dark font-medium text-sm md:text-base leading-snug">sales@acs.co.in</p>
                </div>
              </div>
            </div>

            {/* Terminal commitment box */}
            <div className="terminal-box mt-12 bg-brand-dark p-7 rounded-sm border-l-[3px] border-brand-orange shadow-lg w-full">
              <ul className="space-y-4 text-sm font-mono text-gray-300">
                {[
                  "Response time: < 24 hours",
                  "All quotes are custom-engineered",
                  "Pan-India delivery available",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-3">
                    <span className="text-brand-orange font-bold text-base leading-none">//</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Map */}
            <div className="mt-6 rounded-sm overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="ACS Workshop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.123!2d74.2!3d18.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e8b1a5b3b3b3%3A0x1!2sAccurate+Cutting+Systems+Pvt.+Ltd.%2C+Survey+No.+639%2C+Opp.+Kalyani+Forge+Ltd%2C+Koregaon+Bhima%2C+Pune+412216!5e0!3m2!1sen!2sin!4v1690000000000"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/?q=Accurate+Cutting+Systems+Pvt+Ltd+Koregaon+Bhima+Pune+412216"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-brand-dark px-4 py-3 group"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                  Get Directions
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-brand-orange group-hover:translate-x-1 transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            className="form-section lg:col-span-7"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-sm shadow-xl border border-gray-100 overflow-hidden">
              {/* Accent bar */}
              <div className="form-top-bar" />

              {/* Card header */}
              <div className="bg-brand-dark px-8 py-5 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-extrabold text-white uppercase tracking-tight">
                    Machine Configuration
                  </h2>
                  <p className="text-brand-orange text-[11px] font-mono tracking-widest mt-1 opacity-70">
                    {progress}% COMPLETE
                  </p>
                </div>
                {/* macOS-style dots — purely decorative */}
                <div className="flex gap-2 shrink-0 ml-4" aria-hidden="true">
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.5 }} />
                  ))}
                </div>
              </div>
              {/* Live progress bar — gives concrete feedback on a long form instead of leaving the user guessing how much is left */}
              <div className="h-1 bg-black/20" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Form completion">
                <div
                  className="h-full bg-brand-orange transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="p-8 md:p-10">
                {/* ── Toast feedback ── */}
                {displayState.status !== "idle" && (
                  <motion.div
                    ref={toastRef}
                    tabIndex={-1}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`form-toast ${displayState.status === "success" ? "form-toast--success" : "form-toast--error"}`}
                    role="alert"
                  >
                    <svg
                      className="shrink-0 mt-0.5"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                    >
                      {displayState.status === "success" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                      )}
                    </svg>
                    {displayState.message}
                  </motion.div>
                )}
                {emailSending && (
                  <div className="form-toast" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", color: "#555" }} role="status">
                    Sending your enquiry…
                  </div>
                )}

                <form
                  ref={formRef}
                  id="quote-form"
                  action={formAction}
                  onSubmit={handleClientValidate}
                  onChange={refreshProgress}
                  onInput={refreshProgress}
                  className="space-y-10"
                >

                  {/* ─ 01 Contact Details ─ */}
                  <fieldset className="form-fieldset space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[21px] h-[21px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Contact Details</span>
                      <span className="legend-line" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { id: "name",    label: "Full Name",      type: "text",  placeholder: "e.g. Rajan Mehta",      required: true },
                        { id: "phone",   label: "Phone",          type: "tel",   placeholder: "+91 XXXXX XXXXX",       required: true },
                        { id: "email",   label: "Business Email", type: "email", placeholder: "you@company.com",       required: true },
                        { id: "company", label: "Company Name",   type: "text",  placeholder: "Your Company Ltd.",     required: true },
                      ].map(({ id, label, type, placeholder, required }) => (
                        <div key={id} className="field-wrap space-y-2">
                          <label htmlFor={id} className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                            {label} {required && <span className="text-brand-orange">*</span>}
                          </label>
                          <input
                            type={type}
                            id={id}
                            name={id}
                            required={required}
                            placeholder={placeholder}
                            className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  {/* ─ 02 Machine Details ─ */}
                  <fieldset className="form-fieldset space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[21px] h-[21px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Machine Details</span>
                      <span className="legend-line" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="field-wrap space-y-2">
                        <label htmlFor="bandsawType" className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                          Type of Bandsaw <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          id="bandsawType"
                          name="bandsawType"
                          required
                          className="fi custom-select w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium cursor-pointer"
                        >
                          <option value="">— Please choose —</option>
                          <option value="Horizontal Bandsaw">Horizontal Bandsaw</option>
                          <option value="Vertical Bandsaw">Vertical Bandsaw</option>
                          <option value="Circular Bandsaw">Circular Bandsaw</option>
                          <option value="SPM Bandsaw">SPM Bandsaw</option>
                        </select>
                      </div>
                      <div className="field-wrap space-y-2">
                        <label htmlFor="quantity" className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                          Quantity Required <span className="text-brand-orange">*</span>
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
                      <label className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                        Machine Type <span className="text-brand-orange">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Automatic", "Semi Automatic", "Manual"].map((mt) => (
                          <label key={mt}>
                            <input type="radio" name="machineType" value={mt} required className="radio-input" />
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
                  <fieldset className="form-fieldset space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[21px] h-[21px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Material Information</span>
                      <span className="legend-line" />
                    </legend>

                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                        Size / Shape of Material to Cut <span className="text-brand-orange">*</span>
                      </label>
                      <div
                        data-group="materialSize"
                        className={`flex flex-wrap gap-2 p-1 -m-1 rounded-sm transition-shadow duration-300 ${
                          groupErrors.materialSize ? "ring-2 ring-red-400 ring-offset-2" : ""
                        }`}
                      >
                        {["Round Bar / Pipe", "Square Bar / Pipe", "Casting", "Runner", "Riser"].map((s) => (
                          <label key={s}>
                            <input
                              type="checkbox"
                              name="materialSize"
                              value={s}
                              className="tile-input"
                              onChange={() => setGroupErrors((prev) => ({ ...prev, materialSize: false }))}
                            />
                            <span className="tile-label">{s}</span>
                          </label>
                        ))}
                      </div>
                      {groupErrors.materialSize && (
                        <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                          </svg>
                          Please select at least one shape.
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {[
                        { id: "materialWidth",  label: "Width (mm)",  placeholder: "e.g. 250" },
                        { id: "materialHeight", label: "Height (mm)", placeholder: "e.g. 150" },
                        { id: "materialLength", label: "Length (mm)", placeholder: "e.g. 6000" },
                      ].map(({ id, label, placeholder }) => (
                        <div key={id} className="field-wrap space-y-2">
                          <label htmlFor={id} className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">{label}</label>
                          <input
                            type="number"
                            id={id}
                            name={id}
                            min="0"
                            required
                            placeholder={placeholder}
                            className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="field-wrap space-y-2">
                      <label htmlFor="additionalDimensions" className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                        Additional Size Information
                      </label>
                      <textarea
                        id="additionalDimensions"
                        name="additionalDimensions"
                        rows={3}
                        placeholder="Example: Ø250 mm round bar, 6 metre length, bundle cutting required."
                        className="fi w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium resize-none"
                      />
                    </div>

                    <div className="field-wrap space-y-3">
                      <label className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                        Type of Material <span className="text-brand-orange">*</span>
                      </label>
                      <div
                        data-group="materialType"
                        className={`flex flex-wrap gap-2 p-1 -m-1 rounded-sm transition-shadow duration-300 ${
                          groupErrors.materialType ? "ring-2 ring-red-400 ring-offset-2" : ""
                        }`}
                      >
                        {["MS", "Steel", "Cast Iron", "Polymer", "Fiber", "Foam", "Rubber", "PVC", "Wood", "Ceramic", "Non Ferrous"].map((m) => (
                          <label key={m}>
                            <input
                              type="checkbox"
                              name="materialType"
                              value={m}
                              className="tile-input"
                              onChange={() => setGroupErrors((prev) => ({ ...prev, materialType: false }))}
                            />
                            <span className="tile-label">{m}</span>
                          </label>
                        ))}
                      </div>
                      {groupErrors.materialType && (
                        <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5">
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                          </svg>
                          Please select at least one material type.
                        </p>
                      )}
                    </div>
                  </fieldset>

                  {/* ─ 04 Enquiry Details ─ */}
                  <fieldset className="form-fieldset space-y-5 border-0 p-0 m-0">
                    <legend className="flex items-center gap-3 w-full mb-5">
                      <span className="w-[21px] h-[21px] rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Enquiry Details</span>
                      <span className="legend-line" />
                    </legend>
                    <div className="field-wrap space-y-2">
                      <label htmlFor="enquiryPurpose" className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
                        Purpose of Enquiry <span className="text-brand-orange">*</span>
                      </label>
                      <select
                        id="enquiryPurpose"
                        name="enquiryPurpose"
                        required
                        className="fi custom-select w-full bg-brand-light border border-gray-300 rounded-sm px-4 py-3.5 text-brand-dark text-sm font-medium cursor-pointer"
                      >
                        <option value="">— Select purpose —</option>
                        <option value="For Resale">For Resale</option>
                        <option value="For Use">For Use</option>
                        <option value="For Tender Submission">For Tender Submission</option>
                        <option value="For Export">For Export</option>
                      </select>
                    </div>
                    <div className="field-wrap space-y-2">
                      <label htmlFor="requirement" className="field-label block text-[11px] font-bold uppercase tracking-widest text-brand-gray/60">
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
                  <div ref={submitBtnWrapRef}>
                    <SubmitButton extraPending={emailSending} />
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════ MOBILE STICKY SUBMIT BAR ══════════════
          On a long form, forcing users to scroll all the way back down
          every time to submit is a real drop-off point. This surfaces the
          primary action as soon as it scrolls off screen, and hides again
          once the real button is visible so there's never a duplicate. */}
      <div
        className={`lg:hidden fixed bottom-0 inset-x-0 z-[90] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 transition-transform duration-300 ${
          stickyBarVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-brand-orange transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/70">
              {progress}% complete
            </p>
          </div>
          <button
            type="submit"
            form="quote-form"
            disabled={isPending || emailSending}
            className="shrink-0 px-6 py-3 rounded-sm bg-brand-dark text-white text-xs font-bold uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
          >
            {isPending || emailSending ? "Sending…" : "Send Enquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}
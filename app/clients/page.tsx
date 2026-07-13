"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { clientData } from "@/data/clients";

type Client = typeof clientData[0];

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedClient) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedClient(null);
    };
    window.addEventListener("keydown", onKey);
    // lock scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedClient]);

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">

      {/* ── HEADER ── */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">
            Trusted Worldwide
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-6">
            Our Clients
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From global automotive giants to national defense contractors, the world's most demanding manufacturers rely on ACS bandsaws for unyielding precision.
          </p>

          {/* Stat bar for social proof */}
          <div className="mt-10 flex items-center justify-center gap-10 flex-wrap">
            <Stat value={`${clientData.length}+`} label="Active Clients" />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <Stat value="15+" label="Years in Field" />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <Stat value="24/7" label="Support Coverage" />
          </div>
        </motion.div>
      </section>

      {/* ── CLIENT GRID ── */}
      <section className="relative py-20 w-full flex-grow overflow-hidden">
        {/* Background treatment */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Faint blueprint grid, echoes the hero */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#1a1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Slow-drifting glow orbs */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full bg-brand-orange/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full bg-brand-dark/5 blur-3xl"
          />

          {/* Corner crosshair / measurement accents */}
          <div className="absolute top-10 left-6 lg:left-10 w-8 h-8 border-l-2 border-t-2 border-brand-orange/20" />
          <div className="absolute bottom-10 right-6 lg:right-10 w-8 h-8 border-r-2 border-b-2 border-brand-orange/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {clientData.length === 0 ? (
          <div className="text-center text-brand-gray py-24">
            <p className="text-lg font-semibold">Client stories coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clientData.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className="bg-white border border-gray-200 rounded-sm p-8 flex flex-col items-center justify-center relative group overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-brand-orange/40 transition-all duration-300"
              >
                <div className="relative w-full h-28 mb-8 px-4">
                  <Image
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    fill
                    className="object-contain mix-blend-multiply filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                <button
                  onClick={() => setSelectedClient(client)}
                  className="px-6 py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-sm w-full cursor-pointer"
                >
                  View Feedback
                </button>
              </motion.div>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* ── TESTIMONIAL MODAL ── */}
      <AnimatePresence>
        {selectedClient && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedClient.name} testimonial`}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close button (mobile-friendly, top-right) */}
              <button
                onClick={() => setSelectedClient(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-brand-orange hover:text-white text-brand-dark transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Left: Testimonial */}
              <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center overflow-y-auto">
                <div className="w-12 h-1 bg-brand-orange mb-6" />
                {client_industry_tag(selectedClient)}
                <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight mb-6">
                  {selectedClient.name}
                </h3>
                <blockquote className="text-lg md:text-xl text-gray-600 italic leading-relaxed relative">
                  <span className="absolute -left-4 -top-4 text-6xl text-brand-orange/20 font-serif select-none">"</span>
                  {selectedClient.testimonial}
                  <span className="absolute -bottom-8 ml-2 text-6xl text-brand-orange/20 font-serif rotate-180 select-none">"</span>
                </blockquote>
              </div>

              {/* Right: QR Code Profile */}
              <div className="bg-brand-light p-8 md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-4 text-center">
                  Scan for verified<br />Case Study
                </p>
                <QRPlaceholder seed={selectedClient.id} />
                <button
                  onClick={() => setSelectedClient(null)}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-dark transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-extrabold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{label}</div>
    </div>
  );
}

// Renders an industry tag if the client data provides one — safe no-op otherwise
function client_industry_tag(client: Client) {
  const industry = (client as Partial<{ industry: string }>).industry;
  if (!industry) return null;
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-2 block">
      {industry}
    </span>
  );
}

// Deterministic pseudo-QR pattern so it doesn't flicker/change on every re-render,
// and looks the same for a given client every time (swap for a real QR lib when ready).
function QRPlaceholder({ seed }: { seed: string | number }) {
  const cells = 16;
  const pattern = [...Array(cells)].map((_, i) => {
    const n = hashCode(`${seed}-${i}`);
    return n % 5 !== 0; // ~80% filled, deterministic
  });

  return (
    <div className="w-32 h-32 bg-white p-2 border-2 border-brand-dark rounded-sm flex items-center justify-center relative">
      <div className="absolute top-2 left-2 w-6 h-6 border-4 border-brand-dark" />
      <div className="absolute top-2 right-2 w-6 h-6 border-4 border-brand-dark" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-brand-dark" />
      <div className="w-16 h-16 grid grid-cols-4 gap-1">
        {pattern.map((filled, i) => (
          <div key={i} className={`bg-brand-dark ${filled ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
    </div>
  );
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
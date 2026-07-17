"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { clientData } from "@/data/clients";

export default function ClientsPage() {
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
            <Stat value={`1000+`} label="Active Clients" />
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <Stat value="19+" label="Years in Field" />
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
                  <div className="relative w-full h-28 px-4">
                    <Image
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      fill
                      className="object-contain mix-blend-multiply filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
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
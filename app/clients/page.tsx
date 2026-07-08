"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { clientData } from "@/data/clients";

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<typeof clientData[0] | null>(null);

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      
      {/* ── HEADER ── */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">
            Trusted Worldwide
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-6">
            Our Clients
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From global automotive giants to national defense contractors, the world's most demanding manufacturers rely on ACS bandsaws for unyielding precision.
          </p>
        </div>
      </section>

      {/* ── CLIENT GRID ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clientData.map((client) => (
            <div 
              key={client.id}
              className="bg-white border border-gray-200 rounded-sm p-8 flex flex-col items-center justify-center relative group overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Logo Placeholder (Replace with actual Image tag when logos are in public folder) */}
              {/* <div className="w-full h-24 flex items-center justify-center mb-6">
                <span className="text-xl font-black text-brand-dark uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </span>
              </div> */}
              {/* ── ACTUAL LOGO IMAGE ── */}
              <div className="relative w-full h-28 mb-8 px-4">
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  fill
                  className="object-contain mix-blend-multiply filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedClient(client)}
                className="px-6 py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-sm w-full"
              >
                View Feedback
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL MODAL ── */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
              className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: Testimonial */}
              <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
                <div className="w-12 h-1 bg-brand-orange mb-6" />
                <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight mb-6">
                  {selectedClient.name}
                </h3>
                <blockquote className="text-lg md:text-xl text-gray-600 italic leading-relaxed relative">
                  <span className="absolute -left-4 -top-4 text-6xl text-brand-orange/20 font-serif">"</span>
                  {selectedClient.testimonial}
                  <span className="absolute -bottom-8 ml-2 text-6xl text-brand-orange/20 font-serif rotate-180">"</span>
                </blockquote>
              </div>

              {/* Right: QR Code Profile */}
              <div className="bg-brand-light p-8 md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-4 text-center">
                  Scan for verified<br/>Case Study
                </p>
                {/* Generic SVG QR Code representation */}
                <div className="w-32 h-32 bg-white p-2 border-2 border-brand-dark rounded-sm flex items-center justify-center relative">
                  <div className="absolute top-2 left-2 w-6 h-6 border-4 border-brand-dark" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-4 border-brand-dark" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-brand-dark" />
                  <div className="w-16 h-16 grid grid-cols-4 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`bg-brand-dark ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedClient(null)}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-dark transition-colors"
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
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMachinesOpen, setIsMobileMachinesOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top orange accent bar */}
      <div className="w-full h-1 bg-brand-orange" />

      <nav className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between bg-white">
        {/* ── DESKTOP LEFT LINKS ── */}
        <div className="hidden md:flex flex-1 justify-end pr-10 lg:pr-16 gap-8 items-center">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-brand-orange transition-colors"
          >
            Home
          </Link>

          {/* Desktop hover dropdown */}
          <div className="relative group py-6">
            <Link
              href="/machines"
              className="text-sm font-bold uppercase tracking-widest text-brand-gray group-hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              Our Machines
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>

            {/* Dropdown panel */}
            <div className="absolute left-0 top-full w-64 bg-white border-t-4 border-brand-orange shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 rounded-b-sm">
              <div className="flex flex-col">
                <Link
                  href="/machines/double-column"
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light hover:text-brand-orange transition-colors border-b border-gray-100"
                >
                  Double Column Bandsaw
                </Link>
                <Link
                  href="/machines/vertical-column"
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light hover:text-brand-orange transition-colors border-b border-gray-100"
                >
                  Vertical Column Bandsaw
                </Link>
                <Link
                  href="/machines/circular-saw"
                  className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light hover:text-brand-orange transition-colors"
                >
                  Circular Saw
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER BRAND ── */}
        {/* ── CENTER BRAND ── */}
        {/* ── CENTER BRAND ── */}
        {/* ── CENTER BRAND ── */}
        <div className="flex flex-col items-center justify-center shrink-0 text-center mt-2">
          <Link
            href="/"
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Logo Container (Locked to exactly 144px by 64px) */}
            <div className="relative w-36 h-16 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/ACS_LOGO.png"
                alt="ACS Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 144px, 144px"
                priority
              />
            </div>
            
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand-dark mt-1 hidden sm:block">
              Accurate Cutting Systems
            </span>
            
            {/* Tagline Container (Responsive sizes locked via the parent div) */}
            <div className="relative mt-1.5 w-40 h-6 sm:w-[200px] sm:h-8">
              <Image
                src="/images/ACS_tagline-removebg.png"
                alt="The Perfect Cut... Always"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 160px, 200px"
              />
            </div>
          </Link>
        </div>

        {/* ── DESKTOP RIGHT LINKS ── */}
        <div className="hidden md:flex flex-1 justify-start pl-10 lg:pl-16 gap-8 items-center">
          {/* Company Dropdown */}
          <div className="relative group py-6">
            <Link
              href="/about"
              className="text-sm font-bold uppercase tracking-widest text-brand-gray group-hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              Company
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full w-48 bg-white border-t-4 border-brand-orange shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 rounded-b-sm">
              <div className="flex flex-col">
                <Link href="/about" className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light hover:text-brand-orange transition-colors border-b border-gray-100">About Us</Link>
                <Link href="/clients" className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light hover:text-brand-orange transition-colors">Our Clients</Link>
              </div>
            </div>
          </div>

          <Link href="/contact" className="px-6 py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-sm shadow-md">
            Get a Quote
          </Link>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <div className="md:hidden flex-1 flex justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-brand-dark focus:outline-none bg-brand-light rounded-sm active:bg-gray-200 transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DROPDOWN ──
          Key fix: use max-height transition instead of scale-y.
          scale-y on absolute elements clips child content and causes
          rendering artifacts. max-h animates the real layout height. ── */}
      <div
        className={`
          md:hidden w-full bg-white border-b-4 border-brand-orange shadow-2xl
          overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col">
          <Link
            href="/"
            className="px-8 py-5 border-b border-gray-100 text-sm font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Mobile machines accordion */}
          <div className="flex flex-col border-b border-gray-100">
            <button
              onClick={() => setIsMobileMachinesOpen(!isMobileMachinesOpen)}
              className="px-8 py-5 flex justify-between items-center text-sm font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light transition-colors w-full text-left"
            >
              Our Machines
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isMobileMachinesOpen ? "rotate-180 text-brand-orange" : "text-gray-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`flex flex-col bg-brand-light overflow-hidden transition-all duration-300 ease-in-out ${isMobileMachinesOpen ? "max-h-64" : "max-h-0"}`}
            >
              <Link
                href="/machines/double-column"
                className="px-12 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange border-b border-gray-200/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Double Column
              </Link>
              <Link
                href="/machines/vertical-column"
                className="px-12 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange border-b border-gray-200/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vertical Column
              </Link>
              <Link
                href="/machines/circular-saw"
                className="px-12 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Circular Saw
              </Link>
            </div>
          </div>

          <div className="flex flex-col border-b border-gray-100">
            <button
              onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
              className="px-8 py-5 flex justify-between items-center text-sm font-bold uppercase tracking-widest text-brand-dark hover:bg-brand-light transition-colors w-full text-left"
            >
              Company
              <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileCompanyOpen ? "rotate-180 text-brand-orange" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`flex flex-col bg-brand-light overflow-hidden transition-all duration-300 ease-in-out ${isMobileCompanyOpen ? "max-h-64" : "max-h-0"}`}>
              <Link href="/about" className="px-12 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange border-b border-gray-200/50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link href="/clients" className="px-12 py-4 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Clients</Link>
            </div>
          </div>

          <div className="p-6 bg-brand-light">
            <Link
              href="/contact"
              className="block w-full text-center px-6 py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-sm shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

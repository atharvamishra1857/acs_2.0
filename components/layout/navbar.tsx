import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full h-1 bg-brand-orange"></div>

      <nav className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">
        {/* Left Navigation Links */}
        <div className="hidden md:flex flex-1 justify-end pr-10 lg:pr-16 gap-8 items-center">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-brand-orange transition-colors"
          >
            Home
          </Link>
          {/* Dropdown Container */}
          <div className="relative group py-6">
            <Link
              href="/machines"
              className="text-sm font-bold uppercase tracking-widest text-brand-gray group-hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              Our Machines
              {/* Dropdown Arrow Icon */}
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
                ></path>
              </svg>
            </Link>

            {/* Dropdown Menu - Appears on Hover (THIS WRAPPER WAS MISSING) */}
            <div className="absolute left-0 top-full w-64 bg-white border-t-4 border-brand-orange shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 rounded-b-sm">
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

        {/* Center Brand Identity (The Focal Point) */}
        <div className="flex flex-col items-center justify-center shrink-0 text-center mt-2">
          <Link
            href="/"
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* 1. The Orange Saw-Tooth Image (Export this block without text from your design file) */}
            <div className="relative w-36 h-16 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/ACS_LOGO.png" /* Update with your exact sliced image path */
                alt="ACS Logo Block"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* 2. The Structural Full Form */}
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand-dark mt-1">
              Accurate Cutting Systems
            </span>

            {/* 3. The Handwritten Tagline */}
            <span className="text-2xl font-script text-brand-dark mt-0.5">
              The Perfect Cut... <span className="text-red-600">Always</span>
            </span>
          </Link>
        </div>

        {/* Right Navigation Links & CTA */}
        <div className="hidden md:flex flex-1 justify-start pl-10 lg:pl-16 gap-8 items-center">
          <Link
            href="/about"
            className="text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-brand-orange transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-sm shadow-md"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex-1 flex justify-end">
          <button className="p-2 text-brand-dark focus:outline-none">
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
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

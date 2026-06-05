import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-brand-dark overflow-hidden">
      <style>
      {`@keyframes heroFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.18;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(1.06);
  }
}

@keyframes heroReveal {
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}`}
      </style>
      {/* Subtle Industrial Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16 z-10">
        
        {/* Left Content Area: The Pitch */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-1 bg-brand-orange"></span>
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">
              Industrial Grade Precision
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Engineered for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">
              Unyielding
            </span> Performance.
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
            Heavy-duty, high-efficiency bandsaw machines built to dominate the toughest manufacturing environments. Maximum precision, minimal downtime.
          </p>
          
          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="#machines" 
              className="px-8 py-4 bg-transparent border border-brand-gray text-white font-bold rounded-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-orange hover:-translate-y-1 hover:bg-brand-orange/5"
            >
              Explore Our Machines
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-transparent border border-brand-gray text-white font-bold rounded-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-orange hover:-translate-y-1 hover:bg-brand-orange/5"
            >
              Request a Quote
            </Link>
          </div>

          {/* Quick Trust Metrics */}
          <div className="mt-12 pt-8 border-t border-brand-gray flex items-center gap-10 w-full">
            <div>
              <p className="text-4xl font-extrabold text-white">20<span className="text-brand-orange">+</span></p>
              <p className="text-sm text-gray-500 uppercase tracking-wide mt-1 font-semibold">Years Trusted</p>
            </div>
            <div className="w-px h-12 bg-brand-gray"></div>
            <div>
              <p className="text-4xl font-extrabold text-white">ISO</p>
              <p className="text-sm text-gray-500 uppercase tracking-wide mt-1 font-semibold">Certified Quality</p>
            </div>
          </div>
        </div>

        {/* Right Content Area: The Machine Image */}
        {/* Right Content Area: The Machine Image */}
<div
  className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
  style={{
    animation: "heroReveal 1s cubic-bezier(0.22,1,0.36,1) forwards",
  }}
>
  <div
    className="group relative w-full max-w-[720px]"
    style={{
      animation: "heroFloat 6s ease-in-out infinite",
    }}
  >
    {/* Animated ambient glow */}
    <div
      className="absolute -inset-8 rounded-full blur-3xl bg-brand-orange z-0"
      style={{
        animation: "glowPulse 4s ease-in-out infinite",
      }}
    />

    {/* Decorative border */}
    <div className="absolute -inset-3 border border-brand-orange/20 rounded-2xl z-0" />

    {/* Main image container */}
    <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.45)] border border-brand-gray bg-brand-dark transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:rotate-[0.5deg]">

      {/* Orange glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent z-10 pointer-events-none" />

      <Image
        src="/images/products/ACS machine.jpeg"
        alt="ACS Heavy-Duty Bandsaw Machine"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="
          object-cover
          object-center
          transition-all
          duration-1000
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-105
          relative
          z-10
        "
      />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-brand-orange/50 z-20" />

      {/* Bottom accent */}
      <div className="absolute bottom-4 left-4 w-16 h-1 bg-brand-orange z-20" />
    </div>
  </div>
</div>
        
      </div>
    </section>
  );
}
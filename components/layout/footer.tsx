import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white border-t-4 border-brand-orange pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column (Spans 4 columns) */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex flex-col items-start mb-6">
              <span className="text-4xl font-black text-brand-orange tracking-tighter leading-none mb-1">ACS</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">Accurate Cutting Systems</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
              Engineered for unyielding performance. We manufacture heavy-duty, industrial bandsaw machines built to dominate the toughest manufacturing environments. 
              <br/><br/>
              <span className="italic text-brand-orange">The Perfect Cut Always...</span>
            </p>
          </div>

          {/* Quick Links Column (Spans 3 columns) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Equipment</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#machines" className="hover:text-brand-orange transition-colors">Automatic Bandsaws</Link></li>
              <li><Link href="#machines" className="hover:text-brand-orange transition-colors">Semi-Automatic Bandsaws</Link></li>
              <li><Link href="#machines" className="hover:text-brand-orange transition-colors">Manual Bandsaws</Link></li>
              <li><Link href="/spare-parts" className="hover:text-brand-orange transition-colors">Blades & Spare Parts</Link></li>
            </ul>
          </div>

          {/* Contact Column (Spans 4 columns) */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Headquarters</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-brand-orange font-bold">📍</span>
                <span>Industrial Estate<br />Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-orange font-bold">📞</span>
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-orange font-bold">✉️</span>
                <span>sales@acsmachines.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-brand-gray flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Accurate Cutting Systems (ACS). All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
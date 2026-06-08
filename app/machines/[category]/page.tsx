import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { machinesDB } from "@/data/machines"; // Importing our new centralized database

export function generateStaticParams() {
  return [
    { category: 'double-column' },
    { category: 'vertical-column' },
    { category: 'circular-saw' },
  ];
}

export default async function MachineCategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category as keyof typeof machinesDB;
  
  const categoryData = machinesDB[categoryKey];

  // If the category doesn't exist in our DB, throw a 404
  if (!categoryData) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      
      {/* Premium Dark Header */}
      <section className="bg-brand-dark py-24 text-center relative overflow-hidden border-b-4 border-brand-orange">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">
            {categoryData.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase mb-6">
            {categoryData.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {categoryData.description}
          </p>
        </div>
      </section>

      {/* Horizontal Showcase Layout */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex-grow space-y-24">
        {categoryData.products.length > 0 ? (
          categoryData.products.map((machine, index) => (
            <div 
              key={machine.id} 
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              
              {/* Image Section */}
              <div className="w-full lg:w-5/12 relative group">
                <div className="relative aspect-[4/3] w-full bg-white border-2 border-gray-200 rounded-sm overflow-hidden shadow-lg group-hover:border-brand-orange transition-colors duration-500">
                  <div className="absolute top-4 left-4 z-10 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-md">
                    {machine.type}
                  </div>
                  <Image 
                    src={machine.image}
                    alt={machine.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Data & Features Section */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center">
                <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight mb-6">
                  {machine.name}
                </h2>
                
                <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-4 border-b border-gray-100 pb-2">
                    Standard Features & Specifications
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {machine.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <span className="text-brand-orange font-bold mt-0.5">✓</span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call To Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-brand-dark text-white text-sm font-bold uppercase tracking-widest text-center hover:bg-brand-orange transition-colors rounded-sm shadow-md"
                  >
                    Request Quote
                  </Link>
                  <button 
                    className="px-8 py-4 bg-transparent border-2 border-brand-dark text-brand-dark text-sm font-bold uppercase tracking-widest text-center hover:bg-brand-dark hover:text-white transition-colors rounded-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Brochure
                  </button>
                </div>
              </div>
              
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white border border-gray-200 rounded-sm">
            <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">Specifications Upcoming</h3>
            <p className="text-gray-500 mt-2">The engineering team is currently updating the catalog for {categoryData.title}.</p>
          </div>
        )}
      </section>
    </div>
  );
}
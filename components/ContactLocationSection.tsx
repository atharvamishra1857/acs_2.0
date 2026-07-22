"use client";

interface ContactLocationSectionProps {
  eyebrow?: string;
  heading?: string;
  phones?: string[];
  email?: string;
  address?: string;
  mapsUrl?: string;
  className?: string;
}

/**
 * "Visit Our Workshop" contact block — clean, no map, no emoji.
 * Three contact cards side by side on desktop, stacked on mobile.
 *
 * Usage:
 *   <ContactLocationSection
 *     address="Accurate Cutting Systems Pvt. Ltd., Koregaon Bhima, Pune, Maharashtra 412216"
 *     phones={["+91 20 26872522", "+91 9422308363"]}
 *     email="sales@acs.co.in"
 *     mapsUrl="https://maps.google.com/?q=Accurate+Cutting+Systems+Koregaon+Bhima"
 *   />
 */
export default function ContactLocationSection({
  eyebrow = "Get In Touch",
  heading = "Visit Our Workshop",
  phones = [],
  email,
  address,
  mapsUrl,
  className = "",
}: ContactLocationSectionProps) {
  return (
    <section className={`bg-brand-dark py-20 text-white ${className}`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            {eyebrow}
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            {heading}
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-brand-orange/40" />
        </div>

        {/* Three contact cards */}
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          {/* Phone */}
          {phones.length > 0 && (
            <div className="flex flex-col items-center gap-3 px-8 py-8 text-center sm:py-6">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Call Us
              </p>
              <div className="flex flex-col gap-1">
                {phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-base font-medium text-gray-200 transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          {email && (
            <div className="flex flex-col items-center gap-3 px-8 py-8 text-center sm:py-6">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Email Us
              </p>
              <a
                href={`mailto:${email}`}
                className="text-base font-medium text-gray-200 transition-colors hover:text-white"
              >
                {email}
              </a>
            </div>
          )}

          {/* Address */}
          {address && (
            <div className="flex flex-col items-center gap-3 px-8 py-8 text-center sm:py-6">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Workshop
              </p>
              <p className="max-w-[200px] text-base font-medium leading-relaxed text-gray-200">
                {address}
              </p>
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-none border border-brand-orange bg-brand-orange px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-brand-orange"
                >
                  Get Directions
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
"use client";

interface LocationMapProps {
  /** Full address or place name to look up on the map */
  address: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Height of the map in pixels */
  height?: number;
  /** Zoom level (1-20, higher = closer) */
  zoom?: number;
  /** Show the floating "Get Directions" button */
  showDirectionsButton?: boolean;
  className?: string;
}

/**
 * Reusable Google Maps embed. No API key required (uses the public
 * `/maps?output=embed` endpoint), so it drops straight into any page —
 * About, Contact, Locations, etc.
 *
 * Usage:
 *   <LocationMap address="Koregaon Bhima, Pune, Maharashtra" />
 */
export default function LocationMap({
  address,
  title = "Our Location",
  height = 420,
  zoom = 15,
  showDirectionsButton = true,
  className = "",
}: LocationMapProps) {
  const query = encodeURIComponent(address);
  const embedSrc = `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-brand-gray/30 shadow-xl ${className}`}
      style={{ height }}
    >
      <iframe
        src={embedSrc}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {showDirectionsButton && (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-sm bg-brand-orange px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-brand-dark"
        >
          Get Directions
          <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}
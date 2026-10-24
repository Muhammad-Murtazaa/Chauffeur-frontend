import React from 'react';

export default function FloatingWhatsApp() {
  const phoneNumber = '13478889797';
  const message = encodeURIComponent('Hi! I would like to inquire about booking a chauffeur service.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-20 md:bottom-6 right-5 md:right-6 z-40 flex items-center group">
      {/* Tooltip / Label visible on desktop hover */}
      <div className="hidden sm:flex items-center mr-3 px-3.5 py-1.5 rounded-full bg-[#0B1219]/95 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
        Chat on WhatsApp
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing online badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0B1219]"></span>
        </span>

        {/* WhatsApp Official SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-current"
          aria-hidden="true"
        >
          <path d="M16.01 2.002c-7.72 0-14 6.28-14 14 0 2.47.64 4.88 1.86 7.01L2 30l7.21-1.84c2.06 1.12 4.38 1.72 6.8 1.72 7.72 0 14-6.28 14-14s-6.28-13.878-14-13.878zm0 25.598c-2.18 0-4.32-.59-6.18-1.7l-.44-.26-4.59 1.17 1.23-4.47-.29-.46c-1.22-1.95-1.87-4.22-1.87-6.55 0-6.69 5.45-12.14 12.14-12.14 6.69 0 12.14 5.45 12.14 12.14s-5.45 12.27-12.13 12.27zm6.65-9.08c-.36-.18-2.15-1.06-2.48-1.18-.33-.12-.58-.18-.82.18-.24.36-.94 1.18-1.15 1.42-.21.24-.43.27-.8.09-.36-.18-1.54-.57-2.93-1.81-1.08-.97-1.81-2.16-2.03-2.52-.21-.36-.02-.56.16-.74.16-.16.36-.43.55-.64.18-.21.24-.36.36-.61.12-.24.06-.46-.03-.64-.09-.18-.82-1.98-1.12-2.71-.3-.72-.6-.62-.82-.63l-.7-.01c-.24 0-.64.09-.97.46-.33.36-1.28 1.25-1.28 3.05s1.31 3.54 1.49 3.78c.18.24 2.58 3.94 6.25 5.52.87.38 1.55.6 2.08.77.88.28 1.68.24 2.31.15.71-.11 2.15-.88 2.45-1.73.3-.85.3-1.58.21-1.73-.09-.15-.33-.24-.69-.42z" />
        </svg>
      </a>
    </aside>
  );
}

import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MobileStickyBar() {
  const navigate = useNavigate();
  const { promptInstantQuote } = useAuth();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B1219]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center gap-3 shadow-2xl">
      <a
        href="tel:+13478889797"
        className="flex-1 flex items-center justify-center gap-2 bg-[#1A222D] hover:bg-[#253243] text-white py-3 px-4 rounded-full text-sm font-bold border border-white/20 transition"
      >
        <Phone className="w-4 h-4 text-gold" />
        <span>(347) 888-9797</span>
      </a>
      <button
        type="button"
        onClick={() => promptInstantQuote(navigate, '/reservations')}
        className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-black py-3 px-4 rounded-full text-sm font-bold shadow-lg shadow-gold/20 transition"
      >
        <CalendarCheck className="w-4 h-4" />
        <span>Instant Quote</span>
      </button>
    </div>
  );
}

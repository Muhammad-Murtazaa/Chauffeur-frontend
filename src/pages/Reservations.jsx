import React from 'react';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';

export default function Reservations() {
  return (
    <div className="bg-[#060B10] text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-8 animate-in fade-in duration-300">
          <QuoteBookingWidget initialService="one-way" referenceFlow />

          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0E1722] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold"><ShieldCheck className="h-5 w-5" /></div>
              <div><div className="text-xs font-bold text-white">Guaranteed Flat Rates</div><div className="text-[11px] text-neutral-400">Tolls, taxes, and gratuity included.</div></div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0E1722] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold"><Clock className="h-5 w-5" /></div>
              <div><div className="text-xs font-bold text-white">24/7 Live Dispatch</div><div className="text-[11px] text-neutral-400">Someone always answers the phone.</div></div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0E1722] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold"><Sparkles className="h-5 w-5" /></div>
              <div><div className="text-xs font-bold text-white">Pre-Trip Detailing</div><div className="text-[11px] text-neutral-400">Immaculate late-model vehicles.</div></div>
            </div>
          </div>
        </div>
      </section>
      <ReviewsSection />
    </div>
  );
}

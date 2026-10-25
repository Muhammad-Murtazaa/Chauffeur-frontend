import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Phone, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export default function Reservations() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Online Reservations"
        title="Reservations – Book Your Luxury Ride Today"
        subtitle="Reserve your luxury chauffeur in NYC now. Get an instant quote with all-inclusive flat pricing and instant confirmation."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/Corporate-Limo.jpg"
        breadcrumbs={[{ name: "Reservations" }]}
      />

      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 bg-[#0E1722] rounded-2xl border border-white/10 mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Direct Platform Booking • Instant Confirmation</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
            <span>Need 24/7 Dispatch?</span>
            <a href="tel:+13478889797" className="text-gold font-bold hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              (347) 888-9797
            </a>
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in duration-300">
          <QuoteBookingWidget initialService="one-way" />

          {/* Quick Guarantees Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#0E1722] border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Guaranteed Flat Rates</div>
                <div className="text-[11px] text-neutral-400">Tolls, taxes, and gratuity included.</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1722] border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">24/7 Live Dispatch</div>
                <div className="text-[11px] text-neutral-400">Someone always answers the phone.</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1722] border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Pre-Trip Detailing</div>
                <div className="text-[11px] text-neutral-400">Immaculate late-model vehicles.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

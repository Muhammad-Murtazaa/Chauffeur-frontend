import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Phone, Mail, ShieldCheck, Clock, ExternalLink, Sparkles } from 'lucide-react';

export default function Reservations() {
  const [activeTab, setActiveTab] = useState('instant-quote'); // 'instant-quote' or 'loginla-portal'

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Online Reservations"
        title="Reservations – Book Your Luxury Ride Today"
        subtitle="Reserve your luxury chauffeur in NYC now. Get an instant quote with all-inclusive flat pricing, or book directly through our reservation system."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/Corporate-Limo.jpg"
        breadcrumbs={[{ name: "Reservations" }]}
      />

      {/* Reservation Mode Switcher */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-[#0E1722] rounded-2xl border border-white/10 mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('instant-quote')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-xs tracking-wide transition ${
                activeTab === 'instant-quote'
                  ? 'bg-gold text-black shadow-lg shadow-gold/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Instant Quote & Quick Reservation
            </button>
            <button
              onClick={() => setActiveTab('loginla-portal')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 ${
                activeTab === 'loginla-portal'
                  ? 'bg-gold text-black shadow-lg shadow-gold/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>LimoAnywhere Booking Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span>Need Dispatch?</span>
            <a href="tel:+13478889797" className="text-gold font-bold hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              (347) 888-9797
            </a>
          </div>
        </div>

        {/* Tab 1: Interactive Native Calculator */}
        {activeTab === 'instant-quote' && (
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
        )}

        {/* Tab 2: Embedded LoginLA LimoAnywhere Portal */}
        {activeTab === 'loginla-portal' && (
          <div className="bg-[#0E1722] rounded-3xl border border-gold/30 p-4 sm:p-6 shadow-2xl animate-in fade-in duration-300">
            <div className="mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Official Reservation Booking Engine
                </h3>
                <p className="text-xs text-neutral-400">
                  Live corporate scheduling system for NYC Premier Chauffeur.
                </p>
              </div>
              <a
                href="https://member.loginla.com/quick/company/NPL"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
              >
                Open in Full Window ↗
              </a>
            </div>

            <div className="w-full rounded-2xl overflow-hidden bg-white shadow-inner min-h-[680px]">
              <iframe
                title="LimoAnywhere Online Reservation"
                src="https://member.loginla.com/quick/company/NPL"
                className="w-full h-[700px] border-none"
              />
            </div>
          </div>
        )}
      </section>

      <ReviewsSection />
    </div>
  );
}

import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Plane, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function LgaService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="LaGuardia Airport"
        title="LGA Airport Chauffeur Service"
        subtitle="The fastest, most comfortable executive transfer between LaGuardia Airport (Terminals A, B, C) and Manhattan, Westchester, or Connecticut."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image.png"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Airport Car Service", link: "/airport-car-service" },
          { name: "LGA Airport Chauffeur" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Queens · Terminals A, B & C
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Quickest Route from Runway to Midtown Manhattan
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                LaGuardia is situated just 8 miles from Midtown Manhattan. Following its multi-billion dollar redesign, LGA features state-of-the-art arrivals facilities. Our chauffeurs utilize real-time Grand Central Parkway and Triborough / RFK Bridge traffic telemetry to navigate around congestion, delivering you to your hotel or boardroom in under 30 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Terminal B & C Pickup App Integration", desc: "Coordinated curbside loading at the newly renovated arrival gates." },
                { title: "Under 30 Min to Midtown", desc: "Optimal routing across the RFK Bridge and Queensboro Bridge." },
                { title: "60-Min Flight Delay Grace", desc: "No penalty fees if your incoming shuttle or flight is delayed." },
                { title: "Executive Fleet Selection", desc: "Luxury Sedans, SUVs, and high-roof Sprinters for teams." }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#0E1722] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-gold text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-neutral-400 pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <QuoteBookingWidget initialService="one-way" compact={true} />
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import FaqAccordion from '../components/FaqAccordion';
import { Plane, Clock, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function JfkService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="JFK International Airport"
        title="JFK Airport Chauffeur Service"
        subtitle="Private luxury chauffeur transfers to and from John F. Kennedy International Airport (Queens, NY). Live radar tracking across Terminals 1, 4, 5, 7, and 8."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/jfk-airport-limo-service-terminal-pickup-hero.webp"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Airport Car Service", link: "/airport-car-service" },
          { name: "JFK Airport Chauffeur" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Queens · Terminals 1 through 8
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Seamless International & Domestic JFK Transfers
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                JFK is the busiest international gateway in North America. Navigating customs, baggage claim, and airport exit traffic requires precision. Our dispatch monitors incoming transatlantic and domestic flights in real time. We stage your vehicle in the airport staging area so your chauffeur arrives at the pickup curb within minutes of you clearing customs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0E1722] border border-gold/30 space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">
                How JFK Pickups Work
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                  <p><strong>Flight Touchdown:</strong> We track your wheels-down time. You receive an automated text confirming your chauffeur is on site.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                  <p><strong>Complimentary Grace Period:</strong> 60 minutes for domestic arrivals, 90 minutes for international customs clearance.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div>
                  <p><strong>Curbside or Baggage Claim:</strong> Opt for convenient curbside passenger pickup or inside Meet & Greet with personalized name sign.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "All 8 JFK Terminals Serviced",
                "Fixed Flat Rates to Manhattan, Brooklyn & Long Island",
                "Late-Model Mercedes S-Class & Cadillac Escalades",
                "Flight Delay Protection — No Extra Charge",
                "Child Safety Seats Provided Upon Request",
                "Spacious Luggage Room for Overseas Baggage"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300 bg-[#0E1722] p-3.5 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{item}</span>
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

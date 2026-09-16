import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Plane, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function EwrService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Newark Liberty International"
        title="EWR Airport Chauffeur Service"
        subtitle="Cross-Hudson executive car service to and from Newark Liberty Airport (Terminals A, B, C). Direct transfers connecting New Jersey, Manhattan, and Westchester."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/third-section-image.png"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Airport Car Service", link: "/airport-car-service" },
          { name: "EWR Airport Chauffeur" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                New Jersey · Terminals A, B & C
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Stress-Free Cross-Hudson Airport Transfers
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Traveling between Newark Airport and New York City requires experienced navigation through the Lincoln Tunnel, Holland Tunnel, or George Washington Bridge. Our veteran chauffeurs know how to bypass Hudson River choke points, ensuring dependable arrival times for departing and arriving passengers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "New Terminal A Pickup Specialists", desc: "Smooth navigation at Newark's award-winning new passenger terminal." },
                { title: "Fixed Cross-Hudson Rates", desc: "All Port Authority tolls, New Jersey turnpike tolls, and tips included." },
                { title: "Live Radar Flight Synchronization", desc: "Pickup time automatically adjusts when your flight touches down." },
                { title: "Manhattan & Tri-State Connections", desc: "Direct rides to Wall Street, Midtown, Brooklyn, and Connecticut." }
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

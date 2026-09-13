import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Plane, CheckCircle2 } from 'lucide-react';

export default function QueensService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Queens Borough"
        title="Queens Limo & Airport Car Service"
        subtitle="Home to JFK and LaGuardia airports, Citi Field, and the USTA Tennis Center. Reliable airport transfers and private chauffeured service across Queens."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/queens-limo-airport-transfers-band.webp"
        breadcrumbs={[
          { name: "Areas We Serve", link: "/areas-we-serve" },
          { name: "Queens Limo Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Queens County Coverage
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Connecting Queens, JFK, LGA & Long Island
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                As the hub of New York aviation and major sporting events, Queens demands punctual, reliable car service. From Long Island City's high-rises to residential neighborhoods in Astoria, Forest Hills, and Bayside, we provide flat-rate luxury rides that bypass common bottlenecks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "JFK & LGA Airport Shuttles", desc: "Door-to-door flight transfers with live FAA tracking." },
                { title: "Citi Field & U.S. Open Tennis", desc: "VIP stadium drop-off and pickup avoiding parking gridlock." },
                { title: "Long Island City Waterfront", desc: "Direct 10-minute transfers into Midtown Manhattan via Queensboro Bridge." },
                { title: "Forest Hills & Bayside", desc: "Private executive sedans and SUVs for family and corporate travel." }
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

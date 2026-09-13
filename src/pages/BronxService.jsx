import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { CheckCircle2 } from 'lucide-react';

export default function BronxService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="The Bronx Borough"
        title="The Bronx Limo Service"
        subtitle="Executive car service and limousine charters throughout The Bronx. Yankee Stadium game day rides, Riverdale private transport, and routes toward Westchester."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/bronx-limo-service-expressway.webp"
        breadcrumbs={[
          { name: "Areas We Serve", link: "/areas-we-serve" },
          { name: "The Bronx Limo Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Bronx County Coverage
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Punctual Chauffeur Service in The Bronx
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                From Yankee Stadium celebrations to peaceful estates in Riverdale and Fieldston, our chauffeurs navigate the Major Deegan, Cross Bronx, and Bruckner Expressways with precision. We also provide direct connections north to Westchester County and Connecticut.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Yankee Stadium Game Day Transport", desc: "Arrive right at the gate with zero parking congestion." },
                { title: "Riverdale & Pelham Bay Estates", desc: "Quiet luxury sedans and executive SUVs for residential pickups." },
                { title: "Airport Transfers to LGA, JFK & EWR", desc: "Flat-rate bridge and expressway routing timed to flights." },
                { title: "New York Botanical Garden & Zoo", desc: "Private group charters and Sprinters for family outings." }
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

import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { MapPin, CheckCircle2 } from 'lucide-react';

export default function BrooklynService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Brooklyn Borough"
        title="Brooklyn Limo & Chauffeur Service"
        subtitle="Premier chauffeured rides in Brooklyn. DUMBO, Brooklyn Heights, Williamsburg, Park Slope, and VIP transport to Barclays Center events."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/brooklyn-limo-brooklyn-bridge-dumbo.webp"
        breadcrumbs={[
          { name: "Areas We Serve", link: "/areas-we-serve" },
          { name: "Brooklyn Limo Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Brooklyn & Kings County
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Luxury Travel Across Kings County
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Brooklyn has transformed into an epicenter of arts, fine dining, technology, and luxury living. Whether traveling to a concert or Brooklyn Nets game at Barclays Center, a rooftop wedding at the 1 Hotel Brooklyn Bridge, or an executive meeting in Downtown Brooklyn, our chauffeurs ensure a smooth ride across the Manhattan and Brooklyn bridges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Barclays Center VIP Access", desc: "No parking hassles for concertgoers and sports fans." },
                { title: "DUMBO & Brooklyn Heights", desc: "Scenic waterfront rides with Manhattan skyline views." },
                { title: "Williamsburg & Greenpoint", desc: "Nightlife, dining, and boutique hotel guest transport." },
                { title: "Airport Transfers to JFK & LGA", desc: "Direct highway routing via the Belt Parkway and BQE." }
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

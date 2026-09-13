import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { CheckCircle2 } from 'lucide-react';

export default function StatenIslandService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Staten Island Borough"
        title="Staten Island Limo Service"
        subtitle="Private luxury car service across Staten Island. Direct bridge transfers over the Verrazzano, Goethals, and Bayonne bridges to Manhattan, Brooklyn, and Newark Airport."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image-jfk-section-image.png"
        breadcrumbs={[
          { name: "Areas We Serve", link: "/areas-we-serve" },
          { name: "Staten Island Limo" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Richmond County Coverage
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Seamless Staten Island Bridge Connections
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Staten Island residents and visitors often face bridge congestion when seeking airport rides or city evenings. Our experienced chauffeurs utilize automated toll lanes, live traffic updates, and bridge route optimization to provide reliable travel to Manhattan, Brooklyn, and all tri-state airports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Verrazzano Bridge to Brooklyn & JFK", desc: "Smooth transit connecting Staten Island with South Brooklyn and JFK." },
                { title: "Direct Newark Airport (EWR) Transfers", desc: "Short, flat-rate rides across the Goethals or Bayonne Bridges." },
                { title: "Todt Hill & Lighthouse Hill Estates", desc: "Discreet residential chauffeured pickups for business and travel." },
                { title: "All Tolls & Port Authority Fees Included", desc: "Zero surprise bridge tolls on your final invoice." }
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

import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Building2, CheckCircle2, MapPin } from 'lucide-react';

export default function ManhattanService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Manhattan Borough"
        title="Manhattan Limo & Chauffeur Service"
        subtitle="The gold standard in Manhattan private executive travel. Financial District, Midtown, Central Park, Hudson Yards, and Broadway theater districts."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-times-square.webp"
        breadcrumbs={[
          { name: "Areas We Serve", link: "/areas-we-serve" },
          { name: "Manhattan Limo Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Premier Manhattan Transportation
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Navigating Manhattan with Precision & Discretion
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Manhattan's dense avenues and unexpected street closures demand chauffeurs who know every side street, tunnel approach, and hotel porte-cochère. Whether you are heading to a financial presentation on Wall Street, a Broadway curtain call at 7:30 PM, or dining in Tribeca, NYC Premier Limo ensures you arrive relaxed and on schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Wall St & Financial District", desc: "Discreet executive transfers to investment banks and trading firms." },
                { title: "Midtown & Grand Central", desc: "Fast crosstown routing connecting hotels, offices, and train hubs." },
                { title: "Hudson Yards & Javits Center", desc: "Convention shuttles and luxury penthouse departures." },
                { title: "Upper East & Upper West Side", desc: "Private residential transfers with curbside white-glove luggage service." }
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

import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Sparkles, CheckCircle2, Compass } from 'lucide-react';

export default function WineryService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Wine Country Escapes"
        title="Winery Tour Chauffeur Service"
        subtitle="Curated private wine tours to Long Island's North Fork and Hudson Valley vineyards. Sit back, sample world-class wines, and leave the driving to us."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/winery-tour-chauffeur-waiting-vineyard-terrace.webp"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Special Occasions", link: "/special-occasions" },
          { name: "Winery Tour Chauffeur Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                North Fork & Hudson Valley
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Relax in Luxury Across New York Wine Country
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                A day trip out to the vineyards should be an indulgent escape, not a hassle of designating drivers and coordinating parking. We provide day-long hourly charters from NYC, Brooklyn, or Queens straight to top estates in Jamesport, Cutchogue, Greenport, or Warwick Valley.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Custom Vineyard Itineraries", desc: "Visit 2 to 4 wineries at your group's preferred pacing." },
                { title: "Climate-Controlled Wine Storage", desc: "Plenty of room in our SUVs and Sprinters to transport your purchased cases." },
                { title: "Safe Designated Driving", desc: "Indulge in wine tastings knowing your professional chauffeur handles the road." },
                { title: "Full-Day Luxury Packages", desc: "8-hour to 12-hour charters matching tasting room schedules." }
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
            <QuoteBookingWidget initialService="hourly" compact={true} />
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

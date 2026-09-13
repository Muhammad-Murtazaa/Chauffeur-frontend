import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CityToCityService() {
  const routes = [
    { from: "NYC", to: "The Hamptons & Montauk", time: "Approx. 2.5 hrs", desc: "Door-to-door summer weekend transfers with plenty of luggage room for beach gear." },
    { from: "NYC", to: "Philadelphia, PA", time: "Approx. 2 hrs", desc: "Direct executive travel between Manhattan corporate offices and Center City Philadelphia." },
    { from: "NYC", to: "Boston, MA", time: "Approx. 4 hrs", desc: "Skip regional airline delays and train station crowds with a private executive Sprinter or Sedan." },
    { from: "NYC", to: "Washington D.C.", time: "Approx. 4.5 hrs", desc: "Comfortable long-haul executive journey with continuous Wi-Fi and mobile office comfort." },
    { from: "NYC", to: "Greenwich / Stamford, CT", time: "Approx. 1 hr", desc: "Executive corridor commuting for hedge funds, private equity firms, and corporate headquarters." },
    { from: "NYC", to: "Atlantic City, NJ", time: "Approx. 2.5 hrs", desc: "VIP round-trip casino and resort transportation for groups and celebrations." }
  ];

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Long-Distance Travel"
        title="City-to-City Long Distance Chauffeur"
        subtitle="Private long-distance door-to-door transportation from New York City to Boston, Philadelphia, Washington D.C., The Hamptons, and destinations across the Northeast."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/City-To-City-Rides-1024x683.jpg"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "City to City Rides" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Regional Luxury
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                The Superior Alternative to Crowded Regional Trains & Flights
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Why endure crowded security checkpoints at airports or delays at Penn Station? Our city-to-city service picks you up directly at your home or office on your schedule. You can work without interruption, conduct calls in complete privacy, and rest in leather-reclined comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {routes.map((rt, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#0E1722] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">{rt.from} → {rt.to}</span>
                    <span className="text-[11px] text-neutral-400">{rt.time}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {rt.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-3">
              <h3 className="font-serif text-lg font-bold text-white">
                Long-Distance Trip Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Unlimited custom rest stops upon request</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Continuous high-speed onboard Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Refreshments & bottled spring water</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>All interstate tolls and gratuity included</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <QuoteBookingWidget initialService="city-to-city" compact={true} />
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

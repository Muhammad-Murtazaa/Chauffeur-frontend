import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Compass, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function PointToPointService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Direct Transfers"
        title="Point-to-Point Chauffeur Service"
        subtitle="One pickup, one destination, and one fixed all-inclusive rate confirmed before you depart. Direct rides between residences, offices, restaurants, and venues."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/point-to-point-car-service-soho-passenger-pickup-1024x683.webp"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Point to Point" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Guaranteed Flat Pricing
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Direct Chauffeured Rides with Zero Surge
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                App-based rideshares fluctuate wildly during rush hours, rainstorms, and events. With NYC Premier Chauffeur's point-to-point transfer, the rate you are quoted is the exact rate you pay. Tolls, taxes, and driver gratuity are included upfront.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "No Meter or Surge Pricing", desc: "Your flat rate is locked in when you confirm your reservation." },
                { title: "Door-to-Door Service", desc: "Chauffeur assists with luggage directly at your lobby or curb." },
                { title: "Live Traffic Optimization", desc: "Drivers select the quickest routes through the five boroughs." },
                { title: "Luxury Vehicles Only", desc: "All late-model executive sedans, SUVs, and Sprinters." }
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

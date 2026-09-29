import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PromService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Prom Transportation"
        title="Prom Chauffeur & Party Sprinter Service"
        subtitle="Unforgettable arrivals for high school juniors and seniors. Executive vehicles and Mercedes Sprinters with vetted chauffeurs parents trust."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/prom-limousine-nyc-photo-stop-waterfront.webp"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Special Occasions", link: "/special-occasions" },
          { name: "Prom Chauffeur Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Safety First, Glamour Included
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                An Iconic High School Prom Night Experience
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Prom night is a landmark celebration. We provide students with club-level sound systems, starlight fiber optic lighting, and photo stop coordination at scenic New York viewpoints — while giving parents absolute peace of mind with vetted, alcohol-free, licensed professional chauffeurs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Parent Peace of Mind", desc: "Zero tolerance alcohol/substance policy and vetted chauffeurs." },
                { title: "Iconic Waterfront Photo Stops", desc: "Coordinated stops at DUMBO, Brooklyn Bridge Park, or Weehawken." },
                { title: "Club-Style Sound & Lighting", desc: "Bluetooth audio systems, subwoofers, and LED starlight ceilings." },
                { title: "Group Capacities up to 14 Pax", desc: "Custom executive vehicles and luxury Mercedes party sprinters." }
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

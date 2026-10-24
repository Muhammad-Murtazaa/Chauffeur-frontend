import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function BirthdayService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Celebrate in Style"
        title="Birthday & Milestone Chauffeur Service"
        subtitle="Celebrate milestone birthdays, sweet 16s, quinces, bachelor & bachelorette parties, and anniversaries with NYC Premier Chauffeur."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-sprinter-limo-party-van-nyc.png"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Special Occasions", link: "/special-occasions" },
          { name: "Birthday Chauffeur Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                VIP Night Out
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Turn the Journey into the Main Event
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Whether organizing a 21st, 30th, 40th, or 50th birthday celebration, our luxury SUVs and VIP party sprinters keep the entire group together. Enjoy crystal barware, mood lighting, custom music playlists, and door-to-door VIP arrivals at NYC's hottest restaurants and rooftop clubs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "VIP Nightclub & Dining Arrivals", desc: "No parking headaches or waiting in the cold for cabs." },
                { title: "Onboard Bar Service Area", desc: "Ice buckets, glassware, and cup holders ready for your refreshments." },
                { title: "State-of-the-Art Sound", desc: "Connect your phone directly via Bluetooth to play your birthday mix." },
                { title: "Multi-Stop Nightlife Itineraries", desc: "Dinner in Meatpacking, drinks in Soho, and dancing in Williamsburg." }
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

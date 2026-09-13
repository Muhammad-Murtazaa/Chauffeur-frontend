import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { HeartHandshake, CheckCircle2, Phone, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WeddingService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Wedding Transportation"
        title="Wedding Limo & Bridal Party Service"
        subtitle="Unforgettable arrivals on your special day. White-glove wedding limousines, bridal party Sprinters, and seamless guest shuttle buses across New York City and Long Island."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image-jfk-section-image.png"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Special Occasions", link: "/special-occasions" },
          { name: "Wedding Limo Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Punctual Elegance
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Flawless Coordination for the Bride, Groom & Guests
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Your wedding day is one of the most important milestones of your life. Every detail matters — especially getting the bridal party to the church on time and ensuring guests travel safely between ceremony and reception. Our wedding coordinators work alongside your wedding planner to build a seamless timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Red Carpet Rollout", desc: "VIP red carpet service upon arrival at your ceremony and venue." },
                { title: "Complimentary Champagne Toast", desc: "Chilled flutes and ice bucket ready for the newly married couple." },
                { title: "Bridal Party Sprinter Coaches", desc: "Spacious enough for ballgowns without wrinkling bridal dresses." },
                { title: "Hotel Guest Shuttles", desc: "Scheduled continuous loops between guest hotels and reception venues." },
                { title: "Waterfront & Central Park Photo Stops", desc: "Chauffeur coordinates with your photographer for scenic backdrop shoots." },
                { title: "Getaway Car Service", desc: "Late-night luxury sedan departure for the bride and groom after reception." }
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

            <div className="p-6 rounded-3xl bg-[#0E1722] border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Speak to Our Wedding Transport Specialist
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Custom multi-vehicle packages available for venues across NY, NJ & CT.
                </p>
              </div>
              <a
                href="tel:+13478889797"
                className="bg-gold hover:bg-gold-hover text-black px-6 py-2.5 rounded-full text-xs font-bold shrink-0 transition"
              >
                (347) 888-9797
              </a>
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

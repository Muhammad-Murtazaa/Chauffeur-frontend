import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import FaqAccordion from '../components/FaqAccordion';
import { Clock, CheckCircle2, ShieldCheck, MapPin, CalendarCheck } from 'lucide-react';

export default function HourlyService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Hourly Chauffeur Service"
        title="By-The-Hour Car Service in NYC"
        subtitle="Reserve a luxury vehicle and professional chauffeur for as many hours as your schedule requires. Unlimited stops, vehicle on continuous standby, zero waiting."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/Hourly-Car-Service.jpg"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Hourly Car Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Maximum Flexibility
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                One Vehicle. One Dedicated Chauffeur. All Day Long.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                When your daily itinerary is dynamic — back-to-back corporate presentations, Manhattan shopping, multi-venue private dining, or investor meetings across town — trying to hail rides between stops wastes valuable time and energy. With our hourly chauffeur charter, your car remains parked at curbside, waiting for you to step outside.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Unlimited Stops", desc: "Change your route or add stops on the fly with no paperwork." },
                { title: "Dedicated On-Call Standby", desc: "Your chauffeur stays with the vehicle ready to depart on a moment's notice." },
                { title: "Secure Cabin Storage", desc: "Leave briefcases, shopping bags, and luggage securely inside." },
                { title: "2-Hour Minimums Available", desc: "Book short blocks or full 24-hour executive multi-day itineraries." }
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

            <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-3">
              <h3 className="font-serif text-xl font-bold text-white">
                Ideal For:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  <span>Financial Roadshows & Client Meetings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  <span>5th Avenue & Soho Luxury Shopping Excursions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  <span>Private Real Estate Tours & Property Showings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  <span>Broadway Shows, Concerts & Gala Evenings</span>
                </li>
              </ul>
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

import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import FaqAccordion from '../components/FaqAccordion';
import { Link } from 'react-router-dom';
import { Plane, CheckCircle2, Clock, ShieldCheck, ChevronRight, Phone } from 'lucide-react';

export default function AirportService() {
  const airports = [
    {
      code: "JFK",
      name: "John F. Kennedy International Airport",
      location: "Queens, NY · Terminals 1–8",
      desc: "Our primary international hub service. International arrivals receive 90 minutes of complimentary wait time with FAA radar flight synchronization.",
      link: "/jfk-airport-limo-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/jfk-airport-limo-service-terminal-pickup-hero.webp"
    },
    {
      code: "LGA",
      name: "LaGuardia Airport",
      location: "Queens, NY · Terminals A, B, C",
      desc: "Closest to Midtown Manhattan. Curbside pickup or inside meet & greet timed precisely to domestic commercial landings.",
      link: "/lga-airport-limo-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image.png"
    },
    {
      code: "EWR",
      name: "Newark Liberty International Airport",
      location: "Newark, NJ · Terminals A, B, C",
      desc: "Cross-Hudson private airport transfers avoiding Lincoln & Holland Tunnel bottlenecks via optimal dispatch routing.",
      link: "/ewr-airport-limo-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/third-section-image.png"
    }
  ];

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Airport Transfers"
        title="NYC Airport Car & Chauffeur Service"
        subtitle="Private transfers to JFK, LaGuardia, Newark Liberty, and regional private FBOs. Live flight radar tracking, curbside or inside meet & greet, and flat all-inclusive rates."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/jfk-airport-limo-service-terminal-pickup-hero.webp"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Airport Car Service" }
        ]}
      />

      {/* Main Content & Calculator */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Predictable Luxury
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Never Wait on an Airport Curb Again
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                Navigating New York airports can be exhausting after a long flight. With NYC Premier Chauffeur, your chauffeur tracks your incoming flight directly via FAA radar. If you arrive early or get delayed on the tarmac, your scheduled pickup adjusts automatically with zero penalties.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Live Flight Tracking", desc: "Automated adjustments based on real landing times." },
                { title: "Complimentary Wait Time", desc: "60 mins domestic, 90 mins international after touchdown." },
                { title: "Terminal Meet & Greet", desc: "Chauffeur waiting at baggage claim with your name sign." },
                { title: "All-Inclusive Pricing", desc: "Tolls, fuel, and gratuity included upfront." },
                { title: "Luggage Assistance", desc: "Door-to-door heavy luggage handling at both ends." },
                { title: "Tri-State Transfers", desc: "Direct rides to Manhattan, Brooklyn, Hamptons & NJ." }
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

            {/* Airport Hubs List */}
            <div className="pt-4 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">
                Major NYC Airports We Service
              </h3>
              <div className="space-y-4">
                {airports.map(ap => (
                  <Link
                    key={ap.code}
                    to={ap.link}
                    className="block p-5 rounded-2xl bg-[#0E1722] border border-white/10 hover:border-gold/50 transition group"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-xl font-bold text-gold">{ap.code}</span>
                          <span className="text-xs text-neutral-400 font-medium">· {ap.location}</span>
                        </div>
                        <h4 className="text-base font-semibold text-white mt-1">
                          {ap.name}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                          {ap.desc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gold group-hover:text-gold-hover shrink-0">
                        View Airport Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Booking Widget */}
          <div className="lg:col-span-5 sticky top-28">
            <QuoteBookingWidget initialService="one-way" compact={true} />
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="py-20 max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-white text-center mb-8">
          Airport Transportation FAQ
        </h2>
        <FaqAccordion />
      </section>
    </div>
  );
}

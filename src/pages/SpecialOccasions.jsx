import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SpecialOccasions() {
  const occasions = [
    {
      title: "Wedding Chauffeur Service",
      desc: "Impeccable bridal party transportation, luxury executive vehicles, luxury SUV motorcades, and guest hotel transfers.",
      link: "/wedding-limo-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image-jfk-section-image.png"
    },
    {
      title: "Prom Chauffeur Service",
      desc: "Safe, unforgettable high school prom transportation with licensed professional chauffeurs that parents trust completely.",
      link: "/prom-limousine-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/09/prom-limousine-nyc-photo-stop-waterfront.webp"
    },
    {
      title: "Birthday & Milestone Celebrations",
      desc: "Arrive in style for birthday parties, sweet 16s, anniversaries, bachelor/bachelorette weekends, and nights out.",
      link: "/birthday-limo-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-sprinter-limo-party-van-nyc.png"
    },
    {
      title: "Winery Tour Chauffeur Service",
      desc: "Curated day trips to Long Island North Fork vineyards and Hudson Valley wineries with a dedicated chauffeur and wine storage.",
      link: "/winery-tour-limo-service",
      image: "https://nycpremierlimo.com/wp-content/uploads/2026/09/winery-tour-chauffeur-waiting-vineyard-terrace.webp"
    }
  ];

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Celebrate in Luxury"
        title="Special Occasions & Milestone Events"
        subtitle="Make your arrivals memorable. VIP party sprinters, luxury SUVs, and executive sedans for weddings, proms, anniversaries, and private tours."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/winery-tour-chauffeur-waiting-vineyard-terrace.webp"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Special Occasions" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {occasions.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0E1722] rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-gold/50 transition group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1722] via-transparent to-black/30" />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={item.link}
                    className="text-xs font-bold text-gold hover:text-gold-hover transition flex items-center gap-1.5"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/reservations"
                    className="bg-gold text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-gold-hover transition"
                  >
                    Check Availability
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl font-bold text-white">
            Custom Event Transportation Planning
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Planning a multi-car wedding motorcade or large convention transfers? Speak directly with our events dispatch manager to design a customized itinerary with vehicle staging and dedicated on-site dispatchers.
          </p>
          <a
            href="tel:+13478889797"
            className="inline-flex items-center gap-2 bg-gold text-black font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-gold/20 hover:bg-gold-hover transition"
          >
            Call Event Dispatch: (347) 888-9797
          </a>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

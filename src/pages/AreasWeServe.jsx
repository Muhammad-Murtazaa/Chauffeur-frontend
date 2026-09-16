import React from 'react';
import PageHero from '../components/PageHero';
import ReviewsSection from '../components/ReviewsSection';
import { areasData } from '../data/areasData';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, Phone, CalendarCheck } from 'lucide-react';

export default function AreasWeServe() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Tri-State Coverage"
        title="Chauffeur Service in the 5 Boroughs & Tri-State"
        subtitle="Private chauffeur and luxury car service across New York City (Manhattan, Brooklyn, Queens, The Bronx, Staten Island), Long Island, Westchester, New Jersey, and Connecticut."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-times-square.webp"
        breadcrumbs={[{ name: "Areas We Serve" }]}
      />

      {/* Boroughs Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-gold">
            NYC Metropolitan Area
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            One Chauffeur Service for City Streets, Airports & Beyond
          </h2>
          <p className="text-sm text-neutral-400">
            Select your borough or region below to view neighborhood coverage, airport travel times, and dedicated local fleet options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areasData.map(area => (
            <div
              key={area.id}
              className="bg-[#0E1722] rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-gold/50 transition group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1722] via-transparent to-black/40" />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition">
                      {area.name}
                    </h3>
                    <div className="text-xs text-neutral-300">{area.tagline}</div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {area.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Neighborhoods & Destinations:
                    </div>
                    {area.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <Link
                  to={area.slug}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-hover transition"
                >
                  <span>Explore {area.name} Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

import React from 'react';
import PageHero from '../components/PageHero';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Phone, CalendarCheck } from 'lucide-react';

export default function Services() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Chauffeured Services"
        title="Luxury Car Service in NYC"
        subtitle="Discover our comprehensive suite of chauffeured travel solutions across New York, New Jersey, and Connecticut. Reliable airport transfers, executive roadshows, hourly charters, and milestone events."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image.png"
        breadcrumbs={[{ name: "Services" }]}
      />

      {/* Services List Detailed */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Column */}
            <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-gold border border-gold/30">
                  {service.number}
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-6 space-y-5 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="text-xs font-bold uppercase tracking-wider text-gold">
                Service Category {service.number}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {service.title}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {service.details}
              </p>

              {/* Sub-services list (e.g. JFK, LGA, EWR or Wedding, Prom, etc.) */}
              {service.subServices && (
                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Popular Destinations & Occasions:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.subServices.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.link}
                        className="text-xs bg-[#101923] hover:bg-gold hover:text-black text-neutral-200 border border-white/10 hover:border-gold px-3 py-1.5 rounded-lg transition"
                      >
                        {sub.name} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="space-y-2 pt-2">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center gap-4">
                <Link
                  to={`/reservations?service=${service.id}`}
                  className="bg-gold hover:bg-gold-hover text-black px-6 py-3 rounded-full font-bold text-xs tracking-wide transition shadow-lg shadow-gold/20 flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book This Service</span>
                </Link>

                <Link
                  to={service.slug}
                  className="text-xs font-bold text-neutral-300 hover:text-gold transition flex items-center gap-1.5"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

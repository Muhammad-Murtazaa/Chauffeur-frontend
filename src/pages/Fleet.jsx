import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import VehicleCard from '../components/VehicleCard';
import { fleetData } from '../data/fleetData';
import { ShieldCheck, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Fleet() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Fleet Vehicles' },
    { id: 'sedans', label: 'Executive Sedans' },
    { id: 'suvs', label: 'Luxury SUVs' },
    { id: 'sprinters', label: 'Sprinter & Transit Vans' },
    { id: 'limos', label: 'Stretch Limos' },
    { id: 'buses', label: 'Minibuses & Coaches' },
  ];

  const filteredVehicles = selectedCategory === 'all'
    ? fleetData
    : fleetData.filter(v => v.category === selectedCategory);

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="NYC Premier Limo Fleet"
        title="Luxury Vehicles Matched to Every Occasion"
        subtitle="Explore our prestigious collection of chauffeur-driven sedans, luxury full-size SUVs, custom Mercedes Sprinter vans, stretch limousines, and executive charter motorcoaches."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/fleet-page-chauffeur-service-nyc-hero.webp"
        breadcrumbs={[{ name: "Fleet" }]}
      />

      {/* Fleet Standards Banner */}
      <section className="py-8 bg-[#090F16] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-serif text-2xl font-bold text-gold">100%</div>
            <div className="text-xs text-neutral-400">TLC Licensed & Insured</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-2xl font-bold text-gold">Daily</div>
            <div className="text-xs text-neutral-400">Interior Detailing & Sanitization</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-2xl font-bold text-gold">Late-Model</div>
            <div className="text-xs text-neutral-400">Current Generation Vehicles</div>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-2xl font-bold text-gold">24/7</div>
            <div className="text-xs text-neutral-400">Dedicated Fleet Dispatch</div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Vehicle Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-gold text-black shadow-lg shadow-gold/25'
                  : 'bg-[#101923] text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Fleet Standards & Amenities Section */}
      <section className="py-20 bg-[#080E15] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
              Onboard Standards
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Flawless Vehicle Preparation on Every Trip
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every vehicle in our fleet undergoes a rigorous multi-point inspection before leaving our facility. Chauffeurs ensure temperature controls are set, bottled spring water is restocked, device chargers are prepared, and cabins are thoroughly sanitized.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Complimentary Wi-Fi Access</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Chilled Bottled Spring Water</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Multi-Device USB & AC Outlets</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Dark Privacy Window Tinting</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Child Car Seats (On Request)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Full Snow & All-Weather Equipment</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/reservations"
                className="bg-gold hover:bg-gold-hover text-black px-7 py-3 rounded-full font-bold text-xs tracking-wide transition shadow-lg shadow-gold/20 inline-block"
              >
                Reserve Your Vehicle
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://nycpremierlimo.com/wp-content/uploads/2026/09/chauffeur-pre-trip-vehicle-inspection-nyc.webp"
              alt="Vehicle Inspection"
              className="rounded-3xl border border-white/10 shadow-2xl w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

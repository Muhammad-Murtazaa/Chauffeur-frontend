import React, { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { fleetData } from '../data/fleetData';
import { Clock, Star, CheckCircle2 } from 'lucide-react';
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
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. FLEET HERO SECTION
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/09/fleet-page-chauffeur-service-nyc-hero.webp')` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Fleet</span>
          </div>

          {/* Eyebrow */}
          <div className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            &mdash; NYC Premier Limo fleet
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Luxury vehicles matched to your<br className="hidden sm:inline" />
            journey.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Explore professionally chauffeured vehicle categories for private rides, executive travel, family transportation, airport luggage, and larger groups across New York and the tri-state area.
          </p>

          {/* Two Buttons: Call & Instant Quote */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c88800] text-black font-semibold text-sm px-7 py-3 rounded-full transition-colors shadow-sm"
            >
              Call (347) 888-9797
            </a>
            <Link
              to="/reservations"
              className="border border-white text-white hover:bg-white hover:text-black font-medium text-sm px-7 py-3 rounded-full transition-colors flex items-center gap-2"
            >
              <span>Instant Quote</span>
              <span className="text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FLOATING FLEET TRUST STRIP (Overlapping White Card)
      ========================================================================= */}
      <div className="-mt-12 sm:-mt-14 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-black/5 py-6 px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: (
                  <div className="w-10 h-10 rounded-full bg-[#e09900]/15 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                ),
                title: "Professional Chauffeurs",
                desc: "TLC-licensed service"
              },
              {
                icon: (
                  <div className="w-10 h-10 rounded-full bg-[#e09900]/15 flex items-center justify-center shrink-0 font-bold text-black text-sm">
                    $
                  </div>
                ),
                title: "Prepared Vehicles",
                desc: "Clean and presentation-ready"
              },
              {
                icon: (
                  <div className="w-10 h-10 rounded-full bg-[#e09900]/15 flex items-center justify-center shrink-0 font-bold text-black text-xs tracking-tight">
                    NY
                  </div>
                ),
                title: "Right-Size Planning",
                desc: "Passenger and luggage matching"
              },
              {
                icon: (
                  <div className="w-10 h-10 rounded-full bg-[#e09900]/15 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-black text-black" />
                  </div>
                ),
                title: "24/7 Trip Support",
                desc: "Help when your itinerary needs it"
              }
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3.5 text-left">
                {feat.icon}
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-[14px] text-black tracking-tight leading-snug">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-snug mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

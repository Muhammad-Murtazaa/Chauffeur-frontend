import React, { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { fleetData } from '../data/fleetData';
import { Clock, Star, CheckCircle2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Fleet() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const categories = [
    { id: 'all', label: 'All Fleet Vehicles' },
    { id: 'sedans', label: 'Executive Sedans' },
    { id: 'suvs', label: 'Luxury SUVs' },
    { id: 'sprinters', label: 'Sprinter & Transit Vans' },
    { id: 'limos', label: 'Stretch Limos' },
    { id: 'buses', label: 'Minibuses & Coaches' },
  ];

  const fleetFaqs = [
    {
      q: "How do I make a reservation?",
      a: "Book online through our real-time portal, call us directly, or message the team. Support is available 24/7 to confirm your car."
    },
    {
      q: "What areas do you serve?",
      a: "All five boroughs of NYC and the wider tri-state area (NY, NJ, CT), plus JFK, LaGuardia, Newark and Teterboro airports."
    },
    {
      q: "What vehicles are in your fleet?",
      a: "Executive sedans, luxury SUVs, premium vans and larger group vehicles — matched to your passenger count and luggage."
    },
    {
      q: "Are your prices flat or hourly?",
      a: "Both. Flat rates apply to airport and point-to-point transfers; hourly charters suit multi-stop and corporate travel. The quote is what you pay."
    },
    {
      q: "Can I book for weddings or special events?",
      a: "Yes. We arrange transportation for weddings, proms, anniversaries and other occasions, with vehicles to match the day."
    }
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

      {/* =========================================================================
          3. OUR FLEET: "A vehicle matched to the moment"
      ========================================================================= */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e09900] mb-3">
              &mdash; OUR FLEET
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-black leading-[1.12]">
              A vehicle matched to the<br />
              moment
            </h2>
          </div>
          <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-md lg:pb-1">
            Passenger limits assume standard seating. Share oversized luggage, mobility needs, child-seat requests, or special equipment before your vehicle is confirmed.
          </p>
        </div>

        {/* 3-Column Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              id: "business-sedan",
              name: "Business Sedan",
              passengers: "3 Passengers",
              luggage: "3 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/09/Premium-sedan-768x512.png"
            },
            {
              id: "premium-sedan",
              name: "Premium Sedan",
              passengers: "2 Passengers",
              luggage: "2 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-premium-sedan-mercedes-s-class-nyc-768x512.webp"
            },
            {
              id: "midsize-suv",
              name: "Midsize SUV",
              passengers: "4 Passengers",
              luggage: "4 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-midsize-suv-cadillac-xt6-nyc-768x512.png"
            },
            {
              id: "business-suv",
              name: "Business SUV",
              passengers: "6 Passengers",
              luggage: "6 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-business-suv-chevrolet-tahoe-nyc-768x512.png"
            },
            {
              id: "premium-suv",
              name: "Premium SUV",
              passengers: "6 Passengers",
              luggage: "6 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-premium-suv-cadillac-escalade-nyc-768x512.png"
            },
            {
              id: "stretch-limo",
              name: "Stretch Limo",
              passengers: "8 Passengers",
              luggage: "2 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-stretch-limo-lincoln-town-car-nyc-768x612.png"
            },
            {
              id: "transit-van",
              name: "Transit Van",
              passengers: "10 Passengers",
              luggage: "10 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-executive-van-mercedes-sprinter-nyc-768x559.png"
            },
            {
              id: "jet-sprinter",
              name: "Jet Sprinter",
              passengers: "10 Passengers",
              luggage: "10 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-jet-sprinter-executive-van-nyc-768x512.png"
            },
            {
              id: "sprinter-van",
              name: "Sprinter Van",
              passengers: "14 Passengers",
              luggage: "14 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-sprinter-van-mercedes-benz-nyc-1-768x612.png"
            },
            {
              id: "sprinter-limo",
              name: "Sprinter Limo",
              passengers: "14 Passengers",
              luggage: "14 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-sprinter-limo-party-van-nyc-768x512.png"
            },
            {
              id: "suv-limo",
              name: "SUV Limo",
              passengers: "16 Passengers",
              luggage: "16 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-suv-limo-lincoln-navigator-nyc-768x512.png"
            },
            {
              id: "party-van",
              name: "Party Van",
              passengers: "18 Passengers",
              luggage: "18 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-party-van-ford-transit-nyc-768x512.png"
            },
            {
              id: "mini-bus",
              name: "Mini Bus",
              passengers: "25 Passengers",
              luggage: "25 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-mini-bus-nyc-group-shuttle-768x612.png"
            },
            {
              id: "coach-bus",
              name: "Coach Bus",
              passengers: "35 Passengers",
              luggage: "35 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-coach-bus-nyc-group-transport-768x512.png"
            },
            {
              id: "charter-bus",
              name: "Charter Bus",
              passengers: "55 Passengers",
              luggage: "55 Luggage",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-charter-bus-motorcoach-nyc-768x612.png"
            }
          ].map((veh) => (
            <div
              key={veh.id}
              className="bg-white border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Photo */}
                <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden bg-neutral-100">
                  <img
                    src={veh.image}
                    alt={veh.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-black leading-tight mb-4">
                    {veh.name}
                  </h3>

                  {/* Thin Divider Line */}
                  <div className="w-full h-[1px] bg-zinc-200 mb-5" />

                  {/* Specs Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e09900]/15 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#e09900] fill-current" viewBox="0 0 24 24">
                          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zm-7 18c0-3.3 3.1-6 7-6s7 2.7 7 6v1H5v-1z" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-black whitespace-nowrap">
                        {veh.passengers}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e09900]/15 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#e09900] fill-current" viewBox="0 0 24 24">
                          <path d="M19 6h-3V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-9-2h4v2h-4V4zm9 16H5V8h14v12z" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-black whitespace-nowrap">
                        {veh.luggage}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Link with Gold Underline */}
                  <div className="pt-6 mt-auto text-left">
                    <Link
                      to="/reservations"
                      className="inline-block text-xs sm:text-sm font-semibold text-black border-b-2 border-[#e09900] pb-0.5 hover:text-[#e09900] transition-colors"
                    >
                      Book now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. VEHICLE SELECTION GUIDE: "Compare the fleet at a glance."
      ========================================================================= */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e09900] mb-3">
              &mdash; VEHICLE SELECTION GUIDE
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-black leading-[1.12]">
              Compare the fleet at a<br />
              glance.
            </h2>
          </div>
          <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-md lg:pb-1">
            Passenger limits assume standard seating. Share oversized luggage, mobility needs, child-seat requests, or special equipment before your vehicle is confirmed.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-white border border-zinc-300 shadow-sm">
          <table className="w-full border-collapse text-left text-xs sm:text-[13px]">
            <thead>
              <tr className="border-b border-zinc-300 bg-white">
                <th className="border-r border-zinc-300 p-4 sm:p-5 font-bold text-black text-center whitespace-nowrap w-[20%]">
                  Vehicle
                </th>
                <th className="border-r border-zinc-300 p-4 sm:p-5 font-bold text-black text-center whitespace-nowrap w-[30%]">
                  Models
                </th>
                <th className="p-4 sm:p-5 font-bold text-black text-center w-[50%]">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  vehicle: "Business Sedan",
                  models: "Cadillac XTS, Lincoln Continental or similar",
                  bestFor: "Solo travellers and pairs. The everyday choice for airport transfers, meetings and point-to-point rides across Manhattan."
                },
                {
                  vehicle: "Premium Sedan",
                  models: "Mercedes-Benz S-Class, E-Class or similar",
                  bestFor: "Client pickups and executive arrivals where the car itself is part of the impression. Common for corporate travel and VIP airport meet-and-greets."
                },
                {
                  vehicle: "Midsize SUV",
                  models: "Cadillac XT5, XT6 or similar",
                  bestFor: "Couples and small families who need more luggage room than a sedan, and anyone travelling in winter weather."
                },
                {
                  vehicle: "Business SUV",
                  models: "Chevrolet Suburban, GMC Yukon or similar",
                  bestFor: "Family airport runs with full-size cases, and small corporate groups moving together between meetings."
                },
                {
                  vehicle: "Premium SUV",
                  models: "Cadillac Escalade, Lincoln Navigator or similar",
                  bestFor: "Executive road shows, VIP arrivals and wedding party transportation where space and presence both matter."
                },
                {
                  vehicle: "Executive Van",
                  models: "Ford Transit, Mercedes-Benz Sprinter or similar",
                  bestFor: "Conference delegations, project teams and extended families travelling with luggage for everyone."
                },
                {
                  vehicle: "Sprinter Van",
                  models: "Mercedes-Benz Sprinter passenger van",
                  bestFor: "Larger groups where luggage space is the deciding factor — sports teams, tour groups and multi-family airport transfers."
                },
                {
                  vehicle: "C.E.O. Van",
                  models: "Mercedes-Benz Sprinter, executive interior",
                  bestFor: "Executive groups who need to talk or work privately between stops. Popular for roadshows and private-aviation transfers."
                },
                {
                  vehicle: "Limo Sprinter",
                  models: "Mercedes-Benz Sprinter, limousine interior",
                  bestFor: "Nights out for mid-size groups. Bachelor and bachelorette parties, birthday celebrations and winery tours."
                },
                {
                  vehicle: "Party Van",
                  models: "Mercedes-Benz Sprinter, celebration interior",
                  bestFor: "Celebrations that move between several venues. Sweet 16s, birthday nights out and group city experiences."
                },
                {
                  vehicle: "Stretch Limo",
                  models: "Lincoln Continental, Lincoln MKT or similar",
                  bestFor: "Occasions where the arrival is part of the event — weddings, proms and anniversary evenings."
                },
                {
                  vehicle: "SUV Limo",
                  models: "Hummer H2, Cadillac Escalade, Range Rover or similar",
                  bestFor: "Statement arrivals for larger celebration groups. Prom parties, milestone birthdays and bachelorette nights."
                },
                {
                  vehicle: "Mini Bus",
                  models: "Ford E-450 Shuttle, Chevrolet 4500 or similar",
                  bestFor: "Corporate shuttles, wedding guest transport between ceremony and reception, and full-day vineyard tours."
                },
                {
                  vehicle: "Mini Coach Bus",
                  models: "Grech Motors GM33, Freightliner M2 or similar",
                  bestFor: "Conference shuttles, large wedding guest transfers and family reunions travelling as one group."
                },
                {
                  vehicle: "Charter Bus",
                  models: "MCI J4500, Van Hool CX45, Prevost H3-45 or similar",
                  bestFor: "Large corporate events, convention shuttles and long-distance city-to-city group travel across the tri-state area."
                }
              ].map((row, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-zinc-300 last:border-b-0 hover:bg-zinc-50/75 transition-colors"
                >
                  <td className="border-r border-zinc-300 p-4 sm:p-5 font-medium text-black leading-snug">
                    {row.vehicle}
                  </td>
                  <td className="border-r border-zinc-300 p-4 sm:p-5 text-zinc-700 leading-relaxed">
                    {row.models}
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-600 leading-relaxed">
                    {row.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {/* =========================================================================
          5. FAQ SECTION: "Frequently asked questions"
      ========================================================================= */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#e09900]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B] leading-tight">
                Choose your vehicle with confidence.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14px] text-[#6D685F] leading-relaxed">
                Exact pricing, vehicle availability, pickup instructions, and trip requirements are confirmed directly with NYC Premier Limo.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion list with smooth slide transition */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {fleetFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-2 text-left">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 py-4 group cursor-pointer select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#1D1D1B] group-hover:text-[#e09900] transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#e09900]/10 flex items-center justify-center text-[#6D685F] group-hover:text-[#e09900] transition-colors duration-200 shrink-0">
                    <Plus
                      className={`w-4 h-4 transition-transform duration-350 ease-in-out ${
                        isOpen ? 'rotate-45 text-[#e09900]' : 'rotate-0'
                      }`}
                    />
                  </span>
                </button>

                {/* Smooth Expand/Collapse Grid Container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] sm:text-[15px] text-[#6D685F] leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. PRE-FOOTER CTA (Dark Rounded Card with Gold Glow & Pill Buttons)
      ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-[#111215] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          {/* Ambient warm gold glow in top-right */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[#e09900]/15 rounded-full blur-3xl" />

          {/* Left Content */}
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#e09900]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#e09900]">
                READY TO RIDE
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight">
              Book your next trip with NYC Premier Limo.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 leading-relaxed font-normal">
              Request a personalized quote online or speak directly with the team about airport, corporate, hourly, point-to-point, city-to-city, or special event transportation.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-3.5 shrink-0">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs sm:text-[13px] px-8 py-3 rounded-full transition-all shadow-md active:scale-95 text-center min-w-[120px]"
            >
              Call Now
            </a>
            <Link
              to="/reservations"
              className="bg-transparent border border-white/70 hover:border-white text-white hover:bg-white/5 font-bold text-xs sm:text-[13px] px-8 py-3 rounded-full transition-all active:scale-95 text-center min-w-[130px]"
            >
              Instant Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


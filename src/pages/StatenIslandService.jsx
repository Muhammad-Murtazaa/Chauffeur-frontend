import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function StatenIslandService() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Staten Island Chauffeur Service)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image-jfk-section-image.png')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Areas We Serve / Staten Island */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <Link to="/areas-we-serve" className="hover:text-white transition">Areas We Serve</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Staten Island</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>Staten Island chauffeur service</span>
          </div>

          {/* Main Heading (No Limo per rule) */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Staten Island Car &amp; Black Car Service
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Private Staten Island car and black car service for airport transfers, corporate schedules, special occasions, and direct rides across the bridges into New York City &mdash; from St. George and Tottenville to the Mid-Island.
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
          2. FLOATING TRUST STRIP (Overlapping White Card with 4 Columns)
      ========================================================================= */}
      <div className="-mt-12 sm:-mt-14 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-black/5 py-6 px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Flight-Aware
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Live arrival monitoring
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                24/7
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Trip support any hour
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Private
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Reserved for your party
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                TLC
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Licensed & fully insured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. AFTERWARD / ITINERARY SECTION
      ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text & 4 Feature Cards Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>PRIVATE TRANSPORTATION IN STATEN ISLAND</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              Staten Island car service built around your schedule
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Our Staten Island black car service connects homes, hotels, airports, offices, and venues across the borough with a single planned itinerary &mdash; with a chauffeur who knows the Verrazzano, the ferry schedules, and the fastest routes to Newark, JFK, and LaGuardia.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Bridge routing", desc: "Verrazzano, Goethals, Bayonne or Outerbridge planned" },
                { title: "Tolls included", desc: "Bridge tolls calculated directly into your quote" },
                { title: "Local chauffeurs", desc: "Experienced drivers who know borough traffic" },
                { title: "Flat Rate", desc: "Quoted and confirmed in writing before booking" }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-1 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-serif text-base font-bold text-[#1D1D1B]">
                    {card.title}
                  </h4>
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Framed Graphic Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] aspect-[4/5] sm:aspect-[1/1] w-full shadow-lg">
                <img
                  src="https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image-jfk-section-image.png"
                  alt="Staten Island Chauffeur Service"
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Overlapping Floating Pill / Badge */}
                <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#e09900] leading-tight block">
                      NYC Premier Chauffeur
                    </span>
                  </div>
                  <div className="text-right flex-1 pl-2">
                    <span className="font-bold text-white text-xs sm:text-sm leading-snug block">
                      Flight-aware private transportation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR FLEET ("Our Staten Island Fleet")
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14 space-y-3">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-8 h-[1.5px] bg-[#e09900]" />
            <span>OUR FLEET</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
            Our Staten Island Fleet
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed pt-1">
            Four vehicle classes cover almost every Staten Island booking. If you are not sure which fits your party and luggage, tell us the passenger count and case count, and we will confirm the right category with your quote.
          </p>
        </div>

        {/* 4 Vehicle Cards Grid: 2 columns on desktop matching Brooklyn design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {[
            {
              number: "01",
              title: "Executive Sedan",
              capacity: "UP TO 3 PASSENGERS, 3 SUITCASES",
              desc: "The default choice for solo travellers and couples heading to JFK, LaGuardia, or Newark, and for executive pickups around St. George and the Teleport office park. Leather interior, bottled water, phone charging, and a chauffeur who monitors your flight.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-premium-sedan-mercedes-s-class-nyc-1.webp"
            },
            {
              number: "02",
              title: "Luxury SUV",
              capacity: "UP TO 6 PASSENGERS, 6 SUITCASES",
              desc: "Our most-booked vehicle in Staten Island. Room for a family with full airport luggage, and high enough seating to make a slow run over the Goethals or Verrazzano considerably more comfortable. Ideal for airport runs and evening dining.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-premium-suv-cadillac-escalade-nyc-1.webp"
            },
            {
              number: "03",
              title: "Executive Sprinter",
              capacity: "UP TO 14 PASSENGERS",
              desc: "Built for corporate groups, wedding parties, and airport runs where the luggage count is genuinely serious. Standing-height cabin, individual seating, and generous space that makes group bridge crossings comfortable.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-sprinter-van-mercedes-benz-nyc-3.webp"
            },
            {
              number: "04",
              title: "Business SUV",
              capacity: "UP TO 6 PASSENGERS",
              desc: "For reliable airport transfers, corporate groups, and family travel between Staten Island venues, hotels, and airports.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-business-suv-chevrolet-tahoe-nyc.png"
            }
          ].map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-none border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Vehicle Image with Black Number Badge on Top Left */}
              <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full bg-zinc-100 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-bold w-7 h-7 flex items-center justify-center">
                  {vehicle.number}
                </div>
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-start space-y-3">
                {/* Gold Car Icon */}
                <div className="w-7 h-7 text-[#e09900]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1D1D1B] tracking-tight">
                  {vehicle.title}
                </h3>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#e09900]">
                  {vehicle.capacity}
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed pt-1">
                  {vehicle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Button */}
        <div className="mt-14 sm:mt-16 text-center space-y-4">
          <p className="text-sm text-zinc-600 font-normal">
            See the full fleet with photographs, capacities, and interior detail on our fleet page.
          </p>
          <div className="flex justify-center">
            <Link
              to="/our-fleet"
              className="inline-flex items-center gap-2 border border-[#e09900] text-[#e09900] hover:bg-[#e09900] hover:text-black font-medium text-xs sm:text-sm px-6 py-2.5 transition-colors"
            >
              <span>Explore our complete fleet</span>
              <span className="text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. DETAILS FIRST / PLAN YOUR RIDE (Dark Card with 3 Step Items)
      ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111215] rounded-[32px] sm:rounded-[40px] border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
                <span className="w-8 h-[1.5px] bg-[#e09900]" />
                <span>PLAN YOUR RIDE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.12]">
                Details first. Smooth travel after.
              </h2>
              <p className="text-xs sm:text-[14px] text-zinc-400 font-normal leading-relaxed">
                An accurate plan starts with the route, timing, passengers, luggage, stops, and preferred fleet category.
              </p>
            </div>

            {/* Right 3 Step List with Horizontal Dividers */}
            <div className="lg:col-span-7 divide-y divide-white/10">
              {[
                {
                  step: "01",
                  title: "Pickup and destination",
                  desc: "Share exact addresses, date, requested time, intermediate stops, and return plans."
                },
                {
                  step: "02",
                  title: "Party and luggage",
                  desc: "Confirm passengers, suitcases, oversized items, child-seat requests, and accessibility needs."
                },
                {
                  step: "03",
                  title: "Final confirmation",
                  desc: "The team confirms service availability, vehicle category, pickup instructions, and quote."
                }
              ].map((item, idx) => (
                <div key={idx} className="py-5 sm:py-6 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-5">
                  <span className="w-8 h-8 rounded-full bg-[#e09900] text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FAQS SECTION ("Before you reserve.")
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>STATEN ISLAND FAQS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Before you reserve.
            </h2>
          </div>
          <p className="text-xs sm:text-[14px] text-zinc-500 font-normal">
            Exact service details are confirmed for your individual itinerary.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {[
            {
              q: "Can I book an airport transfer from Staten Island?",
              a: "Yes. Provide the airport, airline or flight number, pickup address, travel date, passenger count, and luggage so the transfer can be planned accurately."
            },
            {
              q: "Which vehicles are available in Staten Island?",
              a: "The fleet includes executive sedans, luxury SUVs, and executive specialty vehicles. The confirmed vehicle category depends on availability and the passenger and luggage requirements."
            },
            {
              q: "Can the ride include several stops?",
              a: "Yes. Include every planned stop and any waiting requirements in the quote request. Hourly chauffeur service may be suitable for a flexible or multi-stop schedule."
            },
            {
              q: "How do I get an exact quote?",
              a: "Submit the complete route, date, time, passenger count, luggage, stop details, and vehicle preference through Instant Quote, or call the team directly."
            },
            {
              q: "Do you provide car service from Staten Island to Newark and the other airports?",
              a: "Yes. Newark is often the fastest airport from Staten Island, and we also serve JFK and LaGuardia. Transfers are flat-rate and flight-tracked, with the bridge route planned for the time of day."
            },
            {
              q: "How much does Staten Island car service cost?",
              a: "Pricing depends on vehicle, trip type, and duration. Airport transfers are typically flat-rate, while hourly and event trips are billed by the hour. Send your route and stops for an exact quote, confirmed before you book."
            },
            {
              q: "Are bridge tolls included in the price?",
              a: "Yes. Tolls for the Verrazzano, Goethals, Bayonne or Outerbridge are calculated into your quoted price before you book. Nothing is added to your bill afterwards."
            }
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-2 text-left">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 py-4 group cursor-pointer select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#1D1D1B] group-hover:text-[#e09900] transition-colors duration-200">
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

                {/* Expand/Collapse Container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] sm:text-[15px] text-zinc-600 leading-relaxed pr-8 font-normal">
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
          7. PRE-FOOTER CTA ("Plan your private ride today.")
      ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-[#111215] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          {/* Ambient warm gold glow in top-right */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[#e09900]/15 rounded-full blur-3xl" />

          {/* Left Content */}
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#e09900]">
                RESERVE IN STATEN ISLAND
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.15] tracking-tight">
              Plan your private ride today.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 leading-relaxed font-normal">
              Share your full Staten Island itinerary &mdash; route, date, passengers, and stops &mdash; so the team can confirm the vehicle, availability, and an accurate Staten Island car service quote.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="relative z-10 flex flex-row items-center gap-3.5 shrink-0">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c88800] text-black font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 rounded-full transition-colors text-center shadow-md whitespace-nowrap"
            >
              Call Now
            </a>
            <Link
              to="/reservations"
              className="border border-white/80 hover:bg-white hover:text-black text-white font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 rounded-full transition-colors flex items-center justify-center text-center whitespace-nowrap"
            >
              Instant Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

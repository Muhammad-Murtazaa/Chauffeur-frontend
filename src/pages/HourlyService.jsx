import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function HourlyService() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur Night Cityscape)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/08/hourly-limo-page-banner-1.jpg')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Service / Hourly Car Service */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <Link to="/services" className="hover:text-white transition">Service</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Hourly Car Service</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>NYC hourly chauffeur service</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Hourly Car Service in NYC
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Reserve a professional chauffeur and a private vehicle by the hour anywhere in New York City. Hourly car service is built for the days a single pickup and drop-off cannot cover &mdash; client meetings across Midtown, a roadshow that runs from Wall Street to Hudson Yards, an afternoon of shopping on Fifth Avenue, or an evening that moves from dinner to a venue and home again. Your car waits between every stop.
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
                24/7
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Dispatch &amp; trip support
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                By the Hour
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Chauffeur reserved
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Multi-Stop
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                One private vehicle
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Flat-Rate
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Confirmed hourly quotes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. AFTERWARD / ITINERARY SECTION (Left text, Right framed image)
      ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>PLAN THE COMPLETE ITINERARY</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              Hourly car service in NYC, with a chauffeur who stays with your schedule
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Hourly car service in NYC is built for days that can&rsquo;t be reduced to a single pickup and drop-off. Your vehicle and chauffeur stay reserved for the confirmed time, so several stops, waiting periods and last-minute changes are easy to coordinate.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Book a car service by the hour for corporate roadshows, private sightseeing, shopping, appointments, medical visits, film and production days, and event transportation &mdash; any day when the plan may change and you would rather not arrange a separate ride for every leg of it. Add stops, extend your time, or reorder the itinerary while the chauffeur is already with you.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative p-2 rounded-[28px] sm:rounded-[36px] border border-zinc-800/40 bg-transparent shadow-sm">
              <div className="overflow-hidden rounded-[22px] sm:rounded-[30px] aspect-[4/5] sm:aspect-[3/4] max-w-md w-full">
                <img
                  src="https://nycpremierlimo.com/wp-content/uploads/2026/08/Hourly-Car-Service-1024x683.jpg"
                  alt="Chauffeur holding car door for passenger"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================================
          4. SERVICE FEATURES (What your hourly car service booking includes)
      ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>SERVICE FEATURES</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              What your hourly car<br className="hidden sm:inline" /> service booking includes
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              We confirm your vehicle, your hours, the route, what is included, and your flat hourly rate before every booking.
            </p>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              number: "01",
              title: "Reserved time",
              desc: "The vehicle and chauffeur stay assigned for your confirmed service period.",
              highlight: true
            },
            {
              number: "02",
              title: "Multiple stops",
              desc: "Build meetings, hotels, venues, restaurants and personal stops into one itinerary.",
              highlight: false
            },
            {
              number: "03",
              title: "Flexible planning",
              desc: "Adjust the plan within the confirmed reservation and availability, without rebooking.",
              highlight: false
            },
            {
              number: "04",
              title: "Professional chauffeur",
              desc: "A courteous driver who knows New York traffic and pickup logistics.",
              highlight: false
            },
            {
              number: "05",
              title: "One private vehicle",
              desc: "Skip arranging a separate ride for every leg of the day.",
              highlight: false
            },
            {
              number: "06",
              title: "24/7 support",
              desc: "Trip support is available whenever the itinerary needs attention.",
              highlight: false
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] transition-all duration-300 hover:shadow-md ${
                card.highlight
                  ? "border-2 border-[#e09900]/90 shadow-sm"
                  : "border border-zinc-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              }`}
            >
              {/* Top Accent Strip (present on all cards, gold bar on top) */}
              <div className="absolute top-0 left-8 w-10 h-[3px] bg-[#e09900] rounded-full" />

              {/* Number Badge */}
              <div className="pt-2 text-xs font-semibold text-[#e09900] tracking-wider">
                {card.number}
              </div>

              {/* Title and Description */}
              <div className="space-y-3 pt-4">
                <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#1D1D1B] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. FLEET PLANNING (Choose your vehicle for hourly service in NYC)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>FLEET PLANNING</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
            Choose your vehicle for hourly service in NYC
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            Listed capacities are planning guidance &mdash; oversized bags, equipment, child seats and special requirements can change the recommended vehicle.
          </p>
        </div>

        {/* 3 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              badge: "Executive class",
              title: "Premium Sedan",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Premium-Sedan-1024x683.webp",
              passengers: "3 Passengers",
              luggage: "3 Luggage",
              bookingParam: "sedan"
            },
            {
              badge: "First class",
              title: "Premium SUV",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Premium-SUV-1024x683.webp",
              passengers: "6 Passengers",
              luggage: "6 Luggage",
              bookingParam: "suv"
            },
            {
              badge: "VIP Group class",
              title: "Executive Sprinter VIP",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Sprinter-Van-1024x683.webp",
              passengers: "14 Passengers",
              luggage: "14 Luggage",
              bookingParam: "sprinter"
            }
          ].map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-none border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Vehicle Image with Top Left Badge */}
              <div className="relative aspect-[16/11] sm:aspect-[4/3] bg-zinc-100 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 uppercase tracking-wider">
                  {vehicle.badge}
                </div>
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1D1D1B] tracking-tight mb-4">
                    {vehicle.title}
                  </h3>

                  {/* Thin Divider */}
                  <div className="w-full h-[1px] bg-zinc-200 mb-5" />

                  {/* Specs Grid: Passengers/Luggage on Left, Professionally chauffeured on Right */}
                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-[13px] mb-6">
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#1D1D1B]">
                        {vehicle.passengers.split(' ')[0]}
                      </div>
                      <div className="font-bold text-[#1D1D1B]">
                        {vehicle.passengers.split(' ')[1]}
                      </div>
                      <div className="text-zinc-500 text-[11px] sm:text-xs pt-1">
                        {vehicle.luggage}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="font-bold text-[#1D1D1B]">
                        Professionally
                      </div>
                      <div className="font-bold text-[#1D1D1B]">
                        chauffeured
                      </div>
                      <div className="text-zinc-500 text-[11px] sm:text-xs pt-1">
                        Request this vehicle class
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Book now / View the Full Fleet */}
                <div className="flex items-center justify-between pt-2 text-xs sm:text-[13px] font-medium border-t border-transparent">
                  <Link
                    to={`/reservations?vehicle=${vehicle.bookingParam}&service=hourly`}
                    className="text-[#1D1D1B] underline underline-offset-4 hover:text-[#e09900] transition-colors"
                  >
                    Book now
                  </Link>
                  <Link
                    to="/fleet"
                    className="text-[#1D1D1B] underline underline-offset-4 hover:text-[#e09900] transition-colors"
                  >
                    View the Full Fleet
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. FAQ SECTION ("Clear answers before you reserve.")
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
                Clear answers before you reserve.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14px] text-[#6D685F] leading-relaxed">
                Call us on (347) 888-9797 for availability, pricing, pickup instructions and vehicle confirmation for your specific itinerary.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion list with smooth slide transition */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {[
            {
              q: "How does hourly car service in NYC work?",
              a: "You reserve a chauffeur and a private vehicle for a block of time. Within that block you can add stops, wait as long as you need, and change the order of the day. Call us at (347) 888-9797 or request an instant quote with your date, pickup time, starting address, planned stops, passenger count and preferred vehicle."
            },
            {
              q: "Is there a minimum number of hours?",
              a: "Yes. Sedan and SUV 3 Hours Minimum. Specialty Vehicles 4 Hour Minimum. We confirm the exact minimum for your date and vehicle before you book."
            },
            {
              q: "Can I add stops or change the plan during the day?",
              a: "Yes. Because the vehicle is reserved for your time block, stops and adjustments can be handled within the confirmed reservation and availability — no need to rebook a new ride."
            },
            {
              q: "Do you provide hourly service outside Manhattan?",
              a: "Yes. Hourly service covers all five boroughs and the surrounding tri-state area, including Westchester, Long Island and northern New Jersey. Your reserved hours can be spent anywhere the itinerary takes you."
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
          7. PRE-FOOTER CTA (Dark Rounded Card with Gold Glow & Pill Buttons)
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
              Book your next trip with NYC Premier Chauffeur.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 leading-relaxed font-normal">
              Request a personalized quote online or speak directly with the team about airport, corporate, hourly, point-to-point, city-to-city, or special event transportation.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c88800] text-black font-semibold text-sm px-7 py-3.5 rounded-full transition-colors text-center shadow-md whitespace-nowrap"
            >
              Call (347) 888-9797
            </a>
            <Link
              to="/reservations"
              className="border border-white/80 hover:bg-white hover:text-black text-white font-medium text-sm px-7 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 text-center whitespace-nowrap"
            >
              <span>Instant Quote</span>
              <span className="text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

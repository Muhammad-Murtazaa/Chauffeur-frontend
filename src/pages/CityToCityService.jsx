import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Plus } from 'lucide-react';

export default function CityToCityService() {
  const [openFaq, setOpenFaq] = useState(0);
  const routes = [
    { from: "NYC", to: "The Hamptons & Montauk", time: "Approx. 2.5 hrs", desc: "Door-to-door summer weekend transfers with plenty of luggage room for beach gear." },
    { from: "NYC", to: "Philadelphia, PA", time: "Approx. 2 hrs", desc: "Direct executive travel between Manhattan corporate offices and Center City Philadelphia." },
    { from: "NYC", to: "Boston, MA", time: "Approx. 4 hrs", desc: "Skip regional airline delays and train station crowds with a private executive Sprinter or Sedan." },
    { from: "NYC", to: "Washington D.C.", time: "Approx. 4.5 hrs", desc: "Comfortable long-haul executive journey with continuous Wi-Fi and mobile office comfort." },
    { from: "NYC", to: "Greenwich / Stamford, CT", time: "Approx. 1 hr", desc: "Executive corridor commuting for hedge funds, private equity firms, and corporate headquarters." },
    { from: "NYC", to: "Atlantic City, NJ", time: "Approx. 2.5 hrs", desc: "VIP round-trip casino and resort transportation for groups and celebrations." }
  ];

  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur Night Cityscape / Terminal)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/08/hero-background-image.png')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Service / City-to-City Car Service from NYC */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <Link to="/services" className="hover:text-white transition">Service</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">City-to-City Car Service from NYC</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>Intercity chauffeur service</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            City-to-City Car Service from<br />NYC
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Private, long-distance city to city car service from NYC &mdash; direct chauffeured rides connecting New York with Boston, Philadelphia, Washington, Atlantic City, the Hamptons and other regional destinations, without flights or station transfers.
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
                Door-to-Door
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                No transfers
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Regional
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                NY &middot; New England &middot; DC
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Flat-Rate
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Confirmed quotes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. ITINERARY SECTION: "Long-Distance Car Service from NYC"
      ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text & Feature Pills Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>PLAN THE COMPLETE ITINERARY</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              Long-Distance Car Service<br className="hidden sm:inline" /> from NYC
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              City-to-city car service from NYC gives you a private vehicle and chauffeur for regional journeys that would otherwise require flights, trains, transfers, parking, or several separate rides. You travel on your own schedule, with room for passengers and luggage.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              We run regular routes from New York City into New Jersey, Connecticut, Pennsylvania, Massachusetts, Rhode Island, Delaware, Maryland, and Washington, D.C. If your destination is not on the list, send us the address, and we will quote it.
            </p>

            {/* 4 Rounded Pill Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "Licensed chauffeurs",
                "Clean private vehicles",
                "Trip-specific planning",
                "Clear pickup details"
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white border border-zinc-200/80 rounded-2xl px-5 py-3.5 shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-[#e09900] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#e09900] fill-white" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#1D1D1B]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Framed Graphic Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative p-2 rounded-[28px] sm:rounded-[36px] border border-zinc-800/40 bg-transparent shadow-sm max-w-md w-full">
              <div className="relative overflow-hidden rounded-[22px] sm:rounded-[30px] aspect-[4/5] sm:aspect-[1/1] w-full bg-black">
                <img
                  src="https://nycpremierlimo.com/wp-content/uploads/2026/08/second-section-image-jfk-section-image.png"
                  alt="City-to-City Car Service from NYC"
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Overlapping Floating Card with Gold Subtitle & Bold White Title */}
                <div className="absolute bottom-3 inset-x-3 bg-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#e09900] leading-tight block">
                      City-to-City Car<br />Service from NYC
                    </span>
                  </div>
                  <div className="text-right flex-1 pl-2">
                    <span className="font-bold text-white text-xs sm:text-sm leading-snug block">
                      A private vehicle<br />reserved around your<br />journey
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SERVICE FEATURES (What city to city car service from NYC includes)
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
              What city to city car<br className="hidden sm:inline" /> service from NYC includes
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Inclusions, availability, vehicle category, route, timing and pricing are confirmed for every reservation.
            </p>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              number: "01",
              title: "Private cabin",
              desc: "The whole vehicle is yours; you never share with unfamiliar passengers."
            },
            {
              number: "02",
              title: "Door-to-door route",
              desc: "Start and finish at the exact addresses your trip calls for."
            },
            {
              number: "03",
              title: "Luggage space",
              desc: "Choose a vehicle category around passengers, bags and equipment."
            },
            {
              number: "04",
              title: "Planned stops",
              desc: "Discuss rest stops or itinerary needs before the trip is confirmed."
            },
            {
              number: "05",
              title: "Flexible departure",
              desc: "Request a pickup time that fits your plans, not a fixed timetable."
            },
            {
              number: "06",
              title: "Work or rest on the way",
              desc: "Wi-Fi on request, charging in every seat, and a quiet cabin — so a four-hour drive is time you get back rather than time you lose."
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] border border-zinc-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md"
            >
              {/* Top Accent Strip */}
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
          5. POPULAR ROUTES (Direct routes from New York City.)
      ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>POPULAR ROUTES</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Direct routes from New York<br className="hidden sm:inline" /> City.
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              The approximate drive times below are door-to-door under normal conditions. Traffic, weather, and your exact addresses will affect them, and we build that into the departure time we recommend. Send us your route for a flat-rate quote.
            </p>
          </div>
        </div>

        {/* 6 Routes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              number: "01",
              title: "NYC to Boston",
              desc: "Door to door across Connecticut and into New England, with a rest stop planned in if you want one. Popular for business travel where the Acela still leaves you with two station transfers."
            },
            {
              number: "02",
              title: "NYC to Philadelphia",
              desc: "The shortest of the major routes and the easiest to justify by car — you are at the door in about the time the train takes once you add both transfers."
            },
            {
              number: "03",
              title: "NYC to Washington, D.C.",
              desc: "Executive travel down the I-95 corridor, arriving at your hotel or office rather than Union Station. We plan the departure around Baltimore and Beltway traffic."
            },
            {
              number: "04",
              title: "NYC to the Hamptons",
              desc: "Seasonal travel out east, where the drive time swings enormously with the day and the hour. We advise the departure time when you book."
            },
            {
              number: "05",
              title: "NYC to Atlantic City",
              desc: "Casino and event travel with luggage handled, and a chauffeur waiting for the return whenever the night finishes."
            },
            {
              number: "06",
              title: "NYC to Connecticut",
              desc: "Greenwich, Stamford, New Haven and the shoreline towns, for commuting executives and weekend travel."
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] border border-zinc-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md"
            >
              {/* Top Accent Strip */}
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
          6. FLEET PLANNING ("Comfort that holds up over a long drive.")
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
            Comfort that holds up over a long drive.
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
                    to={`/reservations?vehicle=${vehicle.bookingParam}&service=city-to-city`}
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
          7. FAQ SECTION ("Clear answers before you reserve.")
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
              q: "What is city to city car service from NYC?",
              a: "A private, chauffeured long-distance ride between New York and another city or region — door to door, with no flights, trains or transfers. Call (347) 888-9797 or request a quote with your route, date, time, passengers and luggage."
            },
            {
              q: "Which routes do you cover?",
              a: "Regular routes connect NYC with Boston, Washington D.C., Philadelphia, Atlantic City, the Hamptons, Connecticut, the Hudson Valley and the Poconos, plus other destinations across the Northeast. Send us your start and end addresses and we will confirm availability."
            },
            {
              q: "How long does the drive take?",
              a: "Roughly two hours to Philadelphia, two and a half to three to Atlantic City, and four to four and a half to Boston or Washington D.C. Your exact addresses, the day and the hour all move those figures, and we recommend a departure time when we quote you."
            },
            {
              q: "How much does city to city car service cost?",
              a: "Long-distance trips are quoted as one flat rate for the journey, agreed in writing before you book. The rate depends on the distance, the vehicle, whether it is one way or return, and the timing. It does not change if traffic is bad or the trip runs long."
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
          8. PRE-FOOTER CTA (Dark Rounded Card with Gold Glow & Pill Buttons)
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

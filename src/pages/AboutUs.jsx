import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function AboutUs() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur Fleet)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/09/about-nyc-premier-limo-chauffeur-fleet-hero.webp')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / About Us */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">About us</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>About NYC Premier Chauffeur</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Driven by excellence. Defined by the details.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            For seven years, NYC Premier Chauffeur has delivered professional private transportation built around punctuality, comfort, safety, and attentive service.
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
          2. A REFINED STANDARD FOR BUSINESS TRAVEL
      ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text & 4 Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>COMMITTED TO EXCELLENCE</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              A refined standard for business travel.
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Discreet service, clear communication, clean vehicles, and a properly managed schedule create a transportation experience suitable for executives, clients, and important guests.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Discretion", desc: "Private service" },
                { title: "Timing", desc: "Schedule-focused planning" },
                { title: "Presentation", desc: "Premium vehicle standards" },
                { title: "Support", desc: "Clear communication" }
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
                  src="https://nycpremierlimo.com/wp-content/uploads/2026/09/professional-chauffeur-service-nyc-corporate-pickup.webp"
                  alt="Executive Transportation"
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
                      Executive transportation, on demand
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FLOATING TRUST STRIP (Overlapping White Card with 4 Columns)
      ========================================================================= */}
      <div className="-mt-8 sm:-mt-10 mb-16 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-black/5 py-6 px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                All-Inclusive Pricing
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Tolls and gratuity included
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Meet &amp; Greet
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                In-terminal pickup on request
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Tri-State Coverage
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                New York, New Jersey, Connecticut
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Rated 5 Stars
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Service trusted by riders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. OUR STORY ("A transportation company built around trust.")
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Framed Graphic with "7" Gold Badge */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] aspect-[4/5] sm:aspect-[1/1] w-full shadow-lg">
                {/* Large Gold "7" Number on Top Left */}
                <div className="absolute top-4 left-6 z-10 text-5xl sm:text-6xl font-serif font-bold text-[#e09900] drop-shadow-md">
                  7
                </div>

                <img
                  src="https://nycpremierlimo.com/wp-content/uploads/2026/09/nyc-premier-limo-chauffeur-waiting-our-story.webp"
                  alt="NYC Premier Chauffeur Waiting"
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 border border-white/10 text-left space-y-1">
                  <h5 className="font-serif font-bold text-white text-sm sm:text-base">
                    Years shaped by one clear standard.
                  </h5>
                  <p className="text-[12px] sm:text-xs text-zinc-300 leading-relaxed">
                    Every journey should feel prepared, professional, and effortless from the first call to the final drop-off.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>OUR STORY</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              A transportation company built around trust.
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              <p>
                NYC Premier Chauffeur began with a straightforward mission: raise the standard of private transportation in New York. Over seven years, that commitment has grown into a broader fleet and a complete range of airport, corporate, hourly, point-to-point, city-to-city, and event services.
              </p>
              <p>
                Growth has never changed the foundation of the business. Each booking is still reviewed around the route, timing, passengers, luggage, vehicle needs, and the small details that shape a smooth experience.
              </p>
            </div>

            {/* Two Quote / Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#e09900]">
                  Our Purpose
                </span>
                <p className="font-serif text-sm sm:text-base font-bold text-[#1D1D1B]">
                  Make important travel feel simple.
                </p>
              </div>

              <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#e09900]">
                  Our Approach
                </span>
                <p className="font-serif text-sm sm:text-base font-bold text-[#1D1D1B]">
                  Prepare carefully and communicate clearly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FOUR PRINCIPLES BEHIND EVERY RIDE
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>HOW WE OPERATE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Four principles behind every ride.
            </h2>
          </div>
          <p className="text-xs sm:text-[14px] text-zinc-500 font-normal max-w-md">
            Luxury is not only the vehicle. It is the quality of preparation, communication, presentation, and care throughout the journey.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Client Satisfaction",
              desc: "Every trip is judged on the rider's peace of mind, from initial booking confirmation to curbside drop-off."
            },
            {
              step: "02",
              title: "Safety First",
              desc: "Professional TLC licensing, defensive driver training, background checks, and regular vehicle inspections."
            },
            {
              step: "03",
              title: "Reliable Service",
              desc: "On-time arrival is our baseline standard, backed by live flight tracking and route monitoring."
            },
            {
              step: "04",
              title: "Continuous Improvement",
              desc: "We regularly update our fleet, refine dispatch workflows, and review rider feedback after every journey."
            }
          ].map((principle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-full bg-[#e09900]/15 text-[#e09900] font-bold text-xs flex items-center justify-center">
                {principle.step}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                {principle.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-600 font-normal leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. THE EXPERIENCE BEGINS BEFORE PICKUP (Dark Container with 3 Steps)
      ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111215] rounded-[32px] sm:rounded-[40px] border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
                <span className="w-8 h-[1.5px] bg-[#e09900]" />
                <span>WHAT SETS US APART</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.12]">
                The experience begins before pickup.
              </h2>
              <p className="text-xs sm:text-[14px] text-zinc-400 font-normal leading-relaxed">
                Reliable transportation depends on the work completed before the chauffeur arrives and the care maintained until the trip is finished.
              </p>
            </div>

            {/* Right 3 Step List with Horizontal Dividers */}
            <div className="lg:col-span-7 divide-y divide-white/10">
              {[
                {
                  step: "01",
                  title: "Plan the complete itinerary",
                  desc: "Give us the operating airline, flight number, date, passenger name, phone and destination so every segment is prepared."
                },
                {
                  step: "02",
                  title: "Prepare the vehicle and chauffeur",
                  desc: "The confirmed vehicle category and trip details are aligned with the requirements of the booking."
                },
                {
                  step: "03",
                  title: "Support the journey",
                  desc: "Clear pickup communication and responsive trip support help keep the experience smooth from beginning to end."
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
          7. PROFESSIONAL WHERE IT MATTERS MOST (2 Image Cards)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>THE STANDARD WE HOLD</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Professional where it matters most.
            </h2>
          </div>
          <p className="text-xs sm:text-[14px] text-zinc-500 font-normal max-w-md">
            A polished experience depends equally on the people providing the service and the vehicles carrying each passenger.
          </p>
        </div>

        {/* 2 Big Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Professional chauffeurs */}
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] aspect-[4/3] bg-black shadow-lg group">
            <img
              src="https://nycpremierlimo.com/wp-content/uploads/2026/09/professional-chauffeur-service-nyc-corporate-pickup.webp"
              alt="Professional Chauffeurs"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full bg-[#e09900] text-black font-bold text-xs flex items-center justify-center">
              01
            </div>
            {/* Bottom Gradient Card */}
            <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-1.5 text-left">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Professional chauffeurs
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                Courteous, licensed chauffeurs are expected to arrive prepared, present themselves professionally, and treat each itinerary with care and discretion.
              </p>
            </div>
          </div>

          {/* Card 2: Maintained fleet */}
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] aspect-[4/3] bg-black shadow-lg group">
            <img
              src="https://nycpremierlimo.com/wp-content/uploads/2026/09/professional-chauffeurs-maintained-fleet-nyc.webp"
              alt="Maintained Fleet"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full bg-[#e09900] text-black font-bold text-xs flex items-center justify-center">
              02
            </div>
            {/* Bottom Gradient Card */}
            <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-1.5 text-left">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Maintained fleet
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                Executive sedans, luxury SUVs, premium vans, and executive buses support different passenger, luggage, business, airport, and event requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FAQS SECTION ("Know the company behind your ride.")
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-8 h-[1.5px] bg-[#e09900]" />
              <span>ABOUT US FAQS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Know the company behind your ride.
            </h2>
          </div>
          <p className="text-xs sm:text-[14px] text-zinc-500 font-normal">
            Service availability, vehicle category, route details, and pricing are confirmed for each itinerary.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {[
            {
              q: "How long has NYC Premier Chauffeur been operating?",
              a: "NYC Premier Chauffeur brings seven years of professional private transportation experience to airport, business, hourly, event, and regional travel."
            },
            {
              q: "What areas does the company serve?",
              a: "Core coverage includes New York City, Nassau County, Suffolk County, and tri-state transportation. Exact availability is confirmed for the requested route."
            },
            {
              q: "What types of transportation are available?",
              a: "Services include airport transfers, corporate transportation, hourly chauffeur service, point-to-point rides, city-to-city travel, and transportation for special occasions."
            },
            {
              q: "What vehicles are in the fleet?",
              a: "The current fleet categories include executive sedans, luxury SUVs, premium vans, and executive buses. Final vehicle category depends on availability and trip requirements."
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
          9. PRE-FOOTER CTA ("Book your next trip with NYC Premier Limo.")
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
                READY TO RIDE
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.15] tracking-tight">
              Book your next trip with NYC Premier Chauffeur.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 leading-relaxed font-normal">
              Request a personalized quote online or speak directly with the team about airport, corporate, hourly, point-to-point, city-to-city, or special event transportation.
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

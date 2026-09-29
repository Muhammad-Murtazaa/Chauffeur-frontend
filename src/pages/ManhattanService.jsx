import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function ManhattanService() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur Mercedes S-Class Manhattan)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-service-park-avenue-hero.webp')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Areas We Serve / Manhattan */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <Link to="/areas-we-serve" className="hover:text-white transition">Areas We Serve</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Manhattan</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>Manhattan chauffeur service</span>
          </div>

          {/* Main Heading (Don't use Limo as instructed) */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Manhattan Car Service
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Private, chauffeur-driven car service in Manhattan &mdash; airport transfers, corporate schedules, hotels, Broadway, dining and events, plus direct rides anywhere in New York City. Reserved in advance, ready when you are.
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
                Licensed &amp; fully insured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. ITINERARY SECTION (Left framed image, Right content & 4 cards)
      ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Framed Graphic Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative p-2 rounded-[28px] sm:rounded-[36px] border border-zinc-800/40 bg-transparent shadow-sm max-w-md w-full">
              <div className="relative overflow-hidden rounded-[22px] sm:rounded-[30px] aspect-[4/5] sm:aspect-[1/1] w-full bg-black">
                <img
                  src="https://nycpremierlimo.com/wp-content/uploads/2026/08/ewr-limo-group-transfer-sprinter-van.webp"
                  alt="Manhattan Car Service"
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Overlapping Floating Card with Gold Tag & Bold White Title */}
                <div className="absolute bottom-3 inset-x-3 bg-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between gap-4">
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

          {/* Right Text & 4 Feature Cards Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>PRIVATE TRANSPORTATION IN MANHATTAN</span>
            </div>

            {/* Heading (Replacing 'limo' with 'car service' as instructed) */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              Manhattan car service<br className="hidden sm:inline" /> built around your<br className="hidden sm:inline" /> schedule
            </h2>

            {/* Description Paragraph with link */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Our Manhattan car service connects residences, hotels, airports, offices, venues, and restaurants through one planned itinerary &mdash; with a professional chauffeur handling the traffic, parking, and timing so you don&rsquo;t have to. Need to get from one address to another and nothing more? Book a straight{' '}
              <Link to="/point-to-point-limo-service" className="text-[#a21caf] hover:underline font-medium">
                point-to-point transfer
              </Link>{' '}
              instead.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Your itinerary", desc: "Planned stop by stop" },
                { title: "Pickup", desc: "Exact address and time confirmed" },
                { title: "Support", desc: "Reachable before and during your ride" },
                { title: "Flat Rate", desc: "Quoted and confirmed before booking" }
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
        </div>
      </section>

      {/* =========================================================================
          4. OUR FLEET ("Vehicles for Manhattan travel")
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>OUR FLEET</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
            Vehicles for Manhattan travel
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            See the full fleet with photographs, capacities, and interior detail on our fleet page.
          </p>
        </div>

        {/* 4 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              number: "01",
              title: "Executive Sedan",
              capacity: "up to 3 passengers, 3 suitcases",
              desc: "Ideal for solo travelers, couples, and executive airport transfers. Includes a leather interior, bottled water, phone charging, and flight monitoring.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-executive-sedan.webp",
              bookingParam: "sedan"
            },
            {
              number: "02",
              title: "Luxury SUV",
              capacity: "up to 6 passengers, 6 suitcases",
              desc: "A spacious choice for families, groups, and airport travel with luggage—perfect for comfortable rides across Manhattan.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-luxury-suv.webp",
              bookingParam: "suv"
            },
            {
              number: "03",
              title: "Executive Sprinter VIP",
              capacity: "up to 14 passengers",
              desc: "Designed for corporate groups, wedding parties, and airport transfers requiring generous passenger and luggage space.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-sprinter-van.webp",
              bookingParam: "sprinter"
            },
            {
              number: "04",
              title: "Executive Stretch Limousine",
              capacity: "up to 8 passengers",
              desc: "Ideal for luxury events, milestone galas, and VIP transportation between Manhattan hotels, venues, and airports.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/fleet-stretch-limo-lincoln-town-car-nyc-768x612.png",
              bookingParam: "stretch"
            }
          ].map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Vehicle Image with Top Left Number Badge */}
              <div className="relative aspect-[16/11] bg-zinc-100 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-[#e09900] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {vehicle.number}
                </div>
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#1D1D1B] tracking-tight">
                    {vehicle.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#e09900]">
                    {vehicle.capacity}
                  </div>
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed pt-1">
                    {vehicle.desc}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs font-medium">
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
                    View Fleet
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. MANHATTAN TRANSPORTATION SERVICES (4 visual category cards)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>MANHATTAN TRANSPORTATION SERVICES</span>
            </div>

            {/* Heading (avoiding emphasizing on limo) */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Manhattan chauffeur services for every trip
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              The right service depends on whether the trip is a direct transfer, airport journey, business itinerary, or flexible multi-stop experience.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Airport Transportation",
              link: "/airport-car-service-nyc",
              linkText: "Explore airport service →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-airport-transportation.webp",
              highlight: true
            },
            {
              title: "Corporate Travel",
              link: "/corporate-car-service-nyc",
              linkText: "Explore corporate car service →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-corporate-travel.webp",
              highlight: false
            },
            {
              title: "Hourly Chauffeur",
              link: "/hourly-car-service",
              linkText: "Explore hourly chauffeur service →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-hourly-chauffeur.webp",
              highlight: false
            },
            {
              title: "Weddings & Celebrations",
              link: "/special-occasions",
              linkText: "Explore wedding & event service →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-weddings-celebrations.webp",
              highlight: false
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={`group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-300 hover:shadow-xl ${
                item.highlight
                  ? "border-2 border-[#e09900]"
                  : "border border-black/10 hover:border-[#e09900]/60"
              }`}
            >
              {/* Background Photo */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 w-10 h-[3px] bg-[#e09900] rounded-full z-10" />

              {/* Dark Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Bottom Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-[#e09900] group-hover:text-white transition-colors flex items-center gap-1">
                  {item.linkText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. THINGS TO DO IN MANHATTAN (See Manhattan with a private chauffeur)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>THINGS TO DO IN MANHATTAN</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              See Manhattan with a private chauffeur
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Book an{' '}
              <Link to="/hourly-car-service" className="text-[#a21caf] hover:underline font-medium">
                hourly chauffeur
              </Link>{' '}
              and your vehicle stays with you all day. Move between landmarks, lunch, shopping, and your hotel without hailing a car or hunting for parking at every stop.
            </p>
          </div>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              number: "01",
              location: "CENTRAL MANHATTAN",
              title: "Central Park",
              desc: "Get dropped at the Fifth Avenue entrance, Bethesda Terrace or Tavern on the Green — then have your chauffeur meet you at the far side of the park when you have finished walking, instead of doubling back.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-central-park.webp",
              highlight: false
            },
            {
              number: "02",
              location: "MIDTOWN",
              title: "Times Square",
              desc: "Curbside pickup here is difficult at show time. We agree a set meeting point a block off the square, so you are not standing in the crowd trying to find your car.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-times-square.webp",
              highlight: true
            },
            {
              number: "03",
              location: "MIDTOWN",
              title: "Empire State Building",
              desc: "Observatory visits run long and often finish late. Your chauffeur waits nearby and pulls up when you come down — useful if you are heading straight to dinner or on to the airport.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-empire-state-building.webp",
              highlight: false
            },
            {
              number: "04",
              location: "UPPER EAST SIDE",
              title: "The Metropolitan Museum of Art",
              desc: "Drop off at the Fifth Avenue steps, then carry on along Museum Mile, into Central Park or to Upper East Side dining — all on the same booking, with no need to arrange a car again.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-metropolitan-museum.webp",
              highlight: false
            },
            {
              number: "05",
              location: "THEATER DISTRICT",
              title: "Broadway",
              desc: "We time your pickup to curtain-down, not to a guess. When 1,500 people leave the theatre at once and every app surges, your car is already where we said it would be.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-broadway-theatre.webp",
              highlight: false
            },
            {
              number: "06",
              location: "MIDTOWN",
              title: "Fifth Avenue",
              desc: "Shop without carrying anything. Your chauffeur keeps your bags in the vehicle and meets you between stores, so you are not walking Fifth Avenue with both hands full.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-fifth-avenue.webp",
              highlight: false
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:shadow-xl ${
                item.highlight
                  ? "border-2 border-[#e09900]"
                  : "border border-black/10 hover:border-[#e09900]/60"
              }`}
            >
              {/* Background Photo */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 w-10 h-[3px] bg-[#e09900] rounded-full z-10" />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 pointer-events-none" />

              {/* Top Row: Number on Left, Location on Right */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#e09900]">
                  {item.number}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                  {item.location}
                </span>
              </div>

              {/* Bottom Content: Title and Description */}
              <div className="relative z-10 space-y-2.5">
                <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-200/90 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. FAQ SECTION ("Clear answers before the ride.")
      ========================================================================= */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#e09900]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              MANHATTAN CAR SERVICE FAQS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B] leading-tight">
                Clear answers before the ride.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14px] text-[#6D685F] leading-relaxed">
                Availability, pickup instructions, vehicle category, route, inclusions, and pricing are confirmed for each itinerary.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion list with smooth slide transition */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {[
            {
              q: "Do you provide car and black car service throughout Manhattan?",
              a: "Yes — every Manhattan neighborhood, from the Financial District to Harlem. We pick up and drop off at hotels, private residences, offices, restaurants, venues, Penn Station, Grand Central, the cruise piers and all major airports."
            },
            {
              q: "Can I reserve a Manhattan airport transfer?",
              a: "Yes. We run private transfers between Manhattan and JFK, LaGuardia, Newark, Westchester County and Long Island MacArthur. Every airport booking includes live flight tracking, so your chauffeur adjusts automatically if you land early or late."
            },
            {
              q: "Is hourly chauffeur service suitable for sightseeing?",
              a: "It is the best option for it. Your chauffeur and vehicle stay with you for the full booking, so you can move between Central Park, Fifth Avenue, museums, lunch and your hotel without re-booking or waiting for a car at each stop."
            },
            {
              q: "Can you provide corporate transportation in Manhattan?",
              a: "Yes. We handle executive travel, client pickups, roadshows, conference shuttles, board meetings and recurring corporate accounts. Billing can be consolidated and repeat itineraries saved for faster booking."
            },
            {
              q: "Can the itinerary include several Manhattan stops?",
              a: "Yes. List every stop and any waiting time when you request your quote. For multi-stop or flexible plans we usually recommend hourly service — it works out simpler and often cheaper than booking separate transfers."
            },
            {
              q: "How do I receive an accurate Manhattan car service quote?",
              a: "Send us your exact pickup and destination addresses, date, time, any stops, passenger count, luggage count and preferred vehicle. We confirm a flat rate before you book."
            },
            {
              q: "How much does Manhattan car service cost?",
              a: "Pricing depends on the vehicle, trip type and duration. Airport transfers are flat-rate; sightseeing and multi-stop trips are charged hourly. Send your pickup, destination, date and stops for an exact quote. Every price is confirmed before you book, with no surge pricing."
            },
            {
              q: "How far in advance should I book in Manhattan?",
              a: "Same-day and next-day rides are often available, but we recommend booking 24 to 48 hours ahead for airport pickups, events and larger vehicles. Peak dates — holidays, graduations, Fashion Week and major events — fill fastest."
            },
            {
              q: "Do you offer service from Manhattan to other boroughs and states?",
              a: "Yes. We run direct trips from Manhattan to Brooklyn, Queens, the Bronx, Staten Island, Long Island, Westchester, New Jersey, Connecticut and further afield. Long-distance routes are quoted as city-to-city rides."
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

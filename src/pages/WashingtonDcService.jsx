import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function WashingtonDcService() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur Washington DC)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501466044931-62695aada8e9?auto=format&fit=crop&w=1920&q=80')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Areas We Serve / Washington DC */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <Link to="/areas-we-serve" className="hover:text-white transition">Areas We Serve</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Washington, DC</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>WASHINGTON DC CHAUFFEUR SERVICE</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Washington DC Car Service
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Executive, chauffeur-driven transportation across Washington D.C., Maryland, and Northern Virginia &mdash; airport transfers (DCA, IAD, BWI), diplomatic and government itineraries, Capitol Hill meetings, corporate roadshows, and intercity trips between NYC and D.C.
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
                DCA / IAD / BWI
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Live flight tracking & meet
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Protocol Ready
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Diplomatic & executive travel
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Private & Discreet
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                NDA & strict confidentiality
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Tri-State & NYC
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Direct city-to-city transfers
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
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                  alt="Washington DC Capitol Chauffeur Service"
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Overlapping Floating Card with Gold Tag & Bold White Title */}
                <div className="absolute bottom-3 inset-x-3 bg-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#e09900] leading-tight block">
                      Premier Chauffeur DC
                    </span>
                  </div>
                  <div className="text-right flex-1 pl-2">
                    <span className="font-bold text-white text-xs sm:text-sm leading-snug block">
                      Diplomatic & corporate precision
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
              <span>EXECUTIVE TRANSPORTATION IN WASHINGTON, D.C.</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              Washington D.C. chauffeur service<br className="hidden sm:inline" /> tailored to your<br className="hidden sm:inline" /> executive agenda
            </h2>

            {/* Description Paragraph with link */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Our Washington D.C. car service connects government agencies, embassies, corporate headquarters, luxury hotels, and airports throughout the District, Northern Virginia, and Maryland. Experience punctual navigation through K Street, Capitol Hill, and the Beltway. Traveling between Manhattan and D.C.? Book our private{' '}
              <Link to="/city-to-city-rides" className="text-[#a21caf] hover:underline font-medium">
                city-to-city long distance service
              </Link>{' '}
              for non-stop door-to-door comfort.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Protocol Itineraries", desc: "Coordinated stop by stop for seamless arrivals" },
                { title: "Airport Flight Radar", desc: "Live tracking for DCA, IAD Dulles & BWI" },
                { title: "Dedicated Support", desc: "24/7 direct dispatch manager oversight" },
                { title: "All-Inclusive Rates", desc: "Fixed quotes with tolls & gratuity confirmed" }
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
          4. OUR FLEET ("Vehicles for Washington DC travel")
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
            Vehicles for Washington DC travel
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            See the full fleet with photographs, capacities, and interior specifications on our fleet page.
          </p>
        </div>

        {/* 4 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              number: "01",
              title: "Executive Sedan",
              capacity: "up to 3 passengers, 3 suitcases",
              desc: "Perfect for government officials, diplomats, and business roadshows. Includes tinted privacy windows, Wi-Fi, and complimentary bottled water.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-executive-sedan.webp",
              bookingParam: "sedan"
            },
            {
              number: "02",
              title: "Luxury SUV",
              capacity: "up to 6 passengers, 6 suitcases",
              desc: "A spacious, commanding choice for executive delegations, families, and airport transfers to Dulles (IAD) and DCA.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-luxury-suv.webp",
              bookingParam: "suv"
            },
            {
              number: "03",
              title: "Executive Sprinter VIP",
              capacity: "up to 14 passengers",
              desc: "Custom VIP lounge cabin with leather captain chairs, workspace tables, and generous luggage capacity for delegations and group itineraries.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-sprinter-van.webp",
              bookingParam: "sprinter"
            },
            {
              number: "04",
              title: "Executive Stretch Limousine",
              capacity: "up to 8 passengers",
              desc: "Ideal for inaugural galas, embassy receptions, charity galas, and VIP celebrations throughout the Washington metropolitan area.",
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
          5. WASHINGTON DC TRANSPORTATION SERVICES (4 visual category cards)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>WASHINGTON DC TRANSPORTATION SERVICES</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              D.C. chauffeur services for every mission
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Tailored services for airport connections, diplomatic summits, corporate roadshows, and landmark sightseeing across the capital region.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "DCA & Dulles Airport Transfers",
              link: "/airport-car-service",
              linkText: "Explore airport transfers →",
              image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
              highlight: true
            },
            {
              title: "Diplomatic & Corporate Travel",
              link: "/corporate-limo-service",
              linkText: "Explore corporate service →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-corporate-travel.webp",
              highlight: false
            },
            {
              title: "Hourly Chauffeur Standby",
              link: "/hourly-car-service",
              linkText: "Explore hourly service →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-hourly-chauffeur.webp",
              highlight: false
            },
            {
              title: "NYC to D.C. Intercity Rides",
              link: "/city-to-city-rides",
              linkText: "Explore city-to-city rides →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/City-To-City-Rides-1024x683.jpg",
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
          6. THINGS TO DO IN WASHINGTON DC (See D.C. with a private chauffeur)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>KEY DISTRICT LANDMARKS</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Explore Washington D.C. in absolute comfort
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Reserve an{' '}
              <Link to="/hourly-car-service" className="text-[#a21caf] hover:underline font-medium">
                hourly chauffeur
              </Link>{' '}
              to move between the National Mall, Capitol Hill, Georgetown, and embassy receptions without the frustration of restricted parking and high-security traffic.
            </p>
          </div>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              number: "01",
              location: "CAPITOL HILL",
              title: "U.S. Capitol & Senate Offices",
              desc: "Direct drop-offs at authorized visitor security points and congressional office buildings with seamless chauffeur coordination between hearings and committee meetings.",
              image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "02",
              location: "PENNSYLVANIA AVE",
              title: "The White House & Downtown",
              desc: "Navigating restricted security zones along Pennsylvania Avenue, Lafayette Square, and the Treasury Department with seasoned, protocol-conscious chauffeurs.",
              image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
              highlight: true
            },
            {
              number: "03",
              location: "NATIONAL MALL",
              title: "Smithsonian & Monuments",
              desc: "Enjoy private monument illumination tours by night — visiting the Lincoln Memorial, Washington Monument, and World War II Memorial with your car on standby.",
              image: "https://images.unsplash.com/photo-1570535282766-3d237efb2ee6?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "04",
              location: "NORTHWEST D.C.",
              title: "Georgetown & M Street",
              desc: "Cobblestone streets and historic townhouses make parking nearly impossible. Your chauffeur handles the driving while you dine at iconic restaurants and browse M Street boutiques.",
              image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "05",
              location: "MASSACHUSETTS AVE",
              title: "Embassy Row & Dupont Circle",
              desc: "Discreet transportation for diplomatic receptions, international delegation summits, and bilateral dinners along Embassy Row and Kalorama.",
              image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "06",
              location: "FOGGY BOTTOM",
              title: "The Kennedy Center",
              desc: "Arrive at the grand plaza for ballet, symphony, and theatrical performances with guaranteed curtain-down chauffeur pick-up right at the VIP carriage entrance.",
              image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
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
              WASHINGTON DC CAR SERVICE FAQS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B] leading-tight">
                Clear answers before your journey.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14px] text-[#6D685F] leading-relaxed">
                Reliable airport connections, diplomatic security standards, hourly itineraries, and flat-rate pricing confirmed prior to departure.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion list with smooth slide transition */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {[
            {
              q: "Which airports in the D.C. area do you service?",
              a: "We provide 24/7 private transfers to Ronald Reagan Washington National Airport (DCA), Washington Dulles International Airport (IAD), and Baltimore/Washington International Thurgood Marshall Airport (BWI), complete with real-time flight tracking and optional inside meet-and-greet."
            },
            {
              q: "Can I book a direct private car from New York City to Washington D.C.?",
              a: "Yes! Our city-to-city service offers door-to-door luxury travel between any NYC address (Manhattan, Brooklyn, JFK, etc.) and Washington D.C. Enjoy quiet mobile workspace, Wi-Fi, and custom rest stops without the stress of Amtrak or regional flights."
            },
            {
              q: "Do you accommodate diplomatic delegations and government itineraries?",
              a: "Absolutely. Our chauffeurs have extensive experience operating within high-security zones, embassy venues, and government office complexes, maintaining absolute confidentiality, NDAs, and strict adherence to protocol."
            },
            {
              q: "How does hourly chauffeur service work in Washington D.C.?",
              a: "With hourly service, your vehicle and professional chauffeur remain exclusively assigned to you for the duration of your reservation. You can make unlimited stops across Capitol Hill, Downtown, Georgetown, and Northern Virginia with immediate departures whenever you are ready."
            },
            {
              q: "Are tolls, airport fees, and gratuity included in the quote?",
              a: "Yes. Every quote provided is all-inclusive and confirmed upfront with no hidden fees, dynamic surge charges, or unexpected meter rates."
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
          {/* Ambient warm gold glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[#e09900]/15 rounded-full blur-3xl" />

          {/* Left Content */}
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#e09900]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#e09900]">
                CAPITAL REGION CHAUFFEUR
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight">
              Book your Washington D.C. chauffeur experience.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 leading-relaxed font-normal">
              Get an instant quote online or contact our dispatch team 24/7 for airport transfers, government roadshows, embassy events, and city-to-city travel.
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

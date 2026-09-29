import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function BarcelonaService() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur Barcelona, Spain)
      ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] pt-16 pb-28 sm:pb-36 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1920&q=80')` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Areas We Serve / Barcelona */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <Link to="/areas-we-serve" className="hover:text-white transition">Areas We Serve</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Barcelona, Spain</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>BARCELONA CHAUFFEUR SERVICE</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
            Barcelona Car Service
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Private, luxury chauffeur service in Barcelona &mdash; Josep Tarradellas Barcelona-El Prat Airport (BCN) transfers, Mobile World Congress & corporate summits, cruise port transfers at Port de Barcelona, architectural tours, and scenic Mediterranean excursions along Costa Brava and Sitges.
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
                BCN Airport
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Flight radar monitoring & meet
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Port & Cruise
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Direct shipside pier access
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Multilingual
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                English & Spanish chauffeurs
              </p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-zinc-200">
              <h4 className="font-bold text-base sm:text-lg text-[#1D1D1B] tracking-tight">
                Catalonia & Coast
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-500 font-normal">
                Costa Brava & Sitges tours
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
                  src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80"
                  alt="Barcelona Chauffeur Service Passeig de Gracia"
                  className="w-full h-full object-cover object-center"
                />

                {/* Bottom Overlapping Floating Card with Gold Tag & Bold White Title */}
                <div className="absolute bottom-3 inset-x-3 bg-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#e09900] leading-tight block">
                      Premier Chauffeur Europe
                    </span>
                  </div>
                  <div className="text-right flex-1 pl-2">
                    <span className="font-bold text-white text-xs sm:text-sm leading-snug block">
                      Mediterranean luxury standards
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
              <span>PRIVATE TRANSPORTATION IN BARCELONA</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1B] tracking-tight leading-[1.15]">
              Barcelona chauffeur service<br className="hidden sm:inline" /> designed around your<br className="hidden sm:inline" /> European schedule
            </h2>

            {/* Description Paragraph with link */}
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Whether landing at BCN Airport Terminal 1 or 2, docking at the Moll d'Adossat cruise terminals, or attending Fira de Barcelona conventions, our multilingual chauffeurs ensure flawless navigation through Barcelona's vibrant avenues. Explore Catalan landmarks or travel south to Sitges on a customized{' '}
              <Link to="/hourly-car-service" className="text-[#a21caf] hover:underline font-medium">
                hourly chauffeur reservation
              </Link>.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Custom Itineraries", desc: "Planned seamlessly from Gothic Quarter to Costa Brava" },
                { title: "BCN Airport Radar", desc: "Live terminal tracking with meet & greet at baggage exit" },
                { title: "Cruise Pier Drop-Off", desc: "Authorized access right at your cruise ship gangway" },
                { title: "Guaranteed Flat Rates", desc: "All tolls, parking fees & gratuity confirmed upfront" }
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
          4. OUR FLEET ("Vehicles for Barcelona travel")
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
            Vehicles for Barcelona travel
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[14px] text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            See the full luxury fleet with photographs, passenger capacities, and luggage specifications on our fleet page.
          </p>
        </div>

        {/* 4 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              number: "01",
              title: "Executive Sedan",
              capacity: "up to 3 passengers, 3 suitcases",
              desc: "Premium Mercedes-Benz E-Class & S-Class sedans with climate control, leather upholstery, Wi-Fi, and cold mineral water.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-executive-sedan.webp",
              bookingParam: "sedan"
            },
            {
              number: "02",
              title: "Luxury SUV",
              capacity: "up to 6 passengers, 6 suitcases",
              desc: "Spacious luxury SUVs ideal for cruise transfers with voluminous luggage, families, and long-distance day trips to Girona.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-luxury-suv.webp",
              bookingParam: "suv"
            },
            {
              number: "03",
              title: "Executive Sprinter VIP",
              capacity: "up to 14 passengers",
              desc: "Custom Mercedes-Benz Sprinter with executive leather club seating, panoramic windows, and luggage hold for delegations and bridal parties.",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-fleet-sprinter-van.webp",
              bookingParam: "sprinter"
            },
            {
              number: "04",
              title: "Executive Stretch Limousine",
              capacity: "up to 8 passengers",
              desc: "Celebrate gala evenings, weddings in Sitges, and VIP arrivals at Port Olímpic with state-of-the-art stretch luxury.",
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
          5. BARCELONA TRANSPORTATION SERVICES (4 visual category cards)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>BARCELONA TRANSPORTATION SERVICES</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Chauffeur solutions across Catalonia
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              From airport and cruise terminal transfers to congress logistics and private wine tours in Penedès.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "BCN Airport Transfers",
              link: "/airport-car-service",
              linkText: "Explore BCN airport service →",
              image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
              highlight: true
            },
            {
              title: "MWC & Corporate Summits",
              link: "/corporate-limo-service",
              linkText: "Explore corporate services →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-corporate-travel.webp",
              highlight: false
            },
            {
              title: "Hourly Private Sightseeing",
              link: "/hourly-car-service",
              linkText: "Explore hourly chauffeur →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/manhattan-limo-hourly-chauffeur.webp",
              highlight: false
            },
            {
              title: "Penedès & Costa Brava Tours",
              link: "/winery-tour-limo-service",
              linkText: "Explore scenic wine tours →",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/09/winery-tour-chauffeur-waiting-vineyard-terrace.webp",
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
          6. THINGS TO DO IN BARCELONA (See Barcelona with a private chauffeur)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title on Left, Subtitle on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-5 h-[1.5px] bg-[#e09900]" />
              <span>BARCELONA & CATALONIA HIGHLIGHTS</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1B] tracking-tight leading-[1.12]">
              Discover Barcelona in effortless elegance
            </h2>
          </div>

          {/* Right Text */}
          <div className="max-w-md pb-1">
            <p className="text-sm sm:text-[15px] text-zinc-600 font-normal leading-relaxed">
              Enjoy door-to-door access to Gaudí masterpieces, Michelin-starred culinary destinations, luxury boutiques, and the Mediterranean coastline with your dedicated chauffeur on standby.
            </p>
          </div>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {[
            {
              number: "01",
              location: "EIXAMPLE DISTRICT",
              title: "Sagrada Família & Gaudí Works",
              desc: "Skip parking queues and crowded buses. Your chauffeur drops you directly by the Nativity Façade and waits to transport you onwards to Park Güell without delay.",
              image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "02",
              location: "LUXURY BOULEVARD",
              title: "Passeig de Gràcia",
              desc: "World-class shopping at Loewe, Chanel, and Hermès, framed by Casa Batlló and Casa Milà (La Pedrera). Your chauffeur stores your purchases between boutiques.",
              image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
              highlight: true
            },
            {
              number: "03",
              location: "HISTORIC CENTER",
              title: "Gothic Quarter & Born",
              desc: "Cobblestone alleys lead to hidden tapas sanctuaries and the Barcelona Cathedral. We arrange convenient meeting points along Via Laietana for stress-free pickups.",
              image: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "04",
              location: "MEDITERRANEAN COAST",
              title: "Port Olímpic & W Barcelona",
              desc: "Experience seaside seafood dining and yacht marina strolls at Port Vell and Barceloneta, followed by sunset cocktails overlooking the Mediterranean.",
              image: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "05",
              location: "SCENIC HILLTOP",
              title: "Montjuïc & Palau Nacional",
              desc: "Panoramic skyline views overlooking the city and harbour, with direct chauffeur drop-off at the Joan Miró Foundation and the Olympic Stadium.",
              image: "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=800&q=80",
              highlight: false
            },
            {
              number: "06",
              location: "COASTAL EXCURSIONS",
              title: "Sitges & Costa Brava",
              desc: "Take an unforgettable day trip along the Garraf cliffs to the picturesque coastal town of Sitges, or venture north to the secluded coves of Begur and Cadaqués.",
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
              BARCELONA CHAUFFEUR FAQS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B] leading-tight">
                Clear answers before your European journey.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14px] text-[#6D685F] leading-relaxed">
                Airport pick-up instructions, cruise ship access, multilingual drivers, and fixed pricing confirmed upfront.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion list with smooth slide transition */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {[
            {
              q: "How does airport pickup work at Barcelona-El Prat (BCN)?",
              a: "Your chauffeur tracks your incoming flight in real time and waits inside the arrival terminal (Terminal 1 or Terminal 2) holding a personalized name board, assisting with all luggage to your private vehicle."
            },
            {
              q: "Can you provide pick-up directly at Port de Barcelona cruise terminals?",
              a: "Yes. Our vehicles hold official port permits, allowing authorized pick-up directly at your cruise ship gangway (Moll d'Adossat / World Trade Center terminals) for direct hotel or airport transfers."
            },
            {
              q: "Do your chauffeurs speak English?",
              a: "Yes. All our executive chauffeurs serving international travelers are fluent in English and Spanish, providing courteous, professional assistance throughout your stay in Catalonia."
            },
            {
              q: "Can I book day trips from Barcelona to Montserrat, Sitges, or Girona?",
              a: "Yes. We offer dedicated hourly and full-day private charters with customized itineraries to Montserrat Monastery, Penedès vineyards, Sitges, Girona, and the Costa Brava."
            },
            {
              q: "Are highway tolls and taxes included in the reservation price?",
              a: "Yes. Every quotation is all-inclusive, covering Spanish VAT, autopista highway tolls, airport parking fees, and driver gratuity with zero surprise surcharges."
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
                BARCELONA LUXURY CHAUFFEUR
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight">
              Experience Barcelona with first-class private transportation.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 leading-relaxed font-normal">
              Request an instant quote online or connect with our international reservations desk for BCN Airport, cruise ports, corporate summits, and private excursions.
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

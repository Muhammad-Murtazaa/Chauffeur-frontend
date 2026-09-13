import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Star, 
  Plus, 
  Minus, 
  ArrowUpRight 
} from 'lucide-react';

export default function Home() {
  // Reviews carousel state
  const [reviewIdx, setReviewIdx] = useState(0);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  const reviews = [
    {
      name: "Michelle Diefenderfer",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWuZ1tm8my5pp-P6QcMSMSMIxE-VTaQvmy7x93NVRLn_GUxkE38=w64-h64-c-rp-mo-br100",
      text: "NYC Premier Limo provided great rates, quick responses, and were on top of everything for our group with short notice. I'd definitely use them again in future!"
    },
    {
      name: "Tina Belanger",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVOkDzcfXCZk7RgPsjP3BrNc9MCKfFliz8PbnbG1MzQxfNVf28=w64-h64-c-rp-mo-br100",
      text: "Our driver was timely and drove us safely to our destination. Our driver was very nice and professional. The van was beautiful as well. Highly recommend."
    },
    {
      name: "Shaina Godfrey",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWuZ1tm8my5pp-P6QcMSMSMIxE-VTaQvmy7x93NVRLn_GUxkE38=w64-h64-c-rp-mo-br100",
      text: "I would definitely recommend NYC Premier Limo to my family and friends as well as use their services again. It was easy to book the service. If I had any questions, customer service was always available to provide answers. My driver, Mrs. Khan was very understanding and stayed in contact with me to ensure a successful pick up and drop off."
    },
    {
      name: "Brandy Famous",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVOkDzcfXCZk7RgPsjP3BrNc9MCKfFliz8PbnbG1MzQxfNVf28=w64-h64-c-rp-mo-br100",
      text: "Professional and courteous driver was on time and the car was just as advertised I will be using them again."
    },
    {
      name: "Grant Patterson",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWuZ1tm8my5pp-P6QcMSMSMIxE-VTaQvmy7x93NVRLn_GUxkE38=w64-h64-c-rp-mo-br100",
      text: "NYC Premier Limousines provided top-quality transportation. Comfortable ride, punctual service, and overall great value."
    }
  ];

  const faqs = [
    {
      q: "How do I book a ride?",
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
      q: "Do you offer flat rates or hourly?",
      a: "Both. Flat rates apply to airport and point-to-point transfers; hourly charters suit multi-stop and corporate travel. The quote is what you pay."
    },
    {
      q: "Can I book for weddings or special occasions?",
      a: "Yes. We arrange transportation for weddings, proms, anniversaries and other occasions, with vehicles to match the day."
    }
  ];

  const nextReviews = () => {
    setReviewIdx((prev) => (prev + 1) % (reviews.length - 2));
  };
  const prevReviews = () => {
    setReviewIdx((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  return (
    <div className="font-sans text-[#1D1D1B] bg-[#F9F7F2]">
      
      {/* =========================================================================
          1. HERO SECTION (Dark / Luxury City Street Background)
      ========================================================================= */}
      <section className="relative min-h-[560px] lg:min-h-[620px] flex items-center justify-center text-center px-4 sm:px-6 pt-16 pb-20 bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/08/hero-nyc-limousine-service-chauffeur-manhattan-1-1536x864.webp')` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] font-medium tracking-wide text-[#e09900]">
            <span>&mdash;</span>
            <span>Serving NYC &amp; the Tri-State Area</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[62px] font-bold tracking-tight leading-[1.12] max-w-4xl mx-auto">
            <span className="text-white">Luxury Limo </span>
            <span className="text-[#e09900]">&amp; Chauffeur Service in</span>
            <span className="block text-[#e09900] mt-1">NYC</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Chauffeured airport transfers, corporate car service, hourly hire and point-to-point rides across New York, New Jersey and Connecticut — flat rates confirmed before you travel, 24/7 dispatch, no surge pricing.
          </p>

          {/* Two Buttons: Call & Get A Quote */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c98600] text-black font-semibold text-sm px-7 py-3 rounded-full transition-colors shadow-sm"
            >
              Call (347) 888-9797
            </a>
            <Link
              to="/reservations"
              className="border border-white text-white hover:bg-white hover:text-black font-medium text-sm px-7 py-3 rounded-full transition-colors flex items-center gap-2"
            >
              <span>Get A Quote</span>
              <span className="text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STATS / TRUST STRIP (Crisp Full-Width White Bar with Vertical Dividers)
      ========================================================================= */}
      <section className="w-full bg-white border-b border-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6">
            {[
              { num: "01", title: "Flight Tracking", desc: "We watch your flight and adjust pickup" },
              { num: "02", title: "All-Inclusive Pricing", desc: "Tolls and gratuity included" },
              { num: "03", title: "Meet & Greet", desc: "In-terminal pickup on request" },
              { num: "04", title: "Tri-State Coverage", desc: "New York, New Jersey, Connecticut" },
              { num: "05", title: "5 Star Rated", desc: "Service trusted by riders" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-3 px-3 sm:px-5 ${
                  i === 4 ? 'col-span-2 md:col-span-1' : ''
                } ${
                  i > 0 ? 'md:border-l md:border-zinc-200' : ''
                }`}
              >
                <span className="font-serif font-bold text-[#e09900] text-sm pt-0.5 shrink-0">
                  {stat.num}
                </span>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="font-bold text-[13px] sm:text-[14px] text-zinc-900 tracking-tight leading-tight whitespace-nowrap">
                    {stat.title}
                  </h4>
                  <p className="text-[11px] sm:text-[12px] text-zinc-500 leading-snug">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. REVIEWS SECTION (Trustindex Google Carousel on Warm Cream)
      ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative">
          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(reviewIdx, reviewIdx + 3).map((rev, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition text-left"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1D1D1B] leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-[11px] text-[#6D685F] leading-snug mt-0.5">
                        Trustindex verifies Google review
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#e09900] text-[#e09900]" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-[13px] text-[#46423B] leading-relaxed line-clamp-4">
                    "{rev.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={prevReviews}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 transition hidden md:flex"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextReviews}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 transition hidden md:flex"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Verified by Trustindex badge link */}
        <div className="text-right mt-4 pr-1">
          <a
            href="https://www.trustindex.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#147a3e] hover:underline"
          >
            <span>Verified by Trustindex</span>
            <span className="text-[10px] bg-[#147a3e]/10 px-2 py-0.5 rounded">4.9 ★★★★★</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          4. SERVICES SECTION: "NYC Chauffeur Service — Six Ways We Move You"
      ========================================================================= */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#e09900] mb-3">
              &mdash; WHAT WE DO
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-black leading-[1.15]">
              NYC Chauffeur Service<br />
              &mdash; Six Ways We Move You
            </h2>
          </div>
          <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-sm lg:pb-1">
            One standard of service across every trip &mdash; from the airport curb to the boardroom door to the big night out.
          </p>
        </div>

        {/* 2x3 Photographic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {[
            {
              num: "01",
              title: "Airport Transportation",
              desc: "Private transfers to JFK, LaGuardia, Newark and Teterboro with flight tracking and flat-rate pricing.",
              link: "/airport-car-service",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/airport-limo-service-chauffeur-loading-luggage.webp"
            },
            {
              num: "02",
              title: "Corporate Transportation",
              desc: "Discreet, punctual travel for executives, client pickups, roadshows and conferences.",
              link: "/corporate-limo-service",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/alt-corporate-car-service-chauffeur-door.webp"
            },
            {
              num: "03",
              title: "Hourly Chauffeur",
              desc: "A car and chauffeur reserved for a block of time — the vehicle waits with you between stops, so a full day of meetings is one booking, not six.",
              link: "/hourly-car-service",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/hourly-chauffeur-service-nyc-hotel-door-service.webp"
            },
            {
              num: "04",
              title: "Point-to-Point",
              desc: "One pickup, one destination, one fixed price agreed before you travel. Direct rides between homes, hotels, offices, and venues.",
              link: "/point-to-point-limo-service",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/point-to-point-car-service-soho-passenger-pickup-1024x683.webp"
            },
            {
              num: "05",
              title: "City-to-City Rides",
              desc: "Private long-distance travel from NYC to Boston, Philadelphia, D.C., the Hamptons and beyond.",
              link: "/city-to-city-rides",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/city-to-city-car-service-manhattan-skyline-highway.webp"
            },
            {
              num: "06",
              title: "Special Occasions",
              desc: "Weddings, proms, anniversaries and milestones — arrivals worth remembering",
              link: "/special-occasions",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/special-occasion-limo-service-red-carpet-arrival.webp"
            }
          ].map((item, idx) => (
            <Link 
              key={idx}
              to={item.link}
              className="group relative h-[430px] sm:h-[450px] overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 shadow-md hover:shadow-2xl"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25" />

              {/* Top: Gold Number */}
              <div className="relative z-10">
                <span className="font-serif font-bold text-base sm:text-lg text-[#e09900] tracking-wide">
                  {item.num}
                </span>
              </div>

              {/* Bottom: Title, Description, and Link */}
              <div className="relative z-10 text-white space-y-2.5">
                <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-zinc-200 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e09900] group-hover:text-white transition-colors">
                    <span>Explore service</span>
                    <span className="text-sm leading-none">&nearr;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. FLEET SECTION: "Our Luxury Fleet — Sedans, SUVs & Sprinter Limousines"
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#e09900]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              THE FLEET
            </span>
            <span className="w-8 h-[1px] bg-[#e09900]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1B] leading-tight">
            Our Luxury Fleet — Sedans, SUVs & Sprinter Limousines
          </h2>
          <p className="text-[15px] text-[#6D685F] leading-relaxed">
            From executive sedans to 55-passenger coaches, our luxury fleet is matched to your party size, luggage, and occasion — every vehicle detailed and chauffeur-driven.
          </p>
        </div>

        {/* 2x2 Grid of 4 White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              categoryBadge: "SEDAN",
              classTag: "Executive class",
              title: "Premium Sedan",
              passengers: "3 Passengers",
              luggage: "3 Luggage",
              service: "Professionally chauffeured",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Premium-Sedan.webp"
            },
            {
              categoryBadge: "SUV",
              classTag: "First class",
              title: "Premium SUV",
              passengers: "6 Passengers",
              luggage: "6 Luggage",
              service: "Professionally chauffeured",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Premium-SUV.webp"
            },
            {
              categoryBadge: "SPRINTER",
              classTag: "Group class",
              title: "Sprinter Van",
              passengers: "14 Passengers",
              luggage: "14 Luggage",
              service: "Professionally chauffeured",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Sprinter-Van.webp"
            },
            {
              categoryBadge: "BUS",
              classTag: "Group class",
              title: "Charter Bus",
              passengers: "55 Passengers",
              luggage: "55 Luggage",
              service: "Professionally chauffeured",
              image: "https://nycpremierlimo.com/wp-content/uploads/2026/08/Charter-Bus.webp"
            }
          ].map((veh, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with category badge */}
                <div className="relative aspect-[16/10] bg-neutral-100 flex items-center justify-center p-4">
                  <img
                    src={veh.image}
                    alt={veh.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4 bg-[#1D1D1B] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {veh.categoryBadge}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 space-y-3 text-left">
                  <div className="text-[12px] font-bold text-[#6D685F] uppercase tracking-wider">
                    {veh.classTag}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1D1B]">
                    {veh.title}
                  </h3>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[13px] text-[#46423B] font-medium border-t border-neutral-100">
                    <div>{veh.passengers}</div>
                    <div>{veh.luggage}</div>
                    <div className="col-span-2 text-[#6D685F]">{veh.service}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-neutral-100 mt-2">
                <Link
                  to="/reservations"
                  className="bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs px-6 py-3 rounded-full text-center transition"
                >
                  Book now
                </Link>
                <Link
                  to="/fleet"
                  className="text-xs font-bold text-[#1D1D1B] hover:text-[#e09900] text-center transition py-2"
                >
                  View the Full Fleet →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. AIRPORT SECTION (High-Contrast Jet Black Block)
      ========================================================================= */}
      <section className="bg-[#000000] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top Two-Column Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#e09900]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
                  AIRPORT TRANSPORTATION
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Three airports. One car service that knows all of them.
              </h2>
              <p className="text-[15px] text-white/80 leading-relaxed max-w-xl">
                We watch your flight from the moment it pushes back. Land early and we’re already there; land three hours late and nothing changes for you except the time we pull up.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* 6-item checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-white/90">
                {[
                  "Live flight tracking on every arrival",
                  "Complimentary wait time after landing",
                  "Luggage handled at both ends",
                  "Meet-and-greet in the terminal",
                  "Departures timed to check-in",
                  "One chauffeur, start to finish"
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#e09900] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/airport-car-service"
                  className="inline-block bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs px-7 py-3.5 rounded-full transition"
                >
                  Book Airport Transfer
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Dark Airport Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                badge: "JFK",
                title: "JFK Car Service",
                subtitle: "Queens · All terminals",
                desc: "International arrivals, long-haul departures, and rides on to Manhattan, Brooklyn or the Hamptons.",
                link: "/jfk-airport-limo-service"
              },
              {
                badge: "LGA",
                title: "LaGuardia Car Service",
                subtitle: "Queens · Terminals A–C",
                desc: "Closest airport to Midtown. Under 30 minutes when the pickup is timed right — much longer when it isn’t.",
                link: "/lga-airport-limo-service"
              },
              {
                badge: "EWR",
                title: "Newark Car Service",
                subtitle: "New Jersey · Terminals A–C",
                desc: "Cross-Hudson transfers routed around tunnel traffic, with pickup timed to your actual landing.",
                link: "/ewr-airport-limo-service"
              }
            ].map((ap, idx) => (
              <div
                key={idx}
                className="bg-[#11161D] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#e09900]/50 transition duration-300"
              >
                <div className="space-y-3">
                  <div className="inline-block bg-[#e09900] text-black text-xs font-bold px-2.5 py-1 rounded-md">
                    {ap.badge}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {ap.title}
                  </h3>
                  <div className="text-[12px] font-medium text-white/60">
                    {ap.subtitle}
                  </div>
                  <p className="text-[13px] text-white/75 leading-relaxed">
                    {ap.desc}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    to={ap.link}
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-[#e09900] hover:underline"
                  >
                    <span>Explore service</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CORPORATE SECTION (Warm Cream Background)
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        {/* Top Two-Column Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#e09900]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
                CORPORATE TRAVEL
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1B] leading-tight">
              Your team doesn't move. Neither do we.
            </h2>
            <p className="text-[15px] text-[#6D685F] leading-relaxed max-w-xl">
              Corporate travel is judged on the days that go sideways. We hold the car when the meeting runs over, we know which building entrances work at 8am, and we brief the chauffeur on the itinerary before the first pickup. Book once and everything between the first stop and the last drop is handled.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* 6-item corporate checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#46423B]">
              {[
                "Vetted, background-checked chauffeurs",
                "Wait time held when meetings overrun",
                "Dedicated account manager",
                "One chauffeur, all day",
                "Saved traveller profiles",
                "Consolidated monthly invoicing"
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#e09900] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/corporate-limo-service"
                className="inline-block bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs px-7 py-3.5 rounded-full transition"
              >
                Book Corporate Travel
              </Link>
            </div>
          </div>
        </div>

        {/* 3 White Corporate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              badge: "01",
              title: "Corporate Car Service",
              subtitle: "Sedan or SUV · Per trip",
              desc: "Transfers for staff, partners and visiting clients, including airport pickups for guests new to the city.",
              link: "/corporate-limo-service"
            },
            {
              badge: "02",
              title: "Hourly Chauffeur Service",
              subtitle: "Hourly · One chauffeur",
              desc: "One booking across offices, meetings, hotels and airports. The car stays with you between stops.",
              link: "/hourly-car-service"
            },
            {
              badge: "03",
              title: "Open an Account",
              subtitle: "Monthly billing · Invoiced",
              desc: "Streamlined billing and saved profiles for teams that travel often. One invoice, one point of contact.",
              link: "/contact-us"
            }
          ].map((corp, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="inline-block bg-[#e09900] text-black text-xs font-bold px-2.5 py-1 rounded-md">
                  {corp.badge}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                  {corp.title}
                </h3>
                <div className="text-[12px] font-medium text-[#6D685F]">
                  {corp.subtitle}
                </div>
                <p className="text-[13px] text-[#46423B] leading-relaxed">
                  {corp.desc}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to={corp.link}
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-[#e09900] hover:underline"
                >
                  <span>Explore service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. STATEMENT & TWO FEATURED CALLOUT COLLAGES
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 border-t border-neutral-200/60">
        {/* Editorial Statement Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#e09900]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
                NYC & TRI-STATE AREA CHAUFFEUR
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1B] leading-tight">
              Luxury Black Car Service Across NY, NJ & CT
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[15px] text-[#6D685F] leading-relaxed">
              A 5 am run to JFK, a <Link to="/manhattan-limo-service" className="text-[#e09900] underline">Broadway night out</Link>, a wedding, a private ride to the Hamptons — you tell us the trip, we assign the right vehicle and chauffeur, and we agree on the price before anyone gets in the car. No meter, no surge, no waiting on the curb. Late-model luxury sedans, full-size SUVs, executive Sprinter vans, and charter coaches, across the five boroughs and the tri-state area, 24 hours a day.
            </p>
          </div>
        </div>

        {/* Callout 1: Professional Limousine Service with Photo Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Image with Inset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10]">
              <img
                src="https://nycpremierlimo.com/wp-content/uploads/2026/08/professional-limousine-service-fleet-lineup-nyc-1024x576.webp"
                alt="Professional Limousine Service"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#e09900] text-black text-xs font-bold px-3 py-1 rounded-md">
                Every chauffeur, every ride
              </div>
            </div>
            {/* Small Inset Photo */}
            <div className="absolute -bottom-6 right-4 w-40 sm:w-48 rounded-xl overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://nycpremierlimo.com/wp-content/uploads/2026/08/alt-corporate-car-service-chauffeur-door.webp"
                alt="Chauffeur Service Door"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-4 pl-0 lg:pl-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              RELIABILITY AT SCALE
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#1D1D1B]">
              Professional Limousine Service
            </h3>
            <p className="text-[14px] text-[#6D685F] leading-relaxed">
              We hold the car when the meeting runs over, and we know which entrances work at 8am. Book once and we handle everything between the first pickup and the last drop.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-[13px] text-[#1D1D1B] font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e09900]" />
                <span>Licensed Professional Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e09900]" />
                <span>24/7 trip Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e09900]" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e09900]" />
                <span>Tri-state Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e09900]" />
                <span>Clear, Flat-rate Options</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e09900]" />
                <span>Discretion at top</span>
              </div>
            </div>
          </div>
        </div>

        {/* Callout 2: Coverage & Service Areas with Statue of Liberty & Pill Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
          {/* Left: Heading + Statue of Liberty Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              TRI-STATE REACH
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#1D1D1B]">
              Transportation across NYC and the tri-state area.
            </h3>
            <p className="text-[14px] text-[#6D685F] leading-relaxed">
              Local rides, airport travel, long-distance transfers and corporate transportation across the five boroughs and beyond — hotels, venues and custom destinations included.
            </p>

            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[16/9] mt-4">
              <img
                src="https://nycpremierlimo.com/wp-content/uploads/2026/08/Service-Area-Homepage-1.png"
                alt="NYC Skyline & Statue of Liberty"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: "Explore our service areas" White Card with Pill Grid */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900] mb-1">
              LOCATIONS
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#1D1D1B] mb-6">
              Explore our service areas.
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Manhattan", link: "/manhattan-limo-service" },
                { name: "Brooklyn", link: "/brooklyn-limo-service" },
                { name: "Queens", link: "/queens-limo-service" },
                { name: "The Bronx", link: "/the-bronx-limo-service" },
                { name: "Staten Island", link: "/staten-island-limo" },
                { name: "New Jersey", link: "/areas-we-serve" },
                { name: "Connecticut", link: "/areas-we-serve" },
                { name: "The Hamptons", link: "/city-to-city-rides" },
                { name: "Westchester", link: "/areas-we-serve" },
                { name: "Long Island", link: "/areas-we-serve" }
              ].map((area, i) => (
                <Link
                  key={i}
                  to={area.link}
                  className="px-4 py-2.5 rounded-lg border border-neutral-200 text-center text-[13px] font-semibold text-[#1D1D1B] hover:border-[#e09900] hover:text-[#e09900] transition"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. THREE STEPS SECTION: "From quote to curbside in three steps."
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-neutral-200/60">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[#e09900]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
                HOW IT WORKS
              </span>
              <span className="w-8 h-[1px] bg-[#e09900]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1B]">
              From quote to curbside in three steps.
            </h2>
            <p className="text-[15px] text-[#6D685F]">
              Book in under 2 Minutes and get instant confirmation in your email.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                num: "01",
                title: "Share your itinerary",
                desc: "Enter the pickup, destination, timing and passenger details."
              },
              {
                num: "02",
                title: "Select your vehicle",
                desc: "Review the class, capacity and clear rate for your journey."
              },
              {
                num: "03",
                title: "Ride with confidence",
                desc: "You will get the chauffeur's details one day before the pickup."
              }
            ].map((step, i) => (
              <div key={i} className="space-y-3 px-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#e09900] flex items-center justify-center mx-auto text-[#e09900] font-serif text-xl font-bold">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#6D685F] leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FAQ SECTION: "Limo Service NYC — Frequently Asked Questions"
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#e09900]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              QUESTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B] leading-tight">
                Limo Service NYC — Frequently Asked Questions
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[14px] text-[#6D685F] leading-relaxed">
                Confirm exact pricing, vehicle availability, pickup instructions, and trip requirements directly with NYC Premier Limo.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion list on clean white borders */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-5 text-left">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#1D1D1B] group-hover:text-[#e09900] transition">
                    {faq.q}
                  </span>
                  <span className="text-[#6D685F] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-[14px] text-[#6D685F] leading-relaxed pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          11. PRE-FOOTER CTA (Dark Rounded Box with Gold Button)
      ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
        <div className="bg-[#11161D] rounded-3xl p-8 sm:p-12 border border-[#e09900]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-3 max-w-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e09900]">
              START YOUR TRIP
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Book your next trip with NYC Premier Limo.
            </h3>
            <p className="text-[14px] text-white/70 leading-relaxed">
              Request a quote online or speak to dispatch directly. Quotes are free, the price is fixed before you book, and someone answers the phone 24 hours a day — including holidays.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs px-7 py-3.5 rounded-full transition shadow-lg"
            >
              Call Now
            </a>
            <Link
              to="/reservations"
              className="border border-white/20 hover:border-[#e09900] text-white hover:text-[#e09900] font-bold text-xs px-7 py-3.5 rounded-full transition"
            >
              Instant Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

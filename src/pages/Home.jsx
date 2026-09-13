import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  CalendarCheck, 
  ArrowRight, 
  Plane, 
  Building2, 
  Clock, 
  Compass, 
  HeartHandshake, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Car,
  ChevronRight
} from 'lucide-react';
import QuickStatsStrip from '../components/QuickStatsStrip';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import FaqAccordion from '../components/FaqAccordion';
import VehicleCard from '../components/VehicleCard';
import { fleetData } from '../data/fleetData';
import { servicesData } from '../data/servicesData';
import { areasData } from '../data/areasData';

export default function Home() {
  // Top 4 featured vehicles for the home page showcase
  const featuredFleet = fleetData.filter(v => 
    ['premium-sedan', 'premium-suv', 'jet-sprinter', 'charter-bus'].includes(v.id)
  );

  return (
    <div className="bg-[#060B10] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Luxury Gradients */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/08/professional-limousine-service-fleet-lineup-nyc.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B10]/95 via-[#060B10]/85 to-[#060B10]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-transparent to-[#060B10]/95" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              NYC's Leading Chauffeur & Limousine Service
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Limo Service NYC
              <span className="block text-gold font-normal italic sm:text-5xl lg:text-6xl mt-1">
                Luxury Car & Chauffeur Service
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Chauffeured airport transfers, corporate car service, hourly hire and point-to-point rides across New York, New Jersey and Connecticut — flat rates confirmed before you travel, 24/7 dispatch, no surge pricing.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="tel:+13478889797"
                className="bg-gold hover:bg-gold-hover text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center gap-2 group"
              >
                <Phone className="w-4 h-4" />
                <span>Call (347) 888-9797</span>
              </a>

              <Link
                to="/reservations"
                className="border border-white/20 hover:border-gold hover:text-gold text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition flex items-center gap-2 bg-white/5 backdrop-blur-md"
              >
                <CalendarCheck className="w-4 h-4 text-gold" />
                <span>Get A Flat-Rate Quote</span>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                TLC Licensed Drivers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Zero Surge Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                Complimentary Flight Tracking
              </span>
            </div>
          </div>

          {/* Hero Right Widget: Instant Quote Calculator */}
          <div className="lg:col-span-5 w-full">
            <QuoteBookingWidget compact={true} />
          </div>
        </div>
      </section>

      {/* 5-Item Quick Stats Strip (Matching Original) */}
      <QuickStatsStrip />

      {/* Google Trustindex Reviews Section */}
      <div className="mt-16">
        <ReviewsSection />
      </div>

      {/* Services Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
            Premium Transportation
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Six Ways to Travel in Comfort
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            One standard of service across every trip — from the airport curb to the boardroom door to the big night out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="bg-[#0E1722] rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-gold/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-gold/10"
            >
              <div>
                {/* Service Hero Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={svc.heroImage}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1722] via-transparent to-black/40" />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gold border border-gold/30">
                    {svc.number}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                    {svc.shortDesc}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-neutral-300">
                    {svc.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link
                  to={svc.slug}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-hover transition group/link"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Fleet Showcase */}
      <section className="py-24 bg-[#080E15] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider mb-3">
                Executive Fleet
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Luxury Vehicles Matched to Your Journey
              </h2>
              <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
                From executive sedans to 55-passenger coaches, our luxury fleet is matched to your party size, luggage, and occasion — every vehicle detailed and chauffeur-driven.
              </p>
            </div>

            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-gold hover:text-black text-white px-6 py-3 rounded-full text-xs font-bold border border-white/10 transition shrink-0"
            >
              <span>View Full Fleet (10+ Vehicles)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFleet.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfers Spotlight: JFK, LGA, EWR */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E1722] rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
                Airport Transportation
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                We Watch Your Flight From Takeoff to Touchdown
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Land early and we’re already at curbside; land three hours late and nothing changes for you except the time we pull up. No waiting on taxi lines or enduring surge pricing in rain.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Live FAA Radar Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Complimentary Flight Wait Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>In-Terminal Meet & Greet Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Door-to-Door Curbside Luggage Service</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/airport-car-service"
                  className="bg-gold hover:bg-gold-hover text-black px-6 py-3 rounded-full font-bold text-xs tracking-wide transition shadow-lg shadow-gold/20"
                >
                  Book Airport Transfer
                </Link>
                <a
                  href="tel:+13478889797"
                  className="border border-white/20 hover:border-gold hover:text-gold text-white px-6 py-3 rounded-full font-bold text-xs transition"
                >
                  Dispatch: (347) 888-9797
                </a>
              </div>
            </div>

            {/* Airport Cards */}
            <div className="lg:col-span-6 space-y-4">
              {[
                {
                  code: "JFK",
                  name: "John F. Kennedy International",
                  desc: "Queens · All Terminals 1–8. International arrivals, long-haul departures, and rides on to Manhattan, Brooklyn or the Hamptons.",
                  link: "/jfk-airport-limo-service"
                },
                {
                  code: "LGA",
                  name: "LaGuardia Airport",
                  desc: "Queens · Terminals A–C. Closest airport to Midtown Manhattan. Under 30 minutes when the pickup is timed right.",
                  link: "/lga-airport-limo-service"
                },
                {
                  code: "EWR",
                  name: "Newark Liberty International",
                  desc: "New Jersey · Terminals A–C. Cross-Hudson transfers routed around tunnel traffic, timed to your actual landing.",
                  link: "/ewr-airport-limo-service"
                }
              ].map(airport => (
                <Link
                  key={airport.code}
                  to={airport.link}
                  className="block p-5 rounded-2xl bg-[#14202D] border border-white/5 hover:border-gold/50 transition group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl font-bold text-gold">{airport.code}</span>
                        <span className="text-xs text-neutral-400">· {airport.name}</span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                        {airport.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-gold group-hover:translate-x-1 transition shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Transportation Section */}
      <section className="py-24 bg-[#080E15] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <img
              src="https://nycpremierlimo.com/wp-content/uploads/2026/08/Corporate-Limo.jpg"
              alt="Corporate Chauffeur"
              className="rounded-3xl shadow-2xl border border-white/10 w-full object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#101A24] border border-gold/30 rounded-2xl p-5 shadow-2xl max-w-xs">
              <div className="font-serif text-base font-bold text-white">
                Executive Accounts
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Consolidated monthly invoicing, saved traveler profiles, and priority dispatch.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
              Executive Travel
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              A Refined Standard for Corporate Mobility
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Corporate travel is judged on the days that go sideways. We hold the car when the meeting runs over, we know which building entrances work at 8:00 AM, and we brief the chauffeur on the itinerary before the first pickup. Book once and everything between the first stop and the last drop is handled.
            </p>

            <div className="space-y-3">
              {[
                "Vetted, background-checked chauffeurs in executive suits",
                "Complimentary wait time held when board meetings overrun",
                "Dedicated corporate account manager for roadshows",
                "Non-Disclosure Agreements & strict passenger confidentiality",
                "Centralized monthly billing with itemized receipts"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/corporate-limo-service"
                className="bg-gold hover:bg-gold-hover text-black px-7 py-3 rounded-full font-bold text-xs tracking-wide transition shadow-lg shadow-gold/20"
              >
                Book Corporate Travel
              </Link>
              <Link
                to="/contact-us"
                className="border border-white/20 hover:border-gold hover:text-gold text-white px-6 py-3 rounded-full font-bold text-xs transition"
              >
                Open Corporate Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tri-State Areas Served Interactive Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
            Coverage Area
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Transportation Across NYC & The Tri-State Area
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Local rides, airport travel, long-distance transfers and corporate transportation across the five boroughs and beyond — hotels, venues, and custom destinations included.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areasData.map((area) => (
            <Link
              key={area.id}
              to={area.slug}
              className="group bg-[#0E1722] rounded-3xl border border-white/10 overflow-hidden hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1722] via-transparent to-black/40" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition">
                    {area.name}
                  </h3>
                  <div className="text-xs text-neutral-300">{area.tagline}</div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {area.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-gold border-t border-white/5">
                  <span>Explore Service Area</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3-Step Booking Guide */}
      <section className="py-24 bg-[#080E15] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider mb-3">
            Easy Booking Process
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            From Quote to Curbside in Three Steps
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-16">
            Book in under 2 minutes and receive instant confirmation in your email with transparent flat pricing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                step: "01",
                title: "Share your itinerary",
                desc: "Enter your pickup address, airport terminal, destination, timing, and passenger requirements."
              },
              {
                step: "02",
                title: "Select your vehicle",
                desc: "Review our luxury sedan, SUV, Sprinter, or coach options with guaranteed all-inclusive rates."
              },
              {
                step: "03",
                title: "Ride with confidence",
                desc: "Receive your chauffeur's name, cell number, and vehicle license details 24 hours prior to travel."
              }
            ].map((stepItem, idx) => (
              <div
                key={idx}
                className="bg-[#0E1722] border border-white/10 rounded-3xl p-8 relative hover:border-gold/40 transition"
              >
                <div className="font-serif text-4xl font-bold text-gold/30 mb-4">
                  {stepItem.step}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {stepItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/reservations"
              className="bg-gold hover:bg-gold-hover text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 inline-flex items-center gap-2"
            >
              <span>Start Your Booking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Confirm exact pricing, vehicle availability, pickup instructions, and trip requirements directly with NYC Premier Limo.
          </p>
        </div>

        <FaqAccordion />
      </section>

      {/* Final Call to Action Strip */}
      <section className="py-20 bg-gradient-to-r from-[#0E1722] via-[#14202D] to-[#0E1722] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Book Your Next Trip With NYC Premier Limo
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Request a quote online or speak to dispatch directly. Quotes are free, the price is fixed before you book, and someone answers the phone 24 hours a day — including holidays.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+13478889797"
              className="bg-gold hover:bg-gold-hover text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call (347) 888-9797</span>
            </a>

            <Link
              to="/reservations"
              className="border border-white/20 hover:border-gold hover:text-gold text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition bg-white/5"
            >
              <span>Instant Online Quote</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

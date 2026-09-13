import React from 'react';
import PageHero from '../components/PageHero';
import ReviewsSection from '../components/ReviewsSection';
import { ShieldCheck, HeartHandshake, Sparkles, Clock, CheckCircle2, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const principles = [
    {
      num: "01",
      title: "Client Satisfaction",
      desc: "Every trip is judged on the rider's tranquility. From booking confirmation to doorstep drop-off, our mission is exceeding expectations with attentiveness, spotless interiors, and polite hospitality.",
      icon: HeartHandshake
    },
    {
      num: "02",
      title: "Safety First",
      desc: "Rigorous background checks, continuous driver license monitoring, defensive driving certifications, and daily pre-trip vehicle mechanical inspections guarantee your physical safety in all weather conditions.",
      icon: ShieldCheck
    },
    {
      num: "03",
      title: "Reliable Service",
      desc: "Punctuality is not an aspiration; it is our operational baseline. Chauffeurs stage at pickup locations 10 minutes prior to call time, backed by FAA flight radar tracking and dynamic traffic routing.",
      icon: Clock
    },
    {
      num: "04",
      title: "Continuous Improvement",
      desc: "We consistently upgrade our fleet to the latest vehicle model years, invest in cutting-edge dispatch software, and gather direct passenger feedback after every chauffeured journey.",
      icon: Award
    }
  ];

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="About NYC Premier Limo"
        title="Driven by Excellence. Defined by the Details."
        subtitle="NYC Premier Limo was founded to restore white-glove professionalism, transparent flat-rate pricing, and uncompromising reliability to private transportation across New York."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/chauffeur-pre-trip-vehicle-inspection-nyc.webp"
        breadcrumbs={[{ name: "About Us" }]}
      />

      {/* Story & Heritage */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
              A Company Built Around Trust
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              A Refined Standard for New York Travel
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              In a city that moves at lightning speed, transportation should be your sanctuary of calm. Whether you are arriving on an international flight at JFK after midnight or heading to an executive roadshow in Midtown, having a reliable chauffeur waiting for you changes the entire rhythm of your day.
            </p>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              We eliminated the frustrations of app surges, inexperienced gig drivers, and hidden surcharges. When you book with NYC Premier Limo, your flat rate is confirmed before anyone gets in the car, our 24/7 dispatch desk oversees your trip, and your chauffeur is a licensed professional who takes immense pride in their craft.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <div className="font-serif text-3xl font-bold text-gold">10+</div>
                <div className="text-xs text-neutral-400 mt-0.5">Years Serving NYC</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="font-serif text-3xl font-bold text-gold">50,000+</div>
                <div className="text-xs text-neutral-400 mt-0.5">Trips Chauffeured</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="font-serif text-3xl font-bold text-gold">5.0 ★</div>
                <div className="text-xs text-neutral-400 mt-0.5">Google Verified</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <img
              src="https://nycpremierlimo.com/wp-content/uploads/2026/08/professional-limousine-service-fleet-lineup-nyc.webp"
              alt="NYC Premier Limo Fleet Lineup"
              className="rounded-3xl border border-white/10 shadow-2xl w-full object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 hidden sm:block bg-[#101A24] border border-gold/30 rounded-2xl p-5 shadow-2xl max-w-xs">
              <div className="flex items-center gap-2 text-gold font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Fully Licensed & Insured</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Compliant with all NYC TLC, Port Authority, and US DOT interstate regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Principles */}
      <section className="py-24 bg-[#080E15] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
              Core Values
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Four Principles Behind Every Ride
            </h2>
            <p className="text-sm text-neutral-400">
              The operational guidelines that keep our chauffeurs and dispatchers focused on delivering world-class service every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((pr, i) => {
              const Icon = pr.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-[#0E1722] border border-white/5 hover:border-gold/40 transition flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-serif text-2xl font-bold text-gold/30">
                        {pr.num}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition">
                      {pr.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {pr.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chauffeur Standards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E1722] rounded-3xl border border-white/10 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gold">
                The Chauffeur Difference
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Trained, Vetted & Attired in Executive Formal Wear
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                A ride is only as good as the professional behind the wheel. Our chauffeurs must possess spotless driving records, undergo criminal background checks, pass regular drug and health screenings, and complete hospitality protocol training before transporting our clients.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Formal dark suit and tie dress code</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Deep route familiarity with all NYC landmarks and airports</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Curbside luggage loading and door-holding protocol</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Passenger discretion and acoustic privacy assured</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/reservations"
                  className="bg-gold hover:bg-gold-hover text-black px-7 py-3 rounded-full font-bold text-xs tracking-wide transition shadow-lg shadow-gold/20 inline-block"
                >
                  Book Your Chauffeur Today
                </Link>
              </div>
            </div>

            <div>
              <img
                src="https://nycpremierlimo.com/wp-content/uploads/2026/09/winery-tour-chauffeur-waiting-vineyard-terrace.webp"
                alt="Chauffeur Waiting"
                className="rounded-2xl border border-white/10 w-full object-cover shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

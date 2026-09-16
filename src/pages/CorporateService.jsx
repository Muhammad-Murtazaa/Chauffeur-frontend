import React from 'react';
import PageHero from '../components/PageHero';
import QuoteBookingWidget from '../components/QuoteBookingWidget';
import ReviewsSection from '../components/ReviewsSection';
import { Building2, ShieldCheck, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CorporateService() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Corporate Travel"
        title="Corporate Chauffeur & Executive Transportation"
        subtitle="Discreet, punctual, and reliable travel for C-suite executives, visiting clients, board roadshows, and corporate conventions across NYC and the Tri-State."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/Corporate-Limo.jpg"
        breadcrumbs={[
          { name: "Services", link: "/services" },
          { name: "Corporate Chauffeur Service" }
        ]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Executive Standard
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Designed for Companies Where Timing is Everything
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
                In the financial and corporate capitals of Manhattan, a late ride can compromise an acquisition or disrupt a critical investor meeting. NYC Premier Chauffeur delivers rigorous corporate reliability with professional chauffeurs under strict Non-Disclosure Agreements, immaculate late-model vehicles, and seamless corporate billing accounts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Dedicated Account Management", desc: "A single point of contact to coordinate complex group itineraries." },
                { title: "Consolidated Monthly Invoicing", desc: "Itemized receipts with employee/client reference codes." },
                { title: "Strict Confidentiality & NDAs", desc: "Chauffeurs respect private calls and mobile office discussions." },
                { title: "Punctual Arrival Guarantee", desc: "Chauffeurs arrive at your pickup address 10 minutes early." },
                { title: "Airport Flight Radar Tracking", desc: "Automatic schedule sync for executive private jets and commercial flights." },
                { title: "Roadshow Coordination", desc: "Multi-stop financial presentations across NYC, Greenwich, and Boston." }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#0E1722] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-gold text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-neutral-400 pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-[#0E1722] border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Open a Corporate Billing Account
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Streamline transportation expenses for your firm with net-30 terms.
                </p>
              </div>
              <Link
                to="/contact-us"
                className="bg-gold hover:bg-gold-hover text-black px-6 py-2.5 rounded-full text-xs font-bold shrink-0 transition"
              >
                Inquire Now
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-28">
            <QuoteBookingWidget initialService="one-way" compact={true} />
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}

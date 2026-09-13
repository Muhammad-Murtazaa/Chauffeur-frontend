import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05090D] border-t border-white/10 text-neutral-300 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="https://nycpremierlimo.com/wp-content/uploads/2026/07/nyc-premier-limo-logo.png"
                alt="NYC Premier Limo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-serif text-2xl font-bold tracking-tight text-white">
                NYC <span className="text-gold">PREMIER</span> LIMO
              </span>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              NYC's premier luxury limousine and private chauffeur service. We provide flawless airport transfers, corporate roadshows, and milestone celebrations with flat rates, 24/7 dispatch, and no surge pricing.
            </p>

            <div className="pt-2 space-y-2.5 text-sm">
              <a 
                href="tel:+13478889797" 
                className="flex items-center gap-3 text-white hover:text-gold transition group"
              >
                <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base">(347) 888-9797</span>
              </a>

              <a 
                href="mailto:info@nycpremierlimo.com" 
                className="flex items-center gap-3 text-neutral-300 hover:text-gold transition group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@nycpremierlimo.com</span>
              </a>

              <div className="flex items-center gap-3 text-neutral-400">
                <div className="w-8 h-8 rounded-full bg-white/5 text-gold flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>New York City & Tri-State Area (NY, NJ, CT)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Company Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-neutral-400 hover:text-gold transition">Home</Link></li>
              <li><Link to="/fleet" className="text-neutral-400 hover:text-gold transition">Our Fleet</Link></li>
              <li><Link to="/about-us" className="text-neutral-400 hover:text-gold transition">About Us</Link></li>
              <li><Link to="/areas-we-serve" className="text-neutral-400 hover:text-gold transition">Areas We Serve</Link></li>
              <li><Link to="/contact-us" className="text-neutral-400 hover:text-gold transition">Contact Us</Link></li>
              <li><Link to="/reservations" className="text-gold font-semibold hover:text-gold-hover transition">Instant Quote & Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/airport-car-service" className="text-neutral-400 hover:text-gold transition">Airport Car Service</Link></li>
              <li><Link to="/jfk-airport-limo-service" className="text-neutral-400 hover:text-gold transition">JFK Airport Limo</Link></li>
              <li><Link to="/lga-airport-limo-service" className="text-neutral-400 hover:text-gold transition">LaGuardia Airport Limo</Link></li>
              <li><Link to="/ewr-airport-limo-service" className="text-neutral-400 hover:text-gold transition">Newark EWR Limo</Link></li>
              <li><Link to="/hourly-car-service" className="text-neutral-400 hover:text-gold transition">Hourly Chauffeur</Link></li>
              <li><Link to="/corporate-limo-service" className="text-neutral-400 hover:text-gold transition">Corporate Travel</Link></li>
              <li><Link to="/point-to-point-limo-service" className="text-neutral-400 hover:text-gold transition">Point-to-Point Rides</Link></li>
              <li><Link to="/city-to-city-rides" className="text-neutral-400 hover:text-gold transition">City-to-City Long Distance</Link></li>
              <li><Link to="/wedding-limo-service" className="text-neutral-400 hover:text-gold transition">Wedding Limousine</Link></li>
              <li><Link to="/winery-tour-limo-service" className="text-neutral-400 hover:text-gold transition">Winery Tours</Link></li>
            </ul>
          </div>

          {/* Col 4: Service Areas & Policies */}
          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Areas & Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/manhattan-limo-service" className="text-neutral-400 hover:text-gold transition">Manhattan Limo</Link></li>
              <li><Link to="/brooklyn-limo-service" className="text-neutral-400 hover:text-gold transition">Brooklyn Limo</Link></li>
              <li><Link to="/queens-limo-service" className="text-neutral-400 hover:text-gold transition">Queens Limo</Link></li>
              <li><Link to="/the-bronx-limo-service" className="text-neutral-400 hover:text-gold transition">The Bronx Limo</Link></li>
              <li><Link to="/staten-island-limo" className="text-neutral-400 hover:text-gold transition">Staten Island Limo</Link></li>
              <li className="pt-2 border-t border-white/10">
                <Link to="/terms-conditions" className="text-neutral-400 hover:text-gold transition">Terms & Conditions</Link>
              </li>
              <li><Link to="/privacy-policy" className="text-neutral-400 hover:text-gold transition">Privacy Policy</Link></li>
              <li><Link to="/cancellation-and-refund" className="text-neutral-400 hover:text-gold transition">Cancellation & Refund</Link></li>
              <li><Link to="/payment-policy" className="text-neutral-400 hover:text-gold transition">Payment Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} NYC Premier Limo. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-gold" />
              Licensed & Fully Insured
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Clock className="w-4 h-4 text-gold" />
              24/7 Chauffeur Dispatch
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Award className="w-4 h-4 text-gold" />
              Top Rated Luxury Fleet
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

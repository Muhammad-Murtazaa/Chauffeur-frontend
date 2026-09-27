import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-24 md:pb-12 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/10 text-left items-start">
          {/* Column 1: Brand info */}
          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="NYC Premier Chauffeur"
                className="h-12 sm:h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-serif text-xl font-bold text-white tracking-wide">
                NYC <span className="text-[#e09900]">PREMIER</span> CHAUFFEUR
              </span>
            </Link>

            <p className="text-[13.5px] sm:text-[14px] text-zinc-400 max-w-sm leading-relaxed font-normal">
              We provide reliable, luxury transportation in NYC for airport transfers, business travel, and special events.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[14px] font-bold text-[#e09900] tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-zinc-300">
              <li><Link to="/" className="hover:text-[#e09900] transition-colors">Home</Link></li>
              <li><Link to="/areas-we-serve" className="hover:text-[#e09900] transition-colors">Areas We Serve</Link></li>
              <li><Link to="/about-us" className="hover:text-[#e09900] transition-colors">About Us</Link></li>
              <li><Link to="/fleet" className="hover:text-[#e09900] transition-colors">Fleet</Link></li>
              <li><Link to="/drivers" className="hover:text-[#e09900] transition-colors">Drive With Us</Link></li>
              <li><Link to="/contact-us" className="hover:text-[#e09900] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[14px] font-bold text-[#e09900] tracking-wide">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-zinc-300">
              <li><Link to="/areas-we-serve" className="hover:text-[#e09900] transition-colors">Areas We Serve</Link></li>
              <li><Link to="/jfk-airport-limo-service" className="hover:text-[#e09900] transition-colors">JFK Chauffeur Service</Link></li>
              <li><Link to="/ewr-airport-limo-service" className="hover:text-[#e09900] transition-colors">EWR Chauffeur Service</Link></li>
              <li><Link to="/lga-airport-limo-service" className="hover:text-[#e09900] transition-colors">LGA Chauffeur Service</Link></li>
              <li><Link to="/reservations" className="hover:text-[#e09900] transition-colors">Reservation</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Policies */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[14px] font-bold text-[#e09900] tracking-wide">
              Contact & Policies
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-zinc-300">
              <li>
                <a href="tel:+13478889797" className="hover:text-[#e09900] transition-colors">
                  (347) 888-9797
                </a>
              </li>
              <li>
                <a href="mailto:Info@nycpremierlimo.com" className="hover:text-[#e09900] transition-colors">
                  Info@nycpremierlimo.com
                </a>
              </li>
              <li><Link to="/terms-conditions" className="hover:text-[#e09900] transition-colors">Terms and Condition</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#e09900] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cancellation-and-refund" className="hover:text-[#e09900] transition-colors">Cancellation & Refund</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-7 text-center text-[12.5px] text-zinc-500 font-normal">
          &copy; 2026 NYC Premier Chauffeur. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-24 md:pb-14 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-left">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="https://nycpremierlimo.com/wp-content/uploads/2026/07/nyc-premier-limo-logo.png"
                alt="NYC Premier Limo"
                className="h-11 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-serif text-xl font-bold text-white">
                NYC <span className="text-[#e09900]">PREMIER</span> LIMO
              </span>
            </Link>

            <p className="text-[13px] text-white/70 max-w-sm leading-relaxed">
              We provide reliable, luxury transportation in NYC for airport transfers, business travel, and special events.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="tel:+13478889797"
                className="bg-[#1a222d] border border-white/20 hover:border-[#e09900] text-white font-bold text-xs px-5 py-2.5 rounded-full transition inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#e09900]" />
                <span>Call Now</span>
              </a>
              <Link
                to="/reservations"
                className="bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs px-5 py-2.5 rounded-full transition"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[14px] font-bold text-[#e09900] uppercase tracking-wider font-sans">
              Company
            </h4>
            <ul className="space-y-2 text-[13px] text-white/75">
              <li><Link to="/" className="hover:text-[#e09900] transition">Home</Link></li>
              <li><Link to="/areas-we-serve" className="hover:text-[#e09900] transition">Areas We Serve</Link></li>
              <li><Link to="/about-us" className="hover:text-[#e09900] transition">About Us</Link></li>
              <li><Link to="/fleet" className="hover:text-[#e09900] transition">Fleet</Link></li>
              <li><Link to="/contact-us" className="hover:text-[#e09900] transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[14px] font-bold text-[#e09900] uppercase tracking-wider font-sans">
              Our Services
            </h4>
            <ul className="space-y-2 text-[13px] text-white/75">
              <li><Link to="/areas-we-serve" className="hover:text-[#e09900] transition">Areas We Serve</Link></li>
              <li><Link to="/jfk-airport-limo-service" className="hover:text-[#e09900] transition">JFK Limo Service</Link></li>
              <li><Link to="/ewr-airport-limo-service" className="hover:text-[#e09900] transition">EWR Limo Service</Link></li>
              <li><Link to="/lga-airport-limo-service" className="hover:text-[#e09900] transition">LGA Limo Service</Link></li>
              <li><Link to="/reservations" className="hover:text-[#e09900] transition">Reservation</Link></li>
            </ul>
          </div>

          {/* Contact & Policies */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[14px] font-bold text-[#e09900] uppercase tracking-wider font-sans">
              Contact & Policies
            </h4>
            <ul className="space-y-2 text-[13px] text-white/75">
              <li>
                <a href="tel:+13478889797" className="hover:text-[#e09900] transition flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>(347) 888-9797</span>
                </a>
              </li>
              <li>
                <a href="mailto:Info@nycpremierlimo.com" className="hover:text-[#e09900] transition flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>Info@nycpremierlimo.com</span>
                </a>
              </li>
              <li><Link to="/terms-conditions" className="hover:text-[#e09900] transition">Terms and Condition</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#e09900] transition">Privacy Policy</Link></li>
              <li><Link to="/cancellation-and-refund" className="hover:text-[#e09900] transition">Cancellation & Refund</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-[12px] text-white/50">
          © {new Date().getFullYear()} NYC Premier Limo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

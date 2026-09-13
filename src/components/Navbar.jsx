import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, Menu, X, Shield, Clock, MapPin, Car, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setAreasDropdownOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-white/10 transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="https://nycpremierlimo.com/wp-content/uploads/2026/07/nyc-premier-limo-logo.png"
              alt="NYC Premier Limo Logo"
              className="h-10 sm:h-12 w-auto object-contain transition group-hover:brightness-110"
              onError={(e) => {
                // Fallback to text brand if image blocked
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                NYC <span className="text-gold">PREMIER</span> LIMO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
                location.pathname === '/' ? 'text-gold' : 'text-neutral-200 hover:text-gold'
              }`}
            >
              Home
            </Link>

            <Link
              to="/fleet"
              className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
                location.pathname === '/fleet' ? 'text-gold' : 'text-neutral-200 hover:text-gold'
              }`}
            >
              Fleet
            </Link>

            {/* Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                to="/services"
                className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1 transition ${
                  location.pathname.includes('/services') || 
                  location.pathname.includes('airport') || 
                  location.pathname.includes('hourly') ||
                  location.pathname.includes('corporate') ||
                  location.pathname.includes('point-to-point') ||
                  location.pathname.includes('city-to-city') ||
                  location.pathname.includes('wedding') ||
                  location.pathname.includes('birthday') ||
                  location.pathname.includes('prom') ||
                  location.pathname.includes('winery') ||
                  location.pathname.includes('occasions')
                    ? 'text-gold'
                    : 'text-neutral-200 hover:text-gold'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 opacity-80" />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-[#101923] border border-gold/30 rounded-xl shadow-2xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-gold tracking-wider border-b border-white/10 mb-1">
                    Chauffeured Services
                  </div>
                  <Link
                    to="/airport-car-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Airport Car Service (JFK, LGA, EWR)
                  </Link>
                  <Link
                    to="/hourly-car-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Hourly Chauffeur Service
                  </Link>
                  <Link
                    to="/corporate-limo-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Corporate & Executive Travel
                  </Link>
                  <Link
                    to="/point-to-point-limo-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Point to Point Direct Rides
                  </Link>
                  <Link
                    to="/city-to-city-rides"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    City to City Rides (Hamptons, DC, Boston)
                  </Link>

                  <div className="px-3 pt-2.5 pb-1 text-[11px] font-bold uppercase text-gold tracking-wider border-t border-white/10 mt-1 mb-1">
                    Special Occasions
                  </div>
                  <Link
                    to="/wedding-limo-service"
                    className="block px-3 py-1.5 text-xs text-neutral-300 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Wedding Limousine Service
                  </Link>
                  <Link
                    to="/prom-limousine-service"
                    className="block px-3 py-1.5 text-xs text-neutral-300 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Prom Limousine Service
                  </Link>
                  <Link
                    to="/birthday-limo-service"
                    className="block px-3 py-1.5 text-xs text-neutral-300 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Birthday & Milestone Celebrations
                  </Link>
                  <Link
                    to="/winery-tour-limo-service"
                    className="block px-3 py-1.5 text-xs text-neutral-300 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Long Island Winery Tours
                  </Link>
                </div>
              )}
            </div>

            {/* Areas We Serve Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAreasDropdownOpen(true)}
              onMouseLeave={() => setAreasDropdownOpen(false)}
            >
              <Link
                to="/areas-we-serve"
                className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1 transition ${
                  location.pathname.includes('/areas-we-serve') || 
                  location.pathname.includes('manhattan') || 
                  location.pathname.includes('brooklyn') ||
                  location.pathname.includes('queens') ||
                  location.pathname.includes('bronx') ||
                  location.pathname.includes('staten-island')
                    ? 'text-gold'
                    : 'text-neutral-200 hover:text-gold'
                }`}
              >
                Areas We Serve
                <ChevronDown className="w-4 h-4 opacity-80" />
              </Link>

              {areasDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#101923] border border-gold/30 rounded-xl shadow-2xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase text-gold tracking-wider border-b border-white/10 mb-1">
                    5 NYC Boroughs & Beyond
                  </div>
                  <Link
                    to="/manhattan-limo-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Manhattan
                  </Link>
                  <Link
                    to="/brooklyn-limo-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Brooklyn
                  </Link>
                  <Link
                    to="/queens-limo-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Queens (JFK / LGA)
                  </Link>
                  <Link
                    to="/the-bronx-limo-service"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    The Bronx
                  </Link>
                  <Link
                    to="/staten-island-limo"
                    className="block px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-gold/15 hover:text-gold rounded-lg transition"
                  >
                    Staten Island
                  </Link>
                  <Link
                    to="/areas-we-serve"
                    className="block px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/15 rounded-lg border-t border-white/10 mt-1 transition"
                  >
                    View All Tri-State Areas →
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about-us"
              className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
                location.pathname === '/about-us' ? 'text-gold' : 'text-neutral-200 hover:text-gold'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact-us"
              className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
                location.pathname === '/contact-us' ? 'text-gold' : 'text-neutral-200 hover:text-gold'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-5">
            <a
              href="tel:+13478889797"
              className="text-white hover:text-gold text-sm font-semibold transition-colors duration-200"
            >
              (347) 888-9797
            </a>
            <Link
              to="/reservations"
              className="bg-[#e09900] hover:bg-[#c98600] text-black px-6 py-2.5 rounded-full text-sm font-bold tracking-normal transition-colors duration-200"
            >
              Instant Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:+13478889797"
              className="p-2 rounded-full bg-gold/15 text-gold border border-gold/30"
              aria-label="Call Dispatch"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D151F] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              to="/fleet"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5"
            >
              Fleet
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-t border-b border-white/5 py-2">
              <div className="px-3 py-1 text-xs font-bold uppercase text-gold tracking-wider">
                Services
              </div>
              <div className="pl-3 space-y-1 mt-1">
                <Link to="/airport-car-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Airport Car Service (JFK, LGA, EWR)</Link>
                <Link to="/hourly-car-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Hourly Chauffeur</Link>
                <Link to="/corporate-limo-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Corporate Transportation</Link>
                <Link to="/point-to-point-limo-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Point to Point</Link>
                <Link to="/city-to-city-rides" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">City-to-City Long Distance</Link>
                <Link to="/wedding-limo-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Wedding Limousine</Link>
                <Link to="/prom-limousine-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Prom Limousine</Link>
                <Link to="/winery-tour-limo-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Winery Tours</Link>
              </div>
            </div>

            {/* Mobile Areas Accordion */}
            <div className="border-b border-white/5 pb-2">
              <div className="px-3 py-1 text-xs font-bold uppercase text-gold tracking-wider">
                Areas We Serve
              </div>
              <div className="pl-3 space-y-1 mt-1">
                <Link to="/manhattan-limo-service" className="block py-1 text-sm text-neutral-300 hover:text-gold">Manhattan</Link>
                <Link to="/brooklyn-limo-service" className="block py-1 text-sm text-neutral-300 hover:text-gold">Brooklyn</Link>
                <Link to="/queens-limo-service" className="block py-1 text-sm text-neutral-300 hover:text-gold">Queens</Link>
                <Link to="/the-bronx-limo-service" className="block py-1 text-sm text-neutral-300 hover:text-gold">The Bronx</Link>
                <Link to="/staten-island-limo" className="block py-1 text-sm text-neutral-300 hover:text-gold">Staten Island</Link>
                <Link to="/areas-we-serve" className="block py-1 text-sm text-gold">All Areas & Regions →</Link>
              </div>
            </div>

            <Link
              to="/about-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5"
            >
              Contact Us
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/reservations"
                className="w-full bg-gold text-black text-center py-3 rounded-xl font-bold text-sm shadow-md"
              >
                Instant Quote & Book
              </Link>
              <a
                href="tel:+13478889797"
                className="w-full bg-white/10 text-white text-center py-3 rounded-xl font-bold text-sm border border-white/20 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                Call Dispatch: (347) 888-9797
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, ChevronRight, Menu, X, Shield, Clock, MapPin, Car, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // 'airport' | 'occasions' | null
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
    setActiveSubmenu(null);
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
              src="/logo.png"
              alt="NYC Premier Chauffeur Logo"
              className="h-10 sm:h-12 w-auto object-contain transition group-hover:brightness-110"
              onError={(e) => {
                // Fallback to text brand if image blocked
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                NYC <span className="text-gold">PREMIER</span> CHAUFFEUR
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

            {/* Services Dropdown with Sub-flyout */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => {
                setServicesDropdownOpen(false);
                setActiveSubmenu(null);
              }}
            >
              <Link
                to="/services"
                className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
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
                    ? 'text-[#e09900]'
                    : 'text-white hover:text-[#e09900]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </Link>

              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-1 z-50 animate-in fade-in duration-150"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                >
                  <div className="w-60 bg-black border border-[#e09900] rounded-md shadow-2xl py-1 relative">
                    {/* 1. Airport Car Service (has sub-menu) */}
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveSubmenu('airport')}
                    >
                      <Link
                        to="/airport-car-service"
                        className={`flex items-center justify-between w-full px-4 py-3 text-[13.5px] font-bold transition-colors ${
                          activeSubmenu === 'airport' || location.pathname === '/airport-car-service'
                            ? 'bg-[#e09900] text-black'
                            : 'text-white hover:bg-[#e09900] hover:text-black'
                        }`}
                      >
                        <span>Airport Car Service</span>
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>

                      {/* Airport Submenu Flyout */}
                      {activeSubmenu === 'airport' && (
                        <div 
                          className="absolute top-0 left-full pl-1 z-50 animate-in fade-in duration-150"
                          onMouseEnter={() => setActiveSubmenu('airport')}
                        >
                          <div className="w-64 bg-black border border-[#e09900] rounded-md shadow-2xl py-1">
                            <Link
                              to="/jfk-airport-limo-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              JFK Airport Chauffeur Service
                            </Link>
                            <Link
                              to="/lga-airport-limo-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              LGA Airport Chauffeur Service
                            </Link>
                            <Link
                              to="/ewr-airport-limo-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              EWR Airport Chauffeur Service
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2. Hourly Car Service */}
                    <div onMouseEnter={() => setActiveSubmenu(null)}>
                      <Link
                        to="/hourly-car-service"
                        className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                      >
                        Hourly Car Service
                      </Link>
                    </div>

                    {/* 3. Corporate Chauffeur Service */}
                    <div onMouseEnter={() => setActiveSubmenu(null)}>
                      <Link
                        to="/corporate-limo-service"
                        className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                      >
                        Corporate Chauffeur Service
                      </Link>
                    </div>

                    {/* 4. Point to Point Chauffeur Service */}
                    <div onMouseEnter={() => setActiveSubmenu(null)}>
                      <Link
                        to="/point-to-point-limo-service"
                        className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                      >
                        Point to Point Chauffeur Service
                      </Link>
                    </div>

                    {/* 5. City To City Rides */}
                    <div onMouseEnter={() => setActiveSubmenu(null)}>
                      <Link
                        to="/city-to-city-rides"
                        className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                      >
                        City To City Rides
                      </Link>
                    </div>

                    {/* 6. Special Occasions (has sub-menu) */}
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveSubmenu('occasions')}
                    >
                      <Link
                        to="/special-occasions"
                        className={`flex items-center justify-between w-full px-4 py-3 text-[13.5px] font-bold transition-colors ${
                          activeSubmenu === 'occasions' || location.pathname === '/special-occasions'
                            ? 'bg-[#e09900] text-black'
                            : 'text-white hover:bg-[#e09900] hover:text-black'
                        }`}
                      >
                        <span>Special Occasions</span>
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>

                      {/* Special Occasions Submenu Flyout */}
                      {activeSubmenu === 'occasions' && (
                        <div 
                          className="absolute bottom-0 left-full pl-1 z-50 animate-in fade-in duration-150"
                          onMouseEnter={() => setActiveSubmenu('occasions')}
                        >
                          <div className="w-64 bg-black border border-[#e09900] rounded-md shadow-2xl py-1">
                            <Link
                              to="/wedding-limo-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              Wedding Chauffeur Service
                            </Link>
                            <Link
                              to="/birthday-limo-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              Birthdays Chauffeur Service
                            </Link>
                            <Link
                              to="/prom-limousine-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              Prom Chauffeur Service
                            </Link>
                            <Link
                              to="/winery-tour-limo-service"
                              className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                            >
                              Winery Tour Chauffeur Service
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                className={`px-3 py-2 text-sm font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                  location.pathname.includes('/areas-we-serve') || 
                  location.pathname.includes('manhattan') || 
                  location.pathname.includes('brooklyn') ||
                  location.pathname.includes('queens') ||
                  location.pathname.includes('bronx') ||
                  location.pathname.includes('staten-island')
                    ? 'text-[#e09900]'
                    : 'text-white hover:text-[#e09900]'
                }`}
              >
                <span>Areas We Serve</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </Link>

              {areasDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-1 z-50 animate-in fade-in duration-150"
                  onMouseEnter={() => setAreasDropdownOpen(true)}
                >
                  <div className="w-60 bg-black border border-[#e09900] rounded-md shadow-2xl py-1">
                    <Link
                      to="/manhattan-limo-service"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      Manhattan
                    </Link>
                    <Link
                      to="/brooklyn-limo-service"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      Brooklyn
                    </Link>
                    <Link
                      to="/queens-limo-service"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      Queens (JFK / LGA)
                    </Link>
                    <Link
                      to="/the-bronx-limo-service"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      The Bronx
                    </Link>
                    <Link
                      to="/staten-island-limo"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      Staten Island
                    </Link>
                    <Link
                      to="/areas-we-serve"
                      className="block px-4 py-3 text-[13.5px] font-bold text-[#e09900] hover:bg-[#e09900] hover:text-black border-t border-[#e09900]/30 transition-colors"
                    >
                      View All Tri-State Areas →
                    </Link>
                  </div>
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
                <Link to="/wedding-limo-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Wedding Chauffeur</Link>
                <Link to="/prom-limousine-service" className="block py-1.5 text-sm text-neutral-300 hover:text-gold">Prom Chauffeur</Link>
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

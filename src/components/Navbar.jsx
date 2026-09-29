import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, ChevronDown, ChevronRight, Menu, X, Shield, Clock, MapPin, Car, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, promptInstantQuote, openAuthModal } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // 'airport' | 'occasions' | null
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
                  location.pathname.includes('staten-island') ||
                  location.pathname.includes('washington-dc') ||
                  location.pathname.includes('barcelona')
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
                      to="/washington-dc-limo-service"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      Washington, D.C.
                    </Link>
                    <Link
                      to="/barcelona-limo-service"
                      className="block px-4 py-3 text-[13.5px] font-bold text-white hover:bg-[#e09900] hover:text-black transition-colors"
                    >
                      Barcelona, Spain
                    </Link>
                    <Link
                      to="/areas-we-serve"
                      className="block px-4 py-3 text-[13.5px] font-bold text-[#e09900] hover:bg-[#e09900] hover:text-black border-t border-[#e09900]/30 transition-colors"
                    >
                      View All Regions →
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

            <Link
              to="/drivers"
              className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
                location.pathname === '/drivers' || location.pathname === '/drive-with-us'
                  ? 'text-[#e09900]'
                  : 'text-neutral-200 hover:text-[#e09900]'
              }`}
            >
              Drive With Us
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+13478889797"
              className="text-white hover:text-gold text-sm font-semibold transition-colors duration-200"
            >
              (347) 888-9797
            </a>

            {/* Customer / VIP User Auth Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition"
                >
                  <div className="w-5 h-5 rounded-full bg-[#e09900] text-black flex items-center justify-center text-[11px] font-bold">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <span>{user?.firstName || 'VIP Client'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-[#0E1722] border border-white/15 rounded-2xl p-2 shadow-2xl space-y-1 z-50 animate-in fade-in"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-white/10 text-xs">
                      <div className="font-bold text-white truncate">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate">{user?.email}</div>
                    </div>

                    {user?.role === 'DRIVER' && (
                      <Link
                        to="/driver/dashboard"
                        className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#e09900] hover:bg-white/5"
                      >
                        Chauffeur Portal →
                      </Link>
                    )}

                    <Link
                      to="/reservations"
                      className="block px-3 py-2 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white hover:bg-white/5"
                    >
                      Instant Quote & Book
                    </Link>

                    <button
                      type="button"
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal({ defaultTab: 'signin' })}
                className="text-neutral-300 hover:text-white text-xs font-bold px-3 py-2 rounded-full border border-white/10 hover:bg-white/5 transition"
              >
                Sign In
              </button>
            )}

            <button
              type="button"
              onClick={() => promptInstantQuote(navigate, '/reservations')}
              className="bg-[#e09900] hover:bg-[#c98600] text-black px-6 py-2.5 rounded-full text-sm font-bold tracking-normal transition shadow-lg shadow-[#e09900]/20"
            >
              Instant Quote
            </button>
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
            {/* User status in mobile drawer */}
            {isAuthenticated ? (
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e09900] text-black font-bold flex items-center justify-center text-xs">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-[10px] text-neutral-400">{user?.email}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-300">VIP Client Account</span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal({ defaultTab: 'signin' });
                  }}
                  className="px-3 py-1 rounded-full bg-[#e09900] text-black font-bold text-xs"
                >
                  Sign In / Register
                </button>
              </div>
            )}

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
                <Link to="/washington-dc-limo-service" className="block py-1 text-sm text-neutral-300 hover:text-gold">Washington, D.C.</Link>
                <Link to="/barcelona-limo-service" className="block py-1 text-sm text-neutral-300 hover:text-gold">Barcelona, Spain</Link>
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
            <Link
              to="/drivers"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#e09900] bg-[#e09900]/10 border border-[#e09900]/20 hover:bg-[#e09900]/20"
            >
              Drive With Us (Chauffeur Portal)
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  promptInstantQuote(navigate, '/reservations');
                }}
                className="w-full bg-gold text-black text-center py-3 rounded-xl font-bold text-sm shadow-md"
              >
                Instant Quote & Book
              </button>
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

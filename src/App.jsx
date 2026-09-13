import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';

// Pages
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Services from './pages/Services';
import AirportService from './pages/AirportService';
import JfkService from './pages/JfkService';
import LgaService from './pages/LgaService';
import EwrService from './pages/EwrService';
import HourlyService from './pages/HourlyService';
import CorporateService from './pages/CorporateService';
import PointToPointService from './pages/PointToPointService';
import CityToCityService from './pages/CityToCityService';
import SpecialOccasions from './pages/SpecialOccasions';
import WeddingService from './pages/WeddingService';
import BirthdayService from './pages/BirthdayService';
import PromService from './pages/PromService';
import WineryService from './pages/WineryService';
import AreasWeServe from './pages/AreasWeServe';
import ManhattanService from './pages/ManhattanService';
import BrooklynService from './pages/BrooklynService';
import QueensService from './pages/QueensService';
import BronxService from './pages/BronxService';
import StatenIslandService from './pages/StatenIslandService';
import Reservations from './pages/Reservations';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsConditions from './pages/TermsConditions';
import LegalPrivacy from './pages/LegalPrivacy';
import CancellationRefund from './pages/CancellationRefund';
import PaymentPolicy from './pages/PaymentPolicy';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#060B10] text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<Services />} />
            <Route path="/airport-car-service" element={<AirportService />} />
            <Route path="/jfk-airport-limo-service" element={<JfkService />} />
            <Route path="/lga-airport-limo-service" element={<LgaService />} />
            <Route path="/ewr-airport-limo-service" element={<EwrService />} />
            <Route path="/hourly-car-service" element={<HourlyService />} />
            <Route path="/corporate-limo-service" element={<CorporateService />} />
            <Route path="/point-to-point-limo-service" element={<PointToPointService />} />
            <Route path="/city-to-city-rides" element={<CityToCityService />} />
            <Route path="/special-occasions" element={<SpecialOccasions />} />
            <Route path="/wedding-limo-service" element={<WeddingService />} />
            <Route path="/birthday-limo-service" element={<BirthdayService />} />
            <Route path="/prom-limousine-service" element={<PromService />} />
            <Route path="/winery-tour-limo-service" element={<WineryService />} />
            <Route path="/areas-we-serve" element={<AreasWeServe />} />
            <Route path="/manhattan-limo-service" element={<ManhattanService />} />
            <Route path="/brooklyn-limo-service" element={<BrooklynService />} />
            <Route path="/queens-limo-service" element={<QueensService />} />
            <Route path="/the-bronx-limo-service" element={<BronxService />} />
            <Route path="/staten-island-limo" element={<StatenIslandService />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<LegalPrivacy />} />
            <Route path="/cancellation-and-refund" element={<CancellationRefund />} />
            <Route path="/payment-policy" element={<PaymentPolicy />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <MobileStickyBar />
      </div>
    </Router>
  );
}

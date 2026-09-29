import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';

// Public Pages
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
import WashingtonDcService from './pages/WashingtonDcService';
import BarcelonaService from './pages/BarcelonaService';
import Reservations from './pages/Reservations';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Drivers from './pages/Drivers';
import TermsConditions from './pages/TermsConditions';
import LegalPrivacy from './pages/LegalPrivacy';
import CancellationRefund from './pages/CancellationRefund';
import PaymentPolicy from './pages/PaymentPolicy';

// Driver Portal Pages & Layout
import DriverLayout from './pages/driver/DriverLayout';
import DriverLogin from './pages/driver/DriverLogin';
import DriverOnboarding from './pages/driver/DriverOnboarding';
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverProfile from './pages/driver/DriverProfile';
import DriverDocuments from './pages/driver/DriverDocuments';
import Vehicle from './pages/driver/Vehicle';
import UpcomingBookings from './pages/driver/UpcomingBookings';
import ActiveRide from './pages/driver/ActiveRide';
import BookingHistory from './pages/driver/BookingHistory';
import BookingDetails from './pages/driver/BookingDetails';

import DriverProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';

// Admin Portal Pages & Layout
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminDrivers from './pages/admin/AdminDrivers';
import AdminPricing from './pages/admin/AdminPricing';
import AdminDispatch from './pages/admin/AdminDispatch';
import AdminProtectedRoute from './pages/admin/AdminProtectedRoute';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public layout with consumer Navbar and Footer
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#060B10] text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AuthModal />
        <Routes>
        {/* Public Site Routes (renders with public Navbar & Footer) */}
        <Route element={<PublicLayout />}>
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
          <Route path="/washington-dc-limo-service" element={<WashingtonDcService />} />
          <Route path="/washington-dc-car-service" element={<WashingtonDcService />} />
          <Route path="/barcelona-limo-service" element={<BarcelonaService />} />
          <Route path="/barcelona-car-service" element={<BarcelonaService />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservation" element={<Reservations />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drive-with-us" element={<Drivers />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<LegalPrivacy />} />
          <Route path="/cancellation-and-refund" element={<CancellationRefund />} />
          <Route path="/payment-policy" element={<PaymentPolicy />} />
        </Route>

        {/* Dedicated Driver Login (No public Navbar/Footer) */}
        <Route path="/driver/login" element={<DriverLogin />} />

        {/* Protected Driver Portal Routes (Requires authentication & DRIVER role) */}
        <Route
          path="/driver"
          element={
            <DriverProtectedRoute>
              <DriverLayout />
            </DriverProtectedRoute>
          }
        >
          <Route index element={<DriverDashboard />} />
          <Route path="dashboard" element={<DriverDashboard />} />
          <Route path="onboarding" element={<DriverOnboarding />} />
          <Route path="profile" element={<DriverProfile />} />
          <Route path="documents" element={<DriverDocuments />} />
          <Route path="vehicle" element={<Vehicle />} />
          <Route path="vehicle-details" element={<Vehicle />} />
          <Route path="vehicle-documents" element={<Vehicle />} />
          <Route path="vehicle-photos" element={<Vehicle />} />
          <Route path="verification-status" element={<DriverDocuments />} />
          <Route path="active-ride" element={<ActiveRide />} />
          <Route path="bookings/upcoming" element={<UpcomingBookings />} />
          <Route path="bookings/active" element={<ActiveRide />} />
          <Route path="bookings/history" element={<BookingHistory />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
        </Route>

        {/* Dedicated Admin Portal Login (No public Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Console Routes (Requires authentication & ADMIN role) */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="drivers" element={<AdminDrivers />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="dispatch" element={<AdminDispatch />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

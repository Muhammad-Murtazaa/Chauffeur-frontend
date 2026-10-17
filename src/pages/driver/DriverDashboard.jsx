import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Navigation,
  Calendar,
  DollarSign,
  Clock,
  Car,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MapPin,
  User,
  Phone,
  Sparkles,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import {
  getDriverDashboard,
  getActiveRide,
  getUpcomingBookings,
} from '../../api/driver';

export default function DriverDashboard() {
  const { isOnline, driverUser } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const [upcomingRides, setUpcomingRides] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [dashRes, activeRes, upcomingRes] = await Promise.allSettled([
          getDriverDashboard(),
          getActiveRide(),
          getUpcomingBookings(),
        ]);

        if (dashRes.status === 'fulfilled' && dashRes.value) {
          setDashboardData(dashRes.value);
        }

        if (activeRes.status === 'fulfilled' && activeRes.value?.activeRide) {
          setActiveRide(activeRes.value.activeRide);
        } else {
          setActiveRide(null);
        }

        if (upcomingRes.status === 'fulfilled' && Array.isArray(upcomingRes.value?.bookings)) {
          setUpcomingRides(upcomingRes.value.bookings);
        } else {
          setUpcomingRides([]);
        }
      } catch (err) {
        console.error('Failed to load driver dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const stats = dashboardData?.stats || {
    todayEarnings: '$0.00',
    weekEarnings: '$0.00',
    completedTrips: 0,
    rating: '5.0',
  };

  const vehicle = dashboardData?.vehicle;
  const driver = dashboardData?.driver;

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chauffeur Operations Center</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {driverUser?.firstName || 'Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            {vehicle
              ? `Your primary vehicle (${vehicle.year} ${vehicle.make} ${vehicle.model} • ${vehicle.registrationNumber}) is registered.`
              : 'Please complete your vehicle registration to receive live dispatches.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeRide ? (
            <Link
              to="/driver/active-ride"
              className="px-5 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Active Ride</span>
            </Link>
          ) : (
            <Link
              to="/driver/bookings/upcoming"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/15"
            >
              <Calendar className="w-4 h-4 text-[#e09900]" />
              <span>Upcoming Bookings</span>
            </Link>
          )}
        </div>
      </div>

      {/* Availability Status Card */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isOnline
            ? 'bg-emerald-950/20 border-emerald-500/30'
            : 'bg-[#0E1722] border-white/10'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-white/5 text-neutral-400 border-white/10'
              }`}
            >
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                Availability Status
              </div>
              <div className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
                  }`}
                />
                <span>{isOnline ? 'AVAILABLE (Receiving VIP Bookings)' : 'OFFLINE (Not Available)'}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-neutral-400 max-w-xs text-left sm:text-right">
            {isOnline
              ? 'You are active in the NYC Premier dispatch pool to receive real-time and scheduled VIP rides.'
              : 'Toggle to ONLINE using the top bar switch when ready to receive passenger dispatches.'}
          </div>
        </div>
      </div>

      {/* Active Ride Banner (Dynamic) */}
      {activeRide ? (
        <div className="bg-[#0E1722] border border-[#e09900]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#e09900] text-black font-bold text-xs uppercase tracking-wider rounded-bl-2xl">
            Active Assignment
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-bold text-[#e09900]">
                {activeRide.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase">
                {activeRide.status?.replace(/_/g, ' ') || 'Chauffeur En Route'}
              </span>
              {activeRide.pickupTime && (
                <span className="text-xs text-neutral-400">Scheduled: {activeRide.pickupTime}</span>
              )}
            </div>

            {/* Route Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e09900]">
                  <MapPin className="w-4 h-4" />
                  <span>PICKUP LOCATION</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white pl-6">
                  {activeRide.pickup}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <MapPin className="w-4 h-4" />
                  <span>DESTINATION</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white pl-6">
                  {activeRide.dropoff}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-4 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#e09900]" />
                  <span>Passenger: <strong>{activeRide.passenger || 'VIP Guest'}</strong></span>
                </div>
                {activeRide.passengerPhone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#e09900]" />
                    <span>{activeRide.passengerPhone}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/driver/active-ride"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Manage Trip State</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dynamic Empty State for Active Ride */
        <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">No Active Ride Assignment In Progress</div>
              <p className="text-xs text-neutral-400">
                You are ready. Dispatched bookings will appear here in real-time when assigned.
              </p>
            </div>
          </div>
          <Link
            to="/driver/bookings/upcoming"
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-[#e09900] transition border border-white/10"
          >
            Check Upcoming Schedule
          </Link>
        </div>
      )}

      {/* KPI Stats Grid (Dynamic) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            title: "Today's Earnings",
            val: stats.todayEarnings || '$0.00',
            sub: `${stats.completedTrips || 0} trips executed`,
            icon: <DollarSign className="w-5 h-5 text-[#e09900]" />,
          },
          {
            title: 'Week Total',
            val: stats.weekEarnings || '$0.00',
            sub: 'Net driver payout',
            icon: <Clock className="w-5 h-5 text-emerald-400" />,
          },
          {
            title: 'Assigned Vehicle',
            val: vehicle ? `${vehicle.make} ${vehicle.model}` : 'Not Registered',
            sub: vehicle ? vehicle.registrationNumber : 'Add in Vehicle Hub',
            icon: <Car className="w-5 h-5 text-blue-400" />,
          },
          {
            title: 'Verification',
            val: driver?.verificationStatus || 'APPROVED',
            sub: `${dashboardData?.documentsCount || 0} documents on file`,
            icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0E1722] border border-white/10 space-y-2 hover:border-[#e09900]/30 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">{kpi.title}</span>
              <div className="p-2 rounded-xl bg-white/5">{kpi.icon}</div>
            </div>
            <div className="text-lg sm:text-2xl font-serif font-bold text-white truncate">{kpi.val}</div>
            <div className="text-[11px] text-neutral-400 truncate">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Rides Section (Dynamic) */}
      <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Upcoming Assigned Bookings</h3>
            <p className="text-xs text-neutral-400">Pre-scheduled rides dispatched for your vehicle.</p>
          </div>
          <Link
            to="/driver/bookings/upcoming"
            className="text-xs font-bold text-[#e09900] hover:underline flex items-center gap-1"
          >
            <span>View All ({upcomingRides.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {upcomingRides.length === 0 ? (
          <div className="py-8 px-6 rounded-2xl bg-black/30 border border-dashed border-white/15 text-center space-y-2">
            <Calendar className="w-8 h-8 text-neutral-600 mx-auto" />
            <div className="text-sm font-bold text-white">No Upcoming Bookings Assigned</div>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              New reservations accepted by dispatch will be assigned to your vehicle here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingRides.map((ride, i) => {
              const displayFare = ride.fare || (ride.totalPrice ? `$${Number(ride.totalPrice).toFixed(2)}` : '$0.00');
              const displayRef = ride.referenceNumber || ride.id || `Ride #${i + 1}`;
              const displayPickup = ride.pickup || ride.pickupAddress || 'Pickup address';
              const displayDropoff = ride.dropoff || ride.dropoffAddress || 'Dropoff destination';
              const displayDate = ride.scheduledDate || (ride.pickupAt ? new Date(ride.pickupAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : null);
              const displayTime = ride.scheduledTime || ride.time || (ride.pickupAt ? new Date(ride.pickupAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null);
              const bookingDetailId = ride.bookingId || ride.id;

              return (
                <div
                  key={ride.bookingId || ride.id || i}
                  className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/10 transition"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#e09900]">{displayRef}</span>
                      <span className="text-xs text-neutral-300 font-semibold">
                        {displayDate ? `${displayDate}${displayTime ? ` • ${displayTime}` : ''}` : 'Upcoming'}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">{displayFare}</span>
                    </div>
                    <div className="text-xs text-neutral-300">
                      Passenger: <strong>{ride.passengerName || ride.passenger || 'VIP Guest'}</strong>
                    </div>
                    <div className="text-xs text-neutral-400 flex items-center gap-2">
                      <span className="truncate max-w-[220px]" title={displayPickup}>{displayPickup}</span>
                      <span>→</span>
                      <span className="truncate max-w-[220px]" title={displayDropoff}>{displayDropoff}</span>
                    </div>
                  </div>

                  <Link
                    to={`/driver/bookings/${bookingDetailId}`}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-200 transition shrink-0"
                  >
                    Booking Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

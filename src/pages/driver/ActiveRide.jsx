import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Navigation,
  MapPin,
  User,
  Phone,
  Clock,
  Car,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plane,
  ShieldCheck,
  RotateCcw,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { 
  getActiveRide, 
  driverEnRoute, 
  driverArrived, 
  driverStartRide, 
  driverCompleteRide, 
  driverNoShow 
} from '../../api/driver';

export default function ActiveRide() {
  const { isOnline } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);
  const [rideState, setRideState] = useState('DRIVER_EN_ROUTE');
  const [noShowModal, setNoShowModal] = useState(false);
  const [noShowReason, setNoShowReason] = useState('Passenger unresponsive after 15 min wait');

  const loadActiveRide = async () => {
    setLoading(true);
    try {
      const res = await getActiveRide();
      if (res?.activeRide) {
        setActiveBooking(res.activeRide);
        setRideState(res.activeRide.bookingStatus || res.activeRide.status || 'DRIVER_ASSIGNED');
      } else {
        setActiveBooking(null);
      }
    } catch (err) {
      console.error('Failed to load active ride:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActiveRide();
  }, []);

  const advanceRideState = async () => {
    if (!activeBooking || updating) return;
    const bookingId = activeBooking.bookingId || activeBooking.id;
    setUpdating(true);

    try {
      if (rideState === 'DRIVER_ASSIGNED' || rideState === 'ACCEPTED') {
        await driverEnRoute(bookingId);
        setRideState('DRIVER_EN_ROUTE');
      } else if (rideState === 'DRIVER_EN_ROUTE') {
        await driverArrived(bookingId);
        setRideState('DRIVER_ARRIVED');
      } else if (rideState === 'DRIVER_ARRIVED') {
        await driverStartRide(bookingId);
        setRideState('IN_PROGRESS');
      } else if (rideState === 'IN_PROGRESS') {
        await driverCompleteRide(bookingId);
        setRideState('COMPLETED');
      }
      await loadActiveRide();
    } catch (err) {
      console.error('Failed to update state:', err);
      alert(err?.response?.data?.message || err.message || 'Error updating ride status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleReportNoShow = async (e) => {
    e.preventDefault();
    if (!activeBooking || updating) return;
    const bookingId = activeBooking.bookingId || activeBooking.id;
    setUpdating(true);

    try {
      await driverNoShow(bookingId, { reason: noShowReason });
      setRideState('NO_SHOW');
      setNoShowModal(false);
      await loadActiveRide();
    } catch (err) {
      console.error('Failed to report no-show:', err);
      alert(err?.response?.data?.message || err.message || 'Error reporting no show.');
    } finally {
      setUpdating(false);
    }
  };

  const getActionBtnText = () => {
    switch (rideState) {
      case 'ACCEPTED':
        return 'Start Journey to Pickup (En Route)';
      case 'DRIVER_EN_ROUTE':
        return 'Confirm Arrival at Pickup (Arrived)';
      case 'DRIVER_ARRIVED':
        return 'Passenger Onboard → Start Ride';
      case 'IN_PROGRESS':
        return 'Destination Reached → Complete Ride';
      case 'COMPLETED':
        return 'Ride Completed';
      case 'NO_SHOW':
        return 'No-Show Reported';
      default:
        return 'Update State';
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-10 max-w-5xl mx-auto py-20 text-center space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#e09900] mx-auto" />
        <div className="text-sm font-semibold text-neutral-300">Checking active dispatch assignments...</div>
      </div>
    );
  }

  if (!activeBooking) {
    return (
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Live Ride Execution</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Active Trip Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time waypoint navigation and state machine execution for assigned rides.
          </p>
        </div>

        <div className="p-10 rounded-3xl bg-[#0E1722] border border-white/10 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#e09900]">
            <Navigation className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              No Active Ride in Progress
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              You currently do not have an active passenger ride in progress. Ensure your status is{' '}
              <strong className={isOnline ? 'text-emerald-400' : 'text-amber-400'}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </strong>{' '}
              to receive instant dispatches, or review your scheduled bookings.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/driver/bookings/upcoming"
              className="px-6 py-3 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>View Upcoming Bookings</span>
            </Link>
            <Link
              to="/driver/dashboard"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Ride Execution</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Active Trip Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Execute ride state transitions in real time to notify the passenger and dispatch central.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-[#e09900]">
            {activeBooking.id}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase font-mono">
            {rideState.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* State Machine Stepper Progress */}
      <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-4">
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Ride Lifecycle Progress
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'DRIVER_EN_ROUTE', label: '1. En Route to Pickup' },
            { key: 'DRIVER_ARRIVED', label: '2. Arrived at Location' },
            { key: 'IN_PROGRESS', label: '3. Passenger Onboard' },
            { key: 'COMPLETED', label: '4. Trip Completed' },
          ].map((st, i) => {
            const stepOrder = ['ACCEPTED', 'DRIVER_EN_ROUTE', 'DRIVER_ARRIVED', 'IN_PROGRESS', 'COMPLETED'];
            const currentIdx = stepOrder.indexOf(rideState);
            const thisIdx = stepOrder.indexOf(st.key);
            const isDone = currentIdx >= thisIdx;
            const isCurrent = currentIdx === thisIdx;

            return (
              <div
                key={i}
                className={`p-3 rounded-2xl border transition-all text-xs font-bold ${
                  isCurrent
                    ? 'bg-[#e09900] text-black border-[#e09900] shadow-lg shadow-[#e09900]/20'
                    : isDone
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-black/40 text-neutral-500 border-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  <span>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Action Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E1722] to-[#142232] border border-[#e09900]/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs text-[#e09900] font-bold uppercase tracking-wider">
              Current Active Leg
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              {rideState === 'DRIVER_EN_ROUTE' && 'En Route to Passenger Pickup'}
              {rideState === 'DRIVER_ARRIVED' && 'Waiting for Passenger Curbside'}
              {rideState === 'IN_PROGRESS' && `En Route to Destination (${activeBooking.dropoff})`}
              {rideState === 'COMPLETED' && 'Trip Successfully Completed!'}
              {rideState === 'NO_SHOW' && 'No-Show Reported to Dispatch.'}
            </h2>
          </div>

          {rideState !== 'COMPLETED' && rideState !== 'NO_SHOW' && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                rideState === 'IN_PROGRESS' ? activeBooking.dropoff : activeBooking.pickup
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#e09900]" />
              <span>Launch GPS Navigation</span>
            </a>
          )}
        </div>

        {/* Big Action Button */}
        {rideState !== 'COMPLETED' && rideState !== 'NO_SHOW' ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={advanceRideState}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#e09900] to-amber-500 hover:brightness-110 text-black font-serif font-bold text-base sm:text-lg uppercase tracking-wider transition shadow-2xl shadow-[#e09900]/30 flex items-center justify-center gap-3"
            >
              <span>{getActionBtnText()}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {rideState === 'DRIVER_ARRIVED' && (
              <button
                type="button"
                onClick={() => setNoShowModal(true)}
                className="w-full text-center text-xs text-rose-400 hover:text-rose-300 underline py-1"
              >
                Passenger has not arrived (Report Customer No-Show)
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Trip lifecycle finished. Availability restored.</span>
            </div>
            <Link
              to="/driver/bookings/upcoming"
              className="text-xs text-[#e09900] hover:underline flex items-center gap-1"
            >
              <span>View Next Bookings</span>
            </Link>
          </div>
        )}
      </div>

      {/* Route & Passenger Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Route Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-4">
            <h3 className="font-serif text-base font-bold text-white border-b border-white/10 pb-3">
              Route Coordinates & Itinerary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#e09900]">
                  <MapPin className="w-4 h-4" />
                  <span>PICKUP ADDRESS</span>
                </div>
                <p className="text-white font-semibold pl-6">{activeBooking.pickup}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <MapPin className="w-4 h-4" />
                  <span>DESTINATION ADDRESS</span>
                </div>
                <p className="text-white font-semibold pl-6">{activeBooking.dropoff}</p>
              </div>

              {activeBooking.flight && (
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-2.5">
                  <Plane className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Flight Info: <strong>{activeBooking.flight}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Passenger & Vehicle Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-4">
            <h3 className="font-serif text-base font-bold text-white border-b border-white/10 pb-3">
              Passenger & VIP Protocol
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#e09900]" />
                  <span className="font-bold text-white">{activeBooking.passenger || 'VIP Guest'}</span>
                </div>
                {activeBooking.passengerPhone && (
                  <a
                    href={`tel:${activeBooking.passengerPhone}`}
                    className="px-3 py-1 rounded-full bg-[#e09900] text-black font-bold text-xs flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call VIP</span>
                  </a>
                )}
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                {activeBooking.vehicle && (
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Vehicle:</span>
                    <span className="font-bold text-white">{activeBooking.vehicle}</span>
                  </div>
                )}
                {activeBooking.fare && (
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Trip Fare:</span>
                    <span className="font-bold text-emerald-400">{activeBooking.fare}</span>
                  </div>
                )}
              </div>

              {activeBooking.instructions && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                  <strong>Special Instructions:</strong> {activeBooking.instructions}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* No Show Modal */}
      {noShowModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1722] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold text-white">Report Customer No-Show</h3>
            </div>
            <p className="text-xs text-neutral-300">
              Please verify that you have waited at least 15 minutes past the scheduled pickup time and attempted to call the passenger.
            </p>

            <form onSubmit={handleReportNoShow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Reason / Notes for Dispatch:
                </label>
                <textarea
                  rows={3}
                  required
                  value={noShowReason}
                  onChange={(e) => setNoShowReason(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNoShowModal(false)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs"
                >
                  Confirm No-Show
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Plane,
  Car,
  Navigation,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { getUpcomingBookings, acceptBooking, rejectBooking } from '../../api/driver';

export default function UpcomingBookings() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await getUpcomingBookings();
      if (Array.isArray(res?.bookings)) {
        setRides(res.bookings);
      } else {
        setRides([]);
      }
    } catch (err) {
      console.error('Failed to load upcoming bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      await acceptBooking(bookingId);
      await loadBookings();
    } catch (err) {
      console.error('Failed to accept booking:', err);
      alert(err?.response?.data?.message || err.message || 'Error accepting booking.');
    }
  };

  const handleReject = async (bookingId) => {
    const reason = window.prompt('Please provide a reason for declining:', 'Schedule conflict / Maintenance');
    if (reason === null) return;

    try {
      await rejectBooking(bookingId, { reason });
      await loadBookings();
    } catch (err) {
      console.error('Failed to reject booking:', err);
      alert(err?.response?.data?.message || err.message || 'Error declining booking.');
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled Dispatches</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Upcoming Assigned Bookings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Confirmed and pending VIP chauffeur reservations assigned to your vehicle.
          </p>
        </div>

        <div className="text-xs font-bold text-[#e09900] bg-[#e09900]/10 border border-[#e09900]/30 px-4 py-2 rounded-full font-mono">
          {rides.length} Scheduled Trips
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#e09900] mx-auto" />
          <div className="text-xs text-neutral-400">Loading scheduled bookings...</div>
        </div>
      ) : rides.length === 0 ? (
        <div className="p-10 rounded-3xl bg-[#0E1722] border border-white/10 text-center space-y-4 max-w-lg mx-auto">
          <Calendar className="w-12 h-12 text-[#e09900] mx-auto opacity-70" />
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-white">No Upcoming Bookings</h2>
            <p className="text-xs text-neutral-400">
              There are no scheduled rides assigned to your vehicle at this time. Stay online to receive instant dispatches from NYC Premier Central.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/driver/dashboard"
              className="px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Bookings List */
        <div className="space-y-6">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0E1722] border border-white/10 hover:border-[#e09900]/40 transition shadow-xl space-y-6"
            >
              {/* Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#e09900]">
                    {ride.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      ride.status === 'ACCEPTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-[#e09900]/20 text-[#e09900] border border-[#e09900]/30 animate-pulse'
                    }`}
                  >
                    {ride.status === 'ACCEPTED' ? 'Confirmed & Accepted' : 'New Assignment Pending'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-neutral-400">
                    Scheduled:{' '}
                    <strong className="text-white">
                      {ride.scheduledDate || 'Upcoming'} {ride.scheduledTime ? `• ${ride.scheduledTime}` : ''}
                    </strong>
                  </div>
                  {ride.fare && (
                    <div className="text-base font-bold text-emerald-400 font-serif">
                      {ride.fare}
                    </div>
                  )}
                </div>
              </div>

              {/* Route & Passenger Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Route */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#e09900]">
                      <MapPin className="w-4 h-4" />
                      <span>PICKUP ADDRESS</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white pl-6">
                      {ride.pickup}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <MapPin className="w-4 h-4" />
                      <span>DESTINATION</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white pl-6">
                      {ride.dropoff}
                    </p>
                  </div>

                  {ride.flightNumber && (
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
                      <Plane className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Flight: <strong>{ride.flightNumber}</strong></span>
                    </div>
                  )}
                </div>

                {/* Passenger & Metadata */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="text-neutral-500">Passenger:</span>
                      <span className="font-bold text-white">{ride.passengerName || 'VIP Guest'}</span>
                    </div>
                    {ride.passengerPhone && (
                      <div className="flex items-center justify-between text-neutral-300">
                        <span className="text-neutral-500">Phone:</span>
                        <a href={`tel:${ride.passengerPhone}`} className="text-[#e09900] hover:underline font-mono">
                          {ride.passengerPhone}
                        </a>
                      </div>
                    )}
                    {(ride.passengerCount || ride.luggageCount) && (
                      <div className="flex items-center justify-between text-neutral-300">
                        <span className="text-neutral-500">Capacity:</span>
                        <span>{ride.passengerCount || 1} Passengers • {ride.luggageCount || 0} Bags</span>
                      </div>
                    )}
                    {ride.distance && (
                      <div className="flex items-center justify-between text-neutral-300">
                        <span className="text-neutral-500">Distance & Time:</span>
                        <span>{ride.distance} {ride.duration ? `• ~${ride.duration}` : ''}</span>
                      </div>
                    )}
                  </div>

                  {ride.notes && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                      <strong>Dispatch Note:</strong> {ride.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to={`/driver/bookings/${ride.bookingId || ride.id}`}
                  className="text-xs font-bold text-[#e09900] hover:underline flex items-center gap-1.5"
                >
                  <span>Full Itinerary Details</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-3">
                  {(ride.assignmentStatus === 'ASSIGNED' || ride.bookingStatus === 'DRIVER_ASSIGNMENT_PENDING' || ride.status === 'ASSIGNED') && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleReject(ride.bookingId || ride.id)}
                        className="px-5 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAccept(ride.bookingId || ride.id)}
                        className="px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black text-xs font-bold transition shadow-lg shadow-[#e09900]/20 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept Booking</span>
                      </button>
                    </>
                  )}

                  {(ride.assignmentStatus === 'ACCEPTED' || ride.bookingStatus === 'DRIVER_ASSIGNED' || ride.status === 'ACCEPTED') && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        ride.pickupAddress || ride.pickup || 'New York'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Navigation className="w-4 h-4 text-[#e09900]" />
                      <span>Open in Maps</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

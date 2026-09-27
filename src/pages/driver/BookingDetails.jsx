import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Plane,
  Car,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { getBookingDetails } from '../../api/driver';

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      try {
        const res = await getBookingDetails(id);
        if (res) {
          setBooking(res);
        }
      } catch (err) {
        console.error('Failed to load booking details:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 sm:p-10 max-w-5xl mx-auto py-20 text-center space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#e09900] mx-auto" />
        <div className="text-xs text-neutral-400">Loading booking itinerary...</div>
      </div>
    );
  }

  const pickupStop = booking?.stops?.find((s) => s.type === 'PICKUP') || booking?.stops?.[0];
  const dropoffStop = booking?.stops?.find((s) => s.type === 'DROPOFF') || booking?.stops?.[booking?.stops?.length - 1];

  const bookingData = booking ? {
    id: booking.referenceNumber || booking.id,
    rawId: booking.id,
    status: booking.bookingStatus || 'ASSIGNED',
    bookingType: booking.bookingType || 'ONE_WAY',
    scheduledDate: booking.pickupAt ? new Date(booking.pickupAt).toLocaleDateString() : 'Upcoming',
    scheduledTime: booking.pickupAt ? new Date(booking.pickupAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00 PM',
    passengerName: booking.passengerName || 'VIP Passenger',
    passengerPhone: booking.passengerPhone || '',
    passengerEmail: booking.passengerEmail || '',
    pickup: pickupStop?.address || 'Pickup location',
    dropoff: dropoffStop?.address || 'Dropoff location',
    distance: booking.distanceMeters ? `${(booking.distanceMeters / 1609.34).toFixed(1)} miles` : undefined,
    duration: booking.estimatedDurationSeconds ? `${Math.round(booking.estimatedDurationSeconds / 60)} mins` : undefined,
    flightNumber: booking.flightNumber,
    specialInstructions: booking.specialInstructions,
    vehicle: booking.vehicleTypeName || booking.vehicleCategory || 'Executive Sedan',
    fare: {
      base: `$${Number(booking.subtotal || 0).toFixed(2)}`,
      surcharges: `$${Number(booking.surcharges || 0).toFixed(2)}`,
      tax: `$${Number(booking.tax || 0).toFixed(2)}`,
      total: `$${Number(booking.totalPrice || 0).toFixed(2)}`,
    },
  } : {
    id: id || 'BK-89055',
    rawId: id,
    status: 'ASSIGNED',
    bookingType: 'ONE_WAY',
    scheduledDate: 'Upcoming',
    scheduledTime: '12:00 PM',
    passengerName: 'VIP Passenger',
    passengerPhone: '+1 (212) 555-0100',
    pickup: 'NYC Premier Central Station',
    dropoff: 'Manhattan Executive Hub',
    distance: '10.5 miles',
    duration: '25 mins',
    fare: {
      base: '$150.00',
      surcharges: '$15.00',
      tax: '$15.00',
      total: '$180.00',
    },
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
      {/* Back link & Top Bar */}
      <div>
        <Link
          to="/driver/bookings/upcoming"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#e09900] transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bookings</span>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#e09900]">
              {bookingData.bookingType?.replace(/_/g, ' ') || 'CHAUFFEUR SERVICE'}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Booking Itinerary: {bookingData.id}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase">
              {bookingData.status || 'ASSIGNED'}
            </span>
            {bookingData.pickup && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  bookingData.pickup
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate in Maps</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Itinerary Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Route Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1722] border border-white/10 space-y-6">
            <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e09900]" />
              <span>Trip Route & Waypoints</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-[#e09900] uppercase font-mono">
                  Pickup Address
                </span>
                <p className="text-white font-semibold">{bookingData.pickup}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                  Drop-Off Destination
                </span>
                <p className="text-white font-semibold">{bookingData.dropoff}</p>
              </div>

              {(bookingData.distance || bookingData.duration) && (
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/5">
                  {bookingData.distance && <span>Estimated Distance: <strong>{bookingData.distance}</strong></span>}
                  {bookingData.duration && <span>Est. Duration: <strong>{bookingData.duration}</strong></span>}
                </div>
              )}
            </div>
          </div>

          {/* Passenger Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1722] border border-white/10 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#e09900]" />
              <span>Passenger Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-neutral-500">Passenger Name:</span>
                <div className="text-sm font-bold text-white">{bookingData.passengerName || 'VIP Guest'}</div>
              </div>

              {bookingData.passengerPhone && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-neutral-500">Contact Number:</span>
                  <div>
                    <a href={`tel:${bookingData.passengerPhone}`} className="text-sm font-bold text-[#e09900] hover:underline font-mono">
                      {bookingData.passengerPhone}
                    </a>
                  </div>
                </div>
              )}

              {bookingData.vehicle && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-neutral-500">Assigned Vehicle:</span>
                  <div className="font-semibold text-white">{bookingData.vehicle}</div>
                </div>
              )}

              {bookingData.flightNumber && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-neutral-500">Flight Radar Link:</span>
                  <div className="font-semibold text-blue-400 flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5" />
                    <span>{bookingData.flightNumber}</span>
                  </div>
                </div>
              )}
            </div>

            {bookingData.specialInstructions && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                <strong>Special Chauffeur Instructions:</strong> {bookingData.specialInstructions}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Financial Summary Card */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1722] border border-white/10 space-y-6">
            <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#e09900]" />
              <span>Trip Fare Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span>Base Fare:</span>
                <span className="font-semibold">{bookingData.fare?.base || '$150.00'}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Tolls & Airport Fees:</span>
                <span className="font-semibold">{bookingData.fare?.airportTollFee || '$15.00'}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400">
                <span>Chauffeur Gratuity:</span>
                <span className="font-bold">{bookingData.fare?.gratuity || '$25.00'}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-base font-bold text-white">
                <span>Total Driver Payout:</span>
                <span className="text-[#e09900] font-serif">{bookingData.fare?.total || '$190.00'}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/driver/active-ride"
                className="w-full py-3.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <span>Go To Active Ride</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

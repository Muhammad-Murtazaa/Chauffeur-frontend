import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase, 
  ArrowRight, 
  Plane, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Lock,
  UserCheck,
  Timer,
  AlertCircle,
  RefreshCw,
  CreditCard,
  Check,
  Crosshair,
  Map as MapIcon,
  Navigation
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createQuote } from '../api/booking';
import { getCurrentGPSLocation } from '../utils/googleMapsLoader';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GoogleMapModal from './GoogleMapModal';
import RouteMapPreview from './RouteMapPreview';
import AddressAutocompleteInput from './AddressAutocompleteInput';
import BookingStep2Form from './BookingStep2Form';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_live_51UVlKX21rHZOB63XhXi75sXXMFpLazsaZHxGQnI6ngZ72f3o03vkGccHDP8mDJwmGmsqiX35xVmjGP7GAJ9fHnZp00puJCBnHl'
);

export default function QuoteBookingWidget({ initialService = "one-way", compact = false }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, promptInstantQuote, openAuthModal } = useAuth();
  
  const [rideType, setRideType] = useState(initialService); // one-way, hourly, round-trip, city-to-city
  const [pickup, setPickup] = useState('');
  const [pickupLat, setPickupLat] = useState(null);
  const [pickupLng, setPickupLng] = useState(null);

  const [dropoff, setDropoff] = useState('');
  const [dropoffLat, setDropoffLat] = useState(null);
  const [dropoffLng, setDropoffLng] = useState(null);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [hours, setHours] = useState(3);
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [flightNumber, setFlightNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Step state
  const [step, setStep] = useState(1); // 1: Input details, 2: Review & Quote Options, 3: Success
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [locatingGPS, setLocatingGPS] = useState(false);
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [quoteError, setQuoteError] = useState(null);

  // Map Modal State
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [mapTarget, setMapTarget] = useState('pickup'); // 'pickup' or 'dropoff'

  // Live Quote Response State
  const [activeQuote, setActiveQuote] = useState(null);
  const [quoteOptions, setQuoteOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [routeSummary, setRouteSummary] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [countdown, setCountdown] = useState(900); // 15 min countdown in seconds

  // Passenger form state
  const [guestName, setGuestName] = useState(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');

  // Auto-sync guest fields when logged in
  useEffect(() => {
    if (user) {
      if (!guestName) setGuestName(`${user.firstName || ''} ${user.lastName || ''}`.trim());
      if (!guestPhone && user.phone) setGuestPhone(user.phone);
      if (!guestEmail && user.email) setGuestEmail(user.email);
    }
  }, [user]);

  // Set default date to tomorrow
  useEffect(() => {
    if (!date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [date]);

  // Expiration countdown timer
  useEffect(() => {
    if (step !== 2 || !activeQuote) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step, activeQuote]);

  const mapRideTypeToApi = (type) => {
    switch (type) {
      case 'hourly': return 'HOURLY';
      case 'round-trip': return 'RETURN';
      case 'city-to-city': return 'CITY_TO_CITY';
      default: return 'ONE_WAY';
    }
  };

  // Quick GPS Current Location for Pickup
  const handleUseCurrentLocation = async () => {
    setLocatingGPS(true);
    setQuoteError(null);
    try {
      const loc = await getCurrentGPSLocation();
      setPickup(loc.address);
      setPickupLat(loc.lat);
      setPickupLng(loc.lng);
    } catch (err) {
      console.error('GPS error:', err);
      setQuoteError(err.message || 'Unable to retrieve your current location.');
    } finally {
      setLocatingGPS(false);
    }
  };

  // Open Map Modal
  const handleOpenMap = (target) => {
    setMapTarget(target);
    setMapModalOpen(true);
  };

  // On Location Confirmed from Map Modal
  const handleMapLocationConfirmed = (locationData) => {
    if (mapTarget === 'pickup') {
      setPickup(locationData.address);
      setPickupLat(locationData.lat);
      setPickupLng(locationData.lng);
    } else {
      setDropoff(locationData.address);
      setDropoffLat(locationData.lat);
      setDropoffLng(locationData.lng);
    }
  };

  // Step 1 -> Calculate Live Quote
  const handleCalculateQuote = async (e) => {
    e.preventDefault();
    if (!pickup) {
      alert("Please enter a pickup location or airport terminal.");
      return;
    }

    setQuoteError(null);
    setLoadingQuote(true);

    try {
      const pickupDateTime = `${date}T${time}:00`;
      const payload = {
        bookingType: mapRideTypeToApi(rideType),
        pickupAddress: pickup,
        pickupLat: pickupLat ? Number(pickupLat) : undefined,
        pickupLng: pickupLng ? Number(pickupLng) : undefined,
        dropoffAddress: dropoff || (rideType === 'hourly' ? 'Manhattan & NYC Metro (As Directed)' : 'Destination'),
        dropoffLat: dropoffLat ? Number(dropoffLat) : undefined,
        dropoffLng: dropoffLng ? Number(dropoffLng) : undefined,
        pickupAt: new Date(pickupDateTime).toISOString(),
        passengerCount: Number(passengers),
        luggageCount: Number(luggage),
        hours: rideType === 'hourly' ? Number(hours) : 0,
        flightNumber: flightNumber || undefined,
        currency: 'USD',
      };

      const quoteRes = await createQuote(payload);
      
      setActiveQuote(quoteRes.quote);
      setRouteSummary(quoteRes.route);
      setQuoteOptions(quoteRes.vehicleOptions || []);
      setCountdown(quoteRes.expiresInSeconds || 900);

      if (quoteRes.vehicleOptions?.length > 0) {
        setSelectedOption(quoteRes.vehicleOptions[0]);
      }

      setStep(2);
    } catch (err) {
      console.error('Quote calculation error:', err);
      setQuoteError(err?.response?.data?.message || err.message || 'Unable to calculate quote. Please check your addresses.');
    } finally {
      setLoadingQuote(false);
    }
  };

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`w-full bg-[#0E1722] rounded-3xl border border-gold/30 shadow-2xl overflow-hidden ${
      compact ? 'p-5' : 'p-6 sm:p-8'
    }`}>
      {/* Google Maps Modal */}
      <GoogleMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        onSelectLocation={handleMapLocationConfirmed}
        initialAddress={mapTarget === 'pickup' ? pickup : dropoff}
        initialLat={mapTarget === 'pickup' ? pickupLat : dropoffLat}
        initialLng={mapTarget === 'pickup' ? pickupLng : dropoffLng}
        title={mapTarget === 'pickup' ? 'Select Pickup Location on Google Map' : 'Select Destination on Google Map'}
      />

      {/* Tab Navigation for Ride Types */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#080E14] rounded-2xl border border-white/5 mb-6">
        {[
          { id: 'one-way', label: 'One Way / Airport' },
          { id: 'hourly', label: 'Hourly / Chauffeur' },
          { id: 'round-trip', label: 'Round Trip' },
          { id: 'city-to-city', label: 'City-to-City' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setRideType(tab.id); setStep(1); }}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition text-center ${
              rideType === tab.id
                ? 'bg-gold text-black shadow-md shadow-gold/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {quoteError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{quoteError}</span>
        </div>
      )}

      {step === 1 && (
        /* Step 1: Trip & Route Details Form */
        <form onSubmit={handleCalculateQuote} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup Address with Recommendation Autocomplete, GPS & Map Pin */}
            <AddressAutocompleteInput
              label="Pickup Location / Airport"
              value={pickup}
              onChange={(val) => {
                setPickup(val);
                setPickupLat(null);
                setPickupLng(null);
              }}
              onSelectLocation={({ address, lat, lng }) => {
                setPickup(address);
                if (lat && lng) {
                  setPickupLat(lat);
                  setPickupLng(lng);
                }
              }}
              placeholder="e.g. JFK Terminal 4, The Plaza Hotel, or Address"
              required={true}
              onUseCurrentGPS={handleUseCurrentLocation}
              locatingGPS={locatingGPS}
              onPickOnMap={() => handleOpenMap('pickup')}
            />

            {/* Dropoff Address with Recommendation Autocomplete & Map Pin */}
            <AddressAutocompleteInput
              label={rideType === 'hourly' ? 'Primary Destination Area' : 'Dropoff Location'}
              value={dropoff}
              onChange={(val) => {
                setDropoff(val);
                setDropoffLat(null);
                setDropoffLng(null);
              }}
              onSelectLocation={({ address, lat, lng }) => {
                setDropoff(address);
                if (lat && lng) {
                  setDropoffLat(lat);
                  setDropoffLng(lng);
                }
              }}
              placeholder={rideType === 'hourly' ? "e.g. Manhattan Midtown / As Directed" : "e.g. Wall Street, Brooklyn, or EWR"}
              required={rideType !== 'hourly'}
              onPickOnMap={() => handleOpenMap('dropoff')}
            />
          </div>

          {/* Date, Time, Duration / Flight */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                Time
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
              />
            </div>

            {rideType === 'hourly' ? (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  Duration
                </label>
                <select
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                >
                  {[2, 3, 4, 5, 6, 8, 10, 12].map(h => (
                    <option key={h} value={h}>{h} Hours Reserved</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                  Flight # (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. BA 178"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
                />
              </div>
            )}

            {/* Passengers & Luggage */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold" />
                Guests & Bags
              </label>
              <div className="grid grid-cols-2 gap-1 bg-[#14202D] border border-white/10 rounded-xl p-1 text-xs text-white">
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="bg-transparent text-center focus:outline-none py-2"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 14].map(p => (
                    <option key={p} value={p}>{p} Pax</option>
                  ))}
                </select>
                <select
                  value={luggage}
                  onChange={(e) => setLuggage(Number(e.target.value))}
                  className="bg-transparent text-center focus:outline-none py-2"
                >
                  {[0, 1, 2, 3, 4, 6, 8, 12].map(l => (
                    <option key={l} value={l}>{l} Bags</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Google Maps route calculation & guaranteed all-inclusive flat rates</span>
            </div>

            <button
              type="submit"
              disabled={loadingQuote}
              className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loadingQuote ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Calculating Route & Pricing...</span>
                </>
              ) : (
                <>
                  <span>Calculate Live Quotes</span>
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {step === 2 && activeQuote && (
        <Elements stripe={stripePromise}>
          <BookingStep2Form
            activeQuote={activeQuote}
            routeSummary={routeSummary}
            countdown={countdown}
            formatSeconds={formatSeconds}
            quoteOptions={quoteOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            flightNumber={flightNumber}
            setFlightNumber={setFlightNumber}
            guestName={guestName}
            setGuestName={setGuestName}
            guestPhone={guestPhone}
            setGuestPhone={setGuestPhone}
            guestEmail={guestEmail}
            setGuestEmail={setGuestEmail}
            specialNotes={specialNotes}
            setSpecialNotes={setSpecialNotes}
            submittingBooking={submittingBooking}
            setSubmittingBooking={setSubmittingBooking}
            setConfirmedBooking={setConfirmedBooking}
            setStep={setStep}
            user={user}
            isAuthenticated={isAuthenticated}
            promptInstantQuote={promptInstantQuote}
            setQuoteError={setQuoteError}
          />
        </Elements>
      )}

      {step === 3 && confirmedBooking && (
        /* Step 3: Booking Confirmed Screen */
        <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto ring-4 ring-gold/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              confirmedBooking.bookingStatus === 'CONFIRMED' || confirmedBooking.paymentStatus === 'PAID'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            }`}>
              <span>● Status: {confirmedBooking.bookingStatus}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white pt-2">
              {confirmedBooking.bookingStatus === 'CONFIRMED' || confirmedBooking.paymentStatus === 'PAID'
                ? 'Chauffeur Reservation Confirmed!'
                : 'Reservation Pending Payment'}
            </h3>
            <p className="text-xs text-neutral-400">
              Booking Reference: <strong className="text-gold font-mono text-sm">{confirmedBooking.referenceNumber}</strong>
            </p>
          </div>

          <div className="p-5 max-w-md mx-auto bg-[#14202D] rounded-2xl border border-gold/30 text-xs text-neutral-300 text-left space-y-2.5">
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-neutral-400">Passenger:</span>
              <span className="font-bold text-white">{confirmedBooking.passengerName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-neutral-400">Pickup Date & Time:</span>
              <span className="font-bold text-white">
                {new Date(confirmedBooking.pickupAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-neutral-400">Pickup Address:</span>
              <span className="font-bold text-white text-right max-w-[220px] truncate">
                {activeQuote?.pickupAddress}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-neutral-400">Dropoff Address:</span>
              <span className="font-bold text-white text-right max-w-[220px] truncate">
                {activeQuote?.dropoffAddress}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-neutral-400">Payment Processing:</span>
              <span className={`font-bold flex items-center gap-1 ${
                confirmedBooking.paymentStatus === 'PAID' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                <span>● {confirmedBooking.paymentStatus === 'PAID' ? 'Stripe Verified & Paid' : 'Pending Authorization'}</span>
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">Total Paid (All-Inclusive):</span>
              <span className="font-serif text-base font-bold text-gold">
                ${Number(confirmedBooking.totalPrice).toFixed(2)} {confirmedBooking.currency}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setConfirmedBooking(null);
                setActiveQuote(null);
                setStep(1);
              }}
              className="bg-gold text-black font-bold text-xs py-3 px-6 rounded-full hover:bg-gold-hover transition shadow-lg shadow-gold/20"
            >
              Book Another Chauffeur
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-white/10 text-white font-bold text-xs py-3 px-6 rounded-full hover:bg-white/20 transition border border-white/15"
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

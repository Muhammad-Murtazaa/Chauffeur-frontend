import React, { useState, useEffect, useRef } from 'react';
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
  Navigation,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createQuote, getVehicleTypes } from '../api/booking';
import { getCurrentGPSLocation } from '../utils/googleMapsLoader';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GoogleMapModal from './GoogleMapModal';
import RouteMapPreview from './RouteMapPreview';
import AddressAutocompleteInput from './AddressAutocompleteInput';
import BookingStep2Form from './BookingStep2Form';
import { getVehicleImage } from '../utils/vehicleImage';
import { fleetData } from '../data/fleetData';
import ReservationTripSummary from './ReservationTripSummary';
import { orderReservationVehicles, reservationVehicleLabel } from '../utils/reservationVehicles';

const fleetVehicle = (fleetId, name, category) => {
  const vehicle = fleetData.find((item) => item.id === fleetId);
  return {
    id: fleetId,
    name,
    displayName: name,
    category,
    passengerCapacity: vehicle?.passengers || 3,
    luggageCapacity: vehicle?.luggage || 2,
    imageUrl: vehicle?.image,
  };
};

const fallbackReservationVehicles = [
  fleetVehicle('business-sedan', 'Business Sedan', 'STANDARD'),
  fleetVehicle('business-suv', 'Executive Full-Size SUV', 'SUV'),
  fleetVehicle('premium-sedan', 'First Class', 'EXECUTIVE'),
  fleetVehicle('jet-sprinter', 'Sprinter', 'VAN'),
];

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_live_51UVlKX21rHZOB63XhXi75sXXMFpLazsaZHxGQnI6ngZ72f3o03vkGccHDP8mDJwmGmsqiX35xVmjGP7GAJ9fHnZp00puJCBnHl'
);

export default function QuoteBookingWidget({ initialService = "one-way", compact = false, referenceFlow = false }) {
  const { user } = useAuth();
  
  const urlParams = new URLSearchParams(window.location.search);
  const initialRideType = (() => {
    const type = urlParams.get('type');
    if (type === 'from_airport' || type === 'from-airport') return 'from-airport';
    if (type === 'to_airport' || type === 'to-airport') return 'to-airport';
    if (type === 'hourly') return 'hourly';
    return type === 'p2p' ? 'one-way' : initialService;
  })();
  const [rideType, setRideType] = useState(initialRideType);
  const [pickup, setPickup] = useState(() => urlParams.get('from') || '');
  const [pickupLat, setPickupLat] = useState(null);
  const [pickupLng, setPickupLng] = useState(null);

  const [dropoff, setDropoff] = useState(() => urlParams.get('to') || '');
  const [dropoffLat, setDropoffLat] = useState(null);
  const [dropoffLng, setDropoffLng] = useState(null);

  const [date, setDate] = useState(() => {
    const dateParam = urlParams.get('date');
    if (dateParam) return dateParam;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState(() => urlParams.get('time') || '12:00');
  const [hours, setHours] = useState(3);
  const [passengers, setPassengers] = useState(() => Math.max(1, Math.min(14, Number(urlParams.get('pax')) || 2)));
  const [luggage, setLuggage] = useState(2);
  const [flightNumber, setFlightNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [childSeat, setChildSeat] = useState(false);
  const [meetAndGreet, setMeetAndGreet] = useState(false);
  const quoteRequestId = useRef(0);
  const vehicleCarouselRef = useRef(null);

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
  const [vehicleCatalog, setVehicleCatalog] = useState(fallbackReservationVehicles);
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

  useEffect(() => {
    if (!referenceFlow) return;
    getVehicleTypes().then((types) => {
      const reservationVehicles = orderReservationVehicles(types);
      if (reservationVehicles.length) setVehicleCatalog(reservationVehicles);
    }).catch(() => {});
  }, [referenceFlow]);

  // Expiration countdown timer
  useEffect(() => {
    if (!activeQuote || (referenceFlow ? step >= 4 : step !== 2)) return;
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
  }, [step, activeQuote, referenceFlow]);

  const mapRideTypeToApi = (type) => {
    switch (type) {
      case 'hourly': return 'HOURLY';
      case 'round-trip': return 'RETURN';
      case 'city-to-city': return 'CITY_TO_CITY';
      default: return 'ONE_WAY';
    }
  };

  const clearQuote = () => {
    quoteRequestId.current += 1;
    setLoadingQuote(false);
    setQuoteError(null);
    setActiveQuote(null);
    setRouteSummary(null);
    setQuoteOptions([]);
    setSelectedOption(null);
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
    e?.preventDefault();
    if (!pickup) {
      if (!referenceFlow) alert("Please enter a pickup location or airport terminal.");
      return;
    }

    const requestId = ++quoteRequestId.current;

    setQuoteError(null);
    setLoadingQuote(true);

    try {
      const pickupDateTime = `${date}T${time}:00`;
      const payload = {
        bookingType: mapRideTypeToApi(rideType),
        pickupAddress: pickup,
        pickupLat: pickupLat ? Number(pickupLat) : undefined,
        pickupLng: pickupLng ? Number(pickupLng) : undefined,
        dropoffAddress: rideType === 'hourly' ? 'Manhattan & NYC Metro (As Directed)' : (dropoff || 'Destination'),
        dropoffLat: dropoffLat ? Number(dropoffLat) : undefined,
        dropoffLng: dropoffLng ? Number(dropoffLng) : undefined,
        pickupAt: new Date(pickupDateTime).toISOString(),
        passengerCount: Number(passengers),
        luggageCount: Number(luggage),
        hours: rideType === 'hourly' ? Number(hours) : 0,
        flightNumber: flightNumber || undefined,
        childSeat: childSeat || undefined,
        meetAndGreet: meetAndGreet || undefined,
        currency: 'USD',
      };

      const quoteRes = await createQuote(payload);
      if (requestId !== quoteRequestId.current) return;
      
      setActiveQuote(quoteRes.quote);
      setRouteSummary(quoteRes.route);
      const availableOptions = quoteRes.vehicleOptions || [];
      const reservationOptions = referenceFlow ? orderReservationVehicles(availableOptions) : availableOptions;
      setQuoteOptions(reservationOptions);
      setCountdown(quoteRes.expiresInSeconds || 900);

      if (reservationOptions.length > 0) {
        setSelectedOption(reservationOptions[0]);
      }

      setStep(referenceFlow ? 1 : 2);
    } catch (err) {
      if (requestId !== quoteRequestId.current) return;
      console.error('Quote calculation error:', err);
      setQuoteError(err?.response?.data?.message || err.message || 'Unable to calculate quote. Please check your addresses.');
    } finally {
      if (requestId === quoteRequestId.current) setLoadingQuote(false);
    }
  };

  useEffect(() => {
    if (!referenceFlow || step !== 1) return;
    if (activeQuote) return;
    const tripIsReady = pickup.trim().length > 2 && date && time && (rideType === 'hourly' || dropoff.trim().length > 2);
    if (!tripIsReady) return;
    const timeout = setTimeout(() => { void handleCalculateQuote(); }, 650);
    return () => clearTimeout(timeout);
  }, [referenceFlow, step, activeQuote, rideType, pickup, pickupLat, pickupLng, dropoff, dropoffLat, dropoffLng, date, time, hours, passengers, flightNumber, childSeat, meetAndGreet]);

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const scrollVehicles = (direction) => {
    vehicleCarouselRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  const displayVehicleOptions = activeQuote ? quoteOptions : vehicleCatalog;
  const hasQuotedVehicles = Boolean(activeQuote && quoteOptions.length);

  return (
    <div className={`w-full ${compact ? 'bg-[#071019]/35 rounded-2xl border border-[#d2b16d]/40 shadow-2xl backdrop-blur-[2px] p-3 sm:p-4' : 'bg-[#0E1722] rounded-3xl border border-gold/30 shadow-2xl overflow-hidden p-6 sm:p-8'}`}>
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

      {referenceFlow && (
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">Your car will be waiting</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-300">Chauffeured travel across New York and worldwide. Tell us the trip and you’ll see the price before anything is charged.</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-300">
            <span>✓ No charge to book</span><span>✓ We track your flight</span><span>✓ Child seat or meet-and-greet on request</span>
          </div>
        </div>
      )}

      {/* Tab Navigation for Ride Types */}
      {referenceFlow && (
        <div className="mb-6 flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold">
          {['Trip', 'Details', 'Payment'].map((label, index) => {
            const active = step === index + 1;
            const complete = step > index + 1;
            return <React.Fragment key={label}>
              {index > 0 && <span className="h-px w-6 sm:w-12 bg-white/15" />}
              <span className={`flex items-center gap-2 ${active ? 'text-gold' : complete ? 'text-emerald-400' : 'text-neutral-500'}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${active ? 'border-gold bg-gold text-black' : complete ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/20'}`}>{complete ? <Check className="h-3 w-3" /> : index + 1}</span>
                {label}
              </span>
            </React.Fragment>;
          })}
        </div>
      )}

      <div className={referenceFlow && step === 1 ? 'grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]' : ''}>
      <div className="min-w-0">

      {referenceFlow && step === 1 && <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Trip type</div>}
      {(!referenceFlow || step === 1) && <div className={`${compact ? 'flex flex-wrap justify-center gap-1.5 p-1 bg-black/45 rounded-full border border-white/10 mb-3 sm:mb-4 sm:w-fit sm:mx-auto' : 'grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#080E14] rounded-2xl border border-white/5 mb-6'}`}>
        {(compact || referenceFlow ? [
          { id: 'one-way', label: 'Point to point' },
          { id: 'from-airport', label: 'From airport' },
          { id: 'to-airport', label: 'To airport' },
          { id: 'hourly', label: 'Hourly' }
        ] : [
          { id: 'one-way', label: 'One Way / Airport' },
          { id: 'hourly', label: 'Hourly / Chauffeur' },
          { id: 'round-trip', label: 'Round Trip' },
          { id: 'city-to-city', label: 'City-to-City' },
        ]).map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setRideType(tab.id); if (!['from-airport', 'to-airport'].includes(tab.id)) setFlightNumber(''); setStep(1); clearQuote(); }}
            className={`font-bold transition text-center ${compact ? 'px-3.5 sm:px-5 py-2 text-xs sm:text-sm rounded-full' : 'py-2.5 px-3 text-xs sm:text-sm rounded-xl'} ${
              rideType === tab.id
                ? 'bg-gold text-black shadow-md shadow-gold/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>}

      {quoteError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{quoteError}{quoteError.includes('custom quote') && <> <a href="/contact-us" className="font-bold underline underline-offset-2">Request a custom quote</a>.</>}</span>
        </div>
      )}

      {step === 1 && (
        /* Step 1: Trip & Route Details Form */
        <form onSubmit={handleCalculateQuote} className={compact ? 'space-y-3' : 'space-y-5'}>
          {compact ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_1.3fr_.75fr_auto] gap-2.5 items-end">
              <AddressAutocompleteInput
                label="Pickup"
                value={pickup}
                transparent={compact}
                onChange={(val) => { setPickup(val); setPickupLat(null); setPickupLng(null); if (referenceFlow) clearQuote(); }}
                onSelectLocation={({ address, lat, lng }) => { setPickup(address); setPickupLat(lat); setPickupLng(lng); if (referenceFlow) clearQuote(); }}
                placeholder="Address, airport, or hotel"
                required
              />
              {rideType === 'hourly' ? (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d8bc80] mb-1.5">Duration</label>
                  <select value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full h-[46px] bg-[#14202D] border border-white/10 rounded-xl px-3 text-sm text-white">
                    {[2, 3, 4, 5, 6, 8, 10, 12].map((h) => <option key={h} value={h}>{h} hours</option>)}
                  </select>
                </div>
              ) : (
                <AddressAutocompleteInput
                  label="Drop-off"
                  value={dropoff}
                  transparent={compact}
                  onChange={(val) => { setDropoff(val); setDropoffLat(null); setDropoffLng(null); if (referenceFlow) clearQuote(); }}
                  onSelectLocation={({ address, lat, lng }) => { setDropoff(address); setDropoffLat(lat); setDropoffLng(lng); if (referenceFlow) clearQuote(); }}
                  placeholder="Where to?"
                  required
                />
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d8bc80] mb-1.5">Date &amp; time</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input type="date" required value={date} onChange={(e) => { setDate(e.target.value); if (referenceFlow) clearQuote(); }} className="min-w-0 h-[46px] bg-[#14202D]/65 border border-white/10 rounded-xl px-2 text-xs text-white" />
                  <input type="time" required value={time} onChange={(e) => { setTime(e.target.value); if (referenceFlow) clearQuote(); }} className="min-w-0 h-[46px] bg-[#14202D]/65 border border-white/10 rounded-xl px-2 text-xs text-white" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d8bc80] mb-1.5">Guests</label>
                <div className="flex h-[46px] items-center justify-between rounded-xl border border-white/10 bg-[#14202D]/65 px-2">
                  <button type="button" aria-label="Remove one guest" disabled={passengers <= 1} onClick={() => { setPassengers((count) => Math.max(1, count - 1)); if (referenceFlow) clearQuote(); }} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-40"><Minus className="h-3 w-3" /></button>
                  <span className="text-sm text-white">{passengers}</span>
                  <button type="button" aria-label="Add one guest" disabled={passengers >= 14} onClick={() => { setPassengers((count) => Math.min(14, count + 1)); if (referenceFlow) clearQuote(); }} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-40"><Plus className="h-3 w-3" /></button>
                </div>
              </div>
              <button type="submit" disabled={loadingQuote} className="sm:col-span-2 xl:col-span-1 h-[46px] px-6 rounded-xl bg-[#d2b16d] hover:bg-[#e1c27e] text-[#17130b] font-extrabold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60">
                <span>{loadingQuote ? 'Finding rates…' : 'Get quote'}</span><ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup Address with Recommendation Autocomplete, GPS & Map Pin */}
            <AddressAutocompleteInput
              label={referenceFlow && rideType === 'hourly' ? 'Pickup location' : 'Pickup'}
              value={pickup}
              transparent={compact}
              onChange={(val) => {
                setPickup(val);
                setPickupLat(null);
                setPickupLng(null);
                if (referenceFlow) clearQuote();
              }}
              onSelectLocation={({ address, lat, lng }) => {
                setPickup(address);
                if (lat && lng) {
                  setPickupLat(lat);
                  setPickupLng(lng);
                }
                if (referenceFlow) clearQuote();
              }}
              placeholder="e.g. JFK Terminal 4, The Plaza Hotel, or Address"
              required={true}
              onUseCurrentGPS={referenceFlow ? undefined : handleUseCurrentLocation}
              locatingGPS={locatingGPS}
              onPickOnMap={referenceFlow ? undefined : () => handleOpenMap('pickup')}
            />

            {/* Dropoff Address with Recommendation Autocomplete & Map Pin */}
            {!(referenceFlow && rideType === 'hourly') && <AddressAutocompleteInput
              label={referenceFlow ? 'Drop-off' : rideType === 'hourly' ? 'Primary Destination Area' : 'Dropoff Location'}
              value={dropoff}
              transparent={compact}
              onChange={(val) => {
                setDropoff(val);
                setDropoffLat(null);
                setDropoffLng(null);
                if (referenceFlow) clearQuote();
              }}
              onSelectLocation={({ address, lat, lng }) => {
                setDropoff(address);
                if (lat && lng) {
                  setDropoffLat(lat);
                  setDropoffLng(lng);
                }
                if (referenceFlow) clearQuote();
              }}
              placeholder={rideType === 'hourly' ? "e.g. Manhattan Midtown / As Directed" : "e.g. Wall Street, Brooklyn, or EWR"}
              required={rideType !== 'hourly'}
              onPickOnMap={referenceFlow ? undefined : () => handleOpenMap('dropoff')}
            />}
          </div>
          </>
          )}

          {!compact && <>
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
                onChange={(e) => { setDate(e.target.value); if (referenceFlow) clearQuote(); }}
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
                onChange={(e) => { setTime(e.target.value); if (referenceFlow) clearQuote(); }}
                className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
              />
            </div>

            {rideType === 'hourly' ? (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {referenceFlow ? 'Hours' : 'Duration'}
                </label>
                <select
                  value={hours}
                  onChange={(e) => { setHours(Number(e.target.value)); if (referenceFlow) clearQuote(); }}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                >
                  {(referenceFlow ? Array.from({ length: 11 }, (_, i) => i + 2) : [2, 3, 4, 5, 6, 8, 10, 12]).map(h => (
                    <option key={h} value={h}>{h} Hours Reserved</option>
                  ))}
                </select>
              </div>
            ) : (rideType === 'from-airport' || rideType === 'to-airport' || !referenceFlow) ? (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                  {referenceFlow ? 'Flight number (optional)' : 'Flight # (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. BA 178"
                  value={flightNumber}
                  onChange={(e) => { setFlightNumber(e.target.value); if (referenceFlow) clearQuote(); }}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
                />
              </div>
            ) : null}

            {/* Passengers & Luggage */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold" />
                {referenceFlow ? 'Passengers' : 'Guests & Bags'}
              </label>
              <div className={`grid ${referenceFlow ? 'grid-cols-1' : 'grid-cols-2'} gap-1 bg-[#14202D] border border-white/10 rounded-xl p-1 text-xs text-white`}>
                <select
                  value={passengers}
                  onChange={(e) => { setPassengers(Number(e.target.value)); if (referenceFlow) clearQuote(); }}
                  className="bg-transparent text-center focus:outline-none py-2"
                >
                  {(referenceFlow ? Array.from({ length: 14 }, (_, i) => i + 1) : [1, 2, 3, 4, 5, 6, 8, 10, 14]).map(p => (
                    <option key={p} value={p}>{referenceFlow ? p : `${p} Pax`}</option>
                  ))}
                </select>
                {!referenceFlow && <select
                  value={luggage}
                onChange={(e) => { setLuggage(Number(e.target.value)); if (referenceFlow) clearQuote(); }}
                  className="bg-transparent text-center focus:outline-none py-2"
                >
                  {[0, 1, 2, 3, 4, 6, 8, 12].map(l => (
                    <option key={l} value={l}>{l} Bags</option>
                  ))}
                </select>}
              </div>
            </div>
          </div>

          {referenceFlow && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">Extras (optional)</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" aria-pressed={childSeat} onClick={() => { setChildSeat((value) => !value); clearQuote(); }} className={`rounded-xl border px-4 py-2.5 text-sm transition ${childSeat ? 'border-gold bg-gold/10 text-gold' : 'border-white/15 bg-white/[.03] text-neutral-200 hover:border-white/30'}`}>Child seat <span className="text-xs">(+$15)</span></button>
                <button type="button" aria-pressed={meetAndGreet} onClick={() => { setMeetAndGreet((value) => !value); clearQuote(); }} className={`rounded-xl border px-4 py-2.5 text-sm transition ${meetAndGreet ? 'border-gold bg-gold/10 text-gold' : 'border-white/15 bg-white/[.03] text-neutral-200 hover:border-white/30'}`}>Meet &amp; greet <span className="text-xs">(+$35)</span></button>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            {!compact && !referenceFlow && <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Google Maps route calculation & guaranteed all-inclusive flat rates</span>
            </div>}

            {!compact && !referenceFlow && <button
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
            </button>}
          </div>
          </>}
        </form>
      )}

      {referenceFlow && step === 1 && (
        <section className="mt-7 space-y-5 border-t border-white/10 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-300">Your route</h2>
          {!activeQuote && <p className="text-xs text-neutral-500">Add your pickup and drop-off to see available fixed fares.</p>}
          {activeQuote && <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="mt-1 text-sm text-neutral-400">{activeQuote.pickupAddress} → {activeQuote.dropoffAddress}</p>
              <p className="text-xs text-neutral-500">{routeSummary?.distanceMiles} mi · about {routeSummary?.durationMinutes} min · {new Date(activeQuote.pickupAt).toLocaleString()}</p>
            </div>
            {activeQuote && <div className="rounded-xl border border-gold/25 bg-gold/10 px-3 py-2 text-xs text-neutral-300">Quote expires in <strong className="font-mono text-gold">{formatSeconds(countdown)}</strong></div>}
          </div>}
          {activeQuote && <RouteMapPreview pickupAddress={activeQuote.pickupAddress} pickupLat={activeQuote.pickupLat} pickupLng={activeQuote.pickupLng} dropoffAddress={activeQuote.dropoffAddress} dropoffLat={activeQuote.dropoffLat} dropoffLng={activeQuote.dropoffLng} distanceMiles={routeSummary?.distanceMiles} durationMinutes={routeSummary?.durationMinutes} />}
          <div className="flex items-center justify-between gap-3"><h2 className="text-xs font-bold uppercase tracking-widest text-neutral-300">The cars</h2>{!activeQuote && <p className="text-xs text-neutral-500">{loadingQuote ? 'Checking available fixed fares…' : 'Add your trip to see fixed fares.'}</p>}</div>
          <div className="flex justify-end gap-2">
            <button type="button" aria-label="Previous vehicles" disabled={displayVehicleOptions.length <= 3} onClick={() => scrollVehicles(-1)} className="rounded-full border border-white/15 p-2 text-neutral-300 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="More vehicles" disabled={displayVehicleOptions.length <= 3} onClick={() => scrollVehicles(1)} className="rounded-full border border-white/15 p-2 text-neutral-300 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div ref={vehicleCarouselRef} className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2">
            {displayVehicleOptions.map((option) => {
              const selected = hasQuotedVehicles && selectedOption?.vehicleTypeId === option.vehicleTypeId;
              return <button key={option.id} type="button" disabled={!hasQuotedVehicles} onClick={() => setSelectedOption(option)} className={`w-[260px] shrink-0 snap-start rounded-2xl border p-3 text-left transition ${selected ? 'border-gold bg-gold/10 ring-1 ring-gold/60' : 'border-white/10 bg-white/[.03]'} ${hasQuotedVehicles ? 'hover:border-gold/60' : 'cursor-default opacity-80'}`}>
                <img src={getVehicleImage(option)} alt={reservationVehicleLabel(option)} className="mb-3 h-40 w-full rounded-xl bg-[#101820] object-cover" loading="lazy" />
                <div className="flex items-start justify-between gap-2"><div><div className="text-sm font-bold text-white">{reservationVehicleLabel(option)}</div><div className="mt-1 text-xs text-neutral-400">{option.passengerCapacity} passengers · {option.luggageCapacity} bags</div></div>{selected && <Check className="h-4 w-4 text-gold" />}</div>
                <div className="mt-4 border-t border-white/10 pt-3 text-sm font-semibold text-gold">{hasQuotedVehicles ? `$${Number(option.totalPrice).toFixed(2)}` : 'Enter your trip to see the price'}</div>
              </button>;
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-neutral-400">Fixed fare shown. Tolls and wait time are billed separately.</p>
            <button type="button" disabled={!selectedOption || countdown === 0 || loadingQuote} onClick={() => setStep(2)} className="flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3 font-bold text-black transition hover:bg-gold-hover disabled:opacity-50">Continue <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>
      )}

      </div>
      {referenceFlow && step === 1 && <ReservationTripSummary rideType={rideType} pickup={pickup} dropoff={dropoff} date={date} time={time} hours={hours} passengers={passengers} selectedOption={selectedOption} />}
      </div>

      <div className={referenceFlow && (step === 2 || step === 3) ? 'grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]' : ''}><div className="min-w-0">
      {(step === 2 || (referenceFlow && step === 3)) && activeQuote && (
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
            setQuoteError={setQuoteError}
            referenceFlow={referenceFlow}
            bookingStep={step}
          />
        </Elements>
      )}
      </div>
      {referenceFlow && (step === 2 || step === 3) && <ReservationTripSummary rideType={rideType} pickup={pickup} dropoff={dropoff} date={date} time={time} hours={hours} passengers={passengers} selectedOption={selectedOption} />}
      </div>

      {((referenceFlow && step === 4) || (!referenceFlow && step === 3)) && confirmedBooking && (
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

import React, { useState } from 'react';
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
  Sparkles 
} from 'lucide-react';
import { fleetData } from '../data/fleetData';

export default function QuoteBookingWidget({ initialService = "one-way", compact = false }) {
  const navigate = useNavigate();
  const [rideType, setRideType] = useState(initialService); // one-way, hourly, round-trip, city-to-city
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [hours, setHours] = useState(3);
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState('premium-sedan');
  const [flightNumber, setFlightNumber] = useState('');
  const [step, setStep] = useState(1); // 1: Input details, 2: Review & Quote
  const [submitted, setSubmitted] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Selected vehicle calculation
  const selectedVehicle = fleetData.find(v => v.id === selectedVehicleId) || fleetData[0];

  // Dynamic estimate calculation
  const calculatePrice = () => {
    let base = 95;
    if (selectedVehicle.id === 'premium-sedan') base = 110;
    else if (selectedVehicle.id === 'business-suv') base = 125;
    else if (selectedVehicle.id === 'premium-suv') base = 145;
    else if (selectedVehicle.id === 'stretch-limo') base = 165;
    else if (selectedVehicle.id === 'jet-sprinter') base = 225;
    else if (selectedVehicle.id === 'sprinter-limo') base = 210;
    else if (selectedVehicle.id === 'transit-van') base = 175;
    else if (selectedVehicle.id === 'mini-bus') base = 260;
    else if (selectedVehicle.id === 'charter-bus') base = 350;

    if (rideType === 'hourly') {
      const total = base * Math.max(2, hours);
      return {
        base: total,
        tolls: 25,
        gratuity: Math.round(total * 0.20),
        total: Math.round(total * 1.20) + 25
      };
    } else if (rideType === 'city-to-city') {
      const cityTotal = base * 3.5;
      return {
        base: Math.round(cityTotal),
        tolls: 35,
        gratuity: Math.round(cityTotal * 0.20),
        total: Math.round(cityTotal * 1.20) + 35
      };
    } else if (rideType === 'round-trip') {
      const rtTotal = (base + 30) * 1.9;
      return {
        base: Math.round(rtTotal),
        tolls: 40,
        gratuity: Math.round(rtTotal * 0.20),
        total: Math.round(rtTotal * 1.20) + 40
      };
    } else {
      // one-way / airport
      const transferTotal = base + 30;
      return {
        base: transferTotal,
        tolls: 20,
        gratuity: Math.round(transferTotal * 0.20),
        total: Math.round(transferTotal * 1.20) + 20
      };
    }
  };

  const pricing = calculatePrice();

  const handleNext = (e) => {
    e.preventDefault();
    if (!pickup) {
      alert("Please enter a pickup location or airport terminal.");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`w-full bg-[#0E1722] rounded-3xl border border-gold/30 shadow-2xl overflow-hidden ${
      compact ? 'p-6' : 'p-6 sm:p-8'
    }`}>
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

      {!submitted ? (
        step === 1 ? (
          /* Step 1: Trip & Route Details */
          <form onSubmit={handleNext} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pickup Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  Pickup Location / Airport
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JFK Terminal 4, The Plaza Hotel, or Address"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
                />
              </div>

              {/* Dropoff Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {rideType === 'hourly' ? 'Primary Destination Area' : 'Dropoff Location'}
                </label>
                <input
                  type="text"
                  required={rideType !== 'hourly'}
                  placeholder={rideType === 'hourly' ? "e.g. Manhattan Midtown / As Directed" : "e.g. Wall Street, Brooklyn, or EWR"}
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
                />
              </div>
            </div>

            {/* Date, Time, and Hours (if Hourly) */}
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
                    placeholder="e.g. DL 420"
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
                    {[1, 2, 3, 4, 5, 6, 8, 10, 14, 25, 55].map(p => (
                      <option key={p} value={p}>{p} Pax</option>
                    ))}
                  </select>
                  <select
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="bg-transparent text-center focus:outline-none py-2"
                  >
                    {[0, 1, 2, 3, 4, 6, 8, 14, 30, 55].map(l => (
                      <option key={l} value={l}>{l} Bags</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Selection Carousel / Grid */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-gold" />
                Select Vehicle Class
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'premium-sedan', name: 'Premium Sedan', sub: 'Mercedes S-Class', pax: 3, bags: 3 },
                  { id: 'premium-suv', name: 'Premium SUV', sub: 'Cadillac Escalade', pax: 6, bags: 6 },
                  { id: 'jet-sprinter', name: 'Jet Sprinter VIP', sub: 'VIP Maybach Style', pax: 10, bags: 10 },
                  { id: 'stretch-limo', name: 'Stretch Limousine', sub: 'Lincoln Town Car', pax: 8, bags: 5 }
                ].map(veh => (
                  <button
                    key={veh.id}
                    type="button"
                    onClick={() => setSelectedVehicleId(veh.id)}
                    className={`p-3 rounded-xl text-left border transition flex flex-col justify-between ${
                      selectedVehicleId === veh.id
                        ? 'bg-gold/15 border-gold shadow-lg shadow-gold/15'
                        : 'bg-[#14202D] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {veh.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {veh.sub}
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] text-gold font-semibold flex items-center justify-between">
                      <span>{veh.pax} Pax · {veh.bags} Bags</span>
                      {selectedVehicleId === veh.id && (
                        <CheckCircle2 className="w-3 h-3 text-gold" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Instant Rate Preview & Next Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider">Estimated Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-gold">
                    ${pricing.total}
                  </span>
                  <span className="text-xs text-neutral-400">
                    (All-inclusive flat rate: tolls & tip included)
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center justify-center gap-2 group"
              >
                <span>Calculate & Reserve</span>
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Passenger Details & Confirmation */
          <form onSubmit={handleFinalSubmit} className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-[#14202D] border border-gold/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-xs text-gold uppercase tracking-wider font-bold">Selected Itinerary</div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {pickup} → {dropoff || 'Hourly Standby'}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {date || 'Upcoming'} at {time} · {selectedVehicle.name} ({passengers} Pax, {luggage} Bags)
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-400">Guaranteed Flat Rate</div>
                <div className="font-serif text-2xl font-bold text-gold">${pricing.total}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(347) 000-0000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="vance@company.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Special Requests or Flight Details (Child Seats, Meet & Greet, Beverage Preferences)
              </label>
              <textarea
                rows="2"
                placeholder="Provide flight details, extra stops, or any chauffeur instructions..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-neutral-400 hover:text-white underline transition"
              >
                ← Back to Edit Itinerary
              </button>

              <button
                type="submit"
                className="bg-gold hover:bg-gold-hover text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center gap-2"
              >
                <span>Confirm Reservation Request</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )
      ) : (
        /* Confirmation State */
        <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Reservation Request Submitted!
          </h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{guestName || 'Valued Guest'}</strong>. Our 24/7 dispatch desk has received your {selectedVehicle.name} booking for <strong className="text-gold">{pickup}</strong>.
          </p>
          <div className="p-4 max-w-sm mx-auto bg-[#14202D] rounded-2xl border border-white/10 text-xs text-neutral-400 text-left space-y-1.5">
            <div><strong className="text-neutral-200">Confirmation Sent To:</strong> {guestEmail || 'your email'}</div>
            <div><strong className="text-neutral-200">Dispatch Assistance:</strong> (347) 888-9797</div>
            <div><strong className="text-neutral-200">Chauffeur Details:</strong> Dispatched 24 hours prior to pickup</div>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => { setSubmitted(false); setStep(1); }}
              className="bg-gold text-black font-bold text-xs py-2.5 px-6 rounded-full hover:bg-gold-hover transition"
            >
              Book Another Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

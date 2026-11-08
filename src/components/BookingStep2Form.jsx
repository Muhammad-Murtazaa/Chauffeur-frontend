import React, { useState } from 'react';
import { 
  Car, 
  Users, 
  Briefcase, 
  Check, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  Timer, 
  AlertCircle, 
  RefreshCw, 
  CreditCard 
} from 'lucide-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import RouteMapPreview from './RouteMapPreview';
import { createBooking, createBookingPaymentIntent, processBookingPayment } from '../api/booking';
import { setGuestBookingAccessToken } from '../api/client';
import { getVehicleImage } from '../utils/vehicleImage';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '14px',
      '::placeholder': {
        color: '#64748b',
      },
      iconColor: '#d4af37',
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: false,
};

export default function BookingStep2Form({
  activeQuote,
  routeSummary,
  countdown,
  formatSeconds,
  quoteOptions,
  selectedOption,
  setSelectedOption,
  flightNumber,
  setFlightNumber,
  guestName,
  setGuestName,
  guestPhone,
  setGuestPhone,
  guestEmail,
  setGuestEmail,
  specialNotes,
  setSpecialNotes,
  submittingBooking,
  setSubmittingBooking,
  setConfirmedBooking,
  setStep,
  user,
  setQuoteError,
  referenceFlow = false,
  bookingStep = 2,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption || !activeQuote) return;

    if (countdown === 0) {
      alert('Quote has expired. Please recalculate your fare.');
      setStep(1);
      return;
    }

    if (referenceFlow && bookingStep === 2) {
      setStep(3);
      return;
    }

    if (!cardComplete) {
      setCardError('Please enter your complete credit card details (card number, expiration date, CVC, and billing zip).');
      return;
    }

    await executeBookingAndPayment(user);
  };

  const executeBookingAndPayment = async (currentUser) => {
    setSubmittingBooking(true);
    setCardError(null);
    if (setQuoteError) setQuoteError(null);

    try {
      const cardElement = elements?.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Payment form is not ready. Please refresh the page and try again.');
      }

      const passengerFullName =
        guestName ||
        `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim() ||
        'Valued Passenger';
      const passengerPhoneNum = guestPhone || currentUser?.phone || '+1 (917) 841-0044';
      const passengerEmailAddress = guestEmail || currentUser?.email || 'guest@hmynyc.com';

      const bookingPayload = {
        quoteId: activeQuote.id,
        vehicleTypeId: selectedOption.vehicleTypeId,
        passengerName: passengerFullName,
        passengerPhone: passengerPhoneNum,
        passengerEmail: passengerEmailAddress,
        flightNumber: flightNumber || undefined,
        specialInstructions: specialNotes || undefined,
      };

      // 1. Create Booking in database
      const booking = await createBooking(bookingPayload);
      if (booking.bookingAccessToken) {
        setGuestBookingAccessToken(booking.id, booking.bookingAccessToken);
      }

      // 2. Initialize Stripe PaymentIntent session
      const intentData = await createBookingPaymentIntent(booking.id);

      let confirmedPaymentId = intentData?.paymentIntentId;

      // 3. Confirm card client-side with Stripe
      if (!intentData?.isMock && stripe && intentData?.clientSecret) {
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          intentData.clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: passengerFullName,
                email: passengerEmailAddress,
                phone: passengerPhoneNum,
              },
            },
          }
        );

        if (stripeError) {
          setCardError(stripeError.message || 'Card authorization failed.');
          setSubmittingBooking(false);
          return;
        }

        if (paymentIntent?.status !== 'succeeded') {
          setCardError(`Payment status: ${paymentIntent?.status}. Authorization could not be completed.`);
          setSubmittingBooking(false);
          return;
        }

        confirmedPaymentId = paymentIntent.id;
      }

      // 4. Record payment & confirm booking in backend
      const paymentRes = await processBookingPayment(booking.id, {
        provider: 'STRIPE',
        paymentMethodId: confirmedPaymentId,
        mockSuccess: intentData?.isMock,
      });

      if (!paymentRes.success || paymentRes.booking?.paymentStatus === 'FAILED') {
        throw new Error(paymentRes.message || 'Payment confirmation failed');
      }

      setConfirmedBooking(paymentRes.booking || booking);
      setStep(referenceFlow ? 4 : 3);
    } catch (err) {
      console.error('Booking submission error:', err);
      const msg = err?.response?.data?.message || err.message || 'Failed to complete reservation. Please try again.';
      setCardError(msg);
      if (setQuoteError) setQuoteError(msg);
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
      {referenceFlow ? <h2 className="text-lg font-bold text-white">{bookingStep === 2 ? 'Your details' : 'Payment'}</h2> : <div className="p-4 rounded-2xl bg-[#14202D] border border-gold/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gold uppercase tracking-wider font-bold">Route Calculated</span>
            {routeSummary && (
              <span className="text-xs text-neutral-300 bg-black/40 px-2 py-0.5 rounded-md border border-white/10 font-mono">
                {routeSummary.distanceMiles} Miles · ~{routeSummary.durationMinutes} Mins
              </span>
            )}
          </div>
          <div className="text-sm font-semibold text-white mt-1">
            {activeQuote.pickupAddress} → {activeQuote.dropoffAddress}
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">
            {new Date(activeQuote.pickupAt).toLocaleDateString()} at{' '}
            {new Date(activeQuote.pickupAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#080E14] px-3.5 py-2 rounded-xl border border-white/10">
          <Timer className="w-4 h-4 text-gold animate-pulse" />
          {!referenceFlow && <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-neutral-400">Price Lock</div>
            <div className={`font-mono text-sm font-bold ${countdown < 120 ? 'text-rose-400' : 'text-gold'}`}>
              {formatSeconds(countdown)}
            </div>
          </div>}
        </div>
      </div>}

      {/* Visual Interactive Google Map Route Preview */}
      {!referenceFlow && <RouteMapPreview
        pickupAddress={activeQuote.pickupAddress}
        pickupLat={activeQuote.pickupLat}
        pickupLng={activeQuote.pickupLng}
        dropoffAddress={activeQuote.dropoffAddress}
        dropoffLat={activeQuote.dropoffLat}
        dropoffLng={activeQuote.dropoffLng}
        distanceMiles={routeSummary?.distanceMiles}
        durationMinutes={routeSummary?.durationMinutes}
      />}

      {/* Vehicle Category Selector */}
      {!referenceFlow && <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
          <Car className="w-3.5 h-3.5 text-gold" />
          Choose Chauffeur Vehicle Class
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quoteOptions.map((opt) => {
            const isSelected = selectedOption?.vehicleTypeId === opt.vehicleTypeId;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`p-4 rounded-2xl text-left border transition flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-gold/20 via-[#14202D] to-[#0E1722] border-gold shadow-lg shadow-gold/15 ring-1 ring-gold'
                    : 'bg-[#14202D] border-white/10 hover:border-white/25'
                }`}
              >
                <img src={getVehicleImage(opt)} alt={opt.name} className="mb-4 h-36 w-full rounded-xl bg-[#101820] object-cover" loading="lazy" />
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold text-black flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold font-bold">{opt.category}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{opt.name}</div>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center gap-3">
                    <span>
                      <Users className="w-3 h-3 inline mr-1 text-gold" />
                      {opt.passengerCapacity} Pax
                    </span>
                    <span>
                      <Briefcase className="w-3 h-3 inline mr-1 text-gold" />
                      {opt.luggageCapacity} Bags
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-[11px] text-neutral-400">Total Flat Fare</span>
                  <span className="font-serif text-xl font-bold text-gold">
                    ${Number(opt.totalPrice).toFixed(2)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>}

      {/* Passenger Information */}
      {(!referenceFlow || bookingStep === 2) && <div className="p-5 rounded-2xl bg-[#14202D] border border-white/10 space-y-4">
        {!referenceFlow && <div className="text-xs uppercase font-bold tracking-wider text-gold flex items-center gap-2"><UserCheck className="w-4 h-4" /><span>Passenger Information & Preferences</span></div>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="order-1">
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Full name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jonathan Vance"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-[#080E14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
            />
          </div>

          <div className={referenceFlow ? 'order-3' : ''}>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Mobile phone
            </label>
            <input
              type="tel"
              required
              placeholder="(917) 000-0000"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full bg-[#080E14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
            />
          </div>

          <div className={referenceFlow ? 'order-2' : ''}>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="vance@luxury.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full bg-[#080E14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
            />
          </div>
        </div>

        <div className={referenceFlow ? 'space-y-1' : ''}>
          <label className="block text-xs font-semibold text-neutral-400 mb-1">
            {referenceFlow ? 'Notes for your chauffeur (optional)' : 'Special Chauffeur Instructions (Child Seat, Bottled Water, Quiet Ride)'}
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Please provide child safety seat / meet inside airport gate"
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            className="w-full bg-[#080E14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
          />
        </div>

      </div>}

      {(!referenceFlow || bookingStep === 3) && <div className="p-5 rounded-2xl bg-[#14202D] border border-white/10 space-y-4">
        {referenceFlow && <h2 className="text-lg font-bold text-white">Payment</h2>}
        {/* Live Interactive Stripe Card Payment Card */}
        <div className="p-4 rounded-2xl bg-[#091017] border border-white/10 space-y-3 focus-within:border-gold/50 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#635BFF]/15 text-[#635BFF] border border-[#635BFF]/30 flex items-center justify-center font-bold text-xs tracking-tighter">
                stripe
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Stripe Secure Card Checkout</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                    256-Bit Encrypted
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Enter credit or debit card details below
                </div>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg">
              <Lock className="w-3 h-3 text-gold" />
              <span>PCI-DSS Level 1</span>
            </div>
          </div>

          {/* Embedded Stripe CardElement Input */}
          <div className="p-3.5 rounded-xl bg-[#080E14] border border-white/10 focus-within:border-gold/80 transition shadow-inner">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              onChange={(e) => {
                if (e.error) {
                  setCardError(e.error.message);
                } else {
                  setCardError(null);
                }
                setCardComplete(e.complete);
              }}
            />
          </div>

          {cardError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{cardError}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-[#131D28] border border-white/10 text-white font-mono">VISA</span>
              <span className="px-1.5 py-0.5 rounded bg-[#131D28] border border-white/10 text-white font-mono">MASTERCARD</span>
              <span className="px-1.5 py-0.5 rounded bg-[#131D28] border border-white/10 text-white font-mono">AMEX</span>
              <span className="px-1.5 py-0.5 rounded bg-[#131D28] border border-white/10 text-white font-mono">DISCOVER</span>
            </div>
            <span className="text-[10px] text-neutral-500">Zero sensitive card data stored on server</span>
          </div>
        </div>
      </div>}

      {/* Pricing Summary & Action */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(referenceFlow && bookingStep === 3 ? 2 : 1)}
          className="text-xs text-neutral-400 hover:text-white underline transition"
        >
          {referenceFlow ? 'Back' : '← Recalculate Itinerary'}
        </button>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {!referenceFlow && <div className="text-right">
            <div className="text-[10px] text-neutral-400 uppercase">Guaranteed Total</div>
            <div className="font-serif text-2xl font-bold text-gold">
              ${selectedOption ? Number(selectedOption.totalPrice).toFixed(2) : '0.00'}
            </div>
          </div>}

          <button
            type="submit"
            disabled={submittingBooking || countdown === 0}
            className="flex-1 sm:flex-none bg-gold hover:bg-gold-hover text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submittingBooking ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>{referenceFlow && bookingStep === 2 ? 'Continue' : referenceFlow ? 'Pay now' : 'Pay & Confirm Reservation'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}


import React from 'react';
import { CalendarDays, Clock3, MapPin, Users, CarFront } from 'lucide-react';
import { reservationVehicleLabel } from '../utils/reservationVehicles';

const serviceNames = {
  'one-way': 'Point to point',
  'from-airport': 'From airport',
  'to-airport': 'To airport',
  hourly: 'Hourly',
};

export default function ReservationTripSummary({
  rideType,
  pickup,
  dropoff,
  date,
  time,
  hours,
  passengers,
  selectedOption,
}) {
  const dateLabel = date
    ? new Date(`${date}T${time || '12:00'}`).toLocaleString([], {
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      })
    : 'Choose date and time';

  return (
    <aside className="rounded-2xl border border-white/10 bg-[#101820] p-5 lg:sticky lg:top-6">
      <h2 className="text-base font-bold text-white">Your trip</h2>
      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-neutral-400">Service</dt><dd className="text-right text-white">{serviceNames[rideType] || 'Point to point'}</dd></div>
        <div className="flex justify-between gap-4"><dt className="flex items-center gap-2 text-neutral-400"><CalendarDays className="h-4 w-4" />When</dt><dd className="text-right text-white">{dateLabel}</dd></div>
        <div className="space-y-2 border-t border-white/10 pt-4">
          <dt className="flex items-center gap-2 text-neutral-400"><MapPin className="h-4 w-4" />Pickup</dt>
          <dd className="break-words text-white">{pickup || 'Add pickup location'}</dd>
        </div>
        {rideType === 'hourly' ? (
          <div className="flex justify-between gap-4"><dt className="flex items-center gap-2 text-neutral-400"><Clock3 className="h-4 w-4" />Duration</dt><dd className="text-white">{hours} hours</dd></div>
        ) : (
          <div className="space-y-2">
            <dt className="flex items-center gap-2 text-neutral-400"><MapPin className="h-4 w-4" />Drop-off</dt>
            <dd className="break-words text-white">{dropoff || 'Add destination'}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 border-t border-white/10 pt-4"><dt className="flex items-center gap-2 text-neutral-400"><Users className="h-4 w-4" />Passengers</dt><dd className="text-white">{passengers}</dd></div>
        {selectedOption && <div className="flex justify-between gap-4"><dt className="flex items-center gap-2 text-neutral-400"><CarFront className="h-4 w-4" />Vehicle</dt><dd className="text-right text-white">{reservationVehicleLabel(selectedOption)}</dd></div>}
      </dl>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="text-xs uppercase tracking-wide text-neutral-400">Estimated total</div>
        <div className="mt-1 text-2xl font-bold text-white">{selectedOption ? `$${Number(selectedOption.totalPrice).toFixed(2)}` : '—'}</div>
        <p className="mt-3 text-xs leading-relaxed text-neutral-400">Your total is shown before checkout. Payment is collected when you confirm your reservation.</p>
      </div>
    </aside>
  );
}

import React from 'react';
import PageHero from '../components/PageHero';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CancellationRefund() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Cancellation Policy"
        title="Cancellation & Refund Policy"
        subtitle="Clear, fair, and transparent cancellation terms for sedans, executive SUVs, Sprinters, and group charter buses."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/corporate-travel.jpg"
        breadcrumbs={[{ name: "Cancellation & Refund" }]}
      />

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300 space-y-8 text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-[#0E1722] border border-gold/30 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gold">Summary of Deadlines</div>
          <p className="text-xs text-neutral-300">
            We understand travel schedules can shift. To avoid forfeiture of deposits or full-fare charges, please notify our dispatch desk prior to the cancellation windows specified below.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">1. Executive Sedans & SUVs (Point-to-Point & Airport)</h2>
          <p>
            Cancellations made at least <strong>24 hours prior</strong> to the scheduled pickup time receive a full 100% refund with zero penalty. Cancellations made within 24 hours of pickup will be billed at the full scheduled fare.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">2. Mercedes Sprinters & Stretch Limousines</h2>
          <p>
            Due to high demand and specialized vehicle preparation, Sprinter vans and stretch limousines require cancellation at least <strong>48 hours prior</strong> to the scheduled charter time for a full deposit refund. Cancellations made between 24 and 48 hours will forfeit the 50% deposit; cancellations under 24 hours are billed in full.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">3. Mini Buses & 55-Passenger Motorcoaches</h2>
          <p>
            Large group coach bookings require at least <strong>7 days advance notice</strong> for cancellation without penalty. Cancellations within 7 days are subject to deposit retention according to the charter contract terms.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">4. Flight Delays & Airline Cancellations</h2>
          <p>
            If your commercial airline cancels your incoming flight into JFK, LGA, or EWR, or if severe weather prompts FAA ground stops, you will NOT be charged a cancellation fee provided you alert our dispatch team as soon as the airline cancels your itinerary.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-neutral-500">
          To request a cancellation, please call dispatch immediately at (347) 888-9797 or reply directly to your booking confirmation email.
        </div>
      </section>
    </div>
  );
}

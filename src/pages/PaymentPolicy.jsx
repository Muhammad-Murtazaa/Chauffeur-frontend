import React from 'react';
import PageHero from '../components/PageHero';
import { CreditCard, ShieldCheck, FileCheck } from 'lucide-react';

export default function PaymentPolicy() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Billing & Payments"
        title="Payment Policy"
        subtitle="Accepted payment methods, credit card pre-authorizations, corporate billing accounts, and itemized receipt details."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/corporate-travel.jpg"
        breadcrumbs={[{ name: "Payment Policy" }]}
      />

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300 space-y-8 text-sm leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">1. Accepted Methods of Payment</h2>
          <p>
            We accept all major credit and debit cards, including Visa, MasterCard, American Express, Discover, and Diners Club. For corporate accounts, we also accommodate direct ACH bank wire transfers and centralized monthly invoicing.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">2. Pre-Authorization & Charges</h2>
          <p>
            A credit card pre-authorization hold is placed 24 hours before your trip to verify active funds. The final charge — encompassing the agreed flat rate, scheduled duration, and any approved incidental wait time or additional stops — is processed upon completion of the trip.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">3. Itemized Digital Receipts</h2>
          <p>
            An itemized digital receipt detailing date, pickup/dropoff points, base fare, tolls, taxes, and chauffeur gratuity is automatically emailed to your designated billing address upon trip completion.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-neutral-500">
          Billing questions? Contact accounts@nycpremierlimo.com or call (347) 888-9797.
        </div>
      </section>
    </div>
  );
}

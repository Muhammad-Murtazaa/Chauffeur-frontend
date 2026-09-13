import React from 'react';
import PageHero from '../components/PageHero';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Data Protection"
        title="Privacy Policy"
        subtitle="How NYC Premier Limo collects, utilizes, safeguards, and respects your personal travel information."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/corporate-travel.jpg"
        breadcrumbs={[{ name: "Privacy Policy" }]}
      />

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300 space-y-8 text-sm leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">1. Information We Collect</h2>
          <p>
            When you request a quote, book a chauffeured vehicle, or contact our team, we collect the necessary details to execute your transportation securely:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
            <li>Contact details (name, email address, mobile phone number).</li>
            <li>Travel itinerary (pickup address, drop-off destination, scheduled dates/times, flight numbers).</li>
            <li>Payment details (processed via secure, encrypted PCI-compliant payment gateways; we never store raw CVV numbers).</li>
            <li>Passenger preferences and special accommodations (child seat requirements, meet & greet instructions).</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">2. How Your Data Is Utilized</h2>
          <p>
            Your information is strictly used to fulfill your reservation, deliver real-time flight tracking updates, dispatch chauffeur assignment notices, send digital receipts, and provide customer support. We do not sell, rent, or monetize your personal information to third-party marketers under any circumstances.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">3. Security Standards</h2>
          <p>
            All data transmitted through our website is protected using industry-standard SSL 256-bit encryption. Access to sensitive booking data is restricted exclusively to authorized dispatch personnel bound by confidentiality agreements.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-neutral-500">
          Questions regarding privacy? Email info@nycpremierlimo.com or call (347) 888-9797.
        </div>
      </section>
    </div>
  );
}

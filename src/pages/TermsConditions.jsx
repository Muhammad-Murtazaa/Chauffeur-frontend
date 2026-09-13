import React from 'react';
import PageHero from '../components/PageHero';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="Legal & Policies"
        title="Terms and Conditions"
        subtitle="Please review our terms of transportation, reservation requirements, chauffeur policies, and passenger guidelines."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/corporate-travel.jpg"
        breadcrumbs={[{ name: "Terms and Conditions" }]}
      />

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-300 space-y-8 text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-[#0E1722] border border-white/10 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gold">Policy Notice</div>
          <p className="text-xs text-neutral-400">
            By reserving, engaging, or utilizing services provided by NYC Premier Limo ("Company", "we", "our"), the passenger and booking entity ("Client", "you") acknowledge and agree to the contractual terms outlined below.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">1. Reservations & Confirmations</h2>
          <p>
            All reservations are subject to vehicle availability at the time of booking. A valid credit card authorization or corporate billing account is required to confirm any reservation. A digital booking confirmation containing the itinerary, scheduled pickup time, vehicle category, and agreed rate will be issued via email.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">2. Airport Wait Time & Flight Tracking</h2>
          <p>
            The Company utilizes commercial flight tracking systems to monitor arrival times at JFK, LaGuardia (LGA), Newark (EWR), and regional airports.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-neutral-400">
            <li><strong>Domestic Commercial Arrivals:</strong> 60 minutes of complimentary wait time is granted beginning from the official flight touchdown time recorded by the FAA.</li>
            <li><strong>International Commercial Arrivals:</strong> 90 minutes of complimentary wait time is granted from recorded touchdown to accommodate passport control and customs clearance.</li>
            <li><strong>Non-Airport & Residential Pickups:</strong> 15 minutes of complimentary grace period is provided from the scheduled reservation time. Wait time thereafter is billed in 15-minute increments based on the vehicle's prevailing hourly charter rate.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">3. Rates, Tolls & Gratuity</h2>
          <p>
            Flat-rate quotes for airport and point-to-point transfers encompass standard road tolls, regulatory fees, and driver gratuity. Unscheduled route alterations, additional passenger pickups or drop-offs, and extended wait time will incur supplemental charges calculated according to our published rates.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">4. Passenger Conduct & Vehicle Safety</h2>
          <p>
            Smoking, vaping, and the possession or use of illegal substances are strictly prohibited inside all vehicles. Any passenger causing intentional damage, unsanitary conditions, or requiring emergency interior bio-cleaning will be assessed a minimum cleaning surcharge of $250.00 to restore the vehicle.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">5. Limitation of Liability</h2>
          <p>
            While the Company maintains an uncompromising commitment to punctuality and rigorous vehicle maintenance, the Company cannot be held liable for unforeseen delays caused by extreme weather occurrences, acts of God, civil emergencies, highway closures, or catastrophic mechanical failure beyond reasonable control. In such rare instances, the Company will make every reasonable endeavor to provide alternate luxury transportation.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-neutral-500">
          Last Updated: January 2026. For inquiries regarding our terms, please contact us at info@nycpremierlimo.com or call (347) 888-9797.
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import { Phone, Mail, Clock, MapPin, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'airport',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#060B10] text-white">
      <PageHero
        badge="24/7 Support & Dispatch"
        title="Contact NYC Premier Limo"
        subtitle="Contact the team for reservations, trip questions, booking changes, vehicle guidance, corporate accounts, or a custom transportation quote."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/08/Corporate-Limo.jpg"
        breadcrumbs={[{ name: "Contact Us" }]}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Always Available
              </div>
              <h2 className="font-serif text-3xl font-bold text-white leading-tight">
                Coordinated from Reservation to Drop-Off
              </h2>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Whether you need to modify an existing airport reservation, request a vehicle upgrade, or arrange a 55-passenger motorcoach for a company outing, our dispatchers answer the phone 24 hours a day, 365 days a year.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+13478889797"
                className="p-5 rounded-2xl bg-[#0E1722] border border-white/10 hover:border-gold/50 transition flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-black transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">24/7 Dispatch Phone</div>
                  <div className="text-lg font-bold text-white group-hover:text-gold transition">(347) 888-9797</div>
                  <div className="text-[11px] text-neutral-500">Instant assistance & bookings</div>
                </div>
              </a>

              <a
                href="mailto:info@nycpremierlimo.com"
                className="p-5 rounded-2xl bg-[#0E1722] border border-white/10 hover:border-gold/50 transition flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-black transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Email Inquiries</div>
                  <div className="text-base font-bold text-white group-hover:text-gold transition">info@nycpremierlimo.com</div>
                  <div className="text-[11px] text-neutral-500">Quotes & corporate contracts</div>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-[#0E1722] border border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 text-gold flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Operational Hours</div>
                  <div className="text-base font-bold text-white">24 Hours / 7 Days a Week</div>
                  <div className="text-[11px] text-neutral-500">Including all holidays & weekends</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1722] border border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 text-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Primary Service Territory</div>
                  <div className="text-base font-bold text-white">New York City & Tri-State</div>
                  <div className="text-[11px] text-neutral-500">5 Boroughs, Long Island, NJ & CT</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1722] border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold">Before You Reach Out:</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                For airport transfers, having your commercial airline and flight number ready allows us to calculate your exact landing time, terminal gate, and flat-rate quote immediately.
              </p>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0E1722] rounded-3xl border border-gold/30 p-6 sm:p-10 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Send Us a Message or Request a Custom Quote
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-8">
              Fill in your details below and a dispatch coordinator will follow up via phone or email within minutes.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Hastings"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(347) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="robert@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                    >
                      <option value="airport">Airport Transfer (JFK, LGA, EWR)</option>
                      <option value="corporate">Corporate & Executive Travel</option>
                      <option value="hourly">Hourly Chauffeur Service</option>
                      <option value="point-to-point">Point-to-Point Direct Ride</option>
                      <option value="city-to-city">City-to-City Long Distance</option>
                      <option value="wedding">Wedding Limousine Service</option>
                      <option value="prom">Prom Limousine Service</option>
                      <option value="other">Other Milestone Celebration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Itinerary Details or Questions *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Provide your pickup & dropoff addresses, dates, flight details, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Message Sent Successfully
                </h4>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our dispatch desk has received your request and will contact you at <strong className="text-gold">{formData.phone || formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', serviceType: 'airport', date: '', message: '' }); }}
                  className="text-xs text-gold underline hover:text-gold-hover transition pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

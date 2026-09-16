import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Plus, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Airport Transfer',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do you track flights?',
      a: 'Yes. We use your flight details to time the pickup and adjust for early or delayed arrivals — just give us the correct airline and flight number, and let us know if plans change.'
    },
    {
      q: 'Where will my chauffeur meet me?',
      a: 'It depends on your terminal, airport rules and whether you choose meet-and-greet. Your exact meeting point and instructions are confirmed before you travel.'
    },
    {
      q: 'How early should I schedule a departure pickup?',
      a: "We build in time for tunnel traffic, check-in, baggage, security and your airline's recommended arrival window — so you reach the terminal with room to spare."
    },
    {
      q: 'Can you handle groups and extra luggage?',
      a: "Yes, subject to availability. Share every passenger and bag count and we'll recommend the right luxury SUV, executive van, Mercedes Sprinter or private coach."
    }
  ];

  return (
    <div className="bg-[#F9F7F2] text-[#1D1D1B] font-sans">
      {/* =========================================================================
          1. HERO SECTION (Dark Luxury Chauffeur)
      ========================================================================= */}
      <section className="relative min-h-[460px] lg:min-h-[500px] py-16 sm:py-24 flex items-center justify-center text-center bg-black overflow-hidden">
        {/* Background photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://nycpremierlimo.com/wp-content/uploads/2026/09/contact-nyc-premier-limo-chauffeur-service-square.webp')` 
          }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/70 backdrop-brightness-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {/* Breadcrumbs: Home / Contact Us */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-200">Contact Us</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
            <span className="w-5 h-[1.5px] bg-[#e09900]" />
            <span>Contact 24/7</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.12]">
            Contact NYC Premier Chauffeur
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15px] text-zinc-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Contact the team for reservations, trip questions, booking changes, vehicle guidance, or a custom transportation quote.
          </p>

          {/* Action Buttons: Call & Instant Quote */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:+13478889797"
              className="bg-[#e09900] hover:bg-[#c88800] text-black font-semibold text-sm px-7 py-3 rounded-full transition-colors shadow-sm"
            >
              Call (347) 888-9797
            </a>
            <Link
              to="/reservations"
              className="border border-white text-white hover:bg-white hover:text-black font-medium text-sm px-7 py-3 rounded-full transition-colors flex items-center gap-2"
            >
              <span>Get an Instant Quote</span>
              <span className="text-base leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CONTACT SPLIT SECTION (Dark Info Card Left + White Inquiry Form Right)
      ========================================================================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Dark Contact Methods Card */}
          <div className="lg:col-span-5 bg-[#111215] text-white rounded-3xl p-7 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e09900] mb-3">
                <span className="w-4 h-[1.5px] bg-[#e09900]" />
                <span>Reach the Team</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug mb-3">
                Choose the contact method that fits your request.
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
                Call for immediate assistance, send a detailed email, or use WhatsApp for convenient messaging.
              </p>

              {/* 3 Contact Options */}
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+13478889797"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-[#18191E] border border-white/5 hover:border-[#e09900]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/25 flex items-center justify-center shrink-0 group-hover:bg-[#e09900] group-hover:text-black transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      Phone / 24/7 Dispatch
                    </div>
                    <div className="text-white text-base font-semibold group-hover:text-[#e09900] transition-colors">
                      (347) 888-9797
                    </div>
                    <div className="text-zinc-500 text-[11px] mt-0.5">
                      Direct line for immediate reservations & updates
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@nycpremierlimo.com"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-[#18191E] border border-white/5 hover:border-[#e09900]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/25 flex items-center justify-center shrink-0 group-hover:bg-[#e09900] group-hover:text-black transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      Email Desk
                    </div>
                    <div className="text-white text-base font-semibold group-hover:text-[#e09900] transition-colors break-all">
                      info@nycpremierlimo.com
                    </div>
                    <div className="text-zinc-500 text-[11px] mt-0.5">
                      Detailed quotes, receipts & corporate billing
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/13478889797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-[#18191E] border border-white/5 hover:border-[#e09900]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/25 flex items-center justify-center shrink-0 group-hover:bg-[#e09900] group-hover:text-black transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      WhatsApp Dispatch
                    </div>
                    <div className="text-white text-base font-semibold group-hover:text-[#e09900] transition-colors">
                      (347) 888-9797
                    </div>
                    <div className="text-zinc-500 text-[11px] mt-0.5">
                      Chat, flight sharing & quick itinerary questions
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom Tip & Action */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                <span className="text-[#e09900] font-medium">Looking for quick pricing?</span> Instant Quote is the fastest way to submit a complete itinerary.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+13478889797"
                  className="flex-1 bg-[#e09900] hover:bg-[#c88800] text-black font-semibold text-xs py-3 px-4 rounded-full text-center transition-colors shadow-sm"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/13478889797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-white/20 hover:border-white text-white font-medium text-xs py-3 px-4 rounded-full text-center transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: White Online Inquiry Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-zinc-200/80 shadow-xl flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e09900] mb-3">
                <span className="w-4 h-[1.5px] bg-[#e09900]" />
                <span>Online Inquiry</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1D1B] font-medium leading-snug mb-2">
                Send Us a Message
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                Need immediate reservation? The fastest way is to book online or call directly. For trip questions, quotes, or custom requests, send us a message below.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3 my-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Thank You! Message Received.</h3>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto">
                    Our dispatch desk has received your request. A team member will review your details and respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', inquiryType: 'Airport Transfer', message: '' });
                    }}
                    className="inline-block mt-2 text-xs font-semibold text-emerald-900 underline hover:no-underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[#F9F7F2] border border-zinc-300 rounded-xl px-4 py-3 text-sm text-[#1D1D1B] placeholder-zinc-400 focus:outline-none focus:border-[#e09900] focus:ring-1 focus:ring-[#e09900] transition"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(347) 888-9797"
                        className="w-full bg-[#F9F7F2] border border-zinc-300 rounded-xl px-4 py-3 text-sm text-[#1D1D1B] placeholder-zinc-400 focus:outline-none focus:border-[#e09900] focus:ring-1 focus:ring-[#e09900] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#F9F7F2] border border-zinc-300 rounded-xl px-4 py-3 text-sm text-[#1D1D1B] placeholder-zinc-400 focus:outline-none focus:border-[#e09900] focus:ring-1 focus:ring-[#e09900] transition"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Inquiry Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#F9F7F2] border border-zinc-300 rounded-xl px-4 py-3 text-sm text-[#1D1D1B] focus:outline-none focus:border-[#e09900] focus:ring-1 focus:ring-[#e09900] transition cursor-pointer"
                      >
                        <option value="Airport Transfer">Airport Transfer (JFK, LGA, EWR)</option>
                        <option value="Point-to-Point City Transfer">Point-to-Point City Transfer</option>
                        <option value="Hourly / By-the-Hour Chauffeur">Hourly / By-the-Hour Chauffeur</option>
                        <option value="Corporate & Executive Travel">Corporate & Executive Travel</option>
                        <option value="Special Event / Wedding">Special Event / Wedding</option>
                        <option value="General Inquiry">General Question / Support</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include pickup location, destination, date, time, passengers, luggage, or any flight info..."
                      className="w-full bg-[#F9F7F2] border border-zinc-300 rounded-xl p-4 text-sm text-[#1D1D1B] placeholder-zinc-400 focus:outline-none focus:border-[#e09900] focus:ring-1 focus:ring-[#e09900] transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#111215] hover:bg-[#e09900] hover:text-black text-white font-medium text-sm py-3.5 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200/80 text-[11px] text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e09900] shrink-0" />
              <span>Your contact details are encrypted and kept strictly confidential.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. COORDINATED FROM RESERVATION TO DROP-OFF (4 White Cards)
      ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200/60">
        {/* Header split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e09900] mb-3">
              <span className="w-4 h-[1.5px] bg-[#e09900]" />
              <span>How the Desk Supports You</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1D1D1B] font-medium leading-tight">
              Coordinated from reservation to drop-off.
            </h2>
          </div>
          <div className="md:col-span-5 text-zinc-600 text-sm sm:text-[15px] leading-relaxed">
            Whether you need a quote, want to update a reservation, or have questions about our services, we are ready to assist.
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 01 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-[#e09900]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center mb-5 bg-[#e09900]/5">
                01
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1D1D1B] mb-2.5">
                24/7 Customer Support
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Help is available for bookings, trip questions, schedule updates, and time-sensitive transportation concerns.
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-[#e09900]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center mb-5 bg-[#e09900]/5">
                02
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1D1D1B] mb-2.5">
                Responsive Communication
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Calls, emails, and messages are handled with attention to the timing and importance of the request.
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-[#e09900]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center mb-5 bg-[#e09900]/5">
                03
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1D1D1B] mb-2.5">
                Custom Quote Guidance
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                The team can help identify the details needed for accurate pricing and the right service category.
              </p>
            </div>
          </div>

          {/* Card 04 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-sm hover:shadow-md hover:border-[#e09900]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center mb-5 bg-[#e09900]/5">
                04
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1D1D1B] mb-2.5">
                Professional Booking Help
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Get assistance with vehicle selection, airport planning, group needs, schedules, stops, and special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. THE RIGHT DETAILS LEAD TO THE RIGHT ANSWER (Dark 3-Step Card)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#111215] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold decorative radial ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e09900]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left side info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
                <span className="w-4 h-[1.5px] bg-[#e09900]" />
                <span>Help Us Respond Accurately</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
                The right details lead to the right answer.
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Including complete information reduces follow-up questions and helps the team review your request efficiently.
              </p>
            </div>

            {/* Right side: 3 numbered steps */}
            <div className="lg:col-span-7 space-y-4">
              {/* Step 01 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#18191E] border border-white/5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center shrink-0 bg-[#e09900]/10">
                  01
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium mb-1">
                    For a new trip
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Include pickup, destination, date, time, stops, passengers, luggage, and preferred vehicle.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#18191E] border border-white/5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center shrink-0 bg-[#e09900]/10">
                  02
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium mb-1">
                    For an existing reservation
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Include the passenger name, reservation reference if available, service date, and requested change.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#18191E] border border-white/5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-[#e09900]/40 text-[#e09900] font-semibold text-xs flex items-center justify-center shrink-0 bg-[#e09900]/10">
                  03
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium mb-1">
                    For corporate or event travel
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Share the schedule, passenger groups, locations, vehicle needs, and coordination requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BEFORE YOU REACH OUT (Contact FAQs Accordion)
      ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200/60">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e09900] mb-3">
              <span className="w-4 h-[1.5px] bg-[#e09900]" />
              <span>Contact FAQs</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1D1D1B] font-medium leading-tight">
              Before you reach out.
            </h2>
          </div>
          <div className="md:col-span-5 text-zinc-600 text-sm sm:text-[15px] leading-relaxed">
            Final pricing, availability, vehicle category, and pickup arrangements are confirmed for the exact itinerary.
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#1D1D1B] font-medium">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45 border-[#e09900] text-[#e09900]' : 'text-zinc-500'}`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. PRE-FOOTER CTA (Share your flight before travel day)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="bg-[#111215] text-white rounded-3xl p-10 sm:p-16 border border-white/10 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle gold radial background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e09900]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e09900]">
              <span className="w-4 h-[1.5px] bg-[#e09900]" />
              <span>Reserve Your Transportation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight tracking-tight">
              Share your flight before travel day.
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Give us the airport, airline, flight number, date, time, pickup, destination, passengers, luggage and preferred vehicle for availability and an accurate flat-rate quote.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href="tel:+13478889797"
                className="bg-[#e09900] hover:bg-[#c88800] text-black font-semibold text-sm px-7 py-3 rounded-full transition-colors shadow-sm"
              >
                Call (347) 888-9797
              </a>
              <Link
                to="/reservations"
                className="border border-white text-white hover:bg-white hover:text-black font-medium text-sm px-7 py-3 rounded-full transition-colors flex items-center gap-2"
              >
                <span>Instant Quote</span>
                <span className="text-base leading-none">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

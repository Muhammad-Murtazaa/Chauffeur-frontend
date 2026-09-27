import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { registerDriver } from '../api/auth';
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function Drivers() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    city: 'New York',
    yearsOfExperience: 3,
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Password and Confirm Password do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      const response = await registerDriver(formData);

      setSuccessMsg(
        'Your chauffeur account has been created successfully! You are now authenticated. Continue to the onboarding stepper to register your vehicle and upload compliance documents.'
      );

      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        address: '',
        city: 'New York',
        yearsOfExperience: 3,
      });
    } catch (err) {
      setErrorMsg(err.message || 'Driver registration failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#060B10] text-white min-h-screen">
      {/* Page Hero */}
      <PageHero
        badge="Chauffeur Onboarding"
        title="Driver Registration"
        subtitle="Apply to join NYC Premier Chauffeur's executive fleet. Submit your credentials below to begin the onboarding process."
        bgImage="https://nycpremierlimo.com/wp-content/uploads/2026/09/fleet-page-chauffeur-service-nyc-hero.webp"
        breadcrumbs={[{ name: 'Driver Registration' }]}
      />

      {/* Driver Registration Form Section */}
      <section className="py-16 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          <div className="border-b border-white/10 pb-6 mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive Driver Application</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Create Your Driver Account
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Please enter your legal personal details and professional driving background.
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                <span>{successMsg}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/driver/onboarding"
                  className="px-5 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-[#e09900]/20"
                >
                  <span>Proceed to Onboarding Stepper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/driver/dashboard"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
                >
                  <span>Go to Driver Portal</span>
                </Link>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  First Name <span className="text-[#e09900]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Last Name <span className="text-[#e09900]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Email Address <span className="text-[#e09900]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="driver@example.com"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Phone Number <span className="text-[#e09900]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (347) 000-0000"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Password <span className="text-[#e09900]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Confirm Password <span className="text-[#e09900]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth, City, Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="New York"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Experience (Years)
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Street Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="e.g. 123 Broadway, Manhattan, NY"
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e09900] hover:bg-[#c88800] disabled:opacity-50 text-black font-bold py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-[#e09900]/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Submitting Driver Registration...</span>
                ) : (
                  <>
                    <span>Submit Driver Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

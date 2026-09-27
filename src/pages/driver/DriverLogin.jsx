import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerDriver } from '../../api/auth';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  User,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Sparkles,
} from 'lucide-react';

export default function DriverLogin() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const data = await loginUser(loginForm);

      if (data.user?.role !== 'DRIVER') {
        throw new Error(`Access denied. Your account has the role "${data.user?.role}", not DRIVER.`);
      }

      setSuccessMsg('Authentication successful! Redirecting to Chauffeur Portal...');
      setTimeout(() => {
        navigate('/driver/dashboard');
      }, 800);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (registerForm.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      await registerDriver(registerForm);
      setSuccessMsg('Chauffeur account registered successfully! Redirecting to Onboarding Stepper...');
      setTimeout(() => {
        navigate('/driver/onboarding');
      }, 900);
    } catch (err) {
      setErrorMsg(err.message || 'Driver registration failed. Please verify your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060B10] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e09900]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center z-10 px-4">
        <Link to="/" className="inline-block mb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#e09900]/20 border border-[#e09900]/50 flex items-center justify-center text-[#e09900] font-serif font-bold text-xl shadow-xl shadow-[#e09900]/10">
            NY
          </div>
        </Link>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
          NYC Premier Chauffeur Portal
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-neutral-400">
          Executive driver authentication, dispatch compliance & onboarding.
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 inline-flex p-1 bg-[#0A1017] border border-white/10 rounded-full">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition ${
              authMode === 'login'
                ? 'bg-[#e09900] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition ${
              authMode === 'register'
                ? 'bg-[#e09900] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Register as Chauffeur
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4 z-10">
        <div className="bg-[#0E1722] border border-white/10 py-8 px-6 sm:px-10 rounded-3xl shadow-2xl backdrop-blur-xl">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {authMode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Chauffeur Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="driver@example.com"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Password
                  </label>
                  <a href="tel:+13478889797" className="text-xs text-[#e09900] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#e09900] hover:bg-[#c88800] disabled:opacity-50 text-black font-bold py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-[#e09900]/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In To Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                    placeholder="First Name"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="driver@example.com"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="+1 (347) 000-0000"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="Min 8 chars"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min={0}
                    value={registerForm.yearsOfExperience}
                    onChange={(e) => setRegisterForm({ ...registerForm, yearsOfExperience: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">City</label>
                  <input
                    type="text"
                    value={registerForm.city}
                    onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-[#e09900] hover:bg-[#c88800] disabled:opacity-50 text-black font-bold py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-[#e09900]/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Registering Account...</span>
                ) : (
                  <>
                    <span>Submit & Begin Onboarding</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link to="/" className="text-xs text-neutral-400 hover:text-white">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

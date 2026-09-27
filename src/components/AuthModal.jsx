import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export default function AuthModal() {
  const navigate = useNavigate();
  const { isAuthModalOpen, authModalConfig, closeAuthModal, login, registerCustomer } = useAuth();
  const [tab, setTab] = useState('signin'); // 'signin' | 'register'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Register Customer Form State
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuthModalOpen) {
      setTab(authModalConfig.defaultTab || 'signin');
      setErrorMsg('');
      setSuccessMsg('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen, authModalConfig]);

  if (!isAuthModalOpen) return null;

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await login(signInData.email, signInData.password);
      setSuccessMsg(`Welcome back, ${res.user.firstName}!`);
      setTimeout(() => {
        closeAuthModal();
        if (authModalConfig.onAuthSuccess) {
          authModalConfig.onAuthSuccess(res.user);
        }
        if (authModalConfig.redirectOnSuccess) {
          navigate(authModalConfig.redirectOnSuccess);
        }
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (registerData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerCustomer({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
      });

      setSuccessMsg('Account created successfully! You are now logged in.');
      setTimeout(() => {
        closeAuthModal();
        if (authModalConfig.onAuthSuccess) {
          authModalConfig.onAuthSuccess(res.user);
        }
        if (authModalConfig.redirectOnSuccess) {
          navigate(authModalConfig.redirectOnSuccess);
        }
      }, 600);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0E1722] border border-[#e09900]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e09900]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Title */}
        <div className="space-y-2 mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Passenger Authentication</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {tab === 'signin' ? 'Sign In to NYC Premier' : 'Create VIP Client Account'}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {tab === 'signin'
              ? 'Access real-time instant quotes, book luxury chauffeur reservations, and track your VIP itinerary.'
              : 'Register in seconds to receive guaranteed all-inclusive flat pricing, flight monitoring, and instant booking.'}
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#080E14] rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setErrorMsg('');
            }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'signin'
                ? 'bg-[#e09900] text-black shadow-lg shadow-[#e09900]/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>VIP Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMsg('');
            }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'register'
                ? 'bg-[#e09900] text-black shadow-lg shadow-[#e09900]/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>New Customer Register</span>
          </button>
        </div>

        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {tab === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#e09900]" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. client@luxury.com"
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#e09900]" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-[#e09900]/25 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Continue to Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-neutral-400">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setTab('register');
                  setErrorMsg('');
                }}
                className="text-[#e09900] font-bold hover:underline"
              >
                Create VIP Account
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER CUSTOMER FORM */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>First Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vance"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="vance@luxury.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>Mobile Phone</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(347) 555-0199"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>Password (8+ chars)</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-[#e09900]/25 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Creating VIP Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-neutral-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setTab('signin');
                  setErrorMsg('');
                }}
                className="text-[#e09900] font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

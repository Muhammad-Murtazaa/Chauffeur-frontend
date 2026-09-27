import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already logged in as ADMIN, redirect immediately
  React.useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({ email, password });
      
      if (res.user?.role !== 'ADMIN') {
        setError('Access Denied. This login is strictly reserved for executive administrators.');
        return;
      }

      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Admin login error:', err);
      setError(
        err?.response?.data?.message || 
        err.message || 
        'Invalid administrative credentials. Please verify and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#04070A] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0A1017] border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Header Badge */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-[#A48220] text-black font-serif font-black text-2xl flex items-center justify-center mx-auto shadow-xl shadow-gold/20 ring-4 ring-gold/15">
            VIP
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Executive Console
            </h1>
            <p className="text-xs uppercase tracking-widest text-gold font-semibold mt-1">
              Admin & Dispatch Access
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@vipchauffeur.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#14202D] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Master Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#14202D] border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-hover text-black py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-xl shadow-gold/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Authenticating Console...</span>
              </>
            ) : (
              <>
                <span>Access Master Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Encrypted 256-bit Executive Operations Terminal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060B10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            Verifying Administrator Credentials...
          </span>
        </div>
      </div>
    );
  }

  // Not authenticated -> redirect to secret admin login
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Authenticated but not an Admin -> Show Access Denied
  if (user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#060B10] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0E1722] border border-rose-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Access Denied
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You are logged in as <strong className="text-white">{user.email}</strong> ({user.role}), which does not have executive administrative permissions.
          </p>
          <div className="pt-3">
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

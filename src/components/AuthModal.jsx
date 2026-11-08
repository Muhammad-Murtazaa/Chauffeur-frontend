import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Car, ShieldCheck, X } from 'lucide-react';

export default function AuthModal() {
  const navigate = useNavigate();
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  useEffect(() => {
    document.body.style.overflow = isAuthModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const openPortal = (path) => {
    closeAuthModal();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onMouseDown={closeAuthModal}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-signin-title"
        className="relative w-full max-w-md rounded-3xl border border-[#e09900]/40 bg-[#0E1722] p-6 sm:p-8 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={closeAuthModal} aria-label="Close sign in options" className="absolute top-4 right-4 rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="mb-6 pr-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#e09900]">Account access</p>
          <h2 id="staff-signin-title" className="font-serif text-2xl sm:text-3xl font-bold text-white">Choose your sign in</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">Guest booking is available without an account. Sign in here if you’re a driver or administrator.</p>
        </div>

        <div className="space-y-3">
          <button type="button" onClick={() => openPortal('/driver/login')} className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-left transition hover:border-[#e09900]/60 hover:bg-white/5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e09900]/15 text-[#e09900]"><Car className="h-5 w-5" /></span>
            <span className="flex-1"><span className="block font-bold text-white">Driver sign in</span><span className="mt-0.5 block text-xs text-neutral-400">Open your chauffeur portal</span></span>
            <ArrowRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-[#e09900]" />
          </button>
          <button type="button" onClick={() => openPortal('/admin/login')} className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-left transition hover:border-[#e09900]/60 hover:bg-white/5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e09900]/15 text-[#e09900]"><ShieldCheck className="h-5 w-5" /></span>
            <span className="flex-1"><span className="block font-bold text-white">Admin sign in</span><span className="mt-0.5 block text-xs text-neutral-400">Open dispatch and operations</span></span>
            <ArrowRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-[#e09900]" />
          </button>
        </div>
        <p className="mt-5 text-center text-xs text-neutral-500">Need a ride? Use the booking form. No account required.</p>
      </section>
    </div>
  );
}

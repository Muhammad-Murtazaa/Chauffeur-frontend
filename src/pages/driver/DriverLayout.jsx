import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  ShieldCheck,
  User,
  FileText,
  Car,
  FileCode,
  Camera,
  Calendar,
  Navigation,
  History,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Phone,
  Power,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react';

import { clearAuth, getStoredUser } from '../../api/client';
import { getCurrentProfile } from '../../api/auth';
import { getDriverAvailability, updateDriverAvailability } from '../../api/driver';

export default function DriverLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const [driverUser, setDriverUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: 'ACTIVE',
    verificationStatus: 'PENDING',
  });

  useEffect(() => {
    // 1. Instant load from local storage
    const stored = getStoredUser();
    if (stored) {
      setDriverUser((prev) => ({ ...prev, ...stored }));
    }

    // 2. Fetch fresh profile & availability from backend
    async function syncProfileAndStatus() {
      try {
        const [profileRes, availRes] = await Promise.allSettled([
          getCurrentProfile(),
          getDriverAvailability(),
        ]);

        if (profileRes.status === 'fulfilled' && profileRes.value?.user) {
          const user = profileRes.value.user;
          const driver = profileRes.value.driver;
          setDriverUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            status: driver?.status || 'ACTIVE',
            verificationStatus: driver?.verificationStatus || 'PENDING',
          });
        }

        if (availRes.status === 'fulfilled' && availRes.value?.availabilityStatus) {
          setIsOnline(availRes.value.availabilityStatus === 'ONLINE');
        }
      } catch (e) {
        // Fallback to stored state
      }
    }

    syncProfileAndStatus();
  }, []);

  const handleToggleOnline = async () => {
    const nextStatus = !isOnline ? 'ONLINE' : 'OFFLINE';
    setOnlineLoading(true);
    try {
      const res = await updateDriverAvailability(nextStatus);
      if (res?.availabilityStatus) {
        setIsOnline(res.availabilityStatus === 'ONLINE');
      } else {
        setIsOnline(!isOnline);
      }
    } catch (err) {
      console.error('Failed to update availability status:', err);
    } finally {
      setOnlineLoading(false);
    }
  };

  const handleSignOut = () => {
    clearAuth();
    navigate('/driver/login');
  };

  const navigationGroups = [
    {
      title: 'OPERATIONS',
      items: [
        {
          name: 'Dashboard',
          path: '/driver/dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          name: 'Active Ride',
          path: '/driver/active-ride',
          icon: <Navigation className="w-4 h-4 text-[#e09900]" />,
          badge: 'Live',
        },
        {
          name: 'Upcoming Bookings',
          path: '/driver/bookings/upcoming',
          icon: <Calendar className="w-4 h-4" />,
        },
        {
          name: 'Booking History',
          path: '/driver/bookings/history',
          icon: <History className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'PROFILE & VERIFICATION',
      items: [
        {
          name: 'Onboarding',
          path: '/driver/onboarding',
          icon: <UserCheck className="w-4 h-4" />,
        },
        {
          name: 'Profile',
          path: '/driver/profile',
          icon: <User className="w-4 h-4" />,
        },
        {
          name: 'Documents',
          path: '/driver/documents',
          icon: <FileText className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'VEHICLE',
      items: [
        {
          name: 'Vehicle',
          path: '/driver/vehicle',
          icon: <Car className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#060B10] text-white flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#0A1017] border-r border-white/10 shrink-0 sticky top-0 h-screen z-30">
        {/* Brand Logo Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/driver/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e09900]/20 border border-[#e09900]/40 flex items-center justify-center text-[#e09900] font-bold font-serif text-sm">
              NY
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-white tracking-wide">
                NYC <span className="text-[#e09900]">PREMIER</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                Chauffeur Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Chauffeur Mini Profile & Online Status Toggle */}
        <div className="p-4 border-b border-white/5 bg-[#0D151F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e09900]/30 to-amber-900/40 border border-[#e09900]/50 flex items-center justify-center font-bold text-white text-sm">
              {driverUser.firstName?.[0] || 'D'}
              {driverUser.lastName?.[0] || 'C'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {driverUser.firstName} {driverUser.lastName}
              </div>
              <div className="inline-flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  Verified Partner
                </span>
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="text-[11px] text-neutral-400">
              Availability:{' '}
              <span className={isOnline ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleOnline}
              disabled={onlineLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
                isOnline
                  ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Power className="w-3 h-3" />
              <span>{onlineLoading ? '...' : isOnline ? 'Go Offline' : 'Go Online'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigationGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-[#e09900] uppercase tracking-widest">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={i}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#e09900] text-black shadow-lg shadow-[#e09900]/20 font-bold'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-black' : 'text-[#e09900]'}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Sign Out */}
        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-[#0A1017] border-b border-white/10 p-4 flex items-center justify-between">
        <Link to="/driver/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#e09900]/20 border border-[#e09900]/40 flex items-center justify-center text-[#e09900] font-bold font-serif text-xs">
            NY
          </div>
          <span className="font-serif text-sm font-bold text-white">Chauffeur Portal</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleOnline}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
              isOnline ? 'bg-emerald-500 text-black' : 'bg-white/10 text-neutral-300'
            }`}
          >
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-white/5 text-neutral-300"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A1017] border-b border-white/10 p-4 space-y-4 max-h-[80vh] overflow-y-auto z-40">
          {navigationGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[10px] font-bold text-[#e09900] uppercase tracking-widest px-2">
                {group.title}
              </div>
              {group.items.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-semibold ${
                    location.pathname === item.path
                      ? 'bg-[#e09900] text-black'
                      : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full text-left px-3 py-2 text-xs text-rose-400"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 bg-[#060B10] overflow-y-auto">
        <Outlet context={{ isOnline, driverUser, setDriverUser }} />
      </main>
    </div>
  );
}

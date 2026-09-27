import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  DollarSign, 
  Send, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  Activity
} from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      matchPath: ['/admin', '/admin/dashboard'],
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Customer Management',
      path: '/admin/customers',
      matchPath: ['/admin/customers'],
      icon: Users,
      badge: null,
    },
    {
      name: 'Driver & Fleet Management',
      path: '/admin/drivers',
      matchPath: ['/admin/drivers'],
      icon: Car,
      badge: 'Live Fleet',
    },
    {
      name: 'Pricing Rules',
      path: '/admin/pricing',
      matchPath: ['/admin/pricing'],
      icon: DollarSign,
      badge: null,
    },
    {
      name: 'Dispatch Console',
      path: '/admin/dispatch',
      matchPath: ['/admin/dispatch'],
      icon: Send,
      badge: null,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActiveRoute = (item) => {
    return item.matchPath.includes(location.pathname);
  };

  return (
    <div className="min-h-screen bg-[#060B10] text-neutral-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#080E14] border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-bold font-serif text-sm">
            VIP
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Executive Dispatch</div>
            <div className="text-[10px] text-gold">Admin Master Console</div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-[#14202D] text-neutral-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 h-screen w-64 lg:w-72 bg-[#080E14] border-r border-white/10 flex flex-col justify-between z-50 transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div>
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold to-[#B38F24] flex items-center justify-center text-black font-serif font-black text-lg shadow-lg shadow-gold/20">
              VIP
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm text-white tracking-wide">
                NYC PREMIER
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gold font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Master Console</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-neutral-500">
              Operations & Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActiveRoute(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition group ${
                    active
                      ? 'bg-gold text-black shadow-lg shadow-gold/20'
                      : 'text-neutral-400 hover:text-white hover:bg-[#14202D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-neutral-400 group-hover:text-gold'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      active
                        ? 'bg-black text-gold'
                        : 'bg-gold/15 text-gold border border-gold/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Admin Account */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#060B10]/80">
          <div className="p-3 rounded-2xl bg-[#0E1722] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gold/20 border border-gold/40 text-gold flex items-center justify-center font-bold text-xs shrink-0">
                {user?.firstName?.[0] || 'A'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>MASTER ADMIN</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout Admin"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between px-2 text-[10px] text-neutral-500">
            <span>Neon DB • Connected</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen bg-[#060B10] flex flex-col">
        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#080E14] border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-neutral-500 font-medium">Executive Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-gold font-bold capitalize">
              {location.pathname.replace('/admin/', '').replace('/admin', 'Dashboard') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14202D] border border-white/10 text-xs">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-neutral-300 text-[11px] font-mono">Live Dispatch Engine: Active</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-gold transition font-bold"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

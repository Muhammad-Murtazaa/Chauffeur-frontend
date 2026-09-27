import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Car, 
  Users, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Send,
  Navigation,
  Sparkles
} from 'lucide-react';
import { fetchDashboardStats } from '../../api/admin';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDashboardStats();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
      setError('Unable to load executive metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const metrics = data?.metrics || {};
  const recentBookings = data?.recentBookings || [];
  const recentDrivers = data?.recentDrivers || [];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'IN_PROGRESS':
      case 'DRIVER_ARRIVED':
      case 'DRIVER_EN_ROUTE':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30 animate-pulse';
      case 'CONFIRMED':
      case 'DRIVER_ASSIGNED':
        return 'bg-gold/15 text-gold border-gold/30';
      case 'PENDING_PAYMENT':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'CANCELLED':
      case 'NO_SHOW':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-white/10 text-neutral-300 border-white/10';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner with Refresh */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0E1722] via-[#14202D] to-[#0E1722] border border-gold/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Fleet Intelligence</span>
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Executive Operations Dashboard
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Live telemetry for VIP Chauffeur bookings, dispatch assignments, and revenue streams.
          </p>
        </div>

        <button
          onClick={loadStats}
          disabled={loading}
          className="px-4 py-2.5 rounded-2xl bg-[#080E14] hover:bg-black/50 text-gold border border-gold/30 text-xs font-bold transition flex items-center gap-2 shadow-md shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Realtime</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-[#0E1722] border border-gold/30 space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Total Gross Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-gold/15 text-gold flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            ${Number(metrics.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{metrics.completedRides || 0} completed chauffeur runs</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Total Bookings</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {metrics.totalBookings || 0}
          </div>
          <div className="text-[11px] text-neutral-400 flex items-center gap-2">
            <span className="text-gold font-bold">{metrics.confirmedBookings || 0} Confirmed</span>
            <span>•</span>
            <span className="text-amber-400">{metrics.pendingPayments || 0} Pending</span>
          </div>
        </div>

        {/* Active Rides */}
        <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Active in Transit</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {metrics.activeRides || 0}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live GPS on roads now</span>
          </div>
        </div>

        {/* Drivers & Fleet */}
        <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Chauffeurs & Fleet</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white">
            {metrics.approvedDrivers || 0} <span className="text-sm font-sans font-normal text-neutral-400">/ {metrics.totalDrivers || 0}</span>
          </div>
          <div className="text-[11px] text-neutral-400 flex items-center gap-2">
            <span className="text-gold font-bold">{metrics.totalVehicles || 0} Total Vehicles</span>
            <span>•</span>
            <span className="text-emerald-400">{metrics.availableDrivers || 0} Available</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          to="/admin/customers"
          className="p-4 rounded-2xl bg-[#0E1722] hover:bg-[#14202D] border border-white/10 hover:border-gold/40 transition flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-gold transition">Customers Directory</div>
              <div className="text-[10px] text-neutral-400">{metrics.totalCustomers || 0} registered passengers</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-gold transition" />
        </Link>

        <Link
          to="/admin/drivers"
          className="p-4 rounded-2xl bg-[#0E1722] hover:bg-[#14202D] border border-white/10 hover:border-gold/40 transition flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-gold transition">Chauffeurs & Vehicles</div>
              <div className="text-[10px] text-neutral-400">{metrics.approvedVehicles || 0} verified luxury vehicles</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-gold transition" />
        </Link>

        <Link
          to="/admin/pricing"
          className="p-4 rounded-2xl bg-[#0E1722] hover:bg-[#14202D] border border-white/10 hover:border-gold/40 transition flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-gold transition">Pricing Rate Cards</div>
              <div className="text-[10px] text-neutral-400">Manage all 5 vehicle tiers</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-gold transition" />
        </Link>

        <Link
          to="/admin/dispatch"
          className="p-4 rounded-2xl bg-[#0E1722] hover:bg-[#14202D] border border-white/10 hover:border-gold/40 transition flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-gold transition">Dispatch Console</div>
              <div className="text-[10px] text-neutral-400">Assign drivers & rides</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-gold transition" />
        </Link>
      </div>

      {/* Recent Bookings Table */}
      <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Recent Chauffeur Reservations</h3>
            <p className="text-xs text-neutral-400">Latest client bookings placed on platform</p>
          </div>
          <Link
            to="/admin/dispatch"
            className="text-xs text-gold hover:underline font-bold"
          >
            View Dispatch Console →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            No bookings recorded yet. New reservations will appear here in real time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Ref #</th>
                  <th className="pb-3 font-semibold">Passenger</th>
                  <th className="pb-3 font-semibold">Itinerary / Route</th>
                  <th className="pb-3 font-semibold">Vehicle Class</th>
                  <th className="pb-3 font-semibold">Date & Time</th>
                  <th className="pb-3 font-semibold">Total Fare</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 font-mono text-gold font-bold">
                      {b.referenceNumber}
                    </td>
                    <td className="py-3.5">
                      <div className="font-bold text-white">{b.passengerName}</div>
                      <div className="text-[10px] text-neutral-400">{b.passengerPhone}</div>
                    </td>
                    <td className="py-3.5 max-w-xs">
                      <div className="text-white truncate font-medium">{b.pickupAddress}</div>
                      <div className="text-[10px] text-neutral-400 truncate">→ {b.dropoffAddress}</div>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/40 text-gold border border-gold/20 text-[10px] font-bold">
                        {b.vehicleCategory || 'EXECUTIVE'}
                      </span>
                    </td>
                    <td className="py-3.5 text-neutral-300">
                      {new Date(b.pickupAt).toLocaleDateString()} at {new Date(b.pickupAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 font-serif font-bold text-gold text-sm">
                      ${Number(b.totalPrice).toFixed(2)}
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(b.bookingStatus)}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Drivers & Fleet Roster */}
      <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Chauffeur & Fleet Roster</h3>
            <p className="text-xs text-neutral-400">Active drivers and registered luxury vehicles</p>
          </div>
          <Link
            to="/admin/drivers"
            className="text-xs text-gold hover:underline font-bold"
          >
            Manage All Drivers & Vehicles →
          </Link>
        </div>

        {recentDrivers.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-500">
            No chauffeurs registered yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDrivers.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-2xl bg-[#14202D] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold font-bold flex items-center justify-center text-xs">
                      {d.firstName?.[0]}{d.lastName?.[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{d.firstName} {d.lastName}</div>
                      <div className="text-[10px] text-neutral-400">{d.phone}</div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                    d.verificationStatus === 'APPROVED'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}>
                    {d.verificationStatus}
                  </span>
                </div>

                {/* Assigned Vehicle */}
                <div className="p-3 rounded-xl bg-[#080E14] border border-white/5 space-y-1 text-xs">
                  <div className="text-[10px] uppercase font-bold text-gold tracking-wider flex items-center justify-between">
                    <span>Assigned Vehicle</span>
                    <span className="text-neutral-400 font-mono">{d.vehicleRegistration || 'No Plate'}</span>
                  </div>
                  {d.vehicleMake ? (
                    <div className="text-white font-semibold">
                      {d.vehicleYear} {d.vehicleMake} {d.vehicleModel}
                      <span className="ml-2 text-[10px] text-neutral-400 font-normal">({d.vehicleCategory})</span>
                    </div>
                  ) : (
                    <div className="text-neutral-500 italic text-[11px]">No vehicle registered yet</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  DollarSign,
  ChevronRight,
  Calendar,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { getBookingHistory } from '../../api/driver';

export default function BookingHistory() {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      try {
        const res = await getBookingHistory();
        if (Array.isArray(res?.history)) {
          setHistoryData(res.history);
        } else {
          setHistoryData([]);
        }
      } catch (err) {
        console.error('Failed to load booking history:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const filtered = historyData.filter((item) => {
    const matchesFilter = filter === 'ALL' || item.status === filter;
    const matchesSearch =
      (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.passenger && item.passenger.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.pickup && item.pickup.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.dropoff && item.dropoff.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>COMPLETED</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-500/20 text-neutral-400 border border-white/10 text-[10px] font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>CANCELLED</span>
          </span>
        );
      case 'NO_SHOW':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>NO-SHOW</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-500/20 text-neutral-300 text-[10px] font-bold">
            {status || 'COMPLETED'}
          </span>
        );
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Trip Archives</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Chauffeur Booking History
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Historical log of all executed, completed, and processed bookings.
          </p>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          Showing {filtered.length} of {historyData.length} records
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-[#0E1722] border border-white/10 rounded-2xl w-full sm:w-auto">
          {['ALL', 'COMPLETED', 'CANCELLED', 'NO_SHOW'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === st
                  ? 'bg-[#e09900] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reference, VIP, destination..."
            className="w-full bg-[#0E1722] border border-white/15 focus:border-[#e09900] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#e09900] mx-auto" />
          <div className="text-xs text-neutral-400">Loading booking archives...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-3xl bg-[#0E1722] border border-white/10 text-center space-y-4 max-w-lg mx-auto">
          <History className="w-12 h-12 text-neutral-600 mx-auto" />
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-white">No Booking History Found</h2>
            <p className="text-xs text-neutral-400">
              Completed and processed rides will be logged and archived here with permanent financial records.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/driver/dashboard"
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs inline-flex items-center gap-2 border border-white/15"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Bookings Table / Cards */
        <div className="space-y-4">
          {filtered.map((ride) => (
            <div
              key={ride.id}
              className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 hover:border-[#e09900]/30 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#e09900]">{ride.id}</span>
                  <span className="text-xs font-semibold text-white">
                    {ride.date || ride.scheduledDate || 'Past Trip'} {ride.time ? `• ${ride.time}` : ''}
                  </span>
                  {getStatusBadge(ride.status)}
                </div>

                <div className="text-xs text-neutral-300">
                  VIP Passenger: <strong>{ride.passenger || ride.passengerName || 'VIP Client'}</strong>
                </div>

                <div className="text-xs text-neutral-400 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e09900]" />
                    <span>{ride.pickup}</span>
                  </div>
                  <span className="hidden sm:inline">→</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{ride.dropoff}</span>
                  </div>
                </div>
              </div>

              {/* Fare & CTA */}
              <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5">
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-white font-serif">
                    {ride.fare || '$0.00'}
                  </div>
                  {ride.tip && (
                    <div className="text-[11px] text-emerald-400">Tip: +{ride.tip}</div>
                  )}
                </div>

                <Link
                  to={`/driver/bookings/${ride.id}`}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#e09900] transition flex items-center gap-1.5"
                >
                  <span>Full Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

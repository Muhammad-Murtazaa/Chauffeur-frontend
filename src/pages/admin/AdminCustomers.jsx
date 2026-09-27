import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Calendar, 
  RefreshCw, 
  ShieldAlert, 
  AlertCircle,
  UserCheck,
  UserX,
  Sparkles
} from 'lucide-react';
import { fetchAdminCustomers, updateCustomerStatus } from '../../api/admin';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminCustomers(search);
      setCustomers(res || []);
    } catch (err) {
      console.error('Failed to load customers:', err);
      setError('Unable to retrieve customer database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [search]);

  const handleToggleStatus = async (customer) => {
    const newStatus = !customer.isActive;
    const confirmMsg = newStatus
      ? `Are you sure you want to reactivate customer ${customer.firstName} ${customer.lastName}?`
      : `Are you sure you want to deactivate customer ${customer.firstName} ${customer.lastName}? They will be blocked from logging in.`;

    if (!window.confirm(confirmMsg)) return;

    setUpdatingId(customer.id);
    try {
      await updateCustomerStatus(customer.id, newStatus);
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? { ...c, isActive: newStatus } : c))
      );
    } catch (err) {
      alert(err.message || 'Failed to update customer status');
    } finally {
      setUpdatingId(null);
    }
  };

  const totalSpentAll = customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0);
  const activeCount = customers.filter((c) => c.isActive).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Stats Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0E1722] border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Passenger Directory</span>
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Customer Management
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Directory of all registered clients, booking counts, lifetime spend, and account access controls.
          </p>
        </div>

        <button
          onClick={loadCustomers}
          disabled={loading}
          className="px-4 py-2.5 rounded-2xl bg-[#14202D] hover:bg-white/10 text-gold border border-gold/30 text-xs font-bold transition flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E1722] border border-white/10 space-y-1">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Total Registered Clients</div>
          <div className="font-serif text-2xl font-bold text-white">{customers.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E1722] border border-white/10 space-y-1">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Active In Good Standing</div>
          <div className="font-serif text-2xl font-bold text-emerald-400">{activeCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E1722] border border-white/10 space-y-1">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Total Client Spend</div>
          <div className="font-serif text-2xl font-bold text-gold">
            ${totalSpentAll.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by client name, email address, or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0E1722] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition shadow-xl"
        />
        <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-4" />
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Customer Table */}
      <div className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto" />
            <div className="text-xs text-neutral-400">Loading customer roster...</div>
          </div>
        ) : customers.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-500">
            No customers found matching your search query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Client Name</th>
                  <th className="pb-3 font-semibold">Contact Info</th>
                  <th className="pb-3 font-semibold text-center">Rides Taken</th>
                  <th className="pb-3 font-semibold">Lifetime Spend</th>
                  <th className="pb-3 font-semibold">Joined Date</th>
                  <th className="pb-3 font-semibold">Account Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition">
                    {/* Name & Avatar */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/40 text-gold font-bold flex items-center justify-center text-xs shrink-0">
                          {c.firstName?.[0] || 'C'}{c.lastName?.[0] || ''}
                        </div>
                        <div>
                          <div className="font-bold text-white">{c.firstName} {c.lastName}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">ID #{c.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-4 space-y-0.5">
                      <div className="text-white flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-neutral-500" />
                        <span>{c.email}</span>
                      </div>
                      <div className="text-neutral-400 text-[11px] flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-neutral-500" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    {/* Rides */}
                    <td className="py-4 text-center">
                      <span className="px-2.5 py-1 rounded-md bg-[#14202D] border border-white/10 font-mono text-xs font-bold text-white">
                        {c.rideCount || 0}
                      </span>
                    </td>

                    {/* Lifetime Spend */}
                    <td className="py-4 font-serif font-bold text-gold text-sm">
                      ${Number(c.totalSpent || 0).toFixed(2)}
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 text-neutral-400 text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>

                    {/* Account Status */}
                    <td className="py-4">
                      {c.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          <XCircle className="w-3 h-3" />
                          <span>Deactivated</span>
                        </span>
                      )}
                    </td>

                    {/* Action Toggle */}
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(c)}
                        disabled={updatingId === c.id}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 ml-auto ${
                          c.isActive
                            ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {updatingId === c.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : c.isActive ? (
                          <>
                            <UserX className="w-3 h-3" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3 h-3" />
                            <span>Reactivate</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

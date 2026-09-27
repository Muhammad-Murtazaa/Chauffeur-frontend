import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Check, 
  X, 
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { fetchAdminDrivers, updateDriverStatus, updateVehicleStatus } from '../../api/admin';

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, APPROVED, SUSPENDED
  const [search, setSearch] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [expandedDriverId, setExpandedDriverId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadDrivers = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminDrivers();
      setDrivers(res || []);
    } catch (err) {
      console.error('Failed to load drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleUpdateDriverVerification = async (driverId, newStatus) => {
    const reason = newStatus === 'REJECTED' ? prompt('Enter reason for rejection:') : undefined;
    if (newStatus === 'REJECTED' && reason === null) return;

    setProcessingId(`driver-${driverId}`);
    try {
      await updateDriverStatus(driverId, {
        verificationStatus: newStatus,
        status: newStatus === 'APPROVED' ? 'ACTIVE' : newStatus === 'REJECTED' ? 'REJECTED' : 'PENDING',
        rejectionReason: reason,
      });

      setDrivers((prev) =>
        prev.map((d) =>
          d.id === driverId
            ? {
                ...d,
                verificationStatus: newStatus,
                status: newStatus === 'APPROVED' ? 'ACTIVE' : newStatus === 'REJECTED' ? 'REJECTED' : d.status,
              }
            : d
        )
      );
      showToast(`Chauffeur #${driverId} marked as ${newStatus}`);
    } catch (err) {
      alert(err.message || 'Failed to update driver status');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateVehicleVerification = async (vehicleId, driverId, newStatus) => {
    const reason = newStatus === 'REJECTED' ? prompt('Enter reason for vehicle rejection:') : undefined;
    if (newStatus === 'REJECTED' && reason === null) return;

    setProcessingId(`vehicle-${vehicleId}`);
    try {
      await updateVehicleStatus(vehicleId, {
        status: newStatus,
        rejectionReason: reason,
      });

      setDrivers((prev) =>
        prev.map((d) => {
          if (d.id === driverId && d.vehicle) {
            return {
              ...d,
              vehicle: { ...d.vehicle, status: newStatus, rejectionReason: reason },
            };
          }
          return d;
        })
      );
      showToast(`Vehicle #${vehicleId} marked as ${newStatus}`);
    } catch (err) {
      alert(err.message || 'Failed to update vehicle status');
    } finally {
      setProcessingId(null);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter & Search Logic
  const filteredDrivers = drivers.filter((d) => {
    if (filter === 'PENDING' && d.verificationStatus !== 'PENDING') return false;
    if (filter === 'APPROVED' && d.verificationStatus !== 'APPROVED') return false;
    if (filter === 'SUSPENDED' && d.status !== 'SUSPENDED') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = d.name?.toLowerCase().includes(q);
      const matchEmail = d.email?.toLowerCase().includes(q);
      const matchPhone = d.phone?.includes(q);
      const matchPlate = d.vehicle?.registrationNumber?.toLowerCase().includes(q);
      const matchMake = d.vehicle?.make?.toLowerCase().includes(q);
      const matchModel = d.vehicle?.model?.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchPlate || matchMake || matchModel;
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0E1722] border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" />
              <span>Chauffeur & Fleet Compliance</span>
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Driver & Fleet Vehicle Management
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Review driver profiles, inspect every assigned luxury vehicle, and manage TLC compliance status.
          </p>
        </div>

        <button
          onClick={loadDrivers}
          disabled={loading}
          className="px-4 py-2.5 rounded-2xl bg-[#14202D] hover:bg-white/10 text-gold border border-gold/30 text-xs font-bold transition flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Fleet</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-[#0E1722] rounded-2xl border border-white/10">
          {[
            { id: 'ALL', label: `All Chauffeurs (${drivers.length})` },
            { id: 'PENDING', label: `Pending Review (${drivers.filter(d => d.verificationStatus === 'PENDING').length})` },
            { id: 'APPROVED', label: `Approved (${drivers.filter(d => d.verificationStatus === 'APPROVED').length})` },
            { id: 'SUSPENDED', label: `Suspended (${drivers.filter(d => d.status === 'SUSPENDED').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === tab.id
                  ? 'bg-gold text-black shadow-md shadow-gold/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search chauffeur, plate, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0E1722] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Drivers List with Vehicles */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto" />
          <div className="text-xs text-neutral-400">Loading chauffeur fleet records...</div>
        </div>
      ) : filteredDrivers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0E1722] border border-white/10 text-xs text-neutral-400">
          No drivers found matching your filter or search criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDrivers.map((d) => {
            const isExpanded = expandedDriverId === d.id;
            const vehicle = d.vehicle;

            return (
              <div
                key={d.id}
                className="p-6 rounded-3xl bg-[#0E1722] border border-white/10 hover:border-white/20 transition shadow-xl space-y-4"
              >
                {/* Driver Summary Row */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left: Driver Identity */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-[#14202D] border border-gold/40 text-gold flex items-center justify-center font-bold text-sm shrink-0">
                      {d.firstName?.[0]}{d.lastName?.[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-base font-bold text-white">{d.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          d.verificationStatus === 'APPROVED'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : d.verificationStatus === 'REJECTED'
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}>
                          {d.verificationStatus}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          d.availabilityStatus === 'AVAILABLE'
                            ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                            : 'bg-neutral-500/15 text-neutral-400 border-white/10'
                        }`}>
                          {d.availabilityStatus}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{d.email}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{d.phone}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Award className="w-3 h-3 text-gold" />{d.yearsOfExperience} Yrs Exp</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Driver Action Buttons */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                    {d.verificationStatus !== 'APPROVED' && (
                      <button
                        onClick={() => handleUpdateDriverVerification(d.id, 'APPROVED')}
                        disabled={processingId === `driver-${d.id}`}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs transition border border-emerald-500/30 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Chauffeur</span>
                      </button>
                    )}

                    {d.verificationStatus !== 'REJECTED' && (
                      <button
                        onClick={() => handleUpdateDriverVerification(d.id, 'REJECTED')}
                        disabled={processingId === `driver-${d.id}`}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs transition border border-rose-500/30 flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedDriverId(isExpanded ? null : d.id)}
                      className="p-2 rounded-xl bg-[#14202D] hover:bg-white/10 text-neutral-400 hover:text-white transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Assigned Vehicle Section (Always shown for every driver) */}
                <div className="p-4 rounded-2xl bg-[#14202D] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#080E14] border border-white/10 flex items-center justify-center text-gold shrink-0">
                      <Car className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gold">
                          Assigned Fleet Vehicle
                        </span>
                        {vehicle && (
                          <span className={`px-2 py-0.2 rounded text-[9px] font-bold border ${
                            vehicle.status === 'APPROVED'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : vehicle.status === 'REJECTED'
                              ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}>
                            Vehicle {vehicle.status}
                          </span>
                        )}
                      </div>

                      {vehicle ? (
                        <div className="text-sm font-bold text-white mt-0.5">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                          <span className="ml-2 text-xs font-normal text-neutral-400">
                            ({vehicle.color || 'Black'} • Tier: <strong className="text-gold">{vehicle.category}</strong>)
                          </span>
                        </div>
                      ) : (
                        <div className="text-xs text-neutral-500 italic mt-0.5">
                          No vehicle registered by this driver yet.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Details & Vehicle Status Actions */}
                  {vehicle && (
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right text-xs">
                        <div className="font-mono text-gold font-bold">Plate: {vehicle.registrationNumber}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">VIN: {vehicle.vinNumber || 'N/A'}</div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {vehicle.status !== 'APPROVED' && (
                          <button
                            onClick={() => handleUpdateVehicleVerification(vehicle.id, d.id, 'APPROVED')}
                            disabled={processingId === `vehicle-${vehicle.id}`}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black text-[11px] font-bold transition border border-emerald-500/30"
                          >
                            Approve Car
                          </button>
                        )}
                        {vehicle.status !== 'REJECTED' && (
                          <button
                            onClick={() => handleUpdateVehicleVerification(vehicle.id, d.id, 'REJECTED')}
                            disabled={processingId === `vehicle-${vehicle.id}`}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-[11px] font-bold transition border border-rose-500/30"
                          >
                            Reject Car
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Expandable Extra Details */}
                {isExpanded && (
                  <div className="p-4 rounded-2xl bg-[#080E14] border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-200">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Address & Location</div>
                      <div className="text-white mt-1">{d.address || 'Address not provided'}</div>
                      <div className="text-neutral-400 text-[11px]">{d.city || 'NYC Metro'}</div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Emergency Contact</div>
                      <div className="text-white mt-1">{d.emergencyContactName || 'None listed'}</div>
                      <div className="text-neutral-400 text-[11px]">{d.emergencyContactPhone || 'N/A'}</div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Fleet Passenger Capacity</div>
                      <div className="text-white mt-1">
                        {vehicle ? `${vehicle.passengerCapacity} Passengers • ${vehicle.luggageCapacity} Bags` : 'N/A'}
                      </div>
                      <div className="text-neutral-400 text-[11px]">
                        Registered: {new Date(d.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

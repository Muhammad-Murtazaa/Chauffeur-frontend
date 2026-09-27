import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Car, 
  MapPin, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Users, 
  Phone, 
  DollarSign, 
  ShieldCheck, 
  X,
  Sparkles
} from 'lucide-react';
import { 
  fetchUnassignedBookings, 
  fetchEligibleDrivers, 
  assignDriverToBooking 
} from '../../api/admin';

export default function AdminDispatch() {
  const [unassigned, setUnassigned] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [eligibleDrivers, setEligibleDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [dispatchNote, setDispatchNote] = useState('');
  const [dispatching, setDispatching] = useState(false);
  const [toast, setToast] = useState(null);

  const loadUnassigned = async () => {
    setLoading(true);
    try {
      const res = await fetchUnassignedBookings();
      setUnassigned(res || []);
    } catch (err) {
      console.error('Failed to load unassigned bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUnassigned();
  }, []);

  const handleOpenAssignModal = async (booking) => {
    setSelectedBooking(booking);
    setSelectedDriverId(null);
    setDispatchNote('');
    setLoadingDrivers(true);

    try {
      const drivers = await fetchEligibleDrivers(booking.id);
      setEligibleDrivers(drivers || []);
      if (drivers?.length > 0) {
        setSelectedDriverId(drivers[0].driverId);
      }
    } catch (err) {
      console.error('Failed to fetch eligible drivers:', err);
    } finally {
      setLoadingDrivers(false);
    }
  };

  const handleExecuteDispatch = async (e) => {
    e.preventDefault();
    if (!selectedBooking || !selectedDriverId) return;

    const chosen = eligibleDrivers.find((d) => d.driverId === selectedDriverId);
    setDispatching(true);

    try {
      await assignDriverToBooking(selectedBooking.id, {
        driverId: selectedDriverId,
        vehicleId: chosen?.vehicle?.id,
        note: dispatchNote || undefined,
      });

      setUnassigned((prev) => prev.filter((b) => b.id !== selectedBooking.id));
      setSelectedBooking(null);
      setToast(`Booking #${selectedBooking.referenceNumber} dispatched to ${chosen?.firstName} ${chosen?.lastName}`);
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      alert(err.message || 'Failed to dispatch booking');
    } finally {
      setDispatching(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0E1722] border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              <span>Live Fleet Dispatch Console</span>
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Chauffeur Assignment & Dispatch
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Assign incoming client reservations to active chauffeurs with automated conflict buffer checks.
          </p>
        </div>

        <button
          onClick={loadUnassigned}
          disabled={loading}
          className="px-4 py-2.5 rounded-2xl bg-[#14202D] hover:bg-white/10 text-gold border border-gold/30 text-xs font-bold transition flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Queue List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto" />
          <div className="text-xs text-neutral-400">Loading unassigned booking queue...</div>
        </div>
      ) : unassigned.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0E1722] border border-white/10 text-xs text-neutral-400 space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <div className="font-bold text-white text-sm">Dispatch Queue is Clear!</div>
          <div>All active customer bookings have been assigned to chauffeurs.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unassigned.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-[#0E1722] border border-gold/30 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-gold">
                    {b.referenceNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Awaiting Dispatch
                  </span>
                </div>

                <div className="text-xs text-neutral-300 space-y-1.5 pb-3 border-b border-white/10">
                  <div className="font-bold text-white text-sm">{b.passengerName}</div>
                  <div className="text-neutral-400">{b.passengerPhone} • {b.passengerEmail}</div>
                </div>

                {/* Itinerary */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span className="font-medium text-white">{b.pickupAddress}</span>
                  </div>
                  <div className="flex items-start gap-2 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b.dropoffAddress}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{new Date(b.pickupAt).toLocaleString()}</span>
                  </div>
                  <span className="font-serif text-base font-bold text-gold">
                    ${Number(b.totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => handleOpenAssignModal(b)}
                  className="w-full py-3 rounded-xl bg-gold hover:bg-gold-hover text-black font-bold text-xs transition shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Assign Available Chauffeur</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assign Driver Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0E1722] border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Chauffeur Dispatch</span>
                <h3 className="font-serif text-lg font-bold text-white">
                  Assign Driver to #{selectedBooking.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#14202D] text-xs space-y-1 text-neutral-300">
              <div><strong>Passenger:</strong> {selectedBooking.passengerName} ({selectedBooking.passengerPhone})</div>
              <div><strong>Pickup:</strong> {selectedBooking.pickupAddress}</div>
              <div><strong>Time:</strong> {new Date(selectedBooking.pickupAt).toLocaleString()}</div>
            </div>

            <form onSubmit={handleExecuteDispatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-2">
                  Select Eligible Chauffeur ({eligibleDrivers.length} Available with no schedule conflict)
                </label>

                {loadingDrivers ? (
                  <div className="p-6 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-gold" />
                    <span>Checking schedule conflicts...</span>
                  </div>
                ) : eligibleDrivers.length === 0 ? (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    No active approved drivers available for this vehicle category without a schedule conflict.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {eligibleDrivers.map((d) => {
                      const isSelected = selectedDriverId === d.driverId;
                      return (
                        <button
                          key={d.driverId}
                          type="button"
                          onClick={() => setSelectedDriverId(d.driverId)}
                          className={`w-full p-3.5 rounded-2xl text-left border transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-gold/15 border-gold text-white shadow-md'
                              : 'bg-[#14202D] border-white/10 text-neutral-300 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                              <span>{d.firstName} {d.lastName}</span>
                              <span className="text-[10px] text-emerald-400 font-normal">({d.phone})</span>
                            </div>
                            <div className="text-[11px] text-neutral-400 mt-0.5">
                              Vehicle: {d.vehicle ? `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model} (${d.vehicle.registrationNumber})` : 'Assigned fleet car'}
                            </div>
                          </div>

                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-gold border-gold text-black' : 'border-neutral-500'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Dispatch Instructions / Flight Gate Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flight lands Terminal 4. Meet inside with name sign."
                  value={dispatchNote}
                  onChange={(e) => setDispatchNote(e.target.value)}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={dispatching || !selectedDriverId}
                  className="px-7 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-black font-bold text-xs transition shadow-lg shadow-gold/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {dispatching ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching Driver...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm & Dispatch Driver</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

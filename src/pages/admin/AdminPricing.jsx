import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Car, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Info,
  Sparkles
} from 'lucide-react';
import { fetchPricingRules, updatePricingRule } from '../../api/admin';

export default function AdminPricing() {
  const [pricingRules, setPricingRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRule, setEditingRule] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const loadPricing = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPricingRules();
      setPricingRules(res || []);
    } catch (err) {
      console.error('Failed to load pricing:', err);
      setError('Unable to load pricing rules from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
  }, []);

  const handleEditClick = (rule) => {
    setEditingRule({ ...rule });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingRule) return;

    setSaving(true);
    try {
      await updatePricingRule(editingRule.id, {
        name: editingRule.name,
        baseFare: Number(editingRule.baseFare),
        pricePerDistance: Number(editingRule.pricePerDistance),
        pricePerMinute: Number(editingRule.pricePerMinute),
        minimumFare: Number(editingRule.minimumFare),
        hourlyRate: Number(editingRule.hourlyRate),
        passengerCapacity: Number(editingRule.passengerCapacity),
        luggageCapacity: Number(editingRule.luggageCapacity),
        description: editingRule.description,
        isActive: Boolean(editingRule.isActive),
      });

      setPricingRules((prev) =>
        prev.map((r) => (r.id === editingRule.id ? { ...editingRule } : r))
      );
      setEditingRule(null);
      setSuccessMessage(`Pricing rule for ${editingRule.name} updated successfully.`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      alert(err.message || 'Failed to update pricing rule');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0E1722] border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-gold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Revenue Engine & Fare Matrix</span>
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Pricing Rules & Rate Cards
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Configure vehicle category base fares, mileage rates, hourly charter rates, and minimum billable amounts.
          </p>
        </div>

        <button
          onClick={loadPricing}
          disabled={loading}
          className="px-4 py-2.5 rounded-2xl bg-[#14202D] hover:bg-white/10 text-gold border border-gold/30 text-xs font-bold transition flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Reload Rates</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Pricing Policy Notice */}
      <div className="p-5 rounded-2xl bg-[#14202D] border border-gold/30 text-xs text-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">Automated Surcharge Architecture</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Airport Terminal & Meet & Greet: <strong>+$25.00</strong> • Night Shift (10 PM - 6 AM): <strong>+15%</strong> • NY State Tax: <strong>8.875%</strong>
            </div>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-black/40 text-[10px] text-gold font-mono border border-gold/20 shrink-0">
          All-Inclusive Guaranteed Model
        </div>
      </div>

      {/* Rate Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto" />
          <div className="text-xs text-neutral-400">Loading live rate cards...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingRules.map((rule) => (
            <div
              key={rule.id}
              className={`p-6 rounded-3xl bg-[#0E1722] border transition flex flex-col justify-between relative overflow-hidden shadow-xl ${
                rule.isActive
                  ? 'border-gold/40 hover:border-gold shadow-gold/5'
                  : 'border-white/10 opacity-60'
              }`}
            >
              {/* Category Pill */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-black tracking-widest text-gold uppercase">
                    {rule.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                    rule.isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-neutral-500/15 text-neutral-400 border-white/10'
                  }`}>
                    {rule.isActive ? 'Active Tier' : 'Inactive'}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mt-1">
                  {rule.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                  {rule.description || 'Premium chauffeured transport tier.'}
                </p>

                <div className="flex items-center gap-3 text-xs text-neutral-400 mt-3 pb-4 border-b border-white/10">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    {rule.passengerCapacity} Pax
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-gold" />
                    {rule.luggageCapacity} Bags
                  </span>
                </div>

                {/* Rate Metrics List */}
                <div className="space-y-2.5 py-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Base Pickup Fare:</span>
                    <span className="font-mono font-bold text-white">${Number(rule.baseFare).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Mileage Rate:</span>
                    <span className="font-mono font-bold text-gold">${Number(rule.pricePerDistance).toFixed(2)} / km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Time / Minute Rate:</span>
                    <span className="font-mono font-bold text-white">${Number(rule.pricePerMinute).toFixed(2)} / min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Minimum Trip Fare:</span>
                    <span className="font-mono font-bold text-white">${Number(rule.minimumFare).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-neutral-400">Hourly Charter Rate:</span>
                    <span className="font-serif font-bold text-base text-gold">${Number(rule.hourlyRate).toFixed(2)} / hr</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleEditClick(rule)}
                  className="w-full py-2.5 rounded-xl bg-[#14202D] hover:bg-gold text-neutral-200 hover:text-black font-bold text-xs transition border border-white/10 hover:border-gold flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Rate Matrix</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Pricing Modal */}
      {editingRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0E1722] border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Edit Pricing Rule</span>
                <h3 className="font-serif text-xl font-bold text-white">{editingRule.name} ({editingRule.category})</h3>
              </div>
              <button
                onClick={() => setEditingRule(null)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRule.name}
                    onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Base Fare ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingRule.baseFare}
                    onChange={(e) => setEditingRule({ ...editingRule, baseFare: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Price Per Distance ($ / km)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingRule.pricePerDistance}
                    onChange={(e) => setEditingRule({ ...editingRule, pricePerDistance: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Price Per Minute ($ / min)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingRule.pricePerMinute}
                    onChange={(e) => setEditingRule({ ...editingRule, pricePerMinute: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Minimum Flat Fare ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingRule.minimumFare}
                    onChange={(e) => setEditingRule({ ...editingRule, minimumFare: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Hourly Charter Rate ($ / hr)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingRule.hourlyRate}
                    onChange={(e) => setEditingRule({ ...editingRule, hourlyRate: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Passenger Capacity
                  </label>
                  <input
                    type="number"
                    required
                    value={editingRule.passengerCapacity}
                    onChange={(e) => setEditingRule({ ...editingRule, passengerCapacity: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Luggage Capacity
                  </label>
                  <input
                    type="number"
                    required
                    value={editingRule.luggageCapacity}
                    onChange={(e) => setEditingRule({ ...editingRule, luggageCapacity: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Description & Chauffeur Vehicle Models
                </label>
                <textarea
                  rows={2}
                  value={editingRule.description || ''}
                  onChange={(e) => setEditingRule({ ...editingRule, description: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={editingRule.isActive}
                  onChange={(e) => setEditingRule({ ...editingRule, isActive: e.target.checked })}
                  className="rounded border-white/10 text-gold focus:ring-gold"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-bold text-white cursor-pointer">
                  Active in Live Quote & Booking Engine
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingRule(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-black font-bold text-xs transition shadow-lg shadow-gold/20 flex items-center gap-1.5"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Rates...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Rate Matrix</span>
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

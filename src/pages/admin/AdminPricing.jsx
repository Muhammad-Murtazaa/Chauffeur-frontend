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
  Sparkles,
  Plus,
  Trash2,
  MapPin,
  Plane,
  Clock,
  ArrowRightLeft,
  Route
} from 'lucide-react';
import { fetchPricingRules, updatePricingRule, fetchRoutePricing, createRoutePricing, updateRoutePricingRule, deleteRoutePricingRule } from '../../api/admin';

export default function AdminPricing() {
  const [pricingRules, setPricingRules] = useState([]);
  const [routeRules, setRouteRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [routesLoading, setRoutesLoading] = useState(true);
  const [editingRule, setEditingRule] = useState(null);
  const [editingRoute, setEditingRoute] = useState(null);
  const [creatingRoute, setCreatingRoute] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('routes'); // 'routes' | 'base-rates'

  // New route form state
  const [newRoute, setNewRoute] = useState({
    routeName: '',
    originKeywords: '',
    destinationKeywords: '',
    vehicleTypeId: '',
    flatPrice: '',
    isBidirectional: true,
  });

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

  const loadRoutePricing = async () => {
    setRoutesLoading(true);
    try {
      const res = await fetchRoutePricing();
      setRouteRules(res || []);
    } catch (err) {
      console.error('Failed to load route pricing:', err);
    } finally {
      setRoutesLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
    loadRoutePricing();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // ── Vehicle Type Rate Card editing ──
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
        minimumHours: Number(editingRule.minimumHours),
        passengerCapacity: Number(editingRule.passengerCapacity),
        luggageCapacity: Number(editingRule.luggageCapacity),
        description: editingRule.description,
        isActive: Boolean(editingRule.isActive),
      });

      setPricingRules((prev) =>
        prev.map((r) => (r.id === editingRule.id ? { ...editingRule } : r))
      );
      setEditingRule(null);
      showSuccess(`Pricing rule for ${editingRule.name} updated successfully.`);
    } catch (err) {
      alert(err.message || 'Failed to update pricing rule');
    } finally {
      setSaving(false);
    }
  };

  // ── Route Pricing CRUD ──
  const handleCreateRoute = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await createRoutePricing({
        routeName: newRoute.routeName,
        originKeywords: newRoute.originKeywords,
        destinationKeywords: newRoute.destinationKeywords,
        vehicleTypeId: Number(newRoute.vehicleTypeId),
        flatPrice: Number(newRoute.flatPrice),
        isBidirectional: newRoute.isBidirectional,
      });
      await loadRoutePricing();
      setCreatingRoute(false);
      setNewRoute({
        routeName: '',
        originKeywords: '',
        destinationKeywords: '',
        vehicleTypeId: '',
        flatPrice: '',
        isBidirectional: true,
      });
      showSuccess(result.message);
    } catch (err) {
      alert(err.message || 'Failed to create route pricing');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveRouteEdit = async (e) => {
    e.preventDefault();
    if (!editingRoute) return;
    setSaving(true);
    try {
      await updateRoutePricingRule(editingRoute.id, {
        routeName: editingRoute.routeName,
        originKeywords: editingRoute.originKeywords,
        destinationKeywords: editingRoute.destinationKeywords,
        vehicleTypeId: Number(editingRoute.vehicleTypeId),
        flatPrice: Number(editingRoute.flatPrice),
        isBidirectional: editingRoute.isBidirectional,
        isActive: editingRoute.isActive,
      });
      await loadRoutePricing();
      setEditingRoute(null);
      showSuccess(`Route pricing updated successfully.`);
    } catch (err) {
      alert(err.message || 'Failed to update route pricing');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRoute = async (id, routeName) => {
    if (!confirm(`Delete route pricing "${routeName}"? This action cannot be undone.`)) return;
    try {
      await deleteRoutePricingRule(id);
      await loadRoutePricing();
      showSuccess(`Route pricing "${routeName}" deleted.`);
    } catch (err) {
      alert(err.message || 'Failed to delete route pricing');
    }
  };

  // Group route rules by routeName for display
  const groupedRoutes = routeRules.reduce((acc, route) => {
    if (!acc[route.routeName]) {
      acc[route.routeName] = {
        routeName: route.routeName,
        originKeywords: route.originKeywords,
        destinationKeywords: route.destinationKeywords,
        isBidirectional: route.isBidirectional,
        rates: [],
      };
    }
    acc[route.routeName].rates.push(route);
    return acc;
  }, {});

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
            Configure flat-rate route pricing, vehicle category fares, hourly charter rates, and minimum billable amounts.
          </p>
        </div>

        <button
          onClick={() => { loadPricing(); loadRoutePricing(); }}
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
            <div className="font-bold text-white">Pricing Priority</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              <strong className="text-gold">1st</strong> Flat-Rate Route Match • <strong className="text-gold">2nd</strong> Distance-Based Fallback • Night (10 PM - 6 AM): <strong>+15%</strong> • NY Tax: <strong>8.875%</strong>
            </div>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-black/40 text-[10px] text-gold font-mono border border-gold/20 shrink-0">
          All-Inclusive Guaranteed Model
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 ${
            activeTab === 'routes'
              ? 'bg-[#0E1722] border-gold text-gold'
              : 'bg-transparent border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Route className="w-3.5 h-3.5" />
            <span>Flat-Rate Routes</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-mono">
              {routeRules.length}
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('base-rates')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 ${
            activeTab === 'base-rates'
              ? 'bg-[#0E1722] border-gold text-gold'
              : 'bg-transparent border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" />
            <span>Vehicle Base Rates</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-mono">
              {pricingRules.length}
            </span>
          </div>
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━ TAB: Flat-Rate Routes ━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          {/* Add Route Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setCreatingRoute(true)}
              className="px-5 py-2.5 rounded-2xl bg-gold hover:bg-gold-hover text-black font-bold text-xs transition shadow-lg shadow-gold/20 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Route Price</span>
            </button>
          </div>

          {routesLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto" />
              <div className="text-xs text-neutral-400">Loading route pricing...</div>
            </div>
          ) : Object.keys(groupedRoutes).length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <MapPin className="w-8 h-8 text-neutral-600 mx-auto" />
              <div className="text-sm text-neutral-400">No flat-rate routes configured yet.</div>
              <div className="text-xs text-neutral-500">Click "Add Route Price" to create your first route.</div>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.values(groupedRoutes).map((group) => (
                <div
                  key={group.routeName}
                  className="rounded-3xl bg-[#0E1722] border border-white/10 shadow-xl overflow-hidden"
                >
                  {/* Route Header */}
                  <div className="p-5 border-b border-white/10 bg-gradient-to-r from-gold/5 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                          <Plane className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-white">
                            {group.routeName}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            {group.isBidirectional && (
                              <span className="flex items-center gap-1 text-[10px] text-gold font-bold">
                                <ArrowRightLeft className="w-3 h-3" />
                                Bidirectional
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500">Origin:</span>
                        <div className="flex flex-wrap gap-1">
                          {group.originKeywords.split(',').map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                              {kw.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500">Dest:</span>
                        <div className="flex flex-wrap gap-1">
                          {group.destinationKeywords.split(',').slice(0, 5).map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                              {kw.trim()}
                            </span>
                          ))}
                          {group.destinationKeywords.split(',').length > 5 && (
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10 font-mono">
                              +{group.destinationKeywords.split(',').length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Rates */}
                  <div className="divide-y divide-white/5">
                    {group.rates.map((rate) => (
                      <div
                        key={rate.id}
                        className={`px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition ${
                          !rate.isActive ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-[#14202D] text-gold flex items-center justify-center">
                            <Car className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">
                              {rate.vehicleTypeName || rate.vehicleCategory}
                            </div>
                            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                              {rate.vehicleCategory}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-serif text-xl font-bold text-gold">
                              ${Number(rate.flatPrice).toFixed(0)}
                            </div>
                            <div className="text-[10px] text-neutral-500">flat rate</div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingRoute({ ...rate })}
                              className="p-2 rounded-lg text-neutral-400 hover:text-gold hover:bg-gold/10 transition"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoute(rate.id, `${rate.routeName} (${rate.vehicleTypeName})`)}
                              className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━ TAB: Vehicle Base Rates ━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'base-rates' && (
        <>
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
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Minimum Hours:</span>
                        <span className="font-mono font-bold text-white flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold" />
                          {rule.minimumHours || 2} hrs
                        </span>
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
        </>
      )}

      {/* ━━━━━━━━━━━━━━━━━━ MODAL: Edit Vehicle Type Rate ━━━━━━━━━━━━━━━━━━ */}
      {editingRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0E1722] border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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
                    Minimum Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingRule.minimumHours ?? 2}
                    onChange={(e) => setEditingRule({ ...editingRule, minimumHours: e.target.value })}
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

      {/* ━━━━━━━━━━━━━━━━━━ MODAL: Create Route Pricing ━━━━━━━━━━━━━━━━━━ */}
      {creatingRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0E1722] border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold">New Flat-Rate Route</span>
                <h3 className="font-serif text-xl font-bold text-white">Create Route Pricing</h3>
              </div>
              <button
                onClick={() => setCreatingRoute(false)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Route Name <span className="text-neutral-600">(e.g., "JFK to NYC")</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRoute.routeName}
                  onChange={(e) => setNewRoute({ ...newRoute, routeName: e.target.value })}
                  placeholder="JFK to NYC"
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Origin Keywords <span className="text-neutral-600">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newRoute.originKeywords}
                    onChange={(e) => setNewRoute({ ...newRoute, originKeywords: e.target.value })}
                    placeholder="jfk,kennedy"
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition font-mono"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Keywords matched against pickup address</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Destination Keywords <span className="text-neutral-600">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newRoute.destinationKeywords}
                    onChange={(e) => setNewRoute({ ...newRoute, destinationKeywords: e.target.value })}
                    placeholder="manhattan,brooklyn,queens"
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition font-mono"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Keywords matched against dropoff address</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Vehicle Class
                  </label>
                  <select
                    required
                    value={newRoute.vehicleTypeId}
                    onChange={(e) => setNewRoute({ ...newRoute, vehicleTypeId: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
                  >
                    <option value="">Select vehicle class...</option>
                    {pricingRules.map((vt) => (
                      <option key={vt.id} value={vt.id}>
                        {vt.name} ({vt.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Flat Rate Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={newRoute.flatPrice}
                    onChange={(e) => setNewRoute({ ...newRoute, flatPrice: e.target.value })}
                    placeholder="165.00"
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isBidirectional"
                  checked={newRoute.isBidirectional}
                  onChange={(e) => setNewRoute({ ...newRoute, isBidirectional: e.target.checked })}
                  className="rounded border-white/10 text-gold focus:ring-gold"
                />
                <label htmlFor="isBidirectional" className="text-xs font-bold text-white cursor-pointer">
                  Bidirectional (same price applies in reverse direction)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCreatingRoute(false)}
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
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Route Price</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━ MODAL: Edit Route Pricing ━━━━━━━━━━━━━━━━━━ */}
      {editingRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0E1722] border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Edit Route Pricing</span>
                <h3 className="font-serif text-xl font-bold text-white">{editingRoute.routeName}</h3>
              </div>
              <button
                onClick={() => setEditingRoute(null)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRouteEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Route Name
                </label>
                <input
                  type="text"
                  required
                  value={editingRoute.routeName}
                  onChange={(e) => setEditingRoute({ ...editingRoute, routeName: e.target.value })}
                  className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Origin Keywords
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRoute.originKeywords}
                    onChange={(e) => setEditingRoute({ ...editingRoute, originKeywords: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Destination Keywords
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRoute.destinationKeywords}
                    onChange={(e) => setEditingRoute({ ...editingRoute, destinationKeywords: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Vehicle Class
                  </label>
                  <select
                    required
                    value={editingRoute.vehicleTypeId}
                    onChange={(e) => setEditingRoute({ ...editingRoute, vehicleTypeId: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition"
                  >
                    {pricingRules.map((vt) => (
                      <option key={vt.id} value={vt.id}>
                        {vt.name} ({vt.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Flat Rate Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={editingRoute.flatPrice}
                    onChange={(e) => setEditingRoute({ ...editingRoute, flatPrice: e.target.value })}
                    className="w-full bg-[#14202D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editIsBidirectional"
                    checked={editingRoute.isBidirectional}
                    onChange={(e) => setEditingRoute({ ...editingRoute, isBidirectional: e.target.checked })}
                    className="rounded border-white/10 text-gold focus:ring-gold"
                  />
                  <label htmlFor="editIsBidirectional" className="text-xs font-bold text-white cursor-pointer">
                    Bidirectional
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editRouteIsActive"
                    checked={editingRoute.isActive}
                    onChange={(e) => setEditingRoute({ ...editingRoute, isActive: e.target.checked })}
                    className="rounded border-white/10 text-gold focus:ring-gold"
                  />
                  <label htmlFor="editRouteIsActive" className="text-xs font-bold text-white cursor-pointer">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingRoute(null)}
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
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
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

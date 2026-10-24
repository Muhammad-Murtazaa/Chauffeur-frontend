import React, { useState, useEffect } from 'react';
import {
  getDriverVehicle,
  registerVehicle,
  updateDriverVehicle,
  getVehicleDocuments,
  uploadVehicleDocument,
  getVehiclePhotos,
  uploadVehiclePhoto,
  getDriverVerification,
} from '../../api/driver';
import {
  Car,
  FileCode,
  Camera,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Plus,
  Save,
  UploadCloud,
  Edit3,
  Sparkles,
  Layers,
  ChevronRight,
  X,
  FileText,
  Check,
  Info,
  RefreshCw,
} from 'lucide-react';

const PHOTO_SLOTS = [
  {
    type: 'FRONT',
    title: 'Front View (Grille & LED Headlights)',
    description: 'Clear frontal view showing front license plate and bumper condition',
    fallbackUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
  },
  {
    type: 'BACK',
    title: 'Rear View (Trunk & Exhaust)',
    description: 'Rear aspect showing clean livery badging and pristine trunk lid',
    fallbackUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
  },
  {
    type: 'LEFT',
    title: 'Driver-Side Full Profile',
    description: 'Side body panel showing flawless paint and polished alloy rims',
    fallbackUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
  },
  {
    type: 'RIGHT',
    title: 'Passenger-Side Full Profile',
    description: 'Right passenger flank showing privacy tint and executive styling',
    fallbackUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
  },
  {
    type: 'INTERIOR',
    title: 'Executive Cabin & Rear Lounge',
    description: 'Pristine rear cabin featuring executive legroom, dual screens & ambient lighting',
    fallbackUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
  },
  {
    type: 'LICENSE_PLATE',
    title: 'Official TLC Livery Plate Close-Up',
    description: 'Macro photo of official NY Livery Diamond plate and registration sticker',
    fallbackUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
  },
];

const DOC_TYPE_LABELS = {
  INSURANCE: 'Commercial Auto Liability Insurance ($1.5M+)',
  REGISTRATION: 'NYS DMV Livery Vehicle Registration',
  INSPECTION_CERTIFICATE: 'TLC Safety & Emissions Inspection Certificate',
  COMMERCIAL_LICENSE: 'NYC TLC Vehicle Base Authority / Diamond Decal',
  OTHER: 'Other Vehicle Certification',
};

export default function Vehicle() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'specs', 'documents', 'photos', 'status'
  const [editingSpecs, setEditingSpecs] = useState(false);
  const [uploadDocModalOpen, setUploadDocModalOpen] = useState(false);
  const [photoPreviewModal, setPhotoPreviewModal] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1. Vehicle Specs State
  const [vehicle, setVehicle] = useState(null);
  const [specsForm, setSpecsForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: 'Black',
    registrationNumber: '',
    vinNumber: '',
    category: 'LUXURY',
    passengerCapacity: 3,
    luggageCapacity: 3,
  });

  // 2. Vehicle Documents State
  const [vehicleDocs, setVehicleDocs] = useState([]);

  // 3. Vehicle 6-Angle Photos State
  const [vehiclePhotos, setVehiclePhotos] = useState([]);

  // 4. Approval Audit Log
  const [approvalAuditLog, setApprovalAuditLog] = useState([]);

  // New Doc Form
  const [newDocForm, setNewDocForm] = useState({
    documentType: 'INSURANCE',
    documentNumber: '',
    fileUrl: '',
    issueDate: '',
    expiryDate: '',
  });

  const showToast = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 4500);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [vehRes, docsRes, photosRes, verifRes] = await Promise.allSettled([
        getDriverVehicle(),
        getVehicleDocuments(),
        getVehiclePhotos(),
        getDriverVerification(),
      ]);

      if (vehRes.status === 'fulfilled' && vehRes.value) {
        setVehicle(vehRes.value);
        setSpecsForm({
          make: vehRes.value.make || '',
          model: vehRes.value.model || '',
          year: vehRes.value.year || new Date().getFullYear(),
          color: vehRes.value.color || '',
          registrationNumber: vehRes.value.registrationNumber || '',
          vinNumber: vehRes.value.vinNumber || '',
          category: vehRes.value.category || 'LUXURY',
          passengerCapacity: vehRes.value.passengerCapacity || 3,
          luggageCapacity: vehRes.value.luggageCapacity || 3,
        });
      } else {
        setVehicle(null);
      }

      if (docsRes.status === 'fulfilled' && Array.isArray(docsRes.value)) {
        setVehicleDocs(docsRes.value);
      }

      if (photosRes.status === 'fulfilled' && Array.isArray(photosRes.value)) {
        setVehiclePhotos(photosRes.value);
      }

      if (verifRes.status === 'fulfilled' && verifRes.value?.auditLogs) {
        setApprovalAuditLog(verifRes.value.auditLogs);
      }
    } catch (err) {
      console.error('Error loading vehicle details:', err);
      showToast('error', 'Failed to load vehicle data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveSpecs = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (vehicle) {
        const res = await updateDriverVehicle(specsForm);
        if (res?.vehicle) {
          setVehicle(res.vehicle);
        }
        showToast('success', res?.message || 'Vehicle specifications updated successfully.');
      } else {
        const res = await registerVehicle(specsForm);
        if (res?.vehicle) {
          setVehicle(res.vehicle);
        }
        showToast('success', res?.message || 'Vehicle registered successfully with PENDING status.');
      }
      setEditingSpecs(false);
      await loadAllData();
    } catch (err) {
      showToast('error', err.message || 'Failed to save vehicle specifications.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadDoc = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await uploadVehicleDocument(newDocForm);
      showToast('success', res?.message || 'Vehicle document submitted for compliance audit review.');
      setUploadDocModalOpen(false);
      setNewDocForm({
        documentType: 'INSURANCE',
        documentNumber: '',
        fileUrl: '',
        issueDate: '',
        expiryDate: '',
      });
      const updatedDocs = await getVehicleDocuments();
      if (Array.isArray(updatedDocs)) setVehicleDocs(updatedDocs);
    } catch (err) {
      showToast('error', err.message || 'Failed to upload vehicle document.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoUploadDirect = async (photoType, imageUrl) => {
    try {
      const res = await uploadVehiclePhoto({ photoType, imageUrl });
      showToast('success', res?.message || `Vehicle ${photoType} photo uploaded successfully.`);
      const updatedPhotos = await getVehiclePhotos();
      if (Array.isArray(updatedPhotos)) setVehiclePhotos(updatedPhotos);
    } catch (err) {
      showToast('error', err.message || 'Failed to update photo.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>APPROVED</span>
          </span>
        );
      case 'PENDING':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>PENDING REVIEW</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>REJECTED</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-neutral-500/20 text-neutral-300 text-xs font-bold">
            {status || 'PENDING'}
          </span>
        );
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      {notification.show && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between gap-3 border shadow-2xl animate-in slide-in-from-top-3 ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="font-semibold">{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification({ show: false, type: '', message: '' })}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Approval Status Banner */}
      <div className="bg-gradient-to-r from-[#0E1722] via-[#121E2E] to-[#172538] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-[#e09900]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider">
              <Car className="w-3.5 h-3.5" />
              <span>Executive Vehicle Hub</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Executive Vehicle Registration'}
              </h1>
              {vehicle?.category && (
                <span className="px-3 py-1 rounded-full bg-[#e09900]/20 text-[#e09900] border border-[#e09900]/40 text-xs font-mono font-bold">
                  {vehicle.category} CLASS
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Complete vehicle management: technical specifications, commercial liability insurance & TLC permits, 6-angle inspection photos, and live dispatch compliance status.
            </p>
          </div>

          {/* Vehicle Approval Status Chip */}
          <div className="bg-black/60 border border-white/15 rounded-2xl p-5 shrink-0 space-y-3 min-w-[240px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Approval Status
              </span>
              {vehicle ? getStatusBadge(vehicle.status) : (
                <span className="px-3 py-1 rounded-full bg-neutral-500/20 text-neutral-300 text-xs font-bold">
                  NOT REGISTERED
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Plate:</span>
                <span className="font-mono font-bold text-[#e09900]">
                  {vehicle?.registrationNumber || 'None'}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Compliance:</span>
                <span className={`font-semibold flex items-center gap-1 ${vehicle?.status === 'APPROVED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {vehicle?.status === 'APPROVED' ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {vehicle?.status === 'APPROVED' ? '100% Ready' : 'Review Required'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        {[
          { id: 'all', label: 'All-in-One Overview', icon: <Layers className="w-4 h-4" /> },
          { id: 'specs', label: 'Vehicle Details & Specs', icon: <Car className="w-4 h-4" /> },
          { id: 'documents', label: 'Vehicle Compliance Docs', icon: <FileCode className="w-4 h-4" />, count: vehicleDocs.length },
          { id: 'photos', label: '6-Angle Inspection Photos', icon: <Camera className="w-4 h-4" />, count: vehiclePhotos.length },
          { id: 'status', label: 'Approval Status & Audit Log', icon: <ShieldCheck className="w-4 h-4" />, count: approvalAuditLog.length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-[#e09900] text-black shadow-lg shadow-[#e09900]/20'
                  : 'bg-[#0E1722] text-neutral-300 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ALL-IN-ONE OVERVIEW & SPECS */}
      {(activeTab === 'all' || activeTab === 'specs') && (
        <div className="space-y-6">
          <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#e09900]" />
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Vehicle Specifications & Details
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  1:1 Primary chauffeur vehicle registered with NYC TLC & dispatch network.
                </p>
              </div>

              {vehicle && (
                <button
                  type="button"
                  onClick={() => setEditingSpecs(!editingSpecs)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition flex items-center gap-2 shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#e09900]" />
                  <span>{editingSpecs ? 'Close Form' : 'Edit Specs'}</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#e09900]" />
                <span>Loading vehicle details from server...</span>
              </div>
            ) : !vehicle ? (
              /* Empty state: No vehicle registered yet */
              <div className="py-8 px-6 rounded-2xl bg-black/30 border border-dashed border-white/15 text-center space-y-4">
                <Car className="w-12 h-12 text-[#e09900] mx-auto opacity-80" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">No Vehicle Registered Yet</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Please register your primary luxury vehicle to start receiving executive ride dispatches.
                  </p>
                </div>

                <form onSubmit={handleSaveSpecs} className="max-w-xl mx-auto text-left space-y-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Make</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mercedes-Benz"
                        value={specsForm.make}
                        onChange={(e) => setSpecsForm({ ...specsForm, make: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Model</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S-Class S 580"
                        value={specsForm.model}
                        onChange={(e) => setSpecsForm({ ...specsForm, model: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Year</label>
                      <input
                        type="number"
                        required
                        min={2018}
                        max={2027}
                        value={specsForm.year}
                        onChange={(e) => setSpecsForm({ ...specsForm, year: Number(e.target.value) })}
                        className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Color</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Obsidian Black"
                        value={specsForm.color}
                        onChange={(e) => setSpecsForm({ ...specsForm, color: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">License Plate</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NY-CHAUFF-88"
                        value={specsForm.registrationNumber}
                        onChange={(e) => setSpecsForm({ ...specsForm, registrationNumber: e.target.value.toUpperCase() })}
                        className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white font-mono uppercase outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                      <select
                        value={specsForm.category}
                        onChange={(e) => setSpecsForm({ ...specsForm, category: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                      >
                        <option value="LUXURY">LUXURY (S-Class, 7-Series)</option>
                        <option value="EXECUTIVE">EXECUTIVE (E-Class, 5-Series)</option>
                        <option value="SUV">SUV (Escalade, Suburban)</option>
                        <option value="VAN">SPRINTER / EXECUTIVE</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-right pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
                    >
                      {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Register Vehicle</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Vehicle Details Grid */
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">License Plate</span>
                    <div className="text-sm font-mono font-bold text-[#e09900] truncate">
                      {vehicle.registrationNumber}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">VIN Number</span>
                    <div className="text-xs font-mono font-bold text-white truncate" title={vehicle.vinNumber || 'N/A'}>
                      {vehicle.vinNumber || 'Not Specified'}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">Exterior Color</span>
                    <div className="text-xs font-semibold text-white truncate">{vehicle.color}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">Passenger Cap</span>
                    <div className="text-sm font-bold text-white">{vehicle.passengerCapacity} Guests</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">Luggage Cap</span>
                    <div className="text-sm font-bold text-white">{vehicle.luggageCapacity} Bags</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500">Class Tier</span>
                    <div className="text-xs font-bold text-amber-400">{vehicle.category} VIP</div>
                  </div>
                </div>

                {/* Inline Specs Edit Form */}
                {editingSpecs && (
                  <form
                    onSubmit={handleSaveSpecs}
                    className="p-6 rounded-3xl bg-black/60 border border-[#e09900]/40 space-y-5 animate-in fade-in"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-serif text-base font-bold text-white">
                        Modify Registered Vehicle Specifications
                      </h3>
                      <span className="text-[11px] text-neutral-400">
                        Changes require standard compliance re-check
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Make</label>
                        <input
                          type="text"
                          required
                          value={specsForm.make}
                          onChange={(e) => setSpecsForm({ ...specsForm, make: e.target.value })}
                          className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Model</label>
                        <input
                          type="text"
                          required
                          value={specsForm.model}
                          onChange={(e) => setSpecsForm({ ...specsForm, model: e.target.value })}
                          className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Model Year</label>
                        <input
                          type="number"
                          required
                          min={2018}
                          max={2027}
                          value={specsForm.year}
                          onChange={(e) => setSpecsForm({ ...specsForm, year: Number(e.target.value) })}
                          className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">License Plate</label>
                        <input
                          type="text"
                          required
                          value={specsForm.registrationNumber}
                          onChange={(e) => setSpecsForm({ ...specsForm, registrationNumber: e.target.value.toUpperCase() })}
                          className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">VIN Number</label>
                        <input
                          type="text"
                          value={specsForm.vinNumber}
                          onChange={(e) => setSpecsForm({ ...specsForm, vinNumber: e.target.value.toUpperCase() })}
                          className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Service Category</label>
                        <select
                          value={specsForm.category}
                          onChange={(e) => setSpecsForm({ ...specsForm, category: e.target.value })}
                          className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                        >
                          <option value="LUXURY">LUXURY (e.g. S-Class, 7-Series)</option>
                          <option value="EXECUTIVE">EXECUTIVE (e.g. E-Class, 5-Series)</option>
                          <option value="SUV">SUV (e.g. Escalade, Suburban)</option>
                          <option value="VAN">SPRINTER / EXECUTIVE</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingSpecs(false)}
                        className="px-5 py-2 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
                      >
                        {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        <span>Save Specifications</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: VEHICLE DOCUMENTS */}
      {(activeTab === 'all' || activeTab === 'documents') && (
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#e09900]" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Vehicle Compliance & Insurance Documents
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Maintain active commercial liability insurance, livery registrations, and inspection records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!vehicle) {
                  showToast('error', 'Please register your vehicle before uploading vehicle documents.');
                  return;
                }
                setUploadDocModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Vehicle Doc</span>
            </button>
          </div>

          {vehicleDocs.length === 0 ? (
            <div className="py-10 px-6 rounded-2xl bg-black/30 border border-dashed border-white/15 text-center space-y-3">
              <FileCode className="w-10 h-10 text-neutral-600 mx-auto" />
              <div className="text-sm font-bold text-white">No Vehicle Documents Uploaded</div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Upload your commercial auto liability insurance ($1.5M+ limit), TLC inspection certificate, and NYS livery registration.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (!vehicle) {
                    showToast('error', 'Please register your vehicle first.');
                    return;
                  }
                  setUploadDocModalOpen(true);
                }}
                className="mt-2 px-5 py-2 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Upload First Vehicle Doc</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {vehicleDocs.map((doc) => {
                const docTitle = DOC_TYPE_LABELS[doc.documentType] || doc.documentType?.replace(/_/g, ' ');
                return (
                  <div
                    key={doc.id}
                    className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 hover:border-[#e09900]/30 transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-mono text-[#e09900] uppercase font-bold tracking-wider">
                            {doc.documentType}
                          </span>
                          <h3 className="font-serif text-base font-bold text-white mt-0.5">{docTitle}</h3>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-neutral-300">
                          <span className="text-neutral-500">Document / Policy #:</span>
                          <span className="font-mono font-bold text-white">{doc.documentNumber || 'N/A'}</span>
                        </div>
                        {doc.expiryDate && (
                          <div className="flex items-center justify-between text-neutral-300">
                            <span className="text-neutral-500">Valid Until:</span>
                            <span className="font-semibold text-emerald-400">{doc.expiryDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      {doc.fileUrl ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#e09900] hover:underline flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </a>
                      ) : (
                        <span className="text-xs text-neutral-500">No file attached</span>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setNewDocForm({
                            documentType: doc.documentType,
                            documentNumber: doc.documentNumber || '',
                            fileUrl: doc.fileUrl || '',
                            issueDate: doc.issueDate || '',
                            expiryDate: doc.expiryDate || '',
                          });
                          setUploadDocModalOpen(true);
                        }}
                        className="text-xs text-neutral-400 hover:text-white"
                      >
                        Submit Renewal
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VEHICLE 6-ANGLE PHOTOS */}
      {(activeTab === 'all' || activeTab === 'photos') && (
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#e09900]" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Vehicle 6-Angle Inspection Photos
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Verified high-resolution exterior and executive interior imagery.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold font-mono">
                {vehiclePhotos.length} of 6 Angles Uploaded
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTO_SLOTS.map((slot, index) => {
              const uploadedPhoto = vehiclePhotos.find((p) => p.photoType === slot.type);
              const imgUrl = uploadedPhoto?.imageUrl || slot.fallbackUrl;

              return (
                <div
                  key={slot.type}
                  className="rounded-3xl bg-black/40 border border-white/10 overflow-hidden space-y-3 hover:border-[#e09900]/40 transition flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-black overflow-hidden group">
                    <img
                      src={imgUrl}
                      alt={slot.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(uploadedPhoto?.status || 'PENDING')}
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 text-[#e09900] text-[10px] font-mono font-bold uppercase">
                        Angle 0{index + 1} • {slot.type}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xs font-bold text-white truncate">{slot.title}</h3>
                      <p className="text-[10px] text-neutral-300 line-clamp-1">{slot.description}</p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (!vehicle) {
                          showToast('error', 'Please register your vehicle first.');
                          return;
                        }
                        const url = prompt(`Enter high-res photo URL for ${slot.title}:`, imgUrl);
                        if (url) {
                          handlePhotoUploadDirect(slot.type, url);
                        }
                      }}
                      className="text-xs font-bold text-[#e09900] hover:underline flex items-center gap-1.5"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{uploadedPhoto ? 'Update Photo' : 'Upload Photo'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPhotoPreviewModal({ title: slot.title, url: imgUrl, status: uploadedPhoto?.status || 'PENDING' })}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Expand</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: APPROVAL STATUS & AUDIT LOG */}
      {(activeTab === 'all' || activeTab === 'status') && (
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <ShieldCheck className="w-5 h-5 text-[#e09900]" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Vehicle Approval Status & Audit Trail
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Official compliance ledger verified by NYC TLC dispatch administrators.
              </p>
            </div>
          </div>

          {approvalAuditLog.length === 0 ? (
            <div className="p-8 rounded-2xl bg-black/20 border border-white/5 text-center text-xs text-neutral-400">
              No audit records logged yet. Vehicle inspections and approvals will appear here in chronological order.
            </div>
          ) : (
            <div className="space-y-4">
              {approvalAuditLog.map((log) => (
                <div
                  key={log.id}
                  className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2 hover:border-white/15 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-sm font-bold text-white">
                        {log.entityType?.replace(/_/g, ' ')} Verification Action
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : 'Recent'}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-300">
                    Status transition:{' '}
                    <span className="text-neutral-400 font-mono">{log.oldStatus || 'NONE'}</span> →{' '}
                    <span className="text-emerald-400 font-bold font-mono">{log.newStatus}</span>
                  </div>

                  {log.reason && (
                    <div className="text-xs text-neutral-400 italic bg-white/5 p-2.5 rounded-xl">
                      "{log.reason}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload Doc Modal */}
      {uploadDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1722] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#e09900]" />
                <span>Upload Vehicle Compliance Document</span>
              </h3>
              <button
                type="button"
                onClick={() => setUploadDocModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDoc} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Document Type
                </label>
                <select
                  value={newDocForm.documentType}
                  onChange={(e) => setNewDocForm({ ...newDocForm, documentType: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                >
                  <option value="INSURANCE">Commercial Auto Liability Insurance</option>
                  <option value="REGISTRATION">DMV Registration / Livery Plates</option>
                  <option value="INSPECTION_CERTIFICATE">TLC / State Inspection Certificate</option>
                  <option value="COMMERCIAL_LICENSE">TLC Diamond / Livery Base License</option>
                  <option value="OTHER">Other Vehicle Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Policy or Document Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. POL-COMM-994012A"
                  value={newDocForm.documentNumber}
                  onChange={(e) => setNewDocForm({ ...newDocForm, documentNumber: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={newDocForm.issueDate}
                    onChange={(e) => setNewDocForm({ ...newDocForm, issueDate: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newDocForm.expiryDate}
                    onChange={(e) => setNewDocForm({ ...newDocForm, expiryDate: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Document File URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or uploaded link"
                  value={newDocForm.fileUrl}
                  onChange={(e) => setNewDocForm({ ...newDocForm, fileUrl: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setUploadDocModalOpen(false)}
                  className="px-5 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs shadow-lg shadow-[#e09900]/20 flex items-center gap-2"
                >
                  {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Submit For Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {photoPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-[#0E1722] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{photoPreviewModal.title}</h3>
              <button
                type="button"
                onClick={() => setPhotoPreviewModal(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={photoPreviewModal.url}
                alt={photoPreviewModal.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

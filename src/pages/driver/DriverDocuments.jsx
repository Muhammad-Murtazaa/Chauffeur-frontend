import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Plus,
  UploadCloud,
  X,
  History,
  Layers,
  Sparkles,
  Check,
  Download,
  AlertTriangle,
  UserCheck,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import {
  getDriverDocuments,
  uploadDriverDocument,
  deleteDriverDocument,
  getDriverVerification,
} from '../../api/driver';

const DOC_TYPE_LABELS = {
  DRIVING_LICENSE: 'TLC / Commercial Driver License (CDL / Class E)',
  IDENTITY_DOCUMENT: 'US Passport / REAL ID Card',
  BACKGROUND_CHECK: 'TLC Criminal & MVR Background Clearance Certificate',
  WORK_PERMIT: 'Work Authorization / US Citizenship Status',
  OTHER: 'Other Chauffeur Compliance Certification',
};

export default function DriverDocuments() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'docs', 'checklist', 'audit'
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewDocModal, setPreviewDocModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // 1. Live Driver Legal Documents
  const [docs, setDocs] = useState([]);

  // 2. Verification Data (Vehicle, Driver, Audit Logs)
  const [verificationData, setVerificationData] = useState({
    driver: null,
    vehicle: null,
    driverDocuments: [],
    auditLogs: [],
  });

  // New Doc Form
  const [newDoc, setNewDoc] = useState({
    documentType: 'DRIVING_LICENSE',
    documentNumber: '',
    frontImageUrl: '',
    issueDate: '',
    expiryDate: '',
  });

  const showToast = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 4500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [docsRes, verifRes] = await Promise.allSettled([
        getDriverDocuments(),
        getDriverVerification(),
      ]);

      if (docsRes.status === 'fulfilled' && Array.isArray(docsRes.value)) {
        setDocs(docsRes.value);
      }

      if (verifRes.status === 'fulfilled' && verifRes.value) {
        setVerificationData(verifRes.value);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
      showToast('error', 'Failed to load document records from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await uploadDriverDocument(newDoc);
      showToast('success', res?.message || 'Driver document submitted for compliance audit review.');
      setUploadModalOpen(false);
      setNewDoc({
        documentType: 'DRIVING_LICENSE',
        documentNumber: '',
        frontImageUrl: '',
        issueDate: '',
        expiryDate: '',
      });
      await loadData();
    } catch (err) {
      showToast('error', err.message || 'Failed to upload document.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to remove this document?')) return;
    try {
      const res = await deleteDriverDocument(docId);
      showToast('success', res?.message || 'Document removed successfully.');
      setDocs((prev) => prev.filter((d) => d.id !== docId));
    } catch (err) {
      showToast('error', err.message || 'Failed to delete document.');
    }
  };

  // Build Dynamic Compliance Checklist
  const hasDrivingLicense = docs.find((d) => d.documentType === 'DRIVING_LICENSE');
  const hasIdentity = docs.find((d) => d.documentType === 'IDENTITY_DOCUMENT');
  const hasBackground = docs.find((d) => d.documentType === 'BACKGROUND_CHECK');
  const hasWorkPermit = docs.find((d) => d.documentType === 'WORK_PERMIT');
  const hasVehicle = !!verificationData.vehicle;
  const vehicleStatus = verificationData.vehicle?.status;
  const vehicleDocsCount = verificationData.vehicle?.documents?.length || 0;
  const vehiclePhotosCount = verificationData.vehicle?.photos?.length || 0;

  const complianceChecklist = [
    {
      label: 'Chauffeur Account & Identity',
      status: hasIdentity
        ? hasIdentity.status === 'APPROVED'
          ? 'VERIFIED & APPROVED'
          : `STATUS: ${hasIdentity.status}`
        : 'ACTION REQUIRED (Upload ID)',
      ok: hasIdentity?.status === 'APPROVED',
      details: hasIdentity
        ? `Doc #${hasIdentity.documentNumber || 'Registered'} (Exp: ${hasIdentity.expiryDate || 'N/A'})`
        : 'Government ID / US Passport required',
    },
    {
      label: 'TLC / Commercial Driver License',
      status: hasDrivingLicense
        ? hasDrivingLicense.status === 'APPROVED'
          ? 'VALID & APPROVED'
          : `STATUS: ${hasDrivingLicense.status}`
        : 'ACTION REQUIRED (Upload TLC/CDL)',
      ok: hasDrivingLicense?.status === 'APPROVED',
      details: hasDrivingLicense
        ? `License #${hasDrivingLicense.documentNumber || 'Registered'} (Exp: ${hasDrivingLicense.expiryDate || 'N/A'})`
        : 'Valid TLC / CDL Class E license required',
    },
    {
      label: 'Criminal & MVR Background Check',
      status: hasBackground
        ? hasBackground.status === 'APPROVED'
          ? 'CLEARED & APPROVED'
          : `STATUS: ${hasBackground.status}`
        : 'ACTION REQUIRED (Upload Clearance)',
      ok: hasBackground?.status === 'APPROVED',
      details: hasBackground
        ? `Clearance #${hasBackground.documentNumber || 'Registered'}`
        : 'Background clearance certificate required',
    },
    {
      label: 'Work Authorization / Legal Status',
      status: hasWorkPermit
        ? hasWorkPermit.status === 'APPROVED'
          ? 'VERIFIED'
          : `STATUS: ${hasWorkPermit.status}`
        : 'ACTION REQUIRED (Upload Record)',
      ok: hasWorkPermit?.status === 'APPROVED',
      details: hasWorkPermit
        ? `Permit #${hasWorkPermit.documentNumber || 'Registered'}`
        : 'US work permit or citizenship verification',
    },
    {
      label: 'Primary Vehicle Compliance',
      status: hasVehicle
        ? vehicleStatus === 'APPROVED'
          ? 'FULLY COMPLIANT'
          : `STATUS: ${vehicleStatus}`
        : 'NOT REGISTERED',
      ok: hasVehicle && vehicleStatus === 'APPROVED',
      details: hasVehicle
        ? `${verificationData.vehicle.year} ${verificationData.vehicle.make} ${verificationData.vehicle.model} (${verificationData.vehicle.registrationNumber})`
        : 'Register your 1:1 vehicle in the Vehicle hub',
    },
    {
      label: 'Commercial Vehicle Documents',
      status: vehicleDocsCount > 0 ? `${vehicleDocsCount} DOCUMENT(S) ATTACHED` : 'ACTION REQUIRED',
      ok: vehicleDocsCount > 0,
      details: vehicleDocsCount > 0
        ? 'Commercial insurance and registration certificates on file'
        : 'Commercial auto liability insurance required',
    },
    {
      label: 'Vehicle 6-Angle Photo Inspection',
      status: vehiclePhotosCount >= 6 ? 'APPROVED (6/6)' : `${vehiclePhotosCount} of 6 Uploaded`,
      ok: vehiclePhotosCount >= 6,
      details: vehiclePhotosCount >= 6
        ? 'All 6 exterior and interior angles inspected'
        : 'Upload 6 photos in the Vehicle hub for inspection',
    },
  ];

  const approvedCount = complianceChecklist.filter((c) => c.ok).length;
  const isFullyAuthorized = approvedCount === complianceChecklist.length;

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

      {/* Header Banner with Integrated Verification Status */}
      <div className="bg-gradient-to-r from-[#0E1722] via-[#121E2E] to-[#172538] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliance & Verification Hub</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Driver Documents & Verification Status
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Upload, renew, and track your chauffeur credentials, TLC certifications, background clearance, and real-time dispatch audit authorization status.
            </p>
          </div>

          {/* Verification Status KPI Block */}
          <div className="bg-black/60 border border-emerald-500/30 rounded-2xl p-5 shrink-0 space-y-3 min-w-[260px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Overall Clearance
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                  isFullyAuthorized
                    ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {isFullyAuthorized ? '100% AUTHORIZED' : `${approvedCount} OF 7 READY`}
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Dispatch Status:</span>
                <span className={`font-semibold flex items-center gap-1 ${isFullyAuthorized ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isFullyAuthorized ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {isFullyAuthorized ? 'Active & Eligible' : 'Compliance Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Legal Documents:</span>
                <span className="font-mono font-bold text-white">
                  {docs.filter((d) => d.status === 'APPROVED').length} of {docs.length} Approved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        {[
          { id: 'all', label: 'All Documents & Status', icon: <Layers className="w-4 h-4" /> },
          { id: 'docs', label: 'Driver Legal Documents', icon: <FileText className="w-4 h-4" />, count: docs.length },
          { id: 'checklist', label: 'Compliance Checklist', icon: <CheckCircle2 className="w-4 h-4" />, count: complianceChecklist.length },
          { id: 'audit', label: 'Audit History Trail', icon: <History className="w-4 h-4" />, count: verificationData.auditLogs?.length || 0 },
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

      {/* TAB: DRIVER DOCUMENTS SECTION */}
      {(activeTab === 'all' || activeTab === 'docs') && (
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#e09900]" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Driver Legal Credentials & Certificates
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Official chauffeur licensing, TLC credentials, background checks, and identity records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#e09900]" />
              <span>Loading documents from server...</span>
            </div>
          ) : docs.length === 0 ? (
            <div className="py-12 px-6 rounded-2xl bg-black/30 border border-dashed border-white/15 text-center space-y-3">
              <FileText className="w-10 h-10 text-neutral-600 mx-auto" />
              <div className="text-sm font-bold text-white">No Compliance Documents Uploaded Yet</div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Upload your TLC / Commercial Driver License, government ID, and background clearance certificate to get verified for luxury ride dispatches.
              </p>
              <button
                type="button"
                onClick={() => setUploadModalOpen(true)}
                className="mt-2 px-5 py-2 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Upload First Document</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {docs.map((doc) => {
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
                          <span className="text-neutral-500">Document / ID #:</span>
                          <span className="font-mono font-bold text-white">{doc.documentNumber || 'N/A'}</span>
                        </div>
                        {doc.issueDate && (
                          <div className="flex items-center justify-between text-neutral-300">
                            <span className="text-neutral-500">Issue Date:</span>
                            <span className="font-semibold text-neutral-300">{doc.issueDate}</span>
                          </div>
                        )}
                        {doc.expiryDate && (
                          <div className="flex items-center justify-between text-neutral-300">
                            <span className="text-neutral-500">Valid Until:</span>
                            <span className="font-semibold text-emerald-400">{doc.expiryDate}</span>
                          </div>
                        )}
                      </div>

                      {doc.rejectionReason && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                          <strong>Rejection Reason:</strong> {doc.rejectionReason}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      {doc.frontImageUrl ? (
                        <button
                          type="button"
                          onClick={() => setPreviewDocModal({ ...doc, title: docTitle })}
                          className="text-xs font-bold text-[#e09900] hover:underline flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Attachment</span>
                        </button>
                      ) : (
                        <span className="text-xs text-neutral-500">No preview scan</span>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDelete(doc.id)}
                          className="text-xs text-neutral-500 hover:text-rose-400 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewDoc({
                              documentType: doc.documentType,
                              documentNumber: doc.documentNumber || '',
                              frontImageUrl: doc.frontImageUrl || '',
                              issueDate: doc.issueDate || '',
                              expiryDate: doc.expiryDate || '',
                            });
                            setUploadModalOpen(true);
                          }}
                          className="text-xs text-neutral-400 hover:text-white"
                        >
                          Submit Renewal
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: COMPLIANCE CHECKLIST & DISPATCH VERIFICATION */}
      {(activeTab === 'all' || activeTab === 'checklist') && (
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Compliance Requirements & Verification Status
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                All 7 mandatory standards for NYC Premier Chauffeur VIP ride dispatch eligibility.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold font-mono">
              {approvedCount} of 7 Compliant
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {complianceChecklist.map((item, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-3 rounded-xl transition"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1 rounded-full mt-0.5 ${
                      item.ok
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {item.ok ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{item.label}</h3>
                    <p className="text-[11px] text-neutral-400">{item.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                      item.ok
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: AUDIT HISTORY LOG */}
      {(activeTab === 'all' || activeTab === 'audit') && (
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <History className="w-5 h-5 text-[#e09900]" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Compliance Verification Audit Trail
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Permanent chronological history of document inspections and authorization approvals.
              </p>
            </div>
          </div>

          {!verificationData.auditLogs || verificationData.auditLogs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-black/20 border border-white/5 text-center text-xs text-neutral-400">
              No audit records logged yet. Document changes and verifications will appear here in chronological order.
            </div>
          ) : (
            <div className="space-y-4">
              {verificationData.auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2 hover:border-white/15 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-sm font-bold text-white">
                        {log.entityType?.replace(/_/g, ' ')} Audit Action
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

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1722] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#e09900]" />
                <span>Upload Driver Compliance Document</span>
              </h3>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Document Type
                </label>
                <select
                  value={newDoc.documentType}
                  onChange={(e) => setNewDoc({ ...newDoc, documentType: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                >
                  <option value="DRIVING_LICENSE">TLC / Commercial Driver License (CDL / Class E)</option>
                  <option value="IDENTITY_DOCUMENT">US Passport / Real ID Card</option>
                  <option value="BACKGROUND_CHECK">TLC Criminal & MVR Background Certificate</option>
                  <option value="WORK_PERMIT">Work Authorization / E-Verify Record</option>
                  <option value="OTHER">Other Chauffeur Compliance Certification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Document / License #
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TLC-984021"
                  value={newDoc.documentNumber}
                  onChange={(e) => setNewDoc({ ...newDoc, documentNumber: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={newDoc.issueDate}
                    onChange={(e) => setNewDoc({ ...newDoc, issueDate: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newDoc.expiryDate}
                    onChange={(e) => setNewDoc({ ...newDoc, expiryDate: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Document Scan URL (or Image Link)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or uploaded link"
                  value={newDoc.frontImageUrl}
                  onChange={(e) => setNewDoc({ ...newDoc, frontImageUrl: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-5 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs shadow-lg shadow-[#e09900]/20 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit For Verification</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#0E1722] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{previewDocModal.title}</h3>
                <span className="text-xs text-neutral-400 font-mono">
                  Doc #: {previewDocModal.documentNumber || 'N/A'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDocModal(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-[4/3] bg-black flex items-center justify-center">
              {previewDocModal.frontImageUrl ? (
                <img
                  src={previewDocModal.frontImageUrl}
                  alt={previewDocModal.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-neutral-500 text-xs">No scan image available</div>
              )}
            </div>
            <div className="p-4 bg-black/40 flex items-center justify-between text-xs text-neutral-400">
              <span>
                Valid Until: <strong className="text-emerald-400">{previewDocModal.expiryDate || 'N/A'}</strong>
              </span>
              {getStatusBadge(previewDocModal.status)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

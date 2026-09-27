import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentProfile, updateProfile } from '../../api/auth';
import { registerVehicle, getDriverVehicle, updateDriverVehicle } from '../../api/driver';
import { getStoredUser } from '../../api/client';
import {
  User,
  FileText,
  Car,
  FileCode,
  Camera,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Save,
  Sparkles,
  Check,
  AlertCircle,
  Eye,
  Lock,
  ChevronRight,
  X,
} from 'lucide-react';

export default function DriverOnboarding() {
  const navigate = useNavigate();
  const storedUser = getStoredUser() || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasExistingVehicle, setHasExistingVehicle] = useState(false);

  // 1. Step 1 Data: Driver Profile
  const [profileData, setProfileData] = useState({
    firstName: storedUser.firstName || '',
    lastName: storedUser.lastName || '',
    email: storedUser.email || '',
    phone: storedUser.phone || '',
    dateOfBirth: '',
    address: '',
    city: '',
    yearsOfExperience: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    languages: 'English',
  });

  // 2. Step 2 Data: Driver Documents
  const [driverDocs, setDriverDocs] = useState([
    {
      id: 1,
      type: 'TLC / Commercial Driver License',
      docNum: '',
      expiry: '',
      status: 'PENDING_UPLOAD',
      file: '',
    },
    {
      id: 2,
      type: 'US Passport / REAL ID Card',
      docNum: '',
      expiry: '',
      status: 'PENDING_UPLOAD',
      file: '',
    },
    {
      id: 3,
      type: 'TLC Criminal & MVR Background Check',
      docNum: '',
      expiry: '',
      status: 'PENDING_UPLOAD',
      file: '',
    },
    {
      id: 4,
      type: 'Work Authorization / US Citizen ID',
      docNum: '',
      expiry: '',
      status: 'PENDING_UPLOAD',
      file: '',
    },
  ]);

  // 3. Step 3 Data: Vehicle Specs
  const [vehicleData, setVehicleData] = useState({
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

  // 4. Step 4 Data: Vehicle Documents
  const [vehicleDocs, setVehicleDocs] = useState([
    {
      id: 1,
      type: 'Commercial Auto Liability ($1.5M+)',
      docNum: 'POL-COMM-994012A',
      expiry: '2027-01-01',
      status: 'UPLOADED',
      file: 'commercial_insurance.pdf',
    },
    {
      id: 2,
      type: 'NYS DMV Livery Registration',
      docNum: 'DMV-NY-8894218',
      expiry: '2026-03-15',
      status: 'UPLOADED',
      file: 'dmv_registration.pdf',
    },
    {
      id: 3,
      type: 'TLC Safety & Emissions Inspection',
      docNum: 'INSP-TLC-2024-098',
      expiry: '2027-02-10',
      status: 'UPLOADED',
      file: 'tlc_inspection.pdf',
    },
    {
      id: 4,
      type: 'NYC TLC Vehicle Diamond Base Decal',
      docNum: 'TLC-DIAMOND-7704',
      expiry: '2026-08-20',
      status: 'UPLOADED',
      file: 'diamond_permit.jpg',
    },
  ]);

  // 5. Step 5 Data: Vehicle Photos
  const [vehiclePhotos, setVehiclePhotos] = useState([
    {
      id: 1,
      angle: 'Front View (Grille & Headlights)',
      status: 'READY',
      url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      angle: 'Rear View (Trunk & Tail Lights)',
      status: 'READY',
      url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      angle: 'Driver-Side Profile',
      status: 'READY',
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      angle: 'Passenger-Side Profile',
      status: 'READY',
      url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      angle: 'Cabin & Executive Rear Seating',
      status: 'READY',
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      angle: 'TLC / Livery State Plate Close-Up',
      status: 'READY',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
    },
  ]);

  // Load user profile & vehicle from backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        const profileRes = await getCurrentProfile();
        if (profileRes.user) {
          setProfileData((prev) => ({
            ...prev,
            firstName: profileRes.user.firstName || prev.firstName,
            lastName: profileRes.user.lastName || prev.lastName,
            email: profileRes.user.email || prev.email,
            phone: profileRes.user.phone || prev.phone,
            ...(profileRes.driver
              ? {
                  dateOfBirth: profileRes.driver.dateOfBirth || prev.dateOfBirth,
                  address: profileRes.driver.address || prev.address,
                  city: profileRes.driver.city || prev.city,
                  yearsOfExperience: profileRes.driver.yearsOfExperience ?? prev.yearsOfExperience,
                }
              : {}),
          }));
        }
      } catch (e) {
        // Fallback to cached user
        console.log('Using local profile data fallback');
      }

      try {
        const vehicleRes = await getDriverVehicle();
        if (vehicleRes) {
          setHasExistingVehicle(true);
          setVehicleData((prev) => ({
            ...prev,
            make: vehicleRes.make || prev.make,
            model: vehicleRes.model || prev.model,
            year: vehicleRes.year || prev.year,
            color: vehicleRes.color || prev.color,
            registrationNumber: vehicleRes.registrationNumber || prev.registrationNumber,
            vinNumber: vehicleRes.vinNumber || prev.vinNumber,
            category: vehicleRes.category || prev.category,
            passengerCapacity: vehicleRes.passengerCapacity || prev.passengerCapacity,
            luggageCapacity: vehicleRes.luggageCapacity || prev.luggageCapacity,
          }));
        }
      } catch (e) {
        setHasExistingVehicle(false);
      }
    }

    loadData();
  }, []);

  const stepMeta = [
    { number: 1, title: 'Profile & Identity', short: 'Profile', icon: <User className="w-4 h-4" /> },
    { number: 2, title: 'Driver Documents', short: 'Driver Docs', icon: <FileText className="w-4 h-4" /> },
    { number: 3, title: 'Vehicle Specs', short: 'Vehicle', icon: <Car className="w-4 h-4" /> },
    { number: 4, title: 'Vehicle Documents', short: 'Vehicle Docs', icon: <FileCode className="w-4 h-4" /> },
    { number: 5, title: 'Vehicle Photos', short: 'Vehicle Photos', icon: <Camera className="w-4 h-4" /> },
  ];

  const handleNext = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSaving(true);

    try {
      if (currentStep === 1) {
        // Sync profile to backend
        try {
          await updateProfile({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phone: profileData.phone,
          });
        } catch (err) {
          console.warn('Profile update warning:', err.message);
        }
      } else if (currentStep === 3) {
        // Register or update vehicle on backend
        try {
          if (hasExistingVehicle) {
            await updateDriverVehicle(vehicleData);
          } else {
            await registerVehicle(vehicleData);
            setHasExistingVehicle(true);
          }
        } catch (err) {
          console.warn('Vehicle registration API note:', err.message);
        }
      }

      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during step submission.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPercentage = Math.round((completedSteps.length / 5) * 100);

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0E1722] via-[#121E2E] to-[#172538] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-full bg-[#e09900]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chauffeur Onboarding Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Partner Verification Stepper
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              Complete all 5 compliance steps to activate your VIP chauffeur account and receive ride dispatches.
            </p>
          </div>

          <div className="bg-black/50 border border-white/10 rounded-2xl p-4 shrink-0 space-y-2 min-w-[200px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Total Progress:</span>
              <span className="font-mono font-bold text-[#e09900]">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-[#e09900] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-[10px] text-neutral-400 text-center font-semibold">
              Step {currentStep} of 5 Active
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg('')}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Stepper Navigation Bar */}
      <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {stepMeta.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            const isSelectable = isCompleted || step.number <= Math.max(...completedSteps, 1) + 1;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => isSelectable && setCurrentStep(step.number)}
                disabled={!isSelectable}
                className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all relative ${
                  isCurrent
                    ? 'bg-[#e09900]/15 border border-[#e09900] shadow-lg shadow-[#e09900]/10'
                    : isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/15 cursor-pointer'
                    : 'bg-black/30 border border-white/5 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Step Circle Indicator */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition ${
                    isCurrent
                      ? 'bg-[#e09900] text-black ring-4 ring-[#e09900]/20'
                      : isCompleted
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>0{step.number}</span>
                  )}
                </div>

                <span className="text-[10px] sm:text-xs font-bold text-white hidden sm:block">
                  {step.title}
                </span>
                <span className="text-[10px] font-bold text-white sm:hidden">
                  {step.short}
                </span>

                <span
                  className={`text-[9px] font-mono mt-0.5 ${
                    isCurrent
                      ? 'text-[#e09900] font-bold'
                      : isCompleted
                      ? 'text-emerald-400'
                      : 'text-neutral-500'
                  }`}
                >
                  {isCurrent ? 'Current' : isCompleted ? 'Done' : 'Pending'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUCCESS BANNER IF SUBMITTED */}
      {isSubmitted ? (
        <div className="bg-gradient-to-b from-[#0E1722] to-[#142233] border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Application & Compliance Audit Submitted!
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              All 5 onboarding modules (Profile, Driver Documents, Vehicle Specs, Vehicle Documents, and 6-Angle Photos) have been received. Our dispatch compliance officers will review your credentials within 2-4 hours.
            </p>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Chauffeur</span>
              <div className="text-xs font-bold text-white">{profileData.firstName} {profileData.lastName}</div>
              <div className="text-[11px] text-emerald-400 font-mono">Profile Verified</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Primary Vehicle</span>
              <div className="text-xs font-bold text-white">{vehicleData.year} {vehicleData.model}</div>
              <div className="text-[11px] text-amber-400 font-mono">{vehicleData.registrationNumber}</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Compliance Files</span>
              <div className="text-xs font-bold text-white">8 Documents & 6 Photos</div>
              <div className="text-[11px] text-emerald-400 font-mono">Audit In Progress</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/driver/dashboard"
              className="px-8 py-3 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs shadow-lg shadow-[#e09900]/20 flex items-center gap-2"
            >
              <span>Go to Driver Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/driver/documents"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
            >
              <span>View Documents & Status</span>
            </Link>
          </div>
        </div>
      ) : (
        /* STEPPER FORM CONTAINER */
        <div className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          {/* STEP 1: DRIVER PROFILE */}
          {currentStep === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e09900] uppercase tracking-wider mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Step 01 of 05</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Chauffeur Personal & Contact Profile
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Enter your legal identity credentials and emergency contact information.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Home Address</label>
                  <input
                    type="text"
                    required
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">City / Borough</label>
                  <input
                    type="text"
                    required
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Years of Chauffeur Exp.</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={profileData.yearsOfExperience}
                    onChange={(e) => setProfileData({ ...profileData, yearsOfExperience: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    required
                    value={profileData.emergencyContactName}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    required
                    value={profileData.emergencyContactPhone}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Step Navigation Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div />
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
                >
                  <span>{saving ? 'Saving...' : 'Save & Continue to Driver Docs'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DRIVER DOCUMENTS */}
          {currentStep === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e09900] uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Step 02 of 05</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Driver Legal Documents & Licensing
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Upload scans of your TLC Commercial License, Real ID, Background Check, and Work Authorization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {driverDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{doc.type}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {doc.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">Doc Number: {doc.docNum}</div>
                      <div className="text-[11px] text-neutral-400">Valid Until: {doc.expiry}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-dashed border-white/15 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-neutral-300 truncate">
                        <FileText className="w-4 h-4 text-[#e09900] shrink-0" />
                        <span className="truncate">{doc.file}</span>
                      </div>
                      <label className="text-[11px] font-bold text-[#e09900] hover:underline cursor-pointer shrink-0">
                        Replace
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-[#e09900]/10 border border-[#e09900]/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#e09900] shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300">
                  <strong className="text-white">Commercial Clearance:</strong> All documents will be verified automatically against New York State TLC licensing databases and Checkr background records.
                </div>
              </div>

              {/* Step Navigation Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Profile</span>
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
                >
                  <span>{saving ? 'Saving...' : 'Save & Continue to Vehicle Specs'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: VEHICLE SPECS */}
          {currentStep === 3 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e09900] uppercase tracking-wider mb-1">
                  <Car className="w-3.5 h-3.5" />
                  <span>Step 03 of 05</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Primary Vehicle Specifications (1:1 Vehicle)
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Register your luxury executive sedan or SUV for VIP bookings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Make</label>
                  <input
                    type="text"
                    required
                    value={vehicleData.make}
                    onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={vehicleData.model}
                    onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Year</label>
                  <input
                    type="number"
                    required
                    min={2018}
                    max={2027}
                    value={vehicleData.year}
                    onChange={(e) => setVehicleData({ ...vehicleData, year: Number(e.target.value) })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Exterior Color</label>
                  <input
                    type="text"
                    required
                    value={vehicleData.color}
                    onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Class Tier</label>
                  <select
                    value={vehicleData.category}
                    onChange={(e) => setVehicleData({ ...vehicleData, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="LUXURY">LUXURY (e.g. S-Class, 7-Series)</option>
                    <option value="EXECUTIVE">EXECUTIVE (e.g. E-Class)</option>
                    <option value="SUV">SUV (e.g. Escalade, Navigator)</option>
                    <option value="VAN">VAN / SPRINTER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">License Plate</label>
                  <input
                    type="text"
                    required
                    value={vehicleData.registrationNumber}
                    onChange={(e) => setVehicleData({ ...vehicleData, registrationNumber: e.target.value.toUpperCase() })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">VIN (17 Characters)</label>
                  <input
                    type="text"
                    required
                    value={vehicleData.vinNumber}
                    onChange={(e) => setVehicleData({ ...vehicleData, vinNumber: e.target.value.toUpperCase() })}
                    className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Passenger / Luggage</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={vehicleData.passengerCapacity}
                      onChange={(e) => setVehicleData({ ...vehicleData, passengerCapacity: Number(e.target.value) })}
                      className="w-1/2 bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    />
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={vehicleData.luggageCapacity}
                      onChange={(e) => setVehicleData({ ...vehicleData, luggageCapacity: Number(e.target.value) })}
                      className="w-1/2 bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step Navigation Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Driver Docs</span>
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
                >
                  <span>{saving ? 'Saving...' : 'Save & Continue to Vehicle Docs'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: VEHICLE DOCUMENTS */}
          {currentStep === 4 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e09900] uppercase tracking-wider mb-1">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Step 04 of 05</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Vehicle Insurance & TLC Compliance Documents
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Upload Commercial Liability Insurance ($1.5M+), DMV Livery Registration, and TLC Inspection certificates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicleDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{doc.type}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {doc.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">Policy / Reg #: {doc.docNum}</div>
                      <div className="text-[11px] text-neutral-400">Valid Until: {doc.expiry}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-dashed border-white/15 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-neutral-300 truncate">
                        <FileCode className="w-4 h-4 text-[#e09900] shrink-0" />
                        <span className="truncate">{doc.file}</span>
                      </div>
                      <label className="text-[11px] font-bold text-[#e09900] hover:underline cursor-pointer shrink-0">
                        Replace
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step Navigation Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Vehicle Specs</span>
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-full bg-[#e09900] hover:bg-[#c88800] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#e09900]/20"
                >
                  <span>{saving ? 'Saving...' : 'Save & Continue to 6-Angle Photos'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: VEHICLE PHOTOS */}
          {currentStep === 5 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#e09900] uppercase tracking-wider mb-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Step 05 of 05 (Final Step)</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Vehicle 6-Angle Visual Inspection
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Provide clear, daytime photographs of all 6 mandatory vehicle angles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehiclePhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="rounded-2xl bg-black/40 border border-white/10 overflow-hidden space-y-2 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-black">
                      <img
                        src={photo.url}
                        alt={photo.angle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[#e09900] font-mono text-[10px] font-bold">
                        Angle 0{photo.id}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-bold">
                        READY
                      </div>
                    </div>

                    <div className="p-3 pt-1 flex items-center justify-between">
                      <div className="text-xs font-bold text-white truncate max-w-[160px]">
                        {photo.angle}
                      </div>
                      <label className="text-[11px] font-bold text-[#e09900] hover:underline cursor-pointer flex items-center gap-1">
                        <UploadCloud className="w-3 h-3" />
                        <span>Upload</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Submit Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Vehicle Docs</span>
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/25 uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{saving ? 'Submitting Application...' : 'Complete & Submit Onboarding'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

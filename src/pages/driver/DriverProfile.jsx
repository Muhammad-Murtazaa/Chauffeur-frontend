import React, { useState, useEffect } from 'react';
import { getCurrentProfile, updateProfile, changePassword } from '../../api/auth';
import { getStoredUser } from '../../api/client';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Lock,
} from 'lucide-react';

export default function DriverProfile() {
  const stored = getStoredUser() || {};
  const [profile, setProfile] = useState({
    firstName: stored.firstName || '',
    lastName: stored.lastName || '',
    email: stored.email || '',
    phone: stored.phone || '',
    dateOfBirth: '',
    address: '',
    city: '',
    yearsOfExperience: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    languages: 'English',
    verificationStatus: 'PENDING',
    status: 'ACTIVE',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getCurrentProfile();
        if (res.user) {
          setProfile((prev) => ({
            ...prev,
            firstName: res.user.firstName ?? prev.firstName,
            lastName: res.user.lastName ?? prev.lastName,
            email: res.user.email ?? prev.email,
            phone: res.user.phone ?? prev.phone,
            verificationStatus: res.driver?.verificationStatus || 'PENDING',
            status: res.driver?.status || 'ACTIVE',
            ...(res.driver
              ? {
                  dateOfBirth: res.driver.dateOfBirth || prev.dateOfBirth,
                  address: res.driver.address || prev.address,
                  city: res.driver.city || prev.city,
                  yearsOfExperience: res.driver.yearsOfExperience ?? prev.yearsOfExperience,
                }
              : {}),
          }));
        }
      } catch (err) {
        // Fallback to local profile
      }
    }
    loadProfile();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ type: '', text: '' });

    try {
      await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
      });
      setMsg({ type: 'success', text: 'Driver profile updated successfully.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setSaving(true);
    setMsg({ type: '', text: '' });

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMsg({ type: 'success', text: 'Password has been changed securely.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to change password.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e09900]/15 text-[#e09900] border border-[#e09900]/30 text-xs font-bold uppercase tracking-wider mb-2">
          <User className="w-3.5 h-3.5" />
          <span>Profile & Identity</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Chauffeur Personal Profile
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Manage your contact credentials, address, and emergency contact details.
        </p>
      </div>

      {msg.text && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-3 border ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          {msg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Account Status Card */}
      <div className="p-6 rounded-2xl bg-[#0E1722] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#e09900]/20 border border-[#e09900]/40 flex items-center justify-center text-xl font-bold font-serif text-[#e09900]">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {profile.firstName} {profile.lastName}
            </h2>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">{profile.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{profile.verificationStatus}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
            {profile.status}
          </span>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleProfileSave} className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Street Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">City / Borough</label>
            <input
              type="text"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Years of Experience</label>
            <input
              type="number"
              value={profile.yearsOfExperience}
              onChange={(e) => setProfile({ ...profile, yearsOfExperience: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Emergency Contact Name</label>
            <input
              type="text"
              value={profile.emergencyContactName}
              onChange={(e) => setProfile({ ...profile, emergencyContactName: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Emergency Contact Phone</label>
            <input
              type="tel"
              value={profile.emergencyContactPhone}
              onChange={(e) => setProfile({ ...profile, emergencyContactPhone: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#e09900] hover:bg-[#c88800] text-black font-bold px-6 py-2.5 rounded-full text-xs transition shadow-lg shadow-[#e09900]/20 flex items-center gap-2"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Profile Changes</span>
        </button>
      </form>

      {/* Change Password Card */}
      <form onSubmit={handlePasswordChange} className="bg-[#0E1722] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#e09900]" />
          <span>Security & Password</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full bg-black/50 border border-white/15 focus:border-[#e09900] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-full text-xs transition border border-white/15"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

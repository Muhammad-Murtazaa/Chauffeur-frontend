import { apiRequest } from './client';

// ==========================================
// VEHICLE APIs
// ==========================================

export async function registerVehicle(vehicleData) {
  const payload = {
    make: vehicleData.make?.trim(),
    model: vehicleData.model?.trim(),
    year: Number(vehicleData.year),
    color: vehicleData.color?.trim(),
    registrationNumber: vehicleData.registrationNumber?.trim().toUpperCase(),
    vinNumber: vehicleData.vinNumber?.trim().toUpperCase() || undefined,
    category: vehicleData.category,
    passengerCapacity: Number(vehicleData.passengerCapacity),
    luggageCapacity: vehicleData.luggageCapacity !== undefined ? Number(vehicleData.luggageCapacity) : 0,
  };

  return apiRequest('/driver/vehicle', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getDriverVehicle() {
  return apiRequest('/driver/vehicle', {
    method: 'GET',
  });
}

export async function updateDriverVehicle(vehicleData) {
  const payload = {};

  if (vehicleData.make) payload.make = vehicleData.make.trim();
  if (vehicleData.model) payload.model = vehicleData.model.trim();
  if (vehicleData.year) payload.year = Number(vehicleData.year);
  if (vehicleData.color) payload.color = vehicleData.color.trim();
  if (vehicleData.registrationNumber) {
    payload.registrationNumber = vehicleData.registrationNumber.trim().toUpperCase();
  }
  if (vehicleData.vinNumber !== undefined) {
    payload.vinNumber = vehicleData.vinNumber ? vehicleData.vinNumber.trim().toUpperCase() : null;
  }
  if (vehicleData.category) payload.category = vehicleData.category;
  if (vehicleData.passengerCapacity !== undefined) {
    payload.passengerCapacity = Number(vehicleData.passengerCapacity);
  }
  if (vehicleData.luggageCapacity !== undefined) {
    payload.luggageCapacity = Number(vehicleData.luggageCapacity);
  }

  return apiRequest('/driver/vehicle', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// ==========================================
// DRIVER DOCUMENTS APIs
// ==========================================

export async function getDriverDocuments() {
  return apiRequest('/driver/documents', {
    method: 'GET',
  });
}

export async function uploadDriverDocument(docData) {
  const payload = {
    documentType: docData.type || docData.documentType,
    documentNumber: docData.documentNumber?.trim() || undefined,
    frontImageUrl: docData.frontImageUrl || docData.frontUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    backImageUrl: docData.backImageUrl || docData.backUrl || undefined,
    issueDate: docData.issueDate || undefined,
    expiryDate: docData.expiryDate || undefined,
  };

  return apiRequest('/driver/documents', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteDriverDocument(docId) {
  return apiRequest(`/driver/documents/${docId}`, {
    method: 'DELETE',
  });
}

// ==========================================
// VEHICLE DOCUMENTS APIs
// ==========================================

export async function getVehicleDocuments() {
  return apiRequest('/driver/vehicle/documents', {
    method: 'GET',
  });
}

export async function uploadVehicleDocument(docData) {
  const payload = {
    documentType: docData.type || docData.documentType,
    documentNumber: docData.documentNumber?.trim() || undefined,
    fileUrl: docData.fileUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    issueDate: docData.issueDate || undefined,
    expiryDate: docData.expiryDate || undefined,
  };

  return apiRequest('/driver/vehicle/documents', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ==========================================
// VEHICLE 6-ANGLE PHOTOS APIs
// ==========================================

export async function getVehiclePhotos() {
  return apiRequest('/driver/vehicle/photos', {
    method: 'GET',
  });
}

export async function uploadVehiclePhoto(photoData) {
  const payload = {
    photoType: photoData.photoType || photoData.type,
    imageUrl: photoData.imageUrl || photoData.url,
  };

  return apiRequest('/driver/vehicle/photos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ==========================================
// AVAILABILITY & VERIFICATION
// ==========================================

export async function getDriverAvailability() {
  return apiRequest('/driver/availability', {
    method: 'GET',
  });
}

export async function updateDriverAvailability(status) {
  return apiRequest('/driver/availability', {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function getDriverVerification() {
  return apiRequest('/driver/verification', {
    method: 'GET',
  });
}

// ==========================================
// DASHBOARD & BOOKINGS
// ==========================================

export async function getDriverDashboard() {
  return apiRequest('/driver/dashboard', {
    method: 'GET',
  });
}

export async function getUpcomingBookings() {
  return apiRequest('/driver/bookings/upcoming', {
    method: 'GET',
  });
}

export async function getActiveRide() {
  return apiRequest('/driver/bookings/active', {
    method: 'GET',
  });
}

export async function getBookingHistory() {
  return apiRequest('/driver/bookings/history', {
    method: 'GET',
  });
}

export async function getBookingDetails(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}`, {
    method: 'GET',
  });
}

export async function acceptBooking(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}/accept`, {
    method: 'POST',
  });
}

export async function rejectBooking(bookingId, data = {}) {
  return apiRequest(`/driver/bookings/${bookingId}/reject`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function driverEnRoute(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}/en-route`, {
    method: 'POST',
  });
}

export async function driverArrived(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}/arrived`, {
    method: 'POST',
  });
}

export async function driverStartRide(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}/start`, {
    method: 'POST',
  });
}

export async function driverCompleteRide(bookingId, data = {}) {
  return apiRequest(`/driver/bookings/${bookingId}/complete`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function driverNoShow(bookingId, data = {}) {
  return apiRequest(`/driver/bookings/${bookingId}/no-show`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


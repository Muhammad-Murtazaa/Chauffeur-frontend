import { apiRequest } from './client';

/**
 * Get Admin Dashboard Analytics & KPIs
 * GET /admin/dashboard/stats
 */
export async function fetchDashboardStats() {
  return apiRequest('/admin/dashboard/stats', {
    method: 'GET',
  });
}

/**
 * Get Customers List
 * GET /admin/customers
 */
export async function fetchAdminCustomers(search = '') {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiRequest(`/admin/customers${query}`, {
    method: 'GET',
  });
}

/**
 * Update Customer Active Status
 * PATCH /admin/customers/:id/status
 */
export async function updateCustomerStatus(id, isActive) {
  return apiRequest(`/admin/customers/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });
}

/**
 * Get Drivers with their assigned vehicle
 * GET /admin/drivers
 */
export async function fetchAdminDrivers(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.verificationStatus) params.append('verificationStatus', filters.verificationStatus);
  const qs = params.toString() ? `?${params.toString()}` : '';

  return apiRequest(`/admin/drivers${qs}`, {
    method: 'GET',
  });
}

/**
 * Update Driver Verification & Account Status
 * PATCH /admin/drivers/:id/status
 */
export async function updateDriverStatus(id, payload) {
  return apiRequest(`/admin/drivers/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Update Vehicle Verification Status
 * PATCH /admin/vehicles/:id/status
 */
export async function updateVehicleStatus(id, payload) {
  return apiRequest(`/admin/vehicles/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Get Pricing Rules / Vehicle Rate Cards
 * GET /admin/pricing
 */
export async function fetchPricingRules() {
  return apiRequest('/admin/pricing', {
    method: 'GET',
  });
}

/**
 * Update Vehicle Type Pricing Rule
 * PATCH /admin/pricing/:id
 */
export async function updatePricingRule(id, payload) {
  return apiRequest(`/admin/pricing/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Get Unassigned Bookings for Dispatch
 * GET /admin/bookings/unassigned
 */
export async function fetchUnassignedBookings() {
  return apiRequest('/admin/bookings/unassigned', {
    method: 'GET',
  });
}

/**
 * Get Eligible Drivers for Booking
 * GET /admin/bookings/:id/eligible-drivers
 */
export async function fetchEligibleDrivers(bookingId) {
  return apiRequest(`/admin/bookings/${bookingId}/eligible-drivers`, {
    method: 'GET',
  });
}

/**
 * Assign Driver to Booking
 * POST /admin/bookings/:id/assign
 */
export async function assignDriverToBooking(bookingId, { driverId, vehicleId, note }) {
  return apiRequest(`/admin/bookings/${bookingId}/assign`, {
    method: 'POST',
    body: JSON.stringify({ driverId, vehicleId, note }),
  });
}

/**
 * Reassign Booking
 * POST /admin/bookings/:id/reassign
 */
export async function reassignDriverBooking(bookingId, { driverId, reason }) {
  return apiRequest(`/admin/bookings/${bookingId}/reassign`, {
    method: 'POST',
    body: JSON.stringify({ driverId, reason }),
  });
}

import { apiRequest } from './client';

/**
 * =========================
 * Customer Quote & Booking APIs
 * =========================
 */

export async function createQuote(data) {
  return apiRequest('/quotes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getQuote(quoteId) {
  return apiRequest(`/quotes/${quoteId}`, {
    method: 'GET',
  });
}

export async function getVehicleTypes() {
  return apiRequest('/quotes/vehicle-types', {
    method: 'GET',
  });
}

export async function createBooking(data) {
  return apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMyBookings() {
  return apiRequest('/bookings/me', {
    method: 'GET',
  });
}

export async function getBookingDetails(bookingId) {
  return apiRequest(`/bookings/${bookingId}`, {
    method: 'GET',
  });
}

export async function processBookingPayment(bookingId, data = {}) {
  return apiRequest(`/bookings/${bookingId}/payment`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function cancelBooking(bookingId, data) {
  return apiRequest(`/bookings/${bookingId}/cancel`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * =========================
 * Driver Booking & Ride Lifecycle APIs
 * =========================
 */

export async function getDriverActiveBooking() {
  return apiRequest('/driver/bookings/active', {
    method: 'GET',
  });
}

export async function getDriverUpcomingBookings() {
  return apiRequest('/driver/bookings/upcoming', {
    method: 'GET',
  });
}

export async function getDriverBookingHistory() {
  return apiRequest('/driver/bookings/history', {
    method: 'GET',
  });
}

export async function getDriverBookingDetails(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}`, {
    method: 'GET',
  });
}

export async function driverAcceptBooking(bookingId) {
  return apiRequest(`/driver/bookings/${bookingId}/accept`, {
    method: 'POST',
  });
}

export async function driverRejectBooking(bookingId, data = {}) {
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

/**
 * =========================
 * Admin Dispatch APIs
 * =========================
 */

export async function getAdminUnassignedBookings() {
  return apiRequest('/admin/bookings/unassigned', {
    method: 'GET',
  });
}

export async function getAdminEligibleDrivers(bookingId) {
  return apiRequest(`/admin/bookings/${bookingId}/eligible-drivers`, {
    method: 'GET',
  });
}

export async function adminAssignDriver(bookingId, data) {
  return apiRequest(`/admin/bookings/${bookingId}/assign`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminReassignDriver(bookingId, data) {
  return apiRequest(`/admin/bookings/${bookingId}/reassign`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

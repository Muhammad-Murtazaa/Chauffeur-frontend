import { apiRequest, setAuthToken, setStoredUser, clearAuth } from './client';

/**
 * Register a new Driver/Chauffeur
 * POST /auth/driver/register
 */
export async function registerDriver(driverData) {
  const payload = {
    firstName: driverData.firstName?.trim(),
    lastName: driverData.lastName?.trim(),
    email: driverData.email?.trim().toLowerCase(),
    phone: driverData.phone?.trim(),
    password: driverData.password,
    confirmPassword: driverData.confirmPassword,
    dateOfBirth: driverData.dateOfBirth || undefined,
    address: driverData.address?.trim() || undefined,
    city: driverData.city?.trim() || undefined,
    yearsOfExperience: driverData.yearsOfExperience !== undefined ? Number(driverData.yearsOfExperience) : undefined,
  };

  const response = await apiRequest('/auth/driver/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (response.tokens?.accessToken) {
    setAuthToken(response.tokens.accessToken);
    setStoredUser(response.user);
  }

  return response;
}

/**
 * Register a new Customer
 * POST /auth/customer/register
 */
export async function registerCustomer(customerData) {
  const payload = {
    firstName: customerData.firstName?.trim(),
    lastName: customerData.lastName?.trim(),
    email: customerData.email?.trim().toLowerCase(),
    phone: customerData.phone?.trim(),
    password: customerData.password,
  };

  const response = await apiRequest('/auth/customer/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (response.tokens?.accessToken) {
    setAuthToken(response.tokens.accessToken);
    setStoredUser(response.user);
  }

  return response;
}

/**
 * Login (Customer, Driver, or Admin)
 * POST /auth/login
 */
export async function loginUser(credentials, maybePassword) {
  let email = '';
  let password = '';

  if (typeof credentials === 'object' && credentials !== null) {
    email = credentials.email || '';
    password = credentials.password || '';
  } else if (typeof credentials === 'string') {
    email = credentials;
    password = maybePassword || '';
  }

  const payload = {
    email: String(email).trim().toLowerCase(),
    password: String(password),
  };

  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (response.tokens?.accessToken) {
    setAuthToken(response.tokens.accessToken);
    setStoredUser(response.user);
  }

  return response;
}

/**
 * Get Authenticated User Profile
 * GET /auth/me
 */
export async function getCurrentProfile() {
  const response = await apiRequest('/auth/me', {
    method: 'GET',
  });

  if (response.user) {
    setStoredUser(response.user);
  }

  return response;
}

/**
 * Update Profile (First Name, Last Name, Phone)
 * PATCH /auth/profile
 */
export async function updateProfile(profileData) {
  const payload = {
    firstName: profileData.firstName?.trim(),
    lastName: profileData.lastName?.trim(),
    phone: profileData.phone?.trim(),
  };

  const response = await apiRequest('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

  setStoredUser(response);
  return response;
}

/**
 * Change Password
 * POST /auth/change-password
 */
export async function changePassword(passwordData) {
  const payload = {
    currentPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
  };

  return apiRequest('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Refresh JWT Token
 * POST /auth/refresh
 */
export async function refreshTokens(refreshToken) {
  const response = await apiRequest('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  if (response.accessToken) {
    setAuthToken(response.accessToken);
  }

  return response;
}

/**
 * Logout User
 */
export function logoutUser() {
  clearAuth();
}

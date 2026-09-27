const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const TOKEN_KEY = 'chauffeur_driver_token';
export const USER_KEY = 'chauffeur_driver_user';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getStoredUser() {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Universal API Request Handler
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      let errorMessage = 'An unexpected error occurred';
      if (data?.message) {
        if (Array.isArray(data.message)) {
          errorMessage = data.message.join(', ');
        } else {
          errorMessage = data.message;
        }
      } else if (res.statusText) {
        errorMessage = res.statusText;
      }
      const error = new Error(errorMessage);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If network connection failed or server is down
    if (!err.status && err.name === 'TypeError') {
      err.message = 'Unable to connect to backend server. Please verify the API is running.';
    }
    throw err;
  }
}

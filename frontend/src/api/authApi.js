// frontend/src/api/authApi.js
import API from "./api";

/**
 * Auth related API calls
 */

/**
 * Register a new user
 * payload: { name, email, password }
 */
export const register = async (payload) => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};

/**
 * Login user
 * payload: { email, password }
 * Stores token in localStorage (caller may also handle storing)
 */
export const login = async (payload) => {
  const res = await API.post("/auth/login", payload);
  return res.data;
};

/**
 * Get current user profile by id
 * id: user id
 */
export const getUserProfile = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

/**
 * Update current logged-in user profile
 * payload: { name, avatar }
 * Requires Authorization header (API injects token from localStorage)
 */
export const updateProfile = async (payload) => {
  const res = await API.put("/users/update", payload);
  return res.data;
};

/**
 * Helper to save token locally (optional helper)
 */
export const saveToken = (token) => {
  if (!token) return;
  localStorage.setItem("token", token);
};

/**
 * Helper to remove token on logout
 */
export const logout = () => {
  localStorage.removeItem("token");
};

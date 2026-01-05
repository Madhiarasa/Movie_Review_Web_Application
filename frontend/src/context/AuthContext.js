import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // logged in user object
  const [loading, setLoading] = useState(true);   // loading initial auth state

  // Load user from token on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userId = localStorage.getItem("userId");
          if (userId) {
            const profile = await getUserProfile(userId);
            setUser(profile);
          }
        } catch (err) {
          console.error("Auth init failed:", err);
          logout();
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // LOGIN: Save token + user info
  const login = async (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user._id);
    setUser(data.user);
  };

  // LOGOUT: Clear all data
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

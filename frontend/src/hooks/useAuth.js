// frontend/src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// A simple custom hook to access auth state
export const useAuth = () => {
  return useContext(AuthContext);
};

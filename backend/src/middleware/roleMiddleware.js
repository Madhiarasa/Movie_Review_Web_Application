// roleMiddleware.js
// Usage: attach a `role` field to user documents (e.g., "user", "admin").
// Protect routes like: router.post("/admin-only", auth, role("admin"), adminController.action)

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // req.userId is set by authMiddleware
      if (!req.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const User = require("../models/User");
      const user = await User.findById(req.userId).select("role");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If role is a single string, require exact match.
      // If role is an array, allow any match in array.
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(user.role)) {
          return res.status(403).json({ message: "Forbidden: insufficient role" });
        }
      } else {
        if (user.role !== requiredRole) {
          return res.status(403).json({ message: "Forbidden: insufficient role" });
        }
      }

      next();
    } catch (err) {
      console.error("roleMiddleware error:", err);
      res.status(500).json({ message: "Server error in role check" });
    }
  };
};

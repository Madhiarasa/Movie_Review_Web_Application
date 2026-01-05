const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  // Token must be sent in headers → Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Format: "Bearer tokenvalue"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.userId = decoded.id;

    next(); // pass to next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

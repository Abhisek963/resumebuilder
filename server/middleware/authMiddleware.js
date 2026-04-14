import jwt from "jsonwebtoken";

/**
 * Authentication middleware.
 * Accepts token as:
 *   - Authorization: <token>           (legacy — already in use)
 *   - Authorization: Bearer <token>    (standard format)
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  // Support both "Bearer <token>" and raw "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is empty." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

export default protect;
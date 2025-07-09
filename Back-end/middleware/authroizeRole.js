module.exports = authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role || req.user.role === "ADMIN") {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  };
};

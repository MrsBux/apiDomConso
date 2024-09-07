const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.headers["authorization"]?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  next();
};

module.exports = verifyToken;

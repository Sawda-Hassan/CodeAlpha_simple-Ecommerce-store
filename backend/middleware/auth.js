const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function(req, res, next) {
  const header = req.headers["authorization"];
  if(!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  if(!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    next();
  } catch(err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

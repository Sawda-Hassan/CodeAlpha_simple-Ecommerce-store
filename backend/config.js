module.exports = {
  jwtSecret: process.env.JWT_SECRET || "replace_this_with_a_strong_secret",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/codealpha_ecom",
  port: process.env.PORT || 4000
};

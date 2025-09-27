const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ FIX HERE
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing!");
      return res.status(500).json({ msg: "Server config error" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,   // ✅ correct usage
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

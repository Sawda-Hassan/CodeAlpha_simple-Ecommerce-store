const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js"); // ✅ works now
require("dotenv").config();

// Routes
const userRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/products.js");
const orderRoutes = require("./routes/orders.js");

const app = express();
app.use(cors({ origin: "*" }));

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(config.mongoURI).then(()=> {
  console.log("MongoDB connected");
  app.listen(config.port, ()=> console.log("Server running on port", config.port));
}).catch(err => {
  console.error("Mongo connection error", err);
});

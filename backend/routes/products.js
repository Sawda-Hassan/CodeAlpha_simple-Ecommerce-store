const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products - list
router.get("/", async (req, res) => {
  const q = req.query.q || "";
  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const products = await Product.find(filter).limit(100);
  res.json(products);
});

// GET /api/products/:slug - detail
router.get("/:slug", async (req, res) => {
  const p = await Product.findOne({ slug: req.params.slug });
  if(!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
});

module.exports = router;

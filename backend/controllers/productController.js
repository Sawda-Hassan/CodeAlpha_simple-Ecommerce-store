// controllers/productController.js
const Product = require("../models/Product");

// GET all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

// POST create product
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, getProductById, createProduct };

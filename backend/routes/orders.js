const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order
router.post("/", auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if(!items || items.length === 0) return res.status(400).json({ message: "Cart empty" });

    let total = 0;
    const itemsPrepared = [];
    for(const it of items) {
      const product = await Product.findById(it.productId);
      if(!product) return res.status(400).json({ message: "Invalid product" });
      if(product.countInStock < it.qty) {
        return res.status(400).json({ message: `Not enough stock for ${product.title}` });
      }
      itemsPrepared.push({
        product: product._id,
        title: product.title,
        qty: it.qty,
        price: product.price
      });
      total += product.price * it.qty;
      // Optionally reduce stock:
      product.countInStock = Math.max(0, product.countInStock - it.qty);
      await product.save();
    }

    const order = new Order({
      user: req.userId,
      items: itemsPrepared,
      shippingAddress,
      total
    });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// List orders for user
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ user: req.userId }).populate("items.product");
  res.json(orders);
});

module.exports = router;

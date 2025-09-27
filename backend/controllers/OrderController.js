// controllers/orderController.js
const Order = require("../models/Order");

// GET all orders (admin)
const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

// GET order by ID
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "title price");
  if (order) res.json(order);
  else res.status(404).json({ message: "Order not found" });
};

// CREATE new order
const createOrder = async (req, res) => {
  const { items, shippingAddress, total } = req.body;
  const order = new Order({
    user: req.user._id,
    items,
    shippingAddress,
    total,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

module.exports = { getOrders, getOrderById, createOrder };

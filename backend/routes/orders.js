// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  — create an order (checkout)
router.post('/', async (req, res) => {
  try {
    // Expected shape:
    // { userId, items: [{ productId, title, qty, price }], shippingAddress, total }
    const { userId = null, items, shippingAddress = '', total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'items required' });
    }
    if (total == null) return res.status(400).json({ message: 'total required' });

    // Optionally validate product IDs and stock:
    for (const it of items) {
      if (!it.productId && !it.product) continue; // allow cart item with no productId (demo)
      const prodId = it.productId || it.product;
      const product = await Product.findById(prodId).select('countInStock title price');
      if (!product) return res.status(400).json({ message: `Product not found: ${prodId}` });
      if (product.countInStock != null && product.countInStock < (it.qty || 1)) {
        return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      }
      // reduce stock (simple decrement) - optional: wrap in transaction for real system
      product.countInStock = Math.max(0, product.countInStock - (it.qty || 1));
      await product.save();
    }

    // Map order items into OrderItemSchema fields (product ref optional)
    const orderItems = items.map(i => ({
      product: i.productId || i.product || null,
      title: i.title || i.name || 'Item',
      qty: i.qty || 1,
      price: i.price != null ? i.price : 0
    }));

    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress,
      total,
      status: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Create order error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/orders  - list all orders (admin / dev)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.product', 'title price image');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/orders/user/:userId  - orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 }).populate('items.product', 'title price image');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'title price image');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/orders/:id/status  - update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  title: String,
  qty: Number,
  price: Number
});

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],
  shippingAddress: { type: String },
  total: { type: Number, required: true },
  status: { type: String, default: "pending" } // pending, paid, shipped, completed
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

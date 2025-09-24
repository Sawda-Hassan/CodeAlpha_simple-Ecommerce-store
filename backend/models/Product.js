const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL or path
  countInStock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);

// run: npm run seed
const mongoose = require("mongoose");
const config = require("./config");
const Product = require("./models/Product");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function seed(){
  await mongoose.connect(config.mongoURI);
  console.log("connected");

  await Product.deleteMany({});
  const products = [
    { title: "Blue Sneakers", slug: "blue-sneakers", description: "Comfortable sneakers", price: 49.99, image: "", countInStock: 10 },
    { title: "Black T-Shirt", slug: "black-tshirt", description: "100% cotton tee", price: 19.99, image: "", countInStock: 25 },
    { title: "Wireless Headphones", slug: "wireless-headphones", description: "Great sound", price: 79.99, image: "", countInStock: 5 }
  ];
  await Product.insertMany(products);
  await User.deleteMany({});
  const pw = await bcrypt.hash("password123", 10);
  await User.create({ name: "Admin", email: "admin@codealpha.tech", passwordHash: pw, isAdmin: true });
  console.log("seeded");
  process.exit();
}
seed();

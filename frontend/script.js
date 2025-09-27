let cart = JSON.parse(localStorage.getItem("cart")) || []

// Add to cart
function addToCart(name, price) {
  cart.push({ name, price })
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  alert(name + " added to cart!")
}

// Update cart count
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach((el) => {
    el.textContent = cart.length
  })
}

// Show cart items
function displayCart() {
  const cartItems = document.getElementById("cart-items")
  if (!cartItems) return

  cartItems.innerHTML = ""
  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} - $${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `
  })

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  document.getElementById("cart-total").textContent = total
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart))
  displayCart()
  updateCartCount()
}

// Checkout
function checkout() {
  alert("Order placed successfully!")
  cart = []
  localStorage.removeItem("cart")
  displayCart()
  updateCartCount()
}

// Initialize
updateCartCount()
displayCart()
// Fetch all products from backend and display
async function loadProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const products = await res.json();

    const section = document.querySelector(".product-details");
    section.innerHTML = ""; // clear old content

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("details");

      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
        <button onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
      `;
      section.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// Call the function on page load
loadProducts();

// Example addToCart function
function addToCart(title, price) {
  alert(`${title} added to cart!`);
}
const productsContainer = document.querySelector('.products-scroll');

// Fetch products from backend
async function fetchProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products'); // your backend endpoint
    const products = await res.json();

    productsContainer.innerHTML = ''; // clear existing content

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <button class="explore-btn" onclick="viewProduct('${product._id}')">Explore Now!</button>
        </div>
      `;
      productsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

// Redirect to product details page
function viewProduct(id) {
  window.location.href = `products.html?id=${id}`;
}

fetchProducts();

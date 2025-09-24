let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

// Update cart count
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = cart.length;
  });
}

// Show cart items
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} - $${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = total;
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Checkout
function checkout() {
  alert("Order placed successfully!");
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
  updateCartCount();
}

// Initialize
updateCartCount();
displayCart();

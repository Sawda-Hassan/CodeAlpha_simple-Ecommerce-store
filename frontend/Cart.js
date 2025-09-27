const API_BASE = 'http://localhost:5000';

// Use the correct key "fashionCart"
function getCart() { 
  try { 
    return JSON.parse(localStorage.getItem('fashionCart') || '[]'); 
  } catch { 
    return []; 
  } 
}

function saveCart(cart) { 
  localStorage.setItem('fashionCart', JSON.stringify(cart)); 
}

// Calculate cart total safely
function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.qty) || 0;
    return total + price * qty;
  }, 0);
}

// Calculate total number of items
function calculateTotalItems(cart) {
  return cart.reduce((count, item) => count + (parseInt(item.qty) || 0), 0);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items'); 
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total').textContent = '0';
    updateCartCount();
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item" style="margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; background:#000; padding:12px; border-radius:8px; color:#fff">
      <img src="${item.img}" alt="${item.title}" width="80" style="margin-right:16px; border-radius:6px"/>
      <div style="flex:1">
        <h4 style="color:#f9e65c">${item.title}</h4>
        <p>$${parseFloat(item.price || 0).toFixed(2)} x 
          <input type="number" min="1" value="${item.qty || 1}" onchange="updateQty(${i}, this.value)" style="width:60px; text-align:center; background:#000; color:#fff; border:1px solid #f9e65c; border-radius:4px"/>
        </p>
      </div>
      <button onclick="removeItem(${i})" style="background:#f9e65c; color:#000; border:none; padding:6px 12px; border-radius:6px; cursor:pointer">Remove</button>
    </div>
  `).join('');

  const total = calculateCartTotal(cart);
  document.getElementById('cart-total').textContent = total.toFixed(2);

  // Add Checkout button at bottom
  container.innerHTML += `
    <div style="margin-top:20px; text-align:right">
      <button onclick="checkout()" style="background:#f9e65c; color:#000; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:bold">Checkout</button>
    </div>
  `;

  updateCartCount();
}

// Update quantity
function updateQty(index, qty) {
  const cart = getCart();
  cart[index].qty = Math.max(1, parseInt(qty) || 1);
  saveCart(cart);
  renderCart();
}

// Remove item
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Fake checkout function
function checkout() {
  const cart = getCart();
  if (!cart.length) return alert("Cart is empty!");
  
  const total = calculateCartTotal(cart);
  alert(`Payment successful! Total paid: $${total.toFixed(2)}`);

  // Clear cart after "payment"
  localStorage.removeItem('fashionCart');
  renderCart();
}

// Update cart count on header
function updateCartCount() {
  const cart = getCart();
  const totalItems = calculateTotalItems(cart);
  document.querySelectorAll('.cart-link').forEach(el => el.textContent = `🛒 Cart (${totalItems})`);
}

// Initialize
renderCart();
updateCartCount();

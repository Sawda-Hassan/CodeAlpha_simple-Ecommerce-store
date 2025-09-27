const API_BASE = "http://localhost:3000/api"

// Cart management (for header)
const cart = JSON.parse(localStorage.getItem("cart")) || []

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.qty, 0)
  document.getElementById("cart-count").textContent = cartCount
}

// Load orders
async function loadOrders() {
  try {
    const response = await fetch(`${API_BASE}/orders`)
    const orders = await response.json()

    const container = document.getElementById("orders-list")

    if (orders.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No orders yet</h3>
          <p><a href="products.html" style="color: var(--primary);">Start shopping</a></p>
        </div>
      `
      return
    }

    container.innerHTML = orders
      .map(
        (order) => `
      <div class="order-card">
        <div class="order-header">
          <div>
            <h4>Order #${order._id.slice(-8)}</h4>
            <p style="color: var(--muted-foreground); font-size: 0.9rem;">
              ${new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span class="order-status">${order.status}</span>
            <p style="font-weight: 600; margin-top: 0.5rem;">$${order.total.toFixed(2)}</p>
          </div>
        </div>
        <div>
          <p style="margin-bottom: 1rem;"><strong>Shipping:</strong> ${order.shippingAddress}</p>
          <ul class="order-items">
            ${order.items
              .map(
                (item) => `
              <li style="display: flex; justify-content: space-between;">
                <span>${item.title} × ${item.qty}</span>
                <span>$${(item.price * item.qty).toFixed(2)}</span>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>
    `,
      )
      .join("")
  } catch (error) {
    console.error("Error loading orders:", error)
    document.getElementById("orders-list").innerHTML = `
      <div class="empty-state">
        <h3>Error loading orders</h3>
        <p>Please try again later</p>
      </div>
    `
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  loadOrders()
})

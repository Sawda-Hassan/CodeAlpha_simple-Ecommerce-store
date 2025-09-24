// Sample orders data (in real app, this would come from your backend API)
const sampleOrders = [
  {
    id: "ORD-001",
    items: [
      { name: "Red Dress", qty: 1, price: 40 },
      { name: "Pink Jacket", qty: 1, price: 60 },
    ],
    total: 100,
    status: "completed",
    date: "2024-01-15",
    shippingAddress: "123 Fashion St, Style City",
  },
  {
    id: "ORD-002",
    items: [{ name: "Striped Shirt", qty: 2, price: 25 }],
    total: 50,
    status: "shipped",
    date: "2024-01-20",
    shippingAddress: "456 Trend Ave, Fashion Town",
  },
  {
    id: "ORD-003",
    items: [{ name: "Red Dress", qty: 1, price: 40 }],
    total: 40,
    status: "pending",
    date: "2024-01-25",
    shippingAddress: "789 Style Blvd, Chic City",
  },
]

function displayOrders() {
  const ordersList = document.getElementById("orders-list")
  if (!ordersList) return

  // Get orders from localStorage or use sample data
  const orders = JSON.parse(localStorage.getItem("orders")) || sampleOrders

  if (orders.length === 0) {
    ordersList.innerHTML = '<p>No orders found. <a href="products.html">Start shopping!</a></p>'
    return
  }

  ordersList.innerHTML = orders
    .map(
      (order) => `
    <div class="order-card">
      <div class="order-header">
        <div>
          <div class="order-id">Order #${order.id}</div>
          <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
        </div>
        <div class="order-status ${order.status}">${order.status}</div>
      </div>
      
      <div class="order-items">
        ${order.items
          .map(
            (item) => `
          <div class="order-item">
            <div class="item-details">
              <div class="item-name">${item.name}</div>
              <div class="item-qty">Quantity: ${item.qty}</div>
            </div>
            <div class="item-price">$${item.price * item.qty}</div>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <div class="order-total">Total: $${order.total}</div>
    </div>
  `,
    )
    .join("")
}

// Initialize orders display
document.addEventListener("DOMContentLoaded", displayOrders)

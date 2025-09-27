// frontend/js/product.js
const API_BASE = 'http://localhost:5000';

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch { return []; }
}
function saveCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }

function imageUrl(imgPath) {
  if (!imgPath) return 'https://placehold.co/400x400?text=No+Image';
  if (imgPath.startsWith('/public')) return `${API_BASE}${imgPath}`;
  return imgPath;
}

async function fetchProduct(identifier) {
  try {
    const res = await fetch(`${API_BASE}/api/products/${identifier}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function init() {
  const id = qs('id');
  if (!id) {
    document.getElementById('product-title').textContent = 'No product specified';
    return;
  }
  const p = await fetchProduct(id);
  if (!p) {
    document.getElementById('product-title').textContent = 'Product not found';
    return;
  }
  document.getElementById('product-image').src = imageUrl(p.image);
  document.getElementById('product-title').textContent = p.title;
  document.getElementById('product-price').textContent = p.price.toFixed(2);
  document.getElementById('product-desc').textContent = p.description || '';
  document.getElementById('product-stock').textContent = p.countInStock || 0;

  document.getElementById('add-to-cart').addEventListener('click', () => {
    const cart = getCart();
    const idx = cart.findIndex(i => i.productId === p._id);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ productId: p._id, title: p.title, price: p.price, image: imageUrl(p.image), qty: 1 });
    saveCart(cart);
    alert('Added to cart');
  });
}

init();

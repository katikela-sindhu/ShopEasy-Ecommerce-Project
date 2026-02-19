const products = [
  { id: 1, name: "Running Shoes", price: 1999, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Smart Watch", price: 2999, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Backpack", price: 1499, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Headphones", price: 2499, image: "https://via.placeholder.com/300" }
];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

function displayProducts() {
  if (!productList) return;

  productList.innerHTML = "";
  products.forEach(product => {
    productList.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart!");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartCount) cartCount.textContent = cart.length;
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  if (!cartItems) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPrice.textContent = total;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function checkout() {
  alert("Order Placed Successfully!");
  localStorage.removeItem("cart");
  displayCart();
  updateCartCount();
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

displayProducts();
displayCart();
updateCartCount();
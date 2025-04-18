// Menu items data
const menuItems = [
  {
    id: 1,
    name: "Fresh Croissants",
    description: "Buttery and flaky, perfect for breakfast.",
    price: 2.50,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Organic Eggs",
    description: "Farm-fresh eggs from local hens.",
    price: 3.00,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Whole Grain Bread",
    description: "Healthy and hearty bread for your morning toast.",
    price: 4.00,
    image: "https://via.placeholder.com/150"
  }
  // Add more items as needed
];

// Cart array
let cart = [];

// Function to show sections
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Function to update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

// Function to add item to cart
function addToCart(id) {
  const item = menuItems.find(item => item.id === id);
  const cartItem = cart.find(cartItem => cartItem.id === id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartCount();
  alert(`${item.name} added to cart!`);
}

// Function to render menu
function renderMenu() {
  const menuContainer = document.getElementById('menu-items');
  menuContainer.innerHTML = '';
  menuItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
      <div class="card">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">$${item.price.toFixed(2)}</p>
          <button class="btn btn-primary add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
    menuContainer.appendChild(card);
  });
  // Add event listeners to buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => addToCart(parseInt(button.dataset.id)));
  });
}

// Function to render cart
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total').textContent = 'Total: $0.00';
    return;
  }
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'mb-2';
    div.innerHTML = `
      <p>${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}</p>
    `;
    cartContainer.appendChild(div);
  });
  document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to handle order submission
document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const deliveryTime = document.getElementById('delivery-time').value;
  const radiusCheck = document.getElementById('radius-check').checked;
  if (!radiusCheck) {
    alert('Please confirm your address is within the delivery radius.');
    return;
  }
  // Simulate order placement
  const orderSummary = document.getElementById('order-summary');
  orderSummary.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Delivery Time:</strong> ${deliveryTime}</p>
    <h4>Order Items:</h4>
    ${cart.map(item => `<p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>`).join('')}
    <p><strong>Total:</strong> $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
  `;
  showSection('confirmation');
  // Clear cart
  cart = [];
  updateCartCount();
  renderCart();
});

// Event listeners for navigation
document.getElementById('nav-home').addEventListener('click', () => showSection('home'));
document.getElementById('nav-menu').addEventListener('click', () => showSection('menu'));
document.getElementById('nav-cart').addEventListener('click', () => {
  renderCart();
  showSection('cart');
});
document.getElementById('view-menu-btn').addEventListener('click', () => showSection('menu'));

// Initial render
renderMenu();
updateCartCount();
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  let cart = [];
  let total = 0;

  // Update the cart display
  function updateCartDisplay() {
      if (cart.length === 0) {
          cartItemsEl.textContent = 'No items in cart';
      } else {
          cartItemsEl.textContent = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
      }
      cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  // Add to cart functionality
  function addToCart(product) {
      const productName = product.dataset.name;
      const productPrice = parseFloat(product.dataset.price);

      const existingItem = cart.find(item => item.name === productName);

      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      total += productPrice;
      updateCartDisplay();
  }

  // Event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const product = event.target.parentElement;
          addToCart(product);
      });
  });

  updateCartDisplay();
});

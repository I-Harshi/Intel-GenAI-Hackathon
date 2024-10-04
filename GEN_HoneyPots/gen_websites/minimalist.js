document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  let cart = [];
  let total = 0;

  // Function to update the cart display
  function updateCartDisplay() {
      if (cart.length === 0) {
          cartItemsEl.textContent = 'No items in cart';
      } else {
          let itemsText = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
          cartItemsEl.textContent = itemsText;
      }
      cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  // Function to add item to cart
  function addToCart(product) {
      const productName = product.dataset.name;
      const productPrice = parseFloat(product.dataset.price);

      // Check if the product already exists in the cart
      const existingItem = cart.find(item => item.name === productName);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      total += productPrice;
      updateCartDisplay();
  }

  // Attach event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const product = event.target.parentElement;
          addToCart(product);
      });
  });

  // Initialize the cart display
  updateCartDisplay();
});

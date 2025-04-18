document.addEventListener("DOMContentLoaded", () => {
  const cartToggleBtn = document.querySelector(".header__cart-toggle");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCartBtn = document.getElementById("closeCart");
  const body = document.body;
  const cartCount = document.getElementById("cartCount");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  const cart = [];

  // Toggle Cart Sidebar
  if (cartToggleBtn && cartSidebar && closeCartBtn) {
    cartToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cartSidebar.classList.add("open");
      body.classList.add("no-scroll");
    });

    closeCartBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("open");
      body.classList.remove("no-scroll");
    });

    document.addEventListener("click", (e) => {
      const isInsideCart = cartSidebar.contains(e.target);
      const isToggleBtn = cartToggleBtn.contains(e.target);
      const isQuantityBtn = e.target.classList.contains("quantity-btn");
      const isRemoveBtn = e.target.classList.contains("cart-item__remove");

      if (
        cartSidebar.classList.contains("open") &&
        !isInsideCart &&
        !isToggleBtn &&
        !isQuantityBtn &&
        !isRemoveBtn
      ) {
        cartSidebar.classList.remove("open");
        body.classList.remove("no-scroll");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
        cartSidebar.classList.remove("open");
        body.classList.remove("no-scroll");
      }
    });
  }

  // Add to Cart Button Events
  function attachAddToCartEvents() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const product = {
          name: button.getAttribute("data-name"),
          price: button.getAttribute("data-price"),
          image: button.getAttribute("data-image"),
        };
        addToCart(product);
        cartCount.classList.add("animated");
        setTimeout(() => cartCount.classList.remove("animated"), 500);
      });
    });
  }

  // Add Product to Cart Array (with quantity logic)
  function addToCart(product) {
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    updateCartUI();
  }

  // Update UI
  function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const price = parseInt(item.price.replace(/\D/g, "")) || 0;
      total += price * item.quantity;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item__info">
            <h4>${item.name}</h4>
            <p>
              <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
              x <span class="cart-item__price">${item.price}</span>
            </p>
          </div>
          <button class="cart-item__remove" onclick="removeFromCart(${index})">&times;</button>
        `;
      cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = total.toLocaleString("vi-VN") + "đ";
  }

  // Remove product from cart
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartUI();
  };

  // Change quantity (plus or minus)
  window.changeQuantity = function (index, change) {
    if (!cart[index]) return;
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  };

  // Call this after rendering products dynamically
  window.attachAddToCartEvents = attachAddToCartEvents;
});

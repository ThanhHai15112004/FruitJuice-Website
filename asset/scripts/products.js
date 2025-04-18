document.addEventListener("DOMContentLoaded", () => {
    fetch("../asset/database/products.json")
      .then(response => response.json())
      .then(data => renderProducts(data))
      .catch(error => console.error("Lỗi khi load JSON:", error));
  });
  
  function renderProducts(products) {
    const list = document.getElementById("productList");
    list.innerHTML = "";
  
    products.forEach(product => {
      const item = document.createElement("li");
      item.className = "banner__product-item";
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="banner__product-info">
          <h3>${product.name}</h3>
          <p>${product.engName}</p>
          <span class="price">${product.price}</span>
        </div>
      `;
      list.appendChild(item);
    });
  }
  
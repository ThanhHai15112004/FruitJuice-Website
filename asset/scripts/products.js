document.addEventListener("DOMContentLoaded", () => {
  fetch("../asset/database/products.json")
    .then((response) => response.json())
    .then((data) => renderProducts(data))
    .catch((error) => console.error("Lỗi khi load JSON:", error));
});

function renderProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product) => {
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

// phan trang
document.addEventListener("DOMContentLoaded", () => {
  fetch("../asset/database/products.json")
    .then((response) => response.json())
    .then((data) => {
      setupResponsivePagination(data);
      window.addEventListener("resize", () => setupResponsivePagination(data));
    })
    .catch((error) => console.error("Lỗi khi load JSON:", error));
});

let currentPage = 1;

function getItemsPerPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 420) return 2 * 3;
  else if (screenWidth <= 600) return 3 * 3;
  else if (screenWidth <= 1000) return 4 * 3;
  else return 5 * 4; // mặc định
}

function setupResponsivePagination(products) {
  const list = document.getElementById("productList");
  const pagination = document.getElementById("pagination");
  const ITEMS_PER_PAGE = getItemsPerPage();
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  function renderPage(page) {
    currentPage = page;
    list.classList.add("fade-out");
  
    setTimeout(() => {
      list.innerHTML = "";
  
      const start = (page - 1) * ITEMS_PER_PAGE;
      const sliced = products.slice(start, start + ITEMS_PER_PAGE);
  
      sliced.forEach((product, index) => {
        const item = document.createElement("li");
        item.className = "banner__product-item";
        item.style.animationDelay = `${index * 100}ms`;
  
        // ✅ Sửa ở đây: thêm data-* để truyền qua nút
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="banner__product-info">
            <h3>${product.name}</h3>
            <p>${product.engName}</p>
            <span class="price">${product.price}</span>
            <button class="add-to-cart"
              data-name="${product.name}"
              data-price="${product.price}"
              data-image="${product.image}">Thêm vào giỏ hàng</button>
          </div>
        `;
        list.appendChild(item);
      });
  
      // ✅ GỌI THÊM NÀY SAU KHI render xong
      if (typeof attachAddToCartEvents === "function") {
        attachAddToCartEvents();
      }
  
      list.classList.remove("fade-out");
  
      pagination.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === page) btn.classList.add("active");
        btn.onclick = () => renderPage(i);
        pagination.appendChild(btn);
      }
    }, 200);
  }
  
  

  renderPage(currentPage > totalPages ? 1 : currentPage);
}























const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.product-card');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slides.forEach((slide, slideIndex) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });

        dots.forEach(dot => dot.classList.remove('active'));
        dot.classList.add('active');
    });
});
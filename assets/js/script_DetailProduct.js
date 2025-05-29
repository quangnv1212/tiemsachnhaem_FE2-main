document.addEventListener("DOMContentLoaded", async function () {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");

  try {
    const productRes = await fetch(`https://tiemsachnhaem-be-mu.vercel.app/api/products/${id}`);
    const productData = await productRes.json();

    // Hiển thị chi tiết sách
    document.querySelector("#book-image").src = productData.imageUrl;
    document.querySelector("#book-title").innerHTML = productData.bookTitle;
    document.querySelector("#book-price").textContent = productData.price.toLocaleString('vi-VN') + 'đ';
    document.querySelector("#book-stock").textContent = `Đã bán: ${productData.soldCount || 0}`;
    document.querySelector("#book-isbn").textContent = productData.ISBN;
    document.querySelector("#book-publisher").textContent = productData.publisher;
    document.querySelector("#book-author").textContent = productData.author;
    document.querySelector("#book-pages").textContent = productData.pageCount;
    document.querySelector("#book-catalog").textContent = productData.catalog || 'Không rõ';
    document.querySelector("#book-desc").textContent = productData.description;

    // Load sách cùng thể loại
    if (productData.catalog) {
      await loadRelatedBooks(productData.catalog, productData._id); // truyền luôn id để lọc ra
    }
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết sách:", err);
  }

  // Xử lý nút cuộn carousel
  const carousels = document.querySelectorAll(".carousel-wrapper");

  carousels.forEach(wrapper => {
    const bookList = wrapper.querySelector(".book-list");
    const prevBtn = wrapper.querySelector(".prev");
    const nextBtn = wrapper.querySelector(".next");

    const scrollAmount = 300;

    prevBtn.addEventListener("click", () => {
      bookList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      bookList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
});

async function loadRelatedBooks(catalog, currentId) {
  try {
    const res = await fetch(`https://tiemsachnhaem-be-mu.vercel.app/api/products/by-catalog/${encodeURIComponent(catalog)}?page=1&limit=10`);
    const books = await res.json();

    const container = document.getElementById("related-books-list");
    container.innerHTML = '';

    books
      .filter(book => book._id !== currentId) // loại trừ chính nó
      .forEach(book => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-image-container">
            <img class="product-image" src="${book.imageUrl || ''}" alt="${book.bookTitle}" data-id="${book._id}">
          </div>
          <div class="product-info">
            <div class="product-title">${book.bookTitle}</div>
            <div class="product-price">${book.price?.toLocaleString('vi-VN') || 'N/A'}<span class="product-price-unit">đ</span></div>
            <div class="product-sold">${book.soldCount || 0} đã bán/tháng</div>
            <div class="product-actions">
              <button class="buy-button">Mua hàng</button>
              <div class="cart-button">
                <i class="fas fa-shopping-cart"></i>
              </div>
            </div>
          </div>
        `;
        card.querySelector('.product-image').addEventListener('click', () => {
          window.location.href = `DetailProduct.html?id=${book._id}`;
        });

        container.appendChild(card);
      });

  } catch (err) {
    console.error("Lỗi khi load sách cùng thể loại:", err);
  }
}

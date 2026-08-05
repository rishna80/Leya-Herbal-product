/**
 * Sri Herbal Care - Products Page JavaScript
 * Search, filter, and display all products
 */

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("all-products");
  const searchInput = document.getElementById("product-search");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const resultCount = document.getElementById("result-count");

  if (!productsContainer) return;

  let allProducts = [];

  /* ---------- Initialize Filters ---------- */
  function initFilters() {
    const categories = SHC.ProductStore.getCategories();
    categoryFilter.innerHTML =
      '<option value="">All Categories</option>' +
      categories.map((c) => `<option value="${c}">${c}</option>`).join("");
  }

  /* ---------- Filter Products ---------- */
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    let filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.benefits.toLowerCase().includes(searchTerm);

      // Category filter
      const matchesCategory = !category || product.category === category;

      // Price filter
      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        if (max) {
          matchesPrice = product.price >= min && product.price <= max;
        } else {
          matchesPrice = product.price >= min;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts(filtered);
  }

  /* ---------- Render Products ---------- */
  function renderProducts(products) {
    if (resultCount) {
      resultCount.textContent = `${products.length} product${products.length !== 1 ? "s" : ""} found`;
    }

    if (products.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
          <div class="no-results-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    productsContainer.innerHTML = products
      .map((p) => SHC.createProductCard(p, { showDetails: true }))
      .join("");

    SHC.bindProductButtons(productsContainer);

    // Re-init scroll animations for new elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    productsContainer.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }

  /* ---------- Load & Display Products ---------- */
  function loadProducts() {
    allProducts = SHC.ProductStore.getAll();
    initFilters();
    renderProducts(allProducts);
  }

  /* ---------- Event Listeners ---------- */
  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", filterProducts);
  }

  /* ---------- Listen for storage changes (cross-tab sync) ---------- */
  window.addEventListener("storage", (e) => {
    if (
      e.key === SHC.STORAGE_KEYS.PRODUCTS ||
      e.key === SHC.STORAGE_KEYS.CART
    ) {
      loadProducts();
    }
  });

  window.addEventListener("cart:updated", () => {
    loadProducts();
  });

  loadProducts();
});

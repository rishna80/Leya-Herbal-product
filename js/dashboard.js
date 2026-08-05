/**
 * Sri Herbal Care - Admin Dashboard JavaScript
 * Product CRUD, enquiries, orders management
 */

document.addEventListener("DOMContentLoaded", () => {
  // Require authentication
  if (!SHC.Auth.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  /* ---------- Panel Navigation ---------- */
  const panels = document.querySelectorAll(".dashboard-panel");
  const sidebarLinks = document.querySelectorAll(".sidebar-link[data-panel]");
  const pageTitle = document.getElementById("dashboard-title");

  function showPanel(panelId) {
    panels.forEach((p) => p.classList.remove("active"));
    sidebarLinks.forEach((l) => l.classList.remove("active"));

    const panel = document.getElementById("panel-" + panelId);
    const link = document.querySelector(`[data-panel="${panelId}"]`);

    if (panel) panel.classList.add("active");
    if (link) link.classList.add("active");

    const titles = {
      dashboard: "Dashboard Overview",
      products: "Product Management",
      orders: "Orders",
      enquiries: "Customer Enquiries",
    };
    if (pageTitle) pageTitle.textContent = titles[panelId] || "Dashboard";

    // Load panel data
    switch (panelId) {
      case "dashboard":
        loadDashboardStats();
        break;
      case "products":
        loadProductsTable();
        break;
      case "orders":
        loadOrdersTable();
        break;
      case "enquiries":
        loadEnquiriesTable();
        break;
    }
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      showPanel(link.dataset.panel);
      // Close mobile sidebar
      document.querySelector(".dashboard-sidebar")?.classList.remove("active");
    });
  });

  /* ---------- Logout ---------- */
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    SHC.Auth.logout();
    window.location.href = "login.html";
  });

  /* ---------- Sidebar Toggle (Mobile) ---------- */
  document.getElementById("sidebar-toggle")?.addEventListener("click", () => {
    document.querySelector(".dashboard-sidebar")?.classList.toggle("active");
  });

  /* ---------- Dashboard Stats ---------- */
  function loadDashboardStats() {
    const products = SHC.ProductStore.getAll();
    const orders = SHC.OrderStore.getAll();
    const enquiries = SHC.EnquiryStore.getAll();

    document.getElementById("stat-products").textContent = products.length;
    document.getElementById("stat-orders").textContent = orders.length;
    document.getElementById("stat-enquiries").textContent = enquiries.length;

    // Recent activity
    const recentEl = document.getElementById("recent-activity");
    if (recentEl) {
      const activities = [
        ...orders.slice(0, 3).map((o) => ({
          type: "order",
          text: `Order: ${o.productName} - ${SHC.formatPrice(o.price)}`,
          date: o.date,
        })),
        ...enquiries.slice(0, 3).map((e) => ({
          type: "enquiry",
          text: `Enquiry from ${e.name}`,
          date: e.date,
        })),
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      if (activities.length === 0) {
        recentEl.innerHTML =
          '<p class="text-center" style="color: var(--text-secondary);">No recent activity.</p>';
      } else {
        recentEl.innerHTML = activities
          .map(
            (a) => `
          <div style="display:flex;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--color-border);">
            <span>${a.type === "order" ? "📦" : "📧"} ${a.text}</span>
            <span style="color:var(--text-secondary);font-size:0.85rem;">${formatDate(a.date)}</span>
          </div>
        `,
          )
          .join("");
      }
    }
  }

  /* ---------- Products Table ---------- */
  function loadProductsTable() {
    const tbody = document.getElementById("products-table-body");
    if (!tbody) return;

    const products = SHC.ProductStore.getAll();

    if (products.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="text-center">No products found. Add your first product!</td></tr>';
      return;
    }

    tbody.innerHTML = products
      .map(
        (p) => `
      <tr>
        <td data-label="Image"><img class="table-img" src="${p.image || "images/products/placeholder.svg"}" alt="${p.name}" onerror="this.src='images/products/placeholder.svg'"></td>
        <td data-label="Name"><strong>${p.name}</strong></td>
        <td data-label="Category">${p.category}</td>
        <td data-label="Price">${SHC.formatPrice(p.price)}</td>
        <td data-label="Featured">${p.featured ? "⭐ Yes" : "No"}</td>
        <td data-label="Actions" class="actions">
          <button class="btn btn-secondary btn-sm edit-product-btn" data-id="${p.id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-product-btn" data-id="${p.id}">Delete</button>
        </td>
      </tr>
    `,
      )
      .join("");

    tbody.querySelectorAll(".edit-product-btn").forEach((btn) => {
      btn.addEventListener("click", () => openProductForm(btn.dataset.id));
    });

    tbody.querySelectorAll(".delete-product-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
    });
  }

  /* ---------- Product Form ---------- */
  const productForm = document.getElementById("product-form");
  const formTitle = document.getElementById("form-title");
  const imagePreview = document.getElementById("image-preview");
  const imageInput = document.getElementById("product-image-input");
  let editingProductId = null;
  let currentImageData = "";

  document
    .getElementById("add-product-btn")
    ?.addEventListener("click", () => openProductForm());
  document
    .getElementById("cancel-form-btn")
    ?.addEventListener("click", closeProductForm);

  function openProductForm(productId = null) {
    editingProductId = productId;
    const formCard = document.getElementById("product-form-card");
    if (formCard) formCard.style.display = "block";

    if (productId) {
      const product = SHC.ProductStore.getById(productId);
      if (!product) return;

      if (formTitle) formTitle.textContent = "Edit Product";
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-description").value =
        product.description;
      document.getElementById("product-benefits").value = product.benefits;
      document.getElementById("product-usage").value = product.usage;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-category").value = product.category;
      document.getElementById("product-featured").checked = product.featured;
      currentImageData = product.image || "";

      if (imagePreview) {
        imagePreview.innerHTML = product.image
          ? `<img src="${product.image}" alt="Preview">`
          : '<div class="image-preview-placeholder">Click to upload image</div>';
      }
    } else {
      if (formTitle) formTitle.textContent = "Add New Product";
      productForm?.reset();
      if (imageInput) imageInput.value = "";
      currentImageData = "";
      if (imagePreview) {
        imagePreview.innerHTML =
          '<div class="image-preview-placeholder">📷 Click to upload image</div>';
      }
    }

    formCard?.scrollIntoView({ behavior: "smooth" });
  }

  function closeProductForm() {
    const formCard = document.getElementById("product-form-card");
    if (formCard) formCard.style.display = "none";
    editingProductId = null;
    productForm?.reset();
    if (imageInput) imageInput.value = "";
    currentImageData = "";
    if (imagePreview) {
      imagePreview.innerHTML =
        '<div class="image-preview-placeholder">📷 Click to upload image</div>';
    }
  }

  // Image upload handling
  imagePreview?.addEventListener("click", () => imageInput?.click());

  // Compress large images before storing as DataURL to avoid localStorage quota issues
  function compressImageFile(
    file,
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.8,
  ) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          const aspect = width / height;
          if (width > maxWidth) {
            width = maxWidth;
            height = Math.round(width / aspect);
          }
          if (height > maxHeight) {
            height = maxHeight;
            width = Math.round(height * aspect);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          try {
            const dataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve(dataUrl);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error("Invalid image"));
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  imageInput?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      SHC.showToast("Please select a valid image file.");
      return;
    }

    try {
      // Compress to reasonable size to fit localStorage limits
      const compressed = await compressImageFile(file, 1024, 1024, 0.8);
      currentImageData = compressed;
      if (imagePreview) {
        imagePreview.innerHTML = `<img src="${currentImageData}" alt="Preview">`;
      }
    } catch (err) {
      // Fallback: load original as DataURL
      const reader = new FileReader();
      reader.onload = (ev) => {
        currentImageData = ev.target.result;
        if (imagePreview)
          imagePreview.innerHTML = `<img src="${currentImageData}" alt="Preview">`;
      };
      reader.readAsDataURL(file);
      SHC.showToast("Image processed with fallback.");
    }
  });

  productForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const productData = {
      name: document.getElementById("product-name").value.trim(),
      description: document.getElementById("product-description").value.trim(),
      benefits: document.getElementById("product-benefits").value.trim(),
      usage: document.getElementById("product-usage").value.trim(),
      price: parseFloat(document.getElementById("product-price").value),
      category: document.getElementById("product-category").value.trim(),
      featured: document.getElementById("product-featured").checked,
      image:
        currentImageData ||
        (editingProductId ? SHC.ProductStore.getById(editingProductId)?.image : "images/products/placeholder.svg"),
    };

    if (!productData.name || !productData.price || !productData.category) {
      SHC.showToast("Please fill in required fields: Name, Price, Category.");
      return;
    }

    try {
      if (editingProductId) {
        const ok = SHC.ProductStore.update(editingProductId, productData);
        if (!ok) throw new Error("Failed to update product");
        SHC.showToast("Product updated successfully!");
      } else {
        SHC.ProductStore.add({
          ...productData,
          id: SHC.ProductStore.generateId(),
        });
        SHC.showToast("Product added successfully!");
      }
    } catch (err) {
      console.error("Product save error:", err);
      SHC.showToast(
        "Unable to save product. Try a smaller image or clear storage.",
      );
      return;
    }

    closeProductForm();
    loadProductsTable();
    loadDashboardStats();
  });

  function deleteProduct(id) {
    const product = SHC.ProductStore.getById(id);
    if (!product) return;

    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      SHC.ProductStore.delete(id);
      SHC.showToast("Product deleted.");
      loadProductsTable();
      loadDashboardStats();
    }
  }

  /* ---------- Orders Table ---------- */
  function loadOrdersTable() {
    const tbody = document.getElementById("orders-table-body");
    if (!tbody) return;

    const orders = SHC.OrderStore.getAll();

    if (orders.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="text-center">No orders yet.</td></tr>';
      return;
    }

    tbody.innerHTML = orders
      .map(
        (o) => `
      <tr>
        <td>${o.id}</td>
        <td>${o.productName}</td>
        <td>${SHC.formatPrice(o.price)}</td>
        <td><span style="color:var(--color-warning);">⏳ ${o.status}</span></td>
        <td>${formatDate(o.date)}</td>
      </tr>
    `,
      )
      .join("");
  }

  /* ---------- Enquiries Table ---------- */
  function loadEnquiriesTable() {
    const tbody = document.getElementById("enquiries-table-body");
    if (!tbody) return;

    const enquiries = SHC.EnquiryStore.getAll();

    if (enquiries.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="text-center">No enquiries yet.</td></tr>';
      return;
    }

    tbody.innerHTML = enquiries
      .map(
        (e) => `
      <tr>
        <td><strong>${e.name}</strong></td>
        <td>${e.mobile}</td>
        <td>${e.email || "-"}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.message}</td>
        <td>${formatDate(e.date)}</td>
      </tr>
    `,
      )
      .join("");
  }

  /* ---------- Date Formatter ---------- */
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /* ---------- Initialize Dashboard ---------- */
  showPanel("dashboard");
});

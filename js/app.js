/**
 * Sri Herbal Care - Main Application JavaScript
 * Shared utilities, navbar, dark mode, animations, featured products
 */

/* ---------- Constants & Storage Keys ---------- */
const STORAGE_KEYS = {
  PRODUCTS: "shc_products",
  ENQUIRIES: "shc_enquiries",
  ORDERS: "shc_orders",
  AUTH: "shc_auth",
  THEME: "shc_theme",
  NEWSLETTER: "shc_newsletter",
  CART: "shc_cart",
};

const WHATSAPP_NUMBER = "8838850766";
const COMPANY_NAME = "Sri Herbal Care";

/* ---------- Default Products Data ---------- */
const DEFAULT_IMAGE = "./assets/logo-1-removebg-preview.png";

const DEFAULT_PRODUCTS = [
  {
    id: "prod-001",
    name: "Beetroot Lip Balm",
    description:
      "Beetroot Lip Balm is a nourishing herbal lip care formula enriched with Beetroot Extract, Shea Butter, Olive Oil, and Vitamin E Oil.",
    benefits:
      "Gives lips a natural pink glow.  Deeply moisturizes and prevents dryness.  Nourishes and softens rough, chapped lips.",
    usage:
      "Apply a small amount to clean lips 2–4 times a day or whenever your lips feel dry. For best results, apply before bedtime.",
    price: 499,
    category: "Lip Care",
    image: "./assets/lip balm.png",
    featured: true,
  },
  {
    id: "prod-002",
    name: "Herbal Hair Growth Oil",
    description:
      "Herbal Hair Growth Oil is a natural blend of Coconut Oil, Bhringraj, Henna, Hibiscus, and Black Cumin Seeds that deeply nourishes the scalp and strengthens hair from the roots.",
    benefits:
      "Promotes healthy hair growth. Strengthens hair roots and reduces hair fall. Nourishes the scalp and hair follicles. Helps reduce dandruff and scalp dryness. Makes hair soft, shiny, and manageable. Supports thicker and healthier-looking hair.",
    usage:
      "Apply a sufficient amount of Herbal Hair Growth Oil to your scalp and hair. Gently massage with your fingertips for 5–10 minutes. Leave the oil on for at least 1 hour or overnight for best results. Wash with a mild herbal shampoo. Use 2–3 times a week regularly for healthier, stronger, and thicker-looking hair.",
    price: 300,
    category: "Hair Care",
    image: "./assets/hair growth oil.png",
    featured: true,
  },
  {
    id: "prod-003",
    name: "Face Serum",
    description:
      "Face Serum is a lightweight, fast-absorbing formula enriched with Kojic Acid, Niacinamide, Aloe Vera Extract, Lavender Essential Oil, and Vitamin E Oil.",
    benefits:
      "Brightens and evens skin tone. Helps reduce dark spots and pigmentation. Deeply hydrates and nourishes the skin. Soothes and calms irritated skin. Improves skin texture and boosts natural glow. Supports a healthy skin barrier with antioxidant protection.",
    usage:
      "Cleanse and pat your face dry. Apply 2–3 drops of the serum to your face and neck. Gently massage until fully absorbed. Use morning and night for best results. During the daytime, follow with a broad-spectrum sunscreen (SPF 30 or higher) to help protect your skin.",
    price: 250,
    category: "Skincare",
    image: "./assets/face serum.png",
    featured: true,
  },
  {
    id: "prod-004",
    name: "Nalangu Maavu",
    description:
      "Nalangu Maavu is a traditional herbal bathing powder made with Kasthuri, White Turmeric, Hibiscus, and Aavaram Poo.",
    benefits:
      "Gently cleanses the skin naturally. Helps brighten and improve skin tone. Removes excess oil and impurities. Leaves skin soft, smooth, and refreshed. Helps reduce body odor and keeps skin fresh. Suitable for daily use on face and body.",
    usage:
      "Take the required amount of Nalangu Maavu in a bowl. Mix with water, milk, or rose water to form a smooth paste. Apply evenly to the face and body. Leave it on for 2–5 minutes, then gently massage and rinse with water. Use 3–4 times a week or daily as a natural bath powder for best results.",
    price: 250,
    category: "Hair Care",
    image: "./assets/nalangu maavu.png",
    featured: true,
  },
  {
    id: "prod-005",
    name: "OBECARE Weight Loss Powder",
    description:
      "OBECARE Weight Loss Powder is a herbal wellness blend made with Horse Gram, Asafoetida, Fenugreek, Turmeric, and Coriander. It is formulated to support healthy weight management by promoting digestion and metabolism while helping you feel light and energized.",
    benefits:
      "Supports healthy weight management. Helps boost metabolism naturally. Aids healthy digestion. Helps reduce bloating and supports gut health. Promotes a feeling of fullness and helps control appetite. Made with natural herbal ingredients.",
    usage:
      "Mix 1–2 teaspoons (5–10 g) of the powder with 150–200 ml of warm water. Drink once or twice daily, preferably 30 minutes before meals. For best results, use regularly along with a healthy diet and regular exercise.",
    price: 350,
    category: "Weight Loss",
    image: "./assets/obecare weight loss powder.png",
    featured: true,
  },
  {
    id: "prod-006",
    name: "பருத்தி பால் பொடி",
    description:
      "பருத்தி பால் பொடி என்பது பருத்தி, ஏலக்காய் மற்றும் சுக்கு ஆகிய இயற்கை மூலிகைகளால் தயாரிக்கப்பட்ட பாரம்பரிய ஆரோக்கிய பான கலவையாகும். இது உடலுக்கு இயற்கையான ஆற்றலை வழங்கவும், செரிமானத்தை ஆதரிக்கவும், தினசரி புத்துணர்ச்சியை அளிக்கவும் உதவுகிறது. சுவையும் ஆரோக்கியமும் நிறைந்த இந்த பானம் அனைத்து வயதினருக்கும் ஏற்றது.",
    benefits:
      "உடலுக்கு இயற்கையான ஆற்றலை வழங்க உதவுகிறது. உடல் வலிமை மற்றும் புத்துணர்ச்சியை ஆதரிக்கிறது. செரிமானத்தை மேம்படுத்த உதவுகிறது. உடலுக்கு தேவையான ஊட்டச்சத்துகளை வழங்குகிறது. சுவையான மற்றும் ஆரோக்கியமான பாரம்பரிய பானம். தினசரி உடல்நல பராமரிப்பிற்கு ஏற்றது.",
    usage:
      "1–2 டீஸ்பூன் பருத்தி பால் பொடியை ஒரு கப் சூடான பாலில் அல்லது தண்ணீரில் கலந்து கொள்ளவும். தேவைக்கேற்ப நாட்டு சர்க்கரை அல்லது பனைவெல்லம் சேர்த்து இனிப்பாக்கலாம். நன்றாக கலந்து காலை அல்லது மாலை நேரத்தில் பருகவும். சிறந்த பலன்களுக்கு தினமும் ஒரு முறை பயன்படுத்தவும்.",
    price: 300,
    category: "Health Drinks",
    image: "./assets/paruthi paal podi.png",
    featured: true,
  },
];

/* ---------- Storage Utilities ---------- */
const Storage = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

/* ---------- Product Management ---------- */
const ProductStore = {
  init() {
    const storedProducts = Storage.get(STORAGE_KEYS.PRODUCTS);
    if (!storedProducts) {
      Storage.set(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      return;
    }

    const normalized = storedProducts.map((product) => {
      if (!product || typeof product !== "object") {
        return product;
      }

      if (typeof product.image !== "string" || !product.image.trim()) {
        return { ...product, image: DEFAULT_IMAGE };
      }

      return product;
    });

    if (JSON.stringify(normalized) !== JSON.stringify(storedProducts)) {
      Storage.set(STORAGE_KEYS.PRODUCTS, normalized);
    }
  },

  getAll() {
    return Storage.get(STORAGE_KEYS.PRODUCTS, []);
  },

  getFeatured() {
    return this.getAll().filter((p) => p.featured);
  },

  getById(id) {
    return this.getAll().find((p) => p.id === id);
  },

  save(products) {
    Storage.set(STORAGE_KEYS.PRODUCTS, products);
  },

  add(product) {
    const products = this.getAll();
    products.push(product);
    this.save(products);
  },

  update(id, updates) {
    const products = this.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.save(products);
      return true;
    }
    return false;
  },

  delete(id) {
    const products = this.getAll().filter((p) => p.id !== id);
    this.save(products);
  },

  getCategories() {
    const products = this.getAll();
    return [...new Set(products.map((p) => p.category))].sort();
  },

  generateId() {
    return (
      "prod-" +
      Date.now().toString(36) +
      Math.random().toString(36).substr(2, 5)
    );
  },
};

/* ---------- Cart Management ---------- */
const CartStore = {
  getAll() {
    return Storage.get(STORAGE_KEYS.CART, []);
  },

  getById(id) {
    return this.getAll().find((item) => item.id === id);
  },

  getCount() {
    return this.getAll().reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    );
  },

  add(product) {
    const cart = this.getAll();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    Storage.set(STORAGE_KEYS.CART, cart);
    return this.getById(product.id);
  },

  updateQuantity(id, quantity) {
    const cart = this.getAll();
    const index = cart.findIndex((item) => item.id === id);

    if (index === -1) return null;

    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }

    Storage.set(STORAGE_KEYS.CART, cart);
    return this.getById(id);
  },

  clear() {
    Storage.set(STORAGE_KEYS.CART, []);
  },
};

/* ---------- Enquiry Management ---------- */
const EnquiryStore = {
  getAll() {
    return Storage.get(STORAGE_KEYS.ENQUIRIES, []);
  },

  add(enquiry) {
    const enquiries = this.getAll();
    enquiries.unshift({
      ...enquiry,
      id: "enq-" + Date.now(),
      date: new Date().toISOString(),
    });
    Storage.set(STORAGE_KEYS.ENQUIRIES, enquiries);
  },
};

/* ---------- Order Management ---------- */
const OrderStore = {
  getAll() {
    return Storage.get(STORAGE_KEYS.ORDERS, []);
  },

  add(order) {
    const orders = this.getAll();
    orders.unshift({
      ...order,
      id: "ord-" + Date.now(),
      date: new Date().toISOString(),
      status: "pending",
    });
    Storage.set(STORAGE_KEYS.ORDERS, orders);
  },
};

/* ---------- WhatsApp Order ---------- */
function orderOnWhatsApp(productName, price) {
  const message = encodeURIComponent(
    `Hello,\nI would like to order this product.\n\nProduct Name: ${productName}\nPrice: ₹${price}\n\nPlease contact me.`,
  );
  const url = `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");

  OrderStore.add({
    productName,
    price,
    customerPhone: "",
    source: "whatsapp",
  });
}

/* ---------- Format Currency ---------- */
function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

/* ---------- Cart Checkout Helpers ---------- */
function orderOnWhatsApp(productName, price, items = null) {
  const cartItems = Array.isArray(items) && items.length ? items : null;
  let message;

  if (cartItems) {
    const lines = cartItems
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = ${formatPrice(
            Number(item.price) * Number(item.quantity),
          )}`,
      )
      .join("\n");
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    );

    message = encodeURIComponent(
      `Hello,\nI would like to place this order.\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\nPlease contact me.`,
    );
  } else {
    message = encodeURIComponent(
      `Hello,\nI would like to order this product.\n\nProduct Name: ${productName}\nPrice: ${formatPrice(price)}\n\nPlease contact me.`,
    );
  }

  const url = `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");

  OrderStore.add({
    productName: cartItems ? "Cart Order" : productName,
    price: cartItems ? 0 : price,
    customerPhone: "",
    source: cartItems ? "whatsapp-cart" : "whatsapp",
    items: cartItems || [],
  });
}

function updateCartCountBadge() {
  const cartButton = document.getElementById("cart-nav-btn");
  if (!cartButton) return;

  const badge = cartButton.querySelector(".cart-count-badge");
  const count = CartStore.getCount();

  if (badge) {
    badge.textContent = count > 0 ? count : "";
    badge.classList.toggle("hidden", count <= 0);
  }
}

function initCartNavButton() {
  const actions = document.querySelector(".nav-actions");
  if (!actions) return;

  let cartButton = document.getElementById("cart-nav-btn");
  if (!cartButton) {
    cartButton = document.createElement("a");
    cartButton.id = "cart-nav-btn";
    cartButton.className = "nav-icon-btn cart-nav-btn";
    cartButton.href = "cart.html";
    cartButton.setAttribute("aria-label", "View shopping cart");
    cartButton.innerHTML = '🛒<span class="cart-count-badge hidden"></span>';
    actions.insertBefore(cartButton, actions.firstChild);
  }

  updateCartCountBadge();
  window.addEventListener("cart:updated", updateCartCountBadge);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.CART) {
      updateCartCountBadge();
    }
  });
}

function bindCartPageEvents() {
  document.querySelectorAll(".cart-page-qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = ProductStore.getById(btn.dataset.id);
      if (!product) return;

      const currentItem = CartStore.getById(product.id);
      const quantity =
        btn.dataset.action === "increase"
          ? (currentItem ? currentItem.quantity : 0) + 1
          : (currentItem ? currentItem.quantity : 1) - 1;

      CartStore.updateQuantity(product.id, quantity);
      showToast(`${product.name} quantity updated`);
      renderCartPage();
      window.dispatchEvent(
        new CustomEvent("cart:updated", { detail: { id: product.id } }),
      );
    });
  });

  document.querySelectorAll(".cart-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = ProductStore.getById(btn.dataset.id);
      if (!product) return;

      CartStore.updateQuantity(product.id, 0);
      showToast(`${product.name} removed from cart`);
      renderCartPage();
      window.dispatchEvent(
        new CustomEvent("cart:updated", { detail: { id: product.id } }),
      );
    });
  });

  const clearButton = document.getElementById("clear-cart-btn");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      CartStore.clear();
      renderCartPage();
      window.dispatchEvent(new CustomEvent("cart:updated"));
      showToast("Cart cleared");
    });
  }

  const buyNowButton = document.getElementById("buy-now-cart-btn");
  if (buyNowButton) {
    buyNowButton.addEventListener("click", () => {
      const items = CartStore.getAll();
      if (!items.length) {
        showToast("Your cart is empty");
        return;
      }

      orderOnWhatsApp("Cart Order", 0, items);
      showToast("Opening WhatsApp order");
    });
  }
}

function renderCartPage() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  if (!container) return;

  const items = CartStore.getAll();
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );
  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add products from the catalog to see them here.</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    if (summary) summary.innerHTML = "";
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <div class="cart-item-card">
          <img class="cart-item-image" src="${item.image || "images/products/placeholder.svg"}" alt="${item.name}" onerror="this.src='images/products/placeholder.svg'">
          <div class="cart-item-content">
            <div class="cart-item-top">
              <div>
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">${formatPrice(item.price)} each</p>
              </div>
              <span class="cart-item-total">${formatPrice(Number(item.price) * Number(item.quantity))}</span>
            </div>
            <div class="cart-item-actions">
              <div class="cart-page-qty-control">
                <button class="cart-page-qty-btn cart-dec-btn" data-id="${item.id}" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span class="cart-page-qty-value">${item.quantity}</span>
                <button class="cart-page-qty-btn cart-inc-btn" data-id="${item.id}" data-action="increase" aria-label="Increase quantity">+</button>
              </div>
              <button class="btn btn-secondary btn-sm cart-remove-btn" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `,
    )
    .join("");

  if (summary) {
    summary.innerHTML = `
      <div class="cart-summary-card">
        <h3>Order Summary</h3>
        <div class="cart-summary-row">
          <span>${totalItems} item(s)</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="cart-summary-row highlight">
          <span>Total</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="cart-summary-actions">
          <button id="clear-cart-btn" class="btn btn-secondary btn-full">Clear Cart</button>
          <button id="buy-now-cart-btn" class="btn btn-primary btn-full">Buy Now</button>
        </div>
        <p class="cart-note">Your order details will be shared with us through WhatsApp.</p>
      </div>
    `;
  }

  bindCartPageEvents();
  updateCartCountBadge();
}

/* ---------- Generate Product Card HTML ---------- */
function createProductCard(product, options = {}) {
  const { showDetails = false, compact = false } = options;
  const imgSrc = product.image || "images/products/placeholder.svg";
  const desc = product.description || "";
  const truncatedDesc =
    desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  const cartItem = CartStore.getById(product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  return `
    <article class="product-card animate-on-scroll" data-id="${product.id}">
      <div class="product-image">
        <img src="${imgSrc}" alt="${product.name}" loading="eager" onerror="this.src='${DEFAULT_IMAGE}'">
        <span class="product-badge">${product.category}</span>
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${truncatedDesc}</p>
        <div class="product-price">${formatPrice(product.price)}</div>
        <div class="product-actions">
          <div class="product-cart-action">
            ${
              cartQty > 0
                ? `
              <div class="cart-quantity-control">
                <button class="cart-qty-btn cart-dec-btn" data-id="${product.id}" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span class="cart-qty-value">${cartQty}</span>
                <button class="cart-qty-btn cart-inc-btn" data-id="${product.id}" data-action="increase" aria-label="Increase quantity">+</button>
              </div>
            `
                : `
              <button class="cart-icon-btn add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">🛒</button>
            `
            }
          </div>
          ${showDetails ? `<button class="btn btn-secondary btn-sm view-details-btn" data-id="${product.id}">View Details</button>` : ""}
          <button class="btn btn-primary btn-sm buy-now-btn" data-name="${product.name}" data-price="${product.price}">Buy Now</button>
          <button class="btn btn-whatsapp btn-sm whatsapp-btn" data-name="${product.name}" data-price="${product.price}">📱 WhatsApp</button>
        </div>
      </div>
    </article>
  `;
}

/* ---------- Render Featured Products ---------- */
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const products = ProductStore.getFeatured();
  if (products.length === 0) {
    container.innerHTML =
      '<p class="text-center no-results">No featured products available.</p>';
    return;
  }

  container.innerHTML = products.map((p) => createProductCard(p)).join("");
  bindProductButtons(container);
  initScrollAnimations();
}

/* ---------- Refresh a Single Product Card ---------- */
function refreshProductCard(productId, container = document) {
  const card = container.querySelector(`.product-card[data-id="${productId}"]`);
  if (!card) return;

  const product = ProductStore.getById(productId);
  if (!product) return;

  const showDetails = Boolean(card.querySelector(".view-details-btn"));
  card.outerHTML = createProductCard(product, { showDetails });
  bindProductButtons(container);
}

/* ---------- Bind Product Action Buttons ---------- */
function bindProductButtons(container = document) {
  container.querySelectorAll(".whatsapp-btn, .buy-now-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      orderOnWhatsApp(name, price);
    });
  });

  container.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = ProductStore.getById(btn.dataset.id);
      if (product) showProductModal(product);
    });
  });

  container.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = ProductStore.getById(btn.dataset.id);
      if (!product) return;

      CartStore.add(product);
      showToast(`${product.name} added to cart`);
      refreshProductCard(product.id, container);
      window.dispatchEvent(
        new CustomEvent("cart:updated", { detail: { id: product.id } }),
      );
    });
  });

  container.querySelectorAll(".cart-qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = ProductStore.getById(btn.dataset.id);
      if (!product) return;

      const currentItem = CartStore.getById(product.id);
      const quantity =
        btn.dataset.action === "increase"
          ? (currentItem ? currentItem.quantity : 0) + 1
          : (currentItem ? currentItem.quantity : 1) - 1;

      CartStore.updateQuantity(product.id, quantity);
      showToast(`${product.name} quantity updated`);
      refreshProductCard(product.id, container);
      window.dispatchEvent(
        new CustomEvent("cart:updated", { detail: { id: product.id } }),
      );
    });
  });
}

/* ---------- Product Detail Modal ---------- */
function showProductModal(product) {
  let modal = document.getElementById("product-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "product-modal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const imgSrc = product.image || DEFAULT_IMAGE;
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${product.name}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <img class="modal-product-img" src="${imgSrc}" alt="${product.name}" onerror="this.src='${DEFAULT_IMAGE}'">
        <div class="product-price mb-1">${formatPrice(product.price)}</div>
        <div class="modal-detail-group">
          <h4>Description</h4>
          <p>${product.description}</p>
        </div>
        <div class="modal-detail-group">
          <h4>Benefits</h4>
          <p>${product.benefits}</p>
        </div>
        <div class="modal-detail-group">
          <h4>Usage</h4>
          <p>${product.usage}</p>
        </div>
        <div class="product-actions mt-1">
          <button class="btn btn-primary whatsapp-btn" data-name="${product.name}" data-price="${product.price}">Order on WhatsApp</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal
    .querySelector(".modal-close")
    .addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
  bindProductButtons(modal);
}

/* ---------- Loading Screen ---------- */
function initLoadingScreen() {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 800);
  });
}

/* ---------- Sticky Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Highlight active nav link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------- Dark Mode Toggle ---------- */
function initDarkMode() {
  const toggle = document.getElementById("dark-mode-toggle");
  const savedTheme = Storage.get(STORAGE_KEYS.THEME, "light");

  document.documentElement.setAttribute("data-theme", savedTheme);
  if (toggle) toggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      Storage.set(STORAGE_KEYS.THEME, next);
      toggle.textContent = next === "dark" ? "☀️" : "🌙";
    });
  }
}

/* ---------- Back to Top Button ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".animate-on-scroll:not(.animated)",
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Testimonials Slider ---------- */
function initTestimonialsSlider() {
  const track = document.querySelector(".testimonial-track");
  const dots = document.querySelectorAll(".slider-dot");
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;

  function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  setInterval(() => goToSlide((current + 1) % total), 5000);
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isActive = item.classList.contains("active");

      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

/* ---------- Newsletter Subscription ---------- */
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) return;

    const subscribers = Storage.get(STORAGE_KEYS.NEWSLETTER, []);
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      Storage.set(STORAGE_KEYS.NEWSLETTER, subscribers);
    }

    showPopup("Subscribed!", "Thank you for subscribing to our newsletter.");
    form.reset();
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enquiry = {
      name: form.querySelector("#contact-name").value.trim(),
      mobile: form.querySelector("#contact-mobile").value.trim(),
      email: form.querySelector("#contact-email").value.trim(),
      message: form.querySelector("#contact-message").value.trim(),
    };

    if (!enquiry.name || !enquiry.mobile || !enquiry.message) {
      showToast("Please fill in all required fields.");
      return;
    }

    EnquiryStore.add(enquiry);
    showPopup(
      "Message Sent!",
      "Thank you for contacting us. We will get back to you soon.",
    );
    form.reset();
  });
}

/* ---------- Popup & Toast ---------- */
function showPopup(title, message) {
  let popup = document.getElementById("success-popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "success-popup";
    popup.className = "popup-overlay";
    document.body.appendChild(popup);
  }

  popup.innerHTML = `
    <div class="popup-box">
      <div class="popup-icon">✅</div>
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="btn btn-primary popup-close-btn">OK</button>
    </div>
  `;

  popup.classList.add("active");
  popup.querySelector(".popup-close-btn").addEventListener("click", () => {
    popup.classList.remove("active");
  });
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("active");
  });
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ---------- Legal Modals (Privacy & Terms) ---------- */
function initLegalModals() {
  document.querySelectorAll("[data-legal]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const type = link.dataset.legal;
      showLegalModal(type);
    });
  });
}

function showLegalModal(type) {
  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  };

  const contents = {
    privacy: `
      <h4>Information Collection</h4>
      <p>We collect personal information such as name, email, and phone number only when you voluntarily submit our contact form or place an order.</p>
      <h4>Data Usage</h4>
      <p>Your information is used solely to process orders, respond to enquiries, and improve our services. We never sell your data to third parties.</p>
      <h4>Data Security</h4>
      <p>We implement appropriate security measures to protect your personal information stored locally and during communication.</p>
      <h4>Contact</h4>
      <p>For privacy-related queries, contact us at info@sriherbalcare.com or call +91 ${WHATSAPP_NUMBER}.</p>
    `,
    terms: `
      <h4>Product Information</h4>
      <p>All product descriptions and benefits are based on traditional herbal knowledge. Results may vary. Consult a healthcare professional before use.</p>
      <h4>Orders & Payments</h4>
      <p>Orders are placed via WhatsApp. Payment terms will be communicated directly. Prices are subject to change without notice.</p>
      <h4>Shipping & Returns</h4>
      <p>We aim for fast delivery across India. Returns are accepted within 7 days for unopened products with manufacturing defects.</p>
      <h4>Liability</h4>
      <p>${COMPANY_NAME} is not liable for any adverse reactions. Use products as directed and discontinue if any allergic reaction occurs.</p>
    `,
  };

  let modal = document.getElementById("legal-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "legal-modal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${titles[type]}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body legal-content">${contents[type]}</div>
    </div>
  `;

  modal.classList.add("active");
  modal
    .querySelector(".modal-close")
    .addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
}

/* ---------- Auth Check (for dashboard redirect) ---------- */
const Auth = {
  isLoggedIn() {
    return Storage.get(STORAGE_KEYS.AUTH, null) === true;
  },

  login() {
    Storage.set(STORAGE_KEYS.AUTH, true);
  },

  logout() {
    Storage.remove(STORAGE_KEYS.AUTH);
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  },
};

/* ---------- Initialize App ---------- */
document.addEventListener("DOMContentLoaded", () => {
  ProductStore.init();
  initLoadingScreen();
  initNavbar();
  initDarkMode();
  initBackToTop();
  initScrollAnimations();
  initTestimonialsSlider();
  initFAQ();
  initNewsletter();
  initContactForm();
  initLegalModals();
  initCartNavButton();
  renderFeaturedProducts();

  if (
    document.getElementById("cart-items") ||
    document.getElementById("cart-summary")
  ) {
    renderCartPage();
  }
});

/* ---------- Export for other modules ---------- */
window.SHC = {
  STORAGE_KEYS,
  WHATSAPP_NUMBER,
  COMPANY_NAME,
  Storage,
  ProductStore,
  CartStore,
  EnquiryStore,
  OrderStore,
  Auth,
  orderOnWhatsApp,
  formatPrice,
  renderCartPage,
  initCartNavButton,
  createProductCard,
  bindProductButtons,
  showProductModal,
  showPopup,
  showToast,
  renderFeaturedProducts,
};

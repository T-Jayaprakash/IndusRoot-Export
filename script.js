/**
 * INDUS ROOTS EXPORTS — Interactive Engine & Routing Logic
 * Handles dynamic product details, product-aware inquiries, WhatsApp generators,
 * search/filter systems, and responsive navigation.
 */

// Official Company Contact Information
const COMPANY_CONFIG = {
  name: "Indus Roots Exports",
  whatsappNumber: "919443322110", // Primary business WhatsApp (Tamil Nadu, India)
  email: "exports@indusroots.com",
  phone: "+91 94433 22110",
  address: "Pollachi - Coimbatore Agri & Coir Corridor, Tamil Nadu, India",
  ports: "Tuticorin (V.O. Chidambaranar) & Chennai Ports"
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDynamicProductDetails();
  initProductCatalog();
  initQuoteAndInquiryForms();
  initAccordions();
  initFloatingWhatsApp();
  highlightActiveNav();
});

/**
 * 1. Navigation & Mobile Drawer
 */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Highlights current active link in header & mobile nav
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
}

/**
 * 2. Dynamic Product Catalog (products.html)
 */
function initProductCatalog() {
  const catalogGrid = document.getElementById('catalogGrid');
  if (!catalogGrid || typeof PRODUCTS_DATA === 'undefined') return;

  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('productSearchInput');
  const resultCount = document.getElementById('resultCount');

  let currentCategory = 'all';
  let searchQuery = '';

  function renderProducts() {
    const filtered = PRODUCTS_DATA.filter(p => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      const matchQuery = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery) ||
        p.shortDesc.toLowerCase().includes(searchQuery) ||
        p.categoryLabel.toLowerCase().includes(searchQuery);
      return matchCat && matchQuery;
    });

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} products`;
    }

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border: 1px solid var(--line); border-radius: var(--radius-md);">
          <h3 style="margin-bottom: 8px;">No matching products found</h3>
          <p style="color: var(--muted); margin-bottom: 20px;">Try adjusting your keyword or browse by category.</p>
          <button class="btn btn-outline btn-sm" onclick="resetProductFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    catalogGrid.innerHTML = filtered.map(p => `
      <article class="product-card" data-category="${p.category}">
        <div class="product-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="product-badge">${p.badge}</span>
        </div>
        <div class="product-card-body">
          <div class="product-category">${p.categoryLabel}</div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-desc">${p.shortDesc}</p>
          <div class="product-card-footer">
            <a href="product-details.html?product=${p.id}" class="btn btn-outline btn-sm">
              View Product Details →
            </a>
            <a href="quote.html?product=${encodeURIComponent(p.name)}" class="btn btn-primary btn-sm">
              Send Inquiry
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  window.resetProductFilters = function() {
    currentCategory = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
    renderProducts();
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Initial render
  renderProducts();
}

/**
 * 3. Dynamic Product Details Page (product-details.html)
 */
function initDynamicProductDetails() {
  const detailContainer = document.getElementById('productDetailContainer');
  if (!detailContainer || typeof PRODUCTS_DATA === 'undefined') return;

  // Retrieve query param: ?product=... or ?id=...
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('product') || urlParams.get('id') || 'cocopeat-5kg-blocks';

  // Find product by id or fuzzy name
  let product = PRODUCTS_DATA.find(p => p.id === requestedId || p.name.toLowerCase() === requestedId.toLowerCase());
  if (!product) {
    // Fallback to first product
    product = PRODUCTS_DATA[0];
  }

  // Update Page Title
  document.title = `${product.name} Specifications | Indus Roots Exports`;

  // Breadcrumb
  const breadcrumbEl = document.getElementById('productBreadcrumb');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `
      <a href="index.html">Home</a>
      <span class="breadcrumb-sep">/</span>
      <a href="products.html">Products</a>
      <span class="breadcrumb-sep">/</span>
      <span class="active">${product.name}</span>
    `;
  }

  // Fill in Gallery
  const mainImg = document.getElementById('productMainImage');
  const thumbsContainer = document.getElementById('productThumbnails');
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
  }
  if (thumbsContainer && product.gallery) {
    thumbsContainer.innerHTML = product.gallery.map((imgSrc, idx) => `
      <button class="thumb-btn ${idx === 0 ? 'active' : ''}" onclick="switchProductImage('${imgSrc}', this)" aria-label="View gallery photo ${idx + 1}">
        <img src="${imgSrc}" alt="${product.name} view ${idx + 1}">
      </button>
    `).join('');
  }

  window.switchProductImage = function(src, btn) {
    if (mainImg) mainImg.src = src;
    document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

  // Fill Meta Tags
  const metaContainer = document.getElementById('productMetaTags');
  if (metaContainer) {
    metaContainer.innerHTML = `
      <span class="meta-tag gold">${product.categoryLabel}</span>
      <span class="meta-tag green">${product.badge}</span>
      <span class="meta-tag">Origin: Tamil Nadu, India</span>
    `;
  }

  // Title & Descriptions
  const titleEl = document.getElementById('productTitle');
  if (titleEl) titleEl.textContent = product.name;

  const descEl = document.getElementById('productDescription');
  if (descEl) descEl.textContent = product.fullDesc;

  // Specifications Table
  const specTbody = document.getElementById('specTableBody');
  if (specTbody && product.specs) {
    specTbody.innerHTML = Object.entries(product.specs).map(([key, val]) => `
      <tr>
        <th>${key}</th>
        <td>${val}</td>
      </tr>
    `).join('');
  }

  // Applications List
  const appsList = document.getElementById('productApplications');
  if (appsList && product.applications) {
    appsList.innerHTML = product.applications.map(app => `
      <li style="margin-bottom: 8px; display: flex; align-items: baseline; gap: 8px;">
        <span style="color: var(--green); font-weight: 800;">✓</span>
        <span>${app}</span>
      </li>
    `).join('');
  }

  // Inquiry CTA Links
  const quoteCta = document.getElementById('productQuoteCta');
  if (quoteCta) {
    quoteCta.href = `quote.html?product=${encodeURIComponent(product.name)}`;
  }

  const whatsappCta = document.getElementById('productWhatsAppCta');
  if (whatsappCta) {
    const waText = encodeURIComponent(
      `Hello Indus Roots Exports,\n\nI am interested in importing *${product.name}* from India.\n\nPlease share current pricing, technical specifications, and shipping schedules to my destination.\n\nThank you!`
    );
    whatsappCta.href = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${waText}`;
  }
}

/**
 * 4. Request a Quote & Inquiry Forms (quote.html, modal inquiry, contact form)
 */
function initQuoteAndInquiryForms() {
  // Check if we are on quote.html and pre-fill the product field if specified in URL
  const productSelect = document.querySelector('select[name="product"], input[name="product"]');
  if (productSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramProduct = urlParams.get('product');
    if (paramProduct) {
      if (productSelect.tagName === 'SELECT') {
        let matched = false;
        const cleanParam = paramProduct.trim().toLowerCase();
        Array.from(productSelect.options).forEach(opt => {
          if (!opt.value) return;
          const optVal = opt.value.toLowerCase();
          const optText = opt.text.toLowerCase();
          if (optVal.includes(cleanParam) || cleanParam.includes(optVal) ||
              optText.includes(cleanParam) || cleanParam.includes(optText)) {
            opt.selected = true;
            productSelect.value = opt.value;
            matched = true;
          }
        });
        if (!matched && cleanParam) {
          const newOpt = new Option(paramProduct, paramProduct, true, true);
          productSelect.add(newOpt);
          productSelect.value = paramProduct;
        }
      } else {
        productSelect.value = paramProduct;
      }
    }
  }

  // Handle RFQ Form Submission
  const rfqForm = document.getElementById('rfqForm');
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!rfqForm.checkValidity()) {
        rfqForm.reportValidity();
        return;
      }

      const formData = new FormData(rfqForm);
      const name = formData.get('name') || '';
      const company = formData.get('company') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const country = formData.get('country') || '';
      const product = formData.get('product') || 'Export Products';
      const quantity = formData.get('quantity') || 'Unspecified';
      const targetPrice = formData.get('target_price') || 'Market Rate';
      const deliveryPort = formData.get('delivery_port') || 'To be discussed';
      const incoterm = formData.get('incoterm') || 'CIF';
      const message = formData.get('message') || '';

      // Prepare Structured WhatsApp text
      const waMessage = 
`*New Import Inquiry — Indus Roots Exports*
----------------------------------------
*Product:* ${product}
*Quantity Required:* ${quantity}
*Target Price / Terms:* ${targetPrice} (${incoterm})
*Destination Port:* ${deliveryPort}

*Buyer Details:*
• *Name:* ${name}
• *Company:* ${company}
• *Country:* ${country}
• *Email:* ${email}
• *Phone / WhatsApp:* ${phone}

*Additional Notes:*
${message || 'Please provide quotation, COA and earliest shipping schedule.'}`;

      const waUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

      // Prepare mailto fallback
      const mailSubject = encodeURIComponent(`Import Quotation Request: ${product} - ${company || name}`);
      const mailBody = encodeURIComponent(
`Dear Indus Roots Exports Team,

I would like to request an official quotation for the following requirement:

Product: ${product}
Quantity Required: ${quantity}
Destination Port / Incoterms: ${deliveryPort} (${incoterm})
Target Price: ${targetPrice}

Buyer Information:
Name: ${name}
Company: ${company}
Country: ${country}
Email: ${email}
Phone / WhatsApp: ${phone}

Additional Requirements:
${message}

Please share commercial invoice / quotation with delivery schedules at your earliest convenience.

Best regards,
${name}`
      );
      const mailtoUrl = `mailto:${COMPANY_CONFIG.email}?subject=${mailSubject}&body=${mailBody}`;

      // Open Confirmation Modal with both WhatsApp and Email options!
      showInquirySuccessModal({
        product,
        quantity,
        country,
        waUrl,
        mailtoUrl
      });
    });
  }

  // Handle Contact Us Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const company = formData.get('company') || '';
      const email = formData.get('email');
      const phone = formData.get('phone') || '';
      const subject = formData.get('subject') || 'General Trade Inquiry';
      const message = formData.get('message');

      const waText = encodeURIComponent(
`*Contact Message — Indus Roots Exports*
From: ${name} (${company || 'Individual'})
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`
      );
      const waUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${waText}`;
      
      showInquirySuccessModal({
        product: subject,
        quantity: "Contact Message",
        country: "General Inquiry",
        waUrl,
        mailtoUrl: `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
      });
    });
  }
}

/**
 * Shows interactive confirmation modal with instant WhatsApp jump
 */
function showInquirySuccessModal(data) {
  let modalOverlay = document.getElementById('inquirySuccessModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'inquirySuccessModal';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-head">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: var(--green-soft); color: var(--green); align-items: center; justify-content: center; font-weight: 800;">✓</span>
          <h3>Inquiry Ready</h3>
        </div>
        <button class="modal-close-btn" onclick="closeInquiryModal()" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: 15px; margin-bottom: 16px;">
          Your inquiry for <strong>${data.product}</strong> has been structured and recorded. 
        </p>
        <div style="background: var(--bg-soft); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px; font-size: 13.5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--muted);">Product:</span>
            <strong>${data.product}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--muted);">Quantity:</span>
            <span>${data.quantity}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--muted);">Destination:</span>
            <span>${data.country}</span>
          </div>
        </div>
        <p style="font-size: 14px; color: var(--muted); margin-bottom: 24px;">
          For fastest response and real-time shipment updates, continue directly on WhatsApp or open your email client:
        </p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <a href="${data.waUrl}" target="_blank" class="btn btn-whatsapp btn-lg" style="width: 100%;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.96.523 1.83.801 2.809.801 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.783-5.77-5.783zm9.969 5.766c0 5.514-4.486 10-10 10-1.823 0-3.528-.49-4.996-1.341l-5.004 1.314 1.336-4.882c-.938-1.507-1.472-3.28-1.472-5.091 0-5.514 4.486-10 10-10s10 4.486 10 10z"/></svg>
            Continue on WhatsApp (Direct Trade Desk) →
          </a>
          <a href="${data.mailtoUrl}" class="btn btn-outline" style="width: 100%;">
            Send via Default Email Application ✉
          </a>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-sm btn-outline" onclick="closeInquiryModal()">Close</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  window.closeInquiryModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
}

/**
 * 5. Accordion (FAQ toggles)
 */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      
      // Close peers in same accordion
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
        });
      }
      
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 6. Global Floating WhatsApp Button
 */
function initFloatingWhatsApp() {
  // If button already exists in HTML, attach default event or fallback
  const floatBtn = document.querySelector('.floating-whatsapp');
  if (floatBtn && !floatBtn.getAttribute('href')) {
    const defaultText = encodeURIComponent("Hello Indus Roots Exports, I would like to inquire about your export products and sourcing capabilities from India.");
    floatBtn.setAttribute('href', `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${defaultText}`);
    floatBtn.setAttribute('target', '_blank');
  }
}

# Indus Roots Exports — Corporate Website

> **Rooted in India. Connected to the World.**  
> *Connecting India's Roots to Global Markets.*

A modern, premium, professional multi-page website built for **Indus Roots Exports**, an international export house based in the Pollachi and Coimbatore agricultural corridor of Tamil Nadu, India.

---

## 🌍 Overview

Indus Roots Exports connects international buyers with high-grade, verified products from South India's agricultural and coir heartland. The company focuses on:
- **Indus Coirs**: Washed low-EC cocopeat 5kg blocks, commercial greenhouse grow bags, and retail briquettes.
- **Indus Fresh**: Fresh agricultural produce including tender moringa drumsticks, indigenous small pink shallots, G4 green chillies, and G9 Cavendish bananas.
- **Customized Commodities**: Bulk sourcing of Indian spices (Malabar black pepper, turmeric), semi-husked coconuts, and coir geo-textiles.

---

## 📑 Website Structure (19 Individual HTML Pages)

The website is architected as a fully modular, multi-page platform where every section has its own dedicated HTML file:

1. **[index.html](index.html)** — Corporate Homepage (Hero, core divisions, stats, Why Tamil Nadu, 5-step process summary, global footer)
2. **[about.html](about.html)** — About Us (Story, founders Sheeba Swaminathan & Prince Pandian, mission, vision, operational capabilities)
3. **[products.html](products.html)** — Export Products Catalog (Dynamic category filter tabs, live search bar, product counter)
4. **[product-details.html](product-details.html)** — Dynamic Product Specifications (Gallery switcher, technical parameters table, applications, direct inquiry trigger)
5. **[services.html](services.html)** — Import & Export Services (Sourcing, export coordination, private labeling, laboratory testing, customs documentation)
6. **[global-presence.html](global-presence.html)** — Global Reach & Countries Served (UAE, Saudi Arabia, Qatar, Oman, Singapore, Malaysia, UK, USA, Netherlands, South Africa, Mauritius)
7. **[industries.html](industries.html)** — Industries & Applications (Greenhouses, wholesale produce, food processing, nurseries, landscaping)
8. **[quality-compliance.html](quality-compliance.html)** — Quality & Compliance (6-stage quality cycle, EC & pH testing, APEDA standards)
9. **[supply-chain.html](supply-chain.html)** — Supply Chain Process (7-stage workflow: Requirement → Sourcing → Verification → Packaging → Documentation → Shipping → Delivery)
10. **[infrastructure.html](infrastructure.html)** — Infrastructure & Facilities (Pollachi drying yards, hydraulic baling presses, cold chain packhouse, Tuticorin/Chennai port stuffing)
11. **[certifications.html](certifications.html)** — Certifications & Accreditations (DGFT IEC, APEDA, Coir Board of India, Phytosanitary inspection, Fumigation)
12. **[why-choose-us.html](why-choose-us.html)** — Why Choose Us (Differentiators, comparison matrix vs. brokers, interactive FAQ accordion)
13. **[sustainability.html](sustainability.html)** — Sustainability & Environmental Stewardship (Renewable coir replacing peat moss, solar curing, water stewardship, fair farmer wages)
14. **[blog.html](blog.html)** — Market Insights & Blog (Technical trade guides, cold chain logistics, substrate trends)
15. **[blog-single.html](blog-single.html)** — Technical Guide: *"Guide to Importing Indian Cocopeat Blocks: EC & Expansion Standards"*
16. **[contact.html](contact.html)** — Contact Us (Tamil Nadu headquarters, phone, email, WhatsApp, interactive contact form, embedded Google Map)
17. **[quote.html](quote.html)** — Request a Quote (RFQ) (Product-aware form, auto-population, WhatsApp message generator, confirmation modal)
18. **[privacy.html](privacy.html)** — Privacy Policy (Commercial data protection and non-disclosure terms)
19. **[terms.html](terms.html)** — Terms & Conditions (Incoterms 2020 definitions, inspection rights, biosecurity compliance)

---

## 🚀 Key Functional Features

- **Product-Aware Inquiry System**: Clicking *"Request Product Inquiry"* or *"Send Inquiry"* on any product card or details page carries the product name to `quote.html?product=...` and automatically selects it.
- **WhatsApp Integration**: Automatically generates structured, professional trade inquiry messages ready to send via WhatsApp:
  ```text
  *New Import Inquiry — Indus Roots Exports*
  ----------------------------------------
  *Product:* Cocopeat 5kg Blocks
  *Quantity Required:* 1 x 40ft HC Container
  *Destination Port:* Jebel Ali Port, Dubai
  ...
  ```
- **Global Floating WhatsApp Widget**: Positioned discreetly in the lower-right corner across all 19 pages for instant trade desk access.
- **SEO & Search Indexing**: Complete `sitemap.xml` and `robots.txt` included with descriptive metadata on every page.
- **Responsive Navigation**: Mobile navigation drawer with hamburger toggle designed for smooth smartphone and tablet browsing.

---

## 🛠 Tech Stack

- **HTML5**: Semantic markup, accessible forms, and structured schema.
- **CSS3**: Custom design system in `style.css` (variables, responsive grids, data tables, modal dialogs).
- **JavaScript**: Client-side logic in `script.js` and product database in `products-data.js`.
- **Assets**: High-resolution trade imagery and official brand logo in `assets/`.

---

## 💻 Running Locally

Simply run any static web server in the project directory:

```bash
# Using Python
python -m http.server 8080

# Or using Node.js / npx
npx serve .
```

Then open `http://localhost:8080` in your web browser.

---

## 📞 Direct Trade Desk

- **WhatsApp / Phone**: [+91 96293 00614](https://wa.me/919629300614)
- **Email**: exports@indusroots.com
- **Location**: Pollachi - Coimbatore Agri Corridor, Tamil Nadu, India

---

## 📄 License & Attribution

© 2026 **Indus Roots Exports**. All rights reserved.  
Connecting India's Roots to Global Markets.

# Indus Roots Exports — Website

> Connecting India's Roots to Global Markets

Static website for **Indus Roots Exports** (Pudukkottai, Tamil Nadu), exporters of:

- **Indus Coirs**: Cocopeat 5 kg, 1 kg and 650 g blocks, grow bag slabs, husk chips, animal bedding
- **Indus Fresh**: Coconut, garlic, curry leaves, cilantro, green chilli

The layout follows the client's reference site (virglowventures.in): split hero, "Grow Better" intro, product cards, Our Story with Mission / Vision / Values, photo dome, "Let's Talk" form and map.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home |
| `products.html` | All products with sizes, packing and specifications (`#indus-coirs`, `#indus-fresh`, `#specifications`, one anchor per product) |
| `about.html` | Story, mission / vision / values, leadership |
| `contact.html` | Contact details, enquiry form, map. `contact.html?product=Garlic` pre-selects a product |
| `privacy.html`, `terms.html` | Legal |
| `404.html` | Not-found page |

Old pages from the first version (blog, services, quote, etc.) are permanently redirected in `vercel.json`.

## How things work

- **Enquiry form** (`script.js`): validates the form, then opens WhatsApp (+91 88701 00614) or the visitor's email app (exports@indusroots.com) with the enquiry pre-filled. No backend is needed. To change the number or email, edit `WHATSAPP_NUMBER` / `EMAIL` at the top of `script.js` and the links in the HTML.
- **Language selector**: uses Google Translate. The Google script loads only after a visitor picks a language other than English. Brand names are marked `translate="no"`.
- **Images**: `assets/img/*.webp`, each with a `-800.webp` copy for phones. `assets/img/og-image.jpg` is the link-preview image for WhatsApp, LinkedIn and Facebook.
- **Colour themes**: two brand themes, Navy &amp; Gold (`navy`, the default) and Gold &amp; Navy (`gold`). All colours are CSS variables under `[data-theme="…"]` at the top of `style.css`. `theme.js` applies the theme before the page paints. `/admin` previews and switches the theme in your own browser and copies preview links like `/?theme=gold`. To change the theme every visitor sees, set `DEFAULT_THEME` in `theme.js`.
- **No build step.** Edit the HTML directly. Header and footer are repeated in every page, so change them in all 7 files.

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Photo credits

All photographs are real photos (no AI-generated images).

- Unsplash and Pexels photos are used under their free licences (no attribution required).
- `cocopeat-1kg-seedling-trays.webp`: "Coco peat" by Lawrence756, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons (credited on the products page)
- `coir-yard-tamil-nadu.webp`: "Tamilnadu coconut coir business culture" by PeterKeerthi, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons (credited on the about page)

Replace the stock product photos with the client's own factory and product photos when they become available, using the same file names and similar proportions.

## To confirm with the client

- Product specifications and sizes on `products.html` (EC, pH, block and slab sizes, expansion, chip sizes)
- Whether `exports@indusroots.com` is live, and which number should receive WhatsApp enquiries
- Domain (`indusroots.com` is used in canonical URLs, `sitemap.xml` and `robots.txt`)
- Social media profile links, if any (none are shown yet)

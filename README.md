# Laxmi’s Kitchen — e-menu

A fast, standalone e-menu for **Laxmi’s Kitchen**, a home-style vegetarian kitchen in
Ambegaon Bk, Pune. Built as a static site with no framework and no build step, so it can
be published directly on GitHub Pages and opened from a QR code.

## What’s inside

- Warm editorial design with self-hosted Fraunces + DM Sans fonts
- 35 dishes with a photo, name, short description and price
- Category navigation with scroll spy, live search, and “house favourite” tags
- Featured dishes, tiffin callout, opening hours, phone, email and address
- Keyboard search (`/`), reduced-motion support, print styles
- `qr.html` — a browser-only QR table-card generator (open it directly; it is not linked from the footer)
- GitHub Pages deploy workflow

## Preview locally

The site uses plain files, so any static server works.

```bash
# from the project root
python -m http.server 8000
# then open http://localhost:8000
```

You can also open `index.html` directly, but a local server is recommended so the
fonts and relative paths behave exactly as they will online.

## Editing the menu

All content lives in **`assets/js/menu-data.js`**.

- Change a price: edit the `price` string, e.g. `price: "120"`.
- Half/full pricing: use `"75 / 120"` and set `priceNote: "Half / full"`.
- Mark a dish as a favourite: add `popular: true`.
- Rename a dish or change a description: edit `name` / `description`.
- Change the featured row: edit the `featured` array at the top.

The dish `slug` is also the image file name. If you change a slug, rename the image to
match (for example `paneer-kadhai.webp`).

## Replacing the photos

The current images were cropped from the supplied menu-photo sheet and are intentionally
small. For a sharper result, replace them with original photographs.

Recommended specs:

- **1:1 square**, at least **1200 × 1200 px** (the site renders them in a square crop)
- Natural daylight, 45° angle, dish filling most of the frame
- Warm, neutral background — wood, linen or ceramic works well with the palette
- Export as WebP (quality ~82) or JPG (quality ~85)
- Keep the same file names in `assets/images/menu/`

The 35 file names are:

```
bread-pakoda        vada-paav           samosa              poha
idli-sambhar        veg-sandwich        veg-grilled-sandwich veg-hakka-noodles
veg-manchurian      veg-chilli-paneer   puri-bhaji          paav-bhaji
veg-thali           veg-biryani         dal-fry             dal-tadka
aloo-matar          aloo-palak          bhindi-masala       bhindi-fry
aloo-jeera          mix-veg             veg-kadhai          paneer-kadhai
shahi-paneer        palak-paneer        paneer-bhurji       paneer-do-pyaza
wheat-roti          butter-wheat-roti   jeera-rice          veg-pulao
paneer-pulao        steam-rice          dal-khichdi
```

> The featured-row images are `veg-thali.webp`, `idli-sambhar.webp` and
> `paneer-kadhai.webp`.

If a photo is missing, the browser will show the dish name as the image alt text; the
layout will still work. The footer already says “Photographs are representative of our
dishes” — keep or remove that line as you prefer.

## Publish on GitHub Pages

1. Create a GitHub repository and push this folder to `main`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) publishes the site on every
   push to `main`.
5. The menu will be live at `https://<username>.github.io/<repository>/`.

If you prefer the simpler branch deployment, choose **Deploy from a branch → main → / (root)**
instead. The site works either way because there is no build step.

After publishing, update the QR page with the live URL.

## QR table card

Open **`/qr.html`** (for example `https://<username>.github.io/<repository>/qr.html`).

1. Paste the published menu link. It auto-fills with the current site URL when possible.
2. Check the live QR preview.
3. Use **Print card** for an A5 table card, or download **PNG / SVG** for
   table tents, takeaway bags, Instagram or WhatsApp.

Everything is generated in the browser; no data leaves the page.

## Project structure

```
index.html                  Menu page
qr.html                     QR table-card generator
assets/
  css/styles.css            Main styles
  css/qr.css                QR page + print styles
  js/menu-data.js           All menu content (edit this)
  js/app.js                 Rendering, search, navigation, sharing
  js/qr.js                  QR generation
  js/qrcode.js              Vendored QR library (MIT)
  fonts/                    Self-hosted Fraunces + DM Sans
  images/menu/              Dish photos (35 WebP files)
  images/og-cover.jpg       Social preview image
  favicon.svg               LK favicon
.github/workflows/deploy.yml
```

## Notes

- This is a frontend-only menu. It has no cart, payments or backend.
- Everything is vegetarian; prices are in INR and inclusive of taxes.
- The contact details and hours are taken from the existing menu material. Update
  `menu-data.js` and the footer if they change.
- This is a standalone project built for Laxmi’s Kitchen.

## Access 
Link to access

https://sarinkaavya19-ai.github.io/Laxmi-s-Kitchen/

Qr for the menu 

<img width="656" height="656" alt="laxmis-kitchen-qr" src="https://github.com/user-attachments/assets/86525cfc-4fdb-4685-801d-e93b30510c1c" />

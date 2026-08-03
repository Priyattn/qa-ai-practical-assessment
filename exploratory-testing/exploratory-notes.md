# Exploratory Testing Notes

**Assessment:** QA AI Practical Assessment  
**Tester:** AI-assisted + browser validation

---

## Session 1 — NEXA production scoping (read-only)

**Application:** https://www.nexaexperience.com/  
**Date:** 2026-07-31

**Focus:** What can be tested safely without submitting leads.

**Findings:**
- Homepage hero features **e-VITARA** with Explore Now / Build Your Own — not all models visible without opening **Cars** mega-menu.
- Model links exist in DOM but many are **hidden** in carousel/mega-menu until hover/click.
- Dealer locator at `/connect-to-dealer` with **CITY** and **PINCODE** tabs.
- Homepage showroom block: **Locate Your Nearest NEXA Showroom** + **Explore Nearby Showrooms** (scroll required).
- **Navigate** on dealer results may be button without `href`.
- Invalid pincode / remote location may **fall back to default regional dealers**.
- Invalid model URL loads without classic 404.

**Out of scope (confirmed):** Test drive, service booking, Book a Car, dealer contact forms.

---

## Session 2 — NEXA dealer locator edge behavior

**Date:** 2026-07-31

**Focus:** Empty search, obscure location, pincode path.

**Findings:**
- Empty CITY search: no crash; page stays functional.
- Pincode `000000`: no crash; may show default Delhi-area results.
- Mumbai city search: consistent showroom results with distance text.

---

## Session 3 — Toolshop catalog, login, checkout (Part B)

**Application:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com/  
**Date:** 2026-08-01 to 2026-08-03

**Focus:** Assessment Part B — login, cart, COD checkout, invoice API chain.

**Findings:**
- UI uses stable `data-test` attributes (`product-name`, `add-to-cart`, `proceed-1/2/3`, `finish`).
- Checkout flow: cart review → billing (`proceed-1`, `proceed-2`) → payment (`proceed-3`) → finish → **Confirm modal (twice)**.
- Billing requires `house_number` — empty field blocks proceed step.
- COD payment method value: `cash-on-delivery` in select `payment-method`.
- Success page shows **Thanks for your order** + invoice `INV-*` number.
- My Invoices under account lists historical invoices in table.
- API login: `POST /users/login` → `access_token` + `token_type: bearer`.
- Cart: `POST /carts` then `POST /carts/{id}` with `{ product_id, quantity }`.
- Invoice: `POST /invoices` with billing fields + `cart_id`.
- Demo product ULIDs **change when DB resets** — old ID `01KZ2S1DC7M30FSCZ69R0BHKZX` returned empty product page; refreshed to `01KZ2WFC8DM9KV0TCKB1MFSDRB`.

**Risks logged:**
- Product ID drift on demo resets (OBS-TS-01).
- Shared demo customer accumulates orders/invoices (non-blocking).

---

## Defects found during exploration

No functional defects logged as blockers. Production/demo behaviors documented as **test design constraints**.

See `defects/defect-report.md`.

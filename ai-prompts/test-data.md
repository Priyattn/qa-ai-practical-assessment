# AI Prompts — Test Data

**Session date:** 2026-07-31

---

## Entry 1

**Prompt:**

(Implicit — framework development and manual test design for AC1/AC2)

**AI Response Summary:**

### UI test data — `PrismStructure-playwright/ui/resources/data/dealerSearchData.json`

| Key | Value | Purpose |
|-----|-------|---------|
| `validCities` | Mumbai, Delhi, Bangalore | Positive dealer city search (TC-UI-09) |
| `noDealerLocation` | Lakshadweep | Remote city empty-state attempts |
| `invalidLocation` | ZZZNoDealerCity12345 | Fabricated city |
| `remotePincode` | `000000` | Invalid pincode — no crash validation (TC-UI-11) |
| `models.default` | `fronx` | Default model detail navigation |
| `models.alternatives` | baleno, grand-vitara, xl6 | Alternate models |
| `invalidModelPath` | `/nonexistent-car-xyz-999` | Negative URL test (TC-UI-06) |

### API test data — `PrismStructure-playwright/api/testdata/postPayload.json`

| Key | Purpose |
|-----|---------|
| `validPost` | TC-API-04 POST 201 — title, body, userId |
| `malformedPost` | TC-API-05 — non-string title, null body (no 5xx) |

### API endpoints — `PrismStructure-playwright/api/objects/postsApiPage.js`

- Base: `https://jsonplaceholder.typicode.com`
- Endpoints: `GET/POST /posts`, `GET /posts/{id}`
- Expected status: 200, 201, 404

### Manual test data notes

Manual cases use the same cities/pincodes in steps (e.g. Mumbai `400001`). Tester should document actual empty-state behavior on production for remote locations.

**Validation Notes:**
- Mumbai city search returns showroom results on live `/connect-to-dealer`.
- JSONPlaceholder POST does not persist — assertions on response shape only.

---

## Entry 2 — Toolshop test data (2026-08-03)

**Prompt:**

(Implicit — Toolshop Part B automation and manual test design)

**AI Response Summary:**

### Toolshop UI data — `ui/resources/data/`

| File | Key fields | Purpose |
|------|------------|---------|
| `toolshopUserData.json` | `customer.email/password`, `invalid` | Login (TC-TS-UI-02, TC-TS-UI-06) |
| `toolshopBillingData.json` | country, postal_code, house_number, street, city, state, payment_method | Checkout (TC-TS-UI-05) |
| `toolshopProductData.json` | `sampleProductId`, `sampleProductName` | Product detail + cart (TC-TS-UI-03/04) |

**Current product ID:** `01KZ2WFC8DM9KV0TCKB1MFSDRB` (Combination Pliers). Refresh from `GET /products` when demo DB resets.

### Toolshop API data — `api/testdata/`

| File | Purpose |
|------|---------|
| `toolshopCredentials.json` | `POST /users/login` body |
| `toolshopInvoicePayload.json` | `POST /invoices` billing template + `cart_id` at runtime |

### Toolshop API endpoints — `api/objects/toolshopApiPage.js`

- Base: `https://api.practicesoftwaretesting.com`
- Endpoints: `/users/login`, `/products`, `/carts`, `/carts/{id}`, `/invoices`, `/users/me`

**Validation Notes:**
- Cart create accepts HTTP 200 or 201.
- Add to cart: `POST /carts/{cartId}` with `{ product_id, quantity }`.
- Invoice requires valid `cart_id` and full billing payload.

---

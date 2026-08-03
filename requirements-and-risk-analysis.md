# Requirements and Risk Analysis — QA AI Practical Assessment

**Primary SUT (Part B):** [Practice Software Testing Toolshop](https://practicesoftwaretesting.com/)  
**Primary API:** [Toolshop API](https://api.practicesoftwaretesting.com/api/documentation)  
**Secondary SUT:** [Maruti Suzuki NEXA](https://www.nexaexperience.com/) (read-only UI)  
**Dummy API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)  
**Analysed by:** AI-assisted SDET review via Cursor  
**Date:** 2026-08-03

---

## Part B — Toolshop (Assessment Primary SUT)

### 1. Application overview

Toolshop is a **demo e-commerce training application** for software testing practice. It supports:

- Product catalog browse and search
- Customer registration and login (demo credentials provided)
- Shopping cart and quantity updates
- Checkout with billing address and payment method selection
- Cash on Delivery (COD) order completion and invoice generation
- My Invoices list under customer account
- REST API mirroring UI capabilities (auth, products, carts, invoices)

**Critical assessment behavior:** On checkout, user must click **Confirm twice** (finish step + modal Confirm) to generate invoice.

### 2. Requirement breakdown — Toolshop UI

#### AC1 — User Registration & Login + Catalog Browse

| # | Requirement | Type | Priority |
|---|---|---|---|
| TS-R1 | Homepage loads and displays product catalog | Functional | Critical |
| TS-R2 | Customer can log in with valid demo credentials | Functional | Critical |
| TS-R3 | Logged-in state visible (nav / account area) | Functional | High |
| TS-R4 | Product detail page shows name and unit price | Functional | Critical |
| TS-R5 | Invalid login credentials rejected with error | Negative | Medium |

#### AC2 — End-to-End Purchase (Cart → Checkout → Invoice)

| # | Requirement | Type | Priority |
|---|---|---|---|
| TS-R6 | User can add product to cart with quantity update | Functional | Critical |
| TS-R7 | Cart badge reflects added items | Functional | Critical |
| TS-R8 | Checkout accepts billing address fields | Functional | Critical |
| TS-R9 | Cash on Delivery payment completes order | Functional | Critical |
| TS-R10 | Success message shows invoice number (INV-*) | Functional | Critical |
| TS-R11 | My Invoices lists generated invoices | Functional | High |

### 3. Requirement breakdown — Toolshop API

#### AC1 — Auth & Cart

| # | Requirement | Type | Priority |
|---|---|---|---|
| TS-RA1 | `POST /users/login` returns 200 and bearer `access_token` | Functional | Critical |
| TS-RA2 | `POST /carts` with bearer token returns cart `id` | Functional | Critical |

#### AC2 — Products, Cart Items, Invoice

| # | Requirement | Type | Priority |
|---|---|---|---|
| TS-RA3 | `GET /products` returns product list | Functional | Critical |
| TS-RA4 | `POST /carts/{id}` adds item with `product_id` + `quantity` | Functional | Critical |
| TS-RA5 | `GET /carts/{id}` returns cart items | Functional | High |
| TS-RA6 | `POST /invoices` with billing payload + `cart_id` creates invoice | Functional | Critical |
| TS-RA7 | `GET /invoices` returns invoice history for authenticated user | Functional | High |

### 4. Toolshop scope

| Module | In Scope | Out of Scope |
|---|---|---|
| Catalog / search | Homepage, product detail, in-stock sample product | Full catalog regression (50+ SKUs) |
| Auth | Login, invalid login, logged-in nav | Registration edge cases, password reset, OAuth |
| Cart / checkout | Add to cart, COD, double Confirm, invoice | Credit card / bank transfer live payment |
| API | Login, products, cart CRUD, invoice POST/GET | Admin API, rate-limit bypass, security pen-test |
| Account | My Invoices list | Profile edit, GDPR export |

### 5. Toolshop risk assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Demo database resets — product ULIDs change | High | High | Store `sampleProductId` in JSON; refresh from `GET /products` when tests fail |
| Shared demo customer account state (cart/orders) | Medium | Medium | Tests create new cart per API run; UI tolerates existing invoices |
| Double Confirm UI step easy to miss in automation | Medium | High | Document in specs; `completeCashOnDelivery()` clicks Confirm twice |
| Billing field validation (e.g. `house_number` required) | Medium | Medium | Use `toolshopBillingData.json` from live exploration |
| Demo site downtime or slow response | Low | Medium | Retries=1, 120s timeout, workers=1 |
| Hardcoded demo credentials in repo | Low | Low | Demo-only public credentials per app documentation |

### 6. Toolshop test coverage strategy

| Layer | Smoke | Regression | Total (automated) |
|---|---|---|---|
| UI (Toolshop) | 4 | 3 | 7 |
| API (Toolshop) | 3 | 4 | 7 |
| **Toolshop total** | **7** | **7** | **14** |

**Manual:** 8 cases in `manual-test-cases/ToolshopFunctionalTestCase.csv` (TC-MAN-TS-01 to TC-MAN-TS-08)

### 7. Toolshop requirements traceability

| Requirement | Automated TC | Manual TC |
|---|---|---|
| TS-R1 | TC-TS-UI-01 | TC-MAN-TS-01 |
| TS-R2, TS-R3 | TC-TS-UI-02 | TC-MAN-TS-02 |
| TS-R4 | TC-TS-UI-03 | TC-MAN-TS-03 |
| TS-R6, TS-R7 | TC-TS-UI-04 | TC-MAN-TS-04 |
| TS-R8–TS-R10 | TC-TS-UI-05 | TC-MAN-TS-05 |
| TS-R11 | TC-TS-UI-07 | TC-MAN-TS-06 |
| TS-R5 | TC-TS-UI-06 | TC-MAN-TS-07 |
| TS-RA1 | TC-TS-API-01 | TC-MAN-TS-08 |
| TS-RA2 | TC-TS-API-04 | — |
| TS-RA3 | TC-TS-API-02 | — |
| TS-RA4, TS-RA5 | TC-TS-API-05 | — |
| TS-RA6 | TC-TS-API-06 | — |
| TS-RA7 | TC-TS-API-07 | — |

---

## Part A — NEXA (Secondary / Read-only suite)

### 1. Application overview

NEXA is Maruti Suzuki's **live production marketing site** for premium cars in India. Because there is **no staging environment**, UI testing is scoped to **read-only, non-destructive journeys**. No form submissions that create leads or bookings.

JSONPlaceholder is a **dummy API** for API automation patterns — not connected to NEXA backend.

### 2. Requirement breakdown — NEXA UI

#### AC1 — Car Discovery (Homepage → Model → Detail)

| # | Requirement | Type | Priority |
|---|---|---|---|
| R1 | Homepage loads and displays featured car model(s) | Functional | Critical |
| R2 | Navigation menu exposes car category links | Functional | High |
| R3 | Clicking a car model navigates to detail page | Functional | Critical |
| R4 | Model detail displays name, starting price, key specs | Functional | Critical |
| R5 | Build Your Own / Configurator link present | Functional | Medium |
| R6 | Invalid model URL shows graceful fallback | Negative | Medium |
| R7 | Page loads within acceptable time budget | Non-functional | Medium |

#### AC2 — Dealer Locator

| # | Requirement | Type | Priority |
|---|---|---|---|
| R8 | Showroom locator entry visible on homepage | Functional | High |
| R9 | User can search dealers by city or pincode | Functional | Critical |
| R10 | Valid search returns dealer results with address/distance | Functional | Critical |
| R11 | Remote location shows empty state or graceful fallback | Negative / Edge | High |
| R12 | Empty search handled without crash | Validation | Medium |
| R13 | Navigate control present on results | Functional | Low |

#### AC3 (Optional) — Help Me Select Quiz

| # | Requirement | Type | Priority |
|---|---|---|---|
| R14 | Quiz entry accessible from homepage | Functional | Medium |
| R15 | User can progress to recommendation (stretch) | Functional | Medium |

### 3. Requirement breakdown — JSONPlaceholder API

| # | Requirement | Type | Priority |
|---|---|---|---|
| RA1 | `GET /posts` returns 200 and non-empty array | Functional | Critical |
| RA2 | `GET /posts/{id}` returns 200 with matching id | Functional | Critical |
| RA3 | `GET /posts/{invalid}` returns 404 | Negative | High |
| RA4 | `POST /posts` valid payload returns 201 | Functional | Critical |
| RA5 | `POST /posts` malformed payload — no 5xx | Negative | Medium |

### 4. NEXA scope

| Module | In Scope | Out of Scope |
|---|---|---|
| Homepage | Load, featured content, nav links | Ad pixels, A/B variants |
| Car Discovery | Browse, model detail, configurator link | Configurator submission |
| Dealer Locator | Search, results, empty state | Dealer contact, map accuracy |
| Booking flows | **Excluded** | Test drive, service, Book a Car |
| API (Dummy) | GET/POST contract validation | NEXA real backend |

### 5. NEXA risk assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Live site form submissions create real leads | Medium | Critical | Exclude all submission flows |
| AEM CMS content/layout changes | High | Medium | Structural selectors, ARIA, href paths |
| No staging — all runs hit production | High | Medium | workers=1, low frequency |
| Dealer data varies by location | Medium | Medium | Structural assertions, not exact counts |
| Bot detection on commercial site | Medium | Medium | Document if blocked; do not bypass |

### 6. NEXA test coverage strategy

| Layer | Smoke | Regression | Total (automated) |
|---|---|---|---|
| UI (NEXA) | 3 | 10 | 13 |
| API (Dummy) | 2 | 3 | 5 |
| **NEXA total** | **5** | **13** | **18** |

**Manual:** 20 cases in `manual-test-cases/FunctionalTestCase.csv`

### 7. NEXA requirements traceability

| Requirement | Automated TC | Manual TC |
|---|---|---|
| R1 | TC-UI-01 | TC-MAN-01 |
| R2 | TC-UI-02 | TC-MAN-02, TC-MAN-03 |
| R3, R4 | TC-UI-03, TC-UI-04 | TC-MAN-04, TC-MAN-05, TC-MAN-06 |
| R5 | TC-UI-05 | TC-MAN-07 |
| R6 | TC-UI-06 | TC-MAN-08 |
| R7 | TC-UI-07 | TC-MAN-09 |
| R8 | TC-UI-08 | TC-MAN-11, TC-MAN-12 |
| R9, R10 | TC-UI-09, TC-UI-10 | TC-MAN-13, TC-MAN-15 |
| R11 | TC-UI-11 | TC-MAN-16 |
| R12 | TC-UI-12 | TC-MAN-17, TC-MAN-18 |
| R13 | TC-UI-10 | TC-MAN-19, TC-MAN-20 |
| RA1–RA5 | TC-API-01 to TC-API-05 | — |

---

## Combined automation summary

| Suite | UI tests | API tests | Total |
|---|---|---|---|
| Toolshop (Part B) | 7 | 7 | 14 |
| NEXA + JSONPlaceholder | 13 | 5 | 18 |
| **Grand total** | **20** | **12** | **32** |

Last verified: `npm test` — Toolshop 14/14 pass, full suite 32/32 pass (2026-08-03).

---

## Assumptions

1. Toolshop is the **primary assessment SUT** (Part B); NEXA + JSONPlaceholder are secondary demonstration suites in the same framework.
2. Toolshop demo credentials (`customer@practicesoftwaretesting.com`) are public training accounts — not production secrets.
3. NEXA testing is read-only on live production; no lead-generating form submissions.
4. JSONPlaceholder does not persist POST data — assertions target status and response shape.
5. Product ULIDs on Toolshop may change when demo DB resets — maintain `toolshopProductData.json`.
6. Dealer locator and NEXA marketing content may drift — tests use structural assertions.

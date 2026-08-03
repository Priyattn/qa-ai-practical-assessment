# Framework Development — QA Playwright Automation

**Version:** 2.0.0  
**Date:** 2026-08-03  
**Stack:** Playwright (JavaScript), Page Object Model, Chromium  
**Author:** AI-assisted development via Cursor

---

## 1. Purpose

Single Playwright framework covering **two application suites**:

| Suite | Role | Coverage |
|-------|------|----------|
| **Toolshop (Part B)** | Assessment primary SUT | UI login, catalog, cart, COD checkout, invoices + API auth/products/cart/invoice |
| **NEXA + JSONPlaceholder** | Secondary read-only demo | Car discovery, dealer locator + dummy API contract tests |

Built for **live/demo sites** with no staging. NEXA UI tests are non-destructive. Toolshop uses public demo credentials.

---

## 2. Repository layout

```text
PrismStructure-playwright/
├── api/
│   ├── objects/
│   │   ├── postsApiPage.js           # JSONPlaceholder endpoints
│   │   └── toolshopApiPage.js        # Toolshop API endpoints
│   └── testdata/
│       ├── postPayload.json
│       ├── toolshopCredentials.json
│       └── toolshopInvoicePayload.json
├── ui/
│   ├── pageobjects/
│   │   ├── POManager.js              # NEXA registry
│   │   ├── homePage.js, modelDetailPage.js, dealerLocatorPage.js
│   │   ├── toolshopPOManager.js      # Toolshop registry
│   │   └── toolshop*.js              # Login, home, product, checkout, invoices
│   └── resources/data/
│       ├── dealerSearchData.json
│       ├── toolshopUserData.json
│       ├── toolshopBillingData.json
│       └── toolshopProductData.json
├── tests/
│   ├── ui/
│   │   ├── 01_carDiscovery.spec.js
│   │   ├── 02_dealerLocator.spec.js
│   │   ├── 03_toolshopCatalogAuth.spec.js
│   │   └── 04_toolshopCheckoutInvoices.spec.js
│   └── api/
│       ├── 01_postsApi.spec.js
│       ├── 02_toolshopAuthProductsApi.spec.js
│       └── 03_toolshopCartInvoiceApi.spec.js
├── playwright.config.js
├── package.json
├── playwright-report/
└── playwright-artifacts/
```

---

## 3. Architecture

### Page Object Model

```text
NEXA UI Spec     → POManager → HomePage | ModelDetailPage | DealerLocatorPage
Toolshop UI Spec → ToolshopPOManager → Login | Home | Product | Checkout | Invoices
API Specs        → toolshopApiPage / postsApiPage + JSON testdata → request fixture
```

**Separate POM managers** per application — no mixed locators in one page class.

### Playwright projects

| Project | `testMatch` | `baseURL` |
|---------|-------------|-----------|
| `ui-toolshop` | `tests/ui/*toolshop*.spec.js` | `https://practicesoftwaretesting.com` |
| `api-toolshop` | `tests/api/*toolshop*.spec.js` | `https://api.practicesoftwaretesting.com` |
| `ui-nexa` | `tests/ui/01_*.spec.js`, `02_*.spec.js` | `https://www.nexaexperience.com` |
| `api-jsonplaceholder` | `tests/api/01_postsApi.spec.js` | `https://jsonplaceholder.typicode.com` |

All four projects run in one `npm test` invocation.

---

## 4. Configuration highlights (`playwright.config.js`)

| Setting | Value | Rationale |
|---------|-------|-----------|
| `workers` | `1` | Minimize load on live/demo sites |
| `retries` | `1` | Tolerate network flakiness |
| `timeout` | 120s | Slow page loads |
| `expect.timeout` | 30s | Autocomplete / checkout waits |
| `viewport` | 1920×1080 | Desktop layout |
| `screenshot` | `only-on-failure` | Evidence without bloat |
| `video` / `trace` | `retain-on-failure` | Debug failed runs |
| `reporter` | HTML + list | Submission evidence |

---

## 5. Toolshop page objects

### `toolshopLoginPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `goto()` | TS-R2 | `/auth/login`, wait email field |
| `login(email, password)` | TS-R2 | Fill + submit, wait account URL |
| `loginAsCustomer()` | TS-R2 | Default demo credentials |
| `verifyLoggedIn()` | TS-R3 | Nav menu + account URL |
| `loginWithInvalidCredentials()` | TS-R5 | Invalid data from JSON |

### `toolshopProductPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `gotoProduct(id)` | TS-R4 | `/product/{ulid}` |
| `verifyProductDetailVisible()` | TS-R4 | `data-test=product-name`, `unit-price` |
| `addToCartWithQuantity(n)` | TS-R6 | Increase quantity + add |
| `verifyCartQuantityGreaterThanZero()` | TS-R7 | `data-test=cart-quantity` |

### `toolshopCheckoutPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `goto()` | TS-R8 | `/checkout`, `networkidle`, `proceed-1` |
| `fillBilling(data)` | TS-R8 | `proceed-1/2/3`, billing fields, COD select |
| `completeCashOnDelivery()` | TS-R9 | finish + **Confirm twice** |
| `verifyInvoiceGenerated()` | TS-R10 | Thanks message + INV- |

### `toolshopInvoicesPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `goto()` | TS-R11 | Account invoices route |
| `verifyInvoiceListVisible()` | TS-R11 | Table with INV- rows |

---

## 6. NEXA page objects

### `homePage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `goto()` | R1 | `networkidle` with fallback |
| `verifyHomepageLoaded()` | R1 | main + hero content |
| `openCarsMenu()` | R2 | Hover + click Cars |
| `clickModelBySlug(slug)` | R3 | Header link or `goto` fallback |
| `verifyDealerLocatorEntryVisible()` | R8 | Scroll to showroom section |

### `modelDetailPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `verifyModelPageLoaded(slug)` | R3 | URL + hero |
| `verifyModelNameAndPricePresent()` | R4 | ₹/LAKH scan |
| `verifyBuildYourOwnLinkPresent()` | R5 | Role link |
| `verifyInvalidUrlHandled()` | R6 | 404 or redirect |

### `dealerLocatorPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `searchByCity(city)` | R9 | CITY tab + autocomplete |
| `verifyShowroomResultsDisplayed()` | R10 | Showroom count text |
| `submitEmptySearch()` | R12 | Empty field + Enter |
| `verifyNavigateLinksPresent()` | R13 | Navigate control |

---

## 7. Test data

### Toolshop

| File | Purpose |
|------|---------|
| `toolshopUserData.json` | Customer + invalid login |
| `toolshopBillingData.json` | Checkout billing + COD |
| `toolshopProductData.json` | Sample product ULID (refresh when DB resets) |
| `toolshopCredentials.json` | API login body |
| `toolshopInvoicePayload.json` | API invoice POST template |

### NEXA

| File | Purpose |
|------|---------|
| `dealerSearchData.json` | Cities, pincodes, model slugs |
| `postPayload.json` | JSONPlaceholder valid + malformed POST |

---

## 8. npm scripts

| Script | Command |
|--------|---------|
| `npm test` | All 32 tests (4 projects) |
| `npm run test:toolshop` | Toolshop UI + API (14) |
| `npm run test:nexa` | NEXA UI + JSONPlaceholder (18) |
| `npm run test:smoke` | `--grep @smoke` |
| `npm run test:regression` | `--grep @regression` |
| `npm run test:ui` | All UI specs |
| `npm run test:api` | All API specs |
| `npm run test:headed` | Headed Chromium |
| `npm run report` | Open HTML report |

Parent root `package.json` forwards via `npm --prefix PrismStructure-playwright`.

---

## 9. Installation

```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-playwright
npm install
npx playwright install chromium
npm test
```

**Prerequisites:** Node.js 18+

---

## 10. Selector strategy

### Toolshop

Priority: `data-test` attributes from live DOM (`product-name`, `add-to-cart`, `proceed-1`, `finish`).

### NEXA (production AEM)

1. ARIA roles — `getByRole('heading'|'link'|'button')`
2. Stable href paths — `a[href="/fronx"]`, `a[href*="connect-to-dealer"]`
3. Text patterns — regex for ₹, showroom count (not exact copy)

---

## 11. Debugging failed tests

```powershell
npm run report
npx playwright test tests/ui/04_toolshopCheckoutInvoices.spec.js --headed
npx playwright show-trace playwright-artifacts\<folder>\trace.zip
```

| Symptom | Fix |
|---------|-----|
| Product page empty / timeout | Refresh `sampleProductId` from `GET /products` |
| Checkout stuck on billing | Fill `house_number`; wait `networkidle` on checkout |
| Invoice not generated | Click **Confirm** twice after finish |
| NEXA hidden model link | `openCarsMenu()` or `gotoModel(slug)` |
| API cart add 404 | Stale product ULID in test data |

---

## 12. Test results (last verified)

```text
Toolshop:  14 passed (~53s)   — npm run test:toolshop
Full suite: 32 passed (~6–7m) — npm test
  ui-toolshop:           7 passed
  api-toolshop:          7 passed
  ui-nexa:              13 passed
  api-jsonplaceholder:   5 passed
```

Report: `PrismStructure-playwright/playwright-report/index.html`  
Copy to `execution-evidence/` for submission.

---

## 13. Requirements traceability

See `requirements-and-risk-analysis.md` for full Part B (Toolshop) and Part A (NEXA) mapping.

| Suite | Manual CSV | Automated IDs |
|-------|------------|-----------------|
| Toolshop | `ToolshopFunctionalTestCase.csv` | TC-TS-UI-*, TC-TS-API-* |
| NEXA | `FunctionalTestCase.csv` | TC-UI-*, TC-API-* |

---

## 14. Future enhancements

- CI: API suites in pipeline; UI smoke on schedule
- Dynamic product ID fetch in `beforeAll` for Toolshop resilience
- `execution-evidence/` copy script post-test
- NEXA AC3 Help Me Select read-only quiz flow

---

*See also: `ai-prompts/session-handoff.md`, `readme.md`, `requirements-and-risk-analysis.md`, `project-info.md`*

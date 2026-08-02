# Framework Development — NEXA QA Playwright Automation

**Version:** 1.0.0  
**Date:** 2026-07-31  
**Stack:** Playwright (JavaScript), Page Object Model, Chromium  
**Author:** AI-assisted development via Cursor

---

## 1. Purpose

Automated test suite for the NEXA QA practical assessment covering:

- **AC1** — Car Discovery (homepage → model detail, read-only)
- **AC2** — Dealer Locator (search and results structure, read-only)
- **API-DUMMY** — JSONPlaceholder GET/POST contract validation (independent of NEXA backend)

Built for a **live production site** with no staging environment. All UI tests are non-destructive.

---

## 2. Repository layout

```text
PrismStructure-nexa-playwright/
├── api/
│   ├── objects/
│   │   └── postsApiPage.js          # Endpoint URLs, payloads, status codes
│   └── testdata/
│       └── postPayload.json         # Valid + malformed POST bodies
├── ui/
│   ├── pageobjects/
│   │   ├── homePage.js              # Homepage, Cars menu, dealer entry
│   │   ├── modelDetailPage.js       # Model page assertions
│   │   ├── dealerLocatorPage.js     # /connect-to-dealer flows
│   │   └── POManager.js             # Page object registry
│   └── resources/data/
│       └── dealerSearchData.json    # Cities, pincodes, model slugs
├── tests/
│   ├── ui/
│   │   ├── 01_carDiscovery.spec.js  # 7 tests — AC1
│   │   └── 02_dealerLocator.spec.js # 6 tests — AC2
│   └── api/
│       └── 01_postsApi.spec.js      # 5 tests — JSONPlaceholder
├── playwright.config.js
├── package.json
├── playwright-report/               # HTML report (after run)
├── playwright-artifacts/            # Traces, screenshots on failure
└── .gitignore
```

---

## 3. Architecture

### Page Object Model (POM)

```text
Test Spec → POManager → HomePage | ModelDetailPage | DealerLocatorPage → Playwright Page
API Spec  → postsApiPage + postPayload.json → Playwright request fixture
```

`POManager` is instantiated per test in `beforeEach` and exposes:

- `getHomePage()`
- `getModelDetailPage()`
- `getDealerLocatorPage()`

### Playwright projects

| Project | `testMatch` | `baseURL` |
|---------|-------------|-----------|
| `ui` | `tests/ui/**/*.spec.js` | `https://www.nexaexperience.com` |
| `api` | `tests/api/**/*.spec.js` | `https://jsonplaceholder.typicode.com` |

UI and API suites run independently in one `npm test` invocation.

---

## 4. Configuration highlights (`playwright.config.js`)

| Setting | Value | Rationale |
|---------|-------|-----------|
| `workers` | `1` | Minimize load on live production site |
| `retries` | `1` | Tolerate occasional AEM/network flakiness |
| `timeout` | 120s | Slow production page loads |
| `expect.timeout` | 30s | Dealer search autocomplete wait |
| `viewport` | 1920×1080 | Desktop layout for mega-menu |
| `screenshot` | `only-on-failure` | Evidence without bloat |
| `video` / `trace` | `retain-on-failure` | Debug failed live-site runs |
| `reporter` | HTML + list | Submission evidence |

---

## 5. Page object design

### `homePage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `goto()` | R1 | `networkidle` with fallback |
| `verifyHomepageLoaded()` | R1 | main + "Discover Your Perfect Car" + "Explore Now" |
| `openCarsMenu()` | R2 | Hover + click Cars header item |
| `getFeaturedModelCount()` | R2 | Count links in mega-menu |
| `clickModelBySlug(slug)` | R3 | Header link or `goto /{slug}` fallback |
| `verifyDealerLocatorEntryVisible()` | R8 | Scroll to showroom heading + Explore Nearby Showrooms |

### `modelDetailPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `verifyModelPageLoaded(slug)` | R3 | URL + main hero visible |
| `verifyModelNameAndPricePresent()` | R4 | Scan visible elements for ₹/LAKH |
| `verifyKeySpecsOrVariantsPresent()` | R4 | Variant/Specification/Mileage text |
| `verifyBuildYourOwnLinkPresent()` | R5 | Role link "Build Your Own" |
| `verifyInvalidUrlHandled()` | R6 | 404 text or redirect |

### `dealerLocatorPage.js`

| Method | Requirement | Notes |
|--------|-------------|-------|
| `goto()` | R9 | `/connect-to-dealer` |
| `searchByCity(city)` | R9 | CITY tab + autocomplete |
| `searchByPincode(pincode)` | R9 | PINCODE tab |
| `verifyShowroomResultsDisplayed()` | R10 | "found N NEXA showroom" |
| `verifyNavigateLinksPresent()` | R13 | Link or button "Navigate" |
| `submitEmptySearch()` | R12 | Empty field + Enter |
| `verifyEmptySearchHandledGracefully()` | R12 | No crash, page functional |

---

## 6. Test data

### `dealerSearchData.json`

```json
{
  "validCities": ["Mumbai", "Delhi", "Bangalore"],
  "models": { "default": "fronx" },
  "invalidModelPath": "/nonexistent-car-xyz-999",
  "remotePincode": { "pincode": "000000" }
}
```

### `postPayload.json`

- `validPost` — title, body, userId for 201 assertion
- `malformedPost` — numeric title, null body for no-5xx assertion

---

## 7. npm scripts

| Script | Command |
|--------|---------|
| `npm test` | All 18 tests |
| `npm run test:smoke` | `--grep @smoke` |
| `npm run test:regression` | `--grep @regression` |
| `npm run test:ui` | `tests/ui` only |
| `npm run test:api` | `tests/api` only |
| `npm run test:headed` | Headed Chromium |
| `npm run report` | Open HTML report |
| `npm run install:browsers` | `playwright install chromium` |

Parent project root (`qa-ai-practical-assessment-main/package.json`) forwards via `npm --prefix PrismStructure-nexa-playwright`.

---

## 8. Installation

```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-nexa-playwright
npm install
npx playwright install chromium
npm test
```

**Prerequisites:** Node.js 18+

---

## 9. Selector strategy (production AEM site)

Priority order:

1. **ARIA roles** — `getByRole('heading'|'link'|'button')`
2. **Stable href paths** — `a[href="/fronx"]`, `a[href*="connect-to-dealer"]`
3. **Structural landmarks** — `main`, header `nav`
4. **Text patterns** — regex for ₹, Km Away, showroom count (not exact copy)

Avoid:

- Brittle CSS class names from AEM
- Hidden carousel `.first()` without visibility check
- Footer links when main-section CTAs are the requirement

---

## 10. Debugging failed tests

```powershell
# View last HTML report
npm run report

# Run single test headed
npx playwright test tests/ui/01_carDiscovery.spec.js -g "TC-UI-03" --headed

# Open trace from playwright-artifacts/
npx playwright show-trace playwright-artifacts\<trace-folder>\trace.zip
```

Common failure causes on live NEXA:

| Symptom | Fix |
|---------|-----|
| Hidden model link | Use `openCarsMenu()` or `gotoModel(slug)` |
| Dealer section not found | Scroll to "Locate Your Nearest NEXA Showroom" |
| Navigate href empty | Assert button enabled / map opens |
| Timeout on homepage | Increase `networkidle` tolerance in `goto()` |

---

## 11. Test results (last verified run)

```text
18 passed (1.1–1.2m)
  UI:  13 passed
  API:  5 passed
```

Report: `PrismStructure-nexa-playwright/playwright-report/index.html`

---

## 12. Requirements traceability

| Req | Automated TC | Manual TC |
|-----|--------------|-----------|
| R1 | TC-UI-01 | TC-MAN-01 |
| R2 | TC-UI-02 | TC-MAN-02, TC-MAN-03 |
| R3 | TC-UI-03 | TC-MAN-04 |
| R4 | TC-UI-04 | TC-MAN-05, TC-MAN-06 |
| R5 | TC-UI-05 | TC-MAN-07 |
| R6 | TC-UI-06 | TC-MAN-08 |
| R7 | TC-UI-07 | TC-MAN-09 |
| R8 | TC-UI-08 | TC-MAN-11, TC-MAN-12 |
| R9 | TC-UI-09 | TC-MAN-13, TC-MAN-14 |
| R10 | TC-UI-09, TC-UI-10 | TC-MAN-15 |
| R11 | TC-UI-11 (soft) | TC-MAN-16 |
| R12 | TC-UI-12 | TC-MAN-17, TC-MAN-18 |
| R13 | TC-UI-10 | TC-MAN-19, TC-MAN-20 |
| RA1–RA5 | TC-API-01 to TC-API-05 | — |

---

## 13. Future enhancements

- Tag-based CI: API suite in pipeline; UI smoke on schedule only
- `execution-evidence/` copy script post-test
- AC3 Help Me Select read-only quiz flow
- Optional Playwright MCP exploration for selector discovery before code changes

---

*See also: `ai-prompts/session-handoff.md`, `readme.md`, `requirements-and-risk-analysis (1).md`*

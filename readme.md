# QA AI Practical Assessment — Playwright Framework

## Project Information

| Suite | UI | API |
|-------|-----|-----|
| **Toolshop (assessment SUT)** | https://practicesoftwaretesting.com/ | https://api.practicesoftwaretesting.com/ |
| **NEXA (read-only)** | https://www.nexaexperience.com/ | https://jsonplaceholder.typicode.com/ (dummy) |

**Framework:** Playwright (JavaScript), Page Object Model, `POManager` / `ToolshopPOManager`

**Test types:** UI + API | `@smoke` + `@regression`

---

## Folder Structure

```
qa-ai-practical-assessment-main/
├── PrismStructure-playwright/     ← single Playwright project (Toolshop + NEXA)
│   ├── api/
│   │   ├── objects/
│   │   │   ├── postsApiPage.js         ← JSONPlaceholder
│   │   │   └── toolshopApiPage.js      ← Practice Software Testing API
│   │   └── testdata/
│   ├── ui/
│   │   ├── pageobjects/
│   │   │   ├── POManager.js            ← NEXA pages
│   │   │   ├── homePage.js, modelDetailPage.js, dealerLocatorPage.js
│   │   │   ├── toolshopPOManager.js    ← Toolshop pages
│   │   │   └── toolshop*.js
│   │   └── resources/data/
│   ├── tests/
│   │   ├── ui/
│   │   │   ├── 01_carDiscovery.spec.js
│   │   │   ├── 02_dealerLocator.spec.js
│   │   │   ├── 03_toolshopCatalogAuth.spec.js
│   │   │   └── 04_toolshopCheckoutInvoices.spec.js
│   │   └── api/
│   │       ├── 01_postsApi.spec.js
│   │       ├── 02_toolshopAuthProductsApi.spec.js
│   │       └── 03_toolshopCartInvoiceApi.spec.js
│   ├── playwright.config.js
│   └── package.json
├── manual-test-cases/
│   ├── FunctionalTestCase.csv           ← NEXA manual (20)
│   └── ToolshopFunctionalTestCase.csv   ← Toolshop manual (8)
├── ai-prompts/
├── execution-evidence/
├── project-info.md
└── readme.md
```

---

## Prerequisites

Node.js v18+, npm, Git

---

## Installation

```powershell
cd PrismStructure-playwright
npm install
npx playwright install chromium
```

Or from project root:

```powershell
npm run install:playwright
```

---

## Running Tests

```powershell
cd PrismStructure-playwright

# All suites (NEXA + Toolshop + APIs)
npm test

# Assessment Toolshop only
npm run test:toolshop

# NEXA + JSONPlaceholder only
npm run test:nexa

# By tag
npm run test:smoke
npm run test:regression

# By layer
npm run test:ui
npm run test:api

# Headed
npm run test:headed
```

**Playwright projects** (in `playwright.config.js`):

| Project | Specs | Base URL |
|---------|-------|----------|
| `ui-toolshop` | `tests/ui/*toolshop*.spec.js` | practicesoftwaretesting.com |
| `api-toolshop` | `tests/api/*toolshop*.spec.js` | api.practicesoftwaretesting.com |
| `ui-nexa` | `01_*.spec.js`, `02_*.spec.js` | nexaexperience.com |
| `api-jsonplaceholder` | `01_postsApi.spec.js` | jsonplaceholder.typicode.com |

---

## Test Report

```powershell
npm run report
```

Report: `PrismStructure-playwright/playwright-report/index.html`

Copy to `execution-evidence/` for submission.

---

## Toolshop Key Scenarios (Assessment Part B)

| ID | Type | Scenario | Tags |
|----|------|----------|------|
| TC-TS-UI-01 | UI | Homepage product catalog | @smoke @regression |
| TC-TS-UI-02 | UI | Customer login | @smoke @regression |
| TC-TS-UI-05 | UI | COD checkout + invoice (double Confirm) | @smoke @regression |
| TC-TS-API-01 | API | POST login → bearer token | @smoke @regression |
| TC-TS-API-06 | API | POST invoice cash-on-delivery | @smoke @regression |

**Invoice UI note:** Click `finish` then `Confirm` (twice if modal re-prompts) — per assessment doc.

---

## NEXA Key Scenarios (Read-only)

| ID | Type | Scenario |
|----|------|----------|
| TC-UI-01 | UI | Homepage featured content |
| TC-UI-09 | UI | Dealer city search |
| TC-API-01 | API | GET /posts list |

NEXA: no form submissions (test drive, booking, dealer contact).

---

## Test Data

| File | Use |
|------|-----|
| `ui/resources/data/toolshopUserData.json` | Toolshop login |
| `ui/resources/data/toolshopBillingData.json` | Checkout billing |
| `ui/resources/data/toolshopProductData.json` | Sample product ID |
| `api/testdata/toolshopCredentials.json` | API auth |
| `api/testdata/toolshopInvoicePayload.json` | API invoice body |
| `ui/resources/data/dealerSearchData.json` | NEXA dealer search |

---

## AI Prompts

See `ai-prompts/` for Cursor prompt history.

---

## Documentation index

| File | Purpose |
|------|---------|
| `readme.md` | Setup, run commands, folder structure |
| `project-info.md` | Assessment workflow — 11 AI usage points |
| `requirements-and-risk-analysis.md` | Part B Toolshop + NEXA requirements, risks, traceability |
| `frameworkdevelopment.md` | POM architecture, config, selectors, debugging |
| `defects/defect-report.md` | Observations and defect log |
| `exploratory-testing/exploratory-notes.md` | Exploratory session findings |
| `ai-prompts/session-handoff.md` | Session status and file index |
| `ai-prompts/requirements-and-planning.md` | Planning prompts archive |
| `ai-prompts/test-design.md` | Manual test design prompts |
| `ai-prompts/test-data.md` | Test data strategy prompts |
| `ai-prompts/automation-and-debugging.md` | Framework build + debug prompts |
| `ai-prompts/documentation-and-summary.md` | Deliverables summary |

# NEXA QA Automation — Playwright Framework

## Project Information

**Application Under Test (UI):** https://www.nexaexperience.com/ *(live production site — read-only flows only)*
**API Under Test (Dummy):** https://jsonplaceholder.typicode.com/

**Framework:** Playwright (JavaScript)

**Test Types:** UI Automation (read-only) + API Automation (dummy) | Smoke + Regression

> **Scoping note:** NEXA has no public test/staging environment. All UI tests are restricted to non-destructive browsing/search flows. Test drive booking, service booking, "Book a Car," and dealer-contact forms are intentionally **not automated** — see `requirements-and-risk-analysis.md` for the full rationale. API automation targets a separate dummy API (JSONPlaceholder) with no relation to NEXA's real backend.

---

## Folder Structure

```
nexa-qa-assessment/
├── PrismStructure-nexa-playwright/        ← Playwright automation project
│   ├── api/
│   │   ├── objects/                     ← Dummy API endpoint/body definitions
│   │   │   └── postsApiPage.js
│   │   └── testdata/                    ← Static JSON payloads for POST tests
│   ├── ui/
│   │   ├── pageobjects/
│   │   │   ├── homePage.js
│   │   │   ├── modelDetailPage.js
│   │   │   ├── dealerLocatorPage.js
│   │   │   └── POManager.js
│   │   └── resources/data/              ← dealerSearchData.json
│   ├── tests/
│   │   ├── ui/
│   │   │   ├── 01_carDiscovery.spec.js
│   │   │   └── 02_dealerLocator.spec.js
│   │   └── api/
│   │       └── 01_postsApi.spec.js
│   ├── playwright.config.js
│   └── package.json
├── manual-test-cases/
│   └── FunctionalTestCase.csv
├── exploratory-testing/
│   └── exploratory-notes.md
├── defects/
│   └── defect-report.md
├── ai-prompts/
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── test-data.md
│   ├── automation-and-debugging.md
│   └── documentation-and-summary.md
├── execution-evidence/
│   └── (screenshots / Playwright HTML report)
├── requirements-and-risk-analysis.md
├── project-info.md                      ← AI workflow documentation (tool-workflow.md content)
└── readme.md                            ← This file
```

---

## Prerequisites

1. Node.js v18+ from https://nodejs.org/en
2. npm (comes with Node.js)
3. Git

---

## Installation

```bash
cd PrismStructure-nexa-playwright
npm install
npx playwright install chromium
```

---

## Running Tests

```bash
cd PrismStructure-nexa-playwright

# All tests
npm test

# Smoke only
npm run test:smoke

# Regression only
npm run test:regression

# UI only
npm run test:ui

# API only
npm run test:api

# Headed (visible browser)
npm run test:headed
```

---

## Test Report

After execution:
```bash
npm run report
```
Opens the Playwright HTML report at `PrismStructure-nexa-playwright/playwright-report/index.html`.

A copy of the report is saved to `execution-evidence/` for submission.

---

## Key Test Scenarios

| ID | Type | Scenario | Tags |
|---|---|---|---|
| TC-UI-01 | UI Smoke | Homepage loads with featured car content | @smoke @regression |
| TC-UI-03 | UI Smoke | Navigate to a car model detail page | @smoke @regression |
| TC-UI-06 | UI Regression | Invalid model URL handled gracefully | @regression |
| TC-UI-07 | UI Smoke | Dealer search with valid city returns results | @smoke @regression |
| TC-UI-08 | UI Regression | Dealer search with no nearby results shows empty state | @regression |
| TC-UI-09 | UI Regression | Empty dealer search input handled without crash | @regression |
| TC-API-01 | API Smoke | GET /posts returns list | @smoke @regression |
| TC-API-02 | API Smoke | GET /posts/{id} returns matching resource | @smoke @regression |
| TC-API-03 | API Regression | GET /posts/{invalid} returns 404 | @regression |
| TC-API-04 | API Smoke | POST /posts with valid payload returns 201 | @smoke @regression |

---

## Important Notes

- **Live production site:** No automated form submissions (test drive, service booking, book-a-car, dealer contact). All UI coverage is read-only navigation and search verification.
- **Dummy API:** JSONPlaceholder does not persist POST data — assertions validate response shape/status code, not real persistence.
- **Selectors:** Preference order is `data-*` attributes > ARIA roles > structural CSS — avoided brittle text-based selectors where site copy may change.
- **Workers:** Single worker used to minimize load on the live site.
- **Content drift:** As a live marketing site, car models/pricing/imagery may change between runs — tests assert structure/presence, not exact copy.

---

## AI Prompts Folder

Full Cursor AI prompt history lives in `ai-prompts/`. Each file records prompts, AI response summaries, and validation/correction notes.

| File | Purpose |
|------|---------|
| `requirements-and-planning.md` | Requirement breakdown, scoping decisions (what NOT to automate), risk analysis |
| `test-design.md` | Manual/automation test case design |
| `test-data.md` | Dealer search inputs, API payloads |
| `automation-and-debugging.md` | Page objects, selector fixes, flakiness investigation |
| `documentation-and-summary.md` | README / project-info drafting |

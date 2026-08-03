# project-info.md

**Primary AI Tool(s) Used:** Cursor (with Claude Sonnet)
**Assessment Start Date:** 2026-07-31 | **Submission Date:** 2026-08-03

---

## What is this project about?

This repository contains a **QA AI Capability Exercise** deliverable: manual test cases, Playwright automation (UI + API), AI prompt history, and execution evidence. The **primary assessment target** is Practice Software Testing Toolshop (e-commerce checkout + invoice). A **secondary suite** covers NEXA read-only UI and JSONPlaceholder dummy API in the same Playwright framework.

**Public repo:** https://github.com/Priyattn/qa-ai-practical-assessment

---

## Application Under Test

| Suite | UI | API | Role |
|-------|-----|-----|------|
| **Toolshop (Part B — primary)** | https://practicesoftwaretesting.com/ | https://api.practicesoftwaretesting.com/ | Assessment SUT |
| **NEXA (secondary)** | https://www.nexaexperience.com/ | https://jsonplaceholder.typicode.com/ | Read-only + dummy API demo |

---

## Toolshop — Project Summary (Assessment Part B)

**Focus:** E-commerce login, catalog, cart, Cash on Delivery checkout, invoice generation.

- **AC1 (UI):** User Registration & Login — login, profile access; catalog browse
- **AC2 (UI):** End-to-End Purchase — add to cart, update quantity, COD checkout, view invoice under My Invoices
- **AC1 (API):** Register/login, bearer token, create cart
- **AC2 (API):** Get products, add to cart, verify cart, POST invoice with billing payload

**Critical UI behavior:** Press **Confirm twice** on checkout to generate invoice (finish step + modal Confirm).

**Manual tests:** `manual-test-cases/ToolshopFunctionalTestCase.csv` (8 cases)
**Automation IDs:** `TC-TS-UI-*`, `TC-TS-API-*` | Tags: `@smoke`, `@regression`

**Default test customer:** `customer@practicesoftwaretesting.com` / `welcome01`

---

## NEXA — Project Summary (Secondary suite)

Read-only flows on live production site — no lead/booking forms.

- **AC1:** Car Discovery (homepage → model detail)
- **AC2:** Dealer Locator (city search, results)
- **API-DUMMY:** JSONPlaceholder GET/POST posts

**Manual tests:** `manual-test-cases/FunctionalTestCase.csv` (20 cases)

---

## Tools Used

| Category | Tool |
|---|---|
| Browser | Chromium (via Playwright) |
| Automation Framework | Playwright (JavaScript) |
| AI Tool | Cursor |
| API Testing | Playwright `request` context |
| Reporting | Playwright HTML Reporter |
| Version Control | Git |
| Package Manager | npm |

**Framework folder:** `PrismStructure-playwright/`
**Page objects:** `POManager` (NEXA), `ToolshopPOManager` (Toolshop)

---

## Setup Summary

### 1. How I provided project and SUT context to Cursor AI

- Shared assessment doc scope: Toolshop UI + API documentation URLs
- For NEXA: explicit read-only boundary — no test drive, booking, or dealer contact forms
- Toolshop: use `data-test` selectors from live DOM exploration
- Split Playwright projects by base URL (`ui-toolshop`, `api-toolshop`, `ui-nexa`, `api-jsonplaceholder`)

### 2. How I used AI for requirement analysis

- Extracted AC1/AC2 from QA Practical Assessment doc for Toolshop login + checkout + invoice API chain
- Mapped flows to sanity vs regression and 5–8 case limit per type
- Documented double-Confirm invoice behavior from assessment notes

### 3. How I used AI for test planning and strategy

- **Toolshop smoke:** homepage, login, add to cart, COD checkout, API login, API invoice
- **Toolshop regression:** product detail, invalid login, cart API, invoices list
- **NEXA smoke/regression:** separate project — read-only car discovery and dealer locator

### 4. How I used AI for manual test case design

- Toolshop: `manual-test-cases/ToolshopFunctionalTestCase.csv` — 8 cases with automation cross-reference
- NEXA: `manual-test-cases/FunctionalTestCase.csv` — 20 cases with execution status

### 5. How I used AI for automation design

- Single `PrismStructure-playwright/` folder — shared `tests/ui`, `tests/api`, `ui/pageobjects/`, `api/objects/`
- Separate POM managers per application (no mixed locators in one page class)
- Test data in `ui/resources/data/` and `api/testdata/`

### 6. How I validated and refined AI-generated tests

- Explored Toolshop checkout in browser — billing fields, `proceed-1/2/3`, double Confirm
- Verified API cart path: `POST /carts/{id}` with `product_id` + `quantity`
- Ran `npm run test:toolshop` — 14/14 pass before submission

### 7. How I used AI for test data generation

- `toolshopUserData.json`, `toolshopBillingData.json`, `toolshopInvoicePayload.json`
- NEXA: `dealerSearchData.json`, JSONPlaceholder `postPayload.json`

### 8. How I used AI for debugging failing tests

- Checkout flake: wait for cart badge before `/checkout`; `networkidle` on checkout page
- API cart create: accept HTTP 200 or 201 for cart creation response

### 9. What information I avoided sharing with AI tools

- No real personal data in prompts; demo Toolshop credentials only
- No API keys — Toolshop demo API is public

### 10. How I would reuse this QA workflow

- Multi-SUT single repo: Playwright projects per base URL + separate POM namespaces
- Assessment prompt archive in `ai-prompts/` for traceability
- Manual CSV per application with automation reference columns

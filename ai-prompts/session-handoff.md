# Session Handoff — QA AI Practical Assessment

**Date:** 2026-08-03  
**Status:** Framework complete — Toolshop 14/14, full suite 32/32 passing  
**Primary AI tool:** Cursor (Composer)  
**Repo:** https://github.com/Priyattn/qa-ai-practical-assessment

---

## 1. What was completed

| Item | Status | Location |
|------|--------|----------|
| Requirements & risk analysis (Toolshop + NEXA) | Done | `requirements-and-risk-analysis.md` |
| Toolshop manual tests (8 cases) | Done | `manual-test-cases/ToolshopFunctionalTestCase.csv` |
| NEXA manual tests (20 cases) | Done | `manual-test-cases/FunctionalTestCase.csv` |
| Playwright framework (dual POM, 4 projects) | Done | `PrismStructure-playwright/` |
| Toolshop automation | **14 passed** | `03_toolshop*.spec.js`, `02/03_toolshop*.spec.js` |
| NEXA + API automation | **18 passed** | `01_*.spec.js`, `02_*.spec.js` |
| Exploratory notes | Done | `exploratory-testing/exploratory-notes.md` |
| Defect report | Done | `defects/defect-report.md` |
| Framework documentation | Done | `frameworkdevelopment.md` |
| Project info (11 workflow points) | Done | `project-info.md` |
| AI prompt archive | Done | `ai-prompts/*.md` |
| Execution evidence | Done | `execution-evidence/index.html` |

---

## 2. Application scope

### Toolshop (Part B — primary)

- **UI:** https://practicesoftwaretesting.com/
- **API:** https://api.practicesoftwaretesting.com/
- Login, catalog, add to cart, COD checkout (double Confirm), My Invoices
- API: login, products, cart, invoice POST/GET

### NEXA (secondary — read-only)

- **UI:** https://www.nexaexperience.com/
- AC1 car discovery, AC2 dealer locator — no form submissions

### JSONPlaceholder (dummy API)

- GET/POST `/posts` contract validation

**Out of scope:** NEXA test drive, booking, dealer contact; Toolshop payment gateways beyond COD demo.

---

## 3. How to run tests

```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-playwright
npm test
```

| Command | Purpose |
|---------|---------|
| `npm test` | All 32 tests |
| `npm run test:toolshop` | Toolshop only (14) |
| `npm run test:nexa` | NEXA + JSONPlaceholder (18) |
| `npm run test:smoke` | @smoke tags |
| `npm run test:headed` | Visible browser |
| `npm run report` | HTML report |

From inner project root:
```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main
npm run test:toolshop
```

---

## 4. Automated test inventory

### Toolshop UI (`03_toolshopCatalogAuth.spec.js`, `04_toolshopCheckoutInvoices.spec.js`)

| ID | Scenario | Tags |
|----|----------|------|
| TC-TS-UI-01 | Homepage catalog | @smoke @regression |
| TC-TS-UI-02 | Customer login | @smoke @regression |
| TC-TS-UI-03 | Product detail name/price | @regression |
| TC-TS-UI-04 | Add to cart quantity | @smoke @regression |
| TC-TS-UI-05 | COD checkout + invoice | @smoke @regression |
| TC-TS-UI-06 | Invalid login error | @regression |
| TC-TS-UI-07 | My Invoices list | @regression |

### Toolshop API (`02_toolshopAuthProductsApi.spec.js`, `03_toolshopCartInvoiceApi.spec.js`)

| ID | Scenario | Tags |
|----|----------|------|
| TC-TS-API-01 | POST login → token | @smoke @regression |
| TC-TS-API-02 | GET products | @regression |
| TC-TS-API-03 | GET product by id | @regression |
| TC-TS-API-04 | POST create cart | @smoke @regression |
| TC-TS-API-05 | Add item + GET cart | @regression |
| TC-TS-API-06 | POST invoice COD | @smoke @regression |
| TC-TS-API-07 | GET invoices | @regression |

### NEXA UI + API

See `frameworkdevelopment.md` sections 6 and 12 — TC-UI-01 to TC-UI-13, TC-API-01 to TC-API-05.

---

## 5. Known behaviors

### Toolshop

1. **Double Confirm** on checkout required for invoice
2. **`house_number`** required in billing form
3. **Product ULIDs** rotate when demo DB resets — update `toolshopProductData.json`
4. Current sample ID: `01KZ2WFC8DM9KV0TCKB1MFSDRB` (Combination Pliers)

### NEXA

1. Cars mega-menu links hidden until hover
2. Dealer locator at `/connect-to-dealer`
3. Navigate may be button without `href`
4. CMS content drift on live site

---

## 6. File index

```text
qa-ai-practical-assessment-main/
├── PrismStructure-playwright/           ← RUN TESTS HERE
├── manual-test-cases/
│   ├── FunctionalTestCase.csv           ← NEXA (20)
│   └── ToolshopFunctionalTestCase.csv ← Toolshop (8)
├── ai-prompts/
├── defects/defect-report.md
├── exploratory-testing/exploratory-notes.md
├── execution-evidence/
├── frameworkdevelopment.md
├── requirements-and-risk-analysis.md
├── project-info.md
└── readme.md
```

---

## 7. Git push (user action)

```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main
git add .
git commit -m "feat: QA assessment — Toolshop + NEXA Playwright suite"
git push -u origin main
```

---

*End of session handoff.*

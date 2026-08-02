# Session Handoff — NEXA QA Assessment

**Date:** 2026-07-31  
**Status:** Framework complete, 18/18 automated tests passing  
**Primary AI tool:** Cursor (Composer)

---

## 1. What was completed

| Item | Status | Location |
|------|--------|----------|
| Requirements & risk analysis review (AC1, AC2) | Done | `ai-prompts/requirements-and-planning.md` |
| Manual test cases (AC1 + AC2, 20 cases) | Done | `manual-test-cases/FunctionalTestCase.csv`, `ai-prompts/test-design.md` |
| Playwright framework (POM, UI + API) | Done | `PrismStructure-nexa-playwright/` |
| Automated test suite | **18 passed** | `PrismStructure-nexa-playwright/tests/` |
| Playwright MCP config | Done | `.cursor/mcp.json` (restart Cursor to activate) |
| Parent npm scripts | Done | `package.json` (inner project root) |
| Framework documentation | Done | `frameworkdevelopment.md` |
| AI prompt archive | Done | `ai-prompts/*.md` |

---

## 2. Application scope (do not expand without review)

### In scope
- **NEXA UI (read-only):** https://www.nexaexperience.com/
  - AC1: Homepage → Cars menu → model detail → price/specs → Build Your Own link
  - AC2: Dealer locator at `/connect-to-dealer` — city/pincode search, results, validation
- **API dummy:** https://jsonplaceholder.typicode.com/ — GET/POST posts contract tests

### Out of scope
- Test drive, service booking, Book a Car, dealer contact / lead forms
- Configurator submission
- AC3 quiz completion (optional stretch)

---

## 3. How to run tests (critical path)

```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-nexa-playwright
npm test
```

**Wrong paths (will fail):**
- `D:\TrainingQA\qa-ai-practical-assessment-main` — no package.json
- `npx playwright test` from outer wrapper folder — wrong test root / ENOENT

**Commands:**
| Command | Purpose |
|---------|---------|
| `npm test` | All 18 tests |
| `npm run test:ui` | NEXA UI only (13) |
| `npm run test:api` | API only (5) |
| `npm run test:smoke` | @smoke tags |
| `npm run test:headed` | Visible browser |
| `npm run report` | HTML report |

From inner project root (one level up from `PrismStructure-nexa-playwright`):
```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main
npm test
```

---

## 4. Automated test inventory

### AC1 — Car Discovery (`01_carDiscovery.spec.js`)
| ID | Scenario | Tags |
|----|----------|------|
| TC-UI-01 | Homepage loads with featured content | @smoke @regression |
| TC-UI-02 | Cars menu exposes model links | @regression |
| TC-UI-03 | Navigate to model detail page | @smoke @regression |
| TC-UI-04 | Model detail price and specs | @regression |
| TC-UI-05 | Build Your Own link present | @regression |
| TC-UI-06 | Invalid model URL graceful | @regression |
| TC-UI-07 | Homepage load time budget | @regression |

### AC2 — Dealer Locator (`02_dealerLocator.spec.js`)
| ID | Scenario | Tags |
|----|----------|------|
| TC-UI-08 | Showroom entry on homepage | @regression |
| TC-UI-09 | Valid city search returns results | @smoke @regression |
| TC-UI-10 | Navigate links on results | @regression |
| TC-UI-11 | Invalid pincode no crash | @regression |
| TC-UI-12 | Empty search handled | @regression |
| TC-UI-13 | Locator page load timeout | @regression |

### API (`01_postsApi.spec.js`)
| ID | Scenario | Tags |
|----|----------|------|
| TC-API-01 | GET /posts list | @smoke @regression |
| TC-API-02 | GET /posts/{id} | @smoke @regression |
| TC-API-03 | GET invalid id 404 | @regression |
| TC-API-04 | POST valid 201 | @smoke @regression |
| TC-API-05 | POST malformed no 5xx | @regression |

---

## 5. Manual tests (not automated)

20 cases in `manual-test-cases/FunctionalTestCase.csv` (TC-MAN-01 to TC-MAN-20). Execute manually on live site using steps in CSV or `ai-prompts/test-design.md`.

---

## 6. Known production behaviors

1. **Cars mega-menu** — model links hidden until Cars menu hover/click
2. **Featured hero** — e-vitara in hero; not all models visible on first paint
3. **Dealer locator** — use `/connect-to-dealer`; CITY and PINCODE tabs
4. **Homepage dealer entry** — "Locate Your Nearest NEXA Showroom" section (scroll down), not footer link
5. **Navigate control** — may be button without `href`; opens map behavior
6. **TC-UI-11 / TC-MAN-16** — production may show default regional dealers instead of strict empty state
7. **Content drift** — prices, models, copy may change (AEM CMS)

---

## 7. Recommended next steps

| Priority | Task |
|----------|------|
| High | Execute manual CSV cases; record pass/fail in spreadsheet |
| High | Copy `PrismStructure-nexa-playwright/playwright-report/` to `execution-evidence/` for submission |
| Medium | Fill dates in `project-info.md` and `requirements-and-risk-analysis.md` |
| Medium | Exploratory notes in `exploratory-testing/exploratory-notes.md` |
| Low | AC3 Help Me Select (optional stretch) |
| Low | CI pipeline (GitHub Actions) for API tests only if production UI too flaky in CI |

---

## 8. File index

```text
qa-ai-practical-assessment-main/
├── PrismStructure-nexa-playwright/                    ← Playwright project (RUN TESTS HERE)
├── manual-test-cases/FunctionalTestCase.csv
├── ai-prompts/
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── test-data.md
│   ├── automation-and-debugging.md
│   ├── documentation-and-summary.md
│   └── session-handoff.md         ← this file
├── frameworkdevelopment.md
├── requirements-and-risk-analysis.md
├── project-info.md
├── readme.md
```

---

## 9. Contacts / references

- **NEXA site:** https://www.nexaexperience.com/
- **Dealer locator:** https://www.nexaexperience.com/connect-to-dealer
- **JSONPlaceholder:** https://jsonplaceholder.typicode.com/
- **Playwright docs:** https://playwright.dev/

---

*End of session handoff.*

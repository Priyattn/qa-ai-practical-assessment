# AI Prompts — Documentation and Summary

**Session dates:** 2026-07-31 to 2026-08-03  
**Assessment:** QA AI Practical Assessment (Toolshop Part B + NEXA secondary)

---

## Entry 1 — NEXA framework delivery (2026-07-31)

**Prompt:**

"store all the prompt and response in ai-prompt md file and give session hand off md file and frameworkdevelopment.md file"

**AI Response Summary:**

1. Requirements review — AC1/AC2 scoped for live production (read-only UI + dummy API)
2. Manual test cases — 20 NEXA cases (TC-MAN-01 to TC-MAN-20)
3. Playwright framework — 18 automated tests (13 UI + 5 API), all passing
4. AI prompt archive — `ai-prompts/*.md`
5. Session handoff + framework documentation

---

## Entry 2 — Toolshop Part B integration (2026-08-01 to 2026-08-03)

**Prompt:**

Assessment Part B — add Toolshop to same framework: manual CSV, project-info, folder rename, JSDoc, specs in existing `PrismStructure-playwright/`.

**AI Response Summary:**

1. **Toolshop manual tests** — `manual-test-cases/ToolshopFunctionalTestCase.csv` (8 cases, TC-MAN-TS-01 to TC-MAN-TS-08)
2. **Toolshop page objects** — `toolshopPOManager.js` + login, home, product, checkout, invoices pages
3. **Toolshop specs** — 7 UI + 7 API tests (`TC-TS-UI-*`, `TC-TS-API-*`)
4. **Playwright projects** — `ui-toolshop`, `api-toolshop` added to `playwright.config.js`
5. **Folder rename** — `PrismStructure-nexa-playwright` → `PrismStructure-playwright`
6. **Docs updated** — `project-info.md`, `readme.md`, `requirements-and-risk-analysis.md`, `frameworkdevelopment.md`
7. **Product ID fix** — demo DB reset; refreshed `toolshopProductData.json`
8. **JSDoc** — all page object methods documented

### Deliverables map

| Artifact | Path |
|----------|------|
| Requirements analysis | `requirements-and-risk-analysis.md` |
| NEXA manual CSV | `manual-test-cases/FunctionalTestCase.csv` |
| Toolshop manual CSV | `manual-test-cases/ToolshopFunctionalTestCase.csv` |
| Automation framework | `PrismStructure-playwright/` |
| Playwright HTML report | `PrismStructure-playwright/playwright-report/index.html` |
| Execution evidence | `execution-evidence/index.html` |
| Exploratory notes | `exploratory-testing/exploratory-notes.md` |
| Defect report | `defects/defect-report.md` |
| AI prompt history | `ai-prompts/` |
| Session handoff | `ai-prompts/session-handoff.md` |
| Framework doc | `frameworkdevelopment.md` |
| Project workflow doc | `project-info.md` |
| Run guide | `readme.md` |

### Test coverage summary

| Suite | Automated | Manual |
|-------|-----------|--------|
| Toolshop UI | 7 (TC-TS-UI-*) | 7 (TC-MAN-TS-01 to 07) |
| Toolshop API | 7 (TC-TS-API-*) | 1 (TC-MAN-TS-08) |
| NEXA UI | 13 (TC-UI-*) | 20 (TC-MAN-01 to 20) |
| JSONPlaceholder API | 5 (TC-API-*) | — |
| **Total automated** | **32** | **28 manual** |

### Validation

- `npm run test:toolshop` — 14/14 pass
- `npm test` — 32/32 pass (2026-08-03)
- Repo: https://github.com/Priyattn/qa-ai-practical-assessment

---

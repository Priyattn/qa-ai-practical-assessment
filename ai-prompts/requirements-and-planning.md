# AI Prompts — Requirements and Planning

**Session date:** 2026-07-31  
**Application:** Maruti Suzuki NEXA — https://www.nexaexperience.com/ (read-only UI)  
**Dummy API:** JSONPlaceholder — https://jsonplaceholder.typicode.com/

---

## Entry 1

**Prompt:**

"Task : Your are Senior QA Engineer ,I've attached requirements-and-risk-analysis.md. Read it and confirm you understand the scope: NEXA UI (read-only flows only, no form submissions) and a dummy API (JSONPlaceholder). Before we write any code, review the AC1 (Car Discovery) and AC2 (Dealer Locator) requirement tables and tell me if you'd add or remove anything given that this is a live production site with no test environment. Enable the Playwright mcp , configured first and generate the test case in xls format let me know for any questions. Copy this prompt + Cursor's full response straight into ai-prompts/requirements-and-planning.md, create a new file"

**AI Response Summary:**

### Scope confirmation

| Layer | In scope | Out of scope |
|-------|----------|--------------|
| **NEXA UI** | Homepage load, Cars menu navigation, model detail pages, Build Your Own link presence, dealer locator search (city/pincode), results/empty-state structure | Test drive booking, service booking, Book a Car, dealer contact/lead forms, configurator submission |
| **JSONPlaceholder API** | GET/POST contract validation (status, shape) | Any NEXA real backend; persistence assertions on POST |

All UI automation is **read-only** on live production — no lead-generating submissions.

### AC1 (Car Discovery) — suggested changes

**Keep:** R1–R7 as written; they map well to smoke/regression.

**Add:**
- **R1a** — Homepage hero / featured model visible (site currently features e-vitara in hero, not all models on first paint)
- **R2a** — Cars mega-menu hover/click exposes model links (models are in dropdown, not always visible)
- **R7 note** — Assert load completes without hard timeout; avoid strict SLA numbers on production CDN

**Remove / defer:**
- Exact copy assertions on model names/prices (CMS drift)
- Deep configurator E2E (submission out of scope)

**Adjust priority:**
- R5 (Build Your Own) — keep Medium; verify link navigates only, do not submit configuration

### AC2 (Dealer Locator) — suggested changes

**Keep:** R8–R13; structural assertions are correct for production.

**Add:**
- **R9a** — PINCODE tab search path (site has CITY + PINCODE tabs on `/connect-to-dealer`)
- **R8a** — Homepage section "Locate Your Nearest NEXA Showroom" + "Explore Nearby Showrooms" (not only footer "Connect to Dealer")

**Remove / soften:**
- Exact dealer names, counts, or map coordinate accuracy
- Strict R11 empty-state on production (site may fall back to default regional dealers); document actual behavior

**Adjust:**
- R13 — Navigate may be button without `href`; assert presence + map behavior, not only URL pattern

### Playwright MCP

Configured project-level MCP at `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--browser=chromium", "--viewport-size=1280,720"],
      "env": { "PLAYWRIGHT_BROWSERS_PATH": "0" }
    }
  }
}
```

**Note:** Restart Cursor after adding MCP. Manual test cases were generated as CSV (see `manual-test-cases/FunctionalTestCase.csv` and `ai-prompts/test-design.md`).

**Validation Notes:**
- Live site exploration confirmed `/connect-to-dealer`, Cars mega-menu, CITY/PINCODE tabs, homepage showroom section.
- Playwright MCP requires Cursor restart to load; framework was built with standard Playwright CLI in `PrismStructure-playwright/`.

---

## Entry 2

**Prompt:**

"we need to develop the framework"

**AI Response Summary:**

Built full Playwright framework under `PrismStructure-playwright/`:
- Page Object Model: `homePage`, `modelDetailPage`, `dealerLocatorPage`, `POManager`
- UI specs: `01_carDiscovery.spec.js` (7 tests), `02_dealerLocator.spec.js` (6 tests)
- API spec: `01_postsApi.spec.js` (5 tests)
- `playwright.config.js` — single worker, UI/API projects, HTML reporter
- Test data: `dealerSearchData.json`, `postPayload.json`
- **18 automated tests — all passing** against live NEXA + JSONPlaceholder

See `frameworkdevelopment.md` for full technical detail.

**Validation Notes:**
- Selector fixes after first run: Cars menu hover, visible price/spec scan, homepage showroom section scroll, Navigate as link or button.
- TC-UI-11 adjusted for production pincode fallback behavior.

---

## Entry 3

**Prompt:**

"give the command to run the test cases" / terminal path errors (`ENOENT package.json`, wrong working directory)

**AI Response Summary:**

**Correct path:**
```text
D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-playwright
```

**Commands:**
```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-playwright
npm install
npx playwright install chromium
npm test
```

**Common mistakes:**
- Running from `D:\TrainingQA\qa-ai-practical-assessment-main` (outer folder — no package.json)
- Running `npx playwright test` from outer wrapper folder (no `package.json` at that level)
- Use `npm test` from `PrismStructure-playwright/` or `npm test` from inner project root (forwarding scripts added)

**Validation Notes:**
- Verified 18 passed from `PrismStructure-playwright/` directory.
- Parent `package.json` updated with `npm --prefix PrismStructure-playwright` scripts.

---

## Entry 4 — Toolshop Part B scope (2026-08-01)

**Prompt:**

Assessment doc Part B — Practice Software Testing Toolshop. Add to same repo/framework without second UI folder.

**AI Response Summary:**

### Toolshop scope confirmed

| Layer | In scope |
|-------|----------|
| UI | Login, catalog, product detail, cart, COD checkout (double Confirm), My Invoices |
| API | Login/token, products, cart create/add, invoice POST, invoices GET |

### Assessment-critical behaviors

1. Double **Confirm** on checkout for invoice generation
2. `data-test` selectors from live DOM exploration
3. Demo customer: `customer@practicesoftwaretesting.com` / `welcome01`
4. Separate Playwright projects per base URL — no mixed baseURL in one project

### Deliverables added

- `manual-test-cases/ToolshopFunctionalTestCase.csv`
- Toolshop section in `project-info.md` and `requirements-and-risk-analysis.md`
- `TC-TS-UI-*` and `TC-TS-API-*` automation IDs

**Validation Notes:**
- Merged into `PrismStructure-playwright/` — NEXA specs unchanged.
- See `ai-prompts/documentation-and-summary.md` Entry 2 for full delivery list.

---

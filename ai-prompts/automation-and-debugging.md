# AI Prompts — Automation and Debugging

**Session date:** 2026-07-31

---

## Entry 1

**Prompt:**

"we need to develop the framework"

**AI Response Summary:**

### Framework structure created

```text
PrismStructure-nexa-playwright/
├── api/objects/postsApiPage.js
├── api/testdata/postPayload.json
├── ui/pageobjects/homePage.js, modelDetailPage.js, dealerLocatorPage.js, POManager.js
├── ui/resources/data/dealerSearchData.json
├── tests/ui/01_carDiscovery.spec.js, 02_dealerLocator.spec.js
├── tests/api/01_postsApi.spec.js
├── playwright.config.js
└── package.json
```

### Design decisions

- **POManager** central registry for all page objects
- **Single worker** (`workers: 1`) — production site load discipline
- **Separate projects** — `ui` (NEXA) and `api` (JSONPlaceholder)
- **Retries: 1** for flaky live-site tolerance
- **Trace/video/screenshot** on failure only

### Selector strategy (live AEM site)

| Area | Approach |
|------|----------|
| Homepage featured content | `main`, "Discover Your Perfect Car", "Explore Now" |
| Model links | Cars mega-menu hover + `header/nav a[href="/fronx"]` or direct `goto` |
| Model detail price/specs | Scan visible elements matching ₹/LAKH/Variant patterns |
| Dealer locator entry | Homepage heading + "Explore Nearby Showrooms" (scroll into view) |
| Dealer search | `/connect-to-dealer`, CITY/PINCODE tabs, visible `input` |
| Navigate control | `getByRole('link'|'button', { name: /Navigate/i })` |

**Validation Notes:**
- First UI run: 6 failures — hidden carousel links, footer vs main dealer links, empty href on Navigate.
- All fixes applied; final run 18/18 passed.

---

## Entry 2

**Prompt:**

Terminal errors: `ENOENT package.json`, `Cannot find module '@playwright/test'`, `No tests found`

**AI Response Summary:**

### Root causes

1. **Wrong directory** — `D:\TrainingQA\qa-ai-practical-assessment-main` has no `package.json`
2. **Wrong Playwright invocation** — `npx playwright test` from outer wrapper folder (no `package.json` and wrong test root)
3. **User tried `cd list`** — should use `dir` to list folders, not `cd list`

### Fix

Always run from:
```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main\PrismStructure-nexa-playwright
npm test
```

Or from inner project root:
```powershell
cd D:\TrainingQA\qa-ai-practical-assessment-main\qa-ai-practical-assessment-main
npm test
```

### Path ladder

```text
D:\TrainingQA\qa-ai-practical-assessment-main                    ← WRONG
  └── qa-ai-practical-assessment-main                            ← OK (npm scripts)
      └── PrismStructure-nexa-playwright                         ← BEST
```

**Validation Notes:**
- User repeatedly stuck at outer folder; provided step-by-step `cd qa-ai-practical-assessment-main` then `cd PrismStructure-nexa-playwright`.

---

## Entry 3

**Prompt:**

Playwright MCP configuration

**AI Response Summary:**

Created `.cursor/mcp.json` with `@playwright/mcp@latest` for browser exploration via Cursor MCP tools. Requires Cursor Settings → Tools & MCP enabled and IDE restart.

Framework execution does **not** require MCP — use `npm test` in `PrismStructure-nexa-playwright/`.

**Validation Notes:**
- MCP catalog may not show Playwright until restart; CLI Playwright used for framework validation.

---

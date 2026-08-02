# AI Prompts — Documentation and Summary

**Session date:** 2026-07-31  
**Assessment:** NEXA QA Practical Assessment (Playwright + AI-assisted QA workflow)

---

## Entry 1

**Prompt:**

"store all the prompt and response in ai-prompt md file and give session hand off md file and frameworkdevelopment.md file"

**AI Response Summary:**

This session delivered:

1. **Requirements review** — AC1/AC2 scoped for live production (read-only UI + dummy API)
2. **Manual test cases** — 20 cases (TC-MAN-01 to TC-MAN-20) in CSV format
3. **Playwright framework** — 18 automated tests (13 UI + 5 API), all passing
4. **AI prompt archive** — all `ai-prompts/*.md` files
5. **Session handoff** — `ai-prompts/session-handoff.md`
6. **Framework documentation** — `frameworkdevelopment.md`

### Deliverables map

| Artifact | Path |
|----------|------|
| Requirements analysis | `requirements-and-risk-analysis (1).md` |
| Manual test cases CSV | `manual-test-cases/FunctionalTestCase.csv` |
| Automation framework | `PrismStructure-nexa-playwright/` |
| Playwright HTML report | `PrismStructure-nexa-playwright/playwright-report/index.html` |
| MCP config | `.cursor/mcp.json` |
| AI prompt history | `ai-prompts/` |
| Session handoff | `ai-prompts/session-handoff.md` |
| Framework doc | `frameworkdevelopment.md` |

### Test coverage summary

| Layer | Automated | Manual |
|-------|-----------|--------|
| AC1 Car Discovery | TC-UI-01 to TC-UI-07 | TC-MAN-01 to TC-MAN-10 |
| AC2 Dealer Locator | TC-UI-08 to TC-UI-13 | TC-MAN-11 to TC-MAN-20 |
| API Dummy | TC-API-01 to TC-API-05 | — |
| **Total** | **18** | **20** |

### Out of scope (documented)

- Test drive, service booking, Book a Car, dealer contact forms
- AC3 Help Me Select quiz completion (visibility only in TC-MAN-10)
- Exact dealer/map accuracy on production locator

**Validation Notes:**
- Full suite run: 18 passed (~1–2 min).
- User path issues resolved with explicit `cd` instructions to nested `automation` folder.

---

# Defect Report — QA AI Practical Assessment

**Applications tested:**

| Suite | URL | Period |
|-------|-----|--------|
| Toolshop (Part B) | https://practicesoftwaretesting.com/ | 2026-08-01 to 2026-08-03 |
| NEXA (read-only) | https://www.nexaexperience.com/ | 2026-07-31 to 2026-08-02 |

**Environment:** Live demo / production (no staging)

---

## Summary

| Severity | Toolshop | NEXA | Total |
|----------|----------|------|-------|
| Critical | 0 | 0 | 0 |
| High | 0 | 0 | 0 |
| Medium | 0 | 0 | 0 |
| Low | 0 | 0 | 0 |
| Observation / test constraint | 2 | 4 | 6 |

No blocking product defects filed. Items below are **test design observations** — not submitted as application bugs.

---

## Toolshop observations

| ID | Area | Observation | Impact on testing | Status |
|----|------|-------------|-------------------|--------|
| OBS-TS-01 | Product catalog | Demo DB resets rotate product ULIDs | Stale `sampleProductId` causes 404 on product page and API cart add | Mitigated — ID refreshed in `toolshopProductData.json` |
| OBS-TS-02 | Checkout | Invoice requires double **Confirm** after finish | Automation must click Confirm twice; documented in specs and `toolshopCheckoutPage.js` | Documented |

---

## NEXA observations

| ID | Area | Observation | Impact on testing | Status |
|----|------|-------------|-------------------|--------|
| OBS-01 | Car Discovery | Model links in Cars mega-menu hidden until hover/click | Automation uses menu open + `goto` fallback | Documented |
| OBS-02 | Dealer Locator | Invalid/remote search may show default regional dealers | Empty-state tests assert no-crash + structural handling | Documented |
| OBS-03 | Dealer Locator | Navigate control may lack `href` | Assertions check enabled state / map behavior | Documented |
| OBS-04 | General | CMS-driven content (models, prices) may change | Structural assertions, not exact copy | Documented |

---

## Defect log

| Defect ID | Application | Title | Severity | Status |
|-----------|-------------|-------|----------|--------|
| — | — | No defects logged | — | — |

---

*Add rows with steps, expected, actual, and screenshots in `execution-evidence/` if defects are found during final manual walkthrough.*

# Defect Report — NEXA QA Assessment

**Application:** https://www.nexaexperience.com/  
**Assessment period:** 2026-07-31 to 2026-08-02  
**Environment:** Live production (read-only testing)

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| Observation / test constraint | 4 |

No blocking defects filed. Items below are **observations** affecting test assertions on a live marketing site — not submitted as product defects.

---

## Observations (test design notes)

| ID | Area | Observation | Impact on testing | Status |
|----|------|-------------|-------------------|--------|
| OBS-01 | Car Discovery | Model links in Cars mega-menu often hidden until hover/click | Automation uses menu open + direct `goto` fallback | Documented |
| OBS-02 | Dealer Locator | Invalid/remote search may show default regional dealers | Empty-state tests assert no-crash + structural handling | Documented |
| OBS-03 | Dealer Locator | Navigate control may lack `href` | Assertions check enabled state / map behavior | Documented |
| OBS-04 | General | CMS-driven content (models, prices) may change | Tests use structural assertions, not exact copy | Documented |

---

## Defect log

| Defect ID | Title | Severity | Status |
|-----------|-------|----------|--------|
| — | No defects logged | — | — |

---

*If defects are found during final manual walkthrough, add rows above with steps, expected, actual, and screenshots in `execution-evidence/`.*

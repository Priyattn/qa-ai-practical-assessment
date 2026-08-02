# Exploratory Testing Notes — NEXA

**Application:** https://www.nexaexperience.com/  
**Date:** 2026-07-31  
**Tester:** QA assessment (AI-assisted + browser validation)

---

## Session 1 — Production scoping (read-only)

**Focus:** What can be tested safely without submitting leads.

**Findings:**
- Homepage hero features **e-VITARA** with Explore Now / Build Your Own — not all models visible without opening **Cars** mega-menu.
- Model links exist in DOM but many are **hidden** in carousel/mega-menu until hover/click.
- Dealer locator lives at `/connect-to-dealer` with **CITY** and **PINCODE** tabs.
- Homepage showroom block: **Locate Your Nearest NEXA Showroom** + **Explore Nearby Showrooms** (scroll required). Footer "Connect to Dealer" is hidden in DOM — not primary entry.
- **Navigate** on dealer results may be button without `href`; map opens via click behavior.
- Invalid pincode / remote location on production may **fall back to default regional dealers** instead of strict "not enough dealers" message.
- Invalid model URL (`/nonexistent-car-xyz-999`) loads page without classic 404 — site tolerates unknown paths.

**Risks logged:**
- AEM CMS content drift (models, pricing, copy).
- No staging environment — all hits are production.
- Bot detection possible on commercial site (not observed during assessment runs).

**Out of scope (confirmed):** Test drive, service booking, Book a Car, dealer contact forms.

---

## Session 2 — Dealer locator edge behavior

**Focus:** Empty search, obscure location, pincode path.

**Findings:**
- Empty CITY search: no crash; page stays functional (TC-UI-12).
- Pincode `000000`: no crash; may show default Delhi-area results.
- Mumbai city search: consistent showroom results with distance text.

**Follow-up for manual:** Confirm pincode `400001` and empty PINCODE tab validation (TC-MAN-14, TC-MAN-18).

---

## Defects found during exploration

No functional defects logged as blockers for read-only flows. Production behaviors above documented as **test design constraints**, not product bugs.

See `defects/defect-report.md`.

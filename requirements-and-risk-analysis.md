# Requirements and Risk Analysis — NEXA QA Assessment

**Application Under Test (UI):** [Maruti Suzuki NEXA](https://www.nexaexperience.com/)
**API Under Test:** Dummy/mock API — [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (used to demonstrate API automation skills independently of the live production site)
**Analysed by:** AI-assisted SDET review via Cursor
**Date:** <fill in>

---

## 1. Application Overview

NEXA is Maruti Suzuki's **live production marketing and sales site** for its premium car range in India. It provides:
- Car model browsing (hatchback, sedan, SUV, hybrid variants)
- Model detail pages (variants, pricing, specs, configurator)
- "Help Me Select" recommendation quiz
- Dealer/showroom locator by city or pincode
- Test drive and service booking entry points (out of scope — see below)

Because this is a **real commercial site with no test/staging environment**, this assessment is scoped to **read-only, non-destructive UI journeys only**. No form submissions that would create real leads, bookings, or contact requests are automated.

The API layer is a **separate dummy API** (JSONPlaceholder), used purely to demonstrate API test design, request/response validation, and automation patterns — it has no functional relationship to the NEXA site.

---

## 2. Requirement Breakdown

### AC1 — Car Discovery Flow (Homepage → Model → Detail Page)

| # | Requirement | Type | Priority |
|---|---|---|---|
| R1 | Homepage loads and displays featured car model(s) | Functional | Critical |
| R2 | Navigation menu exposes car category links (Hatchback, Sedan, SUV, etc.) | Functional | High |
| R3 | Clicking a car model navigates to its detail/model page | Functional | Critical |
| R4 | Model detail page displays name, starting price, and key specs | Functional | Critical |
| R5 | "Build Your Own" / Configurator link is present and navigable | Functional | Medium |
| R6 | Invalid/removed model URL shows a graceful fallback (404 or redirect), not a broken page | Negative | Medium |
| R7 | Page loads within an acceptable time budget (no hard timeout/failure) | Non-functional | Medium |

### AC2 — Dealer Locator Flow

| # | Requirement | Type | Priority |
|---|---|---|---|
| R8 | "Locate Nearest Showroom" entry point is visible on homepage | Functional | High |
| R9 | User can search dealers by valid city/location input | Functional | Critical |
| R10 | Valid search returns a list of dealer results with distance/address | Functional | Critical |
| R11 | Search with a location that has no nearby dealers shows the "not enough dealers found" empty state | Negative / Edge | High |
| R12 | Empty search input is handled gracefully (validation message, not a crash) | Validation | Medium |
| R13 | Dealer result links (e.g., "Navigate") are present and point to a valid map/URL | Functional | Low |

### AC3 (Optional/Stretch) — Help Me Select Quiz Flow

| # | Requirement | Type | Priority |
|---|---|---|---|
| R14 | Quiz entry point ("Help Me Select") is accessible from homepage | Functional | Medium |
| R15 | User can progress through quiz steps and reach a recommendation result | Functional | Medium |

### API-DUMMY — JSONPlaceholder Contract Validation (Independent of NEXA UI)

| # | Requirement | Type | Priority |
|---|---|---|---|
| RA1 | `GET /posts` returns 200 and a non-empty array | Functional | Critical |
| RA2 | `GET /posts/{id}` returns 200 with matching `id` in response body | Functional | Critical |
| RA3 | `GET /posts/{invalid-id}` returns 404 | Negative | High |
| RA4 | `POST /posts` with a valid payload returns 201 with an echoed/created resource shape | Functional | Critical |
| RA5 | `POST /posts` with a malformed payload is handled without a 5xx server error | Negative | Medium |

---

## 3. Scope of Testing

| Module | In Scope | Out of Scope |
|---|---|---|
| Homepage | Load, featured content, nav links | Ad/marketing pixel behavior, A/B variant content |
| Car Discovery | Browse, model detail, configurator link | Actual "Build Your Own" configuration submission |
| Dealer Locator | Search, results, empty state | Real dealer contact submission, live maps API accuracy |
| Booking Flows (Test Drive / Service / Book a Car) | **Excluded entirely** | All — these submit real leads to a live business system |
| API (Dummy) | GET/POST contract validation | Any real backend tied to NEXA |

**Note:** Test Drive booking, Service booking, and "Book a Car" flows are intentionally excluded from automation because this is a live production system — automating form submissions here would generate real, non-reversible business leads. This exclusion itself is documented as a risk-based scoping decision (see Section 4).

---

## 4. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Automating live production site could submit real leads/bookings | Medium | Critical | Scope explicitly excludes all form-submission flows (test drive, service, book-a-car, dealer contact) |
| Site is a marketing CMS (Adobe AEM) — content/layout may change frequently | High | Medium | Prefer stable `data-*` attributes or ARIA roles over text/CSS-class selectors where available; document brittle selectors |
| No sandbox/staging environment — all runs hit production | High | Medium | Keep test frequency low, single worker, no parallel hammering; run only what's needed to validate |
| Dealer locator results depend on live third-party data (real dealer network) | Medium | Medium | Assert on structural presence of results/empty-state rather than exact dealer names/counts |
| Bot-detection / anti-automation measures on a commercial site | Medium | Medium | Do not attempt to bypass; if blocked, document as a finding rather than working around it |
| Dummy API (JSONPlaceholder) doesn't persist POST data | Low | Low | Document explicitly — assertions target response shape/status code, not real persistence |
| Rate limiting or geo-blocking on the dummy API | Low | Low | Use `beforeAll` retries; fall back to a local `json-server` mock if needed |

---

## 5. Test Coverage Strategy

### Coverage by Type

| Type | Count (approx.) | Description |
|---|---|---|
| Positive / Happy Path | 8 | Valid navigation and search flows |
| Negative | 4 | Invalid input, no-results states, invalid IDs |
| Edge Case | 3 | Empty fields, boundary/rare locations, malformed API payload |

### Coverage by Layer

| Layer | Smoke | Regression | Total |
|---|---|---|---|
| UI (NEXA) | 3 | 10 | 13 |
| API (Dummy) | 2 | 3 | 5 |
| **Total** | **5** | **13** | **18** |

*(Adjust counts once actual test cases are finalized in Phase 2.)*

### Requirements Traceability

| Requirement | Test Case(s) |
|---|---|
| R1 — Homepage loads | TC-UI-01 |
| R2 — Category nav links | TC-UI-02 |
| R3/R4 — Model detail page | TC-UI-03, TC-UI-04 |
| R5 — Configurator link | TC-UI-05 |
| R6 — Invalid model URL | TC-UI-06 |
| R8/R9/R10 — Dealer search happy path | TC-UI-07 |
| R11 — No dealers found | TC-UI-08 |
| R12 — Empty search validation | TC-UI-09 |
| R13 — Dealer result navigate link | TC-UI-10 |
| R14/R15 — Help Me Select quiz | TC-UI-11, TC-UI-12 |
| RA1 — GET /posts | TC-API-01 |
| RA2 — GET /posts/{id} | TC-API-02 |
| RA3 — GET /posts/{invalid} | TC-API-03 |
| RA4 — POST /posts valid | TC-API-04 |
| RA5 — POST /posts malformed | TC-API-05 |

---

## 6. Assumptions

1. https://www.nexaexperience.com/ is a live production site with no available staging/sandbox environment; all testing is read-only.
2. Form-submission flows (test drive, service booking, book-a-car, dealer contact) are explicitly out of scope to avoid generating real business leads.
3. JSONPlaceholder (`https://jsonplaceholder.typicode.com`) is used as a stand-in API purely to demonstrate API test design/automation and does not represent NEXA's actual backend.
4. Dealer locator results may vary based on the tester's IP-derived location or manually entered city — assertions are structural, not content-exact.
5. Site content (car models, pricing, imagery) may change over time as it's a live marketing site — tests should target structural page elements, not exact copy.

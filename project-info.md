# project-info.md

**Primary AI Tool(s) Used:** Cursor (with Claude Sonnet)
**Application Under Test (UI):** Maruti Suzuki NEXA - https://www.nexaexperience.com/
**API Under Test:** JSONPlaceholder (dummy API) - https://jsonplaceholder.typicode.com/
**Assessment Start Date:** 2026-07-31 | **Submission Date:** 2026-08-02

---

## Project Summary

This project automates a QA test suite covering two acceptance criteria on a **live production site**, scoped deliberately to read-only journeys, plus a separate dummy-API suite to demonstrate API automation independently:
- **AC1:** Car Discovery — Homepage → Category → Model Detail Page (UI only)
- **AC2:** Dealer Locator — Search by city → View results / empty state (UI only)
- **API-DUMMY:** GET/POST contract validation against JSONPlaceholder (API only, unrelated to NEXA's real backend)

The framework is built on Playwright (JavaScript), using Page Object Model (POM), shared utilities, and a clear separation between UI and API tests — following the same conventions as prior assessments for consistency.

**Important scoping note:** Because NEXA is a live commercial site with no test/staging environment, all UI automation is restricted to non-destructive, read-only flows. Lead-generating actions (test drive booking, service booking, dealer contact forms) are explicitly excluded — see `requirements-and-risk-analysis.md` Section 3 for the full rationale.

---

## Tools Used

| Category | Tool |
|---|---|
| Browser | Chromium (via Playwright) |
| Automation Framework | Playwright (JavaScript) |
| AI Tool | Cursor (Claude Sonnet) |
| API Testing | Playwright request context |
| Reporting | Playwright HTML Reporter |
| Version Control | Git |
| Package Manager | npm |

---

## Setup Summary

### 1. How I provided project and system-under-test context to Cursor AI

I gave Cursor the live site URL and asked it to help me reason through **what could safely be automated on a production marketing site**, before writing any code. I explicitly told Cursor:
- This is a live site with real users and no sandbox — automation must be read-only
- Do not automate any form submission that could create a real lead or booking
- Use `data-*` attributes or ARIA roles for selectors where present; fall back to structural selectors (not brittle text/CSS-class matches) since content changes often
- API tests target a separate dummy API and have no functional link to the NEXA backend

### 2. How I used AI for requirement analysis

Asked Cursor to:
- Browse the two chosen flows (Car Discovery, Dealer Locator) conceptually and propose testable requirements
- Flag any flow that would submit real data, so it could be explicitly excluded
- Categorize each requirement as Functional / Validation / Negative / Non-functional with priority

### 3. How I used AI for test planning and strategy

- **Smoke:** Homepage load, one model detail page load, one dealer search
- **Regression:** Full navigation flows + negative/edge cases (invalid model URL, no-dealers-found state, empty search)
- Kept UI and dummy-API suites fully independent so one failing doesn't block the other

### 4. How I used AI for manual test case design

Prompted Cursor to generate test cases with:
- Positive, Negative, and Edge Case variants for each flow
- Preconditions, steps, expected results
- Priority mapping
- Exported as `manual-test-cases/FunctionalTestCase.csv`

Each case was manually walked through on the live site before being accepted, since AI cannot browse the live site itself.

### 5. How I used AI for automation design

- POManager as central page registry
- Separate `pageobjects/` for NEXA UI locators/methods vs `apiobjects/` for JSONPlaceholder endpoint definitions
- Single-worker execution to avoid excessive load on the live site

### 6. How I validated and refined AI-generated test cases and scripts

- Opened the live site in a real browser, inspected the DOM myself, and pasted actual `data-*`/class selectors back into Cursor rather than letting it guess
- Manually triggered the dealer locator "no results" state (e.g., searching an obscure location) to confirm the actual empty-state copy/behavior before writing the assertion
- Cross-checked JSONPlaceholder's documented response shapes against actual `curl`/Playwright request responses
- Rejected any AI suggestion that touched a form-submission element (test drive, service, contact) and asked Cursor to regenerate scoped to read-only actions only

### 7. How I used AI for test data generation

- Dealer search test data: a small set of known valid Indian cities + one deliberately obscure/rural location for the empty-state case
- API test data: static JSON payloads for JSONPlaceholder POST requests (no faker needed — no real user data involved)

### 8. How I used AI for debugging failing tests

- Used Cursor to analyze Playwright trace files/screenshots on failure
- Asked Cursor to suggest resilient selector alternatives when the AEM-driven site's DOM structure was deeply nested or dynamically generated
- Documented cases where the site's anti-automation behavior (if any) caused flakiness rather than working around it

### 9. What information I avoided sharing with AI tools

- Did not submit or generate any real personal data through actual site forms
- Did not attempt to access any NEXA internal/admin systems
- No real API keys, tokens, or credentials involved (dummy API requires none)

### 10. How I would reuse this QA workflow in a real project

- The read-only-first scoping discipline is directly reusable for any assessment against a live/production system with no test environment
- POManager + dummy-API separation pattern generalizes to any project needing to demonstrate API skills without a real backend
- Risk-based exclusion of destructive flows is a pattern worth applying whenever automating third-party or production systems

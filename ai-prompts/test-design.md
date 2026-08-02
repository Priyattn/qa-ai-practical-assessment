# AI Prompts — Test Design

---

## Entry 1

**Prompt:**

"Using the requirement tables in requirements-and-risk-analysis.md, generate manual test cases for AC1 and AC2 only (not the API). Include ID, Title, Preconditions, Steps, Expected Result, Priority, Type. Output as CSV format I can paste into a .csv file"

**AI Response:**

Manual test cases below cover **AC1 — Car Discovery** (R1–R7) and **AC2 — Dealer Locator** (R8–R13) only. API-DUMMY (RA1–RA5) and AC3 (Help Me Select quiz execution) are excluded per scope.

**Scoping notes applied:**
- All cases are **read-only** on the live production site — no test drive booking, service booking, Book a Car, or dealer contact form submissions.
- TC-MAN-07 clicks Build Your Own for navigation verification only; configuration submission is out of scope.
- TC-MAN-10 is an optional visibility check adjacent to AC1; quiz completion belongs to AC3.
- Dealer locator assertions are **structural** (results count, distance/address presence, empty state) — not exact dealer names or map coordinate accuracy.

### Requirements traceability

| Requirement | Manual test case(s) |
|---|---|
| R1 — Homepage loads / featured content | TC-MAN-01 |
| R2 — Category / model nav links | TC-MAN-02, TC-MAN-03 |
| R3 — Model navigation | TC-MAN-04 |
| R4 — Name, price, specs on detail page | TC-MAN-05, TC-MAN-06 |
| R5 — Build Your Own link | TC-MAN-07 |
| R6 — Invalid model URL | TC-MAN-08 |
| R7 — Load time budget | TC-MAN-09 |
| R8 — Showroom locator entry on homepage | TC-MAN-11, TC-MAN-12 |
| R9 — Valid city/pincode search | TC-MAN-13, TC-MAN-14 |
| R10 — Results with distance/address | TC-MAN-15 |
| R11 — No dealers empty state | TC-MAN-16 |
| R12 — Empty search validation | TC-MAN-17, TC-MAN-18 |
| R13 — Navigate link on results | TC-MAN-19, TC-MAN-20 |

### Coverage summary

| AC | Positive | Negative | Validation | Non-functional | Total |
|---|---|---|---|---|---|
| AC1 — Car Discovery | 7 | 1 | 0 | 1 | 10 |
| AC2 — Dealer Locator | 6 | 1 | 2 | 0 | 9 |
| **Total** | **13** | **2** | **2** | **1** | **20** |

### CSV (copy into `manual-test-cases/FunctionalTestCase.csv`)

```csv
ID,Title,Preconditions,Steps,Expected Result,Priority,Type
TC-MAN-01,Homepage loads and displays featured car content,Browser available; stable internet connection; no prior session required,"1. Open https://www.nexaexperience.com/ in a desktop browser (Chrome recommended). 2. Wait for the page to finish loading. 3. Observe the hero/banner and main content area. 4. Verify the page title and primary headings are displayed.",Homepage loads without error. URL is nexaexperience.com. Featured car content is visible (e.g. hero banner with Explore Now / featured model). Main landmark content is rendered. No blank page or unhandled error.,Critical,Functional
TC-MAN-02,Cars mega-menu exposes NEXA model links,User is on NEXA homepage,"1. Navigate to https://www.nexaexperience.com/. 2. Hover or click the Cars menu item in the header. 3. Observe the expanded menu panel. 4. Note all visible model links (e.g. FRONX Baleno Grand Vitara XL6 Jimny Invicto e VITARA).",Cars menu opens without error. Multiple car model links are displayed with navigable href paths. Menu is usable without page crash.,High,Functional
TC-MAN-03,Navigation exposes car category labels,User is on NEXA homepage,"1. Navigate to https://www.nexaexperience.com/. 2. Open the Cars mega-menu. 3. Scan menu labels and grouping for category terms (Hatchback Sedan SUV Hybrid or equivalent groupings).",Car category or segment labels are present in navigation structure. User can identify model families without submitting any form.,High,Functional
TC-MAN-04,Clicking a car model navigates to model detail page,User is on NEXA homepage,"1. Open the Cars mega-menu. 2. Click a model link (e.g. FRONX). 3. Wait for navigation to complete. 4. Note the browser URL and page content.",User is navigated to the correct model detail URL (e.g. /fronx). Model page loads without error. Browser does not remain on homepage.,Critical,Functional
TC-MAN-05,Model detail page displays model name and starting price,User can access a model detail page,"1. Navigate to https://www.nexaexperience.com/fronx (or any current NEXA model URL). 2. Wait for page load. 3. Locate model name/hero heading. 4. Locate starting price or price indicator (₹ / LAKH / from).",Model name or hero title is visible. Starting price or price-related text is visible on the page. No broken layout on primary content area.,Critical,Functional
TC-MAN-06,Model detail page displays key specs or variants,User is on a model detail page,"1. Open a model detail page (e.g. /fronx). 2. Scroll through the page. 3. Locate specifications variants mileage engine features or similar technical content sections.",Key specs variants or feature sections are present and readable. Content is structurally complete (sections load; not empty placeholder only).,Critical,Functional
TC-MAN-07,Build Your Own / Configurator link is present and navigable (read-only),User is on a model detail page,"1. Open a model detail page. 2. Locate Build Your Own or Configurator link/button. 3. Click the link (do not complete or submit configuration). 4. Observe resulting page or modal.",Build Your Own / Configurator entry point is visible. Click navigates to configurator or related page without site error. No lead/booking form is submitted as part of this test.,Medium,Functional
TC-MAN-08,Invalid model URL shows graceful fallback,Browser available,"1. Navigate directly to https://www.nexaexperience.com/nonexistent-car-xyz-999. 2. Wait for page response. 3. Observe whether a 404/not-found page appears or user is redirected.",Page does not show a raw server error or broken blank screen. Site shows 404/not-found messaging OR redirects to a valid NEXA page. User can continue browsing.,Medium,Negative
TC-MAN-09,Homepage loads within acceptable time budget,Browser cache cleared or hard refresh available,"1. Clear cache or use hard refresh. 2. Navigate to https://www.nexaexperience.com/. 3. Measure time until main content and hero are visible (target: under 60 seconds; ideal: under 10 seconds on normal broadband).",Homepage becomes interactive without hard timeout. Primary content appears within acceptable time. No perpetual loading spinner blocking the page.,Medium,Non-functional
TC-MAN-10,Help Me Select entry visible on homepage (read-only check),User is on NEXA homepage,"1. Navigate to homepage. 2. Locate Help Me Select or Discover Your Perfect Car section. 3. Confirm quiz entry link is present (do not complete quiz if out of scope).",Help Me Select or equivalent quiz entry is visible on homepage. Link is clickable. No action beyond visibility check required for AC1 scope boundary.,Low,Functional
TC-MAN-11,Locate Nearest Showroom section visible on homepage,User is on NEXA homepage,"1. Navigate to https://www.nexaexperience.com/. 2. Scroll to Locate Your Nearest NEXA Showroom section. 3. Observe section heading and supporting text.",Showroom locator section is visible on homepage. Section communicates dealer/showroom discovery intent. No page error when scrolling to section.,High,Functional
TC-MAN-12,Explore Nearby Showrooms entry navigates to dealer locator,User is on NEXA homepage,"1. Scroll to Locate Your Nearest NEXA Showroom section. 2. Click Explore Nearby Showrooms (or equivalent CTA). 3. Wait for navigation.",User reaches dealer/showroom locator experience (e.g. /connect-to-dealer). Locator page or map view loads without error.,High,Functional
TC-MAN-13,Dealer search by valid city returns results,User is on dealer locator page (https://www.nexaexperience.com/connect-to-dealer),"1. Open dealer locator page. 2. Select CITY tab if present. 3. Enter a valid Indian city (e.g. Mumbai Delhi Bangalore). 4. Select matching suggestion if autocomplete appears. 5. Submit search.",Search executes without crash. Results area updates. Message indicates showrooms found (e.g. found N NEXA showroom). At least one result row/card is displayed.,Critical,Functional
TC-MAN-14,Dealer search by valid pincode returns results,User is on dealer locator page,"1. Open dealer locator page. 2. Select PINCODE tab if present. 3. Enter a valid pincode for a major city (e.g. 400001 for Mumbai). 4. Submit search.",Search completes without error. Dealer/showroom results are displayed. Result count is greater than zero for a well-served pincode.,Critical,Functional
TC-MAN-15,Dealer results include distance and address information,User has performed a successful city or pincode search with results,"1. Perform valid dealer search (e.g. city Mumbai). 2. Inspect each result card/row. 3. Verify distance indicator (Km Away or similar) and address/dealer name fields are present.",Each result shows structural dealer information: name or label plus distance and/or address text. Results are readable and consistently formatted.,Critical,Functional
TC-MAN-16,Search with remote location shows not-enough-dealers or zero results,User is on dealer locator page,"1. Open dealer locator. 2. Enter a remote or obscure location/pincode unlikely to have nearby showrooms within default radius (e.g. remote island pincode or fabricated location). 3. Submit search. 4. Observe empty-state messaging.",Site shows not enough dealers found empty state OR zero showroom results OR validation indicating no dealers in radius. Page does not crash or hang. User can attempt a new search.,High,Negative
TC-MAN-17,Empty city search handled gracefully,User is on dealer locator CITY search mode,"1. Open dealer locator. 2. Select CITY tab. 3. Leave city field empty. 4. Submit search (Enter or Search button).",No browser crash or unhandled error. Validation message may appear OR page retains locator with default/previous state. User remains on NEXA site and can retry.,Medium,Validation
TC-MAN-18,Empty pincode search handled gracefully,User is on dealer locator PINCODE search mode,"1. Open dealer locator. 2. Select PINCODE tab. 3. Leave pincode field empty. 4. Submit search.",No crash or white screen. Validation or inline guidance may appear. Locator page remains functional for subsequent input.,Medium,Validation
TC-MAN-19,Dealer result Navigate control is present,User has valid dealer search results displayed,"1. Perform successful dealer search. 2. Inspect result cards. 3. Locate Navigate link or button on one or more results.",Navigate control is visible on dealer result entries. Control is clearly associated with a specific showroom result.,Low,Functional
TC-MAN-20,Dealer Navigate control opens map or valid target,User has dealer results with Navigate control visible,"1. Perform successful dealer search. 2. Click Navigate on first result (read-only: do not submit contact forms). 3. Observe new tab/window or map behavior.",Navigate opens Google Maps map URL or equivalent navigation target OR triggers in-page map behavior. No site error. No unintended lead/contact form submission.,Low,Functional
```

**Validation notes:**
- CSV saved to `manual-test-cases/FunctionalTestCase.csv` in the workspace.
- **Updated 2026-07-31:** Added execution columns (`Automation Reference`, `Execution Status`, `Execution Date`, `Executed By`, `Notes`). Automated results in `manual-test-cases/AutomationTestResults.csv` — 18/18 Pass.

---

## Entry 2

**Prompt:**

"have you marked status of test cases as well pass and fail for manual cases?"

**AI Response Summary:**

Original manual CSV template had design-only columns (no Pass/Fail). Execution status was added to NEXA deliverables:

| File | Status tracking |
|------|-----------------|
| `manual-test-cases/FunctionalTestCase.csv` | 20 manual cases — Pass / Pending Manual / Pass (Partial) + automation cross-ref |
| `manual-test-cases/AutomationTestResults.csv` | 18 automated cases — all **Pass** (2026-07-31) |

**Manual summary:** 13 Pass (automated), 2 Pass (Partial), 5 Pending Manual (TC-MAN-03, TC-MAN-10, TC-MAN-12, TC-MAN-14, TC-MAN-18).

**Validation Notes:**
- Pending Manual cases need human walkthrough on live site for full submission evidence.
- Steps validated against live site structure: Cars mega-menu for models, `/connect-to-dealer` for locator, CITY/PINCODE tabs, homepage showroom section with Explore Nearby Showrooms CTA.
- TC-MAN-16 empty-state behavior may vary on production (site may fall back to default regional dealers); manual tester should document actual behavior if empty state is not triggered.
- Pricing, model lineup, and dealer counts are content-dependent on a live marketing CMS — assertions focus on presence and structure, not exact copy.

---

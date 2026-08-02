# AI Prompts — Test Data

**Session date:** 2026-07-31

---

## Entry 1

**Prompt:**

(Implicit — framework development and manual test design for AC1/AC2)

**AI Response Summary:**

### UI test data — `PrismStructure-nexa-playwright/ui/resources/data/dealerSearchData.json`

| Key | Value | Purpose |
|-----|-------|---------|
| `validCities` | Mumbai, Delhi, Bangalore | Positive dealer city search (TC-UI-09) |
| `noDealerLocation` | Lakshadweep | Remote city empty-state attempts |
| `invalidLocation` | ZZZNoDealerCity12345 | Fabricated city |
| `remotePincode` | `000000` | Invalid pincode — no crash validation (TC-UI-11) |
| `models.default` | `fronx` | Default model detail navigation |
| `models.alternatives` | baleno, grand-vitara, xl6 | Alternate models |
| `invalidModelPath` | `/nonexistent-car-xyz-999` | Negative URL test (TC-UI-06) |

### API test data — `PrismStructure-nexa-playwright/api/testdata/postPayload.json`

| Key | Purpose |
|-----|---------|
| `validPost` | TC-API-04 POST 201 — title, body, userId |
| `malformedPost` | TC-API-05 — non-string title, null body (no 5xx) |

### API endpoints — `PrismStructure-nexa-playwright/api/objects/postsApiPage.js`

- Base: `https://jsonplaceholder.typicode.com`
- Endpoints: `GET/POST /posts`, `GET /posts/{id}`
- Expected status: 200, 201, 404

### Manual test data notes

Manual cases use the same cities/pincodes in steps (e.g. Mumbai `400001`). Tester should document actual empty-state behavior on production for remote locations.

**Validation Notes:**
- Mumbai city search returns showroom results on live `/connect-to-dealer`.
- JSONPlaceholder POST does not persist — assertions on response shape only.

---

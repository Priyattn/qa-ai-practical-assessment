const { test, expect } = require("@playwright/test");
const { POManager } = require("../../ui/pageobjects/POManager");
const dealerData = require("../../ui/resources/data/dealerSearchData.json");

/**
 * AC2 — Dealer Locator Flow
 * Read-only search verification — no dealer contact / lead submission.
 */
test.describe("NEXA - Dealer Locator", () => {
  let poManager;
  let homePage;
  let dealerLocatorPage;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    dealerLocatorPage = poManager.getDealerLocatorPage();
  });

  /** TC-UI-08 — R8: Dealer locator entry visible on homepage */
  test("TC-UI-08: Locate showroom entry point visible on homepage @regression", async () => {
    await homePage.goto();
    await homePage.verifyDealerLocatorEntryVisible();
    console.log("TC-UI-08 Passed: Dealer locator entry visible on homepage");
  });

  /** TC-UI-09 — R9/R10: Valid city search returns dealer results */
  test("TC-UI-09: Dealer search with valid city returns results @smoke @regression", async () => {
    const { city } = dealerData.validCities[0];
    await dealerLocatorPage.goto();
    await dealerLocatorPage.searchByCity(city);
    await dealerLocatorPage.verifyShowroomResultsDisplayed();
    console.log(`TC-UI-09 Passed: Showroom results displayed for ${city}`);
  });

  /** TC-UI-10 — R10: Results include Navigate links with valid URLs */
  test("TC-UI-10: Dealer results include Navigate links @regression", async () => {
    await dealerLocatorPage.goto();
    await dealerLocatorPage.verifyShowroomResultsDisplayed();
    await dealerLocatorPage.verifyNavigateLinksPresent();
    await dealerLocatorPage.verifyNavigateLinkHasValidHref();
    console.log("TC-UI-10 Passed: Navigate links present with valid href");
  });

  /** TC-UI-11 — R11: Invalid pincode handled without crash (production may fall back to default dealers) */
  test("TC-UI-11: Invalid pincode search handled without crash @regression", async () => {
    const { pincode } = dealerData.remotePincode;
    await dealerLocatorPage.goto();
    await dealerLocatorPage.searchByPincode(pincode);
    await dealerLocatorPage.verifyEmptySearchHandledGracefully();
    console.log("TC-UI-11 Passed: Invalid pincode search did not crash locator page");
  });

  /** TC-UI-12 — R12: Empty search handled gracefully */
  test("TC-UI-12: Empty dealer search handled without crash @regression", async () => {
    await dealerLocatorPage.goto();
    await dealerLocatorPage.submitEmptySearch();
    await dealerLocatorPage.verifyEmptySearchHandledGracefully();
    console.log("TC-UI-12 Passed: Empty search handled gracefully");
  });

  /** TC-UI-13 — Dealer locator page load performance */
  test("TC-UI-13: Dealer locator page loads within timeout @regression", async () => {
    await dealerLocatorPage.verifyPageLoadsWithinTimeout();
    console.log("TC-UI-13 Passed: Dealer locator page loaded within timeout");
  });
});

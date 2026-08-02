const { test, expect } = require("@playwright/test");
const { POManager } = require("../../ui/pageobjects/POManager");
const dealerData = require("../../ui/resources/data/dealerSearchData.json");

/**
 * AC1 — Car Discovery Flow (Homepage → Model → Detail Page)
 * Read-only navigation only — no form submissions.
 */
test.describe("NEXA - Car Discovery", () => {
  let poManager;
  let homePage;
  let modelDetailPage;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    modelDetailPage = poManager.getModelDetailPage();
  });

  /** TC-UI-01 — R1: Homepage loads with featured car models */
  test("TC-UI-01: Homepage loads with featured car content @smoke @regression", async () => {
    await homePage.goto();
    await homePage.verifyHomepageLoaded();
    const count = await homePage.getFeaturedModelCount();
    expect(count).toBeGreaterThan(0);
    console.log(`TC-UI-01 Passed: ${count} featured model links visible`);
  });

  /** TC-UI-02 — R2: Navigation exposes car model links in DOM */
  test("TC-UI-02: Navigation menu exposes car model links @regression", async () => {
    await homePage.goto();
    await homePage.verifyHomepageLoaded();
    const modelLinks = await homePage.getFeaturedModelCount();
    expect(modelLinks).toBeGreaterThan(0);
    console.log(`TC-UI-02 Passed: ${modelLinks} model links found in page DOM`);
  });

  /** TC-UI-03 — R3: Clicking a car model navigates to detail page */
  test("TC-UI-03: Navigate to car model detail page @smoke @regression", async () => {
    const slug = dealerData.models.default;
    await homePage.goto();
    await homePage.clickModelBySlug(slug);
    await modelDetailPage.verifyModelPageLoaded(slug);
    console.log(`TC-UI-03 Passed: Navigated to /${slug}`);
  });

  /** TC-UI-04 — R4: Model detail shows name, price, and key specs */
  test("TC-UI-04: Model detail page displays price and specs @regression", async () => {
    const slug = dealerData.models.default;
    await homePage.goto();
    await homePage.clickModelBySlug(slug);
    await modelDetailPage.verifyModelPageLoaded(slug);
    await modelDetailPage.verifyModelNameAndPricePresent();
    await modelDetailPage.verifyKeySpecsOrVariantsPresent();
    console.log("TC-UI-04 Passed: Price and specs/variants visible on model page");
  });

  /** TC-UI-05 — R5: Build Your Own / Configurator link is present */
  test("TC-UI-05: Build Your Own link is present on model page @regression", async () => {
    const slug = dealerData.models.default;
    await homePage.goto();
    await homePage.clickModelBySlug(slug);
    await modelDetailPage.verifyModelPageLoaded(slug);
    await modelDetailPage.verifyBuildYourOwnLinkPresent();
    console.log("TC-UI-05 Passed: Build Your Own link visible");
  });

  /** TC-UI-06 — R6: Invalid model URL shows graceful fallback */
  test("TC-UI-06: Invalid model URL handled gracefully @regression", async ({ page }) => {
    await page.goto(dealerData.invalidModelPath, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    await modelDetailPage.verifyInvalidUrlHandled();
    console.log(`TC-UI-06 Passed: Invalid URL handled — final URL: ${page.url()}`);
  });

  /** TC-UI-07 — R7: Page loads within acceptable time budget */
  test("TC-UI-07: Homepage loads within acceptable time @regression", async () => {
    const start = Date.now();
    await homePage.goto();
    await homePage.verifyHomepageLoaded();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(60000);
    console.log(`TC-UI-07 Passed: Homepage loaded in ${elapsed}ms`);
  });
});

const { test, expect } = require("@playwright/test");
const { ToolshopPOManager } = require("../../ui/pageobjects/toolshopPOManager");

/**
 * AC1 — Toolshop Catalog & Auth (assessment Part B)
 * UI: https://practicesoftwaretesting.com/
 */
test.describe("Toolshop - Catalog & Auth", () => {
  let poManager;
  let homePage;
  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    poManager = new ToolshopPOManager(page);
    homePage = poManager.getHomePage();
    loginPage = poManager.getLoginPage();
    productPage = poManager.getProductPage();
  });

  /** TC-TS-UI-01 — Sanity: homepage product catalog */
  test("TC-TS-UI-01: Homepage displays product catalog @smoke @regression", async () => {
    await homePage.goto();
    await homePage.verifyCatalogVisible();
    console.log("TC-TS-UI-01 Passed: Toolshop catalog visible");
  });

  /** TC-TS-UI-02 — Sanity: customer login */
  test("TC-TS-UI-02: Login with valid credentials @smoke @regression", async () => {
    await loginPage.loginAsCustomer();
    await loginPage.verifyLoggedIn();
    console.log("TC-TS-UI-02 Passed: Toolshop customer logged in");
  });

  /** TC-TS-UI-03 — Regression: product detail */
  test("TC-TS-UI-03: Product detail shows name and price @regression", async () => {
    await productPage.gotoProduct();
    await productPage.verifyProductDetailVisible();
    console.log("TC-TS-UI-03 Passed: Product detail loaded");
  });

  /** TC-TS-UI-04 — Sanity: add to cart */
  test("TC-TS-UI-04: Add product to cart updates quantity @smoke @regression", async () => {
    await loginPage.loginAsCustomer();
    await productPage.gotoProduct();
    await productPage.addToCartWithQuantity(2);
    const qty = await productPage.verifyCartQuantityGreaterThanZero();
    console.log(`TC-TS-UI-04 Passed: Cart quantity ${qty}`);
  });

  /** TC-TS-UI-06 — Regression: invalid login */
  test("TC-TS-UI-06: Login with invalid credentials shows error @regression", async ({ page }) => {
    await loginPage.loginWithInvalidCredentials();
    await expect(page.getByText(/invalid|incorrect|credentials/i)).toBeVisible({
      timeout: 10000,
    });
    console.log("TC-TS-UI-06 Passed: Invalid login rejected");
  });
});

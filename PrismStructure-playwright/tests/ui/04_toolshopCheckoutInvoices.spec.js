const { test, expect } = require("@playwright/test");
const { ToolshopPOManager } = require("../../ui/pageobjects/toolshopPOManager");

/**
 * AC2 — Toolshop Checkout & Invoices (assessment Part B)
 * Cash on delivery + double Confirm for invoice generation.
 */
test.describe("Toolshop - Checkout & Invoices", () => {
  let poManager;
  let loginPage;
  let productPage;
  let checkoutPage;
  let invoicesPage;

  test.beforeEach(async ({ page }) => {
    poManager = new ToolshopPOManager(page);
    loginPage = poManager.getLoginPage();
    productPage = poManager.getProductPage();
    checkoutPage = poManager.getCheckoutPage();
    invoicesPage = poManager.getInvoicesPage();
  });

  /** TC-TS-UI-05 — Sanity + Regression: E2E COD checkout */
  test("TC-TS-UI-05: Checkout COD generates invoice @smoke @regression", async () => {
    await loginPage.loginAsCustomer();
    await productPage.gotoProduct();
    await productPage.addToCartWithQuantity(1);
    await expect(productPage.cartQuantity).not.toHaveText("0", { timeout: 10000 });
    await checkoutPage.goto();
    await checkoutPage.fillBilling();
    await checkoutPage.completeCashOnDelivery();
    await checkoutPage.verifyInvoiceGenerated();
    console.log("TC-TS-UI-05 Passed: Invoice generated (double confirm)");
  });

  /** TC-TS-UI-07 — Regression: My Invoices list */
  test("TC-TS-UI-07: My Invoices page lists records @regression", async () => {
    await loginPage.loginAsCustomer();
    await invoicesPage.goto();
    await invoicesPage.verifyInvoiceListVisible();
    console.log("TC-TS-UI-07 Passed: Invoice list visible");
  });
});

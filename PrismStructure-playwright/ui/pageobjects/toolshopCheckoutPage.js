const { expect } = require("@playwright/test");
const billingData = require("../resources/data/toolshopBillingData.json");

/**
 * Toolshop checkout flow — billing, payment, invoice confirmation.
 * @class ToolshopCheckoutPage
 */
class ToolshopCheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.proceed1 = page.locator("[data-test=proceed-1]");
    this.proceed2 = page.locator("[data-test=proceed-2]");
    this.proceed3 = page.locator("[data-test=proceed-3]");
    this.country = page.locator("[data-test=country]");
    this.postalCode = page.locator("[data-test=postal_code]");
    this.houseNumber = page.locator("[data-test=house_number]");
    this.street = page.locator("[data-test=street]");
    this.city = page.locator("[data-test=city]");
    this.state = page.locator("[data-test=state]");
    this.paymentMethod = page.locator("[data-test=payment-method]");
    this.finish = page.locator("[data-test=finish]");
    this.confirmButton = page.locator("button:has-text('Confirm')");
    this.successMessage = page.getByText(/Thanks for your order/i);
    this.invoiceNumber = page.getByText(/INV-/);
  }

  /** Open checkout and wait for cart review step. @returns {Promise<void>} */
  async goto() {
    await this.page.goto("/checkout", { waitUntil: "networkidle" });
    await this.proceed1.waitFor({ state: "visible", timeout: 30000 });
  }

  /**
   * Expand billing/payment steps and fill address fields.
   * @param {object} [data] - Billing fields; defaults to toolshopBillingData.json
   * @returns {Promise<void>}
   */
  async fillBilling(data = billingData) {
    await this.proceed1.scrollIntoViewIfNeeded();
    await this.proceed1.click();
    await this.proceed2.click();
    await this.country.waitFor({ state: "visible" });
    await this.country.selectOption(data.country);
    await this.postalCode.fill(data.postal_code);
    await this.houseNumber.fill(data.house_number);
    await this.street.fill(data.street);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.proceed3.click();
    await this.paymentMethod.waitFor({ state: "visible" });
    await this.paymentMethod.selectOption(data.payment_method);
  }

  /**
   * Complete COD order — finish then Confirm (twice if modal re-prompts).
   * @returns {Promise<void>}
   */
  async completeCashOnDelivery() {
    await this.finish.scrollIntoViewIfNeeded();
    await this.finish.click();
    await this.page.waitForTimeout(1000);
    if (await this.confirmButton.count() > 0) {
      await this.confirmButton.first().click();
      await this.page.waitForTimeout(1000);
    }
    if (await this.confirmButton.count() > 0) {
      await this.confirmButton.first().click();
      await this.page.waitForTimeout(1000);
    }
  }

  /** Assert success message and INV- invoice number visible. @returns {Promise<void>} */
  async verifyInvoiceGenerated() {
    await expect(this.successMessage).toBeVisible({ timeout: 15000 });
    await expect(this.invoiceNumber).toBeVisible();
  }
}

module.exports = { ToolshopCheckoutPage };

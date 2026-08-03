const { expect } = require("@playwright/test");

/**
 * Toolshop My Invoices page (/account/invoices).
 * @class ToolshopInvoicesPage
 */
class ToolshopInvoicesPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator("[data-test=page-title]");
    this.invoiceTable = page.locator("table");
  }

  /** Navigate to invoices list. @returns {Promise<void>} */
  async goto() {
    await this.page.goto("/account/invoices", { waitUntil: "domcontentloaded" });
    await this.pageTitle.waitFor({ state: "visible" });
  }

  /** Assert page title and at least one INV- row in table. @returns {Promise<void>} */
  async verifyInvoiceListVisible() {
    await expect(this.pageTitle).toBeVisible();
    const tableText = await this.invoiceTable.innerText();
    expect(/INV-\d+/.test(tableText)).toBeTruthy();
  }
}

module.exports = { ToolshopInvoicesPage };

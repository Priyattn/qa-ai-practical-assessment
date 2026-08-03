const { ToolshopLoginPage } = require("./toolshopLoginPage");
const { ToolshopHomePage } = require("./toolshopHomePage");
const { ToolshopProductPage } = require("./toolshopProductPage");
const { ToolshopCheckoutPage } = require("./toolshopCheckoutPage");
const { ToolshopInvoicesPage } = require("./toolshopInvoicesPage");

/**
 * Page object registry for Practice Software Testing (Toolshop) UI.
 * @class ToolshopPOManager
 */
class ToolshopPOManager {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.loginPage = new ToolshopLoginPage(page);
    this.homePage = new ToolshopHomePage(page);
    this.productPage = new ToolshopProductPage(page);
    this.checkoutPage = new ToolshopCheckoutPage(page);
    this.invoicesPage = new ToolshopInvoicesPage(page);
  }

  /** @returns {ToolshopLoginPage} Toolshop login page object */
  getLoginPage() {
    return this.loginPage;
  }

  /** @returns {ToolshopHomePage} Toolshop homepage page object */
  getHomePage() {
    return this.homePage;
  }

  /** @returns {ToolshopProductPage} Toolshop product detail page object */
  getProductPage() {
    return this.productPage;
  }

  /** @returns {ToolshopCheckoutPage} Toolshop checkout page object */
  getCheckoutPage() {
    return this.checkoutPage;
  }

  /** @returns {ToolshopInvoicesPage} Toolshop My Invoices page object */
  getInvoicesPage() {
    return this.invoicesPage;
  }
}

module.exports = { ToolshopPOManager };

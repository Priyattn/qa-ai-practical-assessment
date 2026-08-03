const { HomePage } = require("./homePage");
const { ModelDetailPage } = require("./modelDetailPage");
const { DealerLocatorPage } = require("./dealerLocatorPage");

/**
 * Central page object registry for NEXA UI tests (read-only flows).
 * @class POManager
 */
class POManager {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.modelDetailPage = new ModelDetailPage(page);
    this.dealerLocatorPage = new DealerLocatorPage(page);
  }

  /** @returns {HomePage} NEXA homepage page object */
  getHomePage() {
    return this.homePage;
  }

  /** @returns {ModelDetailPage} NEXA model detail page object */
  getModelDetailPage() {
    return this.modelDetailPage;
  }

  /** @returns {DealerLocatorPage} NEXA dealer locator page object */
  getDealerLocatorPage() {
    return this.dealerLocatorPage;
  }
}

module.exports = { POManager };

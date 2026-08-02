const { HomePage } = require("./homePage");
const { ModelDetailPage } = require("./modelDetailPage");
const { DealerLocatorPage } = require("./dealerLocatorPage");

/**
 * Central page object registry for NEXA UI tests.
 */
class POManager {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.modelDetailPage = new ModelDetailPage(page);
    this.dealerLocatorPage = new DealerLocatorPage(page);
  }

  getHomePage() {
    return this.homePage;
  }

  getModelDetailPage() {
    return this.modelDetailPage;
  }

  getDealerLocatorPage() {
    return this.dealerLocatorPage;
  }
}

module.exports = { POManager };

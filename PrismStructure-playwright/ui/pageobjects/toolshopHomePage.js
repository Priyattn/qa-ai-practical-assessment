const { expect } = require("@playwright/test");
const productData = require("../resources/data/toolshopProductData.json");

/**
 * Toolshop homepage — product catalog entry.
 * @class ToolshopHomePage
 */
class ToolshopHomePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator("[data-test=search-query]");
    this.navHome = page.locator("[data-test=nav-home]");
    this.productLink = page.getByRole("link", {
      name: productData.sampleProductName,
      exact: false,
    });
  }

  /** Open Toolshop homepage. @returns {Promise<void>} */
  async goto() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
    await this.navHome.waitFor({ state: "visible" });
  }

  /** Assert search and sample product link visible. @returns {Promise<void>} */
  async verifyCatalogVisible() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.productLink.first()).toBeVisible();
  }
}

module.exports = { ToolshopHomePage };

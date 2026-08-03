const { expect } = require("@playwright/test");

/**
 * NEXA model detail page (e.g. /fronx, /baleno).
 * @class ModelDetailPage
 */
class ModelDetailPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.buildYourOwnLink = page.getByRole("link", { name: /Build Your Own/i }).first();
    this.priceIndicator = page.getByText(/₹|LAKH|from/i).first();
    this.specOrVariantSection = page.getByText(/Variant|Specification|Mileage|Engine|Features/i).first();
    this.modelHero = page.locator("main, [role='main'], .hero, h1").first();
  }

  /**
   * Assert URL contains expected model slug and hero visible.
   * @param {string} expectedSlug - Model path slug (e.g. fronx)
   * @returns {Promise<void>}
   */
  async verifyModelPageLoaded(expectedSlug) {
    await expect(this.page).toHaveURL(new RegExp(expectedSlug, "i"), { timeout: 30000 });
    await expect(this.modelHero).toBeVisible({ timeout: 30000 });
  }

  /** Assert visible price-related text on page. @returns {Promise<void>} */
  async verifyModelNameAndPricePresent() {
    const visiblePrice = await this.findFirstVisibleByText(/₹|LAKH|from/i);
    expect(visiblePrice).toBeTruthy();
  }

  /** Assert specs/variants section text visible. @returns {Promise<void>} */
  async verifyKeySpecsOrVariantsPresent() {
    const visibleSpec = await this.findFirstVisibleByText(
      /Variant|Specification|Mileage|Engine|Features|Power|Fuel|Transmission|Dimensions/i
    );
    expect(visibleSpec).toBeTruthy();
  }

  /**
   * Scan visible elements for regex text match.
   * @param {RegExp} pattern - Text pattern to find
   * @returns {Promise<boolean>} True if any matching element is visible
   */
  async findFirstVisibleByText(pattern) {
    const candidates = this.page.locator("p, span, div, h2, h3, li, button").filter({ hasText: pattern });
    const count = await candidates.count();
    for (let i = 0; i < count; i++) {
      if (await candidates.nth(i).isVisible()) {
        return true;
      }
    }
    return false;
  }

  /** Assert Build Your Own link visible. @returns {Promise<void>} */
  async verifyBuildYourOwnLinkPresent() {
    await expect(this.buildYourOwnLink).toBeVisible({ timeout: 15000 });
  }

  /** Click Build Your Own link. @returns {Promise<void>} */
  async clickBuildYourOwn() {
    await this.buildYourOwnLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /** Assert invalid URL shows 404 or redirect — not raw error. @returns {Promise<void>} */
  async verifyInvalidUrlHandled() {
    const has404 = await this.page.getByText(/404|not found|page not found/i).count();
    const redirectedHome = this.page.url().match(/nexaexperience\.com\/?$/);
    const isGraceful = has404 > 0 || redirectedHome;
    expect(isGraceful).toBeTruthy();
  }
}

module.exports = { ModelDetailPage };

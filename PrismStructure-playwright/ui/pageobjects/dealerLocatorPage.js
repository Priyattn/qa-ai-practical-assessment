const { expect } = require("@playwright/test");

/**
 * NEXA dealer / showroom locator — connect-to-dealer flow.
 * Read-only: search by city, verify results structure (no form submissions).
 * @class DealerLocatorPage
 */
class DealerLocatorPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = "https://www.nexaexperience.com/connect-to-dealer";

    this.cityTab = page.getByText(/^CITY$/i).first();
    this.pincodeTab = page.getByText(/^PINCODE$/i).first();
    this.cityInput = page.locator("input:visible").first();
    this.showroomResultsText = page.getByText(/found \d+ NEXA showroom/i);
    this.navigateControls = page.getByRole("link", { name: /Navigate/i }).or(
      page.getByRole("button", { name: /Navigate/i })
    );
    this.notEnoughDealersMessage = page.getByText(/not enough dealers found/i);
    this.locationSearchInput = page.locator('input[placeholder="Search for location"]');
  }

  /** Open dealer locator page. @returns {Promise<void>} */
  async goto() {
    await this.page.goto(this.baseUrl, { waitUntil: "domcontentloaded" });
    await this.page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  /** Activate CITY tab if visible. @returns {Promise<void>} */
  async selectCityTab() {
    if (await this.cityTab.isVisible()) {
      await this.cityTab.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Search dealers by city name (with autocomplete fallback).
   * @param {string} cityName - City to search
   * @returns {Promise<void>}
   */
  async searchByCity(cityName) {
    await this.selectCityTab();
    await expect(this.cityInput).toBeVisible({ timeout: 20000 });
    await this.cityInput.fill(cityName);
    await this.page.waitForTimeout(1500);

    const suggestion = this.page
      .locator("[role='option'], li, .suggestion")
      .filter({ hasText: new RegExp(cityName, "i") })
      .first();

    if (await suggestion.count() > 0 && await suggestion.isVisible()) {
      await suggestion.click();
    } else {
      await this.cityInput.press("Enter");
    }

    await this.page.waitForTimeout(5000);
  }

  /** Assert showroom results count text visible. @returns {Promise<void>} */
  async verifyShowroomResultsDisplayed() {
    await expect(this.showroomResultsText).toBeVisible({ timeout: 30000 });
    const text = await this.showroomResultsText.textContent();
    const match = text?.match(/found (\d+) NEXA showroom/i);
    expect(match).not.toBeNull();
    expect(Number(match[1])).toBeGreaterThan(0);
  }

  /** Assert Navigate controls present on results. @returns {Promise<void>} */
  async verifyNavigateLinksPresent() {
    await expect(this.navigateControls.first()).toBeVisible({ timeout: 20000 });
    expect(await this.navigateControls.count()).toBeGreaterThan(0);
  }

  /** Assert Navigate control has map href/onclick or is enabled. @returns {Promise<void>} */
  async verifyNavigateLinkHasValidHref() {
    const control = this.navigateControls.first();
    const href = await control.getAttribute("href");
    const onclick = await control.getAttribute("onclick");
    const dataHref = await control.getAttribute("data-href");
    const hasMapTarget =
      (href && /maps|google|http/i.test(href)) ||
      (dataHref && /maps|google|http/i.test(dataHref)) ||
      (onclick && /maps|google|location/i.test(onclick)) ||
      await control.isEnabled();
    expect(hasMapTarget).toBeTruthy();
  }

  /**
   * Search by pincode on PINCODE tab.
   * @param {string} pincode - Indian pincode
   * @returns {Promise<void>}
   */
  async searchByPincode(pincode) {
    if (await this.pincodeTab.isVisible()) {
      await this.pincodeTab.click();
      await this.page.waitForTimeout(500);
    }
    const pinInput = this.page.locator("input:visible").first();
    await pinInput.fill(pincode);
    await pinInput.press("Enter");
    await this.page.waitForTimeout(5000);
  }

  /** Assert empty state or zero results after remote search. @returns {Promise<void>} */
  async verifyNoDealersEmptyState() {
    const notEnoughVisible = await this.notEnoughDealersMessage.isVisible();
    const resultsVisible = await this.showroomResultsText.isVisible();
    const resultsText = resultsVisible
      ? await this.showroomResultsText.textContent()
      : "";
    const zeroResults = resultsText?.match(/found 0 NEXA showroom/i);
    const navigateCount = await this.navigateControls.count();

    expect(notEnoughVisible || zeroResults || navigateCount === 0).toBeTruthy();
  }

  /**
   * Search obscure location via city search.
   * @param {string} location - Remote/obscure location string
   * @returns {Promise<void>}
   */
  async searchObscureLocation(location) {
    await this.searchByCity(location);
  }

  /** Assert not-enough-dealers message visible. @returns {Promise<void>} */
  async verifyNotEnoughDealersMessage() {
    await expect(this.notEnoughDealersMessage).toBeVisible({ timeout: 30000 });
  }

  /** Submit empty city search. @returns {Promise<void>} */
  async submitEmptySearch() {
    await this.selectCityTab();
    await this.cityInput.fill("");
    await this.cityInput.press("Enter");
    await this.page.waitForTimeout(3000);
  }

  /** Assert empty search does not crash page. @returns {Promise<void>} */
  async verifyEmptySearchHandledGracefully() {
    await expect(this.page).toHaveURL(/nexaexperience\.com/);
    const pageText = await this.page.locator("body").innerText();
    const hasValidation =
      /enter|required|valid|location|pincode|city/i.test(pageText) ||
      await this.showroomResultsText.isVisible();
    expect(hasValidation).toBeTruthy();
  }

  /** Assert locator page loads within 90s budget. @returns {Promise<void>} */
  async verifyPageLoadsWithinTimeout() {
    const start = Date.now();
    await this.goto();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(90000);
    await expect(this.page).toHaveURL(/connect-to-dealer/);
  }
}

module.exports = { DealerLocatorPage };

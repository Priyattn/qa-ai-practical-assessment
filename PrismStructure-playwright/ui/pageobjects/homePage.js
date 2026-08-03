const { expect } = require("@playwright/test");

/**
 * NEXA Homepage — car discovery entry point.
 * Selectors favour href paths and structural elements over brittle copy.
 * @class HomePage
 */
class HomePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = "https://www.nexaexperience.com";

    this.modelSlugs = ["fronx", "baleno", "grand-vitara", "xl6", "jimny", "invicto", "e-vitara"];
    this.featuredModelLinks = page.locator(
      'header a[href="/fronx"], header a[href="/baleno"], header a[href="/grand-vitara"], ' +
      'header a[href="/xl6"], header a[href="/jimny"], header a[href="/invicto"], header a[href="/e-vitara"], ' +
      'nav a[href="/fronx"], nav a[href="/baleno"], nav a[href="/grand-vitara"]'
    );
    this.locateShowroomHeading = page.getByText(/Locate.*Showroom/i).first();
    this.dealerLocatorLink = page.locator('a[href*="connect-to-dealer"]').first();
    this.helpMeSelectLink = page.locator('a[href="/help-me-select"]').first();
    this.menuButton = page.locator(
      'button[aria-label*="menu" i], [class*="hamburger"], header button'
    ).first();
  }

  /** Open NEXA homepage. @returns {Promise<void>} */
  async goto() {
    await this.page.goto(this.baseUrl, { waitUntil: "domcontentloaded" });
    await this.page.waitForLoadState("networkidle", { timeout: 45000 }).catch(() => {});
  }

  /** Open Cars mega-menu via hover/click. @returns {Promise<void>} */
  async openCarsMenu() {
    const carsMenu = this.page.getByText("Cars", { exact: true }).first();
    if (await carsMenu.isVisible()) {
      await carsMenu.hover();
      await this.page.waitForTimeout(800);
      await carsMenu.click();
      await this.page.waitForTimeout(1000);
    }
  }

  /** Assert homepage URL, title, hero, and featured content. @returns {Promise<void>} */
  async verifyHomepageLoaded() {
    await expect(this.page).toHaveURL(/nexaexperience\.com/);
    const title = await this.page.title();
    expect(title).toMatch(/NEXA|Maruti Suzuki/i);

    await expect(this.page.locator("main")).toBeVisible({ timeout: 30000 });
    await expect(
      this.page.getByRole("heading", { name: /Discover Your Perfect Car/i })
    ).toBeVisible({ timeout: 30000 });
    await expect(this.page.getByRole("link", { name: /Explore Now/i })).toBeVisible({
      timeout: 15000,
    });
  }

  /** @returns {Promise<number>} Count of model links in menu or hero */
  async getFeaturedModelCount() {
    await this.openCarsMenu();
    const menuModelCount = await this.page.locator(
      'a[href="/fronx"], a[href="/baleno"], a[href="/grand-vitara"], ' +
      'a[href="/xl6"], a[href="/jimny"], a[href="/invicto"], a[href="/e-vitara"]'
    ).count();

    if (menuModelCount > 0) {
      return menuModelCount;
    }

    return await this.page.locator('main a[href="/e-vitara"], main a[href*="/e-vitara"]').count();
  }

  /** @returns {Promise<number>} Count of visible model links in header/nav */
  async getVisibleModelLinkCount() {
    const slugs = this.modelSlugs;
    let visible = 0;
    for (const slug of slugs) {
      const link = this.page.locator(`header a[href="/${slug}"], nav a[href="/${slug}"]`).first();
      if (await link.count() > 0 && await link.isVisible()) {
        visible += 1;
      }
    }
    return visible;
  }

  /**
   * Click model link by slug or direct navigation fallback.
   * @param {string} slug - Model path slug
   * @returns {Promise<void>}
   */
  async clickModelBySlug(slug) {
    const headerLink = this.page.locator(`header a[href="/${slug}"], nav a[href="/${slug}"]`).first();
    if (await headerLink.count() > 0 && await headerLink.isVisible()) {
      await headerLink.click();
    } else {
      await this.page.goto(`${this.baseUrl}/${slug}`, { waitUntil: "domcontentloaded" });
    }
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Direct navigation to model page by slug.
   * @param {string} slug - Model path slug
   * @returns {Promise<void>}
   */
  async gotoModel(slug) {
    await this.page.goto(`${this.baseUrl}/${slug}`, { waitUntil: "domcontentloaded" });
    await this.page.waitForLoadState("domcontentloaded");
  }

  /** Click first featured model link in hero/menu. @returns {Promise<void>} */
  async clickFirstFeaturedModel() {
    await this.featuredModelLinks.first().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /** Open mobile/hamburger navigation if visible. @returns {Promise<void>} */
  async openNavigationMenu() {
    if (await this.menuButton.isVisible()) {
      await this.menuButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /** Assert category labels visible in navigation. @returns {Promise<void>} */
  async verifyCategoryLabelsVisible() {
    const categories = this.page.getByText(/Hatchback|Sedan|SUV|Hybrid/i);
    await expect(categories.first()).toBeVisible({ timeout: 10000 });
  }

  /** Assert showroom locator section visible on homepage. @returns {Promise<void>} */
  async verifyDealerLocatorEntryVisible() {
    const showroomHeading = this.page.getByRole("heading", {
      name: /Locate Your Nearest NEXA Showroom/i,
    });
    await showroomHeading.scrollIntoViewIfNeeded();
    await expect(showroomHeading).toBeVisible({ timeout: 15000 });
    await expect(
      this.page.getByRole("link", { name: /Explore Nearby Showrooms/i })
    ).toBeVisible({ timeout: 15000 });
  }

  /** Navigate to connect-to-dealer page. @returns {Promise<void>} */
  async navigateToDealerLocator() {
    await this.page.goto(`${this.baseUrl}/connect-to-dealer`, {
      waitUntil: "domcontentloaded",
    });
    await this.page.waitForLoadState("domcontentloaded");
  }
}

module.exports = { HomePage };

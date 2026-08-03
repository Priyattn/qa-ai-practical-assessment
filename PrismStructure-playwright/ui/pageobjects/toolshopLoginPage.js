const { expect } = require("@playwright/test");
const userData = require("../resources/data/toolshopUserData.json");

/**
 * Toolshop login and authentication page (/auth/login).
 * @class ToolshopLoginPage
 */
class ToolshopLoginPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("[data-test=email]");
    this.passwordInput = page.locator("[data-test=password]");
    this.loginSubmit = page.locator("[data-test=login-submit]");
    this.navMenu = page.locator("[data-test=nav-menu]");
  }

  /** Navigate to login page and wait for form. @returns {Promise<void>} */
  async goto() {
    await this.page.goto("/auth/login", { waitUntil: "domcontentloaded" });
    await this.emailInput.waitFor({ state: "visible" });
  }

  /**
   * Submit login form with given credentials.
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<void>}
   */
  async login(email, password) {
    await this.goto();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmit.click();
    await this.page.waitForURL("**/account**", { timeout: 30000 });
  }

  /** Login with default demo customer from test data. @returns {Promise<void>} */
  async loginAsCustomer() {
    await this.login(userData.customer.email, userData.customer.password);
  }

  /** Assert logged-in state (nav menu + account URL). @returns {Promise<void>} */
  async verifyLoggedIn() {
    await this.navMenu.waitFor({ state: "visible" });
    await expect(this.page).toHaveURL(/account/);
  }

  /** Submit invalid credentials from test data. @returns {Promise<void>} */
  async loginWithInvalidCredentials() {
    await this.goto();
    await this.emailInput.fill(userData.invalid.email);
    await this.passwordInput.fill(userData.invalid.password);
    await this.loginSubmit.click();
  }
}

module.exports = { ToolshopLoginPage };

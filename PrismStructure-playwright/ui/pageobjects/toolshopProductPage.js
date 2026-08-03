const { expect } = require("@playwright/test");
const productData = require("../resources/data/toolshopProductData.json");

/**
 * Toolshop product detail page (/product/{id}).
 * @class ToolshopProductPage
 */
class ToolshopProductPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    this.productName = page.locator("[data-test=product-name]");
    this.unitPrice = page.locator("[data-test=unit-price]");
    this.addToCart = page.locator("[data-test=add-to-cart]");
    this.increaseQuantity = page.locator("[data-test=increase-quantity]");
    this.quantity = page.locator("[data-test=quantity]");
    this.cartQuantity = page.locator("[data-test=cart-quantity]");
  }

  /**
   * Open product detail page.
   * @param {string} [productId] - Product ULID; defaults to sample from test data
   * @returns {Promise<void>}
   */
  async gotoProduct(productId = productData.sampleProductId) {
    await this.page.goto(`/product/${productId}`, { waitUntil: "domcontentloaded" });
    await this.productName.waitFor({ state: "visible" });
  }

  /** Assert product name and price visible. @returns {Promise<void>} */
  async verifyProductDetailVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.unitPrice).toBeVisible();
  }

  /**
   * Set quantity and add product to cart.
   * @param {number} [quantity=1] - Desired quantity before add
   * @returns {Promise<void>}
   */
  async addToCartWithQuantity(quantity = 1) {
    const currentQty = Number(await this.quantity.inputValue().catch(() => "1"));
    const clicksNeeded = Math.max(0, quantity - currentQty);
    for (let i = 0; i < clicksNeeded; i++) {
      await this.increaseQuantity.click();
    }
    await this.addToCart.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Assert nav cart badge quantity greater than zero.
   * @returns {Promise<string>} Cart quantity text
   */
  async verifyCartQuantityGreaterThanZero() {
    const qty = await this.cartQuantity.textContent();
    expect(Number(qty)).toBeGreaterThan(0);
    return qty;
  }
}

module.exports = { ToolshopProductPage };

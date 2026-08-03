const { test, expect } = require("@playwright/test");
const { toolshopApiPage } = require("../../api/objects/toolshopApiPage");
const credentials = require("../../api/testdata/toolshopCredentials.json");
const invoiceTemplate = require("../../api/testdata/toolshopInvoicePayload.json");

const productData = require("../../ui/resources/data/toolshopProductData.json");

async function loginAndGetToken(request) {
  const response = await request.post(toolshopApiPage.endpoints.login, {
    data: credentials.validCustomer,
  });
  expect(response.status()).toBe(toolshopApiPage.statusCodes.ok);
  const body = await response.json();
  return body.access_token;
}

/**
 * Toolshop — Cart & Invoice API (assessment AC2)
 */
test.describe("Toolshop - Cart & Invoice API", () => {
  test("TC-TS-API-04: POST create cart returns cart id @smoke @regression", async ({ request }) => {
    const token = await loginAndGetToken(request);
    const response = await request.post(toolshopApiPage.endpoints.carts, {
      headers: { Authorization: `Bearer ${token}` },
      data: {},
    });
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
    const body = await response.json();
    expect(body).toHaveProperty("id");
    console.log(`TC-TS-API-04 Passed: Cart id ${body.id}`);
  });

  test("TC-TS-API-05: POST add item and GET cart contents @regression", async ({ request }) => {
    const token = await loginAndGetToken(request);
    const cartRes = await request.post(toolshopApiPage.endpoints.carts, {
      headers: { Authorization: `Bearer ${token}` },
      data: {},
    });
    const cart = await cartRes.json();

    const addRes = await request.post(toolshopApiPage.endpoints.addToCart(cart.id), {
      headers: { Authorization: `Bearer ${token}` },
      data: { product_id: productData.sampleProductId, quantity: 2 },
    });
    expect(addRes.status()).toBe(toolshopApiPage.statusCodes.ok);

    const getCart = await request.get(toolshopApiPage.endpoints.cartById(cart.id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cartBody = await getCart.json();
    expect(cartBody.cart_items.length).toBeGreaterThan(0);
    console.log("TC-TS-API-05 Passed: Cart contains items");
  });

  test("TC-TS-API-06: POST invoice cash-on-delivery @smoke @regression", async ({ request }) => {
    const token = await loginAndGetToken(request);
    const cartRes = await request.post(toolshopApiPage.endpoints.carts, {
      headers: { Authorization: `Bearer ${token}` },
      data: {},
    });
    const cart = await cartRes.json();

    await request.post(toolshopApiPage.endpoints.addToCart(cart.id), {
      headers: { Authorization: `Bearer ${token}` },
      data: { product_id: productData.sampleProductId, quantity: 1 },
    });

    const invoicePayload = { ...invoiceTemplate, cart_id: cart.id };
    const invoiceRes = await request.post(toolshopApiPage.endpoints.invoices, {
      headers: { Authorization: `Bearer ${token}` },
      data: invoicePayload,
    });
    expect(invoiceRes.status()).toBeLessThan(300);

    const invoice = await invoiceRes.json();
    expect(invoice).toHaveProperty("invoice_number");
    expect(invoice.invoice_number).toMatch(/INV-/);
    console.log(`TC-TS-API-06 Passed: Invoice ${invoice.invoice_number}`);
  });

  test("TC-TS-API-07: GET invoices with bearer token @regression", async ({ request }) => {
    const token = await loginAndGetToken(request);
    const response = await request.get(toolshopApiPage.endpoints.invoices, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(toolshopApiPage.statusCodes.ok);
    const body = await response.json();
    const invoices = body.data || body;
    expect(invoices.length).toBeGreaterThan(0);
    console.log(`TC-TS-API-07 Passed: ${invoices.length} invoices returned`);
  });
});

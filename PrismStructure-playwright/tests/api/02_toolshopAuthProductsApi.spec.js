const { test, expect } = require("@playwright/test");
const { toolshopApiPage } = require("../../api/objects/toolshopApiPage");
const credentials = require("../../api/testdata/toolshopCredentials.json");

/**
 * Toolshop — Auth & Products API (assessment Part B)
 * API: https://api.practicesoftwaretesting.com/api/documentation
 */
test.describe("Toolshop - Auth & Products API", () => {
  test("TC-TS-API-01: POST login returns access token @smoke @regression", async ({ request }) => {
    const response = await request.post(toolshopApiPage.endpoints.login, {
      data: credentials.validCustomer,
    });
    expect(response.status()).toBe(toolshopApiPage.statusCodes.ok);
    const body = await response.json();
    expect(body).toHaveProperty("access_token");
    expect(body.token_type).toBe("bearer");
    console.log("TC-TS-API-01 Passed: Login returned bearer token");
  });

  test("TC-TS-API-02: GET products returns paginated list @smoke @regression", async ({ request }) => {
    const response = await request.get(toolshopApiPage.endpoints.products);
    expect(response.status()).toBe(toolshopApiPage.statusCodes.ok);
    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty("name");
    expect(body.data[0]).toHaveProperty("price");
    console.log(`TC-TS-API-02 Passed: ${body.data.length} products on page`);
  });

  test("TC-TS-API-03: POST login with invalid credentials fails @regression", async ({ request }) => {
    const response = await request.post(toolshopApiPage.endpoints.login, {
      data: credentials.invalidCustomer,
    });
    expect(response.status()).toBeGreaterThanOrEqual(400);
    console.log(`TC-TS-API-03 Passed: Invalid login status ${response.status()}`);
  });
});

// @ts-check
const { defineConfig } = require("@playwright/test");

const NEXA_BASE_URL = "https://www.nexaexperience.com";
const TOOLSHOP_UI_URL = "https://practicesoftwaretesting.com";
const JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com";
const TOOLSHOP_API_URL = "https://api.practicesoftwaretesting.com";

module.exports = defineConfig({
  testDir: "./tests",
  retries: 1,
  workers: 1,
  timeout: 120 * 1000,
  expect: {
    timeout: 30000,
  },
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],
  use: {
    browserName: "chromium",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    ignoreHttpsErrors: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  projects: [
    {
      name: "ui-nexa",
      testMatch: ["tests/ui/01_*.spec.js", "tests/ui/02_*.spec.js"],
      use: { baseURL: NEXA_BASE_URL },
    },
    {
      name: "ui-toolshop",
      testMatch: ["tests/ui/*toolshop*.spec.js"],
      use: { baseURL: TOOLSHOP_UI_URL },
    },
    {
      name: "api-jsonplaceholder",
      testMatch: ["tests/api/01_postsApi.spec.js"],
      use: { baseURL: JSONPLACEHOLDER_URL },
    },
    {
      name: "api-toolshop",
      testMatch: ["tests/api/*toolshop*.spec.js"],
      use: { baseURL: TOOLSHOP_API_URL },
    },
  ],
  outputDir: "playwright-artifacts",
});

// @ts-check
const { defineConfig } = require("@playwright/test");

const NEXA_BASE_URL = "https://www.nexaexperience.com";
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

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
      name: "ui",
      testMatch: "tests/ui/**/*.spec.js",
      use: {
        baseURL: NEXA_BASE_URL,
      },
    },
    {
      name: "api",
      testMatch: "tests/api/**/*.spec.js",
      use: {
        baseURL: API_BASE_URL,
      },
    },
  ],
  outputDir: "playwright-artifacts",
});

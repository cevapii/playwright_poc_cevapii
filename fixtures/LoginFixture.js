// fixtures/loginFixture.js
const { test: baseTest, expect } = require('@playwright/test');
const ENV_URLS = require('../playwright.config').ENV_URLS; // Importing the ENV_URLS

const test = baseTest.extend({
  loggedInPage: async ({ page }, use) => {
    // Get the login URL from the global ENV_URLS object
    const currentEnv = process.env.TEST_ENV || 'dev';
    const loginUrl = ENV_URLS[currentEnv];

    const username = process.env[`${currentEnv.toUpperCase()}_USERNAME`];
    const password = process.env[`${currentEnv.toUpperCase()}_PASSWORD`];

    // Navigate to the login page
    await page.goto(loginUrl);

    // Perform login actions
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.locator('[data-test="login-button"]').click();

    // Wait for successful login
    await expect(page.locator('[data-test="title"]')).toContainText('Products');

    // Use the page for the test
    await use(page);

    // Logout after the test
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
  },
});

module.exports = { test };
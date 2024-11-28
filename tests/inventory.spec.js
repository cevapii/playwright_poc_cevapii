// @ts-check
const { test } = require('../fixtures/LoginFixture');  // Import the test with the fixture
const { InventoryPage } = require('../pages/InventoryPage');  // Import the InventoryPage class
const { expect } = require('@playwright/test');        // Import expect directly from Playwright

test('should select an item by name', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  const itemName = 'Sauce Labs Fleece Jacket';

  await inventoryPage.selectItemByName(itemName);

  // Assert navigation to item detail page
  const detailPageHeader = loggedInPage.locator('[data-test="inventory-item-name"]');
  expect(await detailPageHeader.innerText()).toBe(itemName);
});

test('should select the item with the highest price', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);

  // Select the item with the highest price
  await inventoryPage.selectItemWithHighestPrice();
});

test('should select the item with the lowest price', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);

  // Select the item with the lowest price
  await inventoryPage.selectItemWithLowestPrice();
});

test('should calculate the average price of items', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);

  // Calculate the average price
  const averagePrice = await inventoryPage.calculateAveragePrice();

  console.log(`Average price of items: $${averagePrice.toFixed(2)}`);
});
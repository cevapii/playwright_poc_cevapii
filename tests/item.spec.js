// @ts-check
const { test } = require('../fixtures/LoginFixture');
const { navigateToItemPage } = require('../utils/navigationUtils');
const { InventoryPage } = require('../pages/InventoryPage'); // Add this import
const { expect } = require('@playwright/test');

test('should add an item to the cart from item detail page', async ({ loggedInPage }) => {
    const itemName = 'Sauce Labs Fleece Jacket';

    // Navigate to the item page
    const itemPage = await navigateToItemPage(loggedInPage, itemName);

    // Add the item to the cart
    await itemPage.addItemToCart();

    // Verify that the item is added (if cart UI is updated immediately)
    const cartButton = loggedInPage.locator('.shopping_cart_badge');
    expect(await cartButton.innerText()).toBe('1');
});

test('should verify price consistency between inventory and detail page', async ({ loggedInPage }) => {
    const itemName = 'Sauce Labs Fleece Jacket';

    // Navigate to the item page
    const itemPage = await navigateToItemPage(loggedInPage, itemName);

    // Get item price from the inventory
    const inventoryPage = new InventoryPage(loggedInPage); 
    const inventoryPrice = await inventoryPage.getItemPriceByName(itemName);

    // Get item price from the detail page
    const detailPagePrice = await itemPage.getItemPrice();

    // Assert the prices are equal
    expect(detailPagePrice).toBe(inventoryPrice);
});

test('remove item from cart', async ({ loggedInPage }) => {
    const itemName = 'Sauce Labs Fleece Jacket';

    // Navigate to the item page
    const itemPage = await navigateToItemPage(loggedInPage, itemName);

    // Add the item to the cart
    await itemPage.addItemToCart();

    // Verify that the item is added (if cart UI is updated immediately)
    const cartButton = loggedInPage.locator('.shopping_cart_badge');
    expect(await cartButton.innerText()).toBe('1');

    // remove item from the cart
    await itemPage.removeItemFromCart();

    // verify item has been removed
    await expect(cartButton).not.toBeVisible();
});
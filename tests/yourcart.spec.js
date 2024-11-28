// @ts-nocheck
const { test } = require('../fixtures/LoginFixture');
const { navigateToItemPage } = require('../utils/navigationUtils');
const { expect } = require('@playwright/test');
const { YourCartPage } = require('../pages/YourCartPage');
const path = require('path');
const { readCsv } = require('../utils/readCsv');

test('should add an item to the cart then view cart',{tag: '@smoke'}, async ({ loggedInPage }) => {
    const itemName = 'Sauce Labs Fleece Jacket';

    // Navigate to the item page
    const itemPage = await navigateToItemPage(loggedInPage, itemName);

    // Add the item to the cart
    await itemPage.addItemToCart();

    // Click on the cart and navigate to the cart page
    const cartPage = new YourCartPage(loggedInPage);
    await cartPage.clickCart();

    // Validate the item in the cart
    await cartPage.validateCartItem(itemName);
});

test('should add items from CSV to the cart and validate', async ({ loggedInPage }) => {
    // Path to the CSV file
    const csvFilePath = path.join(__dirname, '../data/items.csv');

    // Read the CSV data
    const items = await readCsv(csvFilePath);

    for (const { itemName } of items) {
        console.log(`Adding and validating item: ${itemName}`);
        
        // Navigate to the item page
        const itemPage = await navigateToItemPage(loggedInPage, itemName);

        // Add the item to the cart
        await itemPage.addItemToCart();

        // Navigate to the cart and validate
        const cartPage = new YourCartPage(loggedInPage);
        await cartPage.clickCart();
        await cartPage.validateCartItem(itemName);

        // go back to products
        await cartPage.clickBackToShopping();
    }
});
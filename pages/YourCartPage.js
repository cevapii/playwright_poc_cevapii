const { expect } = require('@playwright/test');

class YourCartPage {
    constructor(page) {
        this.page = page;
        this.clickCartSelector = '[data-test="shopping-cart-badge"]';
        this.cartItemNameSelector = '[data-test="inventory-item-name"]';
        this.backToShoppingSelector = '[data-test="continue-shopping"]';
    }

    // Click the cart badge
    async clickCart() {
        await this.page.locator(this.clickCartSelector).click();
    }

    // Validate the name of the item within the cart
    async validateCartItem(expectedItemName) {
        // Wait for cart items to be visible
        await this.page.waitForSelector(this.cartItemNameSelector);

        // Get all item names from the cart
        const cartItems = await this.page.locator(this.cartItemNameSelector).allTextContents();

        // Assert that the expected item is in the list
        expect(cartItems).toContain(expectedItemName);
    }

    // go back to products
    async clickBackToShopping() {
        await this.page.locator(this.backToShoppingSelector).click();
    }
}

module.exports = { YourCartPage };
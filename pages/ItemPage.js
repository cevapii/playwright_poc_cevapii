class ItemPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtonSelector = '[data-test="add-to-cart"]';
        this.itemNameSelector = '[data-test="inventory-item-name"]';
        this.itemPriceSelector = '[data-test="inventory-item-price"]';
        this.removeItemFromCartSelector = '[data-test="remove"]';
    }

    // Get item name
    async getItemName() {
        return await this.page.locator(this.itemNameSelector).innerText();
    }

    // Get item price
    async getItemPrice() {
        const priceText = await this.page.locator(this.itemPriceSelector).innerText();
        return parseFloat(priceText.replace('$', '').trim());
    }

    // Add item to cart
    async addItemToCart() {
        await this.page.locator(this.addToCartButtonSelector).click();
    }

    // Remove item from cart
    async removeItemFromCart() {
        await this.page.locator(this.removeItemFromCartSelector).click();
    }

    // pause for 3 seconds
    async wait(){
        await this.page.waitForTimeout(3000);
    }
}

module.exports = { ItemPage };

class InventoryPage {
    constructor(page) {
        this.page = page;
        this.itemNameSelector = '[data-test="inventory-item-name"]';  // The selector for the item name
        this.itemPriceSelector = '[data-test="inventory-item-price"]';  // The selector for the item price
    }

    // Function to select an item based on the item name
    async selectItemByName(itemName) {
        // Wait for the inventory item list to be visible
        await this.page.waitForSelector(this.itemNameSelector);

        // Find the item by name and click it
        const item = await this.page.locator(`${this.itemNameSelector}:text("${itemName}")`);
        if (await item.isVisible()) {
            await item.click();
        } else {
            throw new Error(`Item with name "${itemName}" not found.`);
        }
    }

    // Function to get the price of an item
    async getItemPrice(item) {
        const priceText = await item.locator(this.itemPriceSelector).innerText();  // Get the price text
        const price = parseFloat(priceText.replace('$', '').trim());  // Convert the price to a float
        return price;
    }


    // Function to get the price of an item by its name
    async getItemPriceByName(itemName) {
        // Wait for the inventory item list to be visible
        await this.page.waitForSelector(this.itemNameSelector);

        // Find the item by name
        const item = await this.page.locator(`${this.itemNameSelector}:text("${itemName}")`).first();

        if (!(await item.isVisible())) {
            throw new Error(`Item with name "${itemName}" not found.`);
        }

        // Get the price of the corresponding item
        const priceElement = await item.locator('..').locator(this.itemPriceSelector); // Navigate to parent and then price
        const priceText = await priceElement.innerText(); // Get the price text
        const price = parseFloat(priceText.replace('$', '').trim()); // Convert the price to a float
        return price;
    }

    // Function to get the highest priced item
    async selectItemWithHighestPrice() {
        // Wait for the inventory item list to be visible
        await this.page.waitForSelector('.inventory_item');

        // Get all inventory item containers
        const items = await this.page.locator('.inventory_item').all();

        // Initialize variables for the item with the highest price
        let highestPriceItem = null;
        let highestPrice = 0;

        // Iterate through each item container
        for (const item of items) {
            // Get the price of the current item
            const priceText = await item.locator(this.itemPriceSelector).innerText(); // Get price text
            const price = parseFloat(priceText.replace('$', '').trim()); // Convert to float

            // Check if the current price is higher
            if (price > highestPrice) {
                highestPrice = price;
                highestPriceItem = item;
            }
        }

        // If a highest price item is found, click it
        if (highestPriceItem) {
            await highestPriceItem.locator(this.itemNameSelector).click(); // Click the name inside the container
        } else {
            throw new Error('No items found with prices.');
        }
    }

    // Function to get the lowest priced item
    async selectItemWithLowestPrice() {
        // Wait for the inventory item list to be visible
        await this.page.waitForSelector('.inventory_item');
    
        // Get all inventory item containers
        const items = await this.page.locator('.inventory_item').all();
    
        // Initialize variables for the item with the lowest price
        let lowestPriceItem = null;
        let lowestPrice = Infinity;
    
        // Iterate through each item container
        for (const item of items) {
            // Get the price of the current item
            const priceText = await item.locator(this.itemPriceSelector).innerText(); // Get price text
            const price = parseFloat(priceText.replace('$', '').trim()); // Convert to float
    
            // Check if the current price is lower
            if (price < lowestPrice) {
                lowestPrice = price;
                lowestPriceItem = item;
            }
        }
    
        // If a lowest price item is found, click it
        if (lowestPriceItem) {
            await lowestPriceItem.locator(this.itemNameSelector).click(); // Click the name inside the container
        } else {
            throw new Error('No items found with prices.');
        }
    }

    // Function to calculate the average price
    async calculateAveragePrice() {
        // Wait for the inventory item list to be visible
        await this.page.waitForSelector('.inventory_item');
    
        // Get all inventory item containers
        const items = await this.page.locator('.inventory_item').all();
    
        // Initialize variables to calculate the total price
        let totalPrice = 0;
        let itemCount = items.length;
    
        if (itemCount === 0) {
            throw new Error('No items found to calculate average price.');
        }
    
        // Iterate through each item container
        for (const item of items) {
            // Get the price of the current item
            const priceText = await item.locator(this.itemPriceSelector).innerText(); // Get price text
            const price = parseFloat(priceText.replace('$', '').trim()); // Convert to float
    
            // Add to the total price
            totalPrice += price;
        }
    
        // Calculate the average price
        const averagePrice = totalPrice / itemCount;
        return averagePrice;
    }
    
    

}

module.exports = { InventoryPage };
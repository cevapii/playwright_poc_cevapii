const { InventoryPage } = require('../pages/InventoryPage');
const { ItemPage } = require('../pages/ItemPage');

// Utility to navigate from inventory to item detail page
async function navigateToItemPage(loggedInPage, itemName) {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.selectItemByName(itemName);
    return new ItemPage(loggedInPage);
}

module.exports = { navigateToItemPage };

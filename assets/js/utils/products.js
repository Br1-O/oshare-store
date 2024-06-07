import { fetchData } from "./fetch.js"

export const getInventory = async () => {

    let inventory = fetchData("assets/js/json/inventory.json", "inventory");
    return inventory;
}


export const getStockOfProductOrderedBySize = async (productId) => {

    let inventory = await getInventory();

    for (const product of inventory) {
        if (product.productId === productId) {
            return product.sizes;
        }
    };


}
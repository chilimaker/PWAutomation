import { test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";

test("Login Test",  {
  tag: '@login'
 },  async ({ page }) => {

  
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  
  await loginPage.visit();

  // Verify URL for page is correct
  await expect(inventoryPage.inventoryUrl).toBeTruthy()

  // Verify page object is visible
  await expect(inventoryPage.productSort).toBeVisible()
  
})

test("Add Single Item to Cart",  {
  tag: '@regression'
 }, async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  const itemName = 'sauce-labs-backpack';

  // login valid account
  await loginPage.visit();

  // select item 
  await inventoryPage.add_item_to_cart(itemName)
  
  // check remove button displays
  await inventoryPage.check_remove_button(itemName)

  // open up shopping cart
  await inventoryPage.shoppingCart.click();

  // Verify you are on Cart page
  await shoppingCartPage.yourCart.isVisible();

  // check remove button displays
  await inventoryPage.check_remove_button('sauce-labs-backpack')
})

//for (const record of records) {
test("Check error messages for invalid logins", {
  tag: '@regresssion'
}, async ({ page }) => { //console.log(record.itemName);
  
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  const itemName = 'Sauce Labs Onesie';
  const itemNameInner = 'sauce-labs-onesie';

  // login valid account
  await loginPage.visit();

  // Check Item Price
  var myPrice = await inventoryPage.find_item_price(itemName)

  //add item
  await inventoryPage.add_item_to_cart(itemNameInner)
  
  // open up shopping cart
  await inventoryPage.shoppingCart.click();

  // check item price exists in cart
  await expect(page.getByText(myPrice)).toBeVisible();
})




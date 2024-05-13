
import { test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync("./data_files/" + process.env.DATA_FILE), {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
});


test("Check Number of Items Added to Cart", {
  tag: '@regression'
}, async ({ page }) => {     

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  var rowCount : number = 0 ; 
  var cartTotal : number = 0;

  for (const record of records) {  
   
  // check number of rows
  rowCount = records.toString().split(',').length;

  // login valid account
  await loginPage.visit();  

  // Check Item Price
  var myPrice = await inventoryPage.find_item_price(record.itemName)

  // running total of cart
  cartTotal = cartTotal + Number(myPrice);

  //add item
  await inventoryPage.add_item_to_cart(record.itemNameInner);
  
  // open up shopping cart
  await inventoryPage.shoppingCart.click();

  // check item price exists in cart
  await expect(page.getByText(myPrice)).toBeVisible();  
  } 

  // compare number of items in data file matches item shown in cart
  await test.step(`Check item Count `, async () => {
    await shoppingCartPage.check_count_of_items_in_cart(rowCount);
  });

  // Go to Checkout
  await shoppingCartPage.checkoutButton.click();

  // fill in user info
  await shoppingCartPage.fill_user_info();

  await test.step(`Check Cart Subtotal`, async () => {
  // check total of items before tax
    await shoppingCartPage.check_cart_subtotal(cartTotal);
  });  

});

import { chromium, test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import * as fs from "fs";
//import csv from 'csv-parser';
//import { parse, parser } from 'csv'
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync("./data_files/itemList.csv"), {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
});


test("Check Price of Item Added to Cart1", {
  tag: '@regresssion'
}, async ({ page }) => { 
  for (const record of records) {   
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);

  // login valid account
  await loginPage.visit();  

  // Check Item Price
  var myPrice = await inventoryPage.find_item_price(record.itemName)

  //add item
  await inventoryPage.add_item_to_cart(record.itemNameInner);
  
  // open up shopping cart
  await inventoryPage.shoppingCart.click();

  // check item price exists in cart
  await expect(page.getByText(myPrice)).toBeVisible();  
  } 

  await page.close();
});
import { chromium, test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test("Login Test", async ({ page }) => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage();

  await loginPage.visit();

  await expect(inventoryPage.inventoryUrl).toBeTruthy()
  
})

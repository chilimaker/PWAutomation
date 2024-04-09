import { chromium, test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test("Login Test", async ({ page }) => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.visit();

  // Verify URL for page is correct
  await expect(inventoryPage.inventoryUrl).toBeTruthy()

  // Verify page object is visible
  await expect(inventoryPage.productSort).toBeVisible()
  
})

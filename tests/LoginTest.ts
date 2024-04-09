import { chromium, test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { link } from "fs";

test("Login Test", async ({ page }) => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const loginPage = new LoginPage(page);

  await loginPage.visit();
  
});

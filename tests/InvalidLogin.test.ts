import { test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync("./data_files/" + process.env.DATA_FILE1), {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  delimiter: '|'
});


test("Invalid Login Test",  {
  tag: '@login',
  annotation: {
    type: 'Login',
    description: 'Check error messaging for invalid logins',
  },
 },  async ({ page }) => {

  var rowCount : number = 0 ; 

  for (const record of records) {  
   
  // check number of rows
  rowCount = records.toString().split('|').length;
  
  const loginPage = new LoginPage(page);

  // attempt to login with invalid creds
  await page.goto(loginPage.url);
  await loginPage.username.fill(record.errorType);
  await loginPage.password.fill('secret_sauce');
  await loginPage.loginButton.click();

  await expect(page.getByText(record.errorMessage)).toBeVisible();   

  } 
  
})
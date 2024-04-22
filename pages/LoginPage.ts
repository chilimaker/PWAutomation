import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://www.saucedemo.com/';
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  //readonly validusername: string = 'standard_user';
  //readonly validpassword: string = 'secret_sauce';
   validusername = process.env.VALID_USERNAME as string;
   validpassword = process.env.VALID_PASSWORD as string;

  public constructor(page: Page){
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', {name: 'Login'})
  }


  async visit(){
    await this.page.goto(this.url);
    //await this.username.fill(this.validusername);
    //await this.password.fill(this.validpassword);
    await this.username.fill(this.validusername);
    await this.password.fill(this.validpassword);
    await this.loginButton.click();
  }

}
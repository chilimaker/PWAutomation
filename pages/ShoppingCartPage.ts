import { expect, type Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly shoppingCartUrl: string = 'https://www.saucedemo.com/cart.html';
  readonly openMenuButton: Locator;
  readonly shoppingCart: Locator;
  readonly yourCart: Locator;
  readonly item1: Locator;



  
  public constructor(page: Page){
    this.page = page; 
    this.yourCart =  page.getByText('Your Cart'); 
    this.item1 = page.getByText('Sauce Labs Backpack');
    

  }


}
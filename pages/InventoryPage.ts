import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryUrl: string = 'https://www.saucedemo.com/inventory.html';
  readonly openMenuButton: Locator;
  readonly productSort: Locator;



  
  public constructor(page: Page){
    this.page = page;   
    this.openMenuButton = page.getByRole('button', {name: 'Open Menu'})
    this.productSort = page.locator('[data-test="product-sort-container"]')


  }
}
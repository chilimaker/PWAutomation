import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryUrl: string = 'https://www.saucedemo.com/inventory.html';
  readonly openMenuButton: Locator;
  readonly productSort: Locator;
  readonly shoppingCart: Locator;



  
  public constructor(page: Page){
    this.page = page;   
    this.openMenuButton = page.getByRole('button', {name: 'Open Menu'})
    this.productSort = page.locator('[data-test="product-sort-container"]')
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]')


  }

  async add_item_to_cart(item_name: string){      
    await this.page.locator('[data-test="add-to-cart-' + item_name + '"]').click()
  }

  async check_remove_button(item_name: string){
    await expect(this.page.locator('[data-test="remove-' + item_name+ '"]')).toBeVisible()
  }

   async find_item_price(item_name: string){
    
    //var  myresult = await (this.page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Backpack' }).nth(1)).allInnerTexts();
    var  myresult = await (this.page.locator('[data-test="inventory-list"] div').filter({ hasText: item_name }).nth(1)).allInnerTexts();
    //console.log(myresult);

    // Split returned string on $
    var myarr = myresult.toString().split('$');
    //console.log(myarr[1]);

    // Split second string on line fee
    var myarr1 = myarr[1].toString().split('\n');
    //console.log( myarr1[0]);

    // return price
    return myarr1[0].toString();
  }
 
 
}
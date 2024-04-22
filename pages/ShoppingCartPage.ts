import { expect, type Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly shoppingCartUrl: string = 'https://www.saucedemo.com/cart.html';
  readonly openMenuButton: Locator;
  readonly shoppingCart: Locator;
  readonly yourCart: Locator;
  readonly item1: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  
  public constructor(page: Page){
    this.page = page; 
    this.yourCart =  page.getByText('Your Cart'); 
    this.item1 = page.getByText('Sauce Labs Backpack');
    this.checkoutButton = page.getByText('Checkout')
    this.continueShoppingButton = page.getByText('Continue Shopping')
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zipCode = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByText('Continue');
    this.finishButton = page.getByText('Finish');
  }
  
  async check_count_of_items_in_cart(item_count: number){         
    const element = await this.page.locator('[data-test="shopping-cart-link"]');
    const count = await element.innerText();
    expect(count).toEqual(item_count.toString());
  }

  async get_count_of_items_in_cart(){         
    const element = await this.page.locator('[data-test="shopping-cart-link"]');
    const count = await element.innerText();
    return count;
  }

  async fill_user_info(){
    await this.firstName.fill('generic');
    await this.lastName.fill('User');
    await this.zipCode.fill('97222');
    await this.continueButton.click();
  }

  async get_cart_subtotal(){         
    const element = await this.page.locator('[data-test="subtotal-label"]');
    const amount = await element.innerText();
    return Number(amount);
  }

  async check_cart_subtotal(cartSubtotal: number){         
    const element = await this.page.locator('[data-test="subtotal-label"]');
    const amount = await element.innerText();  
    var myarr = amount.toString().split('$');
    expect (myarr[1]).toEqual(cartSubtotal.toString());
  }

}
import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryUrl: string = 'https://www.saucedemo.com/inventory.html';

}
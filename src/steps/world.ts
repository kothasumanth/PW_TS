import { setWorldConstructor, World, IWorldOptions, After } from '@cucumber/cucumber';
import { Browser, Page, chromium } from '@playwright/test';

export class CustomWorld extends World {
  browser: Browser | null = null;
  page: Page | null = null;
  petId: number | null = null;
  constructor(options: IWorldOptions) {
    super(options);
  }
  async initPage() {
    if (!this.browser) {
      this.browser = await chromium.launch({ channel: 'msedge', headless: false });
    }
    if (!this.page) {
      this.page = await this.browser.newPage();
    }
    return this.page;
  }
  async closePage() {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

setWorldConstructor(CustomWorld);

After(async function (this: CustomWorld) {
  await this.closePage();
});

import { Page } from '@playwright/test';

export class AmazonSearchPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('https://www.google.com');
    // Wait for the search box to be visible
    await this.page.waitForSelector('input#twotabsearchtextbox', { timeout: 20000 });
    // Dismiss location/cookie popups if present
    try {
      const dismissBtn = await this.page.$('input[name="glowDoneButton"]');
      if (dismissBtn) await dismissBtn.click();
    } catch {}
  }
  async search(term: string) {
    await this.page.waitForSelector('input#twotabsearchtextbox', { timeout: 10000 });
    await this.page.fill('input#twotabsearchtextbox', term);
  }
  async clickSearch() {
    await this.page.click('input#nav-search-submit-button');
    await this.page.waitForSelector('div.s-main-slot', { timeout: 10000 });
  }
  async isResultsPage() {
    await this.page.waitForSelector('div.s-main-slot');
    return this.page.locator('div.s-main-slot').isVisible();
  }
}

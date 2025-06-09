import { test, expect, Page } from '@playwright/test';

export class GoogleSearchPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('https://www.google.com');
    // Attach log to Cucumber report if called from a step definition
    if (typeof (this.page as any)._cucumberWorld === 'object' && (this.page as any)._cucumberWorld.attach) {
      await (this.page as any)._cucumberWorld.attach(`Navigate to url`, 'text/plain');
    }
  }
  async search(term: string) {
    await this.page.waitForSelector('textarea[name="q"]', { timeout: 20000 });
    await this.page.fill('textarea[name="q"]', term);
    // Log to Cucumber report
    // Wait for suggestions to load and press Enter
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    // Wait for results page to load
    await this.page.waitForSelector('#search', { timeout: 20000 });
  }
  async isResultsPage() {
    await this.page.waitForSelector('#search');
    return this.page.locator('#search').isVisible();
  }
}

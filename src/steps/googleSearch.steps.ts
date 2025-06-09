import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { CustomWorld } from './world';

setDefaultTimeout(20000); // Increase default step timeout to 20 seconds

let googlePage: GoogleSearchPage;
let amazonPage: AmazonSearchPage;
let googlePageContext: any;
let amazonPageContext: any;

Given('I am on the Google search page', async function (this: CustomWorld) {
  const page = await this.initPage();
  // Attach Cucumber world to page for logging in POM
  (page as any)._cucumberWorld = this;
  googlePage = new GoogleSearchPage(page);
  googlePageContext = page;
  await googlePage.goto();
  // Optionally, attach log here as well
});

When('I open a new tab and go to the Amazon home page', async function (this: CustomWorld) {
  if (!this.browser) throw new Error('No browser found for current scenario');
  amazonPageContext = await this.browser.newContext();
  const amazonTab = await amazonPageContext.newPage();
  amazonPage = new AmazonSearchPage(amazonTab);
  await amazonPage.goto();
  amazonPageContext = amazonTab;
});

When('I switch back to the Google tab', async function () {
  await googlePageContext.bringToFront();
});

When('I enter {string} in the Google search box', async function (searchTerm) {
  await googlePage.search(searchTerm);
  // Attach screenshot after entering search term
  if (this.page && this.attach) {
    const screenshot = await this.page.screenshot({ type: 'png' });
    await this.attach(screenshot, 'image/png');
  }
});

When('I click the Google search button', async function () {
  // Google auto-searches on Enter, so this can be a no-op or click 'Google Search' if visible
});

When('I switch to the Amazon tab', async function () {
  await amazonPageContext.bringToFront();
});

Then('I should see Google results page', async function () {
  expect(await googlePage.isResultsPage()).toBeTruthy();
});

Then('I should see Amazon home page', async function () {
  const url = await amazonPageContext.url();
  expect(url).toContain('amazon.com');
});

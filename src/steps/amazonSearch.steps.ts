import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { CustomWorld } from './world';

setDefaultTimeout(20000); // Increase default step timeout to 20 seconds

let amazonPage: AmazonSearchPage;

Given('I am on the Amazon home page', async function (this: CustomWorld) {
  const page = await this.initPage();
  amazonPage = new AmazonSearchPage(page);
  await amazonPage.goto();
  // Handle Amazon popups if present (e.g., location, cookies)
  try {
    const dismissBtn = await page.$('input[name="glowDoneButton"]');
    if (dismissBtn) await dismissBtn.click();
  } catch {}
});

When('I enter {string} in the Amazon search box', async function (searchTerm) {
  await amazonPage.search(searchTerm);
});

When('I click the Amazon search button', async function () {
  await amazonPage.clickSearch();
});

Then('I should see Amazon search results page', async function () {
  expect(await amazonPage.isResultsPage()).toBeTruthy();
});

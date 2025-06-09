import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios from 'axios';

let response: any;

Given('I have a pet with ID {int}', async function (petId) {
  this.petId = petId;
});

When('I request the pet details', async function () {
  response = await axios.get(`https://petstore.swagger.io/v2/pet/${this.petId}`);
  // Attach response to the report
  if (this.attach) {
    this.attach(JSON.stringify(response.data, null, 2), 'application/json');
  }
});

Then('the response should contain the pet information', async function () {
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(this.petId);
});

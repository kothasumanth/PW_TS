import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Playwright config is not used for Cucumber-based execution
  // This file is kept for IDE support and possible future Playwright Test runs
  testDir: './tests',
  retries: 0,
  workers: 1,
  projects: [],
  reporter: [['list']],
});

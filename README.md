# Playwright + Cucumber Automation Framework

## Features
- Playwright with TypeScript
- UI Automation (Edge only)
- API Automation
- Parallel Execution & Retry
- Page Object Model
- Cucumber BDD
- Cucumber HTML Reporting
- Feature-to-step navigation (Ctrl+Click)

## Installation & Setup
1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Install Edge browser for Playwright:**
   ```powershell
   npx playwright install --with-deps msedge
   ```

## Folder Structure
- `features/` - Feature files (`@UI`, `@API` tags)
- `src/pages/` - Page Object Model classes
- `src/steps/` - Step definitions

## Running Tests
- **UI only:**
  ```powershell
  npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts --tags "@UI"
  ```
- **API only:**
  ```powershell
  npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts --tags "@API"
  ```
- **Both UI & API:**
  ```powershell
  npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts
  ```
- **Parallel/Retry/Tags (override config):**
  ```powershell
  npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts --format html:report.html --tags "@UI or @API" --parallel 2 --retry 1
  ```
  - You can combine `--tags`, `--parallel`, `--retry`, and `--format` as needed.

## Reporting
- **Cucumber HTML:**
  ```powershell
  npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts --format html:report.html
  ```
  - Open `report.html` after execution for results.

## Plugins/Extensions
- VSCode: Cucumber (Gherkin) Full Support (for Ctrl+Click navigation)

## Notes
- Ensure Edge is installed and not running before Playwright install.
- Use path aliases (`@pages`, `@steps`) for easy imports if configured in `tsconfig.json`.
- All browser/page management is handled per scenario for robust parallel execution.

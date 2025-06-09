# Build Instructions for Playwright + Cucumber TypeScript Framework

## 1. Install Dependencies
```powershell
npm install
```

## 2. Compile TypeScript (Optional, for type checking and JS output)
```powershell
npx tsc --project tsconfig.json
```
- This will output compiled JS files to the `dist` folder (if you want to run compiled JS).
- For most test runs, you can use `ts-node` directly and do not need to build JS output.

## 3. Run Tests (No Build Required)
- To run tests directly (recommended):
```powershell
npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts
```
- This uses `ts-node` to run TypeScript files without a separate build step.

## 4. Generate HTML Report
- After running tests, open `report.html` in your project root for results.

## Notes
- If you want to run compiled JS, use:
```powershell
npx cucumber-js --require dist/steps/**/*.js
```
- But for most workflows, direct TypeScript execution with `ts-node` is preferred.

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'features');
const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.feature'));

const results = [];
const procs = [];

// featureFiles.forEach(feature => {
//   const featurePath = path.join('features', feature);
//   console.log(`\n=== Running: ${featurePath} ===`);
//   const proc = exec(`npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts ${featurePath}`,
//     (error, stdout, stderr) => {
//       if (error) {
//         results.push({ feature, status: 'failed' });
//       } else {
//         results.push({ feature, status: 'passed' });
//       }
//       process.stdout.write(stdout);
//       process.stderr.write(stderr);
//       if (results.length === featureFiles.length) {
//         console.log('\nSummary:');
//         results.forEach(r => console.log(`${r.feature}: ${r.status}`));
//         // Generate Allure report after all features are done
//         exec('npx allure generate ./allure-results --clean -o ./allure-report', (err, so, se) => {
//           if (err) {
//             console.error('Allure report generation failed:', se);
//           } else {
//             console.log('Allure report generated at ./allure-report');
//           }
//         });
//       }
//     });
//   procs.push(proc);
// });

const feature = featureFiles[0];
const featurePath = path.join('features', feature);
console.log(`\n=== Running: ${featurePath} ===`);
const proc = exec(`npx cucumber-js --require-module ts-node/register --require src/steps/**/*.ts ${featurePath}`,
  (error, stdout, stderr) => {
    if (error) {
      results.push({ feature, status: 'failed' });
    } else {
      results.push({ feature, status: 'passed' });
    }
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    if (results.length === featureFiles.length) {
      console.log('\nSummary:');
      results.forEach(r => console.log(`${r.feature}: ${r.status}`));
    }
  });
procs.push(proc);

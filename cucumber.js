const { resolve } = require('path');

module.exports = {
  default: {
    require: [
      'src/steps/**/*.ts'
    ],
    format: [
      'progress',
      'html:report.html'
    ],
    paths: [
      'features/**/*.feature'
    ],
    parallel: 1,
    retry: 0
  }
};

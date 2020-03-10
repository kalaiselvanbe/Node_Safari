var config = require('./nightwatch.conf')
var reporter = require('cucumber-html-reporter');
var moment = require('moment');
let fs = require('fs');
const dir = require('./Framework/helper/env').loggerPath;
var fileName = 'cucumber_report_' + moment().format("MM_DD_YYYY_HH_mm");
var htmlReports = dir + '/html';
var jsonReports = dir + '/json';
var config = require('./nightwatch.conf.js');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    logger.info("HTML Reports folder created");
}

var options = {
    theme: 'bootstrap',
    jsonFile: 'reports/json/cucumber.json',
    output: htmlReports + '/' + fileName + '.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "Test Environment": config.environment,
        "Browser": config.browser,
        "BreakPoint": config.breakpoint,
        "Platform": config.devicename,
        "Parallel": config.parallelExecution,
    }
};

reporter.generate(options);
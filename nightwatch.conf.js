const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver');
const geckodriver= require('geckodriver')
// let functionalTestURL = process.env.ENV_FUNCTIONAL_TEST_URL;
//let functionalTestURL = "https://m-qa2.walgreens.com";
console.log('chromedriver.path : ', chromedriver.path);
 let setting = require('.Config/userAgentConfig');
 var _browser = null;
var breakpoint = null;
var _environments = null;

global.breakpoint = 'desktop';
var _environments = null;
 //Device name will be same like the mentioned one for user agents headlessChrome, "iPhone6","ipadair", "samsungs8"
//for Desktop will be "desktop"
var devicename = 'desktop';
global.breakpoint = 'desktop';
_browser="chrome";

//mention environment like  "staging", "regression", "www3", "production"
_environments = 'regression';

 let environment = setting.setenvironment(_environments);
 console.log( "Environment URL is : ", environment);
 let browsercapabilities = setting.setCapabilities(devicename, _browser);

require('nightwatch-cucumber')({
	cucumberArgs: [
		'--require',
		'test/functional/nightwatch/step_definitions',
		'--format',
		'json:test/functional-ui/reports/json/results.json',
		'test/functional/nightwatch/features'
	],
	nightwatchOutput: true
})

module.exports = {
	output_folder: 'test/functional-ui/reports',
	custom_assertions_path: '',
	page_objects_path: 'test/functional/nightwatch/page_objects',
	globals_path:'test/functional/nightwatch/util/global.js',
	live_output: false,
	disable_colors: false,
	waitForConditionTimeout : 10000,
	request_timeout_options: {
		timeout:5000,
		retry_attempts: 2
	},
	//enabled=true for parallel execution
	test_workers: {
		enabled: false,
		workers: 'auto'
	},

	'selenium': {
        "start_process": true, // tells nightwatch to start/stop the selenium process
        "server_path": seleniumServer.path,
        selenium_port: 9515,
        selenium_host: "localhost",
        default_path_prefix: "",
        // "host": "localhost",
        // "port": "9515", // standard selenium port
        "cli_args": {
            'webdriver.chrome.driver': chromedriver.path,
            'webdriver.gecko.driver': geckodriver.path
            //         //'webdriver.ie.driver': iedriver.path
        }
    },
	 test_settings: {
        default: {
			"launch_url": environment,
			// selenium_port: 9515,
			// selenium_host:"localhost",
			// default_path_prefix : "",
			// cli_args: {
			// 	'webdriver.chrome.driver' : chromedriver.path,
			// 	'webdriver.gecko.driver' : geckodriver.path
			// },
            screenshots: {
                enabled: true,
                on_failure: true,
                on_error: false,
                path: 'CucumberHTMLReports/Screenshots'
            },
            "globals": {
                "waitForConditionTimeout": 10000 // sometimes internet is slow so wait.
            },
            desiredCapabilities: browsercapabilities,
        },
    }
}

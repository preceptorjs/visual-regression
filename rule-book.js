module.exports = {

};

/* jshint node: true */

var path = require('path');

module.exports = {

    // Global configuration
    "configuration": {

        // Configuration for report-manager
        "reportManager": {

            // Configuration for reporting
            "reporter": [
                { "type": "Spec" }, // Printing spec information for each test
                { "type": "List", "progress": false }, // Print a list of problems at the end
                { "type": "Duration" }, // Print the total time the tests took
                { "type": "Junit", "path": "test-results.xml" } // Create a JUnit report file
            ]
        },

        // Load the web-driver plugin
        "plugins": ["preceptor-webdriver"],

        // Settings available to test-client
        "settings": {
            "explicitTimeOut": 30000,
            "screenshotPath": __dirname + '/build',
            "webBaseUrl": "http://"
        }
    },

    "tasks": [
        {
            "type": "shell",
            "name": "Cleanup",

            "active": true,
            "failOnError": true,

            "configuration": {
                "cwd": __dirname,
                "cmd": 'rm -rf highlight build && mkdir highlight build'
            }
        },

        {
            "type": "mocha",
            "name": "UI Screenshots",

            "active": true,
            "suite": true,

            "failOnError": false,

            "decorator": [
                {
                    "type": "webDriver",

                    "configuration": {
                        "client": {
                            "type": "cabbie",
                            "configuration": {"mode": "sync"},
                            "capabilities": {"browserName": "firefox"}
                        },
                        "server": {
                            "type": "selenium"
                        }
                    }
                }
            ],

            "configuration": {
                "paths": [__dirname + "/tests/index.js"],
                "timeOut": 300000,
                "slow": 60000,
                "ui": "tdd"
            }
        },

        {
            "type": "kobold",
            "name": "Visual regression tests",

            "active": true,
            "suite": true,

            "failOnError": true,

            "configuration": {
                "highlightOnSuccess": true,

                "storage": {
                    "options": {
                        "path": __dirname
                    }
                }
            }
        }
    ]
};

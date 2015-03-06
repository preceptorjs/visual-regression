# Visual-Regression Example with Kobold

[![Gitter Support](https://img.shields.io/badge/Support-Gitter_IM-yellow.svg)](https://gitter.im/preceptorjs/support)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Running the application

* `npm test`

In the default configuration, Preceptor, the test-runner, will start a local instance of the Selenium stand-alone server and runs the tests on a locally installed Firefox. After all the tests are done, Preceptor will shutdown the Selenium server, freeing-up all the resources.

## Configuration

### Run on SauceLabs

You can easily switch to SauceLabs instead. For this, you need to modify the ```rule-book.js```. This file holds all
the configuration for this project.

About two-thirds down the configuration file is the setup for a Selenium server:

```javascript
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
                    "type": "selenium" // <------
                }
            }
        }
    ],
```

Change the ```selenium``` entry to ```sauceLabs``` and add a ```configuration``` section to set the username and the access-key.
You also want to be more specific on what browser you want to choose (see ```capabilities```):

```javascript
    "decorator": [
        {
            "type": "webDriver",

            "configuration": {
                "client": {
                    "type": "cabbie",
                    "configuration": {"mode": "sync"},
                    "capabilities": {"browserName": "firefox", "version": "35.0", "platform": "Windows 8"}
                },
                "server": {
                    "type": "sauceLabs",
                    "configuration": {
                        "user": "<username>", "accessKey": "<accessKey>"
                    }
                }
            }
        }
    ],
```

### Run multiple tests

To run multiple tests, just turn the webDriver configuration into a list:

```javascript
    "decorator": [
        {
            "type": "webDriver",

            "configuration": [
                {
                    "client": {
                        "type": "cabbie",
                        "configuration": {"mode": "sync"},
                        "capabilities": {"browserName": "firefox", "version": "35.0", "platform": "Windows 8"}
                    },
                    "server": {
                        "type": "sauceLabs",
                        "configuration": {
                            "user": "<username>", "accessKey": "<accessKey>"
                        }
                    }
                },
                {
                    "client": {
                        "type": "cabbie",
                        "configuration": {"mode": "sync"},
                        "capabilities": {"browserName": "chrome", "version": "39.0", "platform": "Windows 8"}
                    },
                    "server": {
                        "type": "sauceLabs",
                        "configuration": {
                            "user": "<username>", "accessKey": "<accessKey>"
                        }
                    }
                }
            ]
        }
    ],
```

### Run the tests in parallel

For this, simply wrap the whole task in an array:

```javascript

    [{ // <-----

        "type": "mocha",
        "name": "UI Screenshots",

        // ...

        "decorator": [
            {
                "type": "webDriver",

                // ...
            }
        ],

        // ...

    }] // <----
```

##Example Screenshot

![firefox](https://raw.githubusercontent.com/marcelerz/visual-regression-example/master/highlight/firefox_Yahoo-Homepage-Navigation-Bar_1.png)


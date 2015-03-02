/**
 * Gets the settings section from the Preceptor configuration
 *
 * @return {Object}
 */
function getConfig() {
    return global.PRECEPTOR.config.settings;
}

/**
 * Initializes Hodman with Preceptor configuration
 */
function initHodman() {
    var hodman = require('hodman'),
        BaseObject = hodman.BaseObject,
        PageObject = hodman.PageObject,

        config = getConfig();

    // Setup base-url to avoid having to hard-code these in the tests
    PageObject.BASE = config.webBaseUrl;

    // Setup Cabbie
    BaseObject.DRIVER_ADAPTER = new hodman.driverAdapters.Cabbie(global.PRECEPTOR_WEBDRIVER.driver);

    // Set an implicit wait - i.e. wait-time to find Elements
    BaseObject.DRIVER_ADAPTER.getDriver().timeOut().setImplicitTimeOut(config.implicitTimeOut || 1000);

    // Setup the screenshot-path
    BaseObject.SCREENSHOT_PATH = config.screenshotPath;

    // Add prefix for screenshots - this will be "browser_version"
    global.SCREENSHOT_PREFIX = global.PRECEPTOR_WEBDRIVER.browser;
}

/**
 * Navigates to a specific page and takes a screenshot - wrapped in a test
 *
 * @param {String} title Title of the test
 * @param {String} url URL of the page
 * @param {String} selector Selector of the page element
 * @param {Number} wait Number of milliseconds to wait before taking screenshot
 */
function navigateAndCapture(title, url, selector, wait) {

    test(title, function (done) {
        require('hodman')
            .PageObject
            .extend({}, {
                URL: url || '',
                EXPECTED_URL: '*',
                SELECTOR: selector
            })
            .navigate(getConfig().explicitTimeOut)
            .capture(this.test.fullTitle(), null, wait)
            .then(
            function () {
                done();
            },
            function (err) {
                done(err)
            });
    });
}

before(function () {
    initHodman();
});

module.exports = {
    config: getConfig(),
    navigateAndCapture: navigateAndCapture
};
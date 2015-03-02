var system = require('../lib/system');

suite('Yahoo-Homepage', function () {
    var url = 'www.yahoo.com';

    system.navigateAndCapture('Master Header', url, '#masthead');
    system.navigateAndCapture('Navigation-Bar', url, '#nav-col-holder');
});

suite('Yahoo-Search', function () {
    var url = 'search.yahoo.com/search;_ylt=A0SO8y7FbtxURxkAXiWl87UF;_ylc=X1MDOTU4MTA0NjkEX3IDMgRmcgMEZ3ByaWQDBG5fcnNsdAMwBG5fc3VnZwMwBG9yaWdpbgNzZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDBHFzdHJsAzUEcXVlcnkDeWFob28EdF9zdG1wAzE0MjM3MzI0MjU-?p=yahoo&fr=sfp&fr2=sb-top-search&iscqry=';

    system.navigateAndCapture('Header', url, '#sticky-hd');
    system.navigateAndCapture('SideBar', url, '#sidebar');
});
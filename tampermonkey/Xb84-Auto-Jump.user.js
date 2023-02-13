// ==UserScript==
// @name         Xb84-Auto-Jump
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  automatic jump to xunlei if opened.
// @author       Jason.lu
// @match        https://www.xb84.cc/bdhd/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xb84.cc
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const logme = function (msg) {
        console.log("[XB84]: " + msg);
    };
    logme("script stating ....");
    if (window.$ !== undefined) {
        logme("jquery found");
    }
    window.$(document).ready(function() {
        logme("load finished");
        let one = window.$("a[href] span:contains('雷盘提取')")[0];
        if (one === undefined) {
            logme("no leipan label found, consider xunlei magnet download, skip for now");
            const labelss = window.$(".adds :text");
            const urls = labelss.map(x => x.text);
            urls.foreach(x => {
              logme('one url is ' + x);
            });
            return;
        }
        logme("passcode label found : " + one.innerHTML);
        let passwordHint = one.innerHTML;
        let passwordFound = false;
        if (passwordHint.indexOf('：') !== -1) {
            passwordHint = passwordHint.split('：')[1];
            logme("passcode hint: " + passwordHint);
            passwordFound = true;
            let parentJumpUrl = one.parentElement.href  + "?localCode=" + passwordHint;
            logme("url found : "+ parentJumpUrl + "  , password is " + passwordHint);
            window.open(parentJumpUrl, "_blank");
        } else {
            let parentJumpUrl = one.parentElement.href;
            logme("url found without password : "+ parentJumpUrl);
            window.open(parentJumpUrl, "_blank");
        }
        // Your code here...
    });
})();
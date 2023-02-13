// ==UserScript==
// @name         Xunlei Autofill code
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.xunlei.com/s/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xunlei.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    let globalValPushed = [];
    let oldWindow = window;
    let oldConsole = window.console;
    const logme = function (msg) {
        globalValPushed.push("[XunleiJump]: " + msg);
        try {
            $(".copyright")[0].innerHTML = "";
            for (let j = 0;  j < globalValPushed.length; j++) {
                $(".copyright")[0].innerHTML += "<br>" + globalValPushed[j];
            }
        }catch{
            // ...
        }
    };
    logme("script stating ....");
    let codeHint = 'notfound';
    const lsearch = location.search;
    if (lsearch.indexOf('localCode') !== -1) {
        let left = lsearch.indexOf('localCode') + 'localCode='.length;
        codeHint = lsearch.slice(left, left+4);
        logme('found code : ' + codeHint);
    }
    var js = document.createElement ("script");
    js.src = "https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
    document.head.appendChild (js);

    const enterKey = function(element, keyStr) {
        logme('enterKey on ' + element + ", keyStr = " + keyStr);
        element.dispatchEvent(new KeyboardEvent("keydown", {
            key: keyStr,
            keyCode: keyStr.charCodeAt(0),        // example values.
            code: "Key" + keyStr.toUpperCase(),       // put everything you need in this object.
            which: keyStr.charCodeAt(0),
            shiftKey: false,    // you don't need to include values
            ctrlKey: false,     // if you aren't going to use them.
            metaKey: false      // these are here for example's sake.
        }));
    }
    const inputValue = (dom, st) => {
		var evt = new InputEvent('input', {
			inputType: 'insertText',
			data: st,
			dataTransfer: null,
			isComposing: false
		});
		dom.value = st;
		dom.dispatchEvent(evt);
	};
    const loadedFunc = function(event) {
        //document is fully loaded
        if (window.$ !== undefined) {
            logme("$ found");
        }
        logme('contnent add loadeds');
        const inele = window.$('.td-input__inner');
        if (inele !== undefined && inele.length > 0) {
            logme('input found');
            if (codeHint == 'notfound') {
                logme('codeHint not found, just click the td-button instead.');
                window.$(".td-button")[0].click();
                return;
            }
            logme('codeHint ready');
            const inputEle = inele[0];
            inputEle.click();
            let i = 0;
            for (i; i < codeHint.length; i++) {
                enterKey(inputEle, codeHint.charAt(i));
            }
            inputValue(inputEle, codeHint);
            window.$(".td-button")[0].click();
            setTimeout(function (){
                window.$(".td-button")[0].click();
            }, 2000);
        } else {
            logme('input not found');
        }
    };
    document.addEventListener("readystatechange", function (e) {
        if (document.readyState === 'complete') {
            setTimeout(loadedFunc, 2000);
        }
    });
    // Your code here...
})();
// ==UserScript==
// @name         Amazon Read More
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        https://www.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    expanders().forEach(clickIfReadMore);

    function expanders() {
        return document.querySelectorAll('.a-expander-prompt');
    }

    function clickIfReadMore(expander) {
        if (readMore()) click();

        function readMore() {
            return expander.textContent.toLowerCase() === "read more";
        }

        function click() {
            expander.click();
        }
    }
})();

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

    expanders().forEach(click);

    function expanders() {
        return document.querySelectorAll('.a-expander-prompt');
    }

    function click(expander) {
        if (readMore()) expander.click();

        function readMore() {
            return expander.textContent.toLowerCase() === "read more";
        }
    }
})();

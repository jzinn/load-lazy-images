// ==UserScript==
// @name         YouTube No Auto Play Next
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	off(button());

	function off(button) {
		if (button.checked === true) button.click();
	}

	function button() {
		return document.getElementById('improved-toggle');
	}
})();

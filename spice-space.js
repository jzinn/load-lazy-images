// ==UserScript==
// @name         Spice Space
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.spice-space.org/download/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	links().filter(truncated).forEach(expand);

	function links() {
		return Array.from(document.querySelectorAll('a'));
	}

	function truncated(link) {
		return link.innerHTML.endsWith('.&gt;');
	}

	function expand(link) {
		link.innerHTML = link.getAttribute('href');
	}
})();

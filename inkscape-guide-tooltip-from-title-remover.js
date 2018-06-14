// ==UserScript==
// @name         Inkscape Guide Tooltip From Title Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tavmjong.free.fr/INKSCAPE/MANUAL/html/*.html
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	titled().forEach(untitle);

	function titled() {
		return document.querySelectorAll('div[title]');
	}

	function untitle(e) {
		e.removeAttribute('title');
	}
})();

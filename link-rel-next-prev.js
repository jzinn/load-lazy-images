// ==UserScript==
// @name         Link Rel Next Prev
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tavmjong.free.fr/INKSCAPE/MANUAL/html/*.html
// @match        https://*.readthedocs.io/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	onkey('ArrowRight', link('next'));
	onkey('ArrowLeft', link('prev'));

	function link(rel) {
		return document.querySelectorAll('head link[rel=' + rel + '][href]')[0];
	}

	function onkey(key, link) {
		if (!link) return;

		document.addEventListener('keyup', listener);

		function listener(event) {
			if (active() && targeted() && matches()) navigate();

			function active() {
				return !event.defaultPrevented;
			}

			function targeted() {
				return event.target === document.body;
			}

			function matches() {
				return event.key === key;
			}
		}

		function navigate() {
			window.location.href = link.href;
		}
	}
})();

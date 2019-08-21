// ==UserScript==
// @name         Link Rel Next Prev
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	onkey('ArrowRight', link('next'));
	onkey('ArrowLeft', link('prev'));

	function link(rel) {
		return document.querySelector('head > link[rel=' + rel + '][href]');
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
				return event.key === key && modified();
			}

			function modified() {
				return (
					!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey
				);
			}
		}

		function navigate() {
			window.location.href = link.href;
		}
	}
})();

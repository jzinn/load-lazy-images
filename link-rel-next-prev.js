// ==UserScript==
// @name         Link Rel Next Prev
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tavmjong.free.fr/INKSCAPE/MANUAL/html/*.html
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	link('next').forEach(onkey('ArrowRight'));
	link('prev').forEach(onkey('ArrowLeft'));

	function link(rel) {
		return links(rel).slice(0, 1);
	}

	function links(rel) {
		return Array.from(
			document.querySelectorAll('head link[rel=' + rel + '][href]')
		);
	}

	function onkey(value) {
		return onkey_;

		function onkey_(link) {
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
					return event.key === value;
				}
			}

			function navigate() {
				window.location.href = link.href;
			}
		}
	}
})();

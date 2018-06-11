// ==UserScript==
// @name         Deposition
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	onhtml(oncss(run));

	function onhtml(fn) {
		document.addEventListener('DOMContentLoaded', fn);
	}

	function oncss(fn) {
		return oncss_;

		function oncss_() {
			wait(styleSheets(), fn);
		}
	}

	function wait(styleSheets, fn) {
		styleSheets.forEach(oncomplete(after(styleSheets.length, fn)));
	}

	function styleSheets() {
		return Array.from(document.styleSheets);
	}

	function oncomplete(fn) {
		return oncomplete_;

		function oncomplete_(element) {
			attach(once(fn, yelp('oncomplete function should only be called once')));

			function attach(fn_) {
				element.addEventListener('load', fn_);
				element.addEventListener('error', fn_);
			}
		}
	}

	function once(fn, again) {
		return once_;

		function once_() {
			if (!fn) return;
			fn();
			fn = again;
		}
	}

	function yelp(msg) {
		return yelp_;

		function yelp_() {
			throw msg;
		}
	}

	function after(n, fn) {
		return after_;

		function after_() {
			if (--n) return;
			fn();
			fn = null;
		}
	}

	function run() {
		run_(window.innerWidth);
	}

	function run_(WIDTH) {
		process(document.documentElement);
		traverse(document.body);

		function traverse(node) {
			if (process(node)) return;
			node.childNodes.forEach(traverse);
		}

		function process(node) {
			return !element() || (wide() && positioned_() && restyle_());

			function element() {
				return node.nodeType === 1;
			}

			function wide() {
				return node.clientWidth === WIDTH;
			}

			function positioned_() {
				return positioned(getComputedStyle(node));
			}

			function restyle_() {
				restyle(node.style);
				return true;
			}
		}
	}

	function positioned(computed) {
		return computed.position === 'fixed' || computed.position === 'sticky';
	}

	function restyle(style) {
		initialize(style, 'position');
	}

	function initialize(style, property) {
		style.setProperty(property, 'initial', 'important');
	}
})();

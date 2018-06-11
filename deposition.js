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
		styleSheets.forEach(oncomplete(pump(styleSheets.length, fn)));
	}

	function styleSheets() {
		return Array.from(document.styleSheets);
	}

	function oncomplete(fn) {
		return oncomplete_;

		function oncomplete_(element) {
			attach(once(fn, 'oncomplete function should only be called once'));

			function attach(fn_) {
				element.addEventListener('load', fn_);
				element.addEventListener('error', fn_);
			}
		}
	}

	function pump(n, fn) {
		return pump_;

		function pump_() {
			if (--n === 0) fn();
		}
	}

	function once(fn, msg) {
		return once_;

		function once_() {
			fn();
			fn = twice_;
		}

		function twice_() {
			throw msg;
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
			return !element() || (candidate() && restyle_());

			function element() {
				return node.nodeType === 1;
			}

			function candidate() {
				return big() && positioned(getComputedStyle(node));
			}

			function big() {
				return node.clientWidth === WIDTH;
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

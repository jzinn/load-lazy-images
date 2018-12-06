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
		loading() ? waitEvent() : waitTick();

		function waitEvent() {
			document.addEventListener('DOMContentLoaded', fn);
		}

		function waitTick() {
			setTimeout(fn);
		}
	}

	function loading() {
		return document.readyState === 'loading';
	}

	function oncss(fn) {
		return oncss_;

		function oncss_() {
			wait(styleSheets(), fn);
		}
	}

	function wait(styleSheets, fn) {
		if (styleSheets.length)
			styleSheets.forEach(oncomplete(after(styleSheets.length, fn)));
		else setTimeout(fn);
	}

	function styleSheets() {
		// return Array.from(document.styleSheets);
		return Array.from(
			document.head.querySelectorAll('link[rel=stylesheet]')
		).filter(function(ss) {
			return !ss.sheet;
		});
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

	function once(first, rest) {
		return start(a);

		function a(next) {
			first();
			first = null;
			next(b);
		}

		function b() {
			rest();
		}
	}

	function start(state) {
		return transition;

		function transition() {
			state(next);
		}

		function next(state_) {
			state = state_;
		}
	}

	function yelp(expression) {
		return yelp_;

		function yelp_() {
			throw expression;
		}
	}

	function after(n, fn) {
		return after_;

		function after_() {
			if (--n) return;
			setTimeout(fn);
			fn = null;
		}
	}

	function run() {
		run_(document.body.clientWidth);
	}

	function run_(WIDTH) {
		process(document.documentElement);
		traverse(document.body);

		function traverse(node) {
			if (process(node)) return;
			node.childNodes.forEach(traverse);
		}

		function process(node) {
			if (!(element() && wide())) return true;

			fix(getComputedStyle(node), node.style);

			function element() {
				return node.nodeType === 1;
			}

			function wide() {
				return node.clientWidth === WIDTH;
			}
		}
	}

	function fix(computed, inline) {
		unstyle('display', 'none');
		unstyle('opacity', '0');
		unstyle('position', 'absolute');
		unstyle('position', 'fixed');
		unstyle('position', 'sticky');
		unstyle('visibility', 'hidden');

		function unstyle(property, value) {
			if (computed[property] === value) initialize(property);
		}

		function initialize(property) {
			inline.setProperty(property, 'initial', 'important');
		}
	}
})();

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

	function onkey(key, next) {
		next(attach(curry(boom, condition)));

		function condition(event) {
			return event.key === key;
		}
	}

	function boom(condition, action, event) {
		if (condition(event)) action();
	}

	function attach(listener) {
		return attach_;

		function attach_(condition) {
			document.body.addEventListener('keyup', listener);
		}
	}

	function curry(f, ...args) {
		return curry_;

		function curry_(...args_) {
			return f(...args, ...args_);
		}
	}

	foo(onkey('ArrowRight', perhaps(navigate(to(link('next'))))));
	foo(onkey('ArrowLeft', perhaps(navigate(to(link('prev'))))));

	function onkey(key, next) {
		next(attach);

		function attach(action) {
			document.addEventListener('keyup', listener(condition, action));
		}

		function condition(event) {
			return event.key === key;
		}
	}

	function listener(condition, action) {
		return listener_;

		function listener_(event) {
			if (condition(event)) action();
		}
	}

	function permitted(event) {
		return (
			event.currentTarget === event.target &&
			!event.defaultPrevented &&
			!event.altKey &&
			!event.ctrlKey &&
			!event.metaKey &&
			!event.shiftKey
		);
	}

	onkey('ArrowRight', perhaps(navigate(to(link('next')))));
	onkey('ArrowLeft', perhaps(navigate(to(link('prev')))));

	function onkey(key, next) {
		next(onkey_);

		function onkey_(action) {
			document.addEventListener('keyup', listener);

			function listener(event) {
				if (event.key === key) action();
			}
		}
	}

	function link(rel) {
		return document.querySelector('head > link[rel=' + rel + '][href]');
	}

	function to(link) {
		return pass(cond(link, extract(href, link), nop));
	}

	function href(link) {
		return link.href;
	}

	function extract(f, x) {
		return extract_;

		function extract_() {
			return f(x);
		}
	}

	function nop() {
		return nop;
	}

	function cond(x, f, g) {
		return x ? f(x) : g(x);
	}

	function pass(x) {
		return pass_;

		function pass_(f) {
			f(x);
		}
	}

	function navigate(where) {
		return navigate_;

		function navigate_() {
			window.location.href = where;
		}
	}

	////////

	function onkey(key, link) {
		if (!link) return;

		document.addEventListener('keyup', listener);

		function listener(event) {
			if (active() && targeted() && matches()) navigate();

			function active() {
				return !event.defaultPrevented;
			}

			function targeted() {
				// return event.currentTarget === event.target;
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
	}
})();

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

	onhtml(oncss(ontick(run)));

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

	function ontick(fn) {
		return ontick_;

		function ontick_() {
			requestAnimationFrame(fn);
		}
	}

	function run() {
		minimum(document.documentElement);
		minimum(document.body);
		process(window.innerWidth, document.documentElement);
	}

	function minimum(node) {
		if (getComputedStyle(node).getPropertyValue('display') === 'none')
			node.style.setProperty('display', 'initial', 'important');
	}

	function process(width, node) {
		if (node.nodeType !== 1 || skip(node.nodeName)) return;

		fix(getComputedStyle(node), node.style);

		if (wide()) node.childNodes.forEach(papply(process, node.clientWidth));
		// node.childNodes.forEach(papply(process, wide() ? node.clientWidth : width));

		function wide() {
			return (
				width ===
				node.getBoundingClientRect().width +
					parseFloat(getComputedStyle(node).marginLeft) +
					parseFloat(getComputedStyle(node).marginRight)
			);
		}
	}

	function skip(name) {
		return ['HEAD', 'NOSCRIPT', 'SCRIPT', 'STYLE', 'TEMPLATE'].includes(name);
	}

	// partial function application
	function papply(fn, a) {
		return papply_;

		function papply_(b) {
			fn(a, b);
		}
	}

	function fix(computed, inline) {
		// unstyle('display', eq, 'none');

		// initialize('height');

		unstyle('opacity', eq, '0');
		// unstyle('overflow-y', eq, 'hidden');
		// unstyle('position', member, ['absolute', 'fixed', 'sticky'], unposition);
		unstyle('position', member, ['fixed', 'sticky'], unposition);
		unstyle('transition-duration', neq, '0s', untransition);
		// unstyle('transform', neq, 'none');
		unstyle('visibility', eq, 'hidden');

		// initialize('min-height');
		// initialize('max-height');
		// initialize('height');

		// unstyle('min-height', neq, 'auto');
		// unstyle('max-height', neq, 'none');

		// naturalize('height', zeropx);

		function unstyle(property, predicate, arg, override) {
			if (predicate(arg, computed.getPropertyValue(property)))
				(override || initialize)(property);
		}

		function initialize(property) {
			inline.setProperty(property, 'initial', 'important');
		}

		function unposition() {
			inline.setProperty('position', 'relative', 'important');

			unstyle('top', neq, '0px');
			unstyle('right', neq, '0px');
			unstyle('bottom', neq, '0px');
			unstyle('left', neq, '0px');

			unstyle('transform', neq, 'none');
			unstyle('overflow-y', eq, 'hidden');

			// initialize('height');
		}

		function untransition() {
			inline.setProperty('transition-property', 'none', 'important');
		}

		function naturalize(property, condition) {
			stack(naturalize_);

			function naturalize_(push, peek) {
				push(value());
				initialize(property);
				push(value());
				peek(undo);
			}

			function clear() {
				inline.removeProperty(property);
			}

			function value() {
				return computed.getPropertyValue(property);
			}

			function undo(a, b) {
				if (a === b || condition(b)) clear();
			}
		}
	}

	function stack(fn, a, b) {
		fn(push, peek);

		function push(value) {
			a = b;
			b = value;
		}

		function peek(fn) {
			fn(a, b);
		}
	}

	function eq(arg, value) {
		return arg === value;
	}

	function neq(arg, value) {
		return arg !== value;
	}

	function member(arg, value) {
		return arg.includes(value);
	}

	function zeropx(value) {
		return value === '0px';
	}
})();

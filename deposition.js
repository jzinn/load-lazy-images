// ==UserScript==
// @name         Unposition
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function(WIDTH) {
	'use strict';

	process(document.documentElement);
	traverse(document.body);

	function traverse(node) {
		if (process(node)) return;
		node.childNodes.forEach(traverse);
	}

	function process(node) {
		return !element() || (candidate() && restyle(node.style));

		function element() {
			return node.nodeType === 1;
		}

		function candidate() {
			return big() && positioned(getComputedStyle(node));
		}

		function big() {
			return node.clientWidth === WIDTH;
		}
	}

	function positioned(computed) {
		return computed.position === 'fixed' || computed.position === 'sticky';
	}

	function restyle(style) {
		initialize(style, 'position');
		return true;
	}

	function initialize(style, property) {
		style.setProperty(property, 'initial', 'important');
	}
})(window.innerWidth);

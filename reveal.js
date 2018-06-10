// ==UserScript==
// @name         Reveal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

// http://www.idownloadblog.com/2016/11/28/tips-tricks-macbook-pro-touch-bar/

(function(width) {
	'use strict';

	process(document.documentElement);
	traverse(document.body);

	function traverse(node) {
		if (process(node)) return;
		node.childNodes.forEach(traverse);
	}

	function process(node) {
		return !element() || candidate() && restyle(node.style);

		function element() {
			return node.nodeType === 1;
		}

		function candidate() {
			// HTMLElement.offsetParent
			return big() && hidden(getComputedStyle(node));
		}

		function big() {
			// HTMLElement.offsetWidth
			// Element.clientWidth
			// Element.scrollWidth
			return node.clientWidth === width;
		}
	}

	function hidden(computed) {
		// computed.visibility === 'hidden';
		return computed.opacity === '0';
	}

	function restyle(style) {
		// initialize(style, 'display');
		// initialize(style, 'filter');
		initialize(style, 'opacity');
		initialize(style, 'transition');
		// initialize(style, 'visibility');
		return true;
	}

	function initialize(style, property) {
		style.setProperty(property, 'initial', 'important');
	}

// https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
// document.body.clientWidth              /* width of <body> */
// document.documentElement.clientWidth   /* width of <html> */
// window.innerWidth                      /* window's width */

// https://jsperf.com/createnodeiterator-vs-createtreewalker-vs-getelementsby
//
// /////
//
// var childNodes = document.getElementsByTagName("*");
// var currentNode;
//
// for (var i = 0, ii = childNodes.length; i < ii; i++) {
//   currentNode = childNodes[i];
//   store.push(currentNode);
// }
//
// ///////
//
// var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT);
//
// var store = [];
// var currentNode;
//
// while (currentNode = iterator.nextNode()) {
//   store.push(currentNode);
// }
//
// //////
//
// var iterator = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
//
// var store = [];
// var currentNode;
//
// while (currentNode = iterator.nextNode()) {
//   store.push(currentNode);
// }

})(window.innerWidth);

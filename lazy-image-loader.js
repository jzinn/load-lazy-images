// ==UserScript==
// @name         Lazy Image Loader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	elementsBy('img').forEach(update);
	elementsBy('iframe').forEach(update);

	function elementsBy(tagName) {
		return Array.from(document.getElementsByTagName(tagName));
	}

	function update(image) {
		updateIf(pick(attributes(), claimsToBeLazy));

		// This page sets opacity on images that are not lazy-loaded:
		// https://www.artsy.net/article/artsy-editorial-painting-dogs-playing-poker-endured-100-years
		function updateIf(attribute) {
			if (attribute) {
				image.src = attribute.value;
				restyle(image.style, window.getComputedStyle(image));
			} else if (!small()) {
				restyle(image.style, window.getComputedStyle(image));
			}
		}

		// make sure "src" is not returned
		function attributes() {
			return Array.from(image.attributes).filter(isData);
		}

		function claimsToBeLazy() {
			return /lazy/i.test(image.className);
		}

		function small() {
			// The default size of HTML replaced elements is 150px by 100px.
			return image.clientWidth < 150 && image.clientHeight < 100;
		}
	}

	function isData(attribute) {
		return /^data-/i.test(attribute.name);
	}

	// Question: How to implement `pick` below for any number of filters?
	//
	// Constraints:
	// *   No use of `var`, or use of `var` limited to a helper function
	//     that could belong in a general collection library.
	//
	// *   Stop immediately once a match is found.
	//
	// function pick(attributes, filters) {
	//     return attributes.find(filters[0]) || attributes.find(filters[1]) || ...;
	// }

	function pick(attributes, claimsToBeLazy) {
		return (
			attributes.find(primary) ||
			(claimsToBeLazy() && attributes.find(secondary))
		);
	}

	function primary(attribute) {
		return /\bsrc\b/i.test(attribute.name) && isSrcValue(attribute.value);
	}

	function secondary(attribute) {
		return isSrcValue(attribute.value);
	}

	function isSrcValue(value) {
		return isURL(value) || isURLWithoutProtocol(value) || isURLPath(value);
	}

	function isURL(value, base) {
		try {
			new URL(value, base);
		} catch (TypeError) {
			return false;
		}
		return true;
	}

	function isURLWithoutProtocol(value) {
		return value.startsWith('//') && isURL('x:' + value);
	}

	function isURLPath(value) {
		return isURL(value, 'http://example.com');
	}

	function restyle(style, computed) {
		initialize('display');
		initialize('background-image');
		initialize('filter');
		initialize('opacity');
		initialize('padding'); // https://www.nytimes.com
		initialize('transition');
		initialize('visibility');
		initializeIfEq('height', '0px'); // https://www.nytimes.com

		function initialize(property) {
			style.setProperty(property, 'initial', 'important');
		}

		function initializeIfEq(property, value) {
			if (eq()) initialize(property);

			function eq() {
				return computed.getPropertyValue(property) === value;
			}
		}
	}
})();

// ==UserScript==
// @name         Amazon Donation Dismisser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        https://www.amazon.com/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	modals()
		.filter(matching(text, some(keywords(), contains)))
		.forEach(dismiss);

	function modals() {
		return Array.from(document.getElementsByClassName('a-modal-scroller'));
	}

	function text(modal) {
		return modal.textContent;
	}

	function matching(text, search) {
		return matching_;

		function matching_(modal) {
			return search(text(modal));
		}
	}

	function some(keywords, contains) {
		return some_;

		function some_(content) {
			return keywords.some(contains(content));
		}
	}

	function contains(content) {
		return contains_;

		function contains_(keyword) {
			return content.contains(keyword);
		}
	}

	function keywords() {
		return ['charity', 'donate', 'donation', 'smile'];
	}

	function dismiss(modal) {
		click(button());

		function button() {
			return modal.querySelector('button.dismiss');
		}
	}

	function click(button) {
		if (!button) return;
		button.click();
	}
})();

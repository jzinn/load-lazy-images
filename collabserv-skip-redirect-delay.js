// ==UserScript==
// @name         Collabserv Skip Redirect Delay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip the insufferable 5 second delay before redirecting.
// @author       You
// @match        https://apps.na.collabserv.com/manage/account/public/federatedIdentity/execute
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	if (weAreWaiting()) justDoIt();

	function weAreWaiting() {
		return !!document.getElementById('redirectMsg');
	}

	function justDoIt() {
		window.redirect();
	}
})();

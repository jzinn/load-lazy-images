// ==UserScript==
// @name         Load Lazy Images
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

    load('data-mediaviewer-src'); // https://www.nytimes.com/interactive/2018/05/24/climate/dry-rio-grande.html
    load('data-native-src'); // https://www.bloomberg.com/news/articles/2018-05-14/drone-pilots-2-000-paydays-drop-90-in-race-to-the-bottom
    load('data-original'); // https://www.macrumors.com/
    load('data-src'); // https://www.atlasobscura.com/articles/what-did-pterosaurs-do-with-their-legs
    load('data-dt-lazy-src'); // https://www.digitaltrends.com/home-theater/how-to-install-kodi-on-an-amazon-fire-tv/

    function load(lazy) {
        images().forEach(update);

        function images() {
            return document.querySelectorAll('img[' + lazy + ']');
        }

        function update(image) {
            image.setAttribute('src', image.getAttribute(lazy));
            restyle(image.style, window.getComputedStyle(image));
        }
    }

    function restyle(style, computed) {
        initialize('background-image');
        initialize('filter');
        initialize('opacity');
        initialize('padding'); // https://www.nytimes.com
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

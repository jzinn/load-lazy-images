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

    function load(lazy) {
        images().forEach(update);

        function images() {
            return document.querySelectorAll('img[' + lazy + ']');
        }

        function update(image) {
            image.setAttribute('src', image.getAttribute(lazy));
            unstyle(image.style);
        }
    }

    function unstyle(style) {
        remove(style);
        initialize(style, 'background-image');
        initialize(style, 'filter');
        initialize(style, 'opacity');
        initialize(style, 'height');
        // initialize(style, 'width');
        // style.width = '100%';
    }

    function remove(style) {
        for (var i = style.length; i--;) {
            style.removeProperty(style[i]);
        }
    }

    function initialize(style, property) {
        style.setProperty(property, 'initial', 'important');
    }
})();

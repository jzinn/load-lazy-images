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

    images().forEach(update);

    function images() {
        return Array.from(document.getElementsByTagName('img'));
    }

    function update(image) {
        updateIf(pick(attributes(), image.className));

        function updateIf(attribute) {
            if (!attribute) return;
            image.src = attribute.value;
            restyle(image.style, window.getComputedStyle(image));
        }

        function attributes() {
            return Array.from(image.attributes).filter(isData);
        }
    }

    function isData(attribute) {
        return attribute.name.toLowerCase().startsWith('data-');
    }

    function pick(attributes, className) {
        return attributes.find(primary) ||
            className.toLowerCase().includes('lazy') &&
            attributes.find(secondary);
    }

    function primary(attribute) {
        return attribute.name.toLowerCase().endsWith('-src') &&
            isSrcValue(attribute.value);
    }

    function secondary(attribute) {
        return isSrcValue(attribute.value);
    }

    function isSrcValue(value) {
        return isURL(value) || isURL(location.protocol + value);
    }

    function isURL(value) {
        try {
            new URL(value);
            return true;
        } catch (TypeError) {
            return false;
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

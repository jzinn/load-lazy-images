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

(function() {
    'use strict';

    images().forEach(update);

    function images() {
        return Array.from(document.getElementsByTagName('img'));
    }

    function update(image) {
        updateIf(pick(attributes(), claimsToBeLazy));

        function updateIf(attribute) {
            if (!attribute) return;
            image.src = attribute.value;
            restyle(image.style, window.getComputedStyle(image));
        }

        // make sure "src" is not returned
        function attributes() {
            return Array.from(image.attributes).filter(isData);
        }

        function claimsToBeLazy() {
            return /lazy/i.test(image.className);
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
        return attributes.find(primary) ||
            claimsToBeLazy() &&
            attributes.find(secondary);
    }

    function primary(attribute) {
        return /\bsrc\b/i.test(attribute.name) &&
            isSrcValue(attribute.value);
    }

    function secondary(attribute) {
        return isSrcValue(attribute.value);
    }

    function isSrcValue(value) {
        return isURL(value) || isURLWithoutProtocol(value);
    }

    function isURL(value) {
        try { new URL(value); } catch (TypeError) { return false; }
        return true;
    }

    function isURLWithoutProtocol(value) {
        return value.startsWith('//') && isURL('x:' + value);
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

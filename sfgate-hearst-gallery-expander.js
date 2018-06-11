// ==UserScript==
// @name         Hearst Gallery Expander
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.sfgate.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    articles().forEach(expand);

    function articles() {
        return document.querySelectorAll('#article-section, .article-content');
    }

    function expand(article) {
        insertUnlessEmpty(images(), insert);

        function images() {
            return Array.from(
                article.querySelectorAll('.hst-resgalleryitem img[load-src]')
            );
        }

        function insert(list) {
            article.appendChild(list);
        }
    }

    function insertUnlessEmpty(images, insert) {
        if (images.length === 0) return;
        insert(populate(list(), items(images)));
    }

    function populate(list, items) {
        items.forEach(append);
        return list;

        function append(item) {
            list.appendChild(item);
        }
    }

    function list() {
        return configure(document.createElement('div'));

        function configure(e) {
            // e.cassList.add('tamper-list');
            styleList(e.style);
            return e;
        }
    }

    function items(images) {
        return images.map(item);
    }

    function item(image) {
        return configure(document.createElement('div'));

        function configure(e) {
            // e.cassList.add('tamper-list-item');
            styleItem(e.style);
            e.appendChild(img());
            e.appendChild(caption());
            return e;
        }

        function img() {
            return configure(document.createElement('img'));

            function configure(e) {
                // e.cassList.add('tamper-list-item-image');
                styleImage(e.style);
                e.setAttribute('src', image.getAttribute('load-src'));
                return e;
            }
        }

        function caption() {
            return configure(document.createElement('div'));

            function configure(e) {
                e.innerHTML = image.alt;
                // e.cassList.add('tamper-list-item-caption');
                styleCaption(e.style);
                return e;
            }
        }
    }

    function styleList(style) {
        style.setProperty('margin-top', '20px');
        style.setProperty('margin-bottom', '20px');
    }

    function styleItem(style) {
        style.setProperty('margin-top', '10px');
        style.setProperty('margin-bottom', '10px');
    }

    function styleImage(style) {}

    function styleCaption(style) {
        style.setProperty('font-family', 'Arial, sans-serif');
        style.setProperty('font-size', '13px');
        style.setProperty('line-height', '17px');
        style.setProperty('padding-top', '10px');
        style.setProperty('padding-bottom', '10px');
    }
})();

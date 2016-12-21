var footnote = (function(){
    "use strict";

    var _allFootnoteElements = [];   // An array of all footnote elements.

    // Default Settings/Configurations
    var config = {
        clickAnywhereToClose: true,
        footnotes: _allFootnoteElements,
    };


    function init() {
        _getFootnoteElements();
    }



    /**
     *  Collects all HTML elements that have footnotes
     *
     * @returns {{Array}}
     * @private
     */
    function _getFootnoteElements(){
        let elements = document.querySelectorAll("*[footnote]");

        // If footnote elements exist and they're not manually configured...
        if (elements.length > 0 && _allFootnoteElements.length === 0) {
            for (var i = 0, elmsLength = elements.length; i < elmsLength; i++) {
                var currentElement = elements[i];
                _allFootnoteElements.push({
                    element: currentElement,
                    footnote: currentElement.getAttribute('footnote'),
                });
            }
        }
    }



    return {
        init:init,
        disable:disableFootnotes,
        config:config
    }

})();

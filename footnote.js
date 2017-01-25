var footnote = (function(){
    "use strict";

    var _allFootnoteElements = [];   // An array of all footnote elements.

    // Default Settings/Configurations
    var config = {
        clickAnywhereToClose:       true,
        hover:                      false,
        footnotes:                  _allFootnoteElements,
    };


    /**
     * Initialization function - this starts the footnote plugin.
     *  @public
     */
    function init() {
        _getFootnoteElements();
        footnoteBox.render();
        _addFootnoteEvents();
    }

    /**
     * Footnote object - all methods pertaining to the actual footnote box.
     * @type {{render: footnoteBox.render, place: footnoteBox.place, destroy: footnoteBox.destroy}}
     */
    var footnoteBox = {
        render: function(){
            // Create box
            this.container = document.createElement("div");
            this.arrow     = document.createElement("div");
            this.box       = document.createElement("div");
            this.note      = document.createElement("div");
            this.closeButton     = document.createElement("span");

            this.container.className = "footnote-container";
            this.arrow.className     = "arrow";
            this.box.className       = "footnote";
            this.note.className      = "footnote-content";
            this.closeButton.className     = "close";

            this.container.appendChild(this.arrow)
            this.container.appendChild(this.box);
            this.box.appendChild(this.note);
            this.box.appendChild(this.closeButton);
            document.body.appendChild(this.container);
        },
        place: function(targetFootnote){
            return function(){
                console.log(targetFootnote)
                footnoteBox.container.style.left = targetFootnote.element.offsetLeft + "px";
                footnoteBox.container.style.top = targetFootnote.element.offsetTop + targetFootnote.element.offsetHeight + "px";
                footnoteBox.container.style.transform = "scale(1)";
                footnoteBox.note.innerHTML = targetFootnote.footnote;
            }
        },
        close: function(){
            return function(){
                footnoteBox.container.style.transform = "scale(0)";
            }
        },
        destroy: function() {
            this.container.parentNode.removeChild(this.container);
        }

    };



    /**
     *  Collects all HTML elements that have footnotes
     *  @private
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

    /**
     *  Creates an event for all footnote elements (Either hover, or click, as set in config)
     * @private
     */
    function _addFootnoteEvents(){
        if(_allFootnoteElements.length > 0) {
            _allFootnoteElements.forEach(function(footnote){
                    footnote.element.addEventListener((config.hover ? "mouseover" : "click"), footnoteBox.place(footnote), false);
            });
            footnoteBox.closeButton.addEventListener("click", footnoteBox.close() )
        }
    }





    /**
     * Removes the footnote element and event listeners.
     */
    function destroy(){
        footnoteBox.destroy();

        _allFootnoteElements.forEach(function(footnote) {
               var footnoteClone = footnote.element.cloneNode(true); // We clone the node because a cloned node doesn't have any event listeners attached to it.
                footnote.element.parentNode.replaceChild(footnoteClone, footnote.element);
        })
    }



    return {
        init:init,
        destroy:destroy,
        config:config
    }

})();

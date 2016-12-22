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
        _addFootnoteEvents();
        footnoteBox.render();
    }



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
            })
        }
    }


    /**
     * Footnote object - all methods pertaining to the actual footnote box.
     * @type {{render: footnoteBox.render, place: footnoteBox.place, destroy: footnoteBox.destroy}}
     */
   var footnoteBox = {
       render: function(){
           // Create box
           this.container = document.createElement("div");
           this.box       = document.createElement("div");
           this.note      = document.createElement("div");
           this.close     = document.createElement("span");

           this.container.className = "footnote-container";
           this.box.className       = "footnote";
           this.note.className      = "note";
           this.close.className     = "close";

           this.container.appendChild(this.box);
           this.box.appendChild(this.note);
           this.box.appendChild(this.close);
           document.body.appendChild(this.container);
       },
       place: function(targetFootnote){
           return function(){
               // Get footnote position, place box by the position
               alert("clicked");
          }
       },
       destroy: function() {
           this.container.parentNode.removeChild(this.container);
       }

    };


    /**
     * Removes all event listeners for all footnotes
     */
    function destroy(){
        footnoteBox.destroy();

        _allFootnoteElements.forEach(function(footnote) {
               var footnoteClone = footnote.element.cloneNode(true);
                footnote.element.parentNode.replaceChild(footnoteClone, footnote.element);
        })
    }



    return {
        init:init,
        destroy:destroy,
        config:config
    }

})();

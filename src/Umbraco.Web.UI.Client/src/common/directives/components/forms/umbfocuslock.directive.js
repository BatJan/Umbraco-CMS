(function() {
    'use strict';

    function FocusLock($timeout) {

        // List of elements that can be focusable within the focus lock
        var focusableElementsSelector = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';

        function link(scope, el) {
            $timeout(function() {
                var target = el[0];

                var focusableElements = target.querySelectorAll(focusableElementsSelector);
                var firstFocusableElement = focusableElements[0];
                var lastFocusableElement = focusableElements[focusableElements.length -1];
                var focusedElement = document.querySelector(':focus');
    
                // If focus has not been set then put focus on the first focusable element
                if(focusedElement === null){
                    firstFocusableElement.focus();
                }
        
                target.addEventListener('keydown', function(event){
                    var isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
        
                    if (!isTabPressed){
                        return;
                    }
        
                    // If shift + tab key
                    if(event.shiftKey){
                        // Set focus on the last focusable element if shift+tab are pressed meaning we go backwards
                        if(document.activeElement === firstFocusableElement){
                            lastFocusableElement.focus();
                            event.preventDefault();
                        }
                    }
                    // Else only the tab key is pressed
                    else{
                        // Using only the tab key we set focus on the first focusable element mening we go forward
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            event.preventDefault();
                        }
                    }
                });
            });
        }

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;
    }

    angular.module('umbraco.directives').directive('umbFocusLock', FocusLock);

})();

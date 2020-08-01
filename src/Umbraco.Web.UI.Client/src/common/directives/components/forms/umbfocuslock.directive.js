(function() {
    'use strict';

    function FocusLock($timeout, eventsService) {

        function getAutoFocusElement (elements) {
            var elmentWithAutoFocus = null;

            elements.forEach((element) => {
                if(element.getAttribute('umb-auto-focus') === 'true') {
                    elmentWithAutoFocus = element;
                }
            });

            return elmentWithAutoFocus;
        }

        function link(scope, element) {
            function onInit() {
                // List of elements that can be focusable within the focus lock
                var focusableElementsSelector = 'a[href]:not([disabled]):not(.ng-hide), button:not([disabled]):not(.ng-hide), textarea:not([disabled]):not(.ng-hide), input:not([disabled]):not(.ng-hide), select:not([disabled]):not(.ng-hide)';
                var bodyElement = document.querySelector('body');
                
                $timeout(function() {
                    var target = element[0];
    
                    var focusableElements = target.querySelectorAll(focusableElementsSelector);

                    if(focusableElements.length > 0) {
                        var defaultFocusedElement = getAutoFocusElement(focusableElements);
                        var firstFocusableElement = focusableElements[0];
                        var lastFocusableElement = focusableElements[focusableElements.length -1];
    
                        // We need to add the tabbing-active class in order to highlight the focused button since the default style is
                        // outline: none; set in the stylesheet specifically
                        bodyElement.classList.add('tabbing-active');
        
                        // If there is no default focused element put focus on the first focusable element in the nodelist
                        if(defaultFocusedElement === null ){
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
                    }

                }, 500);
            }

            onInit();

            // Reinitialize the onInit() method if it was not the last editor that was closed
            eventsService.on('appState.editors.close', (event, args) => {
                if(args.editors.length !== 0) {
                    onInit();
                }
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

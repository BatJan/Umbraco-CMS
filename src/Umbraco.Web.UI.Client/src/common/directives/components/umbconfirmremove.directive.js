/**
@ngdoc directive
@name umbraco.directives.directive:umbConfirmRemove
@restrict E
@scope
@description
<p>Use this directive to toggle a confirmation prompt for an action.
The prompt consists of a checkmark and a cross to confirm or cancel the action.
The prompt can be opened in four direction up, down, left or right.</p>
<h3>Markup example</h3>
<pre>
    <div ng-controller="My.Controller as vm">
        <umb-confirm-remove
            show="vm.promptIsVisible"
            direction="left"
            on-delete="vm.showPrompt()"
            on-confirm="vm.ConfirmRemove()"
            on-cancel="vm.hidePrompt()">
        </umb-confirm-remove>
    </div>
</pre>
<h3>Controller example</h3>
<pre>
    (function () {
        "use strict";
        function Controller() {
            var vm = this;
            vm.promptIsVisible = false;
            vm.ConfirmRemove = ConfirmRemove;
            vm.showPrompt = showPrompt;
            vm.hidePrompt = hidePrompt;
            function ConfirmRemove() {
                // confirm logic here
            }
            function showPrompt() {
                vm.promptIsVisible = true;
            }
            function hidePrompt() {
                vm.promptIsVisible = false;
            }
        }
        angular.module("umbraco").controller("My.Controller", Controller);
    })();
</pre>
@param {string} direction The direction the prompt opens ("up", "down", "left", "right").
@param {callback} onConfirm Callback when the checkmark is clicked.
@param {callback} onCancel Callback when the cross is clicked.
**/

(function () {
    'use strict';

    function ConfirmRemove() {

        function link(scope, el, attr, ctrl) {

            scope.clickButton = function (event) {
                if (scope.onDelete) {
                    scope.onDelete({ $event: event });
                }
            }

            scope.clickConfirm = function () {
                if (scope.onConfirm) {
                    scope.onConfirm();
                }
            };

            scope.clickCancel = function () {
                if (scope.onCancel) {
                    scope.onCancel();
                }
            };

        }

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/components/umb-confirm-remove.html',
            scope: {
                direction: "@",
                show: "<",
                cssClass: "@?",
                onDelete: "&?",
                onConfirm: "&",
                onCancel: "&"
            },
            link: link
        };

        return directive;
    }

    angular.module('umbraco.directives').directive('umbConfirmRemove', ConfirmRemove);

})();

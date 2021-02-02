"use strict";
exports.__esModule = true;
exports.addEventForChild = void 0;
function addEventForChild($parent, eventName, childSelector, callback, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    return $parent.addEventListener(eventName, function (event) {
        var _a;
        console.log('SET EVENT LISTENER AT BODY TO TOOLTIP BUTTON');
        console.log(event.target);
        var $clickedElement = event.target;
        var $matchedChild = (_a = $clickedElement) === null || _a === void 0 ? void 0 : _a.closest(childSelector);
        console.log($matchedChild);
        if ($matchedChild) {
            callback($matchedChild, event);
        }
    }, useCapture);
}
exports.addEventForChild = addEventForChild;

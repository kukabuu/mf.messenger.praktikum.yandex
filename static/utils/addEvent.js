export function addEventForChild($parent, eventName, childSelector, callback, useCapture = false) {
    return $parent.addEventListener(eventName, (event) => {
        console.log('SET EVENT LISTENER AT BODY TO TOOLTIP BUTTON');
        console.log(event.target);
        const $clickedElement = event.target;
        const $matchedChild = $clickedElement?.closest(childSelector);
        console.log($matchedChild);
        if ($matchedChild) {
            callback($matchedChild, event);
        }
    }, useCapture);
}
//# sourceMappingURL=addEvent.js.map
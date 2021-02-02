"use strict";
exports.__esModule = true;
exports.togglePopup = void 0;
function togglePopup(element) {
    console.log('event-listener:toggle-popup');
    var popupId = element.dataset.popup;
    console.log(popupId);
    if (!popupId) {
        return;
    }
    var toggleClass = 'i-visible';
    var $popup = document.querySelector(popupId);
    console.log($popup);
    var isDisplay = $popup === null || $popup === void 0 ? void 0 : $popup.classList.contains(toggleClass);
    console.log($popup === null || $popup === void 0 ? void 0 : $popup.classList);
    if (isDisplay) {
        $popup === null || $popup === void 0 ? void 0 : $popup.classList.remove(toggleClass);
    }
    else {
        $popup === null || $popup === void 0 ? void 0 : $popup.classList.add(toggleClass);
    }
}
exports.togglePopup = togglePopup;

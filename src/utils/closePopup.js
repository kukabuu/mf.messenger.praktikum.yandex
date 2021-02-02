"use strict";
exports.__esModule = true;
exports.closePopup = void 0;
function closePopup() {
    var toggleClass = 'i-visible';
    var popupSelector = '.js-popup';
    var $popups = document.querySelectorAll(popupSelector);
    console.log($popups);
    $popups === null || $popups === void 0 ? void 0 : $popups.forEach(function ($popup) {
        $popup === null || $popup === void 0 ? void 0 : $popup.classList.remove(toggleClass);
    });
}
exports.closePopup = closePopup;

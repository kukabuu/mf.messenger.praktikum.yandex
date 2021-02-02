export function closePopup() {
    const toggleClass = 'i-visible';
    const popupSelector = '.js-popup';
    const $popups = document.querySelectorAll(popupSelector);
    console.log($popups);
    $popups?.forEach(($popup) => {
        $popup?.classList.remove(toggleClass);
    });
}
//# sourceMappingURL=closePopup.js.map
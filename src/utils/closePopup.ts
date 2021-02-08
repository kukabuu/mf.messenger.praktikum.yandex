export function closePopup(): void {
  const toggleClass = 'i-visible';
  const popupSelector = '.js-popup';
  const $popups = document.querySelectorAll(popupSelector);
  $popups?.forEach(($popup: HTMLElement) => {
    $popup?.classList.remove(toggleClass);
  });
}

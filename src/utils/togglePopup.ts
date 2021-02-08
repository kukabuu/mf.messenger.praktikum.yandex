export function togglePopup(element: HTMLElement): void {
  const popupId = element.dataset.popup;
  if (!popupId) {
    return;
  }
  const toggleClass = 'i-visible';
  const $popup = document.querySelector(popupId);
  const isDisplay = $popup?.classList.contains(toggleClass);
  if (isDisplay) {
    $popup?.classList.remove(toggleClass);
  } else {
    $popup?.classList.add(toggleClass);
  }
}

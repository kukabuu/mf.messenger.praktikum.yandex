export function togglePopup(element: HTMLElement) {
	console.log('event-listener:toggle-popup')

	const popupId = element.dataset.popup;
	console.log(popupId)
	if (!popupId) {
		return;
	}
	const toggleClass = 'i-visible';
	const $popup = document.querySelector(popupId);
	console.log($popup)
	const isDisplay = $popup?.classList.contains(toggleClass);
	console.log($popup?.classList)
	if (isDisplay) {
		$popup?.classList.remove(toggleClass);
	} else {
		$popup?.classList.add(toggleClass);
	}
}

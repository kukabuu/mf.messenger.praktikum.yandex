export function closePopup() {
	const toggleClass = 'i-visible';
	const popupSelector = '.js-popup';
	const $popups = document.querySelectorAll(popupSelector);
	console.log($popups)
	$popups?.forEach(($popup: HTMLElement) => {
		$popup?.classList.remove(toggleClass);
	})
}

export function addEventForChild(
	$parent: HTMLElement,
	eventName: string,
	childSelector: string,
	callback: Function,
	useCapture: boolean = false
) {
	return $parent.addEventListener(eventName, (event) => {
		console.log('SET EVENT LISTENER AT BODY TO TOOLTIP BUTTON')
		console.log(event.target)
		const $clickedElement = event.target;
		const $matchedChild = ($clickedElement as HTMLElement)?.closest(childSelector);
		console.log($matchedChild)
		if ($matchedChild) {
			callback($matchedChild, event);
		}
	}, useCapture);
}

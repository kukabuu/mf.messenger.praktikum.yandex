type Callback = ($element: Element, event: Event) => void

export function addEventForChild(
  $parent: HTMLElement,
  eventName: string,
  childSelector: string,
  callback: Callback,
  useCapture = false
): void {
  return $parent.addEventListener(eventName, (event) => {
    const $clickedElement = event.target;
    const $matchedChild = ($clickedElement as HTMLElement)?.closest(childSelector);
    if ($matchedChild) {
      callback($matchedChild, event);
    }
  }, useCapture);
}

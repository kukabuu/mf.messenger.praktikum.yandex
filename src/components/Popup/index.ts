import Block from '../../core/Block/index.js';

import { template } from './template.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import compile from '../../utils/compile.js';

type EventListener = {
	event: string,
	callback: () => void
}

type PopupProps = {
	header: string
	input: string
	button: string
	cancelButton?: string
	eventListeners?: EventListener[]
};

export default class Popup extends Block<PopupProps> {
	constructor(
		{
			eventListeners = [],
			cancelButton = '',
			...props
		}: PopupProps) {
		super({
			eventListeners,
			cancelButton,
			...props
		});

		eventListeners.forEach((listener) => {
			globalEventBus.on(listener['event'], listener['callback'])
		})
	}

	render() {
		return compile(template, this.props);
	}
}

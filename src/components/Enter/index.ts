import Block from '../../core/Block/index.js';

import { template } from './template.js';
import compile from '../../utils/compile.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

type EventListener = {
	event: string,
	callback: () => void
}

type EnterProps = {
	className: string,
	header: string,
	inputs: string,
	button: string,
	back: {
		link: string,
		text: string
	},
	eventListeners?: EventListener[]
};

class Enter extends Block {
	constructor({ eventListeners = [], ...props }: EnterProps) {
		super({eventListeners, ...props});

		eventListeners.forEach((listener) => {
			globalEventBus.on(listener['event'], listener['callback'])
		})
	}

	render() {
		return compile(template, this.props);
	}
}

export default Enter;

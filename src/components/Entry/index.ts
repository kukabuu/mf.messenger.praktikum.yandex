import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

type EventListener = {
	event: string
	callback: () => void
}

type EntryProps = {
	className: string
	header: string
	inputs: string
	button: string
	back: {
		link: string
		text: string
	}
	eventListeners?: EventListener[]
};

export default class Entry extends Block<EntryProps> {
	constructor({ eventListeners = [], ...props }: EntryProps) {
		super({eventListeners, ...props});

		eventListeners.forEach((listener) => {
			globalEventBus.on(listener['event'], listener['callback'])
		})
	}

	render() {
		return compile(template, this.props);
	}
}


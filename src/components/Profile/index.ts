import Block from '../../core/Block/index.js';

import { template } from './template.js';
import compile from '../../utils/compile.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

type EventListener = {
	event: string,
	callback: () => void
}

export type ProfileProps = {
	header?: string
	inputs: string
	popup?: string
	button?: string
	avatar: {
		[key: string] : string
	}
	form?: {
		className?: string
		method?: 'get' | 'post'
	}
	footerLinks?: {
		name: string
		href: string
		className?: string
	}[]
	back: {
		[key: string] : string
	}
	eventListeners?: EventListener[]
};

class Profile extends Block {
	constructor({
		eventListeners = [],
		footerLinks = [{
			name: '',
			href: '#',
			className: ''
		}],
		form = {
			className: '',
			method: 'get'
		},
		popup = '',
		header = '',
		button = '',
		...props
	}: ProfileProps) {
		super({
			eventListeners,
			footerLinks,
			form,
			popup,
			header,
			button,
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

export default Profile;

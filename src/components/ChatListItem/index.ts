import Block from '../../core/Block/index.js';
import { template } from './template.js';

import compile from '../../utils/compile.js';

export type ListItemProps = {
	avatar: {
		src: string
		name: string
	}
	name: string
	preview: string
	time: {
		full: string
		less: string
	}
	from?: {
		text?: string
		className?: string
	}
	counter?: {
		value?: string | number
		className?: string
	}
};

export default class ChatListItem extends Block {
	constructor({
		from = {
			text: 'Вы:',
			className: 'i-display-none'
		},
		counter = {
			value: '',
			className: 'i-display-none'
		},
		 ...props
	}: ListItemProps) {
		super({from, counter, ...props});
	}

	render() {
		return compile(template, this.props);
	}
}

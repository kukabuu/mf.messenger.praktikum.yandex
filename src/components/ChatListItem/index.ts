import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	avatar: {
		[key: string]: string
	},
	name: string,
	from: {
		text: string,
		className?: string,
	},
	message: {
		counter?: string | number,
		className?: string,
		preview: string
	},
	time: {
		[key: string]: string
	}
};

export class ChatListItem extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

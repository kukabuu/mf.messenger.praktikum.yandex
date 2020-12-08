import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	profile: {
		link: string,
		name: string,
		search: {
			name: string,
			id: string
		}
	}
};

export class ChatAside extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

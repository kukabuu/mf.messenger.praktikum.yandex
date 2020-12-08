import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	header: {
		person: {
			[key: string]: string
		},
		tooltip: {
			options: {
				[key: string]: string
			}[]
		},
	}
	footer: {
		attachments: {
			name: string,
			src: string,
			options: {
				[key: string]: string
			}[]
		},
		sendMessage: {
			name: string,
			placeholder: string,
			button: {
				[key: string]: string
			}
		}
	}
};

export class ChatMain extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

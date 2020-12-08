import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	type?: string,
	position: {
		[key: string] : string | boolean
	},
	person?: {
		[key: string] : string
	},
	message: {
		type?: string,
		className: string,
		content: {
			[key: string] : string
		} | string
	},
	time: {
		full: string,
		less: string,
		date?: string
	}
};

export class DialogMessage extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	text: string
};

export class EmptyDialog extends Block {
	constructor(props: props, tagName= 'span') {
		super(props, tagName);
	}

	render() {
		return template;
	}
}

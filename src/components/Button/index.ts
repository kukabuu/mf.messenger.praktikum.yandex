import Block from '../Block/index.js';
import { buttonTemplate } from './template.js';

type props = {
	[key: string]: string | number | boolean | Function
}

export default class Button extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return buttonTemplate;
	}
}


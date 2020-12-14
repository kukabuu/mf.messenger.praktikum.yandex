import Block from '../Block/index.js';

import { template } from './template.js';
import compile from '../../utils/compile.js';

type ServerErrorProps = {
	error: string | number,
	errorText: string,
	back: {
		link: string,
		text: string
	}
};

export default class ServerError extends Block<ServerErrorProps> {
	constructor(props: ServerErrorProps) {
		super(props);
	}

	render() {
		return compile(template, this.props);
	}
}

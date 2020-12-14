import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';

type ErrorProps = {
	className?: string;
	text?: string;
}

export default class Error extends Block<ErrorProps> {
	constructor(
		{
			className = '',
			text = ''
		}: ErrorProps) {
		super({ className, text });
	}

	render() {
		return compile(template, this.props);
	}
}


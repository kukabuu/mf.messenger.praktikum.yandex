import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';

type ImageProps = {
	className?: string
	src: string
	name: string,
	size: number
}

export default class Image extends Block<ImageProps> {
	constructor(
		{
			className = '',
			...props
		}: ImageProps) {
		super({
			className,
			...props
		});
	}

	render() {
		return compile(template, this.props);
	}
}


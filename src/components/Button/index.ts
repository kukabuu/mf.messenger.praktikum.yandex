import Block from '../../core/Block/index.js';
import { template } from './template.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import compile from '../../utils/compile.js';

type ButtonProps = {
	handleClick?: {
		[key: string]: (...event: MouseEvent[]) => void
	}
	className?: string
	type?: 'button' | 'submit' | 'reset'
	text?: string
	content?: string
	data?: {
		name?: string
		value?: string
	}
}

export default class Button extends Block<ButtonProps> {
	constructor(
		{
			className = 'button',
			type = 'button',
			content = '',
			handleClick = {},
			text = '',
			data = {
				name: '',
				value: ''
			}
		}: ButtonProps) {
		super({
			className,
			type,
			content,
			handleClick,
			text,
			data
		});

		Object.entries(handleClick).forEach(([event, callback]) =>{
			globalEventBus.on(event, callback)
		})
	}

	render() {
		return compile(template, this.props);
	}
}


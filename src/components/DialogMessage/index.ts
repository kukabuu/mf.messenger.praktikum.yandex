import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';

export type MessageProps = {
	isEmpty?: boolean
	empty?: {
		text?: string
	}
	from?: boolean
	position: {
		className: string
	},
	person?: {
		src?: string
		name?: string
	},
	isAttachment?: boolean
	attachment?: {
		src?: string
		name?: string
		className?: string
	}
	message?: {
		className?: string
		content?: string
	},
	date?: {
		value?: string
		className?: string
	}
	time: {
		full: string
		less: string
	}
};

export default class DialogMessage extends Block<MessageProps> {
	constructor(
		{
			isEmpty = false,
			empty = {
				text: 'Выберите чат, чтобы отправить сообщение'
			},
			from = false,
			person = {
				src: '',
				name: ''
			},
			isAttachment = false,
			attachment = {
				src: '',
				name: '',
				className: 'i-display-none'
			},
			message = {
				className: '',
				content: ''
			},
			date = {
				value: '',
				className: 'i-display-none'
			},
			...props
		}: MessageProps
	) {
		super({
			isEmpty,
			empty,
			from,
			person,
			isAttachment,
			attachment,
			message,
			date,
			...props
		});
	}

	render() {
		return compile(template, this.props);
	}
}

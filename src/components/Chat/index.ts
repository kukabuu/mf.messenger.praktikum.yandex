import Block from '../../core/Block/index.js';
import { template } from './template.js';

import compile from '../../utils/compile.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

type EventListener = {
	event: string,
	callback: () => void
}

type ChatProps = {
	profile: {
		link: string
		name: string
		search: {
			name: string
			id: string
		}
	}
	chatListItems: string
	header: {
		person: {
			src: string
			name: string

		}
		tooltip: {
			options: {
				className: string
				href: string
				text: string
			}[]
		}
	}
	dialog?: string
	footer: {
		attachments: {
			name: string
			src: string
			options: {
				className: string
				href: string
				text: string
			}[]
		},
		sendMessage: {
			name: string
			placeholder: string
			isRequired: boolean
			button: {
				src: string
				name: string
			}
		}
	}
	popupRemoveUser?: string
	popupAddUser?: string
	popupChatDelete?: string
	popupUploadFile?: string
	eventListeners?: EventListener[]
};

export default class Chat extends Block {
	constructor({
		popupRemoveUser = '',
		popupAddUser = '',
		popupChatDelete = '',
		popupUploadFile = '',
		dialog = '',
		chatListItems = '',
		eventListeners = [],
		...props
	}: ChatProps) {
		super({
			popupRemoveUser,
			popupAddUser,
			popupChatDelete,
			popupUploadFile,
			dialog,
			chatListItems,
			eventListeners,
			...props
		});

		eventListeners.forEach((listener) => {
			globalEventBus.on(listener['event'], listener['callback'])
		})
	}

	render() {
		return compile(template, this.props);
	}
}

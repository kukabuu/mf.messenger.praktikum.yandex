import Block from '../core/Block/index.js';
import { router } from '../core/Main/main.js';
import Notification from '../components/Notification/index.js';
import { globalEventBus } from '../core/GlobalEventBus/index.js';

type Options = {
	response: XMLHttpRequest
	block: Block<object> | null
	successMessage?: string,
	errorMessage?: string,
	showOnSuccess?: boolean
}

function hideNotification(block: Block<object> | null) {
	setTimeout(() => {
		block?.setProps({
			notification: ''
		})
		console.log(globalEventBus.listeners)
	}, 3000000);
}

export function notify({
	response,
	block,
	successMessage = '',
	errorMessage = '',
	showOnSuccess = false
}: Options) {
	console.log(response.responseText, response.status)
	switch (response.status) {
		case 404:
			router.go('/notFound');
			break;
		case 500:
			router.go('/serverError');
			break;
		case 200:
			if (!showOnSuccess) {
				break;
			}
			block?.setProps({
				notification: new Notification({
					message: successMessage,
				}).getContent().innerHTML
			})
			hideNotification(block);
			break;
		default:
			block?.setProps({
				notification: new Notification({
					title: 'Ошибка!',
					message: response.responseText || errorMessage,
					status: 'notification--error'
				}).getContent().innerHTML
			})
			hideNotification(block);
	}
}

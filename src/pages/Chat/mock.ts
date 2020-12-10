import Error from '../../components/Error/index.js';
import Input, { InputProps } from '../../components/Input/index.js';
import Button from '../../components/Button/index.js';
import Popup from '../../components/Popup/index.js';

import { ListItemProps } from '../../components/ChatListItem/index.js';
import concatItems from '../../components/ChatListItem/concatItems.js';

import { collectFormData } from '../../utils/collectFormData.js';
import { FormValidator } from '../../utils/validate.js';
import { displayFileName } from '../../utils/displayFileName.js';
import concatMessage from '../../components/DialogMessage/concatMessage.js';

const chatListProps: ListItemProps[] = [
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 2,
			className: ''
		},
		time: {
			full: '2020-11-05 18:30',
			less: '18:30'
		}
	},
	{
		avatar: {
			name: 'Непутевые заметки',
			src: 'images/user_blob.png'
		},
		name: 'Непутевые заметки',
		preview: 'Классная история!',
		from: {
			className: ''
		},
		time: {
			full: '2020-11-01 18:30',
			less: '1 ноября'
		}
	},
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 8,
		},
		time: {
			full: '2020-11-04 18:30',
			less: 'Ср'
		}
	},
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 8,
		},
		time: {
			full: '2020-11-04 18:30',
			less: 'Ср'
		}
	},
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 8,
		},
		time: {
			full: '2020-11-04 18:30',
			less: 'Ср'
		}
	},
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 8,
		},
		time: {
			full: '2020-11-04 18:30',
			less: 'Ср'
		}
	},
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 8,
		},
		time: {
			full: '2020-11-04 18:30',
			less: 'Ср'
		}
	},
	{
		avatar: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		name: 'Андрей',
		preview: 'Друзья! У меня для вас особенный выпуск новостей! О да, вы такого еще не слышали.',
		counter: {
			value: 8,
		},
		time: {
			full: '2020-11-04 18:30',
			less: 'Ср'
		}
	},
];

export const dialogProps = [
	{
		from: true,
		position: {
			className: 'message--left',
		},
		person: {
			src: 'images/user_blob.png',
			name: 'Андрей'
		},
		message:  {
			className: 'message--from',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Accusamus animi architecto at cum eos esse et, hic impedit,
									laboriosam neque odit placeat quasi quidem rem sed similique
									suscipit tempore, voluptas? Accusamus blanditiis
									excepturi fuga fugit, illo ipsum nesciunt odit omnis pariatur
									quisquam, reiciendis, rerum sapiente unde vitae voluptatibus?
									Alias beatae commodi distinctio est maxime mollitia nemo repellat
									repudiandae sequi voluptatibus. Distinctio itaque
									perferendis perspiciatis quis quo suscipit tempore voluptate?
									Commodi deserunt dicta et ex impedit iusto magnam maxime repellat.
									Alias dignissimos ducimus ea esse maxime necessitatibus neque numquam,
									ut voluptas.`
		},
		time: {
			full: '2020-11-01 20:00',
			less: '20:00'
		},
		date: {
			className: '',
			value: '1 ноября'
		}
	},
	{
		from: true,
		position: {
			className: 'message--left'
		},
		person: {
			src: 'images/user_blob.png',
			name: 'Андрей'
		},
		isAttachment: true,
		attachment: {
			src: 'images/cat.jpg',
			name: 'Кот',
			className: 'message--from attachment',
		},
		time: {
			full: '2020-11-01 20:00',
			less: '20:00'
		}
	},
	{
		position: {
			className: 'message--right'
		},
		message: {
			className: 'message--yours',
			content: 'Круто!'
		},
		time: {
			full: '2020-11-01 21:00',
			less: '21:00'
		}
	},
];

const inputFileProps: InputProps = {
	id: 'file',
	type: 'file',
	className: 'form__input--file js-file-upload',
	group: {
		className: 'popup__form-group'
	},
	label: {
		className: 'form__label popup__label js-file-upload--label',
		text: 'Выбрать файл на компьютере'
	},
	file: {
		className: 'js-file-name'
	},
	errorEntry: new Error({
		className: 'popup--error'
	}).element.innerHTML,
	floatedLabel: {
		className: 'i-display-none'
	}
};

const inputAddUserProps: InputProps = {
	id: 'login-add',
	placeholder: 'Логин',
	label: {
		className: 'i-visually-hidden',
		text: 'Логин'
	},
	floatedLabel: {
		text: 'Логин'
	},
	errorEntry: new Error({}).element.innerHTML
};

const inputRemoveUserProps: InputProps = {
	id: 'login-remove',
	placeholder: 'Логин',
	label: {
		className: 'i-visually-hidden',
		text: 'Логин'
	},
	floatedLabel: {
		text: 'Логин'
	},
	errorEntry: new Error({}).element.innerHTML
};

const inputDeleteChatProps: InputProps = {
	id: 'chat-delete',
	value: '1234',
	name: 'chatId',
	isHidden: true,
	className: 'i-display-none',
	label: {
		className: 'i-visually-hidden',
		text: 'Удалить чат?'
	}
};

const popupFileProps = {
	header: 'Загрузите файл',
	input: new Input(inputFileProps).element.innerHTML,
	button: new Button({
		text: 'Поменять',
		className: 'button popup__button',
		type: 'submit'
	}).element.innerHTML,
	eventListeners: [
		{
			event: 'event-listener:validate-form-file',
			callback: () => {
				const $form = document.querySelector('#popup-upload-file .js-form');
				const fields = ['file'];
				const validator = new FormValidator($form, fields);
				validator.initialize();
			}
		},
		{
			event: 'event-listener:display-file-name',
			callback: () => {
				displayFileName();
			}
		},
	]
}

const popupAddUserProps = {
	header: 'Добавить пользователя',
	input: new Input(inputAddUserProps).element.innerHTML,
	button: new Button({
		text: 'Добавить',
		className: 'button chat__button--toggle-user',
		type: 'submit'
	}).element.innerHTML,
	eventListeners: [{
		event: 'event-listener:validate-add-user',
		callback: () => {
			const $form = document.querySelector('#popup-add-user .js-form');
			const fields = ['login-add'];
			const validator = new FormValidator($form, fields);
			validator.initialize();
		}
	}]
}

const popupRemoveUserProps = {
	header: 'Удалить пользователя',
	input: new Input(inputRemoveUserProps).element.innerHTML,
	button: new Button({
		text: 'Удалить',
		className: 'button chat__button--toggle-user',
		type: 'submit'
	}).element.innerHTML,
	eventListeners: [{
		event: 'event-listener:validate-remove-user',
		callback: () => {
			const $form = document.querySelector('#popup-remove-user .js-form');
			const fields = ['login-remove'];
			const validator = new FormValidator($form, fields);
			validator.initialize();
		}
	}]
}

const popupDeleteChatProps = {
	header: 'Удалить пользователя',
	input: new Input(inputDeleteChatProps).element.innerHTML,
	button: new Button({
		text: 'Удалить',
		className: 'button chat__button--delete',
		type: 'submit'
	}).element.innerHTML,
	cancelButton: new Button({
		text: 'Не удалять',
		type: 'reset',
		className: 'button chat__button--cancel'
	}).element.innerHTML,
	eventListeners: [{
		event: 'event-listener:validate-remove-chat',
		callback: () => {
			const $form = document.querySelector('#popup-remove-user .js-form');
			const fields = ['chat-delete'];
			const validator = new FormValidator($form, fields);
			validator.initialize();
		}
	}]
}

export const chatProps = {
	profile: {
		link: 'profile.html',
		name: 'Профиль',
		search: {
			name: 'Поиск',
			id: 'search'
		}
	},
	header: {
		person: {
			name: 'Андрей',
			src: 'images/user_blob.png'
		},
		tooltip: {
			options: [
				{
					text: 'Добавить пользователя',
					href: '#popup-add-user',
					className: 'option--add-user'
				},
				{
					text: 'Удалить пользователя',
					href: '#popup-remove-user',
					className: 'option--remove-user'
				},
				{
					text: 'Удалить чат',
					href: '#popup-chat-delete',
					className: 'option--delete-chat'
				},
			],
		}
	},
	footer: {
		attachments: {
			name: 'Добавить',
			src: './images/attach.png',
			options: [
				{
					text: 'Фото или Видео',
					href: '#popup-upload-file',
					className: 'option--add-foto'
				},
				{
					text: 'Файл',
					href: '#popup-upload-file',
					className: 'option--add-file'
				},
			]
		},
		sendMessage: {
			name: 'message',
			placeholder: 'Сообщение',
			isRequired: true,
			button: {
				name: 'Отправить',
				src: './images/back.png'
			}
		}
	},
	chatListItems: concatItems(chatListProps),
	dialog: concatMessage(dialogProps),
	eventListeners: [{
		event: 'event-listener:collect-form-data-chat',
		callback: () => {
			collectFormData();
		}
	}],
	popupUploadFile: new Popup(popupFileProps).element.innerHTML,
	popupRemoveUser: new Popup(popupRemoveUserProps).element.innerHTML,
	popupAddUser: new Popup(popupAddUserProps).element.innerHTML,
	popupChatDelete: new Popup(popupDeleteChatProps).element.innerHTML,
}

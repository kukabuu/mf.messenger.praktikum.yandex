import Error from '../../components/Error/index.js';

import concatInputs from '../../components/Input/concatInputs.js';
import { InputProps } from '../../components/Input/index.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { addEventForChild } from '../../utils/addEvent.js';

export const inputs: InputProps[] =  [
	{
		label: {
			className: 'form__label profile__label',
			text: 'Почта'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		group: {
			className: 'profile__group'
		},
		id: 'email',
		name: 'email',
		type: 'email',
		value: '',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Логин'
		},
		group: {
			className: 'profile__group'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		id: 'login',
		name: 'login',
		value: '',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Имя'
		},
		group: {
			className: 'profile__group'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		id: 'first_name',
		name: 'first_name',
		value: '',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Фамилия'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		group: {
			className: 'profile__group'
		},
		id: 'second_name',
		name: 'second_name',
		value: '',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Имя в чате'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		group: {
			className: 'profile__group'
		},
		id: 'display_name',
		name: 'display_name',
		value: '',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Телефон'
		},
		group: {
			className: 'profile__group'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		id: 'phone',
		name: 'phone',
		type: 'tel',
		value: '',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
];

export const props = {
	header: '',
	avatar: './images/profile_blob.png',
	avatarInfo: {
		name: 'Аватар',
	},
	inputs: concatInputs(inputs),
	footerLinks: [
		{
			name: 'Изменить данные',
			href: 'changeProfile'
		},
		{
			name: 'Изменить пароль',
			href: 'changePassword'
		},
		{
			name: 'Выйти',
			href: '',
			className: 'link--exit js-logout'
		}
	],
	back: {
		link: 'chats',
		text: 'Назад',
		src: './images/Back.png'
	},
	eventListeners: [
		{
			event: 'event-listener:logout',
			callback: () => {
				addEventForChild(
					document.body,
					'click',
					'.js-logout',
					(_element: HTMLElement, event: Event) => {
						event.preventDefault();
						globalEventBus.emit('event-listener:logout-clicked');
					}
				)
			}
		}
	]
};

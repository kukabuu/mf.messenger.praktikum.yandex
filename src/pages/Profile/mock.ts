import Button from '../../components/Button/index.js';
import Error from '../../components/Error/index.js';
import Input from '../../components/Input/index.js';
import Popup from '../../components/Popup/index.js';

import concatInputs from '../../components/Input/concatInputs.js';
import { InputProps } from '../../components/Input/index.js';
import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { displayFileName } from '../../utils/displayFileName.js';

const inputs: InputProps[] =  [
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
		value: 'pochta@yandex.ru',
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
		value: 'Ivan',
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
		value: 'Иван',
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
		value: 'Иванов',
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
		value: 'Ivan',
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
		value: '+7(999)999-99-99',
		isReadOnly: true,
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
];
const popupInputProps: InputProps = {
	id: 'avatar',
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
	errorEnter: new Error({
		className: 'popup--error'
	}).element.innerHTML,
	floatedLabel: {
		className: 'i-display-none'
	}
};
const popupProps = {
	header: 'Загрузите файл',
	input: new Input(popupInputProps).element.innerHTML,
	button: new Button({
		text: 'Поменять',
		type: 'submit',
		className: 'button popup__button'
	}).element.innerHTML,
	eventListeners: [
		{
			event: 'event-listener:validate-form-file',
			callback: () => {
				const $form = document.querySelector('.js-form');
				const fields = ['avatar'];
				const validator = new FormValidator($form, fields);
				validator.initialize();
			}
		},
		{
			event: 'event-listener:collect-form-data-file',
			callback: () => {
				collectFormData();
			}
		},
		{
			event: 'event-listener:display-file-name',
			callback: () => {
				displayFileName();
			}
		},
	]
};

export const profileProps = {
	header: 'Иван',
	avatar: {
		name: 'Аватар',
		src: './images/profile_blob.png',
		link: '#popup-update-avatar',
		linkText: 'Поменять аватар',
	},
	inputs: concatInputs(inputs),
	footerLinks: [
		{
			name: 'Изменить данные',
			href: 'edit-profile.html'
		},
		{
			name: 'Изменить пароль',
			href: 'change-password.html'
		},
		{
			name: 'Выйти',
			href: 'login.html',
			className: 'link--exit'
		}
	],
	back: {
		link: 'chat.html',
		text: 'Назад',
		src: './images/Back.png'
	},
	popup: new Popup(popupProps).element.innerHTML,
};

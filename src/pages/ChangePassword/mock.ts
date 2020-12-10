import Button from '../../components/Button/index.js';
import Error from '../../components/Error/index.js';

import concatInputs from '../../components/Input/concatInputs.js';
import { InputProps } from '../../components/Input/index.js';

import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { ProfileProps } from '../../components/Profile/index.js';

const inputs: InputProps[] =  [
	{
		label: {
			className: 'form__label profile__label',
			text: 'Старый пароль'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		group: {
			className: 'profile__group'
		},
		id: 'oldPassword',
		name: 'oldPassword',
		type: 'password',
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Новый пароль'
		},
		group: {
			className: 'profile__group'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		id: 'password',
		name: 'password',
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
	{
		label: {
			className: 'form__label profile__label',
			text: 'Повторите новый пароль'
		},
		group: {
			className: 'profile__group'
		},
		floatedLabel: {
			className: 'i-display-none'
		},
		id: 'password-repeat',
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	}
];

export const profileChangePasswordProps: ProfileProps = {
	header: 'Иван',
	avatar: {
		name: 'Аватар',
		src: './images/profile_blob.png',
		link: '#',
		linkText: '',
	},
	form: {
		className: 'js-form',
		method: 'post'
	},
	inputs: concatInputs(inputs),
	button: new Button({
		text: 'Сохранить',
		className: 'button edit-profile__button',
		type: 'submit'
	}).element.innerHTML,

	back: {
		link: 'profile.html',
		text: 'Назад',
		src: './images/Back.png'
	},
	eventListeners: [
		{
			event: 'event-listener:validate-form',
			callback: () => {
				const $form = document.querySelector('.js-form');
				const fields = ['oldPassword', 'password', 'password-repeat'];
				const validator = new FormValidator($form, fields);
				validator.initialize();
			}
		},
		{
			event: 'event-listener:collect-form-data',
			callback: () => {
				collectFormData();
			}
		},
	]
};


export const props = {
	header: 'Иван',
	avatar: {
		name: 'Аватар',
		src: './images/profile_blob.png',
		link: '#popup-update-avatar',
		linkText: 'Поменять аватар',
	},
	inputs: [
		{
			name: 'Старый пароль',
			id: 'oldPassword',
			type: 'password'
		},
		{
			name: 'Новый пароль',
			id: 'password',
			type: 'password'
		},
		{
			name: 'Повторите новый пароль',
			id: 'password-repeat',
			type: 'password'
		},
	],
	back: {
		link: 'profile.html',
		text: 'Назад',
		src: './images/Back.png'
	}
};

export const buttonProps = {
	text: 'Сохранить',
	className: 'button edit-profile__button'
}

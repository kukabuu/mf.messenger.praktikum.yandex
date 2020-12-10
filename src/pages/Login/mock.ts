import Button from '../../components/Button/index.js';
import Error from '../../components/Error/index.js';

import concatInputs from '../../components/Input/concatInputs.js';
import { InputProps } from '../../components/Input/index.js';

import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';

const inputs: InputProps[] = [
	{
		name: 'Логин',
		id: 'login',
		placeholder: 'Логин',
		label: {
			className: 'i-visually-hidden',
			text: 'Логин',
		},
		floatedLabel: {
			className: '',
			text: 'Логин'
		},
		value: '',
		errorEnter: new Error({}).element.innerHTML
	},
	{
		name: 'Пароль',
		id: 'password',
		type: 'password',
		placeholder: 'Пароль',
		label: {
			className: 'i-visually-hidden',
			text: 'Пароль',
		},
		floatedLabel: {
			className: '',
			text: 'Пароль'
		},
		value: '',
		errorEnter: new Error({}).element.innerHTML
	}
];

export const loginProps = {
	className: 'login',
	header: 'Вход',
	inputs: concatInputs(inputs),
	back: {
		link: 'signin.html',
		text: 'Нет аккаунта?'
	},
	button: new Button({
		type: 'submit',
		text: 'Авторизоваться',
		className: 'button login__button'
	}).element.innerHTML,
	eventListeners: [
		{
			event: 'event-listener:validate-form-login',
		  callback: () => {
				const $form = document.querySelector('.js-form');
				const fields = ['login', 'password'];
				const validator = new FormValidator($form, fields);
				validator.initialize();
			}
		},
		{
			event: 'event-listener:collect-form-data-login',
			callback: () => {
				collectFormData();
			}
		}
	]
};

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
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	},
];

export const profileEditProps: ProfileProps = {
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
				const fields = ['email', 'login', 'first_name', 'second_name', 'phone', 'display_name'];
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

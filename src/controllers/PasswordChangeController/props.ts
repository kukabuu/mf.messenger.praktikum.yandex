import Button from '../../components/Button/index.js';
import Error from '../../components/Error/index.js';

import concatInputs from '../../components/Input/concatInputs.js';
import { InputProps } from '../../components/Input/index.js';

import { FormValidator } from '../../utils/validate.js';
import { ProfileProps } from '../../components/Profile/index.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { addEventForChild } from '../../utils/addEvent.js';

function submitForm($form: HTMLFormElement, event: Event) {
	event.preventDefault();
	globalEventBus.emit('event-listener:change-password-clicked', $form)
}

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
		name: 'newPassword',
		type: 'password',
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
		type: 'password',
		className: 'profile__input',
		errorProfile: new Error({
			className: 'profile__field'
		}).element.innerHTML
	}
];

export const props: ProfileProps = {
	header: '',
	avatar: './images/profile_blob.png',
	avatarInfo: {
		name: 'Аватар',
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
		link: 'profile',
		text: 'Назад',
		src: './images/Back.png'
	},
	eventListeners: [
		{
			event: 'event-listener:validate-form',
			callback: () => {
				const fields = ['oldPassword', 'password', 'password-repeat'];
				const validator = new FormValidator('.js-form', fields);
				validator.initialize();
			}
		},
		{
			event: 'event-listener:change-password',
			callback: () => {
				addEventForChild(
					document.body,
					'submit',
					'.js-form',
					submitForm
				)
			}
		},
	]
};

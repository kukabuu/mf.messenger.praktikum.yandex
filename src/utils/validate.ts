import { addEventForChild } from './addEvent.js';

const patterns = {
	email: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	phone: /^\+7\(9[0-9]{2}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/
}

const errorMessages = {
	emptyField: 'Поле не может быть пустым',
	notTheSamePasswords: 'Пароли не совпадают',
	emptyFile: 'Нужно выбрать файл',
	invalidEmail: 'Введите корректную почту',
	invalidPhone: 'Введите корректный номер телефона'
}

export function isValidForm() {
	const visibleErrors = Array.from(document.querySelectorAll('.js-error'))
		.filter(item => !item.classList.contains('i-display-none'));
	return !visibleErrors.length;
}

export class FormValidator {
	formSelector: string;
	fields: string[];
	$form: Element | null;

	constructor(formSelector: string, fields: string[]) {
		this.formSelector = formSelector;
		this.fields = fields;
		this.$form = document.querySelector(formSelector);
	}

	initialize() {
		this.validateOnInput();
		this.validateOnBlur();
		this.validateOnSubmit();
	}

	validateOnSubmit() {
		if (this.$form === null) {
			return;
		}
		addEventForChild(
			document.body,
			'submit',
			this.formSelector,
			submitHandle.bind(this)
		)

		function submitHandle(_$form: HTMLFormElement, event: Event) {
			if (!this.checkFormValidity()) {
				event.preventDefault();
			}
		}
	}

	checkFormValidity() {
		this.fields.forEach((field) => {
			const $input: HTMLInputElement | null = document.querySelector(`#${field}`);
			this.checkValidity($input);
		})
		return isValidForm();
	}

	validateOnBlur() {
		if (this.$form === null) {
			return;
		}

		addEventForChild(
			document.body,
			'blur',
			this.formSelector,
			this.callback(),
			true
		)
	}

	validateOnInput() {
		if (this.$form === null) {
			return;
		}
		addEventForChild(
			document.body,
			'input',
			this.formSelector,
			this.callback(),
			true
		)
	}

	callback() {
		const checkValidity = this.checkValidity.bind(this);
		const fields = this.fields;
		return (_element: HTMLElement, event: Event) => {
			const target = event.target as HTMLInputElement;
			const $input = fields.includes(target.id) ? target : null;
			if ($input === null) {
				return;
			}
			checkValidity($input);
		}
	}

	checkValidity($input: HTMLInputElement | null) {
		if ($input === null) {
			return;
		}
		if ($input.value.trim().length === 0) {
			this.setStatus($input, errorMessages.emptyField, 'error');
		} else  {
			this.setStatus($input, null, 'success');
		}

		if ($input.type === 'email') {
			if (!patterns.email.test($input.value)) {
				this.setStatus($input, errorMessages.invalidEmail, 'error');
			} else {
				this.setStatus($input, null, 'success');
			}
		}

		if ($input.type === 'tel') {
			if (!patterns.phone.test($input.value)) {
				this.setStatus($input, errorMessages.invalidPhone, 'error');
			} else {
				this.setStatus($input, null, 'success');
			}
		}

		if ($input.id === 'password-repeat') {
			const $passwordInput: HTMLInputElement | null | undefined = this.$form?.querySelector('#password');
			if ($passwordInput === null || typeof $passwordInput === 'undefined') {
				return;
			}
			if ($input.value.trim().length === 0) {
				this.setStatus($input, errorMessages.emptyField, 'error');
			} else if ($input.value !== $passwordInput.value) {
				this.setStatus($input, errorMessages.notTheSamePasswords, 'error');
			} else {
				this.setStatus($input, null, 'success');
			}
		}

		if ($input.type === 'file') {
			if ($input.files?.length === 0) {
				this.setStatus($input, errorMessages.emptyFile, 'error');
			} else {
				this.setStatus($input, null, 'success');
			}
		}
	}

	setStatus($field: HTMLInputElement | null, message: string | null, status: string) {
		if ($field === null
			|| $field.parentElement === null
			|| $field.parentElement.parentElement === null) {
			return;
		}

		const errorField = $field.parentElement.querySelector('.js-error')
			|| $field.parentElement.parentElement.querySelector('.js-error');

		if (errorField === null) {
			return;
		}

		if (status === 'error') {
			errorField.textContent = message;
			errorField.classList.remove('i-display-none');
		}

		if (status === 'success') {
			errorField.textContent = '';
			errorField.classList.add('i-display-none');
		}
	}
}

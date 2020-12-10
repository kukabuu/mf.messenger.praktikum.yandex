import Button from '../../components/Button/index.js';
import Error from '../../components/Error/index.js';
import concatInputs from '../../components/Input/concatInputs.js';
import { FormValidator } from '../../utils/validate.js';
import { collectFormData } from '../../utils/collectFormData.js';
const inputs = [
    {
        name: 'email',
        id: 'email',
        type: 'email',
        className: 'js-validate__email',
        placeholder: 'Почта',
        label: {
            className: 'i-visually-hidden',
            text: 'Почта',
        },
        floatedLabel: {
            className: '',
            text: 'Почта'
        },
        value: '',
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'login',
        id: 'login',
        className: 'js-validate__login',
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
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'first_name',
        id: 'first_name',
        className: 'js-validate__first-name',
        placeholder: 'Имя',
        label: {
            className: 'i-visually-hidden',
            text: 'Имя',
        },
        floatedLabel: {
            className: '',
            text: 'Имя'
        },
        value: '',
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'second_name',
        id: 'second_name',
        className: 'js-validate__second-name',
        placeholder: 'Фамилия',
        label: {
            className: 'i-visually-hidden',
            text: 'Фамилия',
        },
        floatedLabel: {
            className: '',
            text: 'Фамилия'
        },
        value: '',
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'phone',
        id: 'phone',
        type: 'tel',
        placeholder: '+7(999)999-99-99',
        className: 'js-validate__phone',
        label: {
            className: 'i-visually-hidden',
            text: 'Телефон',
        },
        floatedLabel: {
            className: '',
            text: 'Телефон'
        },
        value: '',
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'password',
        id: 'password',
        type: 'password',
        className: 'js-validate__password',
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
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'password-repeat',
        id: 'password-repeat',
        type: 'password',
        className: 'js-validate__password--repeat',
        placeholder: 'Пароль (еще раз)',
        label: {
            className: 'i-visually-hidden',
            text: 'Пароль (еще раз)',
        },
        floatedLabel: {
            className: '',
            text: 'Пароль (еще раз)'
        },
        value: '',
        errorEntry: new Error({}).element.innerHTML
    },
];
export const registrationProps = {
    className: 'register',
    header: 'Регистрация',
    inputs: concatInputs(inputs),
    back: {
        link: 'authorization.html',
        text: 'Войти'
    },
    button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        className: 'button register__button'
    }).element.innerHTML,
    eventListeners: [
        {
            event: 'event-listener:validate-form-register',
            callback: () => {
                const $form = document.querySelector('.js-form');
                const fields = ['email', 'login', 'first_name', 'second_name', 'phone', 'password', 'password-repeat'];
                const validator = new FormValidator($form, fields);
                validator.initialize();
            }
        },
        {
            event: 'event-listener:collect-form-data-register',
            callback: () => {
                collectFormData();
            }
        }
    ]
};
//# sourceMappingURL=mock.js.map
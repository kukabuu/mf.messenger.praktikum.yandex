import Button from '../../components/Button/index.js';
import Error from '../../components/Error/index.js';
import concatInputs from '../../components/Input/concatInputs.js';
import { FormValidator } from '../../utils/validate.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { addEventForChild } from '../../utils/addEvent.js';
function sendForm($form, event) {
    event.preventDefault();
    globalEventBus.emit('event-listener:send-signin-form-clicked', $form);
}
const inputs = [
    {
        name: 'login',
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
        errorEntry: new Error({}).element.innerHTML
    },
    {
        name: 'password',
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
        errorEntry: new Error({}).element.innerHTML
    }
];
export const props = {
    className: 'login',
    header: 'Вход',
    inputs: concatInputs(inputs),
    back: {
        link: 'signup',
        text: 'Нет аккаунта?'
    },
    button: new Button({
        type: 'submit',
        text: 'Авторизоваться',
        className: 'button login__button'
    }).element.innerHTML,
    eventListeners: [
        {
            event: 'event-listener:validate-form',
            callback: () => {
                const fields = ['login', 'password'];
                const validator = new FormValidator('.js-form', fields);
                validator.initialize();
            }
        },
        {
            event: 'event-listener:send-signin-form',
            callback: () => {
                addEventForChild(document.body, 'submit', '.js-form', sendForm);
            }
        }
    ]
};
//# sourceMappingURL=props.js.map
import Button from '../../components/Button/index';
import Error from '../../components/Error/index';

import concatInputs from '../../components/Input/concatInputs';
import { InputProps } from '../../components/Input/index';

import { FormValidator } from '../../utils/validate';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { addEventForChild } from '../../utils/addEvent';

function sendForm($form: HTMLFormElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:send-signin-form-clicked', $form);
}

const inputs: InputProps[] = [
  {
    name: 'login',
    id: 'login',
    placeholder: 'Логин',
    label: {
      className: 'i-visually-hidden',
      text: 'Логин'
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
      text: 'Пароль'
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
      callback: (): void => {
        const fields = ['login', 'password'];
        const validator = new FormValidator('.js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:send-signin-form',
      callback: (): void => {
        addEventForChild(
          document.body,
          'submit',
          '.js-form',
          sendForm
        );
      }
    }
  ]
};

import Button from '../../components/Button/index';
import Error from '../../components/Error/index';

import concatInputs from '../../components/Input/concatInputs';
import { InputProps } from '../../components/Input/index';

import { FormValidator } from '../../utils/validate';
import { METHODS, ProfileProps } from '../../components/Profile/index';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { addEventForChild } from '../../utils/addEvent';
import profileBlob from '../../assets/images/profile_blob.png';
import backButton from '../../assets/images/back.png';

function submitForm($form: HTMLFormElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:change-password-clicked', $form);
}

const inputs: InputProps[] = [
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
  avatar: profileBlob,
  avatarInfo: {
    name: 'Аватар'
  },
  form: {
    className: 'js-form',
    method: METHODS.POST
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
    src: backButton
  },
  eventListeners: [
    {
      event: 'event-listener:validate-form',
      callback: (): void => {
        const fields = ['oldPassword', 'password', 'password-repeat'];
        const validator = new FormValidator('.js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:change-password',
      callback: (): void => {
        addEventForChild(
          document.body,
          'submit',
          '.js-form',
          submitForm
        );
      }
    }
  ]
};

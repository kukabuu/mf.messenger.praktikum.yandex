import Button from '../../components/Button/index';
import Error from '../../components/Error/index';
import Popup from '../../components/Popup/index';
import Input, { InputProps } from '../../components/Input/index';

import concatInputs from '../../components/Input/concatInputs';
import { FormValidator } from '../../utils/validate';
import { METHODS, ProfileProps } from '../../components/Profile/index';
import { displayFileName } from '../../utils/displayFileName';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { addEventForChild } from '../../utils/addEvent';
import { togglePopup } from '../../utils/togglePopup';
import { closePopup } from '../../utils/closePopup';
import profileBlob from '../../assets/images/profile_blob.png';
import backButton from '../../assets/images/back.png';

function submitForm($form: HTMLFormElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:change-profile-clicked', $form);
}

function changeAvatar($form: HTMLFormElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:send-avatar-clicked', $form);
}

export const inputs: InputProps[] = [
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
  }
];
const popupInputProps: InputProps = {
  id: 'avatar',
  type: 'file',
  name: 'avatar',
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
  errorEntry: new Error({
    className: 'popup--error'
  }).element.innerHTML,
  floatedLabel: {
    className: 'i-display-none'
  }
};

export const popupProps = {
  header: 'Загрузите файл',
  input: new Input(popupInputProps).element.innerHTML,
  button: new Button({
    text: 'Поменять',
    type: 'submit',
    className: 'button popup__button'
  }).element.innerHTML,
  eventListeners: [
    {
      event: 'event-listener:validate-form',
      callback: (): void => {
        const fields = ['avatar'];
        const validator = new FormValidator('#popup-update-avatar .js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:send-avatar',
      callback: (): void => {
        addEventForChild(
          document.body,
          'submit',
          '#popup-update-avatar .js-form',
          changeAvatar
        );
      }
    },
    {
      event: 'event-listener:display-file-name',
      callback: (): void => {
        addEventForChild(
          document.body,
          'change',
          '.js-file-upload',
          displayFileName
        );
      }
    }
  ]
};

export const props: ProfileProps = {
  avatar: profileBlob,
  avatarInfo: {
    name: 'Аватар',
    link: '#popup-update-avatar',
    linkText: 'Поменять аватар',
    classToChange: 'profile__avatar--change js-add-file'
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
  popup: new Popup(popupProps).element.innerHTML,
  eventListeners: [
    {
      event: 'event-listener:validate-form',
      callback: (): void => {
        const fields = ['email', 'login', 'first_name', 'second_name', 'phone', 'display_name'];
        const validator = new FormValidator('.js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:change-profile',
      callback: (): void => {
        addEventForChild(
          document.body,
          'submit',
          '.js-form',
          submitForm
        );
      }
    },
    {
      event: 'event-listener:toggle-popup',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-popup-close',
          closePopup);
      }
    },
    {
      event: 'event-listener:toggle-popup',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-add-file',
          togglePopup);
      }
    }
  ]
};

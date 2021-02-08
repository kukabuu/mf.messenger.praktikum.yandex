import Error from '../../components/Error/index';
import Input, { InputProps } from '../../components/Input/index';
import Button from '../../components/Button/index';
import Popup from '../../components/Popup/index';
import Image from '../../components/Image/index';
import concatMessage from '../../components/DialogMessage/concatMessage';

import { globalEventBus } from '../../core/GlobalEventBus/index';

import { FormValidator } from '../../utils/validate';
import { displayFileName } from '../../utils/displayFileName';
import { addEventForChild } from '../../utils/addEvent';
import { togglePopup } from '../../utils/togglePopup';
import { closePopup } from '../../utils/closePopup';

function toggleTooltip(element: HTMLElement) {
  const $tooltip = element
    ?.parentElement
    ?.querySelector('.js-tooltip');

  if (!$tooltip) {
    return;
  }
  if ($tooltip.classList.contains('i-display-none')) {
    $tooltip.classList.remove('i-display-none');
  } else {
    $tooltip.classList.add('i-display-none');
  }
}

function listenToDeleteChatProps(element: HTMLElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:delete-chat-clicked', element);
}

function listenToDeleteUser(element: HTMLElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:delete-user-clicked', element);
}

function listenerAddUser(element: HTMLElement, event: Event) {
  event.preventDefault();
  globalEventBus.emit('event-listener:add-user-clicked', element);
}

const inputFileProps: InputProps = {
  id: 'file',
  type: 'file',
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
const inputAddUserProps: InputProps = {
  id: 'login-add',
  name: 'login',
  placeholder: 'Логин',
  label: {
    className: 'i-visually-hidden',
    text: 'Логин'
  },
  floatedLabel: {
    text: 'Логин'
  },
  errorEntry: new Error({}).element.innerHTML
};
const inputRemoveUserProps: InputProps = {
  id: 'login-remove',
  name: 'login',
  placeholder: 'Логин',
  label: {
    className: 'i-visually-hidden',
    text: 'Логин'
  },
  floatedLabel: {
    text: 'Логин'
  },
  errorEntry: new Error({}).element.innerHTML
};
const inputAddChatProps: InputProps = {
  id: 'chat-add',
  placeholder: 'Название чата',
  name: 'title',
  label: {
    className: 'i-visually-hidden',
    text: 'Название чата'
  },
  floatedLabel: {
    text: 'Название чата'
  },
  errorEntry: new Error({}).element.innerHTML
};
export const inputDeleteChatProps: InputProps = {
  id: 'chat-delete',
  value: '1234',
  name: 'chatId',
  isHidden: true,
  className: 'i-display-none',
  label: {
    className: 'i-visually-hidden',
    text: 'Удалить чат?'
  }
};

const popupFileProps = {
  header: 'Загрузите файл',
  input: new Input(inputFileProps).element.innerHTML,
  button: new Button({
    text: 'Прикрепить',
    className: 'button popup__button',
    type: 'submit'
  }).element.innerHTML,
  eventListeners: [
    {
      event: 'event-listener:validate-form',
      callback: () => {
        const fields = ['file'];
        const validator = new FormValidator('#popup-upload-file .js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:display-file-name',
      callback: () => {
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
const popupAddUserProps = {
  header: 'Добавить пользователя',
  input: new Input(inputAddUserProps).element.innerHTML,
  button: new Button({
    text: 'Добавить',
    className: 'button chat__button--toggle-user',
    type: 'submit'
  }).element.innerHTML,
  eventListeners: [
    {
      event: 'event-listener:validate-form',
      callback: () => {
        const fields = ['login-add'];
        const validator = new FormValidator('#popup-add-user .js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:add-user',
      callback: () => {
        addEventForChild(
          document.body,
          'submit',
          '#popup-add-user .js-form',
          listenerAddUser
        );
      }
    }
  ]
};
const popupRemoveUserProps = {
  header: 'Удалить пользователя?',
  input: new Input(inputRemoveUserProps).element.innerHTML,
  button: new Button({
    text: 'Удалить',
    className: 'button chat__button--toggle-user',
    type: 'submit'
  }).element.innerHTML,
  eventListeners: [
    {
      event: 'event-listener:validate-form',
      callback: () => {
        const fields = ['login-remove'];
        const validator = new FormValidator('#popup-remove-user .js-form', fields);
        validator.initialize();
      }
    },
    {
      event: 'event-listener:delete-user',
      callback: () => {
        addEventForChild(
          document.body,
          'submit',
          '#popup-remove-user .js-form',
          listenToDeleteUser
        );
      }
    }
  ]
};
const popupAddChatProps = {
  header: 'Добавить чат',
  input: new Input(inputAddChatProps).element.innerHTML,
  button: new Button({
    text: 'Добавить',
    className: 'button chat__button--toggle-user js-create-new-chat',
    type: 'submit'
  }).element.innerHTML,
  eventListeners: [{
    event: 'event-listener:validate-form',
    callback: () => {
      const fields = ['chat-add'];
      const validator = new FormValidator('#popup-add-chat .js-form', fields);
      validator.initialize();
    }
  }]
};
export const popupDeleteChatProps = {
  header: 'Удалить чат?',
  input: new Input(inputDeleteChatProps).element.innerHTML,
  button: new Button({
    text: 'Удалить',
    className: 'button chat__button--delete',
    type: 'submit'
  }).element.innerHTML,
  cancelButton: new Button({
    text: 'Не удалять',
    type: 'reset',
    className: 'button chat__button--cancel'
  }).element.innerHTML,
  eventListeners: [
    {
      event: 'event-listener:delete-chat',
      callback: (): void => {
        addEventForChild(
          document.body,
          'submit',
          '#popup-chat-delete .js-form',
          listenToDeleteChatProps);
      }
    }
  ]
};

export const dialogProps = [
  {
    from: true,
    position: {
      className: 'message--left'
    },
    person: {
      src: 'images/user_blob.png',
      name: 'Андрей'
    },
    message: {
      className: 'message--from',
      content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Accusamus animi architecto at cum eos esse et, hic impedit,
									laboriosam neque odit placeat quasi quidem rem sed similique
									suscipit tempore, voluptas? Accusamus blanditiis
									excepturi fuga fugit, illo ipsum nesciunt odit omnis pariatur
									quisquam, reiciendis, rerum sapiente unde vitae voluptatibus?
									Alias beatae commodi distinctio est maxime mollitia nemo repellat
									repudiandae sequi voluptatibus. Distinctio itaque
									perferendis perspiciatis quis quo suscipit tempore voluptate?
									Commodi deserunt dicta et ex impedit iusto magnam maxime repellat.
									Alias dignissimos ducimus ea esse maxime necessitatibus neque numquam,
									ut voluptas.`
    },
    time: {
      full: '2020-11-01 20:00',
      less: '20:00'
    },
    date: {
      className: '',
      value: '1 ноября'
    }
  },
  {
    from: true,
    position: {
      className: 'message--left'
    },
    person: {
      src: 'images/user_blob.png',
      name: 'Андрей'
    },
    isAttachment: true,
    attachment: {
      src: 'images/cat.jpg',
      name: 'Кот',
      className: 'message--from attachment'
    },
    time: {
      full: '2020-11-01 20:00',
      less: '20:00'
    }
  },
  {
    position: {
      className: 'message--right'
    },
    message: {
      className: 'message--yours',
      content: 'Круто!'
    },
    time: {
      full: '2020-11-01 21:00',
      less: '21:00'
    }
  }
];
export const chatListProps = {
  id: 0,
  avatar: {
    name: '',
    src: ''
  },
  name: '',
  preview: '',
  time: {
    full: '',
    less: ''
  }
};
export const chatProps = {
  profile: {
    link: 'profile',
    name: 'Профиль'
  },
  search: {
    name: 'Поиск',
    id: 'search',
    method: ''
  },
  header: {
    person: {
      name: 'Андрей',
      src: 'images/user_blob.png'
    },
    tooltip: {
      options: [
        {
          text: 'Добавить пользователя',
          href: '#popup-add-user',
          className: 'option option--add-user js-user-add'
        },
        {
          text: 'Удалить пользователя',
          href: '#popup-remove-user',
          className: 'option option--remove-user js-user-delete'
        },
        {
          text: 'Удалить чат',
          href: '#popup-chat-delete',
          className: 'option option--delete-chat js-chat-delete'
        }
      ]
    }
  },
  buttonChatCreate: new Button({
    className: 'button--round chat__create js-chat-create',
    data: {
      name: 'popup',
      value: '#popup-add-chat'
    }
  }).getContent().innerHTML,
  footer: {
    attachments: {
      buttonAddAttachments: new Button({
        className: 'dialog__button dialog__attachments js-tooltip__button',
        content: new Image({
          name: 'Добавить',
          src: './images/attach.png',
          size: 32
        }).getContent().innerHTML
      }).getContent().innerHTML,
      options: [
        {
          text: 'Фото или Видео',
          href: '#popup-upload-file',
          className: 'option option--add-foto js-add-file'
        },
        {
          text: 'Файл',
          href: '#popup-upload-file',
          className: 'option option--add-file js-add-file'
        }
      ]
    },
    sendMessage: {
      name: 'message',
      placeholder: 'Сообщение',
      isRequired: true,
      buttonSendMessage: new Button({
        className: 'dialog__button',
        type: 'submit',
        content: new Image({
          name: 'Отправить',
          src: './images/back.png',
          className: 'button--send',
          size: 28
        }).getContent().innerHTML
      }).getContent().innerHTML
    }
  },
  dialog: concatMessage(dialogProps),
  eventListeners: [
    {
      event: 'event-listener:create-chat',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-create-new-chat',
          ($element: HTMLElement, event: Event) => {
            event.preventDefault();
            const $form = $element.closest('.js-form');
            globalEventBus.emit('event-listener:create-chat-clicked', $form);
          });
      }
    },
    {
      event: 'event-listener:toggle-tooltip',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-tooltip__button',
          toggleTooltip);
      }
    },
    {
      event: 'event-listener:toggle-popup',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-chat-create',
          togglePopup);
      }
    },
    {
      event: 'event-listener:toggle-popup',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-chat-delete',
          togglePopup);
      }
    },
    {
      event: 'event-listener:toggle-popup',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-user-add',
          togglePopup);
      }
    },
    {
      event: 'event-listener:toggle-popup',
      callback: (): void => {
        addEventForChild(
          document.body,
          'click',
          '.js-user-delete',
          togglePopup);
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
    }
  ],
  popupUploadFile: new Popup(popupFileProps).element.innerHTML,
  popupRemoveUser: new Popup(popupRemoveUserProps).element.innerHTML,
  popupAddUser: new Popup(popupAddUserProps).element.innerHTML,
  popupAddChat: new Popup(popupAddChatProps).element.innerHTML,
  popupChatDelete: '',
  notification: ''
};

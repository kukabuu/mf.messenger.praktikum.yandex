import Block from '../../core/Block/index';
import { template } from './template';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import compile from '../../utils/compile';

type EventListener = {
  event: string;
  callback: () => void;
}

type ChatProps = {
  profile: {
    link: string;
    name: string;
  };
  search: {
    name: string;
    id: string;
    method: string;
  };
  chatListItems: string;
  buttonChatCreate: string;
  header: {
    person: {
      src: string;
      name: string;
    };
    tooltip: {
      options: {
        className: string;
        href: string;
        text: string;
      }[];
    };
  };
  dialog?: string;
  footer: {
    attachments: {
      buttonAddAttachments: string;
      options: {
        className: string;
        href: string;
        text: string;
      }[];
    };
    sendMessage: {
      name: string;
      placeholder: string;
      isRequired: boolean;
      buttonSendMessage: string;
    };
  };
  popupRemoveUser?: string;
  popupAddUser?: string;
  popupChatDelete?: string;
  popupUploadFile?: string;
  notification: string;
  eventListeners?: EventListener[];
};

export default class Chat extends Block<ChatProps> {
  constructor({
    popupRemoveUser = '',
    popupAddUser = '',
    popupChatDelete = '',
    popupUploadFile = '',
    dialog = '',
    chatListItems = '',
    eventListeners = [],
    ...props
  }: ChatProps) {
    super({
      popupRemoveUser,
      popupAddUser,
      popupChatDelete,
      popupUploadFile,
      dialog,
      chatListItems,
      eventListeners,
      ...props
    });

    eventListeners.forEach((listener) => {
      globalEventBus.on(listener['event'], listener['callback']);
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}

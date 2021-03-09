import ComponentController from '../../core/ComponentController/index';
import Chat from '../../components/Chat/index';
import Popup from '../../components/Popup/index';
import Input from '../../components/Input/index';
import * as props from './props';
import { chatListProps, dialogProps, inputDeleteChatProps, popupDeleteChatProps } from './props';
import { ListItemProps } from '../../components/ChatListItem/index';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { globalStore } from '../../store/index';
import SearchAPI from '../../api/searchAPI';
import UserChatAPI from '../../api/userChatAPI';
import ChatAPI from '../../api/chatAPI';
import concatItems from '../../components/ChatListItem/concatItems';
import { isValidForm } from '../../utils/validate';
import { notify } from '../../utils/notify';
import { collectFormData } from '../../utils/collectFormData';
import { getAvatarLink } from '../../utils/getAvatarLink';
import WebSocketService from '../../core/WebSocketService/index';
import { getUserInfo } from '../../utils/getUserInfo';
import concatMessage from '../../components/DialogMessage/concatMessage';
import { MessageProps } from '../../components/DialogMessage/index';
import { cloneDeep } from '../../utils/cloneDeep';

type UserProp = {
  'id': number;
  'first_name'?: string;
  'second_name'?: string;
  'display_name'?: string;
  'login'?: string;
  'email'?: string;
  'phone'?: string;
  'avatar': string;
  'title'?: string;
}

type chatProp = {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
}

type messageDataProp = {
  id: number;
  list: [];
}

export default class ChatController extends ComponentController {
  static EVENTS = {
    EVENT_DISPLAY_NAME: 'event-listener:display-file-name',
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_CREATE_CHAT: 'event-listener:create-chat',
    EVENT_DELETE_CHAT: 'event-listener:delete-chat',
    EVENT_SELECT_CHAT: 'event-listener:select-chat',
    EVENT_ADD_USER: 'event-listener:add-user',
    EVENT_DELETE_USER: 'event-listener:delete-user',
    EVENT_TOGGLE_TOOLTIP: 'event-listener:toggle-tooltip',
    EVENT_TOGGLE_POPUP: 'event-listener:toggle-popup',
    EVENT_SEND_MESSAGE: 'event-listener:send-message',

    STATE_CHANGE: 'state:change',
    STATE_CHANGE_MESSAGES: 'state:change-messages',

    EVENT_CREATE_CHAT_CLICKED: 'event-listener:create-chat-clicked',
    EVENT_DELETE_CHAT_CLICKED: 'event-listener:delete-chat-clicked',
    EVENT_SELECT_CHAT_CLICKED: 'event-listener:select-chat-clicked',
    EVENT_ADD_USER_CLICKED: 'event-listener:add-user-clicked',
    EVENT_DELETE_USER_CLICKED: 'event-listener:delete-user-clicked',
    EVENT_SEND_MESSAGE_CLICKED: 'event-listener:send-message-clicked'
  };

  private static __instance: ChatController;
  private isSearching: boolean;
  private isDeletingChat: boolean;
  private isDeletingUser: boolean;
  private isCreatingChat: boolean;
  private isAddingUser: boolean;
  private searchParams: Record<string, unknown>;
  sockets: { [key: number] : WebSocketService };

  constructor() {
    super(Chat, props.chatProps);
    if (ChatController.__instance) {
      return ChatController.__instance;
    }
    ChatController.__instance = this;
    this.isSearching = false;
    this.isCreatingChat = false;
    this.isDeletingChat = false;
    this.isAddingUser = false;
    this.isDeletingUser = false;
    this.searchParams = {};
    this.sockets = {};
  }

  emitListeners(): void {
    globalEventBus.emit(ChatController.EVENTS.EVENT_DISPLAY_NAME);
    globalEventBus.emit(ChatController.EVENTS.EVENT_VALIDATE);
    globalEventBus.emit(ChatController.EVENTS.EVENT_CREATE_CHAT);
    globalEventBus.emit(ChatController.EVENTS.EVENT_ADD_USER);
    globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_USER);
    globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_TOOLTIP);
    globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_POPUP);
    globalEventBus.emit(ChatController.EVENTS.EVENT_SEND_MESSAGE);
  }

  addListeners(): void {
    globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_CHAT_CLICKED,
      ($form: HTMLFormElement) => {
        return this.deleteChat($form);
      });
    globalEventBus.on(ChatController.EVENTS.EVENT_CREATE_CHAT_CLICKED,
      ($form: HTMLFormElement) => {
        return this.createChat($form);
      });
    globalEventBus.on(ChatController.EVENTS.EVENT_SELECT_CHAT_CLICKED,
      (chatId: string) => {
        return this.selectChat.call(this, parseInt(chatId, 10));
      });
    globalEventBus.on(ChatController.EVENTS.EVENT_ADD_USER_CLICKED,
      ($form: HTMLFormElement) => {
        return this.addUser($form);
      });
    globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_USER_CLICKED,
      ($form: HTMLFormElement) => {
        return this.deleteUser($form);
      });
    globalEventBus.on(ChatController.EVENTS.EVENT_SEND_MESSAGE_CLICKED,
      ($form: HTMLFormElement) => {
      if (globalStore.state.activeChat) {
        return this.sendMessage($form);
      }
    });
  }

  async updateProps(): Promise<void> {
    globalEventBus.on(ChatController.EVENTS.STATE_CHANGE, () => {
      return;
    });
    globalEventBus.on(ChatController.EVENTS.STATE_CHANGE_MESSAGES, () => {
      if (globalStore.state.activeChat) {
        const chatId = globalStore.state.activeChat;
        this.updateDialog.call(this, chatId);
      }
    });

    await this.getChats();
    await this.getUsers();
  }

  async searchUsers($form: HTMLFormElement): Promise<UserProp[] | undefined> {
    if (this.isSearching) {
      return;
    }
    this.isSearching = true;
    const formFields = collectFormData($form);
    this.searchParams = {...formFields};
    return await SearchAPI.request({data: formFields})
      .then((response) => {
        notify({
          response,
          block: this.block
        });
        return JSON.parse(response.response);
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isSearching = false;
      });
  }

  updateChatList(newProps: UserProp[]): void {
    const newListItemProps: ListItemProps[] = [];
    const defaultProp = {...chatListProps};
    if (newProps.length === 0) {
      this.block?.setProps({
        chatListItems: newListItemProps
      });
    }
    newProps.forEach((prop: UserProp) => {
      const avatarLink = getAvatarLink(prop);

      defaultProp.id = prop['id'] || 0;
      defaultProp.avatar.src = avatarLink;
      defaultProp.avatar.name = prop['display_name'] || prop['first_name'] || prop['title'] || '';
      defaultProp.name = prop['display_name'] || prop['title'] || '';
      newListItemProps.push({...defaultProp});
    });
    this.block?.setProps({
      chatListItems: concatItems(newListItemProps)
    });
  }

  createChat($form: HTMLFormElement): void {
    const SUCCESS_MESSAGE = 'Ура! Чат добавлен.';
    if (!isValidForm() || this.isCreatingChat) {
      return;
    }
    this.isCreatingChat = true;
    const formFields = collectFormData($form);
    ChatAPI.create({data: formFields})
      .then((response) => {
        this.getChats();
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isCreatingChat = false;
      });
  }

  async getChats(): Promise<void> {
    await ChatAPI.update()
      .then(async (response) => {
        const newProps = JSON.parse(response.response);
        if (!newProps.length) {
          return;
        }
        // open websocket connections to every chats
        this.updateChatList(newProps);
        await this.connectWebSocket(newProps);

        globalEventBus.emit(ChatController.EVENTS.EVENT_SELECT_CHAT);
        globalStore.dispatch('setChats', newProps);

      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      });
  }

  async connectWebSocket(chatProps: chatProp[]): Promise<void> {
    if (chatProps.length === 0) {
      return;
    }

    const user = await getUserInfo();

    if (!user) {
      return;
    }

    globalStore.dispatch('setUser', user);

    for (const chat of chatProps) {
      const token = await ChatAPI.getToken(chat.id)
        .then(({ response }) => {
          return JSON.parse(response).token;
        });

      this.sockets[chat.id] = new WebSocketService(
        user.id as number,
        chat.id,
        token
      );

      this.sockets[chat.id].connect();
    }
  }

  openChat(chat: chatProp): void {
    if (typeof chat.id === 'undefined') {
      return;
    }
    globalStore.dispatch('setActiveChat', chat.id);

    const newInputDeleteChatProps = {...inputDeleteChatProps};
    newInputDeleteChatProps.value = chat.id.toString();
    const newPopupDeleteChatProps = {...popupDeleteChatProps};
    newPopupDeleteChatProps.input = new Input(newInputDeleteChatProps).getContent().innerHTML;
    const newPopupChatDeleteProps = new Popup(newPopupDeleteChatProps).getContent().innerHTML;

    this.block?.setProps({
      popupChatDelete: newPopupChatDeleteProps,
      header: {
        person: {
          name: chat.title
        }
      }
    });
    globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_CHAT);
  }

  deleteChat($form: HTMLFormElement): void {
    if (this.isDeletingChat) {
      return;
    }
    this.isDeletingChat = true;

    const SUCCESS_MESSAGE = 'Ура! Чат удален.';

    const formFields = collectFormData($form);
    ChatAPI.delete({data: formFields})
      .then((response) => {
        this.getChats();
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isDeletingChat = false;
      });
  }

  async addUser($form: HTMLFormElement): Promise<void> {
    if (this.isAddingUser) {
      return;
    }
    this.isAddingUser = true;
    const ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
    const SUCCESS_MESSAGE = 'Пользователь успешно добавлен в чат';
    const users = await this.searchUsers($form);
    if (!users || !users.length) {
      this.isAddingUser = false;
      notify({
        response: {} as XMLHttpRequest,
        block: this.block,
        errorMessage: ERROR_MESSAGE
      });
      return;
    }
    const chatId = globalStore.state.activeChat;
    const user = users.filter((user) => user.login === this.searchParams.login);
    const userData = {
      users: [user[0].id],
      chatId
    };
    UserChatAPI.update({data: userData})
      .then((response) => {
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
        this.getUsers();
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isAddingUser = false;
      });
  }

  async getUsers(): Promise<void> {
    if (!globalStore.state.activeChat) {
      return;
    }

    const chatId = globalStore.state.activeChat as number;

    if (!chatId) {
      return;
    }

    const users = await UserChatAPI.request({id: chatId})
      .then((response) => {
        return JSON.parse(response.response);
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      });
    if (users && users.length) {
      globalStore.dispatch('getUsers', users);
    }
  }

  deleteUser($form: HTMLFormElement): void {
    if (this.isDeletingUser) {
      return;
    }
    this.isDeletingUser = true;
    const ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
    const SUCCESS_MESSAGE = `Пользователь успешно удален из чата`;
    const formFields = collectFormData($form);
    const {users} = globalStore.state;
    if (!users || !(users as UserProp[]).length) {
      this.isDeletingUser = false;
      notify({
        response: {} as XMLHttpRequest,
        block: this.block,
        errorMessage: ERROR_MESSAGE
      });
      return;
    }
    const user = (users as UserProp[]).filter((user: UserProp) => {
      return user.login === formFields?.login;
    });
    if (!user.length) {
      this.isDeletingUser = false;
      notify({
        response: {} as XMLHttpRequest,
        block: this.block,
        errorMessage: ERROR_MESSAGE
      });
      return;
    }
    const [{id}] = user;
    const chatId = globalStore.state.lastOpenedChat;
    UserChatAPI.delete({
      data: {
        users: [id],
        chatId
      }
    })
      .then((response) => {
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
        this.getUsers();
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isDeletingUser = false;
      });
  }

  selectChat(id: number): void {
    const chat: chatProp | undefined = (globalStore.state.chats as []).find((chat: chatProp) => chat.id === id);
    if (typeof chat !== 'undefined') {
      this.openChat(chat);
      this.updateDialog((chat as chatProp).id);
    }
  }

  sendMessage($form: HTMLFormElement): void {
    const text = $form.querySelector('input')?.value.trim();
    if (typeof text === 'undefined' || text.length === 0) {
      return;
    }
    const chatId = globalStore.state.activeChat as number;
    this.sockets[chatId].send(text);
  }

  updateDialog(id: number): void {
    const messages = (globalStore.state.messages as messageDataProp[]).filter((message) => message.id === id);

    const isEmpty = typeof messages === 'undefined'
      || messages.length === 0;

    if (isEmpty) {
      return;
    }

    const newDialogProps: MessageProps[] = [];
    let list: Record<string, unknown>[] = [];

    messages.forEach((item) => {
      list = [...item.list, ...list];
    });

    list.forEach((message: Record<string, unknown>) => {
      const prop = {...dialogProps};
      const userId = message['user_id'] || message.userId;
      const isCurrentUser = (globalStore.state.user as Record<string, unknown>).id === userId
        || message['user_id'] === null;

      if ((message.content as string).trim().length === 0) {
        return;
      }

      prop.message.content = (message.content as string).trim();

      if (!isCurrentUser) {
        prop.from = true;
        prop.position.className = 'message--left';
        prop.message.className = 'message--from';
      } else {
        prop.from = false;
        prop.position.className = 'message--right';
        prop.message.className = 'message--yours';
      }
      newDialogProps.push(cloneDeep(prop));
    });

    this.block?.setProps({
      dialog: concatMessage(newDialogProps)
    });
  }
}


// что делать с user_id - пока ничего - проблема на бэке, надо описать
// таймер, чтобы соединение не оборвалось + экспериментально выставлено 1 мин
// cloneDeep отрефакторить +
// проверить функциональность добавления/удаления всего и вся - вроде норм, но надо проверить

import ComponentController from '../../core/ComponentController/index';
import Chat from '../../components/Chat/index';
import * as props from './props';
import { chatListProps, inputDeleteChatProps, popupDeleteChatProps } from './props';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { SearchAPI } from '../../api/searchAPI';
import { ListItemProps } from '../../components/ChatListItem/index';
import concatItems from '../../components/ChatListItem/concatItems';
import { ChatAPI } from '../../api/chatAPI';
import { isValidForm } from '../../utils/validate';
import Input from '../../components/Input/index';
import Popup from '../../components/Popup/index';
import { UserChatAPI } from '../../api/userChatAPI';
import { globalStore } from '../../store/index';
import { notify } from '../../utils/notify';
import { collectFormData } from '../../utils/collectFormData';

type UserProp = {
  'id': number,
  'first_name'?: string,
  'second_name'?: string,
  'display_name'?: string,
  'login'?: string,
  'email'?: string,
  'phone'?: string,
  'avatar': string,
  'title'?: string
}

export default class ChatController extends ComponentController {
  static EVENTS = {
    EVENT_DISPLAY_NAME: 'event-listener:display-file-name',
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_CREATE_CHAT: 'event-listener:create-chat',
    EVENT_DELETE_CHAT: 'event-listener:delete-chat',
    EVENT_ADD_USER: 'event-listener:add-user',
    EVENT_DELETE_USER: 'event-listener:delete-user',
    EVENT_TOGGLE_TOOLTIP: 'event-listener:toggle-tooltip',
    EVENT_TOGGLE_POPUP: 'event-listener:toggle-popup',
    STATE_CHANGE: 'state:change',

    EVENT_CREATE_CHAT_CLICKED: 'event-listener:create-chat-clicked',
    EVENT_DELETE_CHAT_CLICKED: 'event-listener:delete-chat-clicked',
    EVENT_ADD_USER_CLICKED: 'event-listener:add-user-clicked',
    EVENT_DELETE_USER_CLICKED: 'event-listener:delete-user-clicked'
  };

  private static __instance: ChatController;
  private isSearching: boolean;
  private isDeletingChat: boolean;
  private isDeletingUser: boolean;
  private isCreatingChat: boolean;
  private isAddingUser: boolean;

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
  }

  emitListeners(): void {
    globalEventBus.emit(ChatController.EVENTS.EVENT_DISPLAY_NAME);
    globalEventBus.emit(ChatController.EVENTS.EVENT_VALIDATE);
    globalEventBus.emit(ChatController.EVENTS.EVENT_CREATE_CHAT);
    globalEventBus.emit(ChatController.EVENTS.EVENT_ADD_USER);
    globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_USER);
    globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_TOOLTIP);
    globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_POPUP);
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
    globalEventBus.on(ChatController.EVENTS.EVENT_ADD_USER_CLICKED,
      ($form: HTMLFormElement) => {
        return this.addUser($form);
      });
    globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_USER_CLICKED,
      ($form: HTMLFormElement) => {
        return this.deleteUser($form);
      });
  }

  async updateProps(): Promise<void> {
    globalEventBus.on(ChatController.EVENTS.STATE_CHANGE, () => {
      return;
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
    return await new SearchAPI()
      .request({data: formFields})
      .then((response) => {
        this.isSearching = false;
        notify({
          response,
          block: this.block
        });
        return JSON.parse(response.response);
      })
      .catch((response) => {
        this.isSearching = false;
        notify({
          response,
          block: this.block
        });
      });
  }

  updateChatList(newProps: UserProp[]): void {
    const BASE_URL = 'https://ya-praktikum.tech/';
    const BASE_IMG = './images/profile_blob.png';
    const newListItemProps: ListItemProps[] = [];
    const defaultProp = {...chatListProps};
    if (newProps.length === 0) {
      this.block?.setProps({
        chatListItems: newListItemProps
      });
    }
    newProps.forEach((prop: UserProp) => {
      const avatarLink = prop['avatar'] !== null
        ? `${BASE_URL}${prop['avatar']}`
        : BASE_IMG;

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
    new ChatAPI()
      .create({data: formFields})
      .then((response) => {
        this.isCreatingChat = false;
        this.getChats();
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
      })
      .catch((response) => {
        this.isCreatingChat = false;
        notify({
          response,
          block: this.block
        });
      });
  }

  async getChats(): Promise<void> {
    await new ChatAPI()
      .update()
      .then((response) => {
        const newProps = JSON.parse(response.response);
        if (!newProps.length) {
          return;
        }
        this.updateChatList(newProps);
        this.openLastChat(newProps[newProps.length - 1]);
        globalStore.dispatch('openChat', {
          id: newProps[newProps.length - 1]?.id
        });
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      });
  }

  openLastChat(chatProps: {
    id: number,
    title: string,
    avatar: string,
    created_by: number
  }): void {
    if (typeof chatProps.id === 'undefined') {
      return;
    }
    const newInputDeleteChatProps = {...inputDeleteChatProps};
    newInputDeleteChatProps.value = chatProps.id.toString();
    const newPopupDeleteChatProps = {...popupDeleteChatProps};
    newPopupDeleteChatProps.input = new Input(newInputDeleteChatProps).getContent().innerHTML;
    const newPopupChatDeleteProps = new Popup(newPopupDeleteChatProps).getContent().innerHTML;

    this.block?.setProps({
      popupChatDelete: newPopupChatDeleteProps,
      header: {
        person: {
          name: chatProps.title
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
    new ChatAPI()
      .delete({data: formFields})
      .then((response) => {
        this.isDeletingChat = false;
        this.getChats();
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
      })
      .catch((response) => {
        this.isDeletingChat = false;
        notify({
          response,
          block: this.block
        });
      });
  }

  async addUser($form: HTMLFormElement): Promise<void> {
    if (this.isAddingUser) {
      return;
    }
    this.isAddingUser = true;
    const ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
    const SUCCESS_MESSAGE = 'Пользователь успешно добавлен в чат';
    const userData = await this.searchUsers($form);
    if (!userData || !userData.length) {
      this.isAddingUser = false;
      notify({
        response: {} as XMLHttpRequest,
        block: this.block,
        errorMessage: ERROR_MESSAGE
      });
      return;
    }
    const chatId = (globalStore.state.lastOpenedChat as Record<string, unknown>)?.id;
    const userDataToSend = {
      users: [userData[0].id],
      chatId
    };
    new UserChatAPI()
      .update({data: userDataToSend})
      .then((response) => {
        this.isAddingUser = false;
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
        this.getUsers();
      })
      .catch((response) => {
        this.isAddingUser = false;
        notify({
          response,
          block: this.block
        });
      });
  }

  async getUsers(): Promise<void> {
    const chatId = (globalStore.state.lastOpenedChat as Record<string, unknown>)?.id as number | string;
    if (!chatId) {
      return;
    }
    const users = await new UserChatAPI()
      .request({id: chatId})
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
    const chatId = (globalStore.state.lastOpenedChat as Record<string, unknown>)?.id;
    new UserChatAPI()
      .delete({
        data: {
          users: [id],
          chatId
        }
      })
      .then((response) => {
        this.isDeletingUser = false;
        notify({
          response,
          block: this.block,
          successMessage: SUCCESS_MESSAGE,
          showOnSuccess: true
        });
        this.getUsers();
      })
      .catch((response) => {
        this.isDeletingUser = false;
        notify({
          response,
          block: this.block
        });
      });
  }
}

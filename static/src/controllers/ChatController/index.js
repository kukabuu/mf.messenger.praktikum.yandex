import ComponentController from '../../core/ComponentController/index.js';
import Chat from '../../components/Chat/index.js';
import * as props from './props.js';
import { chatListProps, inputDeleteChatProps, popupDeleteChatProps } from './props.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { SearchAPI } from '../../api/searchAPI.js';
import concatItems from '../../components/ChatListItem/concatItems.js';
import { ChatAPI } from '../../api/chatAPI.js';
import { isValidForm } from '../../utils/validate.js';
import Input from '../../components/Input/index.js';
import Popup from '../../components/Popup/index.js';
import { UserChatAPI } from '../../api/userChatAPI.js';
import { globalStore } from '../../store/index.js';
import { notify } from '../../utils/notify.js';
import { collectFormData } from '../../utils/collectFormData.js';
export default class ChatController extends ComponentController {
    constructor() {
        super(Chat, props.chatProps);
        if (ChatController.__instance) {
            return ChatController.__instance;
        }
        ChatController.__instance = this;
        this.isSearching = false;
        this.isCreating = false;
    }
    emitListeners() {
        globalEventBus.emit(ChatController.EVENTS.EVENT_DISPLAY_NAME);
        globalEventBus.emit(ChatController.EVENTS.EVENT_VALIDATE);
        globalEventBus.emit(ChatController.EVENTS.EVENT_CREATE_CHAT);
        globalEventBus.emit(ChatController.EVENTS.EVENT_ADD_USER);
        globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_USER);
        globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_TOOLTIP);
        globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_POPUP);
    }
    addListeners() {
        globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_CHAT_CLICKED, ($form) => {
            return this.deleteChat($form);
        });
        globalEventBus.on(ChatController.EVENTS.EVENT_CREATE_CHAT_CLICKED, ($form) => {
            return this.createChat($form);
        });
        globalEventBus.on(ChatController.EVENTS.EVENT_ADD_USER_CLICKED, ($form) => {
            return this.addUser($form);
        });
        globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_USER_CLICKED, ($form) => {
            return this.deleteUser($form);
        });
    }
    async updateProps() {
        globalEventBus.on(ChatController.EVENTS.STATE_CHANGE, () => { });
        console.log('update props');
        await this.getChats();
        await this.getUsers();
    }
    async searchUsers($form) {
        if (this.isSearching) {
            return;
        }
        this.isSearching = true;
        const formFields = collectFormData($form);
        console.log(formFields);
        return await new SearchAPI()
            .request({ data: formFields })
            .then((response) => {
            console.log('FROM REQUEST OPEN');
            this.isSearching = false;
            notify({
                response,
                block: this.block
            });
            return JSON.parse(response.responseText);
        });
    }
    updateChatList(newProps) {
        const BASE_URL = 'https://ya-praktikum.tech/';
        const BASE_IMG = './images/profile_blob.png';
        let newListItemProps = [];
        const defaultProp = { ...chatListProps };
        if (newProps.length === 0) {
            this.block.setProps({
                chatListItems: newListItemProps
            });
        }
        newProps.forEach((prop) => {
            const avatarLink = prop['avatar'] !== null
                ? `${BASE_URL}${prop['avatar']}`
                : BASE_IMG;
            defaultProp.id = prop['id'] || 0;
            defaultProp.avatar.src = avatarLink;
            defaultProp.avatar.name = prop['display_name'] || prop['first_name'] || prop['title'] || '';
            defaultProp.name = prop['display_name'] || prop['title'] || '';
            newListItemProps.push({ ...defaultProp });
        });
        this.block.setProps({
            chatListItems: concatItems(newListItemProps)
        });
        console.log('FROM REQUEST CLOSE');
        console.log(globalEventBus);
    }
    createChat($form) {
        const SUCCESS_MESSAGE = 'Ура! Чат удален.';
        if (!isValidForm()) {
            return;
        }
        if (this.isCreating) {
            return;
        }
        this.isCreating = true;
        const formFields = collectFormData($form);
        console.log(formFields);
        new ChatAPI()
            .create({ data: formFields })
            .then((response) => {
            this.isCreating = false;
            console.log(response);
            notify({
                response,
                block: this.block,
                successMessage: SUCCESS_MESSAGE,
                showOnSuccess: true
            });
            this.getChats();
        });
    }
    async getChats() {
        await new ChatAPI()
            .request()
            .then((response) => {
            console.log(response);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block,
                });
                return;
            }
            const newProps = JSON.parse(response.responseText);
            console.log('new props from getChats ', newProps);
            if (!newProps.length) {
                return;
            }
            this.updateChatList(newProps);
            this.openLastChat(newProps[newProps.length - 1]);
            globalStore.dispatch('openChat', {
                id: newProps[newProps.length - 1]?.id
            });
        });
    }
    openLastChat(chatProps) {
        console.log('id from openLastChat ', chatProps.id);
        if (typeof chatProps.id === 'undefined') {
            return;
        }
        const newInputDeleteChatProps = { ...inputDeleteChatProps };
        newInputDeleteChatProps.value = chatProps.id.toString();
        const newPopupDeleteChatProps = { ...popupDeleteChatProps };
        newPopupDeleteChatProps.input = new Input(newInputDeleteChatProps).getContent().innerHTML;
        const newPopupChatDeleteProps = new Popup(newPopupDeleteChatProps).getContent().innerHTML;
        this.block.setProps({
            popupChatDelete: newPopupChatDeleteProps,
            header: {
                person: {
                    name: chatProps.title
                }
            }
        });
        console.log('after set props with last chat');
        globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_CHAT);
    }
    deleteChat($form) {
        const SUCCESS_MESSAGE = 'Ура! Чат удален.';
        const formFields = collectFormData($form);
        console.log(formFields);
        new ChatAPI()
            .delete({ data: formFields })
            .then((response) => {
            notify({
                response,
                block: this.block,
                successMessage: SUCCESS_MESSAGE,
                showOnSuccess: true
            });
            this.getChats();
        });
    }
    async addUser($form) {
        console.log('from addUser');
        const ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
        const SUCCESS_MESSAGE = 'Пользователь успешно добавлен в чат';
        const userData = await this.searchUsers($form);
        if (!userData.length) {
            notify({
                response: {},
                block: this.block,
                errorMessage: ERROR_MESSAGE,
            });
            return;
        }
        const chatId = globalStore.state.lastOpenedChat?.id;
        const userDataToSend = {
            users: [userData[0].id],
            chatId
        };
        new UserChatAPI()
            .update({ data: userDataToSend })
            .then((response) => {
            console.log(response.responseText, response.status);
            notify({
                response,
                block: this.block,
                successMessage: SUCCESS_MESSAGE,
                showOnSuccess: true
            });
            window.location.hash = '#close';
            this.getUsers();
            console.log(globalEventBus.listeners);
        });
    }
    async getUsers() {
        const chatId = globalStore.state.lastOpenedChat?.id;
        if (!chatId) {
            return;
        }
        const users = await new UserChatAPI()
            .request({ id: chatId })
            .then((response) => {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block,
                });
                return;
            }
            return JSON.parse(response.responseText);
        });
        if (users && users.length) {
            globalStore.dispatch('getUsers', users);
        }
    }
    deleteUser($form) {
        const ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
        const formFields = collectFormData($form);
        console.log(formFields);
        const { users } = globalStore.state;
        if (!users) {
            notify({
                response: {},
                block: this.block,
                errorMessage: ERROR_MESSAGE,
            });
            return;
        }
        const user = users.filter((user) => {
            return user.login === formFields?.login;
        });
        if (!user.length) {
            notify({
                response: {},
                block: this.block,
                errorMessage: ERROR_MESSAGE,
            });
            return;
        }
        const [{ id }] = user;
        const chatId = globalStore.state.lastOpenedChat?.id;
        new UserChatAPI()
            .delete({
            data: {
                users: [id],
                chatId
            }
        })
            .then((response) => {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block,
                });
                return;
            }
            window.location.hash = '#close';
            this.getUsers();
        });
    }
}
ChatController.EVENTS = {
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
    EVENT_DELETE_USER_CLICKED: 'event-listener:delete-user-clicked',
};
//# sourceMappingURL=index.js.map
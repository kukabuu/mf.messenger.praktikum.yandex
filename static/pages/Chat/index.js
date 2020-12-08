import { ChatAside } from '../../components/ChatAside/index.js';
import { ChatMain } from '../../components/ChatMain/index.js';
import { ChatListItem } from '../../components/ChatListItem/index.js';
import { DialogMessage } from '../../components/DialogMessage/index.js';
import { EmptyDialog } from '../../components/EmptyDialog/index.js';
import Button from '../../components/Button/index.js';
import { UploadFilePopup, ChatPopup, UserPopup } from '../../components/Popup/index.js';
import { render } from '../../utils/render.js';
import { displayFileName } from '../../utils/displayFileName.js';
import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';
import * as props from './mock.js';
// рендерим компоненты
const chatAside = new ChatAside(props.chatAsideProps);
render('.app', chatAside);
const chatMain = new ChatMain(props.chat);
render('.app', chatMain);
props.chatListProps.items.forEach((listProps) => {
    const chatListItem = new ChatListItem(listProps);
    render('.js-chat-list', chatListItem);
});
// показываем пустой диалог и через 3 секунды подгружаем список сообщений
const emptyDialogBlock = new EmptyDialog(props.emptyDialog);
render('.js-chat-dialog', emptyDialogBlock);
setTimeout(() => {
    emptyDialogBlock.hide();
    props.dialog.messages.forEach((message) => {
        const dialogBlock = new DialogMessage(message);
        render('.js-chat-dialog', dialogBlock);
    });
}, 3000);
//создаем попапы и добавляем их к странице. после этого добавляем к ним кнопки
const uploadFilePopup = new UploadFilePopup(props.uploadFilePopup);
render('#popup-upload-file', uploadFilePopup);
const uploadFileButton = new Button(props.updateAvatarButton);
render('#popup-upload-file .js-form', uploadFileButton);
const addUserPopup = new UserPopup(props.addUserPopup);
render('#popup-add-user', addUserPopup);
const addUserButton = new Button(props.addUserButton);
render('#popup-add-user .js-form', addUserButton);
const removeUserPopup = new UserPopup(props.removeUserPopup);
render('#popup-remove-user', removeUserPopup);
const removeUserButton = new Button(props.removeUserButton);
render('#popup-remove-user .js-form', removeUserButton);
const deleteChatPopup = new ChatPopup(props.deleteChatPopup);
render('#popup-chat-delete', deleteChatPopup);
const deleteChatButton = new Button(props.deleteChatButton);
render('#popup-chat-delete .js-form', deleteChatButton);
const cancelDeleteChatButton = new Button(props.cancelDeleteChatButton);
render('#popup-chat-delete .js-form', cancelDeleteChatButton);
// добавляем валидацию
const $addUserForm = document.querySelector('#popup-add-user .js-form');
const $removeUserForm = document.querySelector('#popup-remove-user .js-form');
const fields = ['login-add', 'login-remove'];
const addUserValidator = new FormValidator($addUserForm, fields);
const removeUserValidator = new FormValidator($removeUserForm, fields);
addUserValidator.initialize();
removeUserValidator.initialize();
// добавляем обработчики событий
displayFileName();
collectFormData();
//# sourceMappingURL=index.js.map
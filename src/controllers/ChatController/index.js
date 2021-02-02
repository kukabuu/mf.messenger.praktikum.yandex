"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var index_js_1 = require("../../core/ComponentController/index.js");
var index_js_2 = require("../../components/Chat/index.js");
var props = require("./props.js");
var props_js_1 = require("./props.js");
var index_js_3 = require("../../core/GlobalEventBus/index.js");
var searchAPI_js_1 = require("../../api/searchAPI.js");
var concatItems_js_1 = require("../../components/ChatListItem/concatItems.js");
var chatAPI_js_1 = require("../../api/chatAPI.js");
var validate_js_1 = require("../../utils/validate.js");
var index_js_4 = require("../../components/Input/index.js");
var index_js_5 = require("../../components/Popup/index.js");
var userChatAPI_js_1 = require("../../api/userChatAPI.js");
var index_js_6 = require("../../store/index.js");
var notify_js_1 = require("../../utils/notify.js");
var collectFormData_js_1 = require("../../utils/collectFormData.js");
var ChatController = /** @class */ (function (_super) {
    __extends(ChatController, _super);
    function ChatController() {
        var _this = _super.call(this, index_js_2["default"], props.chatProps) || this;
        if (ChatController.__instance) {
            return ChatController.__instance;
        }
        ChatController.__instance = _this;
        _this.isSearching = false;
        _this.isCreating = false;
        return _this;
    }
    ChatController.prototype.emitListeners = function () {
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_DISPLAY_NAME);
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_VALIDATE);
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_CREATE_CHAT);
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_ADD_USER);
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_USER);
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_TOOLTIP);
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_TOGGLE_POPUP);
    };
    ChatController.prototype.addListeners = function () {
        var _this = this;
        index_js_3.globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_CHAT_CLICKED, function ($form) {
            return _this.deleteChat($form);
        });
        index_js_3.globalEventBus.on(ChatController.EVENTS.EVENT_CREATE_CHAT_CLICKED, function ($form) {
            return _this.createChat($form);
        });
        index_js_3.globalEventBus.on(ChatController.EVENTS.EVENT_ADD_USER_CLICKED, function ($form) {
            return _this.addUser($form);
        });
        index_js_3.globalEventBus.on(ChatController.EVENTS.EVENT_DELETE_USER_CLICKED, function ($form) {
            return _this.deleteUser($form);
        });
    };
    ChatController.prototype.updateProps = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index_js_3.globalEventBus.on(ChatController.EVENTS.STATE_CHANGE, function () { });
                        console.log('update props');
                        return [4 /*yield*/, this.getChats()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getUsers()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.searchUsers = function ($form) {
        return __awaiter(this, void 0, void 0, function () {
            var formFields;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isSearching) {
                            return [2 /*return*/];
                        }
                        this.isSearching = true;
                        formFields = collectFormData_js_1.collectFormData($form);
                        console.log(formFields);
                        return [4 /*yield*/, new searchAPI_js_1.SearchAPI()
                                .request({ data: formFields })
                                .then(function (response) {
                                console.log('FROM REQUEST OPEN');
                                _this.isSearching = false;
                                notify_js_1.notify({
                                    response: response,
                                    block: _this.block
                                });
                                return JSON.parse(response.responseText);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatController.prototype.updateChatList = function (newProps) {
        var BASE_URL = 'https://ya-praktikum.tech/';
        var BASE_IMG = './images/profile_blob.png';
        var newListItemProps = [];
        var defaultProp = __assign({}, props_js_1.chatListProps);
        if (newProps.length === 0) {
            this.block.setProps({
                chatListItems: newListItemProps
            });
        }
        newProps.forEach(function (prop) {
            var avatarLink = prop['avatar'] !== null
                ? "" + BASE_URL + prop['avatar']
                : BASE_IMG;
            defaultProp.id = prop['id'] || 0;
            defaultProp.avatar.src = avatarLink;
            defaultProp.avatar.name = prop['display_name'] || prop['first_name'] || prop['title'] || '';
            defaultProp.name = prop['display_name'] || prop['title'] || '';
            newListItemProps.push(__assign({}, defaultProp));
        });
        this.block.setProps({
            chatListItems: concatItems_js_1["default"](newListItemProps)
        });
        console.log('FROM REQUEST CLOSE');
        console.log(index_js_3.globalEventBus);
    };
    ChatController.prototype.createChat = function ($form) {
        var _this = this;
        var SUCCESS_MESSAGE = 'Ура! Чат удален.';
        if (!validate_js_1.isValidForm()) {
            return;
        }
        if (this.isCreating) {
            return;
        }
        this.isCreating = true;
        var formFields = collectFormData_js_1.collectFormData($form);
        console.log(formFields);
        new chatAPI_js_1.ChatAPI()
            .create({ data: formFields })
            .then(function (response) {
            _this.isCreating = false;
            console.log(response);
            notify_js_1.notify({
                response: response,
                block: _this.block,
                successMessage: SUCCESS_MESSAGE,
                showOnSuccess: true
            });
            _this.getChats();
        });
    };
    ChatController.prototype.getChats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new chatAPI_js_1.ChatAPI()
                            .request()
                            .then(function (response) {
                            var _a;
                            console.log(response);
                            if (response.status !== 200) {
                                notify_js_1.notify({
                                    response: response,
                                    block: _this.block
                                });
                                return;
                            }
                            var newProps = JSON.parse(response.responseText);
                            console.log('new props from getChats ', newProps);
                            if (!newProps.length) {
                                return;
                            }
                            _this.updateChatList(newProps);
                            _this.openLastChat(newProps[newProps.length - 1]);
                            index_js_6.globalStore.dispatch('openChat', {
                                id: (_a = newProps[newProps.length - 1]) === null || _a === void 0 ? void 0 : _a.id
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.openLastChat = function (chatProps) {
        console.log('id from openLastChat ', chatProps.id);
        if (typeof chatProps.id === 'undefined') {
            return;
        }
        var newInputDeleteChatProps = __assign({}, props_js_1.inputDeleteChatProps);
        newInputDeleteChatProps.value = chatProps.id.toString();
        var newPopupDeleteChatProps = __assign({}, props_js_1.popupDeleteChatProps);
        newPopupDeleteChatProps.input = new index_js_4["default"](newInputDeleteChatProps).getContent().innerHTML;
        var newPopupChatDeleteProps = new index_js_5["default"](newPopupDeleteChatProps).getContent().innerHTML;
        this.block.setProps({
            popupChatDelete: newPopupChatDeleteProps,
            header: {
                person: {
                    name: chatProps.title
                }
            }
        });
        console.log('after set props with last chat');
        index_js_3.globalEventBus.emit(ChatController.EVENTS.EVENT_DELETE_CHAT);
    };
    ChatController.prototype.deleteChat = function ($form) {
        var _this = this;
        var SUCCESS_MESSAGE = 'Ура! Чат удален.';
        var formFields = collectFormData_js_1.collectFormData($form);
        console.log(formFields);
        new chatAPI_js_1.ChatAPI()["delete"]({ data: formFields })
            .then(function (response) {
            notify_js_1.notify({
                response: response,
                block: _this.block,
                successMessage: SUCCESS_MESSAGE,
                showOnSuccess: true
            });
            _this.getChats();
        });
    };
    ChatController.prototype.addUser = function ($form) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ERROR_MESSAGE, SUCCESS_MESSAGE, userData, chatId, userDataToSend;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('from addUser');
                        ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
                        SUCCESS_MESSAGE = 'Пользователь успешно добавлен в чат';
                        return [4 /*yield*/, this.searchUsers($form)];
                    case 1:
                        userData = _b.sent();
                        if (!userData.length) {
                            notify_js_1.notify({
                                response: {},
                                block: this.block,
                                errorMessage: ERROR_MESSAGE
                            });
                            return [2 /*return*/];
                        }
                        chatId = (_a = index_js_6.globalStore.state.lastOpenedChat) === null || _a === void 0 ? void 0 : _a.id;
                        userDataToSend = {
                            users: [userData[0].id],
                            chatId: chatId
                        };
                        new userChatAPI_js_1.UserChatAPI()
                            .update({ data: userDataToSend })
                            .then(function (response) {
                            console.log(response.responseText, response.status);
                            notify_js_1.notify({
                                response: response,
                                block: _this.block,
                                successMessage: SUCCESS_MESSAGE,
                                showOnSuccess: true
                            });
                            window.location.hash = '#close';
                            _this.getUsers();
                            console.log(index_js_3.globalEventBus.listeners);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getUsers = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var chatId, users;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        chatId = (_a = index_js_6.globalStore.state.lastOpenedChat) === null || _a === void 0 ? void 0 : _a.id;
                        if (!chatId) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new userChatAPI_js_1.UserChatAPI()
                                .request({ id: chatId })
                                .then(function (response) {
                                console.log(response.responseText, response.status);
                                if (response.status !== 200) {
                                    notify_js_1.notify({
                                        response: response,
                                        block: _this.block
                                    });
                                    return;
                                }
                                return JSON.parse(response.responseText);
                            })];
                    case 1:
                        users = _b.sent();
                        if (users && users.length) {
                            index_js_6.globalStore.dispatch('getUsers', users);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.deleteUser = function ($form) {
        var _this = this;
        var _a;
        var ERROR_MESSAGE = 'Кажется, такого пользователя нет( Проверьте логин';
        var formFields = collectFormData_js_1.collectFormData($form);
        console.log(formFields);
        var users = index_js_6.globalStore.state.users;
        if (!users) {
            notify_js_1.notify({
                response: {},
                block: this.block,
                errorMessage: ERROR_MESSAGE
            });
            return;
        }
        var user = users.filter(function (user) {
            return user.login === (formFields === null || formFields === void 0 ? void 0 : formFields.login);
        });
        if (!user.length) {
            notify_js_1.notify({
                response: {},
                block: this.block,
                errorMessage: ERROR_MESSAGE
            });
            return;
        }
        var id = user[0].id;
        var chatId = (_a = index_js_6.globalStore.state.lastOpenedChat) === null || _a === void 0 ? void 0 : _a.id;
        new userChatAPI_js_1.UserChatAPI()["delete"]({
            data: {
                users: [id],
                chatId: chatId
            }
        })
            .then(function (response) {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify_js_1.notify({
                    response: response,
                    block: _this.block
                });
                return;
            }
            window.location.hash = '#close';
            _this.getUsers();
        });
    };
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
        EVENT_DELETE_USER_CLICKED: 'event-listener:delete-user-clicked'
    };
    return ChatController;
}(index_js_1["default"]));
exports["default"] = ChatController;

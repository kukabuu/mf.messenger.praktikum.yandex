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
var index_js_2 = require("../../components/Profile/index.js");
var props_js_1 = require("./props.js");
var index_js_3 = require("../../core/GlobalEventBus/index.js");
var main_js_1 = require("../../core/Main/main.js");
var profileChangeInfoAPI_js_1 = require("../../api/profileChangeInfoAPI.js");
var getUserInfo_js_1 = require("../../utils/getUserInfo.js");
var concatInputs_js_1 = require("../../components/Input/concatInputs.js");
var collectFormData_js_1 = require("../../utils/collectFormData.js");
var notify_js_1 = require("../../utils/notify.js");
var ProfileEditController = /** @class */ (function (_super) {
    __extends(ProfileEditController, _super);
    function ProfileEditController() {
        var _this = _super.call(this, index_js_2["default"], props_js_1.props) || this;
        if (ProfileEditController.__instance) {
            return ProfileEditController.__instance;
        }
        ProfileEditController.__instance = _this;
        return _this;
    }
    ProfileEditController.prototype.emitListeners = function () {
        console.log('from emitListeners');
        index_js_3.globalEventBus.emit(ProfileEditController.EVENTS.EVENT_DISPLAY_NAME);
        index_js_3.globalEventBus.emit(ProfileEditController.EVENTS.EVENT_VALIDATE);
        index_js_3.globalEventBus.emit(ProfileEditController.EVENTS.EVENT_SEND_AVATAR);
        index_js_3.globalEventBus.emit(ProfileEditController.EVENTS.EVENT_CHANGE_PROFILE);
        index_js_3.globalEventBus.emit(ProfileEditController.EVENTS.EVENT_TOGGLE_POPUP);
    };
    ProfileEditController.prototype.addListeners = function () {
        var _this = this;
        index_js_3.globalEventBus.on(ProfileEditController.EVENTS.EVENT_CHANGE_PROFILE_CLICKED, function ($form) {
            console.log('from change-profile-clicked of profileController');
            _this.changeInfo($form);
        });
        index_js_3.globalEventBus.on(ProfileEditController.EVENTS.EVENT_SEND_AVATAR_CLICKED, function ($form) {
            console.log('emit event-listener:send-avatar-clicked');
            _this.updateAvatar($form);
        });
        console.log(index_js_3.globalEventBus.listeners);
    };
    ProfileEditController.prototype.updateProps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var BASE_URL, BASE_IMG, newProps, newInputProps, avatar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BASE_URL = 'https://ya-praktikum.tech/';
                        BASE_IMG = './images/profile_blob.png';
                        console.log('update props');
                        return [4 /*yield*/, getUserInfo_js_1.getUserInfo()];
                    case 1:
                        newProps = _a.sent();
                        newInputProps = [];
                        props_js_1.inputs.forEach(function (inputProp) {
                            var prop = __assign({}, inputProp);
                            Object.keys(newProps).forEach(function (key) {
                                if (prop.name !== key) {
                                    return;
                                }
                                prop.value = newProps[key] === null ? '' : newProps[key];
                                if (key === 'display_name' && newProps[key] === null) {
                                    prop.value = newProps.login;
                                }
                            });
                            newInputProps.push(prop);
                        });
                        avatar = newProps['avatar'] !== null
                            ? "" + BASE_URL + newProps['avatar']
                            : BASE_IMG;
                        this.block.setProps({
                            inputs: concatInputs_js_1["default"](newInputProps),
                            header: newProps['first_name'],
                            avatar: avatar
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileEditController.prototype.changeInfo = function ($form) {
        var _this = this;
        var formData = collectFormData_js_1.collectFormData($form);
        new profileChangeInfoAPI_js_1.ProfileChangeInfoAPI()
            .update({ data: formData })
            .then(function (response) {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify_js_1.notify({
                    response: response,
                    block: _this.block
                });
                return;
            }
            main_js_1.router.go(ProfileEditController.PATHS.PROFILE);
        });
    };
    ProfileEditController.prototype.updateAvatar = function ($form) {
        var _this = this;
        var formData = new FormData($form);
        new profileChangeInfoAPI_js_1.ProfileChangeInfoAPI()
            .request({ data: formData })
            .then(function (response) {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify_js_1.notify({
                    response: response,
                    block: _this.block
                });
                return;
            }
            main_js_1.router.go(ProfileEditController.PATHS.PROFILE);
        });
    };
    ProfileEditController.EVENTS = {
        EVENT_DISPLAY_NAME: 'event-listener:display-file-name',
        EVENT_VALIDATE: 'event-listener:validate-form',
        EVENT_SEND_AVATAR: 'event-listener:send-avatar',
        EVENT_CHANGE_PROFILE: 'event-listener:change-profile',
        EVENT_TOGGLE_POPUP: 'event-listener:toggle-popup',
        STATE_CHANGE: 'state:change',
        EVENT_SEND_AVATAR_CLICKED: 'event-listener:send-avatar-clicked',
        EVENT_CHANGE_PROFILE_CLICKED: 'event-listener:change-profile-clicked'
    };
    ProfileEditController.PATHS = {
        PROFILE: '/profile'
    };
    return ProfileEditController;
}(index_js_1["default"]));
exports["default"] = ProfileEditController;

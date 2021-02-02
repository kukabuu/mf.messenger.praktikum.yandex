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
exports.__esModule = true;
var index_js_1 = require("../../core/ComponentController/index.js");
var index_js_2 = require("../../components/Entry/index.js");
var props_js_1 = require("./props.js");
var index_js_3 = require("../../core/GlobalEventBus/index.js");
var signInAPI_js_1 = require("../../api/signInAPI.js");
var main_js_1 = require("../../core/Main/main.js");
var collectFormData_js_1 = require("../../utils/collectFormData.js");
var notify_js_1 = require("../../utils/notify.js");
var SignInController = /** @class */ (function (_super) {
    __extends(SignInController, _super);
    function SignInController() {
        var _this = _super.call(this, index_js_2["default"], props_js_1.props) || this;
        if (SignInController.__instance) {
            return SignInController.__instance;
        }
        SignInController.__instance = _this;
        return _this;
    }
    SignInController.prototype.emitListeners = function () {
        index_js_3.globalEventBus.emit(SignInController.EVENTS.EVENT_VALIDATE);
        index_js_3.globalEventBus.emit(SignInController.EVENTS.EVENT_SEND_FORM);
    };
    SignInController.prototype.subscribeState = function () {
        var _this = this;
        index_js_3.globalEventBus.on(SignInController.EVENTS.EVENT_SEND_FORM_CLICKED, function ($form) {
            _this.sendFormData($form);
        });
    };
    SignInController.prototype.sendFormData = function ($form) {
        var _this = this;
        var formData = collectFormData_js_1.collectFormData($form);
        new signInAPI_js_1.SignInAPI()
            .create({ data: formData })
            .then(function (response) {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify_js_1.notify({
                    response: response,
                    block: _this.block
                });
                return;
            }
            main_js_1.router.go(SignInController.PATHS.CHATS);
        });
    };
    SignInController.EVENTS = {
        EVENT_VALIDATE: 'event-listener:validate-form',
        EVENT_SEND_FORM: 'event-listener:send-signin-form',
        EVENT_SEND_FORM_CLICKED: 'event-listener:send-signin-form-clicked'
    };
    SignInController.PATHS = {
        CHATS: '/chats'
    };
    return SignInController;
}(index_js_1["default"]));
exports["default"] = SignInController;

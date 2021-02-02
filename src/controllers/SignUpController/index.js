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
var signUpAPI_js_1 = require("../../api/signUpAPI.js");
var main_js_1 = require("../../core/Main/main.js");
var collectFormData_js_1 = require("../../utils/collectFormData.js");
var notify_js_1 = require("../../utils/notify.js");
var SignUpController = /** @class */ (function (_super) {
    __extends(SignUpController, _super);
    function SignUpController() {
        var _this = _super.call(this, index_js_2["default"], props_js_1.props) || this;
        if (SignUpController.__instance) {
            return SignUpController.__instance;
        }
        SignUpController.__instance = _this;
        return _this;
    }
    SignUpController.prototype.emitListeners = function () {
        index_js_3.globalEventBus.emit(SignUpController.EVENTS.EVENT_VALIDATE);
        index_js_3.globalEventBus.emit(SignUpController.EVENTS.EVENT_SEND_FORM);
    };
    SignUpController.prototype.subscribeState = function () {
        var _this = this;
        index_js_3.globalEventBus.on(SignUpController.EVENTS.EVENT_SEND_FORM_CLICKED, function ($form) {
            console.log('from event-listener:submit-signup-form-clicked of signupcontroller');
            _this.sendFormData($form);
        });
    };
    SignUpController.prototype.sendFormData = function ($form) {
        var _this = this;
        var formData = collectFormData_js_1.collectFormData($form);
        new signUpAPI_js_1.SignUpAPI()
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
            main_js_1.router.go(SignUpController.PATHS.CHATS);
        });
    };
    SignUpController.EVENTS = {
        EVENT_VALIDATE: 'event-listener:validate-form',
        EVENT_SEND_FORM: 'event-listener:send-signin-form',
        EVENT_SEND_FORM_CLICKED: 'event-listener:send-signin-form-clicked'
    };
    SignUpController.PATHS = {
        CHATS: '/chats'
    };
    return SignUpController;
}(index_js_1["default"]));
exports["default"] = SignUpController;

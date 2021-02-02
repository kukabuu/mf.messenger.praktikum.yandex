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
exports.__esModule = true;
exports.ChatAPI = void 0;
var index_js_1 = require("../core/HTTP/index.js");
var index_js_2 = require("../core/BaseAPI/index.js");
var chatAPIInstance = new index_js_1["default"]('/chats');
var ChatAPI = /** @class */ (function (_super) {
    __extends(ChatAPI, _super);
    function ChatAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatAPI.prototype.create = function (data) {
        var options = __assign(__assign({}, data), { headers: {
                'Content-type': 'application/json; charset=utf-8'
            } });
        return chatAPIInstance.post('/', options);
    };
    ChatAPI.prototype.request = function () {
        return chatAPIInstance.get('/');
    };
    ChatAPI.prototype["delete"] = function (data) {
        var options = __assign(__assign({}, data), { headers: {
                'Content-type': 'application/json; charset=utf-8'
            } });
        return chatAPIInstance["delete"]('/', options);
    };
    return ChatAPI;
}(index_js_2["default"]));
exports.ChatAPI = ChatAPI;

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
exports.UserChatAPI = void 0;
var index_js_1 = require("../core/HTTP/index.js");
var index_js_2 = require("../core/BaseAPI/index.js");
var userChatAPIInstance = new index_js_1["default"]('/chats');
var UserChatAPI = /** @class */ (function (_super) {
    __extends(UserChatAPI, _super);
    function UserChatAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserChatAPI.prototype.update = function (data) {
        var options = __assign(__assign({}, data), { headers: {
                'Content-type': 'application/json; charset=utf-8'
            } });
        return userChatAPIInstance.put('/users', options);
    };
    UserChatAPI.prototype["delete"] = function (data) {
        var options = __assign(__assign({}, data), { headers: {
                'Content-type': 'application/json; charset=utf-8'
            } });
        return userChatAPIInstance["delete"]('/users', options);
    };
    UserChatAPI.prototype.request = function (data) {
        var id = data.id;
        return userChatAPIInstance.get("/" + id + "/users");
    };
    return UserChatAPI;
}(index_js_2["default"]));
exports.UserChatAPI = UserChatAPI;

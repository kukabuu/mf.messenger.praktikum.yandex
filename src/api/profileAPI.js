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
exports.ProfileAPI = void 0;
var index_js_1 = require("../core/HTTP/index.js");
var index_js_2 = require("../core/BaseAPI/index.js");
var profileAPIInstance = new index_js_1["default"]('/auth');
var ProfileAPI = /** @class */ (function (_super) {
    __extends(ProfileAPI, _super);
    function ProfileAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileAPI.prototype.create = function () {
        console.log('logout clicked');
        return profileAPIInstance.post('/logout');
    };
    ProfileAPI.prototype.request = function () {
        return profileAPIInstance.get('/user');
    };
    return ProfileAPI;
}(index_js_2["default"]));
exports.ProfileAPI = ProfileAPI;

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
exports.ProfileChangeInfoAPI = void 0;
var index_js_1 = require("../core/HTTP/index.js");
var index_js_2 = require("../core/BaseAPI/index.js");
var profileChangeInfoAPIInstance = new index_js_1["default"]('/user/profile');
var ProfileChangeInfoAPI = /** @class */ (function (_super) {
    __extends(ProfileChangeInfoAPI, _super);
    function ProfileChangeInfoAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileChangeInfoAPI.prototype.update = function (data) {
        var options = __assign(__assign({}, data), { headers: {
                'Content-type': 'application/json; charset=utf-8'
            } });
        return profileChangeInfoAPIInstance.put('/', options);
    };
    ProfileChangeInfoAPI.prototype.request = function (data) {
        return profileChangeInfoAPIInstance.put('/avatar', data);
    };
    return ProfileChangeInfoAPI;
}(index_js_2["default"]));
exports.ProfileChangeInfoAPI = ProfileChangeInfoAPI;

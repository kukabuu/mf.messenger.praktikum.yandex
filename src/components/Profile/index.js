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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var index_js_1 = require("../../core/Block/index.js");
var template_js_1 = require("./template.js");
var compile_js_1 = require("../../utils/compile.js");
var index_js_2 = require("../../core/GlobalEventBus/index.js");
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile(_a) {
        var _b = _a.eventListeners, eventListeners = _b === void 0 ? [] : _b, _c = _a.footerLinks, footerLinks = _c === void 0 ? [{
                name: '',
                href: '#',
                className: ''
            }] : _c, _d = _a.form, form = _d === void 0 ? {
            className: '',
            method: 'get'
        } : _d, _e = _a.popup, popup = _e === void 0 ? '' : _e, _f = _a.header, header = _f === void 0 ? '' : _f, _g = _a.button, button = _g === void 0 ? '' : _g, _h = _a.avatar, avatar = _h === void 0 ? './images/profile_blob.png' : _h, props = __rest(_a, ["eventListeners", "footerLinks", "form", "popup", "header", "button", "avatar"]);
        var _this = _super.call(this, __assign({ eventListeners: eventListeners,
            footerLinks: footerLinks,
            form: form,
            popup: popup,
            header: header,
            button: button,
            avatar: avatar }, props)) || this;
        eventListeners.forEach(function (listener) {
            index_js_2.globalEventBus.on(listener['event'], listener['callback']);
        });
        return _this;
    }
    Profile.prototype.render = function () {
        return compile_js_1["default"](template_js_1.template, this.props);
    };
    return Profile;
}(index_js_1["default"]));
exports["default"] = Profile;

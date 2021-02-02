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
var index_js_1 = require("../../core/Block/index.js");
var template_js_1 = require("./template.js");
var index_js_2 = require("../../core/GlobalEventBus/index.js");
var compile_js_1 = require("../../utils/compile.js");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(_a) {
        var _b = _a.className, className = _b === void 0 ? 'button' : _b, _c = _a.type, type = _c === void 0 ? 'button' : _c, _d = _a.content, content = _d === void 0 ? '' : _d, _e = _a.handleClick, handleClick = _e === void 0 ? {} : _e, _f = _a.text, text = _f === void 0 ? '' : _f, _g = _a.data, data = _g === void 0 ? {
            name: '',
            value: ''
        } : _g;
        var _this = _super.call(this, {
            className: className,
            type: type,
            content: content,
            handleClick: handleClick,
            text: text,
            data: data
        }) || this;
        Object.entries(handleClick).forEach(function (_a) {
            var event = _a[0], callback = _a[1];
            index_js_2.globalEventBus.on(event, callback);
        });
        return _this;
    }
    Button.prototype.render = function () {
        return compile_js_1["default"](template_js_1.template, this.props);
    };
    return Button;
}(index_js_1["default"]));
exports["default"] = Button;

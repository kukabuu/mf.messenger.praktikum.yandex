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
var compile_js_1 = require("../../utils/compile.js");
var Error = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error(_a) {
        var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.text, text = _c === void 0 ? '' : _c;
        return _super.call(this, { className: className, text: text }) || this;
    }
    Error.prototype.render = function () {
        return compile_js_1["default"](template_js_1.template, this.props);
    };
    return Error;
}(index_js_1["default"]));
exports["default"] = Error;

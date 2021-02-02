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
var index_js_1 = require("../../core/ServerError/index.js");
var props_js_1 = require("./props.js");
var index_js_2 = require("../../core/ComponentController/index.js");
var ServerErrorController = /** @class */ (function (_super) {
    __extends(ServerErrorController, _super);
    function ServerErrorController() {
        var _this = _super.call(this, index_js_1["default"], props_js_1.props) || this;
        if (ServerErrorController.__instance) {
            return ServerErrorController.__instance;
        }
        ServerErrorController.__instance = _this;
        return _this;
    }
    return ServerErrorController;
}(index_js_2["default"]));
exports["default"] = ServerErrorController;

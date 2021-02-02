"use strict";
exports.__esModule = true;
var isEqual_js_1 = require("../../utils/isEqual.js");
var Route = /** @class */ (function () {
    function Route(pathname, controller, root) {
        this._pathname = pathname;
        this._controllerClass = controller;
        this._controller = null;
        this._root = root;
    }
    // метод для отображения вьюшки, если переданный URL совпадает с URL текущего Route
    Route.prototype.navigate = function (pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    };
    Route.prototype.leave = function () {
        this._controller.remove();
        console.log('remove from dom', this._root, this._pathname);
    };
    Route.prototype.match = function (pathname) {
        return isEqual_js_1.isEqual(pathname, this._pathname);
    };
    Route.prototype.render = function () {
        console.log("from route render of " + this._pathname);
        if (!this._controller) {
            this._controller = new this._controllerClass();
            this._controller.init();
        }
        this._controller.render(this._root);
        console.log('route render', this._root, this._pathname);
    };
    return Route;
}());
exports["default"] = Route;

"use strict";
exports.__esModule = true;
var index_js_1 = require("../Route/index.js");
var Router = /** @class */ (function () {
    function Router(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    Router.prototype.use = function (pathname, block) {
        var route = new index_js_1["default"](pathname, block, this._rootQuery);
        this.routes.push(route);
        return this;
    };
    Router.prototype.start = function () {
        var _this = this;
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = function (event) {
            console.log(event.currentTarget.location.hash);
            if (event.currentTarget.location.hash.length) {
                return;
            }
            _this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    };
    Router.prototype._onRoute = function (pathname) {
        var route = this.getRoute(pathname);
        if (!route) {
            this.go('/notFound');
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    };
    Router.prototype.go = function (pathname) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    };
    Router.prototype.back = function () {
        this.history.back();
    };
    Router.prototype.forward = function () {
        this.history.forward();
    };
    Router.prototype.getRoute = function (pathname) {
        return this.routes.find(function (route) { return route.match(pathname); });
    };
    return Router;
}());
exports["default"] = Router;

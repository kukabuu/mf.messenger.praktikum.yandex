"use strict";
exports.__esModule = true;
var index_js_1 = require("../GlobalEventBus/index.js");
var merge_js_1 = require("../../utils/merge.js");
var Params;
(function (Params) {
    Params["actions"] = "actions";
    Params["mutations"] = "mutations";
})(Params || (Params = {}));
var Store = /** @class */ (function () {
    function Store(params) {
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.status = 'resting';
        this.events = index_js_1.globalEventBus;
        if (params.hasOwnProperty(Params.actions)) {
            this.actions = params.actions;
        }
        if (params.hasOwnProperty(Params.mutations)) {
            this.mutations = params.mutations;
        }
        this.state = new Proxy((params.state || {}), {
            set: function (state, key, value) {
                state[key] = value;
                self.status = 'resting';
                return true;
            }
        });
    }
    Store.prototype.dispatch = function (actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error("Action \"" + actionKey + " doesn't exist.");
            return false;
        }
        this.status = 'action';
        this.actions[actionKey](this, payload);
        return true;
    };
    Store.prototype.commit = function (mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.log("Mutation \"" + mutationKey + "\" doesn't exist");
            return false;
        }
        this.status = 'mutation';
        var newState = this.mutations[mutationKey](this.state, payload);
        this.state = merge_js_1.merge(this.state, newState);
        this.events.emit('state:change', this.state);
        return true;
    };
    return Store;
}());
exports["default"] = Store;

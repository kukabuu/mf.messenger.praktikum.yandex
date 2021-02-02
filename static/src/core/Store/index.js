import { globalEventBus } from '../GlobalEventBus/index.js';
import { merge } from '../../utils/merge.js';
var Params;
(function (Params) {
    Params["actions"] = "actions";
    Params["mutations"] = "mutations";
})(Params || (Params = {}));
export default class Store {
    constructor(params) {
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.status = 'resting';
        this.events = globalEventBus;
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
    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        this.status = 'action';
        this.actions[actionKey](this, payload);
        return true;
    }
    commit(mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        this.status = 'mutation';
        let newState = this.mutations[mutationKey](this.state, payload);
        this.state = merge(this.state, newState);
        this.events.emit('state:change', this.state);
        return true;
    }
}
//# sourceMappingURL=index.js.map
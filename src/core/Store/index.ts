import { globalEventBus } from '../GlobalEventBus/index';
import EventBus from '../EventBus/index';
import { merge } from '../../utils/merge';

enum Params {
  actions = 'actions',
  mutations = 'mutations'
}

type Callback<T1, T2> = (this: T1, payload: T2) => void | Record<string, unknown>
type Actions = Record<string, Callback<Store, Record<string, unknown>>>
type Mutations = Record<string, Callback<Record<string, unknown>, Record<string, unknown>>>

export default class Store {
  actions: Actions;
  mutations: Mutations;
  state: Record<string, unknown>;
  events: EventBus<unknown>;

  constructor(params: Record<string, unknown>) {
    this.actions = {};
    this.mutations = {};
    this.state = {};

    this.events = globalEventBus;

    if (Object.hasOwnProperty.call(params, Params.actions)) {
      this.actions = params.actions as Actions;
    }

    if (Object.hasOwnProperty.call(params, Params.mutations)) {
      this.mutations = params.mutations as Mutations;
    }

    this.state = new Proxy((params.state as Record<string, unknown> || {}), {
      set: function (state, key: string | number, value) {
        state[key] = value;
        return true;
      }
    });
  }

  dispatch(actionKey: string, payload: Record<string, unknown> | number): boolean {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
    this.actions[actionKey].call(this, payload);
    return true;
  }

  commit(mutationKey: string, payload: Record<string, unknown>): boolean {
    if (typeof this.mutations[mutationKey] !== 'function') {
      return false;
    }
    const newState = this.mutations[mutationKey].call(this, this.state, payload);
    this.state = merge(this.state, newState as Record<string, unknown>);
    this.events.emit('state:change', this.state);
    return true;
  }
}

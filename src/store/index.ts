import actions from './actions';
import mutations from './mutations';
import Store from '../core/Store/index';

export const globalStore = new Store({
  actions,
  mutations
});

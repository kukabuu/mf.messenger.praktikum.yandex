import { merge } from '../utils/merge';

export default {
  openChat(
    state: Record<string, unknown>,
    payload: Record<string, unknown>
  ): Record<string, unknown> {
    if (!state.lastOpenedChat) {
      state.lastOpenedChat = {};
    }
    return merge(state, {lastOpenedChat: payload});
  },
  getUsers(
    state: Record<string, unknown>,
    payload: Record<string, unknown>
  ): Record<string, unknown> {
    if (!state.users) {
      state.users = [];
    }
    return merge(state, {users: payload});
  }
};

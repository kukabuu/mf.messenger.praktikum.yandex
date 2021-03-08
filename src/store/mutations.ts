import { merge } from '../utils/merge';
import { globalStore } from './index';

export default {
  setChats(
    state: Record<string, unknown>,
    payload: Record<string, unknown>
  ): Record<string, unknown> {
    if (!state.chats) {
      state.chats = {};
    }
    return merge(state, {chats: payload});
  },
  getUsers(
    state: Record<string, unknown>,
    payload: Record<string, unknown>
  ): Record<string, unknown> {
    if (!state.users) {
      state.users = [];
    }
    return merge(state, {users: payload});
  },
  setMessages(
    state: Record<string, unknown>,
    payload: Record<string, unknown>[]
  ): Record<string, unknown> {
    if (!state.messages) {
      state.messages = [];
    }
    const array = [...(globalStore.state.messages as []), payload];
    return merge(state, {messages: array});
  },
  setUser(
    state: Record<string, unknown>,
    payload: Record<string, unknown>
  ): Record<string, unknown> {
    if (!state.user) {
      state.user = {};
    }
    return merge(state, {user: payload});
  },
  setActiveChat(
    state: Record<string, unknown>,
    payload: number
  ): Record<string, unknown> {
    if (!state.activeChat) {
      state.activeChat = {};
    }
    return merge(state, {activeChat: payload});
  },
};

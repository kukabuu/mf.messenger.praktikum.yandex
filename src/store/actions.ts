export default {
  setChats(payload: Record<string, unknown>): void {
    this.commit('setChats', payload);
  },
  getUsers(payload: Record<string, unknown>): void {
    this.commit('getUsers', payload);
  },
  setMessages(payload: Record<string, unknown>): void {
    this.commit('setMessages', payload);
  },
  setUser(payload: Record<string, unknown>): void {
    this.commit('setUser', payload);
  },
  setActiveChat(payload: number): void {
    this.commit('setActiveChat', payload);
  },
};

export default {
  openChat(payload: Record<string, unknown>): void {
    this.commit('openChat', payload);
  },
  getUsers(payload: Record<string, unknown>): void {
    this.commit('getUsers', payload);
  }
};

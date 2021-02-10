import HTTP from '../core/HTTP/index';

const userChatAPIInstance = new HTTP('/chats');

export default {
  update(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return userChatAPIInstance.put('/users', data);
  },

  delete(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return userChatAPIInstance.delete('/users', data);
  },

  request(data: { id: number | string }): Promise<XMLHttpRequest> {
    const {id} = data;
    return userChatAPIInstance.get(`/${id}/users`);
  }
};

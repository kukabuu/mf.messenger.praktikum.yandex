import HTTP from '../core/HTTP/index';

const chatAPIInstance = new HTTP('/chats');

export default {
  create(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return chatAPIInstance.post('/', data);
  },

  update(): Promise<XMLHttpRequest> {
    return chatAPIInstance.get('/');
  },

  delete(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return chatAPIInstance.delete('/', data);
  }
};

import HTTP from '../core/HTTP/index';

const profileAPIInstance = new HTTP('/auth');

export default {
  logout(): Promise<XMLHttpRequest> {
    return profileAPIInstance.post('/logout');
  },

  request(): Promise<XMLHttpRequest> {
    return profileAPIInstance.get('/user');
  }
};

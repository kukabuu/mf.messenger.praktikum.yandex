import HTTP from '../core/HTTP/index';

const profileChangePasswordAPIInstance = new HTTP('/user/password');

export default {
  update(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return profileChangePasswordAPIInstance.put('/', data);
  }
};

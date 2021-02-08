import HTTP from '../core/HTTP/index';

const profileChangeInfoAPIInstance = new HTTP('/user/profile');

export class ProfileChangeInfoAPI {
  update(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return profileChangeInfoAPIInstance.put('/', data);
  }

  upload(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return profileChangeInfoAPIInstance.put('/avatar', data);
  }
}

import HTTP from '../core/HTTP/index';

const signInAPIInstance = new HTTP('/auth/signin');

export class SignInAPI {
  create(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return signInAPIInstance.post('/', data);
  }
}

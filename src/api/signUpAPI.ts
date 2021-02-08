import HTTP from '../core/HTTP/index';

const signUpAPIInstance = new HTTP('/auth/signup');

export class SignUpAPI {
  create(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return signUpAPIInstance.post('/', data);
  }
}

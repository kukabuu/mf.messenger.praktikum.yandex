import HTTP from '../core/HTTP/index';

const searchAPIInstance = new HTTP('/user/search');

export default {
  request(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return searchAPIInstance.post('/', data);
  }
};

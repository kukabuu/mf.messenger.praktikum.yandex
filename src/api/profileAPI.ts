import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';

const profileAPIInstance = new HTTP('/auth');

export class ProfileAPI extends BaseAPI {
	create() {
		console.log('logout clicked')
		return profileAPIInstance.post('/logout');
	}

	request() {
		return profileAPIInstance.get('/user');
	}
}

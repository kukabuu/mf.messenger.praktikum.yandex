import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';

const profileChangePasswordAPIInstance = new HTTP('/user/password');

export class ProfileChangePasswordAPI extends BaseAPI {
	update(data: object) {
		const options = {
			...data,
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			}
		}
		return profileChangePasswordAPIInstance.put('/', options);
	}
}

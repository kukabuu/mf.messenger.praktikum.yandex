import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';

const searchAPIInstance = new HTTP('/user/search');

export class SearchAPI extends BaseAPI {
	request(data: object) {
	const options = {
		...data,
		headers: {
			'Content-type': 'application/json; charset=utf-8'
		}
	}
		return searchAPIInstance.post('/', options);
	}
}

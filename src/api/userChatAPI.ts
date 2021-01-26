import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';

const userChatAPIInstance = new HTTP('/chats');

export class UserChatAPI extends BaseAPI {
	update(data: object) {
		const options = {
			...data,
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			}
		}
		return userChatAPIInstance.put('/users', options);
	}

	delete(data: object) {
		const options = {
			...data,
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			}
		}
		return userChatAPIInstance.delete('/users', options);
	}

	request(data: {id: number}) {
		const { id } = data;
		return userChatAPIInstance.get(`/${id}/users`);
	}
}

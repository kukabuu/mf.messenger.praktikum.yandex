import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';
const chatAPIInstance = new HTTP('/chats');
export class ChatAPI extends BaseAPI {
    create(data) {
        const options = {
            ...data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return chatAPIInstance.post('/', options);
    }
    request() {
        return chatAPIInstance.get('/');
    }
    delete(data) {
        const options = {
            ...data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return chatAPIInstance.delete('/', options);
    }
}
//# sourceMappingURL=chatAPI.js.map
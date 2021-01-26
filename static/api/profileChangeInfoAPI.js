import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';
const profileChangeInfoAPIInstance = new HTTP('/user/profile');
export class ProfileChangeInfoAPI extends BaseAPI {
    update(data) {
        const options = {
            ...data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return profileChangeInfoAPIInstance.put('/', options);
    }
    request(data) {
        return profileChangeInfoAPIInstance.put('/avatar', data);
    }
}
//# sourceMappingURL=profileChangeInfoAPI.js.map
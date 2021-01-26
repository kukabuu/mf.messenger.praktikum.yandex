import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';
const signInAPIInstance = new HTTP('/auth/signin');
export class SignInAPI extends BaseAPI {
    create(data) {
        const options = {
            ...data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return signInAPIInstance.post('/', options);
    }
}
//# sourceMappingURL=signInAPI.js.map
import HTTP from '../core/HTTP/index.js';
import BaseAPI from '../core/BaseAPI/index.js';
const signUpAPIInstance = new HTTP('/auth/signup');
export class SignUpAPI extends BaseAPI {
    create(data) {
        const options = {
            ...data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return signUpAPIInstance.post('/', options);
    }
}
//# sourceMappingURL=signUpAPI.js.map
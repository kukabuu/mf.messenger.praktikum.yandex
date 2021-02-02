import { getQueryString } from '../../utils/getQueryString.js';
var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["POST"] = "POST";
    METHOD["PUT"] = "PUT";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
export default class HTTP {
    constructor(url) {
        this.get = (url, options = {}) => {
            const urlWithQueries = options.data ? url + getQueryString(options.data) : url;
            return this.request(urlWithQueries, { ...options, method: METHOD.GET });
        };
        this.put = (url, options = {}) => {
            return this.request(url, { ...options, method: METHOD.PUT });
        };
        this.post = (url, options = {}) => {
            return this.request(url, { ...options, method: METHOD.POST });
        };
        this.delete = (url, options = {}) => {
            return this.request(url, { ...options, method: METHOD.DELETE });
        };
        this.request = (url, options = { method: METHOD.GET }) => {
            const { method, headers, data } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, this.url + url);
                if (headers) {
                    Object.entries(headers).forEach(([header, value]) => {
                        xhr.setRequestHeader(header, value);
                    });
                }
                xhr.withCredentials = true;
                xhr.onload = () => {
                    resolve(xhr);
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                if (method === METHOD.GET || !data) {
                    xhr.send();
                }
                else if (data instanceof FormData) {
                    xhr.send(data);
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
        this.base = HTTP.BASE;
        this.url = this.base + url;
    }
}
HTTP.BASE = 'https://ya-praktikum.tech/api/v2';
//# sourceMappingURL=index.js.map
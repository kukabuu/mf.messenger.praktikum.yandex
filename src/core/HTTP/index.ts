import { getQueryString } from '../../utils/getQueryString.js';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Headers = {
  [prop: string] : string
}

type Options = {
  method: METHOD
  headers?: Headers
  data?: any;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTP {
  static BASE = 'https://ya-praktikum.tech/api/v2';
  base: string
  url: string
  constructor(url: string) {
    this.base = HTTP.BASE;
    this.url = this.base + url;
  }
  get = (url: string, options: OptionsWithoutMethod = {}) => {
    const urlWithQueries = options.data ? url + getQueryString(options.data) : url;
    return this.request(urlWithQueries, {...options, method: METHOD.GET});
  };

  put = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, {...options, method: METHOD.PUT});
  }

  post = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, {...options, method: METHOD.POST});
  }

  delete = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, {...options, method: METHOD.DELETE});
  }

  request = (url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> => {
    const {method, headers, data} = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.url + url);

      if (headers) {
        Object.entries(headers).forEach(([ header, value ]) => {
          xhr.setRequestHeader(header, value);
        })
      }
      xhr.withCredentials = true;
      xhr.onload = () => {
        resolve(xhr);
      }

      xhr.onabort = reject;
      xhr.onerror = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if(data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    })
  };
}



import { getQueryString } from '../../utils/getQueryString';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Headers = {
  [prop: string]: string;
}

type Options = {
  method: METHOD;
  headers?: Headers;
  data?: Record<string, unknown>;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

const defaultHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
};

export default class HTTP {
  static BASE = 'https://ya-praktikum.tech/api/v2';
  base: string;
  url: string;

  constructor(url: string) {
    this.base = HTTP.BASE;
    this.url = this.base + url;
  }

  get = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    const urlWithQueries = options.data ? url + getQueryString(options.data) : url;
    return this.request(urlWithQueries, {...options, method: METHOD.GET});
  };

  put = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.PUT});
  };

  post = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.POST});
  };

  delete = (url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.DELETE});
  };

  request = (url: string, options: Options = {method: METHOD.GET}): Promise<XMLHttpRequest> => {
    const {method, headers, data} = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.url + url);

      const mergedHeaders = {
        ...defaultHeaders,
        ...headers
      };

      Object.entries(mergedHeaders).forEach(([header, value]) => {
        if (data instanceof FormData && value.includes('json')) {
          return;
        }
        xhr.setRequestHeader(header, value);
      });

      xhr.withCredentials = true;
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return resolve(xhr);
        }
        reject(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}



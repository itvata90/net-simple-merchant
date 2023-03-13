import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

export type FetcherRequestHeaders = Record<string, string | number | boolean>;

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export interface FetcherConfig extends Partial<{ [key: string]: any }> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  headers?: AxiosRequestHeaders;
  params?: any;
  signal?: AbortSignal;
}

export interface FetcherInstance {
  get<T = any, R = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

export interface Headers {
  [key: string]: any;
}

export class HttpClient {
  constructor(private fetcher: FetcherInstance, private getHttpOptions?: () => { headers?: Headers }) {
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
  }
  private getOptions(): { headers?: Headers } {
    if (this.getHttpOptions) {
      return this.getHttpOptions();
    } else {
      const httpOptions = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      };
      return httpOptions;
    }
  }
  get<T>(url: string, options?: { headers?: Headers }): Promise<T> {
    return Promise.resolve(this.fetcher.get<T>(url, options ? options : this.getOptions()).then(({ data }) => data));
  }
  delete<T>(url: string, options?: { headers?: Headers }): Promise<T> {
    return Promise.resolve(this.fetcher.delete(url, options ? options : this.getOptions()).then(({ data }) => data));
  }
  post<T>(url: string, obj: any, options?: { headers?: Headers }): Promise<T> {
    return Promise.resolve(this.fetcher.post(url, obj, options ? options : this.getOptions()).then(({ data }) => data));
  }
  put<T>(url: string, obj: any, options?: { headers?: Headers }): Promise<T> {
    return Promise.resolve(this.fetcher.put(url, obj, options ? options : this.getOptions()).then(({ data }) => data));
  }
  patch<T>(url: string, obj: any, options?: { headers?: Headers }): Promise<T> {
    return Promise.resolve(
      this.fetcher.patch<T>(url, obj, options ? options : this.getOptions()).then(({ data }) => data),
    );
  }
}

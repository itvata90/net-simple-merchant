import axios, { AxiosRequestConfig } from 'axios';
import { BaseService } from 'src/core/interfaces/service';

const instance = axios.create({
  baseURL: 'http://localhost:5097',
  timeout: 15000,
  headers: {
    'Access-Control-Expose-Headers': 'Content-Type, X-Total-Count',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  },
);

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token?.replaceAll('"', '')}` };
};

export interface Service<DataType> extends BaseService<DataType, AxiosRequestConfig, DataType> {}

class HTTPClient {
  get<DataType>(url: string, config?: any) {
    return instance.get<DataType>(url, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(),
      },
    });
  }
  put<DataType>(url: string, data?: any, config?: any) {
    return instance.put<DataType>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(),
      },
    });
  }
  post<DataType>(url: string, data?: any, config?: any) {
    return instance.post<DataType>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(),
      },
    });
  }
  delete<DataType>(url: string, config?: any) {
    return instance.delete<DataType>(url, {
      ...config,
      headers: {
        ...config?.headers,
        ...getAuthHeader(),
      },
    });
  }
}

export default new HTTPClient();

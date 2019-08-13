import Axios, { AxiosRequestConfig } from 'axios';
import Auth from '../components/Auth/auth';

const http = {
  get: async (endpoint: string, options?: AxiosRequestConfig) => request(options, 'GET', endpoint),
  post: async (endpoint: string, options?: AxiosRequestConfig) => request(options, 'POST', endpoint),
  put: async (endpoint: string, options?: AxiosRequestConfig) => request(options, 'PUT', endpoint),
  patch: async (endpoint: string, options?: AxiosRequestConfig) => request(options, 'PATCH', endpoint),
  delete: async (endpoint: string, options?: AxiosRequestConfig) => request(options, 'DELETE', endpoint),
  options: async (endpoint: string, options?: AxiosRequestConfig) => request(options, 'OPTIONS', endpoint),
  request: async (config: AxiosRequestConfig) => request(config),
};

const request = async (options?: AxiosRequestConfig, method?: string, endpoint?: string) => {
  const response = await Axios(`${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${Auth.getAccessToken()}`,
    },
    ...options,
  });

  return response;
};

export default http;

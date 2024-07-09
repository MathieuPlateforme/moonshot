import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    accept: '/',
    'Content-type': 'Application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const get = ({ url, options = {} }: { url: string, options?: any }) =>
  axiosInstance.get(url, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });

export const post = ({ url, data = {}, options = {} }: {url: string, data: object, options: any}) =>
  axiosInstance.post(url, data, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });

export const put = ({ url, data = {}, options = {} }: { url: string, data: object, options: any }) =>
    axiosInstance.put(url, data, {
      ...options,
      headers: {
          ...options?.headers,
      },
    });

export const del = ({ url, data = {} }: { url: string, data: object }) => axios.delete(url, data);
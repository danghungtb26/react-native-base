import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'
import { getCurrentLocale } from 'src/configs/i18n'
import { baseUrl, timeout } from './config'

const { CancelToken } = axios
const source = CancelToken.source()

const request = (authenToken?: string | undefined, cancelToken?: CancelTokenSource | undefined) => {
  const defaultOptions: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authenToken ? `${authenToken}` : '',
      'Accept-Language': getCurrentLocale() || 'vi',
    },
    baseURL: baseUrl,
    timeout,
    cancelToken: cancelToken ? cancelToken.token : source.token,
  }

  return {
    /**
     * func get
     * override option request
     */
    get: (url: string, options: AxiosRequestConfig = {}) =>
      axios.get(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options?.headers,
        },
      }),
    /**
     * func post
     * override option request
     */
    post: (url: string, data?: any, options: AxiosRequestConfig = {}) => {
      return axios.post(url, data, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options?.headers,
        },
      })
    },
    /**
     * func put
     * override option request
     */
    put: (url: string, data?: any, options: AxiosRequestConfig = {}) =>
      axios.put(url, data, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options?.headers,
        },
      }),
    /**
     * func delete
     * override option request
     */
    delete: (url: string, options: AxiosRequestConfig = {}) =>
      axios.delete(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options?.headers,
        },
      }),
  }
}

export default request

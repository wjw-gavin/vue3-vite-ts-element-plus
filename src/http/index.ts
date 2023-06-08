import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { TOOKENkEY, clearLocal, getToken } from '@/utils'
import { showMessage } from './status'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000
})

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && config && config.headers) {
      config.headers[TOOKENkEY] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (res) => {
    const { data } = res
    const { code, msg } = data.status
    switch (code) {
      case 0:
        return data
      case 401:
        // 授权过期，重新登录
        clearLocal()
        window.location.href = '/login'
        break
      default:
        showMessage(msg)
        return Promise.reject(data)
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      const status = response.status
      showMessage(status)
      return Promise.reject(response.data)
    }
  }
)

export const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}

export function get<T = any>(url: string, params?: any): Promise<T> {
  return request(url, {
    params,
    method: 'GET'
  })
}

export function post<T = any>(url: string, data?: any): Promise<T> {
  return request(url, {
    data,
    method: 'POST'
  })
}

export function put<T = any>(url: string, data?: any): Promise<T> {
  return request(url, {
    data,
    method: 'PUT'
  })
}

export function $delete<T = any>(url: string): Promise<T> {
  return request(url, {
    method: 'DELETE'
  })
}

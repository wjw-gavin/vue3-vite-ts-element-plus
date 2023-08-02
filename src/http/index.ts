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
    const { code, message } = data.status
    switch (code) {
      case 0:
        return data
      default:
        showMessage(message)
        return Promise.reject(data)
    }
  },
  (error) => {
    const { data } = error.response
    if (data && data.status) {
      const { code, message } = data.status
      if (code === 401) {
        clearLocal()
        window.location.href = '/login'
      } else if (message) {
        showMessage(message || code)
      }
    } else {
      showMessage(data.statusCode)
    }
    return Promise.reject(data)
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

export function patch<T = any>(url: string, data?: any): Promise<T> {
  return request(url, {
    data,
    method: 'patch'
  })
}

export function $delete<T = any>(url: string): Promise<T> {
  return request(url, {
    method: 'DELETE'
  })
}

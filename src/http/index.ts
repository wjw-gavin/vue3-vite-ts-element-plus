import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showMessage } from './status'
import type { IResponse } from './type'
import { getToken, clearLocal } from '@/utils/auth'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 5000
})

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      if (config && config.headers) {
        config.headers['X-TOKEN'] = token
      }
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data } = res
    const code = data.status.code
    if (code === 0) {
      return data.data
    } else {
      switch (data.status.code) {
        case 1:
          showMessage('缺少入口参数')
          break
        case 2:
          clearLocal()
          window.location.href = '/dashboard'
          break
        case 3:
          showMessage('内部服务调用失败')
          break
        default:
          showMessage(data.status.message)
      }
      return Promise.reject(data)
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    }
  }
)

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config
  return new Promise((resolve) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        resolve(res as unknown as T)
      })
  })
}

export function get<T = any>(url: string, params?: any): Promise<T> {
  return request({
    url,
    params,
    method: 'GET'
  })
}

export function post<T = any>(url: string, data?: any): Promise<T> {
  return request({
    url,
    data,
    method: 'POST'
  })
}

export function put<T = any>(url: string, data?: any): Promise<T> {
  return request({
    url,
    data,
    method: 'PUT'
  })
}

export function $delete<T = any>(url: string): Promise<T> {
  return request({
    url,
    method: 'DELETE'
  })
}

export default request
export type { AxiosInstance, AxiosResponse }

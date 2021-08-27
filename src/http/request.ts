import axios from './axios'
import { AxiosResponse } from 'axios'
import { cloneDeep, omit, assign } from 'lodash-es'

// get默认请求
export function get(apiUrl: string, params?: any): Promise<AxiosResponse> {
  let paramsData = {}
  if (params && params.pageNo && params.pageSize) {
    const data = cloneDeep(params)
    const pager = {
      pageNo: data.pageNo,
      pageSize: data.pageSize
    }
    const pagerParams = { pager: JSON.stringify(pager) }

    const remainderParams = omit(data, ['pageNo', 'pageSize', 'options'])
    paramsData = assign(pagerParams, data.options, remainderParams)
  } else {
    paramsData = params
  }
  return axios.get(apiUrl, { params: paramsData })
}

// post默认请求
export function post(apiUrl: string, params?: any): Promise<AxiosResponse> {
  let postData = {}
  if (params && params.pageNo && params.pageSize) {
    const data = cloneDeep(params)
    const pager = {
      pageNo: data.pageNo,
      pageSize: data.pageSize
    }
    const pagerParams = { pager: pager }

    const remainderParams = omit(data, ['pageNo', 'pageSize', 'options'])
    postData = assign(pagerParams, { options: data.options }, remainderParams)
  } else {
    postData = params
  }
  return axios.post(apiUrl, postData)
}

// put默认请求
export function $put(apiUrl: string, params?: any): Promise<AxiosResponse> {
  return axios.put(apiUrl, params)
}

// delete默认请求
export function $delete(apiUrl: string, params?: any): Promise<AxiosResponse> {
  return axios.delete(apiUrl, { data: params })
}

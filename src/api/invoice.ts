import { get, post } from '@/http/request'

// 发送开票短信
export function invoiceRequestSendMsg(params) {
  return post('/management/center/invoiceRequest/sendMsg', params)
}

// 发送开票短信
export function invoiceRequestAdd(params) {
  return post('/management/center/invoiceRequest/add', params)
}

// 发送开票短信
export function invoiceRequestDetail(id: string | number) {
  return get(`/management/center/invoiceRequest/${id}`)
}

// 发送开票短信
export function invoiceRequestRetry(params) {
  return post('/management/center/invoiceRequest/reRequest', params)
}


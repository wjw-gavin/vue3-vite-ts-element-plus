import { ElMessage } from 'element-plus'
import { isString } from 'lodash-es'

export const showMessage = (status: number | string) => {
  let msg = ''
  if (isString(status)) {
    msg = status
  } else {
    switch (status) {
      case 400:
        msg = '请求错误(400)'
        break
      case 404:
        msg = '请求出错(404)'
        break
      case 408:
        msg = '请求超时(408)'
        break
      case 500:
        msg = '服务器错误(500)'
        break
      case 501:
        msg = '服务未实现(501)'
        break
      case 502:
        msg = '网络错误(502)'
        break
      case 503:
        msg = '服务不可用(503)'
        break
      case 504:
        msg = '网络超时(504)'
        break
      case 505:
        msg = 'HTTP版本不受支持(505)'
        break
      default:
        msg = `${status || '请求失败'}!`
    }
  }

  ElMessage.error(msg)
}

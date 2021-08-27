// 网址域名
const CI = 'www.xxx.tech'
const QA = 'www.xxx.cn'
const PROD = 'www.xxx.net'

interface IAPIURL {
  ci: string
  qa: string
  prod: string
}
// 接口地址
const APIURL: IAPIURL = {
  ci: 'https://www.xxx.tech',
  qa: 'https://www.xxx.cn',
  prod: 'https://www.xxx.net'
}

let baseURL = ''

const hostName: string = location.hostname
switch (hostName) {
  case CI:
    baseURL = APIURL['ci']
    break
  case QA:
    baseURL = APIURL['qa']
    break
  case PROD:
    baseURL = APIURL['prod']
    break
  default:
    baseURL = ''
}

export default baseURL

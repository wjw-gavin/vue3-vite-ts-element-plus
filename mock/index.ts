import { mock, Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

function getTag() {
  const tags = ['家', '公司', '学校', '超市']
  return Random.pick(tags)
}

function responseData(code: number, msg: string, data: any) {
  return {
    status: {
      code,
      msg
    },
    data
  }
}

interface ElTableList {
  list: Array<{
    name: string
    date: string
    address: string
    tag: string
    amt: number
  }>
}

const tableList: ElTableList = mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|100': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      name: () => Random.name(),
      date: () => Random.date('yyyy-MM-dd'),
      address: () => Random.cparagraph(1),
      tag: () => getTag(),
      amt: () => Number(Random.float(-1000, 1000).toFixed(2))
    }
  ]
})

interface IRes {
  body: any
  query: any
  headers: any
}

export default [
  {
    url: '/api/getTableList',
    method: 'get',
    response: (res: IRes) => {
      debugger
      const { page, pageSize } = res.query
      const result = tableList.list.filter(
        (v, i) => i >= (page - 1) * pageSize && i < page * pageSize
      )
      return responseData(200, '成功', result)
    }
  }
] as MockMethod[]

<template>
  <o-table :table-config="tableConfig">
    <template #table-top>
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </template>
  </o-table>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { ETable } from '@/api/common/enum'
import { confirmBox } from '@/utils'
import type { ITableConfig } from '@/types'

const tableConfig = reactive<ITableConfig>({
  api: ETable.getOrderList,
  headers: [
    {
      prop: 'name',
      label: '角色名称'
    },
    {
      prop: 'description',
      label: '描述'
    },
    {
      prop: 'count',
      label: '数量'
    },
    {
      prop: 'create_time',
      label: '创建时间'
    }
  ],
  searchItems: [
    {
      type: 'text',
      name: '名称',
      prop: 'role_name'
    }
  ],
  operations: {
    width: 115,
    buttons: [
      // 不带权限的
      {
        text: '编辑',
        show: true,
        click: ({ row }) => {
          router.push(`/system/role/edit/${row.id}`)
        }
      },
      // 带权限的写法
      ({ row }) => {
        return {
          text: '删除',
          type: 'danger',
          show: row.acl.can_edit,
          click: ({ row }) => {
            handleDelete(row.id)
          }
        }
      }
    ]
  }
})

const handleAdd = () => {
  router.push('/system/role/add/')
}

const handleDelete = (id: number) => {
  confirmBox(`请确认是否要删除该条数据：${id}？`).then(() => {
    ElMessage.success('删除成功')
  })
}
</script>

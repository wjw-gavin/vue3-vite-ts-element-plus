<template>
  <o-table ref="tableRef" :table-config="tableConfig">
    <template #table-top>
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </template>
  </o-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import { useDelete } from '@/hooks'
import { Api } from '@/api/common/enum'
import { deleteUser } from '@/api/system/user'
import type { ITableConfig, TableInstance } from '@/types'

const tableConfig: ITableConfig = {
  api: Api.user,
  headers: [
    {
      prop: 'name',
      label: '用户名'
    },
    {
      prop: 'mobile',
      label: '手机号'
    },
    {
      prop: 'sex',
      label: '性别'
    },
    {
      prop: 'roles',
      label: '所属角色'
    },
    {
      prop: 'create_time_display',
      label: '创建时间'
    }
  ],
  operations: {
    width: 70,
    buttons: [
      {
        text: '编辑',
        show: true,
        click: ({ row }) => {
          router.push(`/system/user/edit/${row.id}`)
        }
      },
      {
        text: '删除',
        type: 'danger',
        show: false,
        click: ({ row }) => {
          handleDelete(row.id)
        }
      }
    ]
  }
}

const tableRef = ref<TableInstance>()

const handleAdd = () => {
  router.push('/system/user/add')
}

const handleDelete = (id: number) => {
  const { onDelete } = useDelete()
  onDelete(deleteUser, id, tableRef)
}
</script>

<template>
  <o-table :table-config="tableConfig" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import router from '@/router'
import { ETable } from '@/api/common/enum'
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
          router.push({
            path: '/role/edit',
            query: { id: row.id }
          })
        }
      },
      // 带权限的写法
      ({ row }) => {
        return {
          text: '删除',
          type: 'danger',
          show: row.acl.can_edit,
          click: ({ row }) => {
            router.push({
              path: '/role/edit',
              query: { id: row.id }
            })
          }
        }
      }
    ]
  }
})
</script>

<template>
  <o-table ref="tableRef" :table-config="tableConfig">
    <template #status_display="{ row }">
      <el-tag :type="row['status'] === 'enable' ? 'success' : 'danger'">
        {{ row.status_display }}
      </el-tag>
    </template>

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
import { deleteRole } from '@/api/system/role'
import type { ITableConfig, TableInstance } from '@/types'

const tableConfig: ITableConfig = {
  api: Api.role,
  headers: [
    {
      prop: 'name',
      label: '角色名称'
    },
    {
      prop: 'desc',
      label: '描述'
    },
    {
      prop: 'count',
      label: '数量'
    },
    {
      prop: 'status_display',
      slot: 'status_display',
      label: '状态'
    },
    {
      prop: 'create_time_display',
      label: '创建时间'
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
          // show: row.acl.delete,
          show: true,
          click: () => {
            handleDelete(row.id)
          }
        }
      }
    ]
  }
}

const tableRef = ref<TableInstance>()

const handleAdd = () => {
  router.push('/system/role/add')
}

const handleDelete = (id: number) => {
  const { onDelete } = useDelete()
  onDelete(deleteRole, id, tableRef)
}
</script>

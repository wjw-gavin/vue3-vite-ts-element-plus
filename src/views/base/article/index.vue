<template>
  <o-table ref="tableRef" :table-config="tableConfig">
    <template
      v-for="(item, index) in slotColumns"
      :key="index"
      #[item.slot!]="{ row }"
    >
      <span>{{ row[item.prop] ? row[item.prop].name : '-' }}</span>
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
import { deleteArticle } from '@/api/base/article'
import type { ITableConfig, TableInstance } from '@/types'

const tableConfig: ITableConfig = {
  api: Api.article,
  headers: [
    {
      prop: 'title',
      label: '文章名称'
    },
    {
      prop: 'content',
      width: 200,
      label: '内容'
    },
    {
      prop: 'read_count',
      label: '阅读量'
    },
    {
      prop: 'collect_count',
      label: '收藏数'
    },
    {
      prop: 'author',
      slot: 'author',
      label: '作者'
    },
    {
      prop: 'create_time_display',
      label: '创建时间'
    },
    {
      prop: 'update_time_display',
      label: '更新时间'
    }
  ],
  searchItems: [
    {
      type: 'text',
      prop: 'title',
      label: '文章名称'
    },
    {
      type: 'autocomplete',
      prop: 'author_id',
      searchKey: 'user',
      label: '作者'
    }
  ],
  operations: {
    width: 115,
    buttons: [
      {
        text: '编辑',
        show: true,
        click: ({ row }) => {
          router.push(`/base/article/edit/${row.id}`)
        }
      },
      () => {
        return {
          text: '删除',
          type: 'danger',
          show: true,
          click: ({ row }) => {
            handleDelete(row.id)
          }
        }
      }
    ]
  }
}
const slotColumns = tableConfig.headers.filter((header) => header.slot)

const tableRef = ref<TableInstance>()

const handleAdd = () => {
  router.push('/base/article/add')
}

const handleDelete = (id: number) => {
  const { onDelete } = useDelete()
  onDelete(deleteArticle, id, tableRef)
}
</script>

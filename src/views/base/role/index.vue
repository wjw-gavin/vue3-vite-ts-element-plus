<template>
  <g-table-page
    :store-model-name="storeModelName"
    add-btn-link="/role/add"
    :selection="false"
    :table-operation="tableOperation"
  />

  <div class="text-sm text-red-400 mt-4">
    <p>因不是真实接口，改变分页时，不会更新相应数据，但传参已经更新。</p>
    <p>每条数据包含了这条数据所分配的权限：编辑、删除等</p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { goPage } from '@/utils/utils'

const storeModelName = 'roleModule'
const tableOperation = reactive({
  width: 85,
  fixed: 'right',
  buttonGroups: [
    ({ row }) => {
      return {
        name: '编辑',
        type: 'primary',
        isShow: row.acl.can_edit,
        click: ({ row }) => {
          goPage('/role/edit', {
            id: row.id
          })
        }
      }
    },
    ({ row }) => {
      return {
        name: '删除',
        type: 'danger',
        isShow: row.acl.can_delete,
        click: ({ row }) => {
          console.log(row)

          // const apiUrl = `/${row.id}`
          // deleteTableRow(apiUrl, storeModelName, row)
        }
      }
    }
  ]
})
</script>

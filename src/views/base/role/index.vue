<template>
  <g-table-page
    :store-model-name="storeModelName"
    add-btn-link="/role/add"
    :selection="false"
    :table-operation="tableOperation"
  >
    <!-- 根据tableHeadList slotName字端 动态插入 插槽 -->
    <template v-for="item in tableHeadListSlotName" :key="item.slotName" #[item.slotName]="{ row }">
      <span v-if="row" :class="row.count > 100 ? 'text-blue-600' : 'text-green-400'">
        {{ row[item.prop] }}
      </span>
    </template>
  </g-table-page>

  <div class="text-sm text-red-400 mt-4">
    <p>因不是真实接口，改变分页时，不会更新相应数据，但传参已经更新。</p>
    <p>每条数据包含了这条数据所分配的权限：编辑、删除等</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TableHeadList } from '@/types/storeModule'
import router from '@/router'
import store from '@/store'

const storeModelName = 'roleModule'
const tableOperation = {
  width: 100,
  fixed: 'right',
  buttonGroups: [
    ({ row }) => {
      return {
        name: '编辑',
        isShow: row.acl.can_edit,
        click: ({ row }) => {
          router.push({
            path: '/role/edit',
            query: { id: row.id }
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
        }
      }
    }
  ]
}

const tableHeadListSlotName = computed(() => {
  const tableHeadList = store.state[storeModelName].tableHeadList
  return tableHeadList.filter((item: TableHeadList) => item.slotName)
})
</script>

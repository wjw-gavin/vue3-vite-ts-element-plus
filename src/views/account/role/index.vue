<template>
  <nf-table-page
    ref="nfTable"
    :store-model-name="storeModelName"
    add-btn-link="/role/add"
    :table-operation="tableOperation"
  />
</template>

<script lang="ts">
import store from '@/store'
import { goPage } from '@/utils/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, defineComponent, reactive } from 'vue'
import { deleteRole } from '@/api/account'
export default defineComponent({
  setup() {
    const storeModelName = 'roleModule'
    const roles = computed(() => store.state[storeModelName].roles)
    const tableOperation = reactive({
      width: 80,
      fixed: 'right',
      buttonGroups: [
        ({ row }) => {
          return {
            name: '编辑',
            type: 'primary',
            isShow: roles.value['role_edit'] && ![1, 2].includes(row.id),
            click: ({ row }) => {
              goPage('/role/edit', { id: row.id })
            }
          }
        },
        ({ row }) => {
          return {
            name: '删除',
            type: 'danger',
            isShow: roles.value['role_delete'] && ![1, 2].includes(row.id),
            click: ({ row }) => {
              deleteTableRow(row)
            }
          }
        }
      ]
    })

    const deleteTableRow = (row) => {
      ElMessageBox.confirm('确定删除该角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(() => {
          ElMessage.success('操作成功')
          store.dispatch('data/getTableData', storeModelName)
        })
      })
    }
    return {
      storeModelName,
      tableOperation
    }
  }
})
</script>

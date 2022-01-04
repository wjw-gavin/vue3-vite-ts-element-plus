<template>
  <nf-table-page
    :store-model-name="storeModelName"
    add-btn-link="/account/add"
    add-btn-link-text="添加账户"
    :table-operation="tableOperation"
  />
</template>

<script lang="ts">
import store from '@/store'
import { goPage } from '@/utils/utils'
import { computed, defineComponent, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { changeUserStatus } from '@/api/account'
export default defineComponent({
  setup() {
    const storeModelName = 'accountModule'
    const roles = computed(() => store.state[storeModelName].roles)
    const userInfo = computed(() => store.state['user'].userInfo)
    const tableOperation = reactive({
      width: 80,
      fixed: 'right',
      buttonGroups: [
        () => {
          return {
            name: '编辑',
            type: 'primary',
            isShow: roles.value['account_add'],
            click: ({ row }) => {
              goPage('/account/edit', {
                userId: row.userId,
                phone: row.userPhone
              })
            }
          }
        },
        ({ row }) => {
          return {
            name: row.status === 0 ? '禁用' : '启用',
            type: row.status === 0 ? 'danger' : 'success',
            isShow: roles.value['account_state'],
            click: ({ row }) => {
              changeUserState(row)
            }
          }
        }
      ]
    })
    const changeUserState = (row) => {
      const statuDisplay = row.status === 0 ? '禁用' : '启用'
      ElMessageBox.confirm(`确定${statuDisplay}该用户？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeUserStatus({
          userId: row.userId,
          status: row.status === 0 ? 1 : 0,
          operator: userInfo.value.userId
        }).then(() => {
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

<template>
  <div>
    <nf-table-page
      :store-model-name="storeModelName"
      row-key="requestId"
      search-label-width="115px"
      :selection="true"
      :batch-options="batchOptions"
      :table-operation="tableOperation"
      :selectable="selectableFun"
    >
      <template v-for="item in tableHeadListSlotName" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName === 'orderSn'">
          <span v-for="(order, index) in scope.row.invoicedOrders" :key="index">
            {{ order[item.slotName] }}{{ index + 1 === scope.row.invoicedOrders.length ? '' : '，' }}
          </span>
        </template>
        <span v-else>{{ scope.row.invoicedOrders[0][item.slotName] }}</span>
      </template>
    </nf-table-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import { goPage } from '@/utils/utils'
const options = [
  {
    id: 1,
    label: '批量重试',
    role: 'invoice_request_retry',
    url: '/management/center/invoiceRequest/reRequest/batch'
  }
]
export default defineComponent({
  setup() {
    const storeModelName = 'invoiceRequestModule'
    const roles = computed(() => store.state[storeModelName].roles)
    const tableOperation = reactive({
      width: 50,
      fixed: 'right',
      buttonGroups: [
        ({ row }) => {
          return {
            name: '重试',
            type: 'primary',
            isShow: roles.value['invoice_request_retry'] && row.status === 4,
            click: ({ row }) => {
              goPage('/invoice/request/retry', {
                requestId: row.requestId
              })
            }
          }
        },
        ({ row }) => {
          return {
            name: '查看',
            type: 'info',
            isShow: row.status === 3 && row.invoiceUrl,
            click: ({ row }) => {
              ElMessageBox.alert(`${row.invoiceUrl}`, '发票下载地址', {
                confirmButtonText: '复制地址',
                callback: (action) => {
                  if (action === 'confirm') {
                    const input: any = document.createElement('input')
                    input.value = row.invoiceUrl
                    input.readOnly = 'readOnly'
                    document.body.appendChild(input)
                    input.select() // 选中文本内容
                    input.setSelectionRange(0, row.invoiceUrl.length) // 设置选定区的开始和结束点
                    document.execCommand('copy') //将当前选中区复制到剪贴板
                    ElMessage.success('复制成功')
                  }
                }
              })
            }
          }
        }
      ]
    })
    const batchOptions = ref(options)

    const tableHeadListSlotName = computed(() => {
      const list = store.state[storeModelName].tableHeadList
      return list.filter((item) => item.slotName)
    })

    const selectableFun = (row) => {
      return row.status === 4
    }

    return {
      storeModelName,
      tableOperation,
      batchOptions,
      tableHeadListSlotName,
      selectableFun
    }
  }
})
</script>

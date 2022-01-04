<template>
  <nf-table-page
    class="time-range-page"
    :store-model-name="storeModelName"
    :table-operation="tableOperation"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store'
import { invoiceRequestSendMsg } from '@/api/invoice'
import { goPage } from '@/utils/utils'
export default defineComponent({
  setup() {
    const storeModelName = ref('invoiceModule')
    const roles = computed(() => store.state[storeModelName.value].roles)
    const tableOperation = reactive({
      width: 135,
      fixed: 'right',
      buttonGroups: [
        ({ row }) => {
          return {
            name: '发送开票短信',
            type: 'primary',
            isShow: roles.value['invoice_order_send_invoice_sms'] && row.sendInvoiceMsgAble,
            click: ({ row }) => {
              if (row.userPhone) {
                ElMessageBox.confirm('确定发送开票短信？', '提示').then(() => {
                  sendMessage(row.userPhone, row.orderId)
                })
              } else {
                ElMessageBox.prompt('请输入接收短信的手机号', '提示', {
                  inputPattern: /^1[3-9]\d{9}$/,
                  inputPlaceholder: '请输入手机号',
                  inputErrorMessage: '请输入正确的手机号'
                })
                  .then(({ value }) => {
                    sendMessage(value, row.orderId)
                  })
              }
            }
          }
        },
        ({ row }) => {
          return {
            name: '开票',
            type: 'warning',
            isShow: roles.value['invoice_order_invoice'] && row.invoiceAble,
            click: ({ row }) => {
              goPage('/invoice/add', {
                time: row.orderCreateTime,
                fuelName: row.fuel,
                fuelAmount: row.fuelAmount,
                price: row.fuelPrice,
                orderId: row.orderId,
                invoiceAmount: row.invoiceAmount
              })
            }
          }
        }
      ]
    })
    const sendMessage = (phone: string, orderId: number) => {
      invoiceRequestSendMsg({
        phone: phone,
        orders: [orderId]
      }).then(() => {
        ElMessage.success('发送成功')
      })
    }
    return {
      storeModelName,
      tableOperation
    }
  }
})
</script>
